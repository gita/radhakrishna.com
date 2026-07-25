# Research 04 — bg-frontend (Bhagavadgita.com)

Study of `/Users/radhakrishna/Documents/bg-frontend`, the Bhagavadgita.com frontend — a
sibling devotional property owned by the same org (Ved Vyas Foundation / JKYog) as
vedvyas.com and radhakrishna.com. Goal: extract shared brand language, content
structure, SEO/schema patterns, and reusable devotional UI for Radha Krishna content.

> Node_modules skipped. All paths below are relative to `bg-frontend/` unless absolute.

---

## 1. Tech stack, router, styling

| Area           | Choice                                                                                                                                                                   |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Framework      | **Next.js 16.0.7** (App Router), **React 19.2**, **TypeScript 5**                                                                                                        |
| Bundler        | **Turbopack** + **React Compiler** (`reactCompiler: true`, automatic memoization)                                                                                        |
| Router         | **App Router** (`src/app`), optional-catch-all locale segment `[[...locale]]` on nearly every route                                                                      |
| Styling        | **Tailwind CSS 3.4** + `@tailwindcss/typography` + `tailwindcss-animate`; **shadcn/ui**-style primitives on **Radix UI** (`src/components/ui`, `components.json`)        |
| Component libs | Radix UI (accordion, dialog, dropdown, tabs, tooltip, select…), Headless UI, Heroicons + **lucide-react**                                                                |
| Animation      | **framer-motion** 12                                                                                                                                                     |
| State          | **Redux** + redux-thunk + next-redux-wrapper (legacy), plus `next-themes` for dark mode (though theme is also toggled manually via `document.documentElement.classList`) |
| Data/back-end  | **Supabase** (auth + chat storage), **Upstash Redis** + ratelimit, **Vercel AI SDK** (`ai`, `@ai-sdk/openai`, `@ai-sdk/react`) powering "Gita GPT"                       |
| Content        | Static **JSON files** in `data/` (not a CMS) — see §2                                                                                                                    |
| Analytics      | **Plausible** (privacy-friendly, self-configured script in `layout.tsx`) + `p.usestyle.ai`                                                                               |
| Monitoring     | **Sentry** (`@sentry/nextjs`, org `writesonic`, project `bhagavadgitaio-frontend`)                                                                                       |
| i18n           | Custom translate layer (`src/shared/translate`), locale via URL segment; 7 languages                                                                                     |
| SVG            | `@svgr/webpack` (imported as React components)                                                                                                                           |
| Deploy         | Vercel (`vercel.json`, `.vercel`), Netlify plugin also present                                                                                                           |

Notable: verse pages are **fully statically generated** (`generateStaticParams` over every
verse × 2 locales, `revalidate = false`, `dynamicParams = false`) — "Bhagavad Gita verses
never change, cache forever." Verse-range URLs (e.g. `4-6`) get auto-generated permanent
redirects from each member verse (`next.config.js` → `generateVerseRedirects()`).

---

## 2. Design tokens — the shared devotional brand language

Tokens live in `src/app/global.css` (HSL CSS variables, shadcn convention) + `tailwind.config.js`.
The palette is a **warm cream + terracotta/saffron** system with named light/dark themes
called **"Prakash" (light)** and **"Nisha" (dark)** — reuse these names on radhakrishna.com.

### Color primitives (HSL)

**Light ("prakash"):**

- `--background: 48 33% 97%` — warm cream (`#FAF8F0`-ish)
- `--foreground: 48 20% 20%` — dark warm brown
- `--primary: 15 56% 52%` — **terracotta / saffron-clay** (the signature devotional accent)
- `--secondary`/`--accent: 46 23% 89%` — sand
- `--muted: 44 29% 90%`, `--border: 50 8% 84%`, `--radius: 0.5rem`

**Dark ("nisha"):**

- `--background: 60 3% 15%` — near-black warm charcoal
- `--foreground: 46 10% 74%`
- `--primary: 15 63% 60%` — brighter terracotta

**Semantic content colors** (used on verse pages, both modes defined):
`--sanskrit-text` (`35 36% 21%` brown), `--commentary-text`, plus a full
`--verse-*` scale (`verse-dark-text`, `verse-warm-brown #996b4a`, `verse-banner-bg #f5f0ea`,
`verse-progress-fill`, `verse-divider-dots #b8afa5`, `verse-card-bg`, etc.) — a
purpose-built reading-experience token set worth cloning wholesale.

