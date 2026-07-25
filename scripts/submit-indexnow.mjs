#!/usr/bin/env node
/**
 * Notify IndexNow that URLs are new or changed.
 *
 * IndexNow is supported by Bing, Yandex, Seznam and Naver. Google has never
 * adopted it (it tested the protocol in 2022 and did not implement it), so this
 * is NOT a way to get into Google. It matters to us because Bing's index feeds
 * Copilot, ChatGPT search and Perplexity, which is exactly the AI answer-engine
 * surface our GEO strategy targets (docs/01).
 *
 * For Google there is no equivalent push: the sitemap ping endpoint was
 * deprecated in June 2023, and the Indexing API is documented for job posting
 * and livestream pages only. So Google gets the sitemap plus good internal
 * linking, and that is the honest whole of it.
 *
 * Usage:
 *   node scripts/submit-indexnow.mjs                 # every URL in the sitemap
 *   node scripts/submit-indexnow.mjs --since <ISO>   # only URLs changed since
 *   node scripts/submit-indexnow.mjs --dry-run
 */
const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const sinceArg = args[args.indexOf("--since") + 1];
const since = args.includes("--since") ? new Date(sinceArg) : null;

const SITE = process.env.SITE_URL || "https://radhakrishna.com";
const HOST = new URL(SITE).host;
const KEY = process.env.INDEXNOW_KEY;

if (!KEY) {
  console.error("INDEXNOW_KEY is not set. Add it to .env (see lib/site.ts).");
  process.exit(2);
}

const xml = await fetch(`${SITE}/sitemap.xml`).then((r) => {
  if (!r.ok) throw new Error(`sitemap responded ${r.status}`);
  return r.text();
});

const entries = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => {
  const loc = m[1].match(/<loc>([^<]+)<\/loc>/)?.[1];
  const lastmod = m[1].match(/<lastmod>([^<]+)<\/lastmod>/)?.[1];
  return { loc, lastmod: lastmod ? new Date(lastmod) : null };
});

const urlList = entries
  .filter((e) => e.loc)
  .filter((e) => !since || !e.lastmod || e.lastmod >= since)
  .map((e) => e.loc);

if (!urlList.length) {
  console.log("Nothing to submit.");
  process.exit(0);
}

console.log(`Submitting ${urlList.length} URL(s) to IndexNow for ${HOST}`);
if (dryRun) {
  urlList.forEach((u) => console.log("  " + u));
  console.log("(dry run, nothing sent)");
  process.exit(0);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `${SITE}/${KEY}.txt`,
    urlList,
  }),
});

// 200 accepted, 202 accepted but key still being validated.
if (res.status === 200 || res.status === 202) {
  console.log(`IndexNow accepted the submission (HTTP ${res.status}).`);
} else {
  console.error(`IndexNow responded ${res.status}: ${await res.text()}`);
  process.exit(1);
}
