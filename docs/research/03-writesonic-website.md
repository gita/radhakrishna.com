# Writesonic Website — Engineering Patterns to Replicate on Radhakrishna.com

> Research target: `/Users/radhakrishna/Documents/writesonic-website`
> A static-first Next.js 16 (App Router, React 19, Turbopack) marketing site with a
> strong design-token system, a Sanity-backed templated blog, dynamic OG images, and
> heavy SEO/structured-data investment. This document extracts the transferable
> **engineering patterns** so we can rebuild them on Radhakrishna.com **with MDX in
> place of Sanity**.

Stack at a glance (`package.json`): `next@16.2.1`, `react@19.2.3`, Tailwind **v4**
(CSS-first, `@tailwindcss/postcss`), `class-variance-authority`, `tailwind-merge` +
`clsx`, `radix-ui`, `next-sanity` + `PortableText` (→ swap for `next-mdx-remote`,
already a dependency), `shiki` (code highlighting), `next/og` (dynamic OG), `motion`.

---

## 1. Design Token System — THE pattern to learn

The token system is **three-layered** and lives almost entirely in CSS (Tailwind v4
is configured in-CSS, not in `tailwind.config.js`). There is a clean split between
**primitive tokens** (raw brand ramps) and **semantic tokens** (role-based aliases).

### Layer A — Primitive tokens (raw palette ramps)

Defined in `app/globals.css` inside Tailwind v4's `@theme inline { … }` block. Every
brand color is a full 50→950 ramp, namespaced with a `c-` prefix so it can never
collide with Tailwind defaults:

```css
@theme inline {
  --color-c-orange-500: #ff6719; /* Sonic Orange — the brand color */
  --color-c-orange-600: #f04506;
  /* …50→950 for orange, gold, beige, purple, blue, green, black … */
  --color-c-beige-50: #f5f4f0; /* warm cream page background */
  --color-c-black-950: #202020; /* ink / near-black text */
}
```

Because these are declared inside `@theme`, Tailwind v4 **auto-generates utilities**
for each: `bg-c-orange-500`, `text-c-black-950`, `border-c-beige-200`, etc. No
`tailwind.config.js` color block is needed — the CSS _is_ the config. (`tailwind.config.js`
only sets the container widths / breakpoints.)

### Layer B — Semantic / role tokens (shadcn-style)

`:root { … }` and `.dark { … }` in `app/globals.css` define role-based tokens in
**oklch** — `--background`, `--foreground`, `--primary`, `--muted`, `--border`,
`--ring`, `--card`, `--radius`, chart colors, sidebar colors. These are re-exported
into Tailwind's theme via the `@theme inline` mapping:

```css
@theme inline {
  --color-background: var(--background);
  --color-primary: var(--primary);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px); /* radii derived from one --radius knob */
}
```

Dark mode is a single class flip: `@custom-variant dark (&:is(.dark *))` + a `.dark`
block overriding the semantic tokens. This is the standard **shadcn/ui token contract**
(`components.json` → `baseColor: neutral`, `cssVariables: true`), so any shadcn
component drops in unmodified.

### Layer C — The canonical design-system source of truth

`design_system/colors_and_type.css` is a **standalone, framework-agnostic** brand file
(imported into any HTML/JSX surface, including OG generation and design previews). It
is the human-authored origin the app tokens mirror. It documents:

- **Primitive palette** with human names + intent (`--ws-sonic-orange: #ff6719`,
  `--ws-light-cream`, `--ws-ink-black`), a secondary palette explicitly scoped to
  "campaigns/social/illustration only — never replaces Sonic Orange in product UI."
- **Semantic tokens**: `--bg`, `--bg-brand`, `--fg`, `--fg-muted`, `--fg-on-brand`,
  `--border`, `--link`, `--status-success/warn/error/info`.
- **Radii** (`--r-xs`…`--r-pill`), **spacing on a 4pt grid** (`--s-1`=4px…`--s-32`=128px),
  **elevation** (`--shadow-1..3` + a brand-tinted `--shadow-pop`), a full **type scale**
  (`--t-display-xl`…`--t-micro`, line-heights, tracking), and **motion** tokens
  (`--ease`, `--dur-fast/dur/dur-slow`).
- A "SOURCE-DERIVED ALIASES" section that re-declares the app's `--color-c-*` ramps so
  code lifted from the repo runs in the standalone file without translation.

**Naming conventions to copy:**

