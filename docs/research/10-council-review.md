# 10 — Council Review (Consolidated Verdict)

Six-expert SEO/GEO council review of the Radhakrishna.com strategy (`01`–`05` + `DECISIONS.md`),
consolidated into one actionable verdict. Panel: Lily Ray (E-E-A-T + update-risk), Ryan Law (Ahrefs,
off-page/three-E's), Mike King (relevance engineering, fan-out, entity), Aleyda Solis (AI-search
checklist + measurement), Tim Soulo (business potential), Kevin Indig (measurement + decoupling).

---

## 1. Council verdict

**The strategy is sound and unusually well-calibrated on-page — ship it, but not as written.** All six
experts independently rate this among the better content plans they've reviewed: it correctly demotes the
fake levers (schema, llms.txt, FAQ rich results), it has a real information-gain gate, and the
sampradaya-transparency framework is a genuinely defensible, citable idea. **Confidence is high on the
diagnosis and the on-page craft, and low on execution of the two things that actually decide the outcome:
(a) off-site entity establishment for a brand-new domain, and (b) a real human authority + citation-
verification layer.** The plan is ~80% on-page tactics for a problem that, for a zero-authority domain, is
~80% off-page and entity-establishment. Fix the sequence, the measurement spine, the reviewer layer, and
the business goal, and this is defensible. Ship it as-is and it will be beautifully extractable and
largely uncited.

## 2. Consensus (the strongest signals — where multiple experts independently converged)

**Praise (near-unanimous — do not touch these):**

- **They didn't drink the GEO Kool-Aid.** All six independently praise `01` §6 / D7 for demoting schema
  to plumbing (Ahrefs 1,885-page null result), killing llms.txt, and dropping FAQ rich-result dependence.
- **The sampradaya-transparency framework (`01` §7) is the single best idea in the deck** — named by all
  six as the one structurally uncopyable, information-gain-by-construction, citable asset.
- **The information-gain gate (`01` §5) is the right durable bet** — five of six single it out as the
  commodity-vs-non-commodity test that survives core updates.
- **Answer-first 40–75 word blocks + tables + semantic HTML encoded in templates** (King, Indig, Solis).
- **hreflang spec is actually correct** — self-referencing, per-locale canonical, x-default→en (Ray, Law,
  King, Soulo all note most sites botch this; the _spec_ is right, the _partial rollout_ is the risk).

**Flags (raised independently by 3+ experts — the real work):**

- **Off-site / entity establishment is deferred to "Phase 6, ongoing" and this is the #1 error** (all six).
  For a brand-new `.com` (moved `.net`→`.com` 2026-07-23) with zero training-data prevalence, corroboration
  across the web is the binding constraint on citations, not answer-block formatting. Law: YouTube mentions
  ~0.737 correlation with AI visibility (strongest predictor); content length ~0.04.
- **No business model / conversion goal / business-potential score** (Soulo, Indig, Ray, Solis). Every
  metric in `01` §10 is vanity (sessions, impressions, saves). Nothing names what the traffic is _for_.
- **The reviewer/author E-E-A-T layer is a placeholder and must be real, credentialed, entity-resolved,
  and non-optional** (Ray, King, Indig, Soulo). A marketing-founder byline on the Bhagavata Purana is the
  weak point; `reviewedBy` is currently `optional`.
- **Measurement is a single blended vanity dashboard** (Ray, Law, King, Solis, Indig). Needs per-engine
  splits (91% of cited URLs appear in only one engine), branded-vs-non-branded, and input metrics
  (AI-bot crawl logs, passage relevance).
- **Query fan-out is absent** (King, Law, Solis, Indig). The plan is a keyword-cluster map; AI Mode
  decomposes head queries into a hidden constellation the plan never mapped.
- **"We cite scripture" is Effort, and Effort alone is copyable** (Law, King, Ray). Needs an Experience/
  Experimentation moat tier, not uniform template effort.
