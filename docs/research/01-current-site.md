# Current Site Audit — Radhakrishna.com

_Audit date: 2026-07-24 · Repo: `/Users/radhakrishna/Documents/radhakrishna.net` · Branch: `main`_

## 1. Summary

The site is a fork of the **Tailwind Nextjs Starter Blog** (Timlrx template, v1.x era), package name `radhakrishna`, version `2.0.0`. It has been kept on life-support: dependencies were force-upgraded to **Next 16 / React 19 / Turbopack** (commits `ced53d5`, `412eec1`), but the **application code was never modernized** — it still uses the legacy **Pages Router**, `getStaticProps`/`getStaticPaths`, `next/head`, and `mdx-bundler`. It is effectively a Next 16 runtime wrapped around a 2021-vintage Pages-Router codebase. Content is thin: **7 MDX blog posts, all from 2017–2018**, plus one author bio. This is a strong candidate for a clean App Router rebuild that preserves the 7 posts + images and discards the template scaffolding.

## 2. Tech Stack

| Concern           | Current                                                                                                                                                                                                                                                                                                    |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework         | **Next.js `^16.2.11`** (declared), **Pages Router** (`pages/` dir, no `app/`)                                                                                                                                                                                                                              |
| React             | `^19.2.0`                                                                                                                                                                                                                                                                                                  |
| Bundler           | **Turbopack** (`next.config.js` `turbopack` block; `.svg` -> `@svgr/webpack` React components)                                                                                                                                                                                                             |
| Language          | Plain **JavaScript** (no TypeScript; `jsconfig.json` only, `@/*` path alias)                                                                                                                                                                                                                               |
| Styling           | **Tailwind CSS `^3.4.17`** (config-file based, NOT v4), `darkMode: 'class'`, `@tailwindcss/typography` + `@tailwindcss/forms`. Two hand-written CSS files: `css/tailwind.css`, `css/prism.css`                                                                                                             |
| Content authoring | **MDX files in `data/blog/*.mdx`** with gray-matter frontmatter                                                                                                                                                                                                                                            |
| MDX pipeline      | **`mdx-bundler` `^10`** + esbuild, invoked at build time in `lib/mdx.js` (`getFileBySlug`). Remark: gfm, footnotes, math, code-titles, toc-headings, img-to-jsx. Rehype: slug, autolink-headings, katex, citation, prism-plus. Rendered client-side via `getMDXComponent` in `components/MDXComponents.js` |
| Theming           | **`next-themes` `^0.4.6`** (class strategy, light/dark toggle)                                                                                                                                                                                                                                             |
| Fonts             | Inter, loaded via Google Fonts `<link>` in `_document.js`                                                                                                                                                                                                                                                  |
| Deployment        | Vercel (`.vercel/` present)                                                                                                                                                                                                                                                                                |
| Tooling           | ESLint 9 + `eslint-config-next`, Prettier 3, Husky 9 + lint-staged                                                                                                                                                                                                                                         |

**Rendering model:** fully static (SSG). Every page uses `getStaticProps`; blog posts use `getStaticPaths` with `fallback: false`. RSS `feed.xml` and per-tag feeds are written to `public/` as a side effect of `getStaticProps`; `sitemap.xml` is generated by a post-build node script.

## 3. Directory Map

- **`pages/`** — Pages Router routes:
  - `_app.js` (ThemeProvider + Analytics + LayoutWrapper), `_document.js` (favicons, fonts, katex CSS, RSS link), `404.js`
  - `index.js` (home — latest 5 posts), `blog.js` (list, paginated), `blog/page/[page].js` (pagination), `blog/[...slug].js` (post renderer; writes `feed.xml`), `tags.js` (all tags), `tags/[tag].js` (posts by tag), `about.js` (renders author MD via AuthorLayout)
  - `api/` — 4 newsletter provider handlers: `mailchimp.js`, `convertkit.js`, `buttondown.js`, `klaviyo.js`
