# Ved Vyas Website — Canonical Branding + Tech Blueprint

> Reverse-engineered from `/Users/radhakrishna/Documents/vedvyas-website` (the "yesterday revamp").
> This is the CANONICAL blueprint that `radhakrishna.net` must match. Every token, class, and
> file path below is quoted verbatim from source. Skip `node_modules`.

---

## 0. Executive summary — what this stack IS

- **Next.js 16.0.7 (App Router, RSC)** + **React 19.2.1** + **TypeScript 5.7** + **Tailwind 3.4.18**.
- **shadcn-style** (not full shadcn — only the `button` primitive, hand-authored, no Radix).
- Fully **static** site: 3 routes (`/`, `/ved-vyas`, `/about`), all statically prerendered.
- **Content-as-code**: all copy lives in `content/site.ts` + `content/pages.ts` (typed TS objects,
  NO MDX, NO CMS). JSX reads from these modules; sitemap/robots/manifest/OG derive from the same
  source so they never drift.
- **Branding = bhagavadgita.com**: warm-cream "Prakash" light theme + charcoal "Nisha" dark theme,
  terracotta accent `hsl(15 55% 52%)` ≈ `#c96442`, Crimson Pro serif headings, Inter body,
  Noto Serif Devanagari for ॐ / व्यास glyphs.
- **SEO-maximal**: rich JSON-LD entity graph (NGO + WebSite + product nodes), FAQPage/Person/
  Breadcrumb schema, dynamic `next/og` OG cards rendered at build time, Plausible analytics.
- Notable custom touches: **email obfuscation** (address never in served HTML), **browser-frame**
  screenshot chrome, **stretched-link** cards, reduced-motion handling.

The current `radhakrishna.net` is the old `tailwind-nextjs-starter-blog` (JS, MDX, `siteMetadata.js`,
`layouts/`). Matching this blueprint means a **full rewrite** to the TS/App-Router/content-module stack.

---

## 1. DESIGN TOKENS

### 1.1 Where tokens live

- **Color + radius**: `app/globals.css` `:root` (light) and `@media (prefers-color-scheme: dark) :root` (dark). HSL-triplet CSS vars.
- **Tailwind mapping**: `tailwind.config.ts` maps each var into a Tailwind color via `hsl(var(--x))`.
- **Fonts**: `app/layout.tsx` via `next/font/google`, exposed as CSS vars, wired in `tailwind.config.ts fontFamily`.
- **Theme colors (browser chrome)**: `app/layout.tsx viewport.themeColor` + `app/manifest.ts`.

### 1.2 Color palette — reproduce EXACTLY

Tokens are stored as **HSL triples** (no `hsl()` wrapper) so Tailwind can do `hsl(var(--x) / <alpha>)`.

**Light — "Prakash" (`:root`)**

```css
--background: 48 33.33% 97.06%; /* warm cream  ≈ #faf9f5 */
--foreground: 48 19.61% 20%; /* warm ink    ≈ #3d3a2f-ish */
--card: 0 0% 100%; /* pure white  #ffffff */
--card-foreground: 60 2.56% 7.65%; /* near-black  ≈ #141413 */
--primary: 15.11 55.56% 52.35%; /* terracotta  ≈ #c96442  <-- BRAND ACCENT */
--primary-foreground: 0 0% 100%; /* white */
--secondary: 46.15 22.81% 88.82%; /* warm sand   ≈ #e6e1d5 */
--secondary-foreground: 50.77 8.5% 30%;
--muted: 44 29.41% 90%; /* warm muted  ≈ #ebe5d8 */
--muted-foreground: 50 6% 42%; /* warm grey text */
--accent: 46.15 22.81% 88.82%; /* == secondary */
--accent-foreground: 50.77 19.4% 13.14%;
--border: 50 7.5% 84.31%; /* warm hairline ≈ #d9d5cc */
--ring: 15.11 55.56% 52.35%; /* == primary (focus rings) */
--radius: 0.5rem;
```

**Dark — "Nisha" (`@media (prefers-color-scheme: dark)`)**

```css
--background: 60 2.7% 14.51%; /* charcoal    ≈ #262625 */
--foreground: 46 24% 92%; /* warm off-white */
--card: 60 2.7% 17.5%; /* raised charcoal */
--card-foreground: 46 24% 92%;
--primary: 14.77 63.11% 59.61%; /* brighter terracotta for dark ≈ #d97a5a */
--primary-foreground: 60 2.7% 10%;
--secondary: 60 2.5% 22%;
--secondary-foreground: 46 20% 88%;
--muted: 60 2.5% 22%;
--muted-foreground: 48 6% 65%;
--accent: 60 2.5% 24%;
--accent-foreground: 46 24% 92%;
--border: 60 2.5% 26%;
--ring: 14.77 63.11% 59.61%;
```

