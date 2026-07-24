# 06 — Content Research Operations

How we discover what to write, and how we verify every claim before it ships. This is the operational
backbone of the factual-accuracy principle (`01` §6) and the demand-mining principle (`01` §7). No page is
drafted or published outside this workflow.

---

## 1. The per-page pipeline

Every content page moves through five stages. AI drafts, an automated verification pipeline corroborates,
sources decide (D15 — there is no human reviewer).

```
1. DISCOVER   -> mine the real questions (PAA + Reddit + video) + query fan-out for this topic
2. RESEARCH   -> gather + corroborate facts across multiple authoritative sources
3. DRAFT      -> Codex gpt-5.6-sol writes in house voice, answer-first, with citations inline
4. VERIFY     -> parallel.ai (Search + Deep Research) + our research Workflows corroborate every claim
                 across multiple sources with provenance; unverified citations are CUT
5. PUBLISH    -> land as MDX with <Sources>, real byline, "verified [date]/method/sources", last-updated
```

The mechanical anti-slop gate (`structural_check.py` pattern) runs at stage 3/4. The **factual /
citation-verification gate** runs at stage 4 and is a hard blocker: every specific or contested claim is
corroborated across multiple authoritative sources with provenance, and an **unverified scripture citation
is cut, not softened** (`03` §10, D15). Verification is automated (parallel.ai + Workflows), not a human
reviewer; the trust signal is the real editorial identity (Samanyou Garg + Ved Vyas Foundation) plus a
published **"How we research and verify" methodology page** that documents this exact pipeline. Publishing
velocity is capped to genuine verification throughput.

## 2. The factual-verification protocol (stage 2 + 4)

The rules from `01` §6, made operational.

**Classify every claim before writing it:**

| Claim type                    | Example                                                          | Action                                                    |
| ----------------------------- | ---------------------------------------------------------------- | --------------------------------------------------------- |
| Common knowledge              | "Krishna was born in Mathura." "The Gita is in the Mahabharata." | State directly, no research needed                        |
| Specific / numeric / dateable | verse references, festival dates, ages, counts                   | Verify + cite exact source                                |
| Doctrinal / interpretive      | meaning of their love, moksha, Radha's identity                  | Cite named tradition(s) + acharya(s); label the view      |
| Contested / varies by text    | did they marry, how Radha died, Radha's husband                  | Present scripture-by-scripture; never pick one silently   |
| Not verifiable                | a claim no authoritative source supports                         | Cut it, or state qualitatively without the false specific |

**Parallel corroboration rule:** a specific or contested claim needs **agreement across at least two
independent authoritative sources** before it is stated as fact, or it is presented as "according to
[named source/tradition]". One blog, one forum post, or one model's memory is never sufficient. Where
sources disagree, the disagreement is the content (the sampradaya table).

**The verification mechanism (D15) — parallel.ai + our Workflows.** Corroboration is run automatically, not
by a human reviewer:

- **parallel.ai Search API** for cheap factual lookups (~$0.001-0.005/req) — verse existence, dates, names,
  quick cross-checks.
- **parallel.ai Deep Research / Task API** for contested doctrinal claims — evidence-based, returning
  provenance and citations **per fact**, so the source trail is captured, not asserted.
- **Our own multi-agent research Workflows** run per page on top, to assemble the corroboration and the
  sampradaya-by-sampradaya view.
- Output feeds the page's `verified{date, method, sources}` frontmatter (`02` §5) and the `<Sources>`
  block. An unverified citation is **cut**. The parallel.ai key is stored like the other keys (env, never
  in served output) — **awaiting it from the founder**.

**Never:** invent a verse number, a date, a statistic, or an attribution. Source it or omit it.

## 3. The authoritative source canon (what we cite)

Primary scripture and recognized commentary, cited with chapter/verse or section. Draft canon (verify each
edition/translation when used):

**Primary texts (Radha-Krishna relevant):**