- **`components/`** — 20+ reusable UI pieces (see §5). Subdirs: `analytics/` (Plausible), `comments/` (Disqus/Giscus/Utterances), `social-icons/` (SVGs + index)
- **`layouts/`** — 4 page-shell layouts: `PostLayout.js`, `PostSimple.js`, `ListLayout.js`, `AuthorLayout.js`
- **`data/`** — content + site config: `siteMetadata.js`, `headerNavLinks.js`, `blog/*.mdx` (7 posts), `authors/default.md`, `references-data.bib`, `krishna.svg`, `logo.svg`
- **`lib/`** — build logic: `mdx.js` (MDX bundling/frontmatter), `tags.js` (tag counts), `generate-rss.js`, three `remark-*` plugins, `utils/` (`formatDate`, `kebabCase`, `files`, `htmlEscaper`)
- **`public/`** — `static/favicons/` (full favicon set), `static/images/` (per-post image folders + avatars/logos), `tags/<tag>/feed.xml` (generated), plus generated `sitemap.xml` / `feed.xml`
- **`scripts/`** — `generate-sitemap.js` (post-build), `compose.js` (interactive new-post scaffolder), `next-remote-watch.js` (dev live-reload on `data/`)
- **`css/`** — `tailwind.css`, `prism.css`

## 4. Content Inventory — all 7 posts are 2017–2018 legacy content

| #   | Title                                                              | Slug                                                | Date       | lastmod    | Tags                            | Has hero image |
| --- | ------------------------------------------------------------------ | --------------------------------------------------- | ---------- | ---------- | ------------------------------- | -------------- |
| 1   | Krishna Story : When Krishna dressed as a Gopi                     | `krishna-story-when-krishna-dressed-gopi`           | 2017-11-17 | —          | Krishna, Radha, Story           | yes            |
| 2   | Why is Krishna blue?                                               | `why-is-krishna-blue`                               | 2017-11-27 | —          | Krishna, Story                  | yes            |
| 3   | Story of Birth of Srimati Radharani                                | `story-of-birth-of-srimati-radharani`               | 2017-11-27 | —          | Radha, Story                    | yes            |
| 4   | Krishna Story - When Draupadi met Krishna's Queens                 | `krishna-story-when-draupadi-met-krishnas-queens`   | 2017-11-28 | —          | Krishna, Story                  | yes            |
| 5   | Krishna Story - Why does Krishna wear Peacock Feathers on his head | `why-does-krishna-wear-peacock-feather-on-his-head` | 2017-11-28 | —          | Krishna, Story                  | yes            |
| 6   | Hare Krishna Hare Rama Mantra                                      | `hare-krishna-hare-rama-maha-mantra`                | 2018-01-14 | —          | Krishna, Bhajan, Lyrics, Mantra | no             |
| 7   | Radha Sahastra Naam Yatra Lyrics                                   | `radha-sahastra-naam-yatra-lyrics`                  | 2018-08-13 | 2021-12-10 | Radha, Bhajan, Lyrics           | no             |

**Every post is dated 2017 or 2018** (5x 2017, 2x 2018). No newer content exists. `draft: false` on all. Author on all is `['default']`.

**Topics / tag universe** (6 tags): Krishna, Radha, Story, Bhajan, Lyrics, Mantra. Content splits into **narrative stories** (posts 1–5) and **bhajan/mantra lyrics** (posts 6–7).

**Author:** `data/authors/default.md` — "Shri Radha Krishna / The Divine Couple", avatar `/static/images/radhakrishna.jpg`, two paragraphs of prose. This also powers the `/about` page.

## 5. Components & Layouts (reuse candidates)

**Layouts (`layouts/`):** `PostLayout` (full post with author card, tags, prev/next, "Discuss on Twitter" + "View on GitHub" links, comments), `PostSimple` (minimal variant), `ListLayout` (blog index w/ search box), `AuthorLayout` (about page shell). All are template-standard and tightly coupled to the frontmatter shape.