**Fixed hex used elsewhere (must stay in sync with the tokens):**

- `app/layout.tsx viewport.themeColor`: light `#faf9f5`, dark `#262625`.
- `app/manifest.ts`: `background_color: '#faf9f5'`, `theme_color: '#c96442'`.
- `lib/og.tsx` OG palette constant `C`: `bg #faf9f5`, `ink #33302a`, `muted #6b6559`, `accent #c96442`.

> **Dark mode is `media`-based only** (`darkMode: 'media'` in Tailwind + `prefers-color-scheme` in CSS).
> There is NO theme toggle, NO `next-themes`, NO `.dark` class. The OS decides.

### 1.3 Typography

Three families, all via **`next/font/google`** in `app/layout.tsx`, `display: "swap"`, exposed as CSS vars:

```ts
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const crimson = Crimson_Pro({ subsets: ['latin'], variable: '--font-crimson', display: 'swap' })
const devanagari = Noto_Serif_Devanagari({
  subsets: ['devanagari'],
  variable: '--font-devanagari',
  display: 'swap',
})
// applied on <html className={`${inter.variable} ${crimson.variable} ${devanagari.variable}`}>
// <body className="font-sans">
```

Tailwind `fontFamily` (in `tailwind.config.ts`):

```ts
sans:  ['var(--font-inter)', 'system-ui', 'sans-serif'],   // body -> font-sans (default on body)
serif: ['var(--font-crimson)', 'Georgia', 'serif'],        // headings -> font-serif
dev:   ['var(--font-devanagari)', 'serif'],                // ॐ / व्यास glyphs -> font-dev
```

**Type usage patterns observed:**

- All `h1/h2/h3` use `font-serif ... font-semibold tracking-tight` (Crimson Pro).
- Body / paragraphs: default `font-sans` (Inter), `text-muted-foreground`, `leading-relaxed`.
- Hero `h1`: `text-4xl ... sm:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-balance`.
- Section `h2`: `text-3xl sm:text-4xl`. Sub `h3`: `text-xl sm:text-2xl`.
- Eyebrows: `text-xs font-medium uppercase tracking-[0.18em] text-primary`.
- Body prose: `text-base sm:text-lg leading-relaxed`, uses `text-balance` on headings and `text-pretty` on paragraphs.
- **Static OG fonts**: `public/fonts/Inter-Regular.ttf` + `Inter-SemiBold.ttf` (read from disk in `lib/og.tsx`, since `next/og` needs raw font buffers).

### 1.4 Spacing / layout scale

- **Container** (`tailwind.config.ts theme.container`): `center: true`, padding `DEFAULT 1.25rem / sm 1.5rem / lg 2rem`, `screens: { '2xl': '1200px' }`. Used as `className="container"` everywhere.
- **Content measure**: text blocks wrapped in `max-w-2xl` / `max-w-3xl`; hero image `max-w-4xl`; centered with `mx-auto`.
- **Section rhythm**: `py-20 sm:py-28` for major sections; `py-14 sm:py-20` for page heros; `py-16 sm:py-20` on subpages. Sections separated by `border-t border-border/60`.
- **Grid gaps**: cards `gap-5`; mission `gap-x-10 gap-y-9`.

### 1.5 Radii

`--radius: 0.5rem`. Tailwind `borderRadius`: `lg: var(--radius)`, `md: calc(--radius - 2px)`, `sm: calc(--radius - 4px)`.
Observed usage: cards `rounded-2xl`, quick-fact/role cards `rounded-xl`, browser-frame `rounded-xl`, **buttons `rounded-full`** (pill), logo disc `rounded-full`, focus targets `rounded-md`.

### 1.6 Shadows

Tailwind defaults + a few custom tints:

- Cards: `shadow-sm` → hover `shadow-md`.
- BrowserFrame: `shadow-xl shadow-foreground/[0.07] ring-1 ring-foreground/5`.
- Ved-Vyas hero image: `shadow-lg shadow-foreground/10`.
- No custom shadow scale in the Tailwind config — all via utilities with `foreground`-tinted alpha.

### 1.7 Gradients