- Primitive ramps: `--color-c-<hue>-<50..950>` (the `c-` guard prefix).
- Semantic roles: bare nouns (`--background`, `--fg-muted`, `--link`) mapped 1:1 to
  Tailwind theme keys via `@theme inline`.
- Radii/spacing/type: `--r-*`, `--s-*`, `--t-*` in the standalone DS file.

### Typography as composable utilities

`app/styles/typography.css` defines the type scale as **Tailwind v4 `@utility`
classes** (not inline class soup), each composed from a base:

```css
@utility t-heading {
  @apply text-c-black-950 leading-[1.1] font-semibold tracking-[-0.04em];
}
@utility heading-2 {
  @apply t-heading text-[40px] md:text-[64px];
}
@utility subheading-1 {
  @apply t-subheading text-[16px] md:text-xl;
}
@utility label-1 {
  @apply t-label text-sm font-semibold tracking-[0.02em];
}
```

Pages then write `class="heading-2"` instead of repeating a dozen utilities. Responsive
sizing (mobile → `md:`) is baked into the utility, so headings scale consistently
site-wide. `custom-utils.css` holds bespoke `@utility` / `@keyframes` (dot-grid
backgrounds, marquee, accordion open/close, the blog H1 "typing caret") — each with a
`@media (prefers-reduced-motion: reduce)` guard.

### CSS file organization (`app/globals.css` import graph)

```
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";
@import "./styles/typography.css";        /* type-scale utilities */
@import "./styles/layout.css";
@import "./styles/custom-utils.css";      /* bespoke utilities + keyframes */
@import "../components/pages/pricing/pricing.styles.css";   /* page-scoped CSS colocated with the page */
@config "../tailwind.config.js";          /* only container/breakpoints live here */
```

**Takeaway for us:** page-specific CSS is colocated next to the page component and
imported into globals — not dumped in one monolith.

---

## 2. Component Reusability

### Variants: `cva` + `cn()` (tailwind-merge)

The variant engine is **`class-variance-authority`** (not tailwind-variants). Every
primitive uses the same shape. `components/ui/button.tsx`:

```ts
const buttonVariants = cva("<base classes>", {
  variants: {
    variant: { default, primary, bw, dark, destructive, outline, cardCta, secondary, ghost, link },
    size:    { default, primary, bw, secondary, cardCta, xs, sm, lg, icon, "icon-sm", … },
  },
  defaultVariants: { variant: "default", size: "default" },
});
export type ButtonProps = React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?; streaming? };
```

The merge helper is the standard `cn()` in `lib/utils.ts`:

```ts
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

`twMerge` lets a caller's `className` override cva output without specificity wars.
`asChild` (via Radix `Slot`-style cloning) lets `<Button asChild><Link/></Button>`
render a link with button styling — one variant system, any element. (The button also
has an optional per-character "token streaming" hover animation — nice, but the
transferable core is the cva+cn+asChild triad.)

### Directory organization (avoids duplication by role)

```
components/
  ui/          # primitives (button, table, accordion, breadcrumbs, badge, input…) — shadcn/new-york
  sections/    # reusable cross-page sections (cta/, newsletter-cta, product-hero, homepage/…)
  features/    # feature clusters (blog/, customer-stories/) — domain components
  layout/      # navbar, footer, site-banner
  pages/<page>/          # one folder per marketing page
      <page>-page.tsx    # the page shell
      sections/          # sections used ONLY by that page
      data/              # page data as typed TS (integrations.ts, pricing data)
  seo/         # json-ld.tsx (all structured-data emitters)
```

Rule of thumb the repo follows: **shared → `sections/`; page-local → `pages/<page>/sections/`.**
Shared building blocks (`Cta`, `LogosRow`, `NewsletterCta`) are imported by many pages;
page-only sections never leak upward.

---

## 3. Blog Templating — many posts from ONE template (the key idea)

### Route structure (`app/[locale]/blog/`)

```
blog/
  page.tsx                     # index / listing (SSG)
  layout.tsx
  [slug]/page.tsx              # ← ONE template renders EVERY post
  [slug]/opengraph-image.tsx   # per-post dynamic OG
  [slug]/md/route.ts           # per-post plain-markdown endpoint (for LLMs / "copy as AI")
  category/[slug]/page.tsx     # category roll-up template
  author/[slug]/page.tsx       # author roll-up template
  search/page.tsx
  rss.xml/route.ts             # RSS feed
  sitemap.xml/route.ts         # blog sitemap index
  post-sitemap.xml/route.ts    # posts + authors + categories, with Google image extension
