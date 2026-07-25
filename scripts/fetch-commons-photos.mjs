#!/usr/bin/env node
/**
 * Downloads chosen Wikimedia Commons photographs and records their attribution.
 *
 * A temple photograph belongs to the photographer even though the building is
 * public. Commons licences (CC BY / CC BY-SA) permit reuse only with credit, so
 * the credit is not decoration here, it is the condition of use. This writes the
 * WebP and prints the exact `photos:` YAML with photographer, licence and a link
 * back to the file page, so a photo can never be shipped without them.
 *
 *   node scripts/fetch-commons-photos.mjs            # everything in PHOTOS
 *   node scripts/fetch-commons-photos.mjs vrindavan  # one page
 */
import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import sharp from "sharp";

const UA = "RadhakrishnaDotCom/1.0 (https://radhakrishna.com) node";
const API = "https://commons.wikimedia.org/w/api.php";
const OUT = "public/images/places";

// Chosen by looking at every candidate at full size, not by filename. Two traps
// found while picking: "Chhatris of Barsana 01" is actually Lathmar Holi inside
// the temple, and a popular Prem Mandir shot has a NOKIA watermark burned in.
const PHOTOS = {
  "banke-bihari": [
    { slug: "banke-bihari-gate", file: "Bankebihari temple main gate Vrindavan.JPG",
      alt: "The carved sandstone facade and arched main gate of the Banke Bihari temple in Vrindavan, with devotees crowding the entrance below the Gate No. 1 sign" },
    { slug: "banke-bihari-facade", file: "Banke Bihari Temple, Vrindavan, Mathura, Uttar Pradesh, India (2010).jpg",
      alt: "The upper storeys of the Banke Bihari temple seen from the lane below, arched galleries and a domed pavilion strung with white flower garlands" },
    { slug: "banke-bihari-garlands", file: "Flower garland sellers outside Banke Bihari Temple, Vrindavan.jpg",
      alt: "Garland sellers outside the Banke Bihari temple with baskets of marigold, rose and jasmine malas laid out on red cloth" },
  ],
  barsana: [
    { slug: "barsana-radha-rani-temple", file: "Radharani Temple Barsana 2.jpg",
      alt: "The pink sandstone courtyard of the Shriji temple at Barsana in daylight, its domed chhatris and pillared galleries above a chequered marble floor" },
    { slug: "barsana-gate", file: "Barsana 2.jpg",
      alt: "The carved welcome arch on the road into Barsana, painted with the words Mhari Pyari Barsana" },
    { slug: "barsana-holi", file: "Chhatris of Barsana 01.jpg",
      alt: "Devotees covered head to foot in pink and red gulal, seated with a drum inside the Barsana temple during Lathmar Holi" },
    { slug: "barsana-evening", file: "Evening at Radha-Rani Temple, Barsane, UP, India (25883382920).jpg",
      alt: "The Barsana temple walls and spires silhouetted along the crest of Bhanugarh hill against a blue evening sky" },
  ],
  vrindavan: [
    { slug: "vrindavan-prem-mandir", file: "Krishna temple vrindavan morning.jpg",
      alt: "Prem Mandir in Vrindavan on a clear morning, its white marble spire and carved facade rising above the approach walkway" },
    { slug: "vrindavan-keshi-ghat", file: "Keshi Ghat.jpg",
      alt: "Keshi Ghat at dusk, pilgrims gathered along the sandy bank where the Yamuna widens past Vrindavan" },
    { slug: "vrindavan-street", file: "Bhaktivedanta Swami Marg - Vrindaban 2013-02-24 6736.JPG",
      alt: "Cycle rickshaws and pilgrims on Bhaktivedanta Swami Marg in Vrindavan, temple walls and shopfronts lining the road" },
  ],
};

const strip = (s) =>
  (s ?? "").replace(/<[^>]*>/g, "").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();

async function meta(file) {
  const params = new URLSearchParams({
    action: "query", format: "json", formatversion: "2",
    titles: `File:${file}`, prop: "imageinfo",
    iiprop: "url|size|extmetadata|mime",
    iiextmetadatafilter: "Artist|LicenseShortName|LicenseUrl|UsageTerms",
  });
  const r = await fetch(`${API}?${params}`, { headers: { "user-agent": UA } });
  const j = await r.json();
  const page = j?.query?.pages?.[0];
  const ii = page?.imageinfo?.[0];
  if (!ii) throw new Error(`no imageinfo for ${file}`);
  const m = ii.extmetadata ?? {};
  const author = strip(m.Artist?.value);
  const licence = strip(m.LicenseShortName?.value);
  const licenceUrl = strip(m.LicenseUrl?.value);
  if (!author) throw new Error(`${file}: no author, cannot be credited, so cannot ship`);
  if (!licence) throw new Error(`${file}: no licence stated`);
  return { url: ii.url, page: ii.descriptionurl, author, licence, licenceUrl, w: ii.width, h: ii.height };
}

const only = process.argv[2];
await mkdir(OUT, { recursive: true });

for (const [place, list] of Object.entries(PHOTOS)) {
  if (only && only !== place) continue;
  const yaml = ["photos:"];
  for (const item of list) {
    const info = await meta(item.file);
    const dest = `${OUT}/${item.slug}.webp`;
    if (!existsSync(dest)) {
      const buf = Buffer.from(
        await (await fetch(info.url, { headers: { "user-agent": UA } })).arrayBuffer(),
      );
      const out = await sharp(buf)
        .rotate()
        .resize(1600, 1600, { fit: "inside", withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(dest);
      console.log(`  ${dest}  ${out.width}x${out.height}  ${Math.round(out.size / 1024)}kb`);
    } else {
      console.log(`  ${dest}  already present`);
    }
    yaml.push(
      `  - src: "/images/places/${item.slug}.webp"`,
      `    alt: "${item.alt.replace(/"/g, "'")}"`,
      `    credit: "${info.author.replace(/"/g, "'")}"`,
      `    licence: "${info.licence}"`,
      `    licenceUrl: "${info.licenceUrl}"`,
      `    source: "${info.page}"`,
    );
  }
  await writeFile(`/tmp/photos-${place}.yaml`, yaml.join("\n") + "\n");
  console.log(`\n--- ${place} frontmatter written to /tmp/photos-${place}.yaml ---\n`);
}