One custom utility in `globals.css @layer utilities` — the warm "paper wash" behind heros:

```css
.hero-wash {
  background:
    radial-gradient(ellipse 90% 60% at 50% -10%, hsl(var(--primary) / 0.13), transparent 70%),
    radial-gradient(ellipse 70% 50% at 85% 10%, hsl(38 70% 60% / 0.1), transparent 65%);
}
```

Applied on the home hero `<section>` and on the `/about` + `/ved-vyas` page-hero sections.

### 1.8 Motion

- Keyframe `fade-up` (opacity 0→1, translateY 12px→0) → animation `fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both`.
- Used as `animate-fade-up` with staggered inline `[animation-delay:60ms|120ms|180ms|240ms|300ms]` on hero children.
- `globals.css` honors `prefers-reduced-motion: reduce` (kills animations/transitions, disables smooth scroll).
- `html { scroll-behavior: smooth; scroll-padding-top: 5rem }` so anchors clear the sticky header.

---

## 2. Tailwind config (`tailwind.config.ts`)

- `darkMode: 'media'`.
- `content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}']`.
- `theme.container` — see §1.4.
- `theme.extend`:
  - `fontFamily` — see §1.3.
  - `colors` — every shadcn semantic color mapped to `hsl(var(--x))`: `border, ring, background, foreground, primary{DEFAULT,foreground}, secondary{...}, muted{...}, accent{...}, card{...}`. (Note: no `destructive`, no `popover`, no `input` — trimmed to what's used.)
  - `borderRadius` lg/md/sm — see §1.5.
  - `keyframes.fade-up` + `animation.fade-up`.
- **Plugins**: `require('tailwindcss-animate')` (only one).
- **PostCSS** (`postcss.config.js`): `tailwindcss` + `autoprefixer`.

---

## 3. shadcn setup

`components.json`:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib"
  },
  "iconLibrary": "lucide"
}
```

**Installed primitives**: only `components/ui/button.tsx`. That's it — no card/dialog/etc. Everything
else is bespoke composition with Tailwind classes.

**How button is custom-branded** (`components/ui/button.tsx`):

- Uses `class-variance-authority` (`cva`) + `cn` (clsx + tailwind-merge). **No Radix `Slot`** — the file
  comment explains Slot calls `React.createContext` at module scope, which breaks RSC import; so links
  get the button look via a separate `ButtonLink` (a styled `<a>`), not `asChild`.
- Base: `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ... [&_svg]:size-4 [&_svg]:shrink-0`.
- Variants: `default` (`bg-primary text-primary-foreground shadow-sm hover:brightness-110 active:brightness-95`), `outline` (`border border-border bg-transparent hover:bg-accent`), `secondary`, `ghost`.
- Sizes: `default h-11 px-5 py-2` (44px min touch target — HIG/Material), `lg h-12 px-7 text-base`, `sm h-9 px-4`.
- Exports: `Button`, `ButtonLink` (auto-adds `target=_blank rel=noreferrer` for `http` hrefs), and `buttonVariants` (so any element can wear the button look, e.g. the `ObfuscatedEmail` uses `className={buttonVariants({ size:"lg" })}`).

`lib/utils.ts` — the standard `cn()`:

```ts
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**Deps**: `class-variance-authority@^0.7.1`, `clsx@^2.1.1`, `tailwind-merge@^2.6.0`, `lucide-react@^0.469.0`.

---

## 4. COMPONENT ARCHITECTURE

Directory `components/` (flat + `ui/`). Every component is a **Server Component** except `obfuscated-email` (`"use client"`).

| File                              | Role              | Notes / composition                                                                                                                                                                                                                                                                                                                |
| --------------------------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `components/ui/button.tsx`        | Button system     | `Button`, `ButtonLink`, `buttonVariants` (cva). See §3.                                                                                                                                                                                                                                                                            |
| `components/site-header.tsx`      | Sticky top nav    | `sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md`. Logo = ॐ in `bg-primary/10` disc (`font-dev`, `translate-y-[5px]` optical nudge) + "Ved Vyas Foundation" serif wordmark. Nav links array `[About, Projects(#projects), Ved Vyas, Contribute(#contribute)]`, hidden `<lg`. `ButtonLink → /#contact` "Get in touch". |
| `components/site-footer.tsx`      | 4-col footer      | Reads `projects` + `site` from content. Columns: brand blurb / **Projects** (maps `projects[].href`, external) / **Foundation** (About, Who was Ved Vyas, mission, contribute) / **Connect** (ObfuscatedEmail + GitHub/LinkedIn/X). Bottom bar `© {year} + "Made as an offering. Free and ad-free for everyone."` `bg-accent/20`.  |
| `components/browser-frame.tsx`    | Screenshot chrome | `next/image` inside faux browser window: 3 traffic-light dots + fake address bar `label`. `rounded-xl border bg-card shadow-xl ring-1`. Decorative chrome `aria-hidden`; alt text on the image. Props `{src, alt, label, priority?, className?, sizes?}`, image `width 1280 height 800`.                                           |
| `components/obfuscated-email.tsx` | Anti-scrape email | `"use client"`. Takes `user`+`domain` as separate props; assembles `mailto:` in `useEffect` after mount. Pre-hydration renders a `<span>` reading `user [at] domain` — the full address never appears as one string in served HTML. Optional `subject`, accepts `children` (so it can look like a button).                         |

