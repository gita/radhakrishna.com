# Working Log — Radhakrishna.com Revamp

Newest entries on top. Each entry: date, what was done, what's next. This is the pick-up-anytime log.

---

## 2026-07-25 — RESUME HERE (content-quality build, handoff)

**Context rolled over here. Pick up exactly from this list. The bar is `CLAUDE.md` + `docs/01-07`.**
Branch `revamp/foundation`. Dev server: `PORT=3001 npm run dev`. Preview:
`radhakrishna-git-revamp-foundation-ved-vyas.vercel.app`. Commit + push in small steps.

**Verified tooling (all keys in gitignored `.env`; load via python, NOT `source` unless values quoted):**

- **Parallel** (verify claims): `POST https://api.parallel.ai/v1/search`, header `x-api-key`, body
  `{"objective","search_queries":[...],"mode":"turbo"}` -> `{results:[{title,url,excerpt}], usage}`. WORKS.
- **Reddit** (real FAQ questions): token = `POST https://www.reddit.com/api/v1/access_token`
  (`-u id:secret -d grant_type=client_credentials`, UA `script:app:vN (by /u/user)`), then
  `GET https://oauth.reddit.com/search?q=...&limit=8&sort=relevance` with `Authorization: bearer TOK`. WORKS.
- **Serper** PAA: `POST https://google.serper.dev/search`, header `X-API-KEY`, body `{"q","gl":"in"}` ->
  `peopleAlsoAsk`, `relatedSearches` (some queries return none; use Reddit + Ahrefs to supplement).
- **Codex** house-voice drafting: `python3 /Users/radhakrishna/Documents/writesonic-marketing/tools/codex-draft/draft.py -f prompt.md -o out.md` (model gpt-5.6-sol, xhigh). CLI installed.
- **Images**: gpt-image-2 via OpenAI Images API (`background` unsupported; format webp). Gemini key INVALID.
- Style guide: `writesonic-marketing/knowledge/writing/samanyou-house-style.md`. Experts:
  `writesonic-marketing/seo-geo/experts/*.md`.

**THE BUILD (in order):**

