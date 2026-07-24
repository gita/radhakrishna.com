# 03 — Tech & Design

The stack, the design-token system, component reuse, the performance budget, the schema graph, dynamic OG
images, and the micro-animation policy. Performance is the number-one constraint; SEO is number two;
polish never comes at their expense.

---

## 1. Stack decision

**Full rewrite to Next.js 16 (App Router) + React 19 + TypeScript + Tailwind, all-RSC, static-first.** This
matches vedvyas-website and bg-frontend (shared branding + tech), and adopts the writesonic-website
"many pages from few templates" engineering. The current site is the old JS/Pages-Router
tailwind-nextjs-starter-blog with deps force-bumped to Next 16; matching the sibling sites is a rewrite,
not an upgrade, and we keep only the 7 posts, images, favicons, siteMetadata values, and tag taxonomy.

| Layer         | Choice                                                                                | Why                                  |
| ------------- | ------------------------------------------------------------------------------------- | ------------------------------------ |
| Framework     | Next.js 16, App Router, React Server Components                                       | Static-first, fast, matches siblings |
| Language      | TypeScript                                                                            | Type-safe content model + schema     |
| Styling       | Tailwind + CSS-variable design tokens                                                 | Shared brand system, small CSS       |
| UI primitives | shadcn-style, hand-authored, custom-branded (start with `button`, add only as needed) | No bloat; reuse before adding        |
| Content       | MDX in `content/`, filesystem glob + gray-matter, typed frontmatter                   | No CMS; git-versioned; `02` §5       |
| Rendering     | SSG via `generateStaticParams`; ISR/PPR only for daily-darshan                        | Zero load time on content pages      |
| Images        | `next/image`, WebP/AVIF, responsive srcset, CDN loader, LCP priority                  | Fast, citable visuals                |
| OG images     | build-time `next/og` `ImageResponse`, shared `lib/og.tsx`                             | Dynamic, templated, per page-type    |
| Fonts         | `next/font` (self-hosted), subset, `display: swap`                                    | No layout shift, no external fetch   |
| Motion        | CSS-first + view transitions; minimal, RSC-safe, `prefers-reduced-motion`             | Polish without perf cost (§7)        |
| Analytics     | Plausible (already in use), keep lightweight                                          | Privacy-friendly, no GA bloat        |
| Deploy        | Vercel                                                                                | Matches org; ISR/PPR/OG native       |

**Modern Next 16 to use deliberately:** Partial Prerendering (PPR) / Cache Components so a page can be
fully static except a small dynamic island (the daily-darshan "today" block, "this year's festival date").
This keeps content pages static while the few dynamic bits stay fresh. Do not reach for `runtime = 'edge'`;
stay on the Node runtime (Fluid Compute).

## 2. Design tokens (the system)

Adopt the shared devotional brand (Prakash/Nisha themes from vedvyas + bg-frontend) and **extend it with
the devotional peacock/gold palette** so Radhakrishna.com is a richer, warmer sibling, not a clone. Use a
three-layer token system (primitive -> semantic -> component), the writesonic-website pattern, defined as
CSS variables in `globals.css` and mapped into `tailwind.config.ts`.

**Base brand (shared with the network):**

- Light theme "Prakash": cream ground `#FAF9F5`, ink `#33302A` / charcoal text.
- Dark theme "Nisha": charcoal `#262625`.
- Warm accent (shared): terracotta `#C96442` (`hsl(15 55% 52%)`).
- Radius base `0.5rem`. Dark mode via `media` + a `[data-theme]` override for a toggle.

