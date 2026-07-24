# Image Production Playbook — Radhakrishna.com

How to make every image on Radhakrishna.com: one consistent devotional brand style for graphics/typography, and beautiful photoreal/painterly Radha Krishna art for darshan. Two engines, one look. This doc is the operating manual — tools, exact commands, the house prompt formula, ready-to-use templates, and the guardrails that keep the site looking like one hand made it.

Sources read: the local `gpt-image` skill (OpenAI `gpt-image-2`), the local `image-generator` skill (Gemini Nano Banana Pro, `gemini-3-pro-image-preview`), the marketing repo's `social-media/engine/build_images.py` and `newsletter/covers/cover_engine.py` (the house brand-image formula), and the site palette from `02-vedvyas-blueprint.md` + `tailwind.config.js`.

---

## 0) TL;DR — which tool for which job

Two image families, two engines:

| Family                   | What it is                                                                                                    | Engine                                                    | Skill             |
| ------------------------ | ------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- | ----------------- |
| **BRAND / GRAPHIC**      | Hero art with text, OG cards, section headers, quote cards, typographic wallpapers, framework/diagram cards   | **OpenAI `gpt-image-2`**                                  | `gpt-image`       |
| **REALISTIC / ARTISTIC** | Photoreal or painterly Radha Krishna, darshan, deities, temples, nature scenes, editing real reference photos | **Gemini Nano Banana Pro** (`gemini-3-pro-image-preview`) | `image-generator` |

Why this split:

- **`gpt-image-2` for typography and repeatable layout.** It renders exact in-image text reliably, holds a locked layout across a series, and accepts reference images via the edits endpoint so a whole set inherits one look. This is exactly what the marketing repo's `cover_engine.py` is built on. Any image that must contain spelled-out words (a shloka, a title, a CTA) goes here.
- **Gemini Nano Banana Pro for beauty and realism.** Stronger at photoreal/painterly rendering, world knowledge (accurate temple architecture, iconography, natural light), and faithful editing of real reference photos (up to 14 references, 1K/2K/4K, wide aspect-ratio menu). Devotional darshan art lives here.

Rule of thumb: **if the image needs words baked in, use gpt-image-2. If it needs to be beautiful/real, use Gemini.** For a hero that needs both (painterly Krishna + a title), generate the art in Gemini, then either overlay live HTML/CSS text on the site (preferred — see §7) or pass the Gemini art as an `-i` reference into gpt-image-2 for the typographic pass.

---

## 1) `gpt-image` skill (OpenAI gpt-image-2) — usage summary

A thin CLI wrapper over the official OpenAI Images API. Two endpoints, chosen automatically by whether you pass a reference image.

**Invocation**

```bash
uv run "$CLAUDE_PLUGIN_ROOT/skills/gpt-image/scripts/generate.py" \
  -p "PROMPT" -f OUT.webp [-i REF...] [-m MASK] [options]
# In this repo's marketing tooling the script resolves to:
#   ~/.claude/skills/gpt-image-2/skills/gpt-image/scripts/generate.py
```

Reads `OPENAI_API_KEY` from env. Prints output path(s) on stdout. Exit 0 ok, 1 API error (prints the response body — read it, it names the problem), 2 bad args / missing key.

**Endpoint selection**

| Mode                               | Trigger                                                | Endpoint                      |
| ---------------------------------- | ------------------------------------------------------ | ----------------------------- |
| Text→image                         | no `-i`                                                | `POST /v1/images/generations` |
| Reference edit / restyle / combine | one or more `-i`                                       | `POST /v1/images/edits`       |
| Inpaint                            | `-i` + `-m` (alpha PNG mask; transparent = regenerate) | `/v1/images/edits` with mask  |

**Key flags**