```

### How one template serves N posts

`app/[locale]/blog/[slug]/page.tsx` is a **single React Server Component**. Two functions
do the multiplication:

```ts
export async function generateStaticParams() {
  const slugs = await PostResource.getAllSlugs() // pull every slug from the CMS
  return locales.flatMap((l) => slugs.map((slug) => ({ locale: l, slug })))
}
export async function generateMetadata({ params }) {
  /* per-post <title>, OG, canonical, robots */
}
export default async function BlogArticlePage({ params }) {
  const post = await PostResource.findBySlug(slug) // fetch one post
  // …render Navbar, hero, PortableText body, author cards, related posts, footer
}
```

`generateStaticParams` enumerates all slugs at build → Next.js **pre-renders every post
as static HTML (SSG)**. New posts appear via **ISR**: the fetch layer is cached with a
24h `revalidate` + a tag, and a Sanity publish webhook clears the tag instantly (see §7).

> For our MDX build: replace `PostResource.getAllSlugs()` with a filesystem glob of
> `content/blog/*.mdx`, and `findBySlug` with reading + compiling one MDX file. Everything
> else — `generateStaticParams`, `generateMetadata`, the render shell — stays identical.

### The Resource / Repository pattern (data access)

Data access is wrapped in **Resource classes** (`lib/sanity/blog/postResource.ts`) — a
clean abstraction we should keep even with MDX:

- `PostResource` holds one post's typed data and exposes **domain methods**:
  `getPrimaryCategory()`, `getPrimaryAuthor()`, `getBreadcrumbItems(locale)`,
  `formatPublishDate()`, `findRelated(limit)`, `getBreadcrumbItems()`.
- Static finders: `getAllSlugs()`, `findBySlug()`, `findCurrentSlugByPreviousSlug()`
  (powers 308 redirects when a post's slug is renamed — a nice SEO detail).
- All fetches go through one `SanityResource.fetch()` gateway that **enforces caching**
  (defaults to ISR even if a caller forgets).

This means the page component never touches raw queries — it calls `post.getPrimaryAuthor()`.
**Recreate this as `PostResource` backed by MDX + gray-matter frontmatter.**

### Config-driven templates for non-blog pages (also "many-from-few")

The same "one shell, N configs" idea is applied **beyond the blog**:

- **Comparison pages** (`/compare/writesonic-vs-<competitor>`): a single shell
  `components/pages/vs/_shared/comparison-page.tsx` consumes a typed `ComparisonConfig`
  object and renders a fixed section stack + JSON-LD. Each competitor is just a
  `config.ts` (`profoundConfig`, `peecAiConfig`, …). The route file is a ~30-line wrapper.
  Its doc comment literally says: _"To add a new competitor, write a `config.ts` of shape
  ComparisonConfig and render `<ComparisonPage config={...} />`."_
- **Integrations** (`/integrations/[slug]`): one dynamic route +
  `components/pages/integrations/data/integrations.ts` (a typed `Integration[]` array) +
  `getIntegration(slug)` + a shared `IntegrationDetailPage`. `generateStaticParams` maps
  the data array → N static pages. This is the **exact MDX-friendly analogue**: data in
  a typed source, one template, static params from the data.

---

## 4. Rich Content Rendering — the component map

`sanity/lib/components.tsx` is the **PortableText → React component map** (the direct
analogue of an MDX `components={{…}}` map). It maps every content block/mark/custom
type to a **design-token-styled** React element:

- **`block`**: `h1–h4` (auto-generate slug `id`s + `scroll-mt-28` for anchor links),
  `normal` (paragraph), `blockquote` (styled orange pull-line).
- **`list` / `listItem`**: bullet + numbered, token-spaced.
- **`marks`**: `strong`, `em`, `underline`, `strike-through`, inline `code`, and a
  smart **`link`** (auto `target=_blank` + `rel=noopener/nofollow/sponsored` based on
  Studio toggles and external detection).
- **Custom `types` (the reusable content blocks):**
  - `image` → `<ImageLightbox>` with intrinsic W/H parsed from the asset ref.
  - `statCallout` → big-number stat card.
  - `highlight` → labelled aside/callout box.
  - `table` → maps to the shadcn `<Table>` primitive (header row optional).
  - `codeBlock` → `<BlogCodeBlock>` (Shiki syntax highlighting).
  - `ctaButton` → renders the `<Button>` primitive with variant/alignment.
  - `faq` → Radix `<Accordion>` **and simultaneously emits `FAQPage` JSON-LD**
    (`answerToPlainText` flattens rich answers to plain text for the schema).
  - `videoEmbed` → autoplay/muted `<video>` with poster + caption.
  - `quote` → attributed pull-quote; **the component map is built by a factory**
    (`blogPostComponents(author)` / `customerStoryComponents(customer)`) so the quote's
    avatar/name/role is bound per-context. Multiple display styles (`hero/compact/card`).

Key ideas to port to MDX:

1. **One central component map** styled entirely with design tokens — authors write
   content, the map guarantees consistent rendering.
2. **Custom content blocks** (callout, stat, FAQ, comparison table, CTA) become **named
   MDX components** — same list, same styling.
3. **Factory pattern** for context-bound components (pass `author`/`frontmatter` in).
4. **JSON-LD is emitted from inside the content component** (FAQ block → FAQPage schema),
   so structured data can never drift from what's rendered.
5. **TOC** is extracted from the content tree (`lib/blog/extract-toc.ts` → `extractToc`,
   `slugifyHeading`) and heading `id`s are generated by the same slugifier, so the TOC
   anchors always match.

---

## 5. Dynamic OG Images (`next/og`)

Every route that needs a share card ships a colocated **`opengraph-image.tsx`** using
`ImageResponse` from `next/og`. Example: `app/[locale]/blog/[slug]/opengraph-image.tsx`.

- Exports `alt`, `size` (`{1200,630}`), `contentType = "image/png"`, and a default async
  component that fetches the post and renders a **flexbox JSX card** (category eyebrow,
  headline with length-based font-size clamping, author + date footer, brand wordmark).
- **Shared brand constants** live in `lib/og/brand.ts` (`COLORS`, `OG_SIZE`, `SITE_URL`,
  `hiResSanity()` helper, inlined brandmark SVG path).
- **Assets are inlined as data URIs** (`lib/og/inline-svgs.ts`) so OG generation never
  depends on a public-asset fetch (which can fail in the edge runtime).
- **Reusable OG templates** for config-driven pages: `lib/og/compare-template.tsx`,
  `integrations-template.tsx`, `ads-index-template.tsx` — one template fn, N pages.
- Metadata references the card by **explicit path** (`${canonicalPath}/opengraph-image`)
  on the no-locale-prefix canonical, so crawlers don't have to follow redirects. An
  editorial override image (if present) takes precedence.

---

## 6. Performance — what makes it fast

- **Static-first**: pages are SSG/ISR; `setRequestLocale` + `generateStaticParams` keep
  everything pre-rendered. No client data-fetching on content pages.
- **`next/image` with a custom loader** (`next.config.ts` → `loader: "custom"`,
  `sanity/lib/image-loader.ts`): Sanity images go **straight to `cdn.sanity.io`'s
  transform API** (`?w=&auto=format&q=`) instead of Vercel's `/_next/image` optimizer —
  removes a hop + a billing line, and `auto=format` negotiates **AVIF/WebP** from the
  Accept header. Non-Sanity/`/public` URLs pass through untouched. (For MDX we'd point
  the loader at whatever CDN hosts our images, or keep the default optimizer for local
  `/public` assets.)
- **Tuned srcset matrices**: `images.deviceSizes` / `imageSizes` / `qualities` trimmed to
  what layouts actually use, so the CDN caches a small variant matrix.
- **Hero image**: `priority` + `loading="eager"` + `fetchPriority="high"` + explicit
  `sizes` on the LCP image; body images lazy by default.
- **Fonts**: self-hosted **Roobert** via `next/font/local` (`app/[locale]/layout.tsx`)
  with `.woff2`, four weights, exposed as `--font-roobert` CSS var → mapped to
  `--font-sans` in `@theme`. `font-display: swap`. No external font network request.
- **Third-party scripts** are consent-gated + `strategy`-tagged (`beforeInteractive` /
  deferred) via `next/script` and Cookiebot, so they don't block render.
- Multi-zone `assetPrefix` (`/website-zone`) isolates `/_next/*` assets when co-hosted
  with the app under one domain.

---

## 7. Sitemap, Robots, JSON-LD, Metadata, ISR/Webhook

### Metadata

- Root/site metadata in `app/[locale]/layout.tsx` via the `metadata` export
  (`metadataBase`, default OG/Twitter, `applicationName`, `viewport` with brand
  `themeColor`).
- **Per-page `generateMetadata`** everywhere: title, description, `alternates.canonical`,
  `robots` (noindex toggle), full `openGraph` (article type, `publishedTime`,
  `modifiedTime`, `authors`, `section`) and `twitter` cards. Locale alternates via
  `pageAlternatesMeta()`.

### robots.ts (`app/robots.ts`)

Host-aware: only `writesonic.com`/`www` return `allow: /` + sitemap; every other host
(preview/staging) returns `disallow: /`. Prevents preview deploys from being indexed.

### Sitemaps (Route Handlers, not the static file)

`blog/post-sitemap.xml/route.ts` builds XML by hand from **one GROQ round-trip** that
returns posts + authors + categories (only authors/categories that have ≥1 post). Adds
the **Google Image sitemap extension** (`image:image`) for post hero images, per-type
`priority`/`changefreq`, `lastmod` from `lastUpdatedAt`. Cached with ISR + all three
content tags. `next.config.ts` rewrites the non-locale `/blog/sitemap.xml` → `/en/blog/…`.

### JSON-LD (`components/seo/json-ld.tsx`)

A small library of typed emitter components, each rendering a
`<script type="application/ld+json">`: `OrganizationLd` (with a shared `@id` referenced
everywhere), `WebSiteLd`, `SoftwareApplicationLd` (aggregateRating), `BreadcrumbLd`,
`ArticleLd` (single/multi-author, publisher `@id` ref), `AboutPageLd`, `FAQPageLd`,
careers job postings. **The article page renders `ArticleLd` + `BreadcrumbLd`; the FAQ
content block renders `FAQPageLd` itself** — structured data is composed from the same
data that renders the page.

### ISR + tag-based revalidation (`lib/sanity/cache.ts`)

The most reusable server pattern: a central cache module with **named tags**
(`SANITY_TAGS.postAll`, …) and **TTL constants** (`list: 86400`, `single: 86400`,
`banner: 300`). Every fetch calls `sanityCache(tag, ttl)` → `{ next: { revalidate, tags } }`.
A publish webhook (`app/api/revalidate-sanity`) calls `revalidateTag()` on the matching
tag so editors see changes in seconds, while API/CDN request volume stays low. Doc-type →
tag mapping (`tagForDocType`) keeps the webhook and fetches in sync.

> MDX analogue: content is filesystem-based, so there's no webhook — a new commit +
> rebuild is the invalidation. But keep the **`generateStaticParams` + `generateMetadata`
>
> - Resource-class** structure; drop the ISR/webhook layer (or keep `revalidate` for any
>   remotely-fetched data).

### "Copy as AI" / LLM-friendly endpoints

`blog/[slug]/md/route.ts` serves each post as **plain Markdown** (title, excerpt,
"At a glance" meta, body via `portableTextToMarkdown`) for LLM ingestion / a "copy as
prompt" button. There's also `app/llms.txt`. Worth replicating for AI-search visibility.

---

## 8. The single most transferable idea

**Serve MANY content pages from FEW templates by separating _content/config_ from
_presentation_, and multiplying with `generateStaticParams`.**

The whole site is built on this one move, applied three ways:

1. **Blog**: `[slug]/page.tsx` + `generateStaticParams(getAllSlugs())` → every post is
   one static render of one template; a central **component map** styles the rich body.
2. **Comparison pages**: one `<ComparisonPage config={…}>` shell + one typed `config.ts`
   per competitor.
3. **Integrations**: one `[slug]` template + one typed `Integration[]` data array.

For Radhakrishna.com with MDX, the port is direct:

```
content/blog/*.mdx                       ← frontmatter (gray-matter) + body
lib/blog/postResource.ts                 ← Resource class: getAllSlugs(), findBySlug() over the filesystem
app/blog/[slug]/page.tsx                 ← ONE template; generateStaticParams globs the folder
components/mdx/mdx-components.tsx         ← the component map (Callout, StatCard, FAQ, ComparisonTable, CTA, CodeBlock, Image)
app/blog/[slug]/opengraph-image.tsx      ← next/og card from frontmatter
components/seo/json-ld.tsx               ← Article/Breadcrumb/FAQ/Organization emitters
app/globals.css                          ← primitive @theme ramps + semantic :root tokens + @utility type scale
```

Write the post's Markdown; the template, tokens, OG image, sitemap entry, JSON-LD, and
TOC are all generated. **No page is ever hand-built.**