**Components (`components/`):** `LayoutWrapper` (header/nav/footer frame), `MobileNav`, `ThemeSwitch`, `Footer` (social icons + "Ved Vyas Foundation" credit), `Link` (internal/external wrapper), `Image` (next/image wrapper), `SEO` (PageSEO/TagSEO/BlogSEO — see §6), `Tag`, `Pagination`, `PageTitle`, `SectionContainer`, `TOCInline`, `Pre` (code block w/ copy), `ScrollTopAndComment`, `NewsletterForm` + `BlogNewsletterForm`, `MDXComponents` (MDX renderer + component map), `ClientReload` (dev socket reload), `analytics/` (Plausible), `comments/` (Disqus/Giscus/Utterances switch), `social-icons/` (mail, github, facebook, youtube, linkedin, twitter SVGs).

**Verdict on reuse:** These are generic template components in plain JS with `next/head` + Pages-Router assumptions. For an App Router rebuild they are best treated as **visual reference, not literal reuse** — the layout markup/Tailwind classes are worth porting, but the data-fetching and `next/head` wiring must be rewritten.

## 6. SEO / Meta / Feeds

- **Head tags:** `components/SEO.js` exports `PageSEO`, `TagSEO`, `BlogSEO`, all built on a `CommonSEO` that uses **`next/head`** + `useRouter()` (client-side, Pages Router). Handles title, description, canonical, OG (url/type/site_name/title/description/image), Twitter card (`summary_large_image`). `BlogSEO` also injects **JSON-LD `Article` structured data** (`schema.org`, author, publisher, images, dates). All must be re-implemented with the App Router **Metadata API** (`generateMetadata`).
- **Sitemap:** `scripts/generate-sitemap.js` runs after `next build` (globby over pages + `data/blog` + `public/tags/**/*.xml`), writes `public/sitemap.xml`.
- **RSS:** `lib/generate-rss.js` builds RSS 2.0; `public/feed.xml` is written from inside `pages/blog/[...slug].js` `getStaticProps`. Per-tag feeds exist under `public/tags/<tag>/feed.xml` (bhajan, krishna, lyrics, mantra, radha, story).
- **OG images:** static — uses `siteMetadata.socialBanner` (`/static/images/twitter-card.jpg`) as fallback; posts use their frontmatter `images`. No dynamic OG image generation.
- **Favicons:** complete set in `public/static/favicons/`, wired in `_document.js`. (Note: `_document.js` references `apple-touch-icon.png` and `safari-pinned-tab.svg` that are not in the favicons listing — likely 404s.)

**`siteMetadata.js` highlights:** title "Radha Krishna | All About the Eternal Couple Radhe Krishna"; `siteUrl: https://radhakrishna.com`; `siteRepo: github.com/gita/radhakrishna.net`; email `contact@bhagavadgita.io`; socials twitter `@ShriKrishna`, facebook `iiradhakrishnaii`, linkedin `company/bhagavadgita`. Footer credits "Ved Vyas Foundation" -> bhagavadgita.io. (Site is part of the BhagavadGita.io / Ved Vyas Foundation family.)

**`next.config.js`:** minimal — bundle-analyzer wrapper, `reactStrictMode`, `pageExtensions: js/jsx/md/mdx`, eslint dirs, and the Turbopack root+SVGR rule. No redirects/rewrites/headers/image domains configured.

**`tailwind.config.js`:** Tailwind 3 config. Primary color = `teal`, gray = `neutral`. Inter font. Custom line-heights/spacing. Extensive `@tailwindcss/typography` `prose`/`prose-dark` overrides for light+dark. Plugins: forms + typography.

## 7. Analytics, Newsletter, Comments, Themes