| Flag            | Values                                                                                                                                  | Default     | Notes                                              |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ----------- | -------------------------------------------------- |
| `-p, --prompt`  | str                                                                                                                                     | required    | Prompt or edit instruction                         |
| `-f, --file`    | path                                                                                                                                    | auto        | Output path; extension follows `--format`          |
| `-i, --image`   | path (repeatable)                                                                                                                       | —           | Reference(s); routes to edits endpoint             |
| `-m, --mask`    | path                                                                                                                                    | —           | Alpha PNG mask; requires `-i`                      |
| `--size`        | `1024x1024`, `1536x1024`, `1024x1536`, `2048x2048`, `3840x2160`, `2160x3840`, or aliases `square/landscape/portrait/1k/2k/4k/wide/tall` | `1024x1024` | Any 16px multiple up to 3840 edge, 3:1 cap         |
| `--quality`     | `auto/low/medium/high`                                                                                                                  | `high`      | `low`≈$0.005, `medium`≈$0.04, `high`≈$0.17 per img |
| `--format`      | `png/jpeg/webp`                                                                                                                         | `png`       | **Set `webp` for the site**                        |
| `--compression` | 0–100                                                                                                                                   | —           | JPEG/WebP only                                     |
| `-n`            | int                                                                                                                                     | 1           | >1 suffixes `_0`,`_1`,…                            |
| `--background`  | `auto/opaque`                                                                                                                           | api         | generations only (`opaque` disables transparency)  |
| `--moderation`  | `auto/low`                                                                                                                              | `low`       |                                                    |

Note: `gpt-image-2` **rejects** `--input-fidelity` (the CLI strips it). Real-person-likeness edits often refuse on the edits endpoint.

**Producing WebP** — pass `--format webp --compression 85` and name the file `.webp`. Example:

```bash
uv run .../generate.py -p "…" -f hero.webp --format webp --compression 88 \
  --size landscape --quality high
```

**Dense typography** (the thing gpt-image-2 is best at):

- End every text prompt with: **"Render all text spelled exactly as given."**
- Put the exact copy in quotes, one string per line, and name where each goes ("marker headline", "grey sans subtitle").
- Use `--quality high` for anything with text; `high` is the default and should stay high for posters, shlokas, OG cards.
- Devanagari/Sanskrit: give the exact Unicode string and say "render this Devanagari text exactly, do not alter the glyphs." Always eyeball the output — script accuracy is the one thing to QA by hand.
- For fixed-region layouts (OG card zones), describe each region and its content explicitly. Load `references/craft.md` from the skill for the fixed-region + dense-text mini-schemas.

**Quality dial:** `low` for draft sweeps, `medium` for exploration, `high` for anything shipping (text, OG, hero, wallpaper).

---

## 2) `image-generator` skill (Gemini Nano Banana Pro) — strengths

Model `gemini-3-pro-image-preview` via the Generative Language REST API. Reads `GEMINI_API_KEY`.

**Strengths that matter for devotional art:**

- **Photoreal + painterly rendering.** Strong on natural light (golden hour, temple lamp glow, monsoon skies), skin/fabric/metal texture, depth of field. This is the darshan engine.
- **World knowledge.** Renders plausible temple architecture (shikhara, gopuram, jali screens), correct iconography (Krishna's flute/peacock feather/yellow pitambara, Radha's posture), and Vrindavan/Braj natural settings.
- **Faithful reference-image editing.** Add/remove elements, inpaint with semantic masking, style transfer, and **multi-image composition up to 14 reference images** — combine a face, a pose, a background, a palette.
- **Resolution + ratio control.** `imageConfig.imageSize` = `1K/2K/4K`; `aspectRatio` menu: `1:1, 2:3, 3:2, 3:4, 4:3, 4:5, 5:4, 9:16, 16:9, 21:9`.
- **Multi-turn editing** — refine conversationally; **Google Search grounding** for real-data visuals.

**Call shape** (REST; use a file-based request body — base64 images overflow the command line):

```bash
curl -s -X POST \
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image-preview:generateContent" \
  -H "x-goog-api-key: $GEMINI_API_KEY" -H "Content-Type: application/json" \
  -d @/tmp/req.json > /tmp/resp.json
# generationConfig.responseModalities MUST include ["TEXT","IMAGE"]
# imageConfig: { "aspectRatio": "16:9", "imageSize": "2K" }
```

Then decode `candidates[0].content.parts[].inlineData.data` (base64) to a file.

