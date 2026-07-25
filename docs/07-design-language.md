# 07 — Design Language

Reverent, luminous, custom, highly polished. Not a generic template, not the basic first pass. This doc is
the north star for the design system and every component.

**North stars (founder-set, refined):**

- **Calm.com** is the primary reference — immersive full-bleed imagery, elegant script wordmark, serif
  headline, translucent pills, transparent nav. Imagery-led, not dashboard.
- **Apple** — precision, restraint, craft.
- **Duolingo** — character + polish (esp. its dark starry-indigo hero variant: luminous ground, a glowing
  centered object, friendly pills).
- **Spiritual / religious / meditation sites + apps** — Moonly (dark indigo + glowing deity-art cards +
  gold), Function (cinematic photo + italic serif), Co_Mory Sacko (atmospheric editorial serif), 5 Minute
  Journal / mymind (warm refined serif + gold + soft gradient), Waking Up (Apple-like minimal restraint).
- **Avoid:** Headspace's website look — the colors/illustration language are nice, but it reads very white
  and dashboard-like. We are immersive and atmospheric, not a white dashboard.

**Local corpus:** `design/references/` (9 saved screenshots: calm-web-hero, calm-app-home, function-hero,
moonly-mantra-cards, duolingo-dark, comory-sacko-editorial, five-min-journal, waking-up, mymind). Add more
as we find them; put each new reference here so the whole team designs against the same bar.

---

## 1. The aesthetic

**Radiant devotion (light-first).** Radha Krishna are light, knowledge, color, and joy: Vrindavan gardens,
dawn over the Yamuna, Holi color, marigold and lotus, gold and peacock hues. The site's default mood is
**bright, luminous, colorful, and happy**, glowing with life. It should feel like a bright morning in Braj,
not a temple at midnight. Gold is the precious light; real Radha Krishna art is the hero. Calm's daytime
serenity + Function's cinematic restraint + Duolingo's joyful confidence + Apple's precision.

**Founder guardrail (important):** do NOT let it go dull, dark, or gloomy. Bright and colorful is the
signature. Deep tones are a **seasoning for vibrance and contrast**, used sparingly on select surfaces, not
the ground the whole site sits on.

**Surface moods (bright-led):**

- **Radiant-light (default, ~80%):** warm cream and soft luminous color-washes (peacock, lotus, gold,
  dawn), generous light, elegant serif, real art. Bright, alive, joyful. Stories, questions, temples,
  hubs, most of the homepage.
- **Rich-accent (sparing, for vibrance):** a deeper, saturated surface (indigo/peacock with a warm glow)
  used deliberately for a hero moment, a shloka card, or the daily-darshan focus — for drama and contrast,
  never gloom, and never the whole page. Think a vivid festival night, lamps and color, not emptiness.

**What we are moving away from (the basic first pass):** flat cream everywhere, text-on-color heroes, a
thin geometric icon, hard-edged bordered cards, uniform spacing, no depth, no imagery. And equally, away
from anything dark, muted, or somber.

## 2. Theme (confirmed)

