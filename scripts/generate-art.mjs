#!/usr/bin/env node
/**
 * Generates devotional art in the site's house style.
 *
 * This exists because the style drifted. Nine images across the festival batches
 * came out as flat single-hue washes: the Lathmar page all pink, Vasant Panchami
 * all yellow, Nandotsav all gold. The cause was in the prompts, not the engine.
 * Each one named a palette ("rose gold and saffron palette", "yellow gold and
 * soft green"), and the image model reads a named palette as an instruction to tint
 * the whole canvas that colour, so every scene collapsed to one hue and lost the
 * depth, the saturation and the detail that make the earlier art look painted.
 *
 * The reference is public/images/content/who-is-radha.webp: Raja Ravi Varma
 * academic realism, full colour range, ornate textiles, luminous depth.
 *
 * So the BRAND block below is locked and prepended to every scene, exactly as
 * docs/research/08-image-playbook.md §6 asks. Never name a palette in a scene
 * line; describe what is in the picture and let the brand block carry the look.
 *
 *   node scripts/generate-art.mjs vasant-panchami
 *   node scripts/generate-art.mjs --all
 */
import { writeFileSync } from "node:fs";
import sharp from "sharp";

const BRAND = `Style: a highly detailed classical Indian devotional oil painting in the manner of Raja Ravi Varma, academic realism with painterly brushwork. Rich, deeply saturated colour across the full spectrum, with crimson and rose, emerald and forest green, peacock blue and turquoise, marigold orange, warm gold and cream all present in the same frame. Luminous warm daylight with a soft golden divine glow, real depth and atmospheric perspective from foreground to distance. Silks, embroidery, gold jewellery, garlands and architecture rendered in fine, crisp detail. Faces serene, beautiful, fully visible and never obscured or cropped. Krishna's skin is a soft blue. Bright, joyful and light-filled.

Do not produce a flat single-hue wash, a monochrome or duotone image, a chalky pastel haze, or a washed-out sepia scene. The image must be full-colour, deep and luminous, not tinted one shade. No text, no lettering, no watermark, no signature, no border.

Scene: `;