- **Image engine / wallpapers in P0 is low-moat, near-zero-citation vanity volume** (Soulo, Solis, Indig).
- **Bilingual EN+HI from day one doubles the surface before the model is proven** (Ray, Law, Soulo, Indig,
  Solis) — stage Hindi behind proven English winners.

---

## 3. Prioritized change list

Merged across experts, ordered by priority. P0 = must-fix before building; P1 = should-fix; P2 =
nice-to-have.

### P0 — must-fix before building

**P0-1. Pull off-site + entity establishment into Phase 1 as a first-class fourth engine.**

- **Edits:** `05` (new Phase-1 workstream, remove from Phase 6 as the _start_ point); `01` §3 (add a
  fourth engine), §8 (promote from footnote to funded track).
- **Raised by:** all six (Law, Solis, King top-intervention; Ray, Soulo, Indig).
- **Concrete edit:** Create/claim the Wikidata item + Organization entity + consistent `sameAs` wiring on
  day one (it _is_ the work, not "if available"). Seed a YouTube channel from the P0 stories/festivals in
  Phase 1–2, not Phase 3. Add a co-occurrence / earned-mention motion (temple + community + scholar
  references; genuine r/hinduism, r/vaishnavism, Quora participation). Use the sibling network
  (bhagavadgita.com, vedvyas.com) to describe and link the entity consistently. KPI: "get radhakrishna.com
  mentioned as a source about Radha Krishna" ranks equal to organic sessions.

**P0-2. Make the doctrinal reviewer a real, credentialed, entity-resolvable authority — non-optional.**

- **Edits:** `01` §7; `02` §5 frontmatter (change `reviewedBy: pandit-... # optional` to required on every
  doctrinal page); `05` Phase 2 done-criteria (gating dependency).
- **Raised by:** Ray (top-intervention), King, Indig, Soulo.
- **Concrete edit:** Named Vaishnava scholar/pandit with a real author page, credentials, and `Person`
  schema `sameAs` resolving to a genuine external entity (institution, published work, verifiable profile).
  Make the _reviewer_, not the writer, the credibility anchor. No doctrinal page ships without a real
  subject-matter reviewer. King's caveat: an invented/unverifiable reviewer is fabricated authority — a
  trust risk AND useless for entity resolution; use only real, resolvable people or drop the line.

**P0-3. Build a mechanical citation-verification gate — an unverified chapter:verse gets cut, not shipped.**

- **Edits:** `03` §10 (Codex pipeline — add a citation gate alongside the anti-slop gate); `01` §5/§7.
- **Raised by:** Ray (top-intervention), Soulo.
- **Concrete edit:** Treat every scripture citation as YMYL. Codex-drafted chapter:verse references are the
  slop-loop exposure (LLMs hallucinate plausible `Brahma Vaivarta 4.x`). Every citation is checked against
  a named primary-source edition/translation before ship; the edition is cited; unverified references are
  cut before a wrong one ships. Log corrections publicly. Cap publishing velocity to actual review capacity
  (pages/week = what one editor can genuinely verify), with a documented kill/merge log — a gate nobody can
  fail is not a gate.

**P0-4. Define the business model and conversion goal; rebuild the metrics into layers.**

- **Edits:** `01` §3 and §10 (replace the flat vanity bucket); resolve `DECISIONS.md` T1/D13 before Phase 2.
- **Raised by:** Soulo (top-intervention), Indig (top-intervention), Ray (gap), Solis (gap).
- **Concrete edit:** Name the single downstream conversion (best guess: PWA/email subscribers + network
  app installs + Ask-Krishna/Gita GPT sessions) and make it a first-class tracked metric so pages can be
  scored by business potential. Restructure `01` §10 into three layers: **Presence** (per-engine citation
  presence, prompt coverage), **Readiness** (score templates against the readiness characteristics), and
  **Impact** (returning visitors, subscribers, network cross-visits). Set up an AI-assistant analytics
  channel group. Re-rank the build order by which pages feed the conversion.

**P0-5. Fix the measurement spine: per-engine, branded-vs-non-branded, input metrics — before Phase 2.**

