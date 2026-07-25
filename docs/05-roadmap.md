# 05 — Roadmap

Phased execution. Each phase has a definition of done. We do not start content at volume until the
template + token + schema + OG foundation is proven on a few real pages. The near-term forcing function is
**Janmashtami + Radhashtami season (Sep 2026)**: the tentpole cluster should be live and indexed ~4-6 weeks
ahead.

---

## Phase 0 — Strategy sign-off + measurement spine + business goal (now)

- Strategy docs written (`00`-`06`). Founder reviews, answers `DECISIONS.md`. **Council review done**
  (`research/10-council-review.md`); its P0/P1/P2 fixes folded into `01`-`06`.
- **Business goal locked (D14, P0-4):** primary conversion = content subscribers (email + PWA/push) +
  network app installs, optimized for retention. **Re-rank the build order by which pages feed that
  conversion** (`02` §7) before Phase 2 content starts.
- **Measurement spine stood up before Phase 2 (P0-5)** using the already-connected Writesonic + Peec:
  per-engine citation baseline for the top ~30 target prompts (per engine, not blended); branded-vs-non-
  branded GSC split (branded-query growth = headline KPI); AI-bot crawl-log analysis (verify GPTBot /
  PerplexityBot / ClaudeBot / Google-Extended actually fetch); competitor share-of-voice baseline; the
  tracked-prompt constellation = the query fan-out set (`06` §4d). Three-layer metrics = `01` §11.
- **Query fan-out planning (P0-6):** run the fan-out simulator on the top ~15 head queries; turn the
  keyword map into a fan-out coverage map (`06` §4d).
- **Get the parallel.ai API key** from the founder (gates the verification pipeline, D15).
- **Done when:** decisions resolved, scope locked, business goal + build-order ranking set, measurement
  baseline captured, parallel.ai key in hand.

## Phase 1 — Foundation (the rewrite skeleton)

Stand up the new App Router site with the design system and one of each template, before any volume.

- New Next 16 App Router + TS scaffold; port tokens (`globals.css`, `tailwind.config.ts`), `button`, `cn`,
  `lib/og.tsx`, layout/metadata/manifest/robots/sitemap scaffolding from vedvyas/bg-frontend.
- Design-token system (primitive -> semantic -> component) with the devotional palette extension.
- Header, footer (with the org network links), nav, theme handling.
- MDX content pipeline: `content/` glob + gray-matter + typed frontmatter + the MDX-components map.
- One working page per core template (Question, Story, DeityHub, Prayer, Festival, Temple, Gallery) using
  real P0 content.
- Schema emitter (`lib/schema.ts`), dynamic OG (`lib/og.tsx` + per-type), sitemaps (+ image sitemap),
  robots, 301 redirect map for the ~17 old URLs, `.net -> .com` hop verified.
- **hreflang build-time invariant + CI reciprocity guard, no auto-redirect (P0-7);** JS-disabled check that
  the festival/Ekadashi date island is server-rendered (P2-5) — both Phase-1 done-criteria.
- Brand image system: lock BRAND block, produce the first `brand-refs/` set, optional `image_engine.py`.
- **Wire the verification pipeline (D15, A3), not "hire a pandit":** integrate **parallel.ai** (Search +
  Deep Research) + our research Workflows as the citation-verification stage (`03` §10, `06`), and build
  the published **"How we research and verify" methodology page** + the real author entity (Samanyou Garg
  `Person` schema `sameAs`; Ved Vyas Foundation as publisher). No fabricated reviewer.
- **Off-site / entity engine starts here (P0-1), not Phase 6:** create/claim the **Wikidata item +
  Organization entity + `sameAs`** wiring across the sibling network on day one; reserve the YouTube
  channel; begin the co-occurrence / earned-mention motion (temples, scholars, ISKCON, Vaishnava
  publishers, genuine forum participation). Off-site KPI ranks equal to organic sessions.
- **Done when:** the seven templates (+ VratPage variant) render real pages, Lighthouse is green
  (LCP < 2.0s, CLS < 0.05), OG + schema validate, hreflang CI guard passes, the date island survives
  JS-disabled, redirects resolve, the verification pipeline + methodology page + real author entity are
  live, the Wikidata/Organization entity is claimed, deploys to Vercel preview, real-device QA clean.