**Legacy/brand hexes still referenced** (migration leftovers, useful reference):
`my-orange #F57903`, `lead-text #FEDF89`, `box-bg #FFFAEC`, `box-stroke #FFE9B1`,
`nav-hover #FFF4D8`, `yellow-bg #FFF4D8`, `light-orange #FFE9D5`.

### Typography (multi-script, the core of the brand system)

Fonts loaded via `next/font/google` in `src/app/layout.tsx`, exposed as CSS vars:

| Role                                  | Font                             | Var                       |
| ------------------------------------- | -------------------------------- | ------------------------- |
| Body / verses / reading (Latin serif) | **Crimson Pro**                  | `--font-crimson`          |
| UI / buttons / nav (Latin sans)       | **Inter**                        | `--font-inter`            |
| Classical Sanskrit verses             | **Tiro Devanagari Sanskrit**     | `--font-sanskrit`         |
| Hindi/Marathi serif                   | Noto Serif Devanagari            | `--font-devanagari-serif` |
| Devanagari sans (UI)                  | Mukta                            | `--font-devanagari-sans`  |
| Tamil / Telugu / Gujarati             | Noto Serif Tamil/Telugu/Gujarati | `--font-*-serif`          |

`global.css` maps fonts by content role via CSS classes and `:lang()` selectors:
`.sanskrit-verse` / `.verse-text`, `.transliteration` (italic Crimson),
`.translation` (medium weight, language-aware), `.commentary` (regular). UI elements
(`button, nav, input, [role="button"]`) always fall to Inter/Mukta. This
"serif for scripture, sans for chrome, per-script font stacks" rule is the reusable
brand backbone.

Body default: `font-family: var(--font-crimson), Georgia, serif` with
`font-feature-settings: "rlig" 1, "calt" 1`.

Dark mode = `darkMode: "class"` (`.dark` on `<html>`).

---

## 3. Devotional content structure

Content is **static JSON**, not a database, loaded through `src/lib/data`. Three layers:

1. **`data/index.json`** — catalog: `languages[]` (en, hi, gu, te, ta, or, es) and
   `authors[]` (each: `id`, `name`, `sampradaya` e.g. "Advaita Vedanta", `affiliation`
   e.g. "Gita Press", and which `languages`/`content` types — commentary/translation — they cover).
   20+ commentators (Shankaracharya, Ramanuja, Sivananda, Ramsukhdas, Chinmayananda…).

2. **`data/chapters.json`** — per-chapter metadata: `chapter_number`, `verses_count`,
   and `name` + `description` objects keyed by all 7 language codes.

3. **`data/common/common_{lang}.json`** (one ~650KB file per language) — the verse bodies.
   Each verse object:
   ```json
   {
     "verse_number": "1", // or a range like "4-6"
     "sanskrit_text": "…devanagari…",
     "transliteration": "dhṛitarāśhtra uvācha…",
     "word_meanings": "word—meaning; word—meaning; …",
     "sanskrit_audio": "https://gita-audio.jkyog.org/audio/sanskrit/gita_audios/001_001.mp3"
   }
   ```
   Translations & commentaries are attached per selected author at load time
   (`gita_translations[]`, `gita_commentaries[]`).

**Hierarchy:** Book (Bhagavad Gita, 18 chapters / 700 verses) → Chapter → Verse, with
Verse decomposed into: Sanskrit (Devanagari) → Transliteration → Word-by-word meanings →
Audio → Translation (author-switchable) → Commentary (author-switchable). Verse **ranges**
are first-class (single page for `4-6`, member verses redirect in).

Additional content types: `data/authors/`, `data/snippets/` (for Gita GPT RAG training),
Mahabharata characters page, quotes (`data/` + `bhagavad-gita-quotes` route).

**Routing pattern** (directly transferable):
`/chapter/[chapterNumber]/(chapter)/[[...locale]]` and
`/chapter/[chapterNumber]/verse/[verseNumber]/[[...locale]]`.

---

## 4. SEO / schema / sitemap patterns

**Rich JSON-LD**, injected via `<script type="application/ld+json" dangerouslySetInnerHTML>`.

- **Home** (`src/app/[[...locale]]/page.tsx`) emits **four** graphs: `Organization`,
  `WebSite` (+ `SearchAction` for sitelinks search box), `BreadcrumbList`, and a full
  **`FAQPage`** (Question/Answer array).
- **Verse pages** (`…/verse/…/functions.ts`) emit two: a **`BreadcrumbList`** and a
  **`CreativeWork`** declared `isPartOf` a **`Book`** (`Bhagavad Gita`, alternateName
  `["Srimad Bhagavad Gita", …]`, author `Vyasa`, `numberOfPages: 700`, `genre: "Scripture"`,
  `inLanguage: ["sa","en","hi"]`), `hasPart` a `Chapter`, `publisher` Ved Vyas Foundation,
  `isAccessibleForFree: true`, `license` → /copyright. This is the key trick: it makes each
  verse legible to search engines as **scripture**, not a generic page.