- **Edits:** `01` §10; `05` (stand up baseline before Phase 2 ships).
- **Raised by:** Ray, Law, King, Solis, Indig.
- **Concrete edit:** Using the already-connected Writesonic + Peec: (a) baseline who is cited today for the
  top ~30 target prompts across ChatGPT / Perplexity / AI Overviews / Gemini / Claude, tracked **per
  engine, not blended** (91% of cited URLs appear in only one engine); (b) split GSC into branded vs
  non-branded and make branded-query growth a headline KPI (Ray's Amsive CTR data: AIO cut non-branded CTR
  ~20%, but branded-with-AIO gained +18.7% — a new brand inherits the loss half with none of the upside,
  so instrument the impressions-up/clicks-flat phase deliberately); (c) add AI-bot crawl-log analysis
  (GPTBot/PerplexityBot/ClaudeBot/Google-Extended are _allowed_ in robots but never verified as _fetching_).

**P0-6. Run query fan-out on every P0/P1 target and convert the keyword map into a fan-out coverage map.**

- **Edits:** `02` §2 and §7; `07` §2 (reframe the build unit from "50 keywords" to "N journeys × fan-out").
- **Raised by:** King (top-intervention), Law, Solis, Indig.
- **Concrete edit:** Run a fan-out simulator (Qforia or equivalent) on the top ~15 head queries; map each
  synthetic sub-query to a specific spoke or a specific passage in a hub. Where an expansion has no home,
  that's the next page. The spoke model is already fan-out-shaped, so this is mostly verification. Make
  every scripture-table row and sub-entity its own extractable, linkable node.

**P0-7. Make hreflang partial-rollout a build-time invariant (no dangling alternates).**

- **Edits:** `02` §3.1; `03` §9 (add CI validation); add explicit "no IP/Accept-Language auto-redirect" rule.
- **Raised by:** Solis, King (Ray notes the routing itself is correct — the risk is the partial rollout).
- **Concrete edit:** Generate hreflang alternates ONLY from the set intersection of locale files that
  actually exist; emit the reciprocal tag for both members of every existing pair; validate reciprocity in
  CI so a missing Hindi file cannot ship a dangling en→hi alternate. Wire alternate generation to the same
  "file exists" condition the content model already uses. Add the standing rule: subpath + manual switcher
  only, no auto-redirect between locales.

### P1 — should-fix

**P1-1. Stage Hindi behind proven English winners (respect D10, sequence it).**

- **Edits:** `02` §3.1; `05`; `DECISIONS.md` D10 (add sequencing note); enforce the reviewer gate on Hindi.
- **Raised by:** Ray, Law, Soulo, Indig, Solis.
- **Concrete edit:** Ship the ~8 English pages that drive 80% of results to real depth first, prove they
  get cited, then translate those specific winners into Hindi with genuine native-speaker theological
  review — not the long tail via raw Codex. Hindi doctrinal pages pass the _same_ reviewer gate as English
  (native Devanagari + transliteration accuracy), never a lighter one. Founder owns D10; this stages it
  without breaking the architecture (files trail per-locale already).

**P1-2. Introduce a moat tier — tag every page "moat" or "coverage"; concentrate Experience/Experimentation.**

- **Edits:** `02` §4 and §7; `05` (effort allocation, not uniform template pass).
- **Raised by:** Law (top-intervention), King, Ray.
- **Concrete edit:** The 5–8 outliers (why they didn't marry, how Radha died, the love story, Radhashtami,
  Banke Bihari, the HD gallery, sampradaya synthesis) get disproportionate firsthand value — a real Braj
  visit, original photography, a pandit interview, personally-verified temple timings, the scripture table
  done exhaustively. Every "moat" page must carry at least one E of **Experience or Experimentation**, not
  Effort alone, as a ship condition. The long tail gets the lean template. Don't buff 50 pages to the same
  medium sheen — "add original value" must not degrade to "add a citation."

**P1-3. Demote wallpapers/DP/status galleries out of P0.**

