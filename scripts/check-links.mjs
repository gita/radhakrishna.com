#!/usr/bin/env node
/**
 * Link and page checker. Crawls every route in the sitemap, then verifies:
 *   - every route returns 200
 *   - every internal link resolves
 *   - every image resolves
 *   - every #anchor points at an id that exists on that page
 *   - every page has exactly one h1 and real content
 *   - (with --external) every outbound citation still resolves
 *
 * Usage:  node scripts/check-links.mjs [--base http://127.0.0.1:3007] [--external]
 * Exits non-zero if anything is broken, so it can gate a deploy.
 */
const args = process.argv.slice(2);
const BASE =
  args[args.indexOf("--base") + 1]?.startsWith("http")
    ? args[args.indexOf("--base") + 1]
    : "http://127.0.0.1:3007";
const CHECK_EXTERNAL = args.includes("--external");

const problems = [];
const note = (m) => problems.push(m);

async function text(url) {
  const r = await fetch(url);
  return { ok: r.ok, status: r.status, body: r.ok ? await r.text() : "" };
}

const sm = await text(`${BASE}/sitemap.xml`);
if (!sm.ok) {
  console.error(`Cannot read sitemap at ${BASE}/sitemap.xml (${sm.status}).`);
  console.error("Is the dev server running?");
  process.exit(2);
}
const routes = [...sm.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
  new URL(m[1]).pathname === "" ? "/" : new URL(m[1]).pathname,
);

const internal = new Set();
const images = new Set();
const external = new Set();

for (const route of routes) {
  const res = await text(BASE + route);
  if (!res.ok) {
    note(`route ${route} -> ${res.status}`);
    continue;
  }
  const html = res.body;

  const ids = new Set(
    [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]),
  );
  for (const m of html.matchAll(/<a[^>]+href="([^"]+)"/g)) {
    const href = m[1];
    if (href.startsWith("/")) internal.add(href.split("#")[0] || "/");
    else if (/^https?:\/\//.test(href)) external.add(href);
    else if (href.startsWith("#") && href.length > 1 && !ids.has(href.slice(1)))
      note(`anchor ${route} -> ${href} (no such id)`);
  }
  for (const m of html.matchAll(/<img[^>]+src="([^"]+)"/g)) {
    let src = m[1].replace(/&amp;/g, "&");
    const opt = src.match(/[?&]url=([^&]+)/);
    if (opt) src = decodeURIComponent(opt[1]);
    if (src.startsWith("/")) images.add(src);
  }

  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1) note(`page ${route} has ${h1s} h1 elements`);
  const visible = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (visible.length < 400) note(`page ${route} has very little text`);
}

// Legacy redirects are not linked from any page, so they must be checked
// explicitly: a redirect that lands on a 404 silently throws away the old
// page's traffic and link equity.
try {
  const map = JSON.parse(
    await (await import("node:fs/promises")).readFile("content/_redirects.json", "utf8"),
  );
  for (const [from, to] of map) {
    const r = await fetch(BASE + from, { redirect: "manual" });
    if (r.status !== 301 && r.status !== 308)
      note(`redirect ${from} -> status ${r.status} (expected 301)`);
    const dest = await fetch(BASE + to);
    if (!dest.ok) note(`redirect ${from} lands on ${to} -> ${dest.status}`);
  }
  console.log(`Checked ${map.length} legacy redirects`);
} catch (e) {
  note(`could not read content/_redirects.json: ${e.message}`);
}

for (const link of internal) {
  const r = await fetch(BASE + link);
  if (!r.ok) note(`internal link ${link} -> ${r.status}`);
}
for (const img of images) {
  const r = await fetch(BASE + img);
  if (!r.ok) note(`image ${img} -> ${r.status}`);
}

// A link can return 200 and still be wrong. Bare social/platform roots are
// placeholders someone forgot to fill in, and they are worse than useless when
// they also land in Organization sameAs.
const PLACEHOLDER_HOSTS = new Set([
  "pinterest.com", "www.pinterest.com", "instagram.com", "www.instagram.com",
  "youtube.com", "www.youtube.com", "facebook.com", "www.facebook.com",
  "twitter.com", "x.com", "www.x.com", "linkedin.com", "www.linkedin.com",
  "threads.net", "www.threads.net", "example.com", "www.example.com",
]);
for (const u of external) {
  let parsed;
  try { parsed = new URL(u); } catch { note(`external ${u} is not a valid URL`); continue; }
  const bare = parsed.pathname === "/" || parsed.pathname === "";
  if (bare && PLACEHOLDER_HOSTS.has(parsed.host))
    note(`placeholder link: ${u} points at the platform homepage, not a profile`);
}

const blocked = [];
if (CHECK_EXTERNAL) {
  const list = [...external];
  const limit = 10;
  for (let i = 0; i < list.length; i += limit) {
    await Promise.all(
      list.slice(i, i + limit).map(async (u) => {
        // 403/429 mean a bot wall (Britannica, wisdomlib and others block
        // non-browser clients). That is not a broken citation, so it is
        // reported separately rather than failing the run.
        try {
          const r = await fetch(u, {
            redirect: "follow",
            headers: {
              "user-agent":
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
              accept: "text/html,application/xhtml+xml",
            },
            signal: AbortSignal.timeout(20000),
          });
          // 403/429 are bot walls anywhere. 400 only counts as one on the social
          // hosts that reject non-browser clients outright (Facebook does this on
          // a page that loads perfectly in a browser); elsewhere 400 is a real bug.
          const SOCIAL_BOT_WALL = /(^|\.)(facebook|instagram|linkedin|x|twitter)\.com$/;
          const host = new URL(u).host;
          if (
            r.status === 403 ||
            r.status === 429 ||
            (r.status === 400 && SOCIAL_BOT_WALL.test(host))
          )
            blocked.push(`${u} -> ${r.status}`);
          else if (!r.ok) note(`external ${u} -> ${r.status}`);
        } catch (e) {
          // A TLS/network hiccup is not proof the page is gone; retry once.
          try {
            const r2 = await fetch(u, { redirect: "follow", signal: AbortSignal.timeout(20000) });
            if (!r2.ok && r2.status !== 403 && r2.status !== 429)
              note(`external ${u} -> ${r2.status}`);
          } catch {
            blocked.push(`${u} -> unreachable from this checker (${e.name})`);
          }
        }
      }),
    );
  }
}

console.log(
  `Checked ${routes.length} routes, ${internal.size} internal links, ${images.size} images` +
    (CHECK_EXTERNAL ? `, ${external.size} external links` : ""),
);
if (blocked.length) {
  console.log(`\n${blocked.length} link(s) refused an automated request (bot wall, not broken):`);
  for (const b of blocked) console.log("  " + b);
}
if (problems.length) {
  console.error(`\n${problems.length} problem(s):`);
  for (const p of problems) console.error("  " + p);
  process.exit(1);
}
console.log("No broken links or pages.");