- Bhagavata Purana (Srimad Bhagavatam) — esp. Canto 10 (Krishna's life, Vrindavan, Raas Lila).
- Bhagavad Gita — Krishna's teaching (part of the Mahabharata, Bhishma Parva).
- Mahabharata — Krishna's role, Kurukshetra.
- Brahma Vaivarta Purana — one of the main texts where Radha is prominent.
- Gita Govinda (Jayadeva) — the poem that shaped Radha bhakti.
- Garga Samhita — Radha-Krishna narratives.
- Padma Purana, Vishnu Purana, Harivamsa — supporting.
- Vedanta / stotra literature for prayer pages (with tradition attribution).

**Named commentators + traditions (cite where interpretation differs):**

- Adi Shankaracharya (Advaita Vedanta)
- Ramanujacharya (Vishishtadvaita / Sri Vaishnavism)
- Madhvacharya (Dvaita)
- Nimbarkacharya (Dvaitadvaita; strong Radha-Krishna focus)
- Vallabhacharya (Shuddhadvaita / Pushtimarg)
- Chaitanya Mahaprabhu and the Gaudiya Vaishnava acharyas (Rupa, Jiva, Sanatana Goswami)
- Recognized institutions (ISKCON, the Braj sampradayas) — as tradition sources, labeled as such.

**Reliability tiering (how much corroboration a source buys):** primary scripture + recognized academic
(Britannica, university/press, The Conversation) + established institutional (ISKCON, major temples) are
high-trust; general mythology/lifestyle blogs and UGC (Quora, Reddit, Fandom) are **leads, not proof** —
they tell us what people ask and claim, never what is true. Wikipedia is a starting map, verified against
its own cited primary sources, not cited as the final authority.

**The sampradaya-transparency labels** (rendered per row in `<ScriptureTable>`): _explicitly in a named
scripture_ / _later devotional literature_ / _taught within a specific tradition_ / _regional legend_ /
_modern retelling_. Every contested claim carries one.

## 4. Question-demand mining (stage 1)

We answer the questions people actually ask, sourced three ways.

### 4a. People Also Ask + related searches

- **Serper** (`SERPER_API_KEY`, serper.dev) returns `peopleAlsoAsk` and `relatedSearches` for any query.
  Reuse the existing marketing-repo Serper client (`writesonic-marketing/ads/api/`, confirmed working in
  the T1 demand research). SerpApi (`SERP_API_KEY`) is the fallback.
- **Ahrefs** (`AHREFS_API_KEY`) "matching terms / questions" for volume-ranked question phrasings.
- Output: the exact question phrasings become our `H2`/`H3` headings and FAQ entries. Run per cluster,
  seed with the head terms from `research/07`.

### 4b. Reddit question mining

Real, human, long-tail questions and the framings that resonate.

- **Subreddits:** r/hinduism, r/vaishnavism, r/Krishna, r/IndianHistory, r/mahabharata, r/bhagavadgita,
  r/spirituality (Radha-Krishna threads).
- **Tooling reality:** there is **no Reddit API key in the marketing `.env`** today. Options, cheapest
  first: (1) Reddit public JSON search — `https://www.reddit.com/r/{sub}/search.json?q=radha&restrict_sr=1`
  and `.../{sub}/top.json` (read-only, no auth, respect rate limits + user-agent); (2) `site:reddit.com`
  via Serper; (3) create a Reddit script app for PRAW/OAuth if we need volume. Start with option 1/2.
- **Use:** mine the questions and the pain points (confusion, curiosity), then answer them on-site with
  verified, sourced, direct answers. We do not scrape or republish Reddit content; we learn what to answer.

### 4c. Video learning (English + Hindi)

- Research popular YouTube videos on Radha, Krishna, and the Bhagavatam (both languages). Discover via
  YouTube search / Data API.
- **Transcripts:** no tooling exists yet; add `youtube-transcript-api` (Python) or `yt-dlp --write-auto-sub`.
- **Use:** learn which points, stories, and framings land with audiences, and what questions creators
  answer. Then write our **own original, verified** blocks. **Learn from, never copy** — transcripts are
  input for understanding demand and angle, not source text to paraphrase, and every fact still passes §2.

### 4d. Query fan-out (P0-6)

AI Mode decomposes a head query into a hidden constellation of synthetic sub-queries, so a keyword map is
not enough. Before building a cluster:

- Run a **fan-out simulator** (Qforia or equivalent) on the top ~15 head queries for the cluster.
- Map each synthetic sub-query to a specific spoke, or a specific **passage/table-row** in a hub. Every
  scripture-table row and sub-entity must be its own extractable, linkable node.
- **Where an expansion has no home, that is the next page** — the build unit is a journey × its fan-out,
  not a flat "50 keywords" list (`02` §7).
- The resulting fan-out set becomes the **tracked-prompt constellation** in the measurement spine (`01`
  §11): what we baseline per engine and watch for citation capture.

## 5. Tooling summary (what exists vs what to add)

| Need                   | Tool                                                                      | Status                |
| ---------------------- | ------------------------------------------------------------------------- | --------------------- |
| SERP + People Also Ask | Serper (`SERPER_API_KEY`) + client in `writesonic-marketing/ads/api/`     | Exists, reuse         |
| SERP fallback          | SerpApi (`SERP_API_KEY`)                                                  | Exists                |
| Keyword volume         | Keywords Everywhere (`KE_API_KEY`)                                        | Exists, used in T1    |
| Keyword difficulty     | Ahrefs v3 (`AHREFS_API_KEY`)                                              | Exists, used in T1    |
| Core Web Vitals        | PageSpeed (`PAGESPEED_API_KEY`)                                           | Exists                |
| Reddit questions       | public JSON / Serper `site:reddit.com` / new Reddit app                   | **Add (no key yet)**  |
| YouTube transcripts    | `youtube-transcript-api` / `yt-dlp`                                       | **Add**               |
| Citation verification  | **parallel.ai** (Search API + Deep Research / Task API) + our Workflows   | **Add, awaiting key** |
| Query fan-out          | Qforia or equivalent fan-out simulator                                    | **Add**               |
| AI citation tracking   | Writesonic + Peec MCP (connected)                                         | Exists                |
| Drafting               | Codex `gpt-5.6-sol` via `writesonic-marketing/tools/codex-draft/draft.py` | Exists                |

## 6. Definition of done (per page, research view)

- Every specific/contested claim corroborated across 2+ authoritative sources or attributed to a named one.
- Scripture cited with chapter/verse; contested points shown scripture-by-scripture with a tradition label.
- Questions/headings sourced from real demand (PAA/Reddit), not invented.
- Any video-derived insight rewritten originally and re-verified; nothing paraphrased from a transcript.
- `<Sources>` populated; real byline (Samanyou Garg / Ved Vyas Foundation) + "verified [date]/method/
  sources" stamp + last-updated present. No fabricated reviewer (D15).
- Passes the information-gain test (`01` §5) and the anti-slop mechanical gate.

---

_Serves `01` §6 (factual accuracy) and `01` §7 (demand mining). Tooling confirmed against
`writesonic-marketing` during the T1 demand research (`research/09`)._
