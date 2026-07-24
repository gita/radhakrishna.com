# Writing + Image Systems (extracted from writesonic-marketing) for Radhakrishna.com

Source repo: `/Users/radhakrishna/Documents/writesonic-marketing`. This is a reusable spec: (A) the writing system, (B) the image-generation system, (C) the env/SEO keys available.

---

## A) WRITING SYSTEM — style spec for a writer

Distilled from `knowledge/writing/samanyou-house-style.md`, `samanyou-voice.md`, `ai-red-flags.md`, and the shipped example `newsletter/issue-01/DRAFT.md`. Note: this voice is tuned for a B2B AI founder. For Radhakrishna.com (devotional / spiritual content) keep the _mechanics_ (specificity, rhythm, anti-AI rules, structure) and swap the _subject matter and register_.

### Voice rules (constant across every format)

- **First person, plain, measured. Contractions always.** Short sentences, deliberately varied length. Read aloud; if it sounds like a marketer or an AI, redo it.
- **One clear point per piece.** Two ideas = two pieces. Write the one-line takeaway first; cut anything that doesn't serve it.
- **Grounded in a real, specific thing** — a screenshot, a number, a page, a real moment. Receipts, not theory.
- **Never invent a statistic, number, date, or study.** Source it or omit it. A fabricated stat is the single worst failure. When in doubt, drop the number.
- **Put yourself in the scene.** Tell it as a short story with a small arc. Any specific detail must be real; if you lack it, use a truthful vaguer first-person form.
- **Honest, including the unglamorous.** No polishing every experiment into a win.
- **Name real people/companies/sources with the natural phrase, and link them.**
- **Coin and bold the key idea once**, then reuse it plainly.
- **Point at the world, not just at yourself** — ground in a named external example the reader can point to.

### The 10 founder-voice rules (from `samanyou-voice.md`)

1. Open with the claim, not the setup. Delete "In today's / Recently / I've been thinking about / Excited to share." The first sentence is the whole budget.
2. Specificity is the cheapest credibility — name the platform, the exact number, the exact quote.
3. Vary sentence length deliberately. Short. Then one long sentence that carries a real thought. Short again. Three similar-length sentences in a row = rewrite.
4. Hedge only what you don't know. "I think" before a forecast is fine; before a fact, cut it.
5. Name the concept. Named ideas travel; unnamed ones die in the post.
6. One post, one claim.
7. Show you did the work — a tool, a number, a config, a line item. At least one concrete fact per piece.
8. End on a turn, not a bow. Cut the last sentence of almost every draft. No "In summary / Hope that helps."
9. Use contrast pairs, not adjective piles.
10. Be willing to be wrong in public. If any competitor's CEO could have written it, rewrite it.

### Structure signature (the newsletter's; adapt per format)

