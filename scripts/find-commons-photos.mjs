#!/usr/bin/env node
/**
 * Finds real, properly licensed photographs on Wikimedia Commons.
 *
 * A photograph of a temple is the photographer's copyright even though the
 * building is public, and Google Images is an index of that copyright, not a
 * source (CLAUDE.md). Commons is usable because every file states its licence
 * and author in machine-readable form, which is exactly what this reads.
 *
 * MediaWiki API: https://commons.wikimedia.org/w/api.php
 *   action=query&generator=search  (gsrnamespace=6 is the File namespace)
 *   prop=imageinfo&iiprop=url|size|extmetadata
 * extmetadata carries Artist, LicenseShortName, UsageTerms and AttributionRequired.
 *
 *   node scripts/find-commons-photos.mjs "Banke Bihari Temple" 20
 *
 * It prints only candidates that are large enough to lead a page and whose
 * licence and author can both be named. Anything else is not shippable.
 */
const UA = "RadhakrishnaDotCom/1.0 (https://radhakrishna.com; contact via site) node-fetch";
const API = "https://commons.wikimedia.org/w/api.php";

const query = process.argv[2];
const limit = Number(process.argv[3] ?? 20);
if (!query) {
  console.error('Usage: node scripts/find-commons-photos.mjs "Banke Bihari Temple" [limit]');
  process.exit(2);
}

const params = new URLSearchParams({
  action: "query",
  format: "json",
  formatversion: "2",
  generator: "search",
  gsrsearch: `filetype:bitmap ${query}`,
  gsrnamespace: "6",
  gsrlimit: String(limit),
  prop: "imageinfo",
  iiprop: "url|size|extmetadata|mime",
  iiextmetadatafilter: "Artist|LicenseShortName|UsageTerms|AttributionRequired|License|Credit|ImageDescription",
});

const res = await fetch(`${API}?${params}`, { headers: { "user-agent": UA } });
if (!res.ok) {
  console.error(`Commons API responded ${res.status}`);
  process.exit(1);
}
const data = await res.json();
const pages = data?.query?.pages ?? [];

const strip = (s) =>
  (s ?? "")
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();

// Licences we can actually ship: free, attribution-only or attribution plus
// share-alike. Anything non-commercial or no-derivatives is not usable here.
const OK_LICENCE = /^(cc[ -]?by(-sa)?([ -]?\d(\.\d)?)?|cc0|public domain|pd)/i;

const rows = [];
for (const p of pages) {
  const ii = p.imageinfo?.[0];
  if (!ii) continue;
  const m = ii.extmetadata ?? {};
  const licence = strip(m.LicenseShortName?.value);
  const author = strip(m.Artist?.value);
  const desc = strip(m.ImageDescription?.value).slice(0, 110);

  const usable =
    ii.width >= 1600 &&
    /^image\/(jpeg|png)$/.test(ii.mime ?? "") &&
    OK_LICENCE.test(licence) &&
    author.length > 0 &&
    !/non-?commercial|no ?deriv/i.test(licence);

  rows.push({ usable, title: p.title, w: ii.width, h: ii.height, licence, author, desc,
              url: ii.url, page: ii.descriptionurl });
}

const good = rows.filter((r) => r.usable);
const rejected = rows.filter((r) => !r.usable);

console.log(`\n=== ${query}: ${good.length} usable of ${rows.length} results ===\n`);
for (const r of good) {
  console.log(`${r.title}`);
  console.log(`  ${r.w}x${r.h}  ${r.licence}`);
  console.log(`  by: ${r.author}`);
  if (r.desc) console.log(`  desc: ${r.desc}`);
  console.log(`  file: ${r.url}`);
  console.log(`  page: ${r.page}\n`);
}
if (rejected.length) {
  console.log(`--- not usable (${rejected.length}) ---`);
  for (const r of rejected)
    console.log(
      `  ${r.title}  [${r.w}x${r.h}, ${r.licence || "no licence"}, ${r.author ? "author ok" : "NO AUTHOR"}]`,
    );
}
