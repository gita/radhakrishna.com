# Radhakrishna.com — working rules (read first)

This is the digital home of Shri Radha Krishna, a project of the Ved Vyas Foundation. The full strategy
lives in `docs/` (read `docs/README.md` first). These are the non-negotiable rules for any work here.

## Rule zero: never let the machinery show (absolute, no exceptions)

**Nothing we publish may ever contain an internal QA note, an internal monologue, or any narration of how
the page was made.** A reader who sees that instantly reads the site as AI-generated, and we lose the trust
this project exists to earn. This outranks every other consideration below.

Never write, in any page, any of these or anything like them:

- "I could not verify / could not be confirmed / remains unverified / no reliable source found"
- "I looked for a verse and could not find one", "in any scan", "I checked and"
- "I would label this as", "so we label it", "we flag this", "for transparency", "one honest caveat"
- "I am reporting this as", "treat this as", "note to reader", "editor's note", "disclaimer"
- Any first-person narration of research, sourcing, verification, or tooling. Any hedge that describes
  **our process** rather than **the evidence**.

State the same truth as a fact about the evidence instead. This is not a softening, it is better writing:

| Never                                        | Always                                                    |
| -------------------------------------------- | --------------------------------------------------------- |
| "I could not find a verse for her death"     | "No classical text narrates her passing"                  |
| "I could not verify a chapter and verse"     | "It is not handed down with a numbered chapter and verse" |
| "I would label this as devotional tradition" | "This is devotional tradition"                            |
| "so we label which school is speaking"       | "Each page tells you which school is speaking"            |
| "I looked for a verse and there isn't one"   | "There is no verse anywhere that says it"                 |

Being honest about what scripture does and does not say is **required** (see the gate below). Narrating our
own uncertainty, effort, or pipeline is **forbidden**. Every page must read as though a devotee-scholar
wrote it, never as though a pipeline produced it. Sweep for this before any page ships:

```
grep -rniE "I could not|I looked for|could not (be )?(verif|confirm)|I would label|so we label|we flag|unverified|for transparency|honest caveat|I am reporting|editor'?s note|as an AI" content/
```

The same applies to the site's own copy (components, metadata, OG text), not just MDX.

## The content-quality gate (mandatory, no exceptions)

**No content page ships, and no page is "migrated as-is", unless it has passed the full pipeline below.**
Thin content, unverified scripture, or a raw import is a defect, not a draft. Never lower the bar to save
time. If a blocker (e.g. the parallel.ai key) is missing, say so and stop, do not ship a half-baked page.

### The pipeline every content page runs through

1. **Discover demand.** Mine the real questions for the topic: People Also Ask (**SerpApi**, see below) + Reddit +
   Quora. These become the H2s and the FAQ. (docs/06 §4)
2. **Research + verify.** Corroborate every specific or contested claim across multiple authoritative
   sources with **parallel.ai** (Search + Deep Research) plus web research. Cite scripture by chapter/verse
   and label by sampradaya. Never state from memory; never invent a verse, date, or attribution. (docs/01
   §6, docs/06 §2-3)
3. **Draft in the house voice.** gpt-5.6-sol (Codex) grounded in the verified material, in Samanyou's house
   style (`writesonic-marketing/knowledge/writing/samanyou-house-style.md`). No em dashes, no AI tells, no
   slop, readable and well-structured. (docs/05 §... , research/05)
4. **Structure for GEO/AEO + humans.** Answer-first (a self-contained 40-75 word answer in the first
   lines), a TLDR / Key Takeaways box, question-led H2s, one idea per paragraph, comparison/scripture
   tables, a real FAQ (from step 1), a Sources block, internal links up/down/lateral + cross-cluster.
   (docs/01 §5-7, docs/02)
5. **Schema + OG.** Connected JSON-LD graph: BreadcrumbList + Article/CreativeWork + Person(author) +
   Organization + ImageObject, plus FAQPage where there is genuine Q&A, Event for festivals, Place for
   temples. A dynamic OG image per page. (docs/03 §5-6)