**Composition patterns to copy:**

- **Page shape**: every page = `<script ld+json>` + optional skip-link + `<SiteHeader/>` + `<main>{sections}</main>` + `<SiteFooter/>`. There is NO shared layout wrapper component beyond `app/layout.tsx` (fonts/metadata/JSON-LD/analytics) — header/footer are imported per-page.
- **Section pattern**: `<section id className="border-t border-border/60 py-20 sm:py-28">` → `<div className="container">` → `max-w-2xl` heading block + a grid.
- **Card pattern** (projects): `<li className="group relative flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus-within:ring-2">`. Featured card gets `border-primary/30 ring-1 ring-primary/10`.
- **Stretched-link**: the card title `<a>` has `after:absolute after:inset-0` so the whole card is clickable while staying one valid anchor; secondary links get `relative z-10` to stay above it.
- **Numbered list** (mission pillars): `<dl>` grid, each `<dt>` with a `tabular-nums text-primary` `01/02/...` index.
- **Icons**: `lucide-react` (`ArrowUpRight, Github, Linkedin, Mail`), rendered `[&_svg]:size-4` via button base.
- **Skip-link**: `sr-only focus:not-sr-only ...` at top of `app/page.tsx`.

---

## 5. CONTENT MODEL

**No MDX. No CMS. No frontmatter.** Content is typed TypeScript objects + one legacy JSON.

- `content/site.ts` — the single source of truth. Exports:
  - `site` (`as const`): `name, shortName, url (env NEXT_PUBLIC_SITE_URL ?? "https://vedvyas.com"), emailUser, emailDomain, social{github,linkedin,twitter}`.
  - `hero`, `mission{heading,intro,pillars[]}`, `projectsHeading`, `projectsIntro`.
  - `type Project = { name, tagline, description, cta, href, links?[], image, imageAlt, featured? }`.
  - `projects: Project[]` — 5 products (BhagavadGita.com [featured], Bhagavad Gita App [+App Store/Play links], GitaGPT, Hanuman Chalisa, **Radha Krishna → radhakrishna.com**).
  - `vedVyas`, `contribute{roles[]}`, `cta`, `meta{title,description}`.
- `content/pages.ts` — copy for the two content routes, `as const`:
  - `vedVyasPage` = `{ title, description, h1, lede, quickFacts[{label,value}], sections[{heading, body:string[]}], faqs[{q,a}] }`.
  - `aboutPage` = `{ title, description, h1, lede, sections[{heading, body:string[]}] }`.
- `content/copy.json` — **legacy/stale** earlier draft (4 projects, ad-light wording). Superseded by `site.ts`; not imported by any route. (Safe to delete; kept as history.)

**Page generation model:**

- **All static, hand-routed** — no `generateStaticParams`, no dynamic `[slug]` routes, no templated collection. Three explicit route folders: `app/page.tsx`, `app/about/page.tsx`, `app/ved-vyas/page.tsx`.
- Pages `.map()` over the content arrays to render sections/cards/FAQs. Editing copy = edit the content module, never JSX.
- Everything is statically prerendered at build (README: "Every route is statically prerendered").
- **Static vs dynamic**: 100% static. The only "generated" artifacts are metadata routes (sitemap/robots/manifest) and OG images, all build-time.

---

## 6. SEO / METADATA

### 6.1 Root metadata (`app/layout.tsx export const metadata`)

