#!/usr/bin/env node
/**
 * Verifies the social card for every page in the sitemap.
 *
 * An OG image is the only part of the site most people will ever see: it is what
 * renders when a page is shared in WhatsApp, on X, or in a Slack channel. It
 * also fails silently. Nothing on the page looks wrong when the card is broken,
 * so it has to be checked deliberately.
 *
 * For each page this reports the og:image and twitter:image, whether the image
 * actually fetches, its real content type and byte size, and its pixel
 * dimensions read from the file header. It flags:
 *
 *   - a missing or non-absolute og:image (relative URLs do not resolve for
 *     crawlers)
 *   - an image that 404s or is served as HTML
 *   - a format the major crawlers will not render (WebP is the trap: X/Twitter
 *     does not reliably render it, and WhatsApp often shows nothing at all)
 *   - dimensions far from the 1.91:1 that Facebook, LinkedIn and Slack crop to
 *   - the same image reused across many pages, which makes a shared link
 *     indistinguishable from any other
 *
 *   node scripts/check-og.mjs                       # against production
 *   node scripts/check-og.mjs --base http://127.0.0.1:3007
 */
const args = process.argv.slice(2);
const i = args.indexOf("--base");
const BASE = i >= 0 && args[i + 1]?.startsWith("http") ? args[i + 1] : "https://radhakrishna.com";

const meta = (html, prop) => {
  const re = new RegExp(
    `<meta[^>]+(?:property|name)=["']${prop}["'][^>]*content=["']([^"']*)["']|` +
      `<meta[^>]+content=["']([^"']*)["'][^>]*(?:property|name)=["']${prop}["']`,
    "i",
  );
  const m = html.match(re);
  const raw = m ? (m[1] ?? m[2]) : null;
  // Attribute values are HTML-escaped, so a card URL arrives as
  // "...&amp;eyebrow=temples". A browser decodes that before fetching; if this
  // does not, it silently requests a URL whose second parameter is named
  // "amp;eyebrow", gets a card with no eyebrow, and reports it as fine.
  return raw
    ? raw
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
    : null;
};

/** Pixel dimensions straight from the file header: PNG, JPEG and WebP. */
function dimensions(buf) {
  if (buf.length > 24 && buf.toString("ascii", 1, 4) === "PNG")
    return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20), kind: "png" };
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let o = 2;
    while (o < buf.length - 9) {
      if (buf[o] !== 0xff) { o++; continue; }
      const marker = buf[o + 1];
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker))
        return { w: buf.readUInt16BE(o + 7), h: buf.readUInt16BE(o + 5), kind: "jpeg" };
      o += 2 + buf.readUInt16BE(o + 2);
    }
    return { kind: "jpeg" };
  }
  if (buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") {
    const fmt = buf.toString("ascii", 12, 16);
    if (fmt === "VP8X")
      return { w: (buf.readUIntLE(24, 3) & 0xffffff) + 1, h: (buf.readUIntLE(27, 3) & 0xffffff) + 1, kind: "webp" };
    if (fmt === "VP8L") {
      const b = buf.readUInt32LE(21);
      return { w: (b & 0x3fff) + 1, h: ((b >> 14) & 0x3fff) + 1, kind: "webp" };
    }
    if (fmt === "VP8 ")
      return { w: buf.readUInt16LE(26) & 0x3fff, h: buf.readUInt16LE(28) & 0x3fff, kind: "webp" };
    return { kind: "webp" };
  }
  return {};
}

const sitemap = await fetch(`${BASE}/sitemap.xml`).then((r) => r.text());
// The sitemap always emits absolute canonical (radhakrishna.com) URLs, so take
// only the path from each entry and re-point it at BASE. Otherwise pointing
// this at localhost would quietly check production instead.
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (m) => new URL(new URL(m[1]).pathname, BASE).href,
);
if (!urls.length) {
  console.error(`No URLs in ${BASE}/sitemap.xml`);
  process.exit(2);
}

const problems = [];
const warnings = [];
const seen = new Map();
const rows = [];

for (const url of urls) {
  const path = new URL(url).pathname;
  const html = await fetch(url).then((r) => r.text());
  const og = meta(html, "og:image");
  const tw = meta(html, "twitter:image");

  if (!og) {
    problems.push(`${path}: no og:image at all`);
    rows.push({ path, og: "MISSING" });
    continue;
  }
  if (!/^https?:\/\//.test(og))
    problems.push(`${path}: og:image is not absolute (${og}); crawlers will not resolve it`);

  const abs = new URL(og, BASE).href;
  seen.set(abs, [...(seen.get(abs) ?? []), path]);

  let res;
  try {
    res = await fetch(abs);
  } catch (e) {
    problems.push(`${path}: og:image unreachable (${e.message})`);
    rows.push({ path, og: abs, note: "unreachable" });
    continue;
  }
  if (!res.ok) {
    problems.push(`${path}: og:image ${abs} returned ${res.status}`);
    rows.push({ path, og: abs, note: String(res.status) });
    continue;
  }

  const type = res.headers.get("content-type") ?? "";
  const buf = Buffer.from(await res.arrayBuffer());
  const { w, h, kind } = dimensions(buf);

  if (/text\/html/.test(type))
    problems.push(`${path}: og:image serves HTML, not an image (${abs})`);

  // The format trap. X/Twitter does not reliably render WebP cards and
  // WhatsApp frequently shows nothing, so a WebP card is invisible on the two
  // surfaces where devotional links actually get shared.
  if (kind === "webp" || /image\/webp/.test(type))
    problems.push(`${path}: og:image is WebP (${abs}). X and WhatsApp will not render it.`);

  if (w && h) {
    const ratio = w / h;
    if (Math.abs(ratio - 1.91) > 0.25)
      warnings.push(`${path}: og:image is ${w}x${h} (${ratio.toFixed(2)}:1); cards crop to 1.91:1`);
    if (w < 600 || h < 315)
      problems.push(`${path}: og:image is only ${w}x${h}; below the 600x315 minimum`);
  } else if (!/text\/html/.test(type)) {
    warnings.push(`${path}: could not read dimensions from og:image header`);
  }

  if (tw && new URL(tw, BASE).href !== abs)
    warnings.push(`${path}: twitter:image differs from og:image`);

  rows.push({ path, og: abs, size: `${w ?? "?"}x${h ?? "?"}`, type: kind ?? type, kb: Math.round(buf.length / 1024) });
}

const pad = (s, n) => String(s).padEnd(n);
console.log(pad("route", 46) + pad("size", 12) + pad("fmt", 7) + pad("kb", 6) + "image");
for (const r of rows)
  console.log(
    pad(r.path, 46) + pad(r.size ?? "", 12) + pad(r.type ?? "", 7) + pad(r.kb ?? "", 6) +
      (r.og ?? "").replace(BASE, "") + (r.note ? `  [${r.note}]` : ""),
  );

const shared = [...seen.entries()].filter(([, ps]) => ps.length > 1);
if (shared.length) {
  console.log("\nImages used by more than one page:");
  for (const [img, ps] of shared)
    console.log(`  ${img.replace(BASE, "")}\n    ${ps.join("\n    ")}`);
}

if (warnings.length) {
  console.log(`\n${warnings.length} warning(s):`);
  warnings.forEach((w) => console.log("  " + w));
}
if (problems.length) {
  console.log(`\n${problems.length} problem(s):`);
  problems.forEach((p) => console.log("  " + p));
  process.exit(1);
}
console.log(`\nAll ${urls.length} pages have a working social card.`);