6. **Imagery.** Original, on-brand devotional art generated with our image models (gpt-image-2 / Gemini),
   bright and light-first, faces never cut, WebP, alt text. Never a duplicate image on one page. (docs/04)
7. **Expert council review (adversarial, multiple rounds).** Run the page through the SEO/GEO expert
   personas in `writesonic-marketing/seo-geo/experts/` (Lily Ray, Mike King, Ryan Law, Aleyda Solis, Tim
   Soulo, Kevin Indig) plus a factual/doctrinal check. They try to refute it. Fix what they find. Iterate
   until it survives. (docs/README, docs/10 council method)
8. **QA.** Renders and looks good on **mobile and desktop** (verify with the browser), green Core Web
   Vitals, valid schema, working internal links.

### Definition of done (a page is not done until all are true)

- [ ] Answer-first block + TLDR/Key Takeaways present
- [ ] Every claim verified (parallel.ai + 2+ sources); scripture cited with chapter/verse + sampradaya label
- [ ] House voice, no em dashes, no AI tells, not thin
- [ ] **Zero internal QA notes / internal monologue / process narration** (rule zero; run the grep)
- [ ] FAQ sourced from real questions (PAA/Reddit/Quora), comparison/definition tables where useful
- [ ] Full JSON-LD graph + dynamic OG + meta tags
- [ ] Original on-brand imagery, no duplicates, faces intact, alt text
- [ ] Passed the expert council adversarial review after iteration
- [ ] Verified on mobile + desktop; internal links wired; sitemap updated

## Read the docs, do not assume

Before using any API, library, or system (Parallel, Reddit, Serper, Ahrefs, Velite, next/og, schema.org,
etc.), read its official documentation for the exact endpoint, params, auth, and request/response shape.
Verify against the docs (context7 for libraries, WebFetch the official API docs). Never guess an endpoint or
a field and hope it works. Confirmed so far: Parallel Search = `POST https://api.parallel.ai/v1/search`
(header `x-api-key`, body `{objective, search_queries, mode}`); Reddit OAuth needs a
`script:app:vN (by /u/user)` user agent.

**Use SerpApi for People Also Ask, not Serper.** Serper returns no `peopleAlsoAsk` block on our plan.
SerpApi does: `GET https://serpapi.com/search.json?engine=google&q=...&gl=in&hl=en&api_key=$SERP_API_KEY`
-> `related_questions` (the PAA) and `related_searches`. Keep Serper only as a fallback for organic
titles/autocomplete.

## Design + engineering rules

- **Light-first, bright, joyful.** Radha Krishna are light and knowledge. Never auto dark mode. Deep tones
  only as a sparing accent. Reverent, premium, the Calm/Apple/Duolingo bar. (docs/07)
- **Never overlay text on the deities' faces.** Art is framed and unobstructed.
- **Reuse before adding** components; custom-branded, semantic design tokens; performance is the #1 gate.
- **No em dashes anywhere** (copy, docs, commits, chat). Straight quotes.
- **Never leak the machinery into the page.** See **Rule zero** at the top of this file.
- **Canonical domain is radhakrishna.com.** Never emit .net URLs.
- Commit + push in small steps on the working branch; the preview link auto-updates.

## Keys / tooling

- Content verification needs **`PARALLEL_API_KEY`** in `.env` (never committed). Reddit demand mining needs
  a Reddit app or the public JSON endpoint. SERP/keyword tooling: `SERPER_API_KEY`, `AHREFS_API_KEY`,
  `KE_API_KEY` (in `writesonic-marketing/.env`). Image gen: `OPENAI_API_KEY` (gpt-image-2 works),
  `GEMINI_API_KEY` (currently invalid; needs a valid key for Nano Banana Pro).

## Working log

Keep `docs/WORKING-LOG.md` current (newest on top) so work can be resumed anytime.