- **Edits:** `02` §7 (remove HD-images + quotes from P0 build-first except where they double a sourced
  page); `01` §3 (frame image engine as reach/brand, not citation moat).
- **Raised by:** Soulo, Solis, Indig (Ray flags AI-art-as-moat separately).
- **Concrete edit:** Keep the image engine as a reach/brand play feeding the daily-habit retention loop.
  Front-load only the "kill the story query and the image query with one page" version. Hold galleries to
  the same info-gain bar (original art + real context + full metadata, never a bare grid); monitor whether
  the thinnest download pages drag site-level quality and be willing to prune/isolate them. Reallocate the
  freed P0 capacity to sourced Q&A + off-site.

**P1-4. Turn the sampradaya synthesis into a named, canonical, structured, distributed data asset.**

- **Edits:** `01` §5.1/§5.4; new reference-style landing page; off-site distribution track.
- **Raised by:** Indig (top-intervention), Law (proprietary-data gap), Kevin/Ryan overlap.
- **Concrete edit:** Build the scripture-by-scripture / sampradaya comparison as ONE canonical, versioned,
  citable, linkable reference dataset — not just a table stamped on each page. Name the framework,
  version it, distribute it (Wikidata/Wikipedia citations where legitimate, outreach). This is the
  primary-source moat; the per-page tables are its surface.

**P1-5. Add a proprietary-data study from the network's own AI properties.**

- **Edits:** `01` §5 (add as a named differentiation pillar); `05` (recurring cadence).
- **Raised by:** Law (gap + top-intervention), Indig (gap), Soulo (honest-acknowledgment gap).
- **Concrete edit:** A "What the world asks Krishna" data piece from Gita GPT / Ask Krishna / the apps
  (aggregated, anonymised) is the one true Experimentation moat — simultaneously off-page link magnet,
  entity-authority builder, and differentiator. Elevate from deferred CTA (D13/T1) to a quarterly/annual
  named pillar. Soulo's caveat: be honest you have no _other_ data moat — don't chase research you can't feed.

**P1-6. Specify the temple-timings verification mechanism, or de-scope hard timings.**

- **Edits:** `02` §4 (TemplePage — add verification field); `01` §2; assign a maintenance owner.
- **Raised by:** Law, Indig.
- **Concrete edit:** You beat the taxi blogs on _accurate_ timings, then commit to publishing timings that
  go stale — a self-inflicted trust liability. Either a quarterly verification cadence with a visible
  "timings verified [date] by [author], sourced from [temple office]" per temple (that visible firsthand
  check IS the Experience moat), or defer hard timings to official sources. Do not ship a table you can't
  maintain.

**P1-7. Lead answer-first blocks with the dominant answer stated crisply; put nuance below.**

- **Edits:** `01` §5–6; `02` §4 (QuestionPage).
- **Raised by:** King.
- **Concrete edit:** "Nuance without dodging" is editorially right but retrieval-risky if the hedge lands
  in the extractable 40–75 words ("some say X, others say Y" dilutes the embedding and loses to Wikipedia's
  crisp line). Lead with the most-attested answer stated crisply, THEN nuance it in the scripture table
  below. Truthful _and_ quotable.

**P1-8. Sequence citation capture to lead with synthesis/nuance pages, not head-entity pillars.**

- **Edits:** `02` §7; `05` Phase 2.
- **Raised by:** King, Soulo.
- **Concrete edit:** Keep the pillars ("Who is Radha", "love story") for organic traffic + internal-link
  anchoring, but they're the _least_ winnable citations for years (Wikipedia/Britannica/ISKCON out-
  authority a new site on head-entity definitions). Sequence citation capture to lead with the
  differentiated synthesis (scripture-by-scripture marriage/death/husband tables, Radha-vs-Rukmini,
  sampradaya comparisons) where no authority currently exists.

**P1-9. Promote YouTube to a core engine with its own cadence and metric.**

