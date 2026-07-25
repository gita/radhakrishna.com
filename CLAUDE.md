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

# Authorial first person. The narrator has no "I": a devotee-scholar states what is true,
# never what they personally would do. Reader-voice questions ("How do I fast?") are fine.
grep -rnE "\bI (would|will|have|had|think|checked|found|treat|say|note|could|cannot)\b|\bI'(m|ve|d|ll)\b" content/
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

## Standing conventions (do these without being asked)

**Imagery.** Every generated image that is good enough to ship gets: a `webp` under
`public/images/content/` sized ~1600px wide, an `imageAlt` that describes the scene (it renders as the
visible caption AND feeds `ImageObject`), and a place in the `/images` gallery. The gallery builds itself
from any doc with an `image`, so wiring the frontmatter is enough, but check it actually appears there and
that clicking it opens the lightbox. Never ship art that only lives on one page.

**Photos of real places.** Temple and place pages lead with **real photographs**, not generated art.
A reader researching Banke Bihari wants the actual building. Generated art is kept only for scenes no
camera can show (the midnight birth, Radharani's appearance) and for festival pages.

A photograph of a temple is **copyrighted by the photographer** even though the building is public, and
Google Images is an index of copyrighted work, not a source. Use only:

- **Wikimedia Commons** (plenty for Braj: Banke Bihari, Barsana, Vrindavan, Prem Mandir all have 50+
  images, typically CC BY-SA 3.0/4.0 at 2000px and up). Attribution is mandatory: photographer name,
  the licence, and a link back to the file page. Store those in the image record, do not drop them.
- **Unsplash / Pexels** where coverage exists.
- **Foundation-owned photos**, which are best of all and unique to us.

Place pages should carry a small gallery of several angles, not one hero. Never ship a photo whose
licence and photographer you cannot name.

This is wired up now. `node scripts/find-commons-photos.mjs "<query>"` lists only candidates that are
large enough, freely licensed, and have a named author. **Look at every candidate at full size before
choosing**: in the first pass a file called `Chhatris of Barsana 01` turned out to be Lathmar Holi
indoors, and a popular Prem Mandir shot had a NOKIA watermark burned into the corner. Then
`scripts/fetch-commons-photos.mjs` downloads the chosen ones, writes the WebP, and emits the exact
`photos:` YAML with photographer, licence, licence URL and source. The `photos[]` schema makes
`credit`, `licence` and `source` **required**, so an uncredited photo cannot get through the build,
and `PlaceGallery` renders the credit visibly. A hero photograph carries the same credit through
`imageCredit` / `imageLicence` / `imageLicenceUrl` / `imageSource`. Attribution is the condition of
use for CC BY and CC BY-SA, not a courtesy.

**Festival dates.** Never publish a lunar festival date from a single web source. Take dates from **Indian panchang authorities**: Drik Panchang for the general
(smarta) day and the **ISKCON Vaishnava calendar**, which is the tradition this site follows and what Mathura
and Vrindavan keep, and record which in the `source` field, then run `npm run check:festivals`. That script recomputes the tithi with the Swiss
Ephemeris and reports whether the date holds under the sunrise (vaishnava) or midnight (smarta)
reckoning. It cannot arbitrate between traditions and must not be treated as the authority; a date
matching neither reckoning is simply wrong. Show BOTH sampradaya dates when they differ, labelled by sampradaya, not by
householder status: the split is smarta vs vaishnava, and "grihastha" refers to fasting practice, not
to which day is kept. Drik Panchang lists the smarta day first and the vaishnava day second.
**Lead with the smarta day**, which is what most households keep and what most visitors are searching
for, and give the vaishnava day directly beneath it, noting that ISKCON and the temples of Braj keep it.
Do not describe the split as householder vs sannyasi: Vaishnava sampradayas are full of householders,
and the difference is one of tradition, not ashrama. Two further traps: krishna-paksha festivals carry different
month names in amanta vs purnimanta (Janmashtami is Shravana krishna ashtami in amanta, Bhadrapada in
purnimanta, same day), and smarta and vaishnava observance can legitimately fall a day apart, as in
2025 when ashtami spanned midnight. Say so on the page when it happens.

**Scripture on the site.** Never type a verse from memory. The foundation's own dataset
(github.com/gita/gita) has all 701 verses with five named English translations; pull from it and credit
the translator. `scripts/build-daily-verses.mjs` generates `lib/daily-verses.ts` this way, so the only
editorial choice is which references to include. A fabricated verse shipped early in this project (an
Arjuna line rewritten as Radha); that must never happen again.

**How a verse is set on the page.** A quoted verse is never left inline in a paragraph, and there is
one house pattern for all of them. Any of the three parts may be absent, but the order never changes:

```
> _sanskrit transliteration, one italic line per line of the verse_
> _second line of the verse_
>
> "The translation, in quotation marks."
>
> <cite>Bhagavata Purana 10.30.28</cite>
```

Each verse line becomes its own line through CSS, so do not add `<br />` and do not rely on trailing
double spaces, which are invisible and get eaten by formatters. Inside a quote, italics mean "this is
a verse line", so a translation never carries emphasis. The citation goes in `<cite>`, never as a bare
last line. Four different conventions had grown up across the content before this was written down.

**Social cards.** Every page's `og:image` is the drawn card from `/og`, never the page's own
content image. The art is WebP at roughly 3:2, and a card has to be PNG or JPEG at 1.91:1: X and
WhatsApp render **nothing at all** for a WebP card, and every network crops 3:2 to its own ratio.
This failed silently for sixteen pages, because nothing on the page looks wrong when its card is
broken. `npm run check:og` fetches every page in the sitemap, decodes the escaped URL, reads the real
format and pixel size from the image header, and fails on WebP, a 404, or an undersized card. Run it
after any metadata change. The card carries the morpankh, not a placeholder shape.

**FAQ answers.** Answers over about 50 words are broken into paragraphs with a YAML folded scalar
(`answer: >` with a blank line at the pivot), never left as one block. Break where the thought turns,
usually after the direct answer and before the supporting detail or citation. `npm run check:faq`
compares every answer against a saved snapshot with whitespace collapsed, so a reflow that silently
reworded a verified claim fails the check. Run `npm run check:faq:save` before starting one.

**Deleting a page.** Grep the whole tree, not just `content/`. A page is referenced from: body links in
other MDX, `related:` frontmatter (a dangling slug now throws at build), hub tables, `app/page.tsx`
popular questions, the sitemap, the `/images` gallery, Daily Darshan, AND the strategy docs in `docs/`.
Leaving it in `docs/02` or `docs/research/*` means a future run rebuilds the page. Record the call in
`docs/DECISIONS.md` so the reasoning survives. If the page was ever live, add a 301 to the closest
surviving page rather than leaving a 404.

**Visual QA is a ship condition, mobile first.** Most of our readers are on mobile web, so no page
goes into a PR until it has been _seen_ at a real phone viewport and on desktop, not merely asserted to
be responsive. Use Playwright (`npx playwright screenshot`, or a script with `devices["iPhone 14"]`):
the Chrome automation here refuses to size below roughly 1900px, so it cannot do this. Capture full-page
screenshots at 390x844 and at 1440 wide, look at every one, and check: nothing overflows sideways, the
hero and headings are readable, tables scroll inside their own container rather than the page, the FAQ
and related cards stack cleanly, images load and are not stretched or cropped through a face, the app CTA
does not cover content, and tap targets are not cramped. Fix what you see before opening the PR, and say
in the PR which viewports you checked.

**Before calling a PR ready to merge, run the whole checklist yourself:**

1. `node scripts/check-links.mjs --external` (routes, internal links, images, anchors, legacy redirects,
   outbound citations). 403/429 from Britannica and krishna.com are bot walls, not breaks.
2. Production build green, and every page hydrates (a client component that silently fails to hydrate
   looks exactly like a CSS bug, see the lightbox incident).
3. Canonicals absolute on radhakrishna.com, no `.net`, no stray `noindex`, sitemap entries all 200.
4. `.env` gitignored and untracked; no secrets in tracked files.
5. Visual pass on mobile and desktop for the pages the change touches.
6. After merge and deploy, re-run 1 and 3 against production, then submit to search
   (see "Getting pages indexed" below). Do not wait to be asked.

## Getting pages indexed (what actually works)

**Google has no legitimate push channel for our pages.** Verified, not assumed:

- The sitemap ping endpoint was retired in June 2023 and 404s. There is no replacement.
- The Indexing API is documented for **job posting and livestream pages only**. Using it for articles is
  outside its stated purpose; do not build on it.
- A sitemap is officially "merely a hint". Pages sitting in "Discovered, currently not indexed" is
  usually a site-quality or crawl-capacity signal, not a submission problem. The fix is better pages and
  internal links, which is the whole point of the content gate above.
- The Search Console API **can** submit a sitemap: `PUT /webmasters/v3/sites/{siteUrl}/sitemaps/{feedpath}`.
  Per-URL "Request indexing" has no API and is human-only with a small daily quota. **Do not script the
  Search Console UI** with Chrome or Playwright to bypass that quota: it is automated access to Google
  under their terms, and risking the domain is a far worse outcome than slower indexing. Do it by hand,
  or use the URL Inspection API (read-only) to find which pages are missing and spend the manual
  requests on those.

**IndexNow is the one real push we have.** Bing, Yandex, Seznam, Naver. Not Google. It matters because
Bing feeds Copilot, ChatGPT search and Perplexity. `npm run indexnow`, key in `.env` and at `/<key>.txt`,
GitHub Action fires on content landing on main. Submit on genuine change only; resubmitting the same URLs
on a timer is what earns a 429.

**Do not drip-feed.** The advice to trickle URLs comes from vendors selling backlink-indexing services.
Google publishes no such guidance and says sitemap order is irrelevant. Drip-feeding is a hedge against
mass-produced thin pages; ours are verified and original, so ship them all at once.

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