const SCENES = {
  "vasant-panchami":
    "A spring morning in Vrindavan. Radha and Krishna stand together beneath a flowering tree in a temple courtyard, Krishna in yellow silk with a peacock feather crown, Radha in a rose and gold lehenga. A tall Holi pole wound with yellow cloth and marigolds stands to one side. Sakhis in green, blue and red saris offer yellow flowers and a brass tray of saffron sweets. Musicians with a mridang sit at the right. Beyond a carved sandstone balustrade, mustard fields in yellow bloom stretch to a bright blue sky with white clouds.",
  "lathmar-holi":
    "Lathmar Holi in a narrow sandstone lane in Barsana. Women of Barsana in vivid red, magenta, green and blue ghagras and veils laugh as they raise long bamboo lathis. Men of Nandgaon in bright turbans crouch smiling beneath round leather shields. Clouds of pink, yellow and green gulal hang in the sunlit air. Carved balconies rise on both sides and a white marble temple shikhara stands against a clear blue sky beyond. A drummer with a dhol plays at the right.",
  holi: "Radha and Krishna playing Holi in a flowering Vrindavan grove on a golden morning. Krishna, in yellow silk with a peacock feather, raises a silver pichkari spraying rose-coloured water. Radha, in a deep crimson and gold sari, throws a handful of pink gulal, laughing. Sakhis in emerald, saffron and turquoise saris throw colour around them. Flame-of-the-forest trees blaze orange overhead, green kadamba leaves behind, peacocks in the foreground, petals and coloured powder suspended in bright sunlight.",
  "radhe-radhe":
    "Two elderly Braj villagers meeting in a Vrindavan lane at golden morning, palms joined, greeting each other with the holy name. One in a saffron shawl, one in white with a rust shoulder cloth. Carved sandstone havelis and a temple gateway rise behind them with marigold garlands over the doorway, a white cow resting nearby, green tulsi in clay pots. Above and behind, faintly luminous in the golden light, Radha and Krishna stand together, Radha in rose and gold, Krishna in yellow silk with a peacock feather.",
  nandotsav:
    "Nandotsav in Nanda Baba's courtyard at Gokul. Nanda Maharaj, an older man with a white beard in a saffron turban and gold-bordered dhoti, lifts the infant Krishna joyfully above his head. Krishna is soft blue with a peacock feather, in a small yellow dhoti. Yashoda and the gopis in vivid red, green and blue saris raise their arms in celebration, showering turmeric, curd and coins. Villagers dance, a drummer plays a mridang, garlanded white cows stand in the foreground. Marigold torans and orange pennants hang overhead against a bright sky.",
  gopashtami:
    "A golden Vrindavan morning. Young Krishna, soft blue, in yellow silk with a peacock feather crown, walks at the head of a herd of white and dun cows, their horns painted red and green, marigold garlands round their necks. Balarama in blue silk walks beside him and cowherd boys in bright turbans follow with staves. Green pasture, kadamba trees, the Yamuna glinting beyond, a clear blue sky with sunrise light behind them.",
  "govardhan-puja":
    "Krishna lifting Govardhan hill. The young Krishna, soft blue, in yellow silk with a peacock feather, holds the great green hill aloft on the little finger of his left hand, calm and smiling. Beneath it the people of Braj shelter with their cows: men in red and saffron turbans, women in vivid green, blue and crimson saris, calves and white cows pressed close, all gazing up. Grey monsoon rain falls in sheets beyond the edge of the hill while warm golden light fills the space underneath.",
  "sharad-purnima":
    "The maha raas on the bank of the Yamuna under the full autumn moon. Krishna, soft blue in yellow silk with a peacock feather, plays the flute at the centre while gopis in vivid crimson, emerald, saffron and turquoise saris dance in a ring around him, Radha beside him in rose and gold. The night is luminous rather than dark, a large silver moon above, its light on the river, white lotuses and night-blooming jasmine at the water's edge, kadamba trees around the clearing.",
  "jhulan-yatra":
    "Radha and Krishna seated together on an ornate flower-decked swing in a lush monsoon garden at Vrindavan. The swing is hung with marigold, rose and jasmine garlands from a great kadamba tree. Krishna in yellow silk with a peacock feather, Radha in rose and gold with fine gold jewellery. Sakhis in emerald, crimson and blue saris swing them and play the veena and manjira. Deep green rain-washed foliage, peacocks with tails spread, monsoon clouds breaking to warm golden light.",
};

const KEY = process.env.OPENAI_API_KEY;
if (!KEY) {
  console.error("OPENAI_API_KEY is not set. Source .env first.");
  process.exit(1);
}

const args = process.argv.slice(2);
const slugs = args.includes("--all") ? Object.keys(SCENES) : args;
if (!slugs.length) {
  console.error("Give one or more slugs, or --all.");
  process.exit(1);
}

for (const slug of slugs) {
  const scene = SCENES[slug];
  if (!scene) {
    console.error(`  no scene defined for ${slug}`);
    continue;
  }
  const r = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${KEY}` },
    body: JSON.stringify({
      model: "gpt-image-2",
      prompt: BRAND + scene,
      size: "1536x1024",
      quality: "high",
      n: 1,
    }),
  });
  if (!r.ok) {
    console.error(`  ${slug}: ${r.status} ${(await r.text()).slice(0, 200)}`);
    continue;
  }
  const d = await r.json();
  const png = `/tmp/art-${slug}.png`;
  writeFileSync(png, Buffer.from(d.data[0].b64_json, "base64"));
  const out = `public/images/content/${slug}.webp`;
  const info = await sharp(png)
    .resize(1600, null, { withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(out);
  console.log(`  ${slug}  ${info.width}x${info.height}  ${Math.round(info.size / 1024)}kb`);
}