- **App landing** emits `SoftwareApplication` with `aggregateRating` driven from a single
  `STORE_STATS` constant (`4.8` / `1680` reviews / `500,000+`) kept in sync with visible copy.
- **Gita GPT** page reuses `Organization` (with `sameAs` social array) + `BreadcrumbList`.

**Metadata** via `generateMetadata()` per route. Verse example: dynamically builds a
160-char description (`prefix + verse text/translation, truncated`), bilingual title,
per-language `keywords`, full `openGraph` (`type: "article"`, `siteName`, `images` banner,
`tags: ["Krishna","Bhagavad Gita",…]`), `twitter` `summary_large_image` (`site: @ShriKrishna`),
and `alternates.languages` **hreflang** map (`x-default`, `en`, `en-US/GB/IN`, `hi`) + `canonical`.

**Sitemap** (`src/app/sitemap.ts`, native `MetadataRoute.Sitemap`): programmatically emits
static paths + every chapter + every verse × locales (`""` and `hi`), with priorities
(home 1.0, chapters 0.9, static 0.8, verses 0.7) and `changeFrequency`. It reads real verse
numbers (incl. ranges) from `common_en.json`.

**FAQ content** lives in `src/components/Home/FAQ.tsx` as bilingual `FAQItem[]` arrays
(also accepts `customFaqs`); the same Q&A text feeds both the accordion UI and the `FAQPage`
JSON-LD — one source, two consumers. Good pattern to copy.

---

## 5. Reusable devotional UI patterns

All in `src/components`. Highest-value for Radha Krishna content:

- **Verse layout** (`components/Verse/index.tsx`) — the canonical reading template:
  centered `max-w-[680px]` column; `VerseHero` (breadcrumb + title banner); Sanskrit block
  (`.sanskrit-verse`, `lang="sa"`, terracotta, `whitespace-pre-line`, loose leading);
  transliteration block; inline audio player; **WordMeanings** (parses `"word—meaning; …"`
  into a responsive 2-col grid, Sanskrit term italic warm-brown); `SectionDivider` (`•••`
  dotted); `SectionHeading` (13px uppercase tracked); `Translation` + `Commentary`
  (author-switchable); `VerseNavigation` (prev/next across chapter boundaries, range-aware).
- **Two audio players** (both custom, no external player lib despite `react-h5-audio-player`
  being installed):
  - `components/Verse/index.tsx` → `InlineAudioPlayer` — pill-shaped, play/pause + seekable
    progress bar + time; **handles verse ranges** by concatenating per-verse MP3s, preloads
    durations, cross-track seeking. Prefers `sanskrit_audio` URL from data, falls back to
    `gita.github.io/.../verse_recitation/{ch}/{v}.mp3`.
  - `components/Headers/AudioPlayer/index.tsx` — modal (Headless UI Dialog) full player with
    prev/next verse nav and **playback-rate buttons** (0.75/1/1.5/2×), syncs `?audio=1` to URL.
- **Cards** (`components/blocks/cards/`): `AuthorCard`, `BenefitCard`, `ChapterGroupCard`,
  `EnhancedCharacterCard`.
- **Decorative devotional motifs** (`components/blocks/decorative/`): `DecorativeFlower`,
  `FloralCorner`, `FloralDivider`, `MandalaPattern`, `VedicPattern` — reusable sacred ornamentation.
- **Page sections** (`components/blocks/page-sections/`): `enhanced-hero`, `page-hero`,
  `cta-section`, `mission/vision/values-section`, `epic-story-section`, `FamilyTreeSection`,
  `modern-relevance-section`, `what-is-gita-section`, `sacred-authors-section`,
  `legal-content-page` — a full marketing/landing kit.
- **Daily-content widget**: `verse-of-the-day` route + `src/app/api/verse-of-the-day/route.ts`
  (deterministic daily verse via `getDailyVerse`, cached `s-maxage=3600 stale-while-revalidate=86400`).
- **FAQ accordion** (framer-motion, `+`→`×` rotate, a11y `aria-expanded`/`aria-controls`).
- **Nav** (`components/Headers/ModernNav.tsx`): sticky blurred header, mobile Sheet, Chapters
  mega-dropdown (2-col), Supabase auth (avatar/sign-in modal), manual dark-mode toggle,
  language dropdown.
