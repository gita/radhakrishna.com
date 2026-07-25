#!/usr/bin/env node
/**
 * JPEG copies of the content art, for the social card to draw.
 *
 * Two things force this. Satori, which renders /og, cannot decode WebP, and all
 * our content art is WebP. And the Next image optimizer cannot help, because
 * next.config sets `formats: ["image/avif", "image/webp"]`, so it will never
 * hand back a JPEG no matter what Accept header it is asked with.
 *
 * The copies are made with `fit: inside`, so nothing is ever cropped. The card
 * draws them contained rather than covering, because a cover crop into the
 * card's column would cut through faces, and faces are never cut (CLAUDE.md).
 *
 *   npm run build:og
 *
 * Runs as part of `npm run build`, so a new piece of art gets its card copy
 * without anyone remembering to ask for one.
 */
import { readdir, mkdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, parse } from "node:path";
import sharp from "sharp";

const SRC = "public/images/content";
const OUT = "public/images/og";

if (!existsSync(SRC)) {
  console.log(`No ${SRC}, nothing to do.`);
  process.exit(0);
}
await mkdir(OUT, { recursive: true });

const files = (await readdir(SRC)).filter((f) => /\.(webp|png|jpe?g)$/i.test(f));
let made = 0;
let skipped = 0;

for (const file of files.sort()) {
  const src = join(SRC, file);
  const dest = join(OUT, `${parse(file).name}.jpg`);

  // Only rebuild when the source is newer, so a repeat build is nearly free.
  if (existsSync(dest)) {
    const [a, b] = await Promise.all([stat(src), stat(dest)]);
    if (b.mtimeMs >= a.mtimeMs) {
      skipped++;
      continue;
    }
  }

  const info = await sharp(src)
    .resize(900, 700, { fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(dest);

  console.log(`  ${dest}  ${info.width}x${info.height}  ${Math.round(info.size / 1024)}kb`);
  made++;
}

console.log(`OG art: ${made} written, ${skipped} already current, ${files.length} source images.`);
