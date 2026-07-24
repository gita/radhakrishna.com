# 04 — Image & Brand System

How every image on the site gets made and why they look like one hand made them. The full operating manual
(exact commands, all templates, guardrails) is `research/08-image-playbook.md`. This doc is the decision
summary and the brand lock.

---

## 1. Two engines, one look

| Family                   | What                                                                                            | Engine                                                | Skill             |
| ------------------------ | ----------------------------------------------------------------------------------------------- | ----------------------------------------------------- | ----------------- |
| **Brand / graphic**      | Hero-with-text, OG cards, quote/shloka cards, section headers, typographic wallpapers, diagrams | OpenAI `gpt-image-2`                                  | `gpt-image`       |
| **Realistic / artistic** | Photoreal + painterly Radha Krishna, deities, temples, darshan, festival scenes                 | Gemini Nano Banana Pro (`gemini-3-pro-image-preview`) | `image-generator` |

**Rule of thumb:** if the image needs words baked in, use gpt-image-2 (it renders exact text and holds a
repeatable layout). If it needs to be beautiful and real, use Gemini. For a hero that needs both, generate
the art in Gemini and overlay live HTML/CSS text on the site (preferred, keeps text crisp + translatable),
or pass the Gemini art as an `-i` reference into gpt-image-2 for a typographic pass.

This is the exact pattern the marketing repo already uses (`newsletter/covers/cover_engine.py` +
`social-media/engine/build_images.py`): a fixed BRAND block, a FORMAT library, and the "render all text
spelled exactly as given" discipline. We re-skin it, we do not reinvent it.

## 2. The locked BRAND SYSTEM block (prepend to every gpt-image-2 graphic)

```
BRAND SYSTEM (obey exactly):
- Mood: devotional, serene, luminous, timeless. Reverent, never gaudy or cartoonish.
- Grounds: warm cream (#FAF9F5) for light pieces; deep midnight indigo (#1B2A4A) or
  charcoal (#262625) for dark pieces. Generous negative space.
- Devotional palette (rich but harmonious): peacock blue (#1F6F8B), peacock green
  (#0E7C6B) as the divine core; warm gold / brass (#C9A227) for light and haloes;
  terracotta (#C96442) as the warm accent; soft lotus pink (#E8A0B0) as a gentle accent.
- Gold is for light, glow, haloes, fine rule lines and small ornament, never a flat fill.
- Ornament: subtle. A thin gold hairline frame, a small lotus or peacock-feather motif,
  a faint mandala or paisley watermark. Restraint over decoration.
- Typography: an elegant high-contrast SERIF for headings (Crimson-Pro-like); a clean
  humanist SANS for body/labels; Devanagari in a graceful, legible traditional face.
- Premium, uncluttered, reverent. No stock-photo people, no extra logos, no harsh neon,
  no busy backgrounds behind text.
```

These hexes are the same tokens the site CSS uses (`03` §2), so generated art and the interface are one
palette. This block is the single source of visual truth; never freestyle it.

## 3. The templates (in the playbook)

Eight reusable prompt templates, each with engine, aspect, size, and output locked (`research/08` §4):

T1 hero art (Gemini) · T2 OG/share card (gpt-image-2) · T3 quote/shloka card (gpt-image-2) · T4 mobile
wallpaper (either) · T5 temple/darshan photo-style (Gemini) · T6 festival image (Gemini + optional
gpt-image-2 greeting) · T7 section header band (gpt-image-2) · T8 deity portrait (Gemini).

## 4. Consistency system

1. **Lock the BRAND block** and prepend to every graphic.
2. **Build a `brand-refs/` set:** once T1/T2/T5 produce 3-5 excellent images, save them and pass as `-i`
   references so later graphics inherit the exact look (and feed them to Gemini for style continuity).
3. **Consider a small `image_engine.py`** modelled on `cover_engine.py`: one BRAND block + a FORMAT dict
   keyed T1-T8, driving gpt-image-2 for graphics. Same pattern, re-skinned palette. High reuse, guaranteed
   consistency.
4. **One art direction per surface type:** all quote cards share T3, all section headers share T7.

## 5. Guardrails (non-negotiable)

- **WebP sitewide.** gpt-image-2: `--format webp --compression 85-90`. Gemini outputs PNG/JPEG, convert
  with `cwebp`/`sharp`. Generate at 2K-4K, downscale, keep the master. Responsive sizes via `next/image`.
- **Alt text + caption on every image:** specific, descriptive ("Radha and Krishna beneath a kadamba tree
  at golden hour, painterly devotional art"), not "image1". Shloka cards put the verse + translation in
  alt and as real nearby page text (machine-readable, not trapped in pixels). Decorative bands get
  `alt=""`. `ImageObject` schema with caption/creator/license on galleries.
- **Iconography accuracy is a respect issue.** Inspect every deity figure: Krishna with two hands, intact
  flute, peacock feather, correct pitambara/tilak; Radha's face and hands clean. Regenerate rather than
  ship a flawed deity image. Verify temple architecture is not melted/impossible.
- **Devanagari QA by eye every time.** If a glyph is wrong, prefer HTML text over the art, or regenerate.
- **No fabrication.** Real shlokas with correct attribution only; never invent scripture. Never present an
  AI image of a real place/person as a genuine photograph without labelling it as artwork.
- **Draft at low/medium, finalise at high.** Generate `-n 3-4` and curate; devotional art has low
  tolerance for "almost right."

## 6. Where images plug into the site

- **Hero** (T1) per major hub, HTML title overlay, `priority` LCP image.
- **OG** (T2) generated per page via `next/og` at build (see `03` §6), or a curated art panel per cluster.
- **Story/question/festival/temple pages** each ship a matching image set (kills the "story" query and the
  "images" query with one page).
- **Galleries** (`/images`, `/wallpapers`, `/quotes`) are the image engine: downloadable, multi-resolution,
  `ImageObject` + license schema, Pinterest 2:3 variants.
- **Quote/shloka cards** (T3) for on-site + Pinterest/Instagram distribution.
- **Section header bands** (T7) as quiet dividers.

---

_Full manual: `research/08-image-playbook.md`. Formula adapted from
`writesonic-marketing/newsletter/covers/cover_engine.py`; palette aligned to `03-tech-and-design.md`._