- `metadataBase: new URL(site.url)`.
- `title: { default: meta.title, template: "%s | Ved Vyas Foundation" }`.
- `description`, `applicationName`, `authors`, `creator`, `publisher`, `alternates.canonical:"/"`, `category:"Religion and Spirituality"`.
- `openGraph` (type website, siteName, url, title, description, locale `en_US`).
- `twitter` (`summary_large_image`, `@ShriKrishna`).
- `robots` (index/follow + googleBot `max-image-preview:large`, `max-snippet:-1`, `max-video-preview:-1`).
- `icons` (favicon.ico + 32/16 png + apple-touch), `manifest:"/manifest.webmanifest"`.
- `viewport` exported separately with `themeColor` media array (light `#faf9f5` / dark `#262625`).

### 6.2 Per-page `generateMetadata`

Not `generateMetadata()` functions — since routes are static, each subpage exports a **static `metadata` object**:

- `/about`: title/description from `aboutPage`, `alternates.canonical:"/about"`, `openGraph`.
- `/ved-vyas`: `title:{ absolute: page.title }` (bypasses the `%s | ...` template), `openGraph.type:"article"`, canonical `/ved-vyas`.

### 6.3 JSON-LD / schema.org (the crown jewel — copy the pattern)

- **`app/layout.tsx buildJsonLd()`** emits an `@graph` with:
  - `["NGO","Organization"]` node `@id #organization` — `name, alternateName, url, logo(ImageObject 512²), contactPoint(url to /#contact, NO email field on purpose), description, slogan, nonprofitStatus:"Nonprofit501c3", sameAs[github,linkedin,twitter], knowsAbout[...], owns[product @ids]`.
  - `WebSite` node `@id #website`.
  - **Product nodes generated from `projects`**: each is `MobileApplication` if it has `links` else `WebSite`, with own `@id`, `offers` (free), `publisher → #organization`. So each product is independently citable but resolves back to the foundation.
  - Injected as `<script type="application/ld+json">` in **`<body>`** (comment explains: Next owns `<head>`; ld+json is valid anywhere; keeps streamed title/canonical in head).
- **`app/page.tsx`**: page-level `WebPage` node (`isPartOf #website`, `about #organization`).
- **`app/about/page.tsx`**: `AboutPage` + `BreadcrumbList`.
- **`app/ved-vyas/page.tsx`**: `Person` (Ved Vyas, alternateNames incl. `व्यास`, parents) + **`FAQPage`** (maps `page.faqs`) + `BreadcrumbList`. FAQ mirrors Google "People Also Ask" so answer engines quote it.

### 6.4 Metadata routes (all build-time, derive from `content/site.ts`)

- `app/sitemap.ts` → `MetadataRoute.Sitemap`: 3 routes with priorities `1 / 0.9 / 0.8`, `changeFrequency:'monthly'`.
- `app/robots.ts` → allow all, `sitemap: ${url}/sitemap.xml`, `host: url`.
- `app/manifest.ts` → `MetadataRoute.Manifest`: name/short_name/description, `display:'standalone'`, bg `#faf9f5`, theme `#c96442`, 192/512 icons.

### 6.5 Dynamic OG images (`next/og` `ImageResponse`) — capture the template

- **Shared renderer `lib/og.tsx`** — `OG_SIZE = {1200,630}`, `renderOgCard({eyebrow,title,description,image})`:
  - Reads `public/fonts/Inter-Regular.ttf` + `Inter-SemiBold.ttf` + the art image from disk (`node:fs/promises`), base64-inlines the image as a data URI.
  - Layout: left text column (`width 640`, padding `64px 24px 64px 64px`) — eyebrow (`21px`, `letterSpacing 3`, uppercase, accent `#c96442`, weight 600), title (`56px`, weight 600, ink `#33302a`, `lineHeight 1.12`), description (`25px`, muted `#6b6559`). Right: `<img width 560 height 630 objectFit cover>`. Bottom: `8px` accent bar full width.
  - Palette constant `C = { bg:#faf9f5, ink:#33302a, muted:#6b6559, accent:#c96442 }`.
  - Fonts registered with `name:"Inter"` weights 400/600.
- **Route files** (Next auto-detects `opengraph-image.tsx` per segment), each exports `alt`, `size = OG_SIZE`, `contentType = 'image/png'`, and a default async fn calling `renderOgCard(...)`:
  - `app/opengraph-image.tsx` (home), `app/about/opengraph-image.tsx`, `app/ved-vyas/opengraph-image.tsx`. All currently pass `image:'og/ved-vyas.jpg'`.

### 6.6 Analytics