1. **Perfect the content template/system** (renders every page to standard):
   - Add `faq: [{question, answer}]` + `author` + `verified{date,method,sources}` to `velite.config.ts`.
   - Article template: answer-first block (have), TLDR (have), **FAQ block**, a **Sources** block (have),
     **connected JSON-LD** in a new `lib/schema.ts` (BreadcrumbList + Article + Person + Organization ref +
     ImageObject + **FAQPage** where genuine), a "verified [date]" line. Fix the **duplicate hero image**
     (body repeats the frontmatter image; strip it in migration or don't render hero if body leads with it).
   - MDX components (`components/mdx.tsx` map): `ScriptureTable`, `ComparisonTable`, `Callout`, `Figure`.
   - **PrayerPage** treatment for `type: prayer` (Radha Sahasranama is trapped in one giant blockquote —
     format as intro text + the 1008 names as a clean numbered/columned list + transliteration).
   - **Dynamic OG** per content page: `app/[...slug]/opengraph-image.tsx` (next/og, brand template).
   - Rebuild velite (`npx velite`) + `npm run build` green.

2. **Build the reusable content workflow** (a Workflow script, saved): per page ->
   mine Reddit + Serper PAA (+ Ahrefs) for real questions -> Parallel-verify every claim + collect sources
   with chapter/verse + sampradaya labels -> Codex draft in house voice (answer-first, TLDR, FAQ, tables,
   sources, internal links) -> structure to MDX frontmatter+body -> **expert-council adversarial review**
   (Lily Ray/Mike King/Ryan Law/Aleyda/Soulo/Indig + a doctrinal/factual check), iterate until it survives
   -> generate bespoke on-brand images -> write `.mdx` -> mobile+desktop QA (browse). This is the "no
   reminders" pipeline the founder asked for.

3. **Run it** on: the 7 migrated pages (upgrade, do NOT keep thin) + the 6 hubs (enrich) + the P0 new pages
   (why they did not marry, how Radha passed, who is Radha, who is Krishna, what their love symbolizes, is
   Radha Lakshmi, Radhashtami, Janmashtami, Banke Bihari). Aim ~10-15 pages for v1.

4. **Report to founder only when fully polished** (per their instruction). Then merge `revamp/foundation`
   to `main` + point live radhakrishna.com at it to go live.

**Definition of done per page = CLAUDE.md checklist.** No thin content, no unverified scripture, no
half-baked migration. Multiple adversarial iterations. Fix duplicate images. Mobile-perfect. Full schema.

---

## 2026-07-25 — Content pipeline unblocked + enforcement

- **Keys received + saved to `.env`** (gitignored): `PARALLEL_API_KEY` (verified, HTTP 200),
  `REDDIT_CLIENT_ID`/`SECRET`/`USER_AGENT` (verified OAuth), plus copied `OPENAI_API_KEY`,
  `GEMINI_API_KEY`, `SERPER_API_KEY`, `SERP_API_KEY`, `AHREFS_API_KEY`, `KE_API_KEY`,
  `SPYFU_API_KEY`, `PAGESPEED_API_KEY`, `PLAUSIBLE_API_KEY` from the marketing repo. No more fetching.
  Parallel Search API = `POST https://api.parallel.ai/v1/search` (header `x-api-key`). Reddit needs the
  `script:app:vN (by /u/user)` UA format. **D15 verification pipeline is now live.** Codex CLI available.
- **Created `CLAUDE.md`** (repo root, auto-loaded): the mandatory content-quality gate + pipeline +
  definition of done, so the standard is enforced every session without the founder re-explaining.
- **Next:** perfect the content template (answer-first, TLDR, FAQ + FAQPage schema, ScriptureTable,
  PrayerPage, connected JSON-LD, dynamic OG, fix duplicate hero image), build the reusable
  content-production workflow (mine PAA/Reddit -> Codex draft in house voice -> parallel.ai verify ->
  structure -> expert-council adversarial review + iterate -> MDX -> mobile QA), then run it on the
  7 migrated pages + hubs to the standard and report when fully polished.

## 2026-07-24 — Council review + 3 founder decisions + 2 additions

**Council review done.** Ran the six-expert SEO/GEO council over `01`-`05` + `DECISIONS.md`. Verdict:
"sound and unusually well-calibrated on-page — ship it, but not as written." The plan was ~80% on-page for
a problem that, for a zero-authority new domain, is ~80% off-site + entity establishment. Full verdict +
prioritized P0/P1/P2 list saved to `research/10-council-review.md`. Applied all P0/P1 and the cheap P2s
across `01`-`06`. Headline P0 fixes: off-site/entity engine pulled into Phase 1 (four-engine model);
mechanical citation gate; business model + 3-layer metrics (Presence/Readiness/Impact); measurement spine
before Phase 2 (per-engine citation baseline, branded-vs-non-branded GSC, AI-bot crawl logs, competitor
SOV); query fan-out; hreflang build-time invariant + CI guard. Kept (council said do not touch): the
information-gain gate, the sampradaya-transparency framework, schema-as-plumbing (D7), answer-first/semantic
HTML, "don't chase gita gpt."

**Three founder decisions locked (supersede any conflicting council item):**

1. **Krishna AI = HOLD (D13).** Not built in Phase 2 yet; revisit after the content launch. T1 findings
   stand; hero "Ask Krishna AI" CTA links to Gita GPT for now.
2. **Business goal = subscribers + app installs (D14).** Primary tracked conversion = top-of-funnel content
   subscribers (email + PWA/push) AND network app installs, optimized for long-term retention. Not
   donations. Build order + Impact metrics ranked by it.
3. **Verification + authorship model (D15).** Reconciles council P0-2 (which wanted a required human
   reviewer). No human reviewer: an automated multi-source verification pipeline (**parallel.ai** Search +
   Deep Research + our research Workflows, per-claim provenance, unverified citations cut) + a **real**
   editorial identity (Samanyou Garg + Ved Vyas Foundation, real `Person`/`Organization` schema) + a
   published "How we research and verify" methodology page. **Fabricated persona / fake reviewer face
   forbidden.** Real scholar advisor stays a fast-follow option. Resolves Q8.

**Two founder additions:**

1. **Ekadashi / Dvadashi / vrata cluster (C1)** under Festivals: hub at `/festivals/ekadashi/` + per-Ekadashi
   pages (24 named Ekadashis + Dvadashi paran + Krishna-relevant vrats), each with katha/mahatmya, this-year
   date island, vrat vidhi, paran timing, sourced to Padma/Bhavishya/Skanda Purana. New `VratPage`
   (FestivalPage variant) + vrat frontmatter. High recurring monthly demand. Hub + top Ekadashis in P1, the
   rest P2.
2. **Elevated combined Radha Krishna master hub (C2).** `/radha-krishna/` is now a first-class, top-priority
   entity hub (the site's primary entity — it is the domain), distinct from the `/radha/` and `/krishna/`
   deity hubs, with its own combined-couple spokes; top P0 pillar + strongest internal-link anchor.

**Files touched:** `DECISIONS.md` (D13 HOLD, D14, D15, Q8 resolved, council-done note), `01` (§2, §5, §7,
§8, §9, §11), `02` (§2, §3, §3.1, §4, §5, §6, §7), `03` (§8, §9, §10), `05` (all phases + named-workstreams
table), `06` (pipeline + parallel.ai + fan-out + tooling), `README` (index).

**Next:** get the **parallel.ai API key** from the founder → stand up the Phase 0 measurement baseline +
business-goal-ranked build order + query fan-out → then Phase 1 foundation build (scaffold, tokens,
templates incl. VratPage, MDX pipeline, schema/OG, hreflang CI guard, verification pipeline + methodology
page + real author entity, Wikidata/Organization entity claim). Q6 (live darshan) still open.

---

## 2026-07-24 — Kickoff, recon, exploration

**Done**

- Read the founder brief + the "other model" notes. Saved verbatim to `docs/00-original-brief.md`.
- Mapped the local repos. Confirmed:
  - Current site `radhakrishna.net` = old Tailwind Next.js Starter Blog, now on **Next 16.2 / React 19 /
    Tailwind 3**, Pages Router, MDX via `mdx-bundler`, `gray-matter`. Basic blog.
  - **Branding + tech reference = `vedvyas-website`** (Next 16.0.7, App Router, TS, Tailwind,
    shadcn `components.json`, `content/` folder) — the revamp we did yesterday.
  - Design-token / component reference = `writesonic-website` (Sanity CMS + templated blog).
  - `bg-frontend` = Bhagavadgita.com (branding sibling).
  - `writesonic-marketing` = house style (`knowledge/writing/samanyou-house-style.md`), newsletter,
    image pipeline (`social-media/engine/build_images.py`, `newsletter/covers/gptimage`), `.env` with
    SERP/Serper/Ahrefs/OpenAI/PageSpeed/SpyFu keys.
- Created `docs/` + `docs/research/`.

**Done (cont.)**

- Exploration workflow completed (8 agents, 0 errors, ~690k tokens). All reports in `docs/research/`.
  Read all 8 in full/summary.
- Validated the **information-gain / non-commodity content** factor (founder flag): Danny Sullivan's
  Dec 2025 commodity-vs-non-commodity split; Feb 2026 core update raised info-gain weighting (original
  +15-25%, templated -30-50%). Made it a first-class principle in `01-strategy.md` §5.
- Found + logged the **SEO/GEO expert persona library** (`writesonic-marketing/seo-geo/experts/`).
- **Wrote the full strategy set:** `README`, `01-strategy` (positioning, 3 engines, info-gain, GEO/AEO,
  EEAT), `02-content-architecture` (hub-and-spoke clusters, URL map, 10 templates, MDX model, build
  order), `03-tech-and-design` (stack, tokens, perf budget, schema, dynamic OG, motion policy, footer),
  `04-image-and-brand` (2 engines, locked BRAND block, guardrails), `05-roadmap` (6 phases),
  `DECISIONS` (9 made + 6 open).

**Founder decisions locked (2026-07-24)** — see `DECISIONS.md` D10-D13:

- **D10 Bilingual (EN + HI) from day one.** Subpath routing (EN root, HI `/hi/`), hreflang, `content/{en,hi}/`,
  Hindi drafted via Codex too. Reflected in `02` §3.1 + `03` §9.
- **D11 Daily Darshan = lean daily page** (cron-revalidated PPR island, no app).
- **D12 Content pipeline wired end-to-end here** (I build templates + Codex drafting, review, land as MDX).
- **D13 Hero AI CTA -> Gita GPT for now.** Net-new Krishna AI is a Phase-2 go/no-go, gated on demand research.

**In progress**

- **T1 Krishna AI / Krishna GPT demand research** (general-purpose agent): reuse marketing-repo Ahrefs/SERP
  tooling, pull volumes + SERP/competitor read, write `research/09-krishna-ai-demand.md`, return go/no-go.

**Next**

- Read the demand report -> tell founder the numbers -> founder go/no-go on Phase-2 Krishna AI.
- (Founder-requested) Council-mode review of the strategy via `seo-geo/experts/` before building.
- Resolve remaining open decisions Q5 (app URLs) + Q6 (live darshan).
- Then Phase 1 (foundation rewrite): scaffold, tokens, templates, MDX pipeline (EN+HI), schema, OG,
  redirects, one page per template proven green on CWV.

**Canonical domain = `radhakrishna.com`** (changed 2026-07-23; old `.net` now 301-redirects to `.com`).
Build everything against `.com`: `metadataBase = https://radhakrishna.com`, all canonicals, `sitemap.xml`,
`robots.txt`, OG/Twitter URLs, JSON-LD `url`/`@id`, RSS, and every internal absolute link. The repo folder
is still named `radhakrishna.net` locally — that's fine — but **never emit `.net` URLs** in markup/output.
Verify the 301 is a clean single-hop (`.net/*` → `.com/*` same path) so no link equity leaks.

**Mid-flight founder directives (2026-07-24)**

1. **Ved Vyas is a reference floor, not a ceiling.** Improve on it — more visually attractive, tasteful
   micro-animations — but **performance is the #1 priority**, then SEO. Never trade perf for polish.
2. **Use the SEO/GEO expert persona library as a second brain.** Located at
   `writesonic-marketing/seo-geo/experts/` — dossiers on **Tim Soulo, Ryan Law, Aleyda Solis,
   Kevin Indig, Lily Ray, Mike King** (+ `seo-audit/experts/` adds Eli Schwartz, Cyrus Shepard,
   Marie Haynes, Britney Muller, Ross Hudgens, Tom Capper, Daniel Waisberg). Each has a "How to
   role-play" operating manual + verified quotes. Plan: run the master strategy through a **council-mode
   review** (all six) before finalizing, and embody the relevant one per decision (e.g. Lily Ray on
   avoiding thin-content/compare-farm penalties, Ryan Law on what content survives AI, Mike King on
   passage-level citation structure, Tim Soulo on BP-scoring + off-site citations).

**Open decisions (to confirm with founder)** — tracked in `docs/DECISIONS.md` once exploration lands.