- **Analytics:** **Plausible** enabled (`siteMetadata.analytics.plausible: true`). `components/analytics/Plausible.js` injects the hosted script (`plausible.io/js/pa-...js`) via `next/script`. (Prior Google Analytics was removed in commit `412eec1`.)
- **Newsletter:** provider currently **empty** (`newsletter.provider: ''`) so the signup form is **not rendered**. Infrastructure exists for 4 providers with API routes: **Mailchimp** (`@mailchimp/mailchimp_marketing`, uses `MAILCHIMP_API_KEY`/`_SERVER`/`_AUDIENCE_ID`), ConvertKit, Buttondown, Klaviyo. `NewsletterForm` posts to `/api/<provider>`.
- **Comments:** **Disqus** active (`comment.provider: 'disqus'`, shortname `radha-krishna`, `.env` sets `NEXT_PUBLIC_DISQUS_SHORTNAME`). Giscus and Utterances also wired but unused.
- **Themes:** `next-themes` class-based light/dark, toggled via `ThemeSwitch`. Body default styling in `_document.js`.
- **`.env`:** only `NEXT_PUBLIC_DISQUS_SHORTNAME="radha-krishna"`.

## 8. Verdict — Keep / Rebuild / Delete for App Router revamp

### KEEP (migrate as-is or with light edits)

- **The 7 MDX posts** (`data/blog/*.mdx`) — the only real content asset. Frontmatter shape (title/date/tags/summary/images/authors) is clean and portable.
- **Post images** under `public/static/images/<slug>/` and the favicon set.
- **`data/authors/default.md`** bio prose and `data/siteMetadata.js` values (title, description, socials, URLs) — reuse the _values_, not necessarily the module.
- **Tag taxonomy** (Krishna/Radha/Story/Bhajan/Lyrics/Mantra).
- **Tailwind design tokens** as reference (teal primary, Inter, typography overrides) — though a fresh design is likely wanted for a "revamp".

### REBUILD (re-implement natively in App Router)

- **All routing** — convert `pages/` to `app/` with Server Components, `generateStaticParams`, and route handlers.
- **MDX pipeline** — replace runtime `mdx-bundler` + `getMDXComponent` with App-Router-native MDX (e.g. `@next/mdx` or `next-mdx-remote-client`/`content-collections`); keep the remark/rehype plugin set as desired.
- **SEO/meta** — replace `components/SEO.js` + `next/head` with the **Metadata API** (`generateMetadata`) and dynamic OG images (`next/og`); re-implement JSON-LD.
- **RSS + sitemap** — replace the side-effect RSS writes and the standalone sitemap script with App Router `app/sitemap.ts` and a `feed.xml` route handler.
- **Layouts/components** — port the visual markup (PostLayout, ListLayout, header/footer, ThemeSwitch, Tag, Pagination, Pre) into Server/Client components as appropriate.
- **Tailwind** — decide whether to move to **Tailwind v4** (CSS-first config) as part of the revamp; currently pinned to v3.

### DELETE (template cruft not needed)

- **Unused newsletter providers** — drop ConvertKit/Buttondown/Klaviyo (and Mailchimp unless kept); pick one.
- **Unused comment providers** — Giscus + Utterances (keep at most one; reconsider Disqus).
- **Dev/template scaffolding** — `scripts/next-remote-watch.js` + `ClientReload` + socket.io deps, `scripts/compose.js`, `references-data.bib` + `rehype-citation` (no post uses citations), `PostSimple`/`AuthorLayout` if unused, KaTeX/math plugins + katex CSS (no post uses math), Prism code-highlighting stack (no post has code blocks).
- **Stale references** — `siteRepo`/"View on GitHub" and "Discuss on Twitter" links in `PostLayout`; `_document.js` favicon entries pointing at missing files.
- **`.DS_Store` files** scattered through the repo.

### Migration risk notes

- Package.json claims Next 16 but code is Pages Router — a true App Router migration is a **rewrite**, not an incremental upgrade.
- Only ~7 URLs to preserve (`/blog/<slug>` x7, `/`, `/blog`, `/about`, `/tags`, `/tags/<tag>` x6) — **set up redirects** if slug structure changes to protect existing SEO on these old-but-indexed pages.