**Caveats:** every Gemini image carries a **SynthID watermark**. Native output is PNG/JPEG — **convert to WebP** as a post-step (`cwebp` or `sharp`, see §7). Gemini is weaker than gpt-image-2 at long exact-text blocks, so keep text out of Gemini art and add it as HTML overlay or a gpt-image-2 pass.

---

## 3) The house brand-image PROMPT FORMULA (from the marketing repo)

`cover_engine.py` and `build_images.py` encode one reusable pattern. Distilled, portable, and re-skinned below for Radhakrishna.com.

**The 6-part formula:**

1. **A fixed BRAND SYSTEM paragraph** prepended to every prompt: a locked palette (warm neutral ground + dark ground + a small set of accents given by hex), a named font personality, and the discipline line "premium, uncluttered, generous negative space, no stock-photo people, no extra logos."
2. **An optional signed FOOTER block** (the marketing engine's byline bar; `--nofooter` for in-body/social). Radhakrishna equivalent is optional and quiet.
3. **A library of contextual FORMATS** so images never repeat — route the _shape_ of the need to a format (hero, OG, quote, wallpaper, section, festival).
4. **Typography-in-image discipline:** every prompt with words ends with "Render all text spelled exactly as given."
5. **Real style references via `-i`** (switches gpt-image-2 to the edits endpoint) so a whole series inherits one look. Keep 3–5 canonical reference images in a `brand-refs/` folder once the first good ones exist.
6. **Hard rule:** never fabricate — real proof/photos are never AI-invented, and any numbers shown must be real. For devotional content: don't invent scripture; quote real shlokas with correct attribution.

**Prompt assembly** (as in `build_prompt`): `Create a {surface}, {aspect}.` + BRAND + FORMAT-body(with exact text interpolated) + optional FOOTER + `Render all text spelled exactly as given. No clutter.`

### The Radhakrishna devotional BRAND SYSTEM block (use verbatim, prepend to every gpt-image-2 graphic)

```
BRAND SYSTEM (obey exactly):
- Mood: devotional, serene, luminous, timeless. Reverent, never gaudy or cartoonish.
- Grounds: warm cream (#FAF9F5) for light pieces; deep midnight indigo (#1B2A4A) or
  charcoal (#262625) for dark pieces. Generous negative space.
- Devotional palette (use richly but harmoniously): peacock blue (#1F6F8B) and peacock
  green (#0E7C6B) as the divine core, warm gold / brass (#C9A227) for light and haloes,
  terracotta (#C96442) as the warm site-accent, soft lotus pink (#E8A0B0) as a gentle accent.
- Gold is for light, glow, haloes, fine rule lines and small ornament — never a flat fill.
- Ornament: subtle — a thin gold hairline frame, a small lotus or peacock-feather motif,
  a faint mandala or paisley watermark. Restraint over decoration.
- Typography: an elegant high-contrast SERIF for headings (calm, classical, Crimson-Pro-like);
  a clean humanist SANS for body/labels. Devanagari in a graceful, legible traditional face.
- Premium, uncluttered, reverent. No stock-photo people, no extra logos, no harsh neon,
  no busy backgrounds behind text.
```

This aligns with the site's real tokens (warm cream `#faf9f5`, terracotta accent `#c96442`, charcoal dark `#262625` from `02-vedvyas-blueprint.md`) and layers in the requested devotional peacock-blue/green + gold divine palette.

---

## 4) Reusable prompt templates

Placeholders in `{CURLY}`. Each specifies engine, style, palette, aspect ratio, output. For gpt-image-2 templates, prepend the BRAND SYSTEM block from §3. For Gemini templates, fold the palette words into the prose.

Aspect / size cheat: OG = 1200×630 (1.91:1 → gpt-image `1536x1024` then crop, or Gemini `16:9`); hero ≈ `16:9`/`landscape`; wallpaper = `9:16`/`tall`; square = `1:1`.

---

### T1 — Hero Radha Krishna art (painterly, no text) — **Gemini**

> Engine: Gemini Nano Banana Pro · Aspect `16:9` · Size `4K` · Output WebP (convert)

```
A luminous devotional painting of Radha and Krishna together in {SETTING: a
Vrindavan grove at golden hour / beside the Yamuna under a full moon / among
blossoming kadamba trees}. Krishna with deep blue-toned skin, a peacock-feather
crown, yellow pitambara silk, holding a bamboo flute; Radha in a rose-and-gold
lehenga, serene and graceful, gentle mutual gaze. Style: {classical Indian
miniature revival / soft romantic realism / Raja Ravi Varma-inspired oil}, fine
detail, painterly brushwork, warm golden divine light with a soft halo glow,
peacock-blue and emerald-green foliage, brass and gold highlights, lotus accents.
Rich but harmonious color, reverent and timeless. Depth of field, cinematic
composition, no text, no watermark-like marks. Ultra high resolution.
```

Notes: leave the top-third or one side calmer if a title will be overlaid in HTML later. Generate 3–4, pick the one with correct iconography (two hands, flute intact, feather present).

---

### T2 — OG / social share card (title + art) — **gpt-image-2**

> Engine: gpt-image-2 · `--size 1536x1024` (crop to 1200×630) · `--quality high` · `--format webp` · prepend BRAND SYSTEM

```
Create an Open Graph share card, wide landscape, safe margins for a 1.91:1 crop.
Left ~55%: a text column on warm cream (#FAF9F5). Right ~45%: a devotional
Radha-Krishna image panel with a thin gold hairline separating the two.
Text column, top to bottom:
- Small uppercase SANS eyebrow, letter-spaced, peacock-blue (#1F6F8B): "{EYEBROW}"
- Large elegant SERIF title, warm ink (#33302A): "{TITLE}"
- One line muted SANS subtitle (#6B6559): "{SUBTITLE}"
A thin 6px gold (#C9A227) bar across the very bottom. Calm, premium, reverent,
generous whitespace. Render all text spelled exactly as given. No clutter.
```

For the art panel you can `-i` a T1 Gemini render so the card inherits the real hero art.

---

### T3 — Quote / shloka card (typography-in-image) — **gpt-image-2**

> Engine: gpt-image-2 · `--size 1024x1024` (or `portrait`) · `--quality high` · `--format webp` · prepend BRAND SYSTEM

```
Create a devotional quote card, square. Deep midnight-indigo (#1B2A4A) ground
with a very faint gold mandala watermark and a thin gold (#C9A227) hairline frame
inset from the edge. Centered composition:
- A small peacock-feather motif at top.
- The Sanskrit verse in graceful Devanagari, warm gold, exactly: "{DEVANAGARI_SHLOKA}"
- Below it, the transliteration in italic serif, soft cream: "{TRANSLITERATION}"
- Below that, the English meaning in clean sans, muted cream: "{ENGLISH_MEANING}"
- A small attribution line, uppercase letter-spaced sans: "{SOURCE e.g. BHAGAVAD GITA 2.47}"
Balanced, reverent, lots of breathing room. Render every character of the
Devanagari and Latin text spelled exactly as given; do not alter any glyph.
```

QA the Devanagari by eye every time. If a glyph is wrong, regenerate or set the verse as HTML text over a plain T1/T7 background instead.

---

### T4 — Mobile wallpaper (typographic + art) — **gpt-image-2** (text) or **Gemini** (pure art)

> Aspect `9:16` · gpt-image `--size 2160x3840` / Gemini `9:16` `4K` · Output WebP

```
Create a mobile phone wallpaper, tall 9:16, safe zone clear of the top notch and
bottom home bar. A serene devotional scene of Krishna with his flute beneath a
{kadamba tree at dawn / starlit Yamuna}, painterly, deep peacock-blue and emerald
palette with warm gold divine glow and a soft halo. Lower third darkens gently
into deep indigo (#1B2A4A) for legibility. On the lower third, centered, an
elegant gold serif line, exactly: "{MANTRA e.g. Radhe Radhe}". Calm, reverent,
uncluttered, high resolution. Render the text spelled exactly as given.
```

Pure-art variant (no text): run T1 at `9:16` in Gemini and add nothing.

---

### T5 — Temple / darshan photo-style — **Gemini**

> Engine: Gemini · Aspect `3:2` or `16:9` · Size `4K` · Output WebP

```
A photorealistic image of {a South Indian gopuram temple at sunrise / the inner
sanctum of a Krishna temple lit by rows of brass oil lamps / a marble Radha-Krishna
temple courtyard with marigold garlands}. Accurate traditional Indian temple
architecture — {carved shikhara / tiered gopuram / jali screens / pillared mandapa}.
Warm natural light, incense haze, marigold and tulsi, brass and gold detail,
devotional atmosphere. Rich color, fine texture, realistic depth of field,
85mm-style perspective. Reverent and inviting. No text, no watermark-like marks,
no distorted architecture. Ultra high resolution.
```

Verify architecture reads as real (no melted arches, no impossible geometry).

---

### T6 — Festival image (Janmashtami / Holi / Radhashtami) — **Gemini** (art) + optional **gpt-image-2** (greeting text)

> Engine: Gemini art at `4:5` or `1:1` · Size `2K–4K` · Output WebP

```
A joyful devotional {Janmashtami / Holi in Vrindavan / Radhashtami} scene: {baby
Krishna with butter and a swing decorated in flowers / Radha-Krishna amid clouds
of pink and saffron gulal / Radha honored with lotus garlands}. Festive but
serene, warm gold and peacock-blue palette with {festival-appropriate accents:
soft holi pastels / marigold and rose}, painterly, luminous divine light, fine
detail. Traditional Indian devotional art. No text, no watermark-like marks.
High resolution.
```

For a greeting card, pass this render as `-i` into gpt-image-2 T3-style with the greeting: `"{GREETING e.g. Happy Janmashtami}"`, gold serif, thin gold frame, "Render all text spelled exactly as given."

---

### T7 — Section illustration / header band (subtle, behind or beside content) — **gpt-image-2**

> Engine: gpt-image-2 · `--size 1536x1024` (band → crop wide) · `--quality medium` · `--format webp` · prepend BRAND SYSTEM

```
Create a slim decorative section header band, wide landscape, warm cream (#FAF9F5)
ground. A restrained ornament: a centered thin gold (#C9A227) hairline flanked by
small symmetric peacock-feather and lotus motifs in peacock-blue (#1F6F8B) and
emerald (#0E7C6B), fading softly to the edges. Optional small centered SERIF
label, warm ink: "{SECTION_TITLE}". Elegant, quiet, lots of negative space, no
busy pattern behind where body text will sit. Render any text spelled exactly as
given. No clutter.
```

Use `medium` quality here — these are supporting, not hero, assets.

---

### T8 — Painterly portrait / deity study (single figure) — **Gemini**

> Engine: Gemini · Aspect `4:5` · Size `4K` · Output WebP

```
A devotional portrait study of {Krishna playing the flute / Radha with a soft
smile}, three-quarter view, classical Indian painting style, deep peacock-blue
and gold palette, warm halo glow, intricate jewelry and silk texture, serene
expression, dark indigo background with faint gold bokeh. Fine brushwork,
reverent, timeless. Correct iconography ({peacock-feather crown, flute, yellow
pitambara}). No text, no watermark-like marks. Ultra high resolution.
```

---

## 5) Recommendation matrix (fast lookup)

| Job                 | Template | Engine                | Aspect         | Quality/Size         | Text?            |
| ------------------- | -------- | --------------------- | -------------- | -------------------- | ---------------- |
| Homepage hero art   | T1       | Gemini                | 16:9           | 4K                   | HTML overlay     |
| OG / share card     | T2       | gpt-image-2           | 1.91:1         | high, 1536×1024→crop | in-image         |
| Quote / shloka card | T3       | gpt-image-2           | 1:1 / portrait | high                 | in-image         |
| Mobile wallpaper    | T4       | gpt-image-2 or Gemini | 9:16           | high / 2160×3840     | optional         |
| Temple / darshan    | T5       | Gemini                | 3:2, 16:9      | 4K                   | none             |
| Festival            | T6       | Gemini (+gpt-image-2) | 4:5, 1:1       | 2K–4K                | optional overlay |
| Section header      | T7       | gpt-image-2           | wide band      | medium               | optional         |
| Deity portrait      | T8       | Gemini                | 4:5            | 4K                   | none             |

---

## 6) Consistency system — keep the whole site looking like one hand

1. **Lock the BRAND SYSTEM block** (§3) and prepend it to every gpt-image-2 graphic. Never freestyle the palette.
2. **Build a `brand-refs/` set.** Once T1/T2/T5 produce 3–5 excellent images, save them and pass them as `-i` references so later graphics inherit the exact look (this is why `cover_engine.py` conditions on `kyle-refs/`). Also feed them to Gemini as reference images for style continuity across darshan art.
3. **Consider a small `image_engine.py` for Radhakrishna** modeled on `cover_engine.py`: one fixed BRAND block + a FORMAT dict keyed by T1–T8, each with its own refs and required fields, driving `gpt-image-2` for graphics. Same pattern, re-skinned palette. High reuse, guaranteed consistency.
4. **Fixed palette hexes everywhere** — cream `#FAF9F5`, indigo `#1B2A4A`, peacock-blue `#1F6F8B`, peacock-green `#0E7C6B`, gold `#C9A227`, terracotta `#C96442`, lotus `#E8A0B0`. Reuse the same serif/sans personality in every prompt.
5. **One art direction per surface type** — all quote cards share T3's frame; all section headers share T7. Don't reinvent per page.

---

## 7) Best practices

**WebP + high-res**

- Ship **WebP** sitewide. gpt-image-2: `--format webp --compression 85–90`. Gemini: outputs PNG/JPEG natively — convert as a post-step: `cwebp -q 85 in.png -o out.webp` or `sharp` in a small Node script.
- Generate **larger than needed** (2K–4K) and downscale to the display size; keep the master. Hero/darshan at 4K, cards at 1K–2K, section bands at ~1.5K.
- Provide responsive sizes (e.g. 640/1080/1600/2400 wide) via Next.js `<Image>`; WebP + width variants keeps LCP fast.

**Alt-text discipline**

- Every image gets meaningful, specific alt text — describe subject, action, setting ("Radha and Krishna beneath a kadamba tree at golden hour, painterly devotional art"), not "image1". Good for accessibility and for SEO/LLM retrieval (see the writing doc's "structure for LLM retrieval").
- Decorative-only bands (T7 with no title) can take `alt=""` so screen readers skip them.
- For shloka cards, put the verse + translation in the alt text (and ideally as real page text nearby) so the meaning is machine-readable, not trapped in pixels.

**Avoiding AI artifacts**

- **Hands, faces, symmetry, extra limbs** — inspect every devotional figure. Krishna must have two hands, an intact flute, a peacock feather, correct posture; Radha's face and hands must be clean. Regenerate rather than ship a flawed deity image.
- **Iconography accuracy** — verify crown, pitambara, flute, tilak, jewelry read correctly; wrong symbols read as disrespectful.
- **Temples** — check architecture isn't melted or geometrically impossible (T5).
- **Text** — always eyeball in-image spelling, especially Devanagari (T3/T4/T6). If any glyph is off, prefer HTML text over the art. When text must be perfect and long, keep it out of the image entirely.
- **SynthID** — Gemini images are watermarked (invisible); fine for web, just be aware.
- **No fabrication** — real shlokas with correct source attribution only; don't invent scripture, and don't AI-generate anything presented as a real photograph of a real place/person without labeling it as artwork.

**Workflow hygiene**

- Draft at `low`/`medium`, finalize at `high`. Generate `-n 3–4` and curate; devotional art has a low tolerance for "almost right."
- Keep prompts, chosen outputs, and the `brand-refs/` set in the repo so the look is reproducible.
- Reuse the marketing repo's discipline: fixed BRAND block, exact-text line, reference-conditioning, and the "no clutter / no stock people / no extra logos" tail on every prompt.

---

_Engines: OpenAI `gpt-image-2` (graphics/typography) + Gemini `gemini-3-pro-image-preview` / Nano Banana Pro (photoreal/painterly). Formula adapted from `writesonic-marketing/newsletter/covers/cover_engine.py` and `social-media/engine/build_images.py`; palette aligned to `02-vedvyas-blueprint.md` + `tailwind.config.js`._
