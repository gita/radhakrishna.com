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

## 5b. The Leela art shot list (the delightful scenes to generate)

Radha Krishna imagery should be **bright, joyful, delightful, and full of color and life** (docs/07: light
first). We generate original painterly art of the beloved leelas and place it throughout: heroes, story
pages, festival pages, galleries, wallpapers, quote-card backgrounds. Engine = Gemini Nano Banana Pro
(painterly, luminous, correct iconography); style = classical Indian miniature / Raja Ravi Varma-inspired /
soft romantic realism, warm daylight, vivid color, gold divine glow. Verify iconography every time
(docs/04 §5).

**Founder-requested (build first):**

- **Ras Leela** — Krishna multiplied among the gopis in a moonlit-but-luminous circular dance, Sharad
  Purnima, radiant, joyful.
- **Radha & Krishna on a Jhoola (swing)** in a flowering garden — the Jhulan / Hariyali Teej scene, lush
  green Vrindavan, monsoon bloom, gopis swinging them, marigolds and vines.
- **Kaliya Nag (Kaliya Daman) Leela** — young Krishna dancing gracefully on the many-hooded serpent in the
  Yamuna, calm and triumphant, wives of Kaliya praying, bright water.
- **Phoolon ki Holi** — Radha & Krishna amid clouds of flower petals (not just gulal), Barsana/Vrindavan
  flower-Holi, joyful, saffron + rose + marigold, laughter and color.

**More delightful leelas + scenes (the fuller backlog):**

- Krishna playing the **bansuri (flute)** under a kadamba tree, peacocks and cows gathered, dawn light.
- **Makhan Chori** — baby Krishna stealing butter, mischievous and adorable.
- **Govardhan Leela** — Krishna lifting Govardhan hill on one finger, villagers sheltering, dramatic + warm.
- **Nauka Vihar** — Radha & Krishna in a boat on the Yamuna, gopis rowing, serene golden water.
- **Radha Krishna in a Nikunj (grove)** — intimate garden bower, flowers, peacocks, soft glow.
- **Jhulan Utsav / monsoon swing** — decorated flower swing, rain clouds, greenery.
- **Gopashtami** — Krishna with the cows, cowherd joy, morning pasture.
- **Maha Raas at Vrindavan** — the grand circular dance, luminous.
- **Damodar Leela** — Krishna tied to the mortar by Yashoda, tender and sweet.
- **Radha Krishna garland / mala exchange** — devotional, tender, gold + rose.
- **Barsana Lathmar Holi** — playful festival energy, color, Braj.
- **Krishna with peacocks** dancing in the rain — vivid blues, greens, gold.
- **Vrindavan at dawn / dusk over the Yamuna** — atmospheric landscape for section bands + backgrounds.
- **Radha in Barsana** — Radha Rani, lotus, soft rose-and-gold, for the Radha hub.

Each becomes: a hero/section art where relevant, a downloadable gallery + wallpaper set, and (cropped) a
quote-card background. Keep a running "generated / to-generate" checklist here as we produce them, and add
the winners to `brand-refs/` so the whole site inherits one delightful, bright look.

## 5c. Art reference corpus (style conditioning)

Great generated art starts from great reference art. We build a corpus of beautiful devotional paintings
and pass them as **reference images** (`-i` to gpt-image-2 / reference inputs to Gemini) so our output
inherits their beauty, then we generate **net-new original scenes in new settings/compositions**. Founder
direction (2026-07-24): reference broadly, including BBT and JKYog art found on the web; create new images
from them, do not clone. Principle: reference for **style + quality**, output is **original** (new
composition, setting, framing), never a 1:1 copy and never presented as a specific artist's work.

**Corpus sources (`design/references/art/`):**

- **Raja Ravi Varma** — public domain (d. 1906). Classical Indian oil realism, divine warmth. _Saved:_ Birth
  of Krishna, Introducing Radha to Krishna, Krishna Drishta, Radha Waiting for Krishna, Yasoda Adorning /
  with Krishna, Radha Madhavam.
- **Kangra / Pahari / Rajput / Kalighat / Deccan miniatures** — public domain (18th-19th c). Delicate line,
  jewel color, Radha-Krishna lyricism. _Saved:_ Kalighat Radha-Krishna, Krishna & Arjuna chariot; add more
  (Rasalila, Jhula, gopis, Govardhan) as rate limits allow — use Wikimedia thumbnail URLs to avoid 429s.
- **BBT / ISKCON art** — modern, copyrighted; vivid, detailed, devotional (the classic Krishna-book look).
  Gather from the web as **style references** per founder direction; generate original scenes.
- **JKYog art** — the org's Radha-Krishna art (Radha Madhav Dham / Swami Mukundananda). Gather from the web
  / JKYog sources as references; the founder's org, used for reference to make new originals.
- **Nathdwara Pichwai, Tanjore (gold-leaf), Madhubani** — traditional forms to fold in for variety + festival
  pieces (historical works are public domain).

**How we use it:** pick 1-3 references that match the target scene's mood, pass as `-i` / reference inputs,
prompt the new composition (the leela + setting from §5b) in our bright, light-first palette (docs/07), and
curate. Save our best originals into `brand-refs/` so the whole site converges on one look. Keep this list
updated as the corpus grows; note license/source per image.

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