**Devotional extension (this site's signature):**

- Peacock blue `#1F6F8B` and peacock green `#0E7C6B` — the divine core.
- Warm gold / brass `#C9A227` — light, haloes, fine rules, small ornament (never a flat fill).
- Deep midnight indigo `#1B2A4A` — dark hero grounds, shloka cards.
- Soft lotus pink `#E8A0B0` — gentle accent.

**Type system:**

- Headings: an elegant high-contrast serif (Crimson Pro, shared with siblings).
- Body/UI: a clean humanist sans (Inter).
- Devanagari: Noto Serif Devanagari (verses/mantras), a graceful traditional face.
- A `--verse-*` reading scale for lyrics/shlokas (borrow bg-frontend's reading tokens).

Tokens are semantic first (`--background`, `--foreground`, `--primary`, `--accent`, `--divine`, `--gold`,
`--muted`, `--border`), so components never hardcode hex. The image brand system uses the same hexes (see
`04-image-and-brand.md`) so the generated art and the CSS are one palette.

## 3. Component reuse policy

**Reuse before you add. Do not import a new component or library if something already exists.** Sequence:

1. Reuse a component already in this repo.
2. Port a component verbatim from vedvyas-website / bg-frontend (they share the brand): `button.tsx` +
   `cn()`, `browser-frame.tsx`, `obfuscated-email.tsx`, `lib/og.tsx`, layout/metadata/manifest/robots/
   sitemap scaffolding, the audio players and decorative motifs from bg-frontend.
3. Only then hand-author a new, custom-branded primitive (shadcn-style, no unnecessary Radix).

Organise like writesonic-website: `components/ui/` primitives, `components/sections/` shared sections,
`components/pages/<page>/sections/` page-local, typed `content/`. Variants via `cva` + `cn` (clsx +
tailwind-merge), `asChild` where useful. The MDX-components map (`02` §5) is the single place in-body
content components are registered.

## 4. Performance budget (the number-one constraint)

Every page must ship green Core Web Vitals. Targets:

- **LCP < 2.0s** (hero image `priority`, sized, WebP/AVIF, no blocking fonts).
- **CLS < 0.05** (all images width/height, fonts `swap` + fallback metrics, no injected layout shift).
- **INP < 200ms** (ship almost no client JS; RSC by default; interactive islands only where needed).
- **JS budget:** content pages are near-zero client JS. Interactive pieces (audio player, gallery
  lightbox, share, daily-darshan, theme toggle) are small client islands, lazy where possible.
- **Images:** `next/image`, responsive `srcset` (e.g. 640/1080/1600/2400), WebP/AVIF, master art 2K-4K
  downscaled, LCP image preloaded, everything else lazy. Image sitemap entries.
- **Fonts:** self-hosted, subset (Latin + Devanagari ranges only), `display: swap`, preload the two used
  above the fold.
- **No external render-blocking:** analytics deferred, no third-party embeds in the critical path.
- **Verify** with PageSpeed Insights (`PAGESPEED_API_KEY` available) + Lighthouse in CI, and real-device
  QA (Claude-in-Chrome / gstack browser / Playwright).

## 5. Schema graph (hygiene + entity plumbing)

Schema is plumbing, not a citation lever (`01` §6), but we wire it cleanly because it powers rich results
and entity resolution. **One connected `@graph`** per page using `@id` + `sameAs`, so Organization,
WebSite, WebPage, Article, Person, Breadcrumb, and ImageObject reference each other.

- **Site-wide (in root layout):** `Organization` (with `sameAs` to our network + social + Wikidata if
  available), `WebSite` (+ `SearchAction`).
- **Per page:** `WebPage` + `BreadcrumbList`; `Article`/`CreativeWork` with `author` (Person, `sameAs`),
  `datePublished`, `dateModified`, `publisher`, `image` (ImageObject).
- **Per type:** `Event` for festivals (with date), `Place` for temples (with geo, opening hours),
  `ImageObject` with `caption`/`creator`/`license` on galleries, `AudioObject` on prayer pages,
  `Person` on author pages.
- **FAQPage** only where there is genuine on-page Q&A (rich result gone since 7 May 2026; markup kept as
  hygiene, not relied upon).
- **Rule:** schema must match visible content exactly, or it is ignored/flagged. Build it from the same
  frontmatter that renders the page, so they never drift (the vedvyas pattern: one source, many outputs).

Implement as a typed JSON-LD emitter library (`lib/schema.ts`), the writesonic-website approach.

## 6. Dynamic OG images

Every page needs proper OG/Twitter tags + a share image. **Build-time dynamic OG via `next/og`
`ImageResponse`**, a shared renderer `lib/og.tsx` (ported from vedvyas), with **per-template OG layouts**
fed by frontmatter (title, eyebrow/cluster, subtitle, and a devotional art panel).

- Templated fields: `title`, `cluster` eyebrow, optional `question`/`date`, and a background art panel per
  cluster (a T1-style Gemini render, see `04`). One `opengraph-image.tsx` per route segment, or a shared
  generator keyed by `type`.
- Output sized 1200x630, WebP where supported. Brand palette + serif title + gold rule, matching the site.
- Twitter card = `summary_large_image`. Same image. `metadataBase = https://radhakrishna.com`.
- Also emit real OG/Twitter meta via `generateMetadata` per page.

## 7. Micro-animation policy (polish without perf cost)

The founder wants it more visually alive than vedvyas, with tasteful micro-animations, but performance is
king. Rules:

- **CSS-first.** Prefer CSS transitions/`@keyframes`, `transform`/`opacity` only (GPU-composited, no
  layout/paint thrash). Scroll-reveal via `IntersectionObserver` toggling a class, not a heavy lib.
- **View Transitions API** for soft page/element transitions where supported (progressive enhancement).
- **framer-motion only if needed** and only in client islands (bg-frontend already uses it); never wrap
  static content in it. Keep bundle impact near zero on content pages.
- **Always respect `prefers-reduced-motion`** (disable non-essential motion).
- **No motion on the LCP element**, no animation that delays first paint or shifts layout (CLS budget is
  0.05). Ornaments (gold hairlines, lotus/peacock motifs, gentle glow) animate subtly or not at all.
- The bar: it should feel calm and alive, like a lamp flame, not busy. Reverent, not flashy.

## 8. Footer + cross-property linking (exact spec)

The footer carries the org entity graph. Columns:

- **Explore:** Radha Krishna, Stories, Questions, Prayers, Festivals, Temples, Images, Daily Darshan.
- **Our network:** Bhagavad Gita (bhagavadgita.com), Ved Vyas (vedvyas.com), Gita GPT, Bhagavad Gita app
  (Android + iOS), Hanuman Chalisa. (Confirm exact URLs from bg-frontend's footer list; `research/04`.)
- **Site:** About, Authors, Contact, Privacy.
- **Follow:** Pinterest, Instagram, YouTube.
- Wordmark + one-line positioning + `Organization` schema anchor. Email obfuscated (never in served HTML,
  the vedvyas `obfuscated-email.tsx` pattern).
- **Keep network cross-linking contextual/editorial, not heavy sitewide boilerplate (P2-7).** The "Our
  network" column is a modest, honest set of links; the real cross-property links are contextual and
  editorial in-body. A monetized-network footer over-linking every page is exactly the site-reputation
  profile 2026 scrutiny targets — each property must stand independently authoritative.

## 9. SEO plumbing

- `metadataBase = https://radhakrishna.com`; per-page `generateMetadata` (title, description, canonical,
  OG/Twitter).
- **Sitemaps:** programmatic `sitemap.ts` (all content routes) + an **image sitemap** (Google image
  extensions) for the galleries. Split if large.
- **`robots.ts`:** allow the AI crawlers we want citing us (`GPTBot`, `PerplexityBot`, `Google-Extended`,
  `ClaudeBot`), disallow nothing important. No llms.txt.
- **Redirects (`next.config` / middleware):** map every old slug (~17 URLs) to its new home with 301;
  confirm the `.net -> .com` redirect is a clean single hop preserving path.
- **RSS** for stories/questions (port + modernise the existing generator).
- **Bilingual (EN + HI) from day one (D10):** subpath locale routing (English at root, Hindi at `/hi/`),
  per-locale canonical + `hreflang` alternates (`en`/`hi`/`x-default`), per-locale sitemap entries,
  Devanagari font subset loaded for Hindi. Content tree is `content/{en,hi}/…` (`02` §3.1). Hindi drafts
  via Codex too (`02` §5, D12).
- **hreflang build-time invariant + CI guard (P0-7):** generate alternates ONLY from the **set intersection
  of locale files that actually exist** (wired to the same "file exists" condition the content model uses),
  emit the **reciprocal** tag for both members of every existing pair, and **validate reciprocity in CI** so
  a missing Hindi file can never ship a dangling `en -> hi` alternate. **No IP/Accept-Language auto-redirect
  between locales** — subpath + a manual language switcher only.
- **Server-render dynamic date islands (P2-5):** the festival / Ekadashi "this-year date" island and any
  "today" block must be server-rendered into the HTML (PPR island), not a client fetch. Validate with a
  **JS-disabled fetch** that the date is present in the markup — a Phase-1 done-criterion.

## 10. Content generation pipeline (Codex)

Content is drafted by **Codex `gpt-5.6-sol`** (via `writesonic-marketing/tools/codex-draft/draft.py`,
`-e xhigh`, read-only sandbox) in the Samanyou house voice, then verified and edited before it becomes an
MDX file. Two gates run:

1. **Anti-slop gate** — a mechanical check (the `structural_check.py` pattern) enforces the hard bans (no em
   dashes, no exclamation points, no "not just X but Y", no buzzword clusters, straight quotes). See
   `research/05-writing-and-images.md` for the full voice spec and the AI-tells ban list. The subjective
   humanizer chain is optional and off by default (it homogenizes).
2. **Citation-verification gate (P0-3, D15) — a hard blocker.** Every scripture citation is YMYL. Codex
   drafts hallucinate plausible-but-wrong references (`Brahma Vaivarta 4.x`), so no chapter:verse ships
   unverified. Each citation is corroborated against a named primary-source edition/translation via
   **parallel.ai** (Search API for cheap factual lookups ~$0.001-0.005/req; Deep Research / Task API for
   contested doctrinal claims, returning evidence with provenance/citations per fact) plus our own
   multi-agent research Workflows. The edition is recorded in `sources`; **an unverified reference is cut,
   not shipped** (a wrong one must never go out), and corrections are logged publicly. The API key is
   stored like the other keys (env, **never in served output**) — awaiting it from the founder. Publishing
   velocity is capped to genuine verification throughput; a gate nobody can fail is not a gate. Full
   pipeline in `06-content-research-ops.md`.

---

_Built on `research/02-vedvyas-blueprint.md`, `research/03-writesonic-website.md`,
`research/04-bg-frontend.md`, `research/05`, and `research/06`._