1. **Title:** declarative, period-separated statement naming the problem and the promise, in short fragments. ("Your company changed. AI hasn't caught up. How to fix it.")
2. **Italic subtitle:** one line, "What I learned after…" — the specific thing + the payoff.
3. **The lead:** open bold **"The core idea:"** with the thesis in one sentence.
4. **TL;DR bullets** with bold labels (What I found / Why it happens / What moved first / What still lags / What I'm doing next). Signature block for long-form.
5. **The scene:** a concrete first-person moment.
6. **Statement headings** — full declarative sentences, often ending in a period ("Your homepage is one vote."). Never question-answer-trap headers.
7. **Blockquote the actual artifact** — the real prompt/question (`> What is Writesonic?`).
8. **Real images with italic captions.** Screenshots where they exist; generated diagrams only for concepts.
9. **Numbered "order of operations" lists** for process — do not strip them.
10. **Close:** subscribe ask + share ask + a **PS with one genuine question** inviting replies.

Confirmed against `newsletter/issue-01/DRAFT.md`: H1 declarative title → italic standfirst → cover image → italic welcome → **The core idea:** bold lead → `> What is Writesonic?` blockquote → images with italic captions → statement H2s ("Why one AI answer tells you very little", "I call this the inherited answer.", "Your homepage is one vote.") → numbered fix list (1–5) → PS question close.

### AI-tells to avoid (hard bans — mechanically enforced by `social-media/engine/structural_check.py`)

- **No em dashes.** Use a period, semicolon, comma, or parens. (>2–3 per piece is already too many.)
- **No exclamation points.**
- **No "not just X, but Y"** negative parallelism (Wikipedia's most-flagged AI tell).
- **No question-answer-trap headers** ("What does this mean? It means…"). Just answer.
- **No buzzwords:** unlock, supercharge, revolutionize, leverage, landscape, tapestry, seamless, robust, cutting-edge, game-changing, transform, elevate, empower, harness, delve, realm, paradigm, synergy, etc. (clustering is the tell, not any single word).
- **No triplet adjective stacks** ("innovative, cutting-edge, transformative").
- **No prophecy/aphorism close, quotable-zinger closer, or manufactured antithesis** ("the ones who X, the ones who don't Y").
- **Straight apostrophes/quotes, never curly.**
- **No filler:** "at its core / the truth is / here's the thing / it's important to note / first and foremost / at the end of the day / make no mistake."
- **No present-participle "significance" trailing clauses** ("…highlighting the growing importance of…").
- **No vague attribution** ("studies show / experts agree" without naming the study).
- **No transition-crutch openers** (However, Moreover, Furthermore, Additionally) stacked at paragraph starts.
- **No "Bold keyword:" + explanation** in consecutive bullets.
- **No hashtag trains, no emoji section-headers, no broetry** (one sentence per line for ten lines).

### Formatting rules (readability / structured for LLMs)

- **Vary paragraph length** — mix one-sentence paragraphs with denser blocks; never uniform 3–4-sentence bricks.
- **No text blobs.** Scannable H2/H3, statement headings, short paragraphs, whitespace.
- **Blog gets more scaffolding** (clear H1, scannable H2/H3, problem-stating intro, internal links, a takeaway) but keeps statement headings and receipts.
- **Structure for LLM retrieval:** declarative headings that answer a question, blockquoted canonical questions, real named entities, numbered process lists — this is what gets cited.
- Numeric length targets by surface (from `samanyou-voice.md`): LinkedIn ~15 wpm sentence / 100–300 words; X <280 chars/tweet; email 3–5 sentences. Rhythm matters more than the average.

### Format nuances (same voice, different shell)

- **Newsletter (long-form):** full structure above.
- **Blog:** same voice + blog scaffolding.
- **LinkedIn:** pick a SHAPE — (a) personal narrative, (b) thesis + numbered framework (the saveable one), (c) news reaction. Line one is a strong opinionated hook; short lines + whitespace; close with one genuine question.
- **X / thread:** one beat per tweet; thread = arc compressed to 6–8 tweets, link last.
- **Comments/replies:** rawer, lowercase OK; positive first, then the contrarian angle, always a unique POV.

### Drafting tool + pipeline (the codex path)

- **Draft tool:** `tools/codex-draft/draft.py` — wraps `codex exec` (OpenAI Codex CLI on the ChatGPT sub) non-interactively. Default model **`gpt-5.6-sol`**, reasoning effort **`xhigh`**, read-only sandbox so it can ground on repo files but not modify. Usage: `draft.py "prompt"`, `draft.py -f prompt.md`, `draft.py -C <dir> "..."`, `-o out.md`, `-m MODEL`, `-e EFFORT`.
- **Mechanical gate:** `social-media/engine/structural_check.py` (enforces the hard bans above).
- **Note on the subjective chain:** house-style says the `stop-slop → humanizer → voice-critic` chain is deliberately NOT used in the social pipeline — "it homogenizes and lowers quality." (`samanyou-voice.md` still lists it as an optional validation chain for founder-voice pieces.) For Radhakrishna.com: keep the mechanical `structural_check`-style gate; treat the humanizer chain as optional.

---

## B) IMAGE-GENERATION SYSTEM — exactly how the brand images are made

**Answer: it is a raw OpenAI `gpt-image-2` call, not a Claude skill doing the art itself.** A thin skill/engine wraps a CLI shim that calls the official OpenAI Images API. There are two production entry points, both calling the same underlying script.

### The underlying CLI (the actual model call)

- Script: `~/.claude/skills/gpt-image-2/skills/gpt-image/scripts/generate.py` → a PEP-723 shim that delegates to `~/.claude/skills/gpt-image-2/src/gpt_image_cli/cli.py`.
- Calls the official OpenAI Python SDK: `client.images.generate(...)` for text→image, and `client.images.edit(...)` when any `-i` reference image is passed (multi-reference edits supported; `-m` for an alpha mask).
- **Model:** `gpt-image-2` (default). **Quality:** `auto|low|medium|high` (default `high`). **Moderation:** default `low`. **Size aliases:** `landscape`=1536x1024, `portrait`=1024x1536, `square`=1024x1024, `2k`=2048x2048, `4k`=3840x2160 (default 1024x1024). Also `--background`, `--format png|jpeg|webp`, `--compression`, `-n`.
- Invoked as `uv run <generate.py> -p "<prompt>" [-i ref.png ...] -f out.png --model gpt-image-2 --size landscape --quality medium|high -n N`. Reads `OPENAI_API_KEY` from env.

### Entry point 1 — Newsletter covers: `newsletter/covers/cover_engine.py`

The most reusable brand-image system. One fixed brand system + a library of contextual FORMATS conditioned on real reference covers (Kyle Poyar / MKT1 / playful, in `kyle-refs/`, `mkt-refs/`, `mix-refs/`). Driven by the `newsletter-cover` skill.

**The fixed BRAND block (verbatim, prepended to every prompt):**

```
BRAND SYSTEM (obey exactly):
- Palette is mostly BLACK, WHITE and warm off-white (#FBFAF7) or dark charcoal (#1C1B19).
- Brand orange is #FF6719, used VERY SPARINGLY as a single accent (a footer bar, a few small
  dots, one arrow, one highlighted word). Orange must never dominate.
- Personality comes from a NEAT, CLEAN, HIGHLY LEGIBLE hand-marker font (upright, rounded, tidy
  like a careful Sharpie) — never scrawly, never formal cursive. Body/labels may be a clean sans.
- Premium, confident, uncluttered, generous negative space. No stock-photo people. No extra logos.
```

**The FOOTER block (verbatim; omitted with `--nofooter`):**

```
At the very bottom: a thin solid BLACK (#1C1B19) footer bar — NOT orange. Inside it, left-to-right:
small white UPPERCASE bold sans "RUNNING MARKETING WITH AI", a small white middle dot, then
"with Samanyou Garg" in the NEAT HAND-MARKER font, white ... a modest signature ... The footer must
stay quiet and never pull focus from the main art.
```

**Prompt assembly** (`build_prompt`): `Create a {newsletter cover image | in-body illustration (NO footer)}, landscape 4:3.` + BRAND + the chosen format body (with exact text interpolated from a `data/*.json`) + FOOTER + `Render all text spelled exactly as given. No photos of people, no extra logos, no clutter.`

**The FORMAT library** (routed by topic shape; each carries its own style refs + required data fields):

- `oldnew` — two-column before/after comparison card, white/black split by a torn zigzag divider. The workhorse.
- `answercard` — a realistic AI chat "answer card" with a struck-through old answer + bold new answer. Product-native.
- `collage` — photoreal hand-made sticky-note / torn-paper collage on warm off-white. Tactile, human.
- `receipt` — a printed monospace paper receipt with rows, dashed total, barcode. Literally "with receipts."
- `dataviz` — dark charcoal bg, one clean horizontal bar chart (first bar orange). **Only with REAL numbers.**
- `magazine` — refined print-editorial cover, large elegant black serif, italic standfirst, one thin orange rule.
- `whiteboard` — neat hand-drawn marker diagram, boxes + one orange arrow.
- `video` — video-player mockup with a big orange round play button.
- `flowchart` / `hub` / `cards` — crisp DESIGNED (not hand-drawn) Kyle-Poyar-style infographics: left-to-right card flow, central-node hub, or a titled card grid. High info-density.
- `uiscreenshot` — faithful branded recreation of a real product UI.

Run: `python3 cover_engine.py --list`, then `--format <id> --data data/x.json --out out.png --quality high -n 2`.

### Entry point 2 — Social concept images: `social-media/engine/build_images.py`

Per-post image builder. Three `image_note` types set by the drafter: `screenshot` (headless-Chrome shot of a public page; SPA/anti-bot domains are handed to a human), `concept` (branded gpt-image), `ask_sam` (human capture). The `concept()` function reuses a compact version of the same BRAND block (warm off-white #FBFAF7 / charcoal #1C1B19, orange #FF6719 as a single restrained accent, hand-marker font, generous negative space, no stock people, no logos), calls `gpt-image-2 --size landscape --quality medium`, and always runs footer-OFF for social.

### The reusable "brand image" formula (portable to any brand)

1. **A fixed BRAND SYSTEM paragraph** prepended to every prompt: locked palette (a warm neutral ground + a dark ground + ONE sparingly-used accent color by hex), a named font personality, "premium, uncluttered, generous negative space, no stock people, no extra logos."
2. **A signed FOOTER block** (optional, `--nofooter` for in-body/social) that carries the byline quietly.
3. **A library of contextual FORMATS** so images never repeat — route the topic's _shape_ to a format (comparison→oldnew, "what AI says"→answercard, pivot→collage, real numbers→dataviz, essay→magazine, mechanism→flowchart/whiteboard).
4. **Typography-in-image:** always end with "Render all text spelled exactly as given."
5. **Real style references** passed via `-i` (switches to the edits endpoint) to condition the look.
6. **Hard rule:** real proof (screenshots, real dashboards, Wikipedia/Wayback) is never AI-generated; data-viz numbers must be real.

To reuse for Radhakrishna.com: copy `cover_engine.py`, replace the BRAND hex palette + accent + font personality + footer byline with the Radhakrishna brand, keep the FORMAT library and the exact-text discipline.

### Recommendation: which image skill for which job

This session exposes two skills:

- **`gpt-image` skill** = OpenAI `gpt-image-2` (the same engine the marketing repo already uses).
- **`image-generator` skill** = Google Gemini "Nano Banana Pro" (`gemini-3-pro-image-preview`).

Recommendation:

- **(a) Branded graphic images** (covers, framework/diagram/infographic cards, receipts, answer-cards, typography-in-image, exact spelling, reference-conditioned brand consistency): use **`gpt-image` (gpt-image-2)**. It is what the existing `cover_engine.py` FORMAT library is built and tuned for; reuse the engine as-is. gpt-image-2 is the stronger choice when precise in-image text and repeatable layout matter.
- **(b) Realistic / artistic Radhakrishna images** (photoreal or painterly devotional scenes, deities, temples, natural lighting, fine detail, editing real reference photos): use **`image-generator` (Gemini Nano Banana Pro)**. It is generally stronger at photoreal/artistic rendering, world knowledge, and faithful reference-image editing — better suited to devotional art than to logo-locked brand graphics.

---

## C) ENV KEYS available (names only) — SEO/marketing tooling we can call

From `/Users/radhakrishna/Documents/writesonic-marketing/.env` (values never read). Grouped by usefulness for Radhakrishna.com content/SEO:

**Search / SERP / SEO research**

- `SERPER_API_KEY` — Serper.dev (Google SERP scraping / search results).
- `SERP_API_KEY` — SerpApi (SERP data, alt provider).
- `AHREFS_API_KEY` — Ahrefs (backlinks, keywords, rank, site metrics).
- `SPYFU_API_KEY` — SpyFu (competitor PPC/SEO keywords).
- `KE_API_KEY` — Keywords Everywhere / keyword volume (KE = keyword research).
- `PAGESPEED_API_KEY` — Google PageSpeed Insights (Core Web Vitals / perf).
- `PLAUSIBLE_API_KEY` — Plausible analytics (site traffic).

**Image / LLM generation**

- `OPENAI_API_KEY` — OpenAI (gpt-image-2 image generation + Codex drafting). **The key both image entry points read.**
- `GEMINI_API_KEY` — Google Gemini (Nano Banana Pro image-generator skill, text).

**Google platform / ads / analytics**

- `GOOGLE_APPLICATION_CREDENTIALS` — GCP service-account path (BigQuery/Search Console/etc.).
- `GOOGLE_ADS_*` (DEVELOPER_TOKEN, CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN, CUSTOMER_ID) — Google Ads API.
- `GTM_ACCESS_TOKEN` / `GTM_REFRESH_TOKEN` / `GTM_TOKEN_EXPIRES_AT` — Google Tag Manager.

**Social / ads platforms (mostly not needed for Radhakrishna, listed for completeness)**

- `LINKEDIN_*` (CLIENT_ID/SECRET, ADS_ACCOUNT_ID, ACCESS/REFRESH_TOKEN) — LinkedIn + LinkedIn Ads.
- `META_*` (PIXEL_ID, AD_ACCOUNT_ID, BUSINESS_ID, ACCESS_TOKEN, ADMIN_ACCESS_TOKEN) — Meta/Facebook.
- `OPENAI_ADS_*` (API_KEY, CONVERSIONS_API_KEY, PIXEL_ID) — OpenAI Ads.

**CRM / analytics / lifecycle**

- `HUBSPOT_ACCESS_TOKEN`, `APOLLO_API_KEY`, `MIXPANEL_PROJECT_ID/SA_USER/SA_SECRET`, `CLARITY_TOKEN`, `G2_API_TOKEN`.

**Email / messaging / support**

- `BREVO_API_KEY`, `POSTMARK_API_KEY`, `LOOPS_API_KEY` (email); `INTERCOM_*`, `HELPSCOUT_*`, `PYLON_API_KEY` (support); `SLACK_*` (bot/app/social/webhook tokens).

**Product / infra / billing (Writesonic-specific, not for Radhakrishna)**

- `NOTION_API_KEY`, `LINEAR_API_KEY`, `MINTLIFY_ADMIN_KEY`, `WRITESONIC_DEMO_API_KEY`, `HUBSTAFF_TOKEN`, `APIFY_TOKEN`.
- Billing/revenue: `CHARGEBEE_API_KEY`, `STRIPE_MCP_API_KEY`, `PAYPAL_*`, `CHARTMOGUL_API_KEY`, `CHURNKEY_*`, `FIRSTPROMOTER_*`.
- `PROD_DB_*` (read-only replica + jump host creds — internal Writesonic DB, do not use).

**Most relevant to Radhakrishna.com SEO/content:** SERPER, SERP_API (SerpApi), AHREFS, SPYFU, KE (Keywords Everywhere), PAGESPEED, PLAUSIBLE, plus OPENAI + GEMINI for generation, and Google service-account for Search Console/BigQuery.