## Phase 2 — Master hub + synthesis-led pillars + homepage (P0 content)

Build the money pages and the homepage that ties the engines together. **Sequence citation capture to lead
with the differentiated synthesis (P1-8):** the head-entity pillars are the _least_ winnable citations for
years, so lead with the pages where no authority yet exists.

- **The Radha Krishna master hub (`/radha-krishna/`) as the top P0 pillar (C2)** — the site's primary
  entity and strongest internal-link anchor, with its own combined-couple spokes.
- **The Radha Krishna Scripture Concordance synthesis pages first (P1-8):** the marriage/death/husband
  scripture tables, Radha-vs-Rukmini, sampradaya comparisons — the winnable citations. Build the concordance
  as one named, versioned, canonical dataset (`01` §5), the tables its surface.
- The pillar hubs (Who is Radha, Radha Krishna love story) for organic traffic + internal-link anchoring.
- The highest-opportunity P0 questions (marriage, death, husband, left Vrindavan, Lakshmi) with scripture
  tables, each **leading with the crisp dominant answer, nuance in the table below (P1-7)**.
- P0 devotion (Hare Krishna Maha Mantra, Radhashtakam) with audio.
- The **one** "Radha Krishna HD images" page that kills the story + image query together (galleries
  otherwise demoted, P1-3) + quotes, with original art + `ImageObject` schema.
- **Moat vs coverage effort split (P1-2):** the 5-8 moat pages get the firsthand E (Experience /
  Experimentation) as a ship condition; the rest get the lean coverage template. Not a uniform buff.
- **Real author entity + verification stamp on every doctrinal page (D15):** Samanyou Garg + Ved Vyas
  Foundation `Person`/`Organization` schema; "verified [date]/method/sources" via the parallel.ai pipeline.
  No fabricated reviewer.
- **YouTube as a core engine, in parallel from here (P1-9):** darshan, aarti, story explainers, festival
  videos, with its own cadence and metric — not a Phase-3 seasonal seed.
- **The "What the world asks Krishna" proprietary-data study (P1-5)** from Gita GPT + the apps (aggregated,
  anonymised) begins its recurring cadence — off-page lever + entity builder + differentiator.
- **Done when:** all P0 pages live, sourced + verified through the D15 pipeline, internally linked, indexed,
  green CWV; the concordance dataset is named/versioned; YouTube is publishing; per-engine citation tracking
  and the D14 conversion (subscribers + installs) are instrumented.

## Phase 3 — Festival tentpole (seasonal, time-boxed to Sep 2026)

- Radhashtami + Janmashtami pages (evergreen hub + this-year date), Banke Bihari + Barsana + Vrindavan,
  festival-image sets, quote/status sets. Ship 4-6 weeks ahead of the spike.
- Pinterest boards + Instagram; the YouTube engine (already running from Phase 2, P1-9) leans into this
  cluster with festival/darshan videos.
- Any Ekadashi falling in-season gets its date page shipped 4-6 weeks ahead too (`02` §7, C1).
- **Done when:** the festival cluster is live, interlinked, distributed, and indexed before the spike.

## Phase 4 — Cluster completion (P1)

- Fill each cluster to depth: remaining questions/teachings, 108 names, more stotras/aartis/bhajans, more
  temples (Prem Mandir, Nidhivan, Radha Raman, ISKCON), Braj geography, the remaining master-hub spokes.
- **The Ekadashi hub (`/festivals/ekadashi/`) + the top few high-demand Ekadashis (P1, C1):** Nirjala,
  Devshayani, Prabodhini/Devutthana, Mokshada/Gita Jayanti, Vaikuntha — strong recurring monthly demand.
- **Begin Hindi, staged behind proven English winners (P1-1, D10):** translate the ~8 English pages that
  proved they get cited into Hindi first, through the same verification gate (D15) + native Devanagari /
  transliteration accuracy. Not the long tail via raw Codex.