Plausible (privacy-friendly), loaded in `app/layout.tsx` via `next/script` `strategy="afterInteractive"` (`plausible.io/js/pa-...js` + inline init). **No Google Analytics** (recently removed per git log on radhakrishna.net too).

---

## 7. Fonts + Images

- **Fonts**: `next/font/google` (Inter, Crimson_Pro, Noto_Serif_Devanagari), `display:swap`, CSS-var strategy (§1.3). Static TTFs in `public/fonts/` only for OG rendering.
- **Images**: `next/image` used in `browser-frame`, project cards (`fill` + `object-cover object-top`, `sizes` per breakpoint), ved-vyas hero. `priority` on above-the-fold. **`next.config.js` is minimal** — only `reactStrictMode:true`, NO custom `images` config (default optimizer, default formats incl. WebP/AVIF).
- **Asset formats**: screenshots are **`.webp`** (`public/shots/*.webp`), art is `.webp`/`.png` (`public/art/`), OG source is `.jpg`. Favicons: `favicon.ico`, 16/32/192 png, `apple-touch-icon.png`, `android-chrome-192/512`.
- `public/art/` note (README): brand emblems generated with **gpt-image-2** against one fixed brand system, background-keyed to transparent so they work on either theme.

---

## 8. The footer — linking to sister properties

`components/site-footer.tsx`, **Projects** column maps over `projects` from `content/site.ts`, each an
external `<a target="_blank" rel="noreferrer">` to `project.href`. This is the cross-property link hub:
bhagavadgita.com, the Gita app, GitaGPT, hanumanchalisa.net, **radhakrishna.com**. To add/remove a
sister site you edit the `projects` array — footer, home cards, JSON-LD product nodes, and sitemap all
update from that one source. **radhakrishna.net should reciprocate**: list the other Ved Vyas properties
in its footer using the same pattern (a shared `projects`/`network` array in its own content module).

---

## 9. What to literally copy into radhakrishna.net

**Copy verbatim (near-zero changes):**

1. `app/globals.css` — the entire Prakash/Nisha token set + `.hero-wash` + reduced-motion + scroll rules. This IS the brand.
2. `tailwind.config.ts` — container, color mappings, fontFamily, radius, `fade-up` animation, `tailwindcss-animate`.
3. `components.json` (shadcn config), `lib/utils.ts` (`cn`), `components/ui/button.tsx` (Button/ButtonLink/buttonVariants).
4. `postcss.config.js`, `tsconfig.json` (`@/*` paths, strict, bundler resolution), `next.config.js`.
5. `components/browser-frame.tsx`, `components/obfuscated-email.tsx` — reusable as-is.
6. `lib/og.tsx` OG-card renderer + the `opengraph-image.tsx` route pattern (swap copy/art).
7. `app/manifest.ts`, `app/robots.ts`, `app/sitemap.ts` scaffolding.
8. The `app/layout.tsx` skeleton: `next/font` setup, metadata object, `buildJsonLd()` entity-graph pattern, Plausible wiring.

**Adapt (site-specific):**

- `components/site-header.tsx` / `site-footer.tsx` — reuse structure, swap wordmark (ॐ/name), nav links, and the sister-property list.
- `content/site.ts` + `content/pages.ts` — rewrite copy for Radha Krishna; keep the same typed shape (`site`, `projects: Project[]`, `hero/mission/contribute/cta`, page objects with `sections`/`faqs`/`quickFacts`).
- Home/about/subpage JSX section components (Hero, Mission, Projects, VedVyas, Contribute, Contact) — reuse layout classes, change content bindings. For Radha Krishna the subpages would target its own search cluster (e.g. bhajans/aarti) with the same FAQPage/Person/Breadcrumb schema pattern.

**Package baseline to match** (`package.json`): next 16.0.7, react 19.2.1, tailwind 3.4.18, tailwindcss-animate, cva, clsx, tailwind-merge, lucide-react; dev: typescript 5.7, @types, autoprefixer, postcss. `engines.node >= 20`. Scripts: `dev` (with `--max-http-header-size=65536`), `build`, `start`, `lint`.

**Conventions (from README — enforce on radhakrishna.net):**

- **No em dashes** anywhere in copy.
- **Email never in HTML** — always `ObfuscatedEmail`, never a plain `mailto:` or address in JSON-LD.
- **One canonical origin** (`.com` canonical, `.net`/`.org` 301 → it; override via `NEXT_PUBLIC_SITE_URL`).
- Edit copy in `content/*`, never in JSX. Metadata routes + OG derive from the same module so they never drift.
