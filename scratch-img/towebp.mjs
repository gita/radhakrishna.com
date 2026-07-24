import sharp from "sharp";
import { readdirSync, mkdirSync, existsSync } from "node:fs";

const SRC = "scratch-img";
const OUT = "public/images/content";
mkdirSync(OUT, { recursive: true });

// map the test file to its final slug
const rename = { "test-krishna-blue": "why-is-krishna-blue" };

const pngs = readdirSync(SRC).filter((f) => f.endsWith(".png"));
for (const f of pngs) {
  const base = f.replace(/\.png$/, "");
  const slug = rename[base] ?? base;
  const out = `${OUT}/${slug}.webp`;
  await sharp(`${SRC}/${f}`)
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(out);
  console.log("wrote", out);
}
console.log("DONE");