Blue-led but bright, intentional, validated by the references (Calm's daytime palette).

- **Warm cream / ink** — the dominant ground. Bright, warm, alive. Reading + most surfaces.
- **Peacock blue** + **jade/peacock green** — the divine core accents (Krishna's color), used bright and
  saturated, not muted.
- **Brass gold** — the precious light: haloes, fine rules, active states, small ornament, glow. Never a
  flat fill.
- **Lotus pink** + **marigold/saffron warmth** — joyful color accents (flowers, Holi, festival).
- **Deep midnight indigo** — a **sparing rich-accent ground** for select hero/shloka/darshan surfaces only,
  for vibrance and contrast. Not the site's default ground.
- **Terracotta** — a minor warm accent, the quiet tie to the bhagavadgita.com / vedvyas.com family.

Net: a bright, colorful, joyful devotional palette led by cream + peacock + gold, with indigo as an
occasional deep accent for drama, never the base.

## 3. Typography

Type carries the polish (Function, Waking Up, 5 Minute Journal all lead with type).

- **Display serif** for hero + headings: high-contrast, classical, a little editorial. Crimson Pro is the
  baseline; evaluate a more distinctive display cut (e.g. Fraunces) for hero moments. Use **italic** serif
  for signature lines (the Function move).
- **Humanist sans** (Inter) for body + UI, set generously (line-height ~1.7, comfortable measure ~66ch).
- **Devanagari** (Noto Serif Devanagari) for verses/mantras, sized as a first-class reading scale.
- Refined details: balanced headings (`text-wrap: balance`), tasteful letter-spacing on eyebrows/labels,
  tabular numerals for data, a real type scale held consistently.

## 4. Components (the polish spec)

- **Wordmark, not a basic icon.** A refined lockup: an elegant serif "Radhakrishna" with a small,
  crafted gold mark (a peacock-feather eye / flute / lotus rendered with real care, subtle gradient +
  glow), not a flat line drawing. The mark should hold up at favicon size and feel made by a brand lead.
- **Cinematic hero.** Full-bleed or large real Radha Krishna art, luminous-dark ground, a refined serif
  headline (with one italic line), a soft gold glow behind the focal point, generous vertical rhythm.
  Overlaid text stays crisp (HTML), art stays behind.
- **Cards with depth + glow.** Soft, layered shadows, larger radius (16-20px), gentle inner gradient,
  hover lifts and warms (a faint gold ring). Moonly's glowing art cards for mantras/deities; quiet warm
  cards for reading.
- **Frosted-glass nav.** Translucent, blurred, pill-rounded, subtle border, gold active indicator. Sticky,
  light on mobile.
- **Buttons.** Primary = peacock/gold gradient with a soft glow; secondary = quiet outline; refined
  heights, generous padding, smooth transitions. Not flat shadcn defaults.
- **Ornaments.** Fine gold hairlines, a restrained mandala/paisley watermark at very low opacity, lotus and
  peacock-feather motifs rendered with gradient + glow, never flat clip-art.
- **Motion.** Slow, calm, GPU-only: gentle fade-ups on scroll, a soft ambient glow drift behind the hero,
  hover warmth. Respect `prefers-reduced-motion`. The feel is a lamp flame, never busy.

## 5. Imagery strategy (the #1 lever)

Calm leads with immersive imagery; so must we. Real, original, beautiful Radha Krishna art is what turns a
tidy site into a devotional experience.

- **Hero + section art** via Gemini Nano Banana Pro (painterly, luminous, correct iconography); brand
  graphics + typographic cards via gpt-image-2. Pipeline + prompt templates in `research/08` + `04`.
- Every hero, cluster header, story, festival, and temple ships with matching art. WebP, responsive,
  LCP-prioritized, real alt text.
- Build a `brand-refs/` set from the first 3-5 great renders so the whole site inherits one look.
- Performance budget still rules: art is optimized WebP, sized, lazy below the fold. Beauty never breaks
  LCP < 2.0s (docs/03 §4).

## 6. How we work (iterate to the bar)

Head-of-brand loop, repeated until it matches the corpus:

1. Build/adjust a surface. 2. Screenshot it (mobile-first, gstack browser). 3. Put it beside the reference
   (Calm/Function/Moonly). 4. Name the specific gaps (type weight, spacing, depth, glow, imagery). 5. Fix.
   Repeat. Ship nothing that looks like the generic first pass.

## 7. Design tokens to add/upgrade (implementation)

- Elevation: a soft shadow scale (`--shadow-sm/md/lg/glow`) tuned for both surfaces.
- Radius: bump card radius; add `--radius-2xl`.
- Glow: reusable `--glow-gold`, `--glow-divine` radial tokens for hero + cards.
- Type scale + display serif variable; verse scale.
- Glass: `--glass-bg`, `--glass-border`, blur utilities for the nav.
- Keep everything semantic and theme-aware (both moods).

---

_Corpus + analysis from Mobbin (Calm, Headspace, Moonly, Function, Waking Up, 5 Minute Journal, ClassPass,
Superpower). This doc governs `03` §2-3 (tokens + components) and every surface we build._