- Complete the internal-link graph (every spoke up/down/lateral + cross-cluster bridges).
- **Done when:** every cluster has its hub + core spokes, the Ekadashi hub + top Ekadashis live, the proven
  winners have Hindi editions, no orphan pages, link graph complete.

## Phase 5 — Daily-habit engine + long-tail (P2) + polish

- Daily Darshan (scope per `DECISIONS.md`): daily image + verse + reflection + mantra audio + tithi, share,
  archive. PPR/ISR dynamic island.
- P2 depth + long-tail; festivals calendar hub; **the remaining ~19 Ekadashis + Dvadashi/vrat pages (C1)**;
  the demoted wallpaper/DP/status galleries (held to the info-gain bar, P1-3); emotional/sad quotes;
  Dwarka/Mathura/Gokul geography.
- Micro-animation polish pass (CSS-first, reduced-motion safe), final design-review pass.
- Deepen the **D14 conversion surfaces** (email/newsletter + PWA/push subscribe + app-install prompts) —
  the primary conversion, so the capture UX and its Impact-layer tracking are first-class, not optional.
  ("Ask Krishna AI" stays on HOLD, D13.)
- **Done when:** the site is comprehensive, the daily loop works, the subscribe/install conversion is
  tracked, polish pass done, all guardrails green.

## Phase 6 — Ongoing (post-launch operating rhythm)

- Refresh festival + Ekadashi date pages 4-6 weeks pre-spike each year; re-verify temple timings quarterly
  (P1-6); keep `dateModified` honest.
- Wire the Ahrefs/SERP APIs for exact MSV/KD; track AI citations per engine via Writesonic/Peec; prune/merge
  any thin pages; expand clusters by demand.
- **Off-site is now a sustained motion (started Phase 1, not here):** ongoing Pinterest/YouTube/Instagram,
  entity consistency (Wikipedia/Wikidata), digital-PR / co-occurrence, concordance distribution.
- Recurring "What the world asks Krishna" data study (P1-5); version + distribute the concordance (P1-4).
- Continue Hindi rollout behind proven English winners (P1-1); add a real scholar advisor if/when one is
  sourced (the D15 fast-follow). Revisit the Krishna AI HOLD after the content launch (D13).

---

## Guardrails that apply to every phase

- Do not publish a page that fails the information-gain test (`01` §5).
- Do not 10x page count faster than verification capacity can keep up (velocity is capped to the pipeline).
- Every doctrinal page: sourced + verified (D15 pipeline) + dated, real byline, no fabricated reviewer.
- Performance budget (`03` §4) is a gate, not an aspiration: a page that misses it does not ship.
- Every phase updates `WORKING-LOG.md`.

## Named workstreams (council doc 10 §6 — each now has a phase home)

| Workstream                                                      | Phase home                  | Ref         |
| --------------------------------------------------------------- | --------------------------- | ----------- |
| Off-site / entity-establishment engine                          | Phase 1 start, ongoing      | P0-1        |
| Measurement / instrumentation spine (pre-Phase-2)               | Phase 0                     | P0-5        |
| Business-model / conversion definition + build re-rank          | Phase 0                     | P0-4 / D14  |
| Verification layer (parallel.ai + Workflows) + real identity    | Phase 1                     | P0-3 / D15  |
| Query fan-out planning track                                    | Phase 0                     | P0-6        |
| Original-data pillar ("What the world asks Krishna", recurring) | Phase 2 on                  | P1-5        |
| Named canonical sampradaya concordance + distribution           | Phase 2 build, Phase 6 dist | P1-4        |
| hreflang / i18n QA track (CI reciprocity, no-redirect, JS-off)  | Phase 1                     | P0-7 / P2-5 |
| YouTube core engine                                             | Phase 2 on, parallel        | P1-9        |
| Ekadashi / vrata cluster                                        | Phase 4 (P1) + Phase 5 (P2) | C1          |

## Sequencing note

Phases 1-2 are the critical path. Phase 3 is date-driven (Sep 2026) and can overlap Phase 2 if the
foundation is ready. Phases 4-5 are volume + retention and run after the pillars prove the model. **The
strategic weight shifts to off-site + entity establishment in Phases 1-2** (the binding constraint on
citations for a new domain), while the cheap on-page discipline stays.