- **Edits:** `01` §8; `05` (parallel from Phase 2, not a Phase-3 seasonal seed).
- **Raised by:** Indig, Law, Ray.
- **Concrete edit:** YouTube is the single most-cited domain in AI search AND serves the audio/video intent
  you concede you can't win on-page. Darshan, aarti, story explainers — running in parallel from Phase 2.

### P2 — nice-to-have

**P2-1. Add a home for romanized-Hindi / Hinglish demand.**

- **Edits:** `02` §3.1 (decide: transliteration-as-first-class inside EN pages vs a third handled mode).
- **Raised by:** Solis, Indig. Validate the romanized-vs-Devanagari query split before committing.

**P2-2. Prioritize accurate Wikidata/Wikipedia entity presence for site + authors.** (Ray, Law — cheap,
high-leverage RAG-corroboration input; overlaps P0-1 but call it out explicitly.)

**P2-3. Publish a visible corrections / contested-claim policy.** (Ray gap — the sampradaya vocabulary
already exists; formalize it into a visible editorial policy; itself an E-E-A-T signal.)

**P2-4. Add a passage-cosine relevance gate to the Codex pipeline before human review.** (King gap — chunk
the draft, score each answer-first block against the page's fan-out queries, flag low scorers for rewrite.)

**P2-5. Confirm the festival "this-year date" island is server-rendered into the HTML, not a client fetch.**
(Solis — validate with a JS-disabled fetch; make it a Phase-1 done-criterion. `03` §1 / `02` FestivalPage.)

**P2-6. Label AI-art `dateModified` percentages and Princeton lifts as external benchmarks, not forecasts.**
(Solis, Soulo, Ray — keep the tactics, stop reporting +27.8%/+25.9%/+24.9%/4.2x/3.2x as promises; validate
against your own prompt set once you have a baseline.)

**P2-7. Keep network cross-linking contextual/editorial; avoid heavy sitewide boilerplate over-linking.**
(King — a monetized-network footer link pattern is exactly the site-reputation profile 2026 scrutiny
targets; each property should stand independently authoritative.)

---

## 4. Notable dissents / conflicts (and my ruling)

**On-page vs off-page emphasis.** Law and Solis argue the program is ~80% on-page for a problem that is
~80% off-page. King and Ray agree the entity is the binding constraint. Ryan is careful not to overrule the
on-page discipline ("it's cheap and correct"). **Ruling: both.** The on-page craft is already excellent and
cheap to keep — do not abandon it. But the _strategic weight and Phase-1 funding_ shifts to off-site +
entity (P0-1, P0-5). State explicitly: for the first 6–12 months the citation constraint is entity
corroboration, not answer-block formatting.

**Volume/uniform-template vs moat concentration.** Law wants a power-law split (5–8 moat pages get
disproportionate firsthand effort); the plan allocates effort uniformly through one template. **Ruling: Law
wins** — adopt the moat/coverage tier (P1-2). Uniform buffing is the templated-volume pattern the plan
elsewhere correctly fears.

**Image engine.** The plan (and any visual/brand voice on the council) treats original art as an uncopyable
moat and puts galleries in P0. Soulo, Solis, Indig, and Ray all say AI art is now a _decaying_ moat
competitors can reproduce with the same tools, and wallpapers are near-zero citation value. **Ruling:
demote from P0 (P1-3); reframe art as reach/brand hygiene, not the moat.** The moat is the sourced synthesis

- entity layer. Art wins the _image channel_; it contributes ~nothing to _text_ citations — budget and
  measure them as two separate games.

**Bilingual day-one (D10).** Founder decision; five experts advise staging Hindi behind proven English
winners. **Ruling: respect the founder's D10 but sequence it (P1-1)** — architecture already supports
per-locale trailing at zero structural cost, and the Hindi reviewer gate is non-negotiable. This is a risk
to weigh, not an overrule.

**Nuance vs crisp extraction.** The plan's "nuance without dodging" vs King's "lead crisp, nuance below."
**Ruling: reconcile via P1-7** — crisp dominant answer in the extractable block, nuance in the table
beneath. No real conflict once separated by location on the page.

**GEO stats as law vs directional.** The plan bakes Princeton/vendor percentages into templates as
constants; Soulo, Solis, Ray say they're directional single-corpus findings that may not transfer to a
Sanskrit/Hindi devotional niche. **Ruling: keep the tactics (they're right directionally), relabel the
numbers as external benchmarks (P2-6), and validate against your own baseline.**

---

## 5. What NOT to change (do not over-correct)

- **Do not expand the schema graph or resurrect llms.txt/FAQ rich results.** Hold D7. Ship clean schema +
  green vitals as _hygiene_, then spend the marginal hour on off-page and firsthand content. Schema had
  zero citation uplift; a richer `@graph` is not a moat. (Law, Indig, King explicit.)
- **Do not weaken or drop the information-gain gate or the sampradaya-transparency framework.** These are
  the two things all six praised — the durable, uncopyable core. Enforce them harder, don't dilute them.
- **Do not treat the answer-first / hreflang / semantic-HTML discipline as the problem.** The hreflang
  _spec_ is correct (four experts noted most sites get it wrong); only the partial-rollout needs the CI
  guard (P0-7). The on-page extraction discipline is cheap and correct — keep it.
- **Do not chase "gita gpt."** Branded to incumbents, low upside (per T1 research) — the plan already
  avoids it; keep avoiding it.
- **Do not let comparison/versus pages become a fill-the-grid factory.** Today they're genuinely editorial
  and LOW risk (Ray); the danger is drift into a templated versus-factory. Keep each one reader-motivated.
- **Do not over-invest in AI art as the moat or mass-generate religious imagery** as a scaled-content
  signal. Always label AI images as artwork; mix in real temple photography. (Ray, Indig.)
- **Do not panic at the impressions-up/clicks-flat phase.** For a zero-branded-search new site it is the
  _expected_ AIO trade, not failure — instrument it (P0-5) rather than reacting to it. (Ray, Indig.)

## 6. New workstreams the council surfaced (not yet in the roadmap)

These have no home in `05` today and need to be added as named tracks:

1. **Off-site / entity-establishment engine (Phase 1 onward).** Wikidata item + Organization entity +
   `sameAs`, YouTube channel, digital-PR / co-occurrence motion (temples, scholars, ISKCON chapters,
   Vaishnava publishers, forum participation), sibling-network consistent linking. The single biggest
   addition. (P0-1)
2. **Measurement / instrumentation setup (pre-Phase-2).** Per-engine citation baseline, branded-vs-non-
   branded GSC split, AI-bot crawl-log analysis, tracked-prompt constellation = the fan-out set,
   competitor share-of-voice baseline, AI-assistant analytics channel group. Using tooling already paid
   for (Writesonic + Peec). (P0-5)
3. **Business-model / conversion definition (Phase 0–1).** Name the downstream conversion, resolve
   T1/D13, re-rank the build order by business potential, three-layer metrics. (P0-4)
4. **Human authority + citation-verification layer (gates the whole authority thesis).** Real credentialed
   reviewer as a hiring/sourcing dependency; mechanical citation gate; public corrections log; velocity
   capped to review capacity. (P0-2, P0-3)
5. **Query fan-out planning track (pre-build).** Turn the keyword map into a fan-out coverage map. (P0-6)
6. **Original-data / proprietary-research pillar (recurring).** "What the world asks Krishna" study from
   the network's AI properties — off-page lever + entity builder + differentiator in one. (P1-5)
7. **Named canonical sampradaya dataset + distribution.** Version and distribute the synthesis as a citable
   reference asset, not page chrome. (P1-4)
8. **hreflang / i18n QA track.** CI reciprocity validation, no-auto-redirect rule, romanized-Hindi
   decision, JS-disabled server-render checks on dynamic date islands. (P0-7, P2-1, P2-5)

---

_Consolidated from the six structured expert critiques. This doc drives the next edit pass on `01`–`05`
and `DECISIONS.md`. P0 items are gating: they change sequence and staffing, not just copy._