- Quotes page (`bhagavad-gita-quotes`) — shareable devotional quote cards ("Read, share & inspire").

Note: the site does **not** implement Web Share API / clipboard share buttons — sharing is
via OG/Twitter meta only. That is a gap you could improve on for radhakrishna.com.

---

## 6. Footer & cross-property linking (exact list)

Footer is `src/components/Footers/Footer.tsx` (4-column). Brand = "Bhagavad Gita", tagline
**"Ancient wisdom for modern life"**, copyright **© Ved Vyas Foundation** → `https://vedvyas.com/`.

### Exact external properties / URLs referenced across the codebase

**Parent org & sibling sites**

- `https://vedvyas.com/` — Ved Vyas Foundation (parent non-profit, copyright holder)
- `https://radhakrishna.com/` — linked in footer "Resources" as **"Radha Krishna"** (this project's live sibling)
- Logo asset reused across sites: `https://bhagavadgita.com/static/images/radhakrishna.png` (used as Organization `logo`)

**In-product apps / features (internal routes)**

- `/gitagpt` — "Gita AI" / **Gita GPT** (AI chat, one of the first Gita GPTs; Vercel AI SDK + Supabase)
- `/bhagavad-gita-app` — "Mobile App" landing (redirected from legacy `/app`)
- `/bhagavad-gita-quotes` — "Quotes"
- `/verse-of-the-day`, `/verse-parallel`, `/mahabharata-characters`, `/about`,
  `/acknowledgements`, `/donate`, `/search`, `/copyright`, `/privacy-policy`, `/terms-of-service`

**Mobile apps**

- Google Play: `https://play.google.com/store/apps/details?id=com.gitainitiative.bhagavadgita`
- App Store: `https://apps.apple.com/us/app/bhagavad-gita-hindi-english/id1602895635`
- App package id: `com.gitainitiative.bhagavadgita`; Store stats used: 4.8★ / 1,680 reviews / 500,000+ downloads

**APIs & infra (shared org services)**

- `https://api.bhagavadgita.com/v2/search?query=` — search API
- `https://rapidapi.com/bhagavad-gita-bhagavad-gita-default/api/bhagavad-gita3` — public "API" (footer Resources)
- `https://gita-audio.jkyog.org/audio/sanskrit/gita_audios/…mp3` — **primary Sanskrit audio host (JKYog CDN)**
- `https://gita.github.io/gita/data/verse_recitation/{ch}/{v}.mp3` — fallback recitation audio
- `https://github.com/gita` — GitHub org (footer social)

**Social profiles** (Organization `sameAs`, reused across bhagavadgita.com + radhakrishna.com brand):

- Facebook: `https://www.facebook.com/iiRadhaKrishnaii/` (also `/radhakrishnablog/` as OG article author)
- Twitter/X: `https://twitter.com/ShriKrishna` (`@ShriKrishna`)
- LinkedIn: `https://www.linkedin.com/company/bhagavadgita/`
- Pinterest: `https://www.pinterest.com/iiradhakrishnaii/`

**Contact:** `contact@bhagavadgita.io`. Download-badge assets: `/play_store.svg`, `/app_store.svg`.

There is **no dedicated "our other apps" ecosystem switcher / mega-menu** — cross-property
linking is light: a single "Radha Krishna" resource link + Ved Vyas Foundation copyright +
the Radha Krishna social handles. The shared identity is expressed mostly through **brand
assets** (the `iiRadhaKrishnaii` social handles, `radhakrishna.png` logo) and the common
JKYog/Ved Vyas backend (audio CDN, foundation).

---

## Key takeaways for radhakrishna.net

1. **Adopt the token system verbatim**: cream/terracotta HSL palette, "Prakash/Nisha"
   light/dark naming, and the `--verse-*` reading-experience scale.
2. **Reuse the multi-script font architecture**: Crimson Pro (reading) + Inter (UI) +
   Tiro Devanagari Sanskrit (verses) + Noto Serif per-language, mapped by content-role CSS classes.
3. **Copy the verse template + custom audio players + decorative motifs** (`blocks/decorative`)
   directly — they are content-agnostic devotional UI.
4. **Copy the SEO stack**: `CreativeWork`+`Book` JSON-LD to mark content as scripture,
   single-source FAQ→`FAQPage`, programmatic `sitemap.ts`, hreflang `alternates`, static-gen everything.
5. **Cross-link back**: bhagavadgita.com already links out to radhakrishna.com; reciprocate,
   and share the JKYog audio CDN + Ved Vyas Foundation footer/social identity.
6. **Improve on the gap**: add real Web Share / copy-link / WhatsApp share buttons (absent here).
