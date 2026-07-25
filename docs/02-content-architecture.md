# 02 — Content Architecture

How the site is organised: the hub-and-spoke cluster model, the URL map, the page-type templates, the MDX
content model, and the prioritised build order. This is the blueprint the build follows.

---

## 1. The model: hub-and-spoke entity clusters

Clustered content earns ~3.2x more AI citations and ~30% more organic traffic than standalone posts (an
external benchmark to validate against our own baseline, not a promise — P2-6). We organise the entire site
as **entity hubs** (a canonical page that defines a major entity) with **spokes** (sub-topic pages) linked
by a strict internal-linking rule set.

**Internal-linking rules (enforced in templates):**

- Every spoke links **up** to its hub.
- Every hub links **down** to all its spokes.
- Spokes link **laterally** to 2-3 related spokes in the same cluster.
- **Cross-cluster bridges** connect intent: a story links to its quote card, its mantra, its festival, its
  temple. This is the move no incumbent makes.
- Anchor text is **descriptive and entity-rich** (the topic name), never "click here".

## 2. The clusters

Cluster 0 (the master hub) plus seven content clusters, each anchored by a hub. **`/radha-krishna/` is the
primary entity of the whole site** (it is literally the domain) — a first-class, top-priority entity hub
with its own cluster of combined-couple spokes, distinct from the two separate deity hubs.

```
0. Radha Krishna (MASTER HUB: /radha-krishna/)  ← the primary entity; top-priority P0 pillar
│   own spokes: who are Radha Krishna (together), their divine love, why worshipped together,
│   what their union symbolizes (Atman-Brahman / soul-God / bhakti), their eternal relationship,
│   combined iconography/forms, Radha Krishna across the sampradayas
│
├── A. Radha            /radha/            who, origin, life, identity, names, death
├── B. Krishna          /krishna/          who, life, forms, Dwarka, teachings
├── C. Their Story      /stories/          love story, Raas Lila, Vrindavan, reunion, viraha
├── D. Questions        /questions/        the high-curiosity Q&A (marriage, death, meaning)
├── E. Devotion         /mantras/ /aartis/ /bhajans/ /stotras/   prayers + audio
├── F. Festivals        /festivals/        Radhashtami, Janmashtami, Holi, Kartik, Raas Purnima
│     └── Ekadashi / vrata sub-cluster  /festivals/ekadashi/  24 Ekadashis + Dvadashi + vrats
├── G. Temples & Braj   /temples/ /places/ Banke Bihari, Prem Mandir, Nidhivan, Vrindavan, Barsana
└── (visual layer)      /images/ /quotes/ /wallpapers/   the image engine, cross-cuts every cluster
└── (daily layer)       /daily-darshan/    the daily-habit engine
```

**Cluster notes:**

- **0. Radha Krishna (master hub)** is the site's primary entity and a top P0 pillar (alongside the love
  story), not merely a connector between the two deity hubs. It carries its own explicit spokes — who are
  Radha Krishna together, their divine love, why they are worshipped together, what their union symbolizes
  (Atman-Brahman / soul-God / the bhakti ideal), their eternal relationship, their combined
  iconography/forms, and Radha Krishna in the sampradayas — and is the strongest internal-link anchor on
  the site (every cluster bridges up to it). `/radha/` and `/krishna/` remain the separate single-deity
  hubs; `/radha-krishna/` is the couple.
- **A. Radha** and **B. Krishna** are the two deity entity hubs. Radha-first is our brand tilt (nobody owns
  the Radha entity well; Krishna is more contested).
- **D. Questions** is where the highest-curiosity, weakest-incumbent traffic lives ("why didn't they
  marry", "how did Radha die", "who is Radha's husband"). Each is answer-first with a scripture table.
- **E. Devotion** splits by prayer type but shares one template (lyrics + transliteration + word-by-word
  meaning + audio + significance).
- **F. Festivals** are seasonal; each has an evergreen hub + a re-dated annual page. **Ekadashi / vrata
  sub-cluster (C1):** an Ekadashi hub at `/festivals/ekadashi/` plus a page per Ekadashi. There are **24
  Ekadashis per year** (2 per lunar month; +2 in an adhika/leap month), each a Vaishnava fasting day with
  its own katha/mahatmya, presiding form, date, and observance, plus **Dvadashi** (the paran / breaking
  day) and related Krishna-relevant vrats (Pradosh, relevant Purnima/Amavasya vrats, Damodar/Kartik vrats).
  This is high recurring evergreen demand (strong monthly search for each Ekadashi date + story). Named
  target inventory (24): Nirjala, Devshayani (Shayani/Ashadhi), Prabodhini (Devutthana/Dev Uthani),
  Vaikuntha, Mokshada (= Gita Jayanti), Papmochani, Kamada, Yogini, Putrada (both — Pausha & Shravana),
  Shattila, Aja, Parama, Utpanna, Saphala, Shatila, Vijaya, Amalaki, Pandava Nirjala, Apara, Padmini
  (adhika), Parama (adhika), Indira, Rama, Pashankusha, Parivartini (Parsva). Ship the hub + top few
  high-demand Ekadashis first, the rest as depth (§7).
- **G. Temples & Braj** covers temples and the pilgrimage geography (Vrindavan, Mathura, Barsana,
  Govardhan, Gokul, Dwarka).
- The **visual layer** and **daily layer** cross-cut every cluster rather than sitting in one.

## 3. URL architecture

Clean, flat, entity-reflecting paths. Canonical origin is `https://radhakrishna.com`.

| Path                                  | Type              | Example                                                                                                                                                  |
| ------------------------------------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`                                   | Home              | —                                                                                                                                                        |
| `/radha-krishna/`                     | Master hub        | the divine couple — the site's primary entity                                                                                                            |
| `/radha-krishna/[slug]/`              | Master-hub spoke  | `/radha-krishna/divine-love/`, `/what-their-union-symbolizes/`, `/why-worshipped-together/`, `/eternal-relationship/`, `/forms/`, `/in-the-sampradayas/` |
| `/radha/`                             | Deity hub         | who is Radha                                                                                                                                             |
| `/krishna/`                           | Deity hub         | who is Krishna                                                                                                                                           |
| `/stories/`                           | Cluster hub       | all stories                                                                                                                                              |
| `/stories/[slug]/`                    | Story page        | `/stories/raas-lila/`                                                                                                                                    |
| `/questions/[slug]/`                  | Question page     | `/questions/why-did-krishna-not-marry-radha/`                                                                                                            |
| `/teachings/[slug]/`                  | Teaching page     | `/teachings/what-radha-krishna-love-symbolizes/`                                                                                                         |
| `/mantras/[slug]/`                    | Mantra page       | `/mantras/hare-krishna-maha-mantra/`                                                                                                                     |
| `/stotras/[slug]/`                    | Stotra page       | `/stotras/radhashtakam/`                                                                                                                                 |
| `/aartis/[slug]/`                     | Aarti page        | `/aartis/radha-aarti/`                                                                                                                                   |
| `/bhajans/[slug]/`                    | Bhajan page       | `/bhajans/[slug]/`                                                                                                                                       |
| `/festivals/[slug]/`                  | Festival page     | `/festivals/radhashtami/`                                                                                                                                |
| `/festivals/ekadashi/`                | Ekadashi hub      | all 24 Ekadashis + Dvadashi/vrats                                                                                                                        |
| `/festivals/ekadashi/[slug]/`         | Vrata page        | `/festivals/ekadashi/nirjala/`, `/devshayani/`, `/prabodhini/`, `/vaikuntha/`, `/mokshada/`                                                              |
| `/temples/[slug]/`                    | Temple page       | `/temples/banke-bihari/`                                                                                                                                 |
| `/places/[slug]/`                     | Place/city page   | `/places/vrindavan/`                                                                                                                                     |
| `/quotes/`, `/quotes/[slug]/`         | Quote gallery/set | `/quotes/radha-krishna-love-quotes/`                                                                                                                     |
| `/wallpapers/`, `/wallpapers/[slug]/` | Wallpaper set     | `/wallpapers/radha-krishna-4k/`                                                                                                                          |
| `/images/[slug]/`                     | Image gallery     | `/images/radha-krishna-hd/`                                                                                                                              |
| `/daily-darshan/`                     | Daily page        | today's darshan                                                                                                                                          |
| `/about/`, `/authors/[slug]/`         | Trust pages       | author entity pages                                                                                                                                      |

**Redirects:** the current site has ~7 posts and ~17 URLs. Map each old slug to its new home with a 301 so
existing equity is preserved. Confirm the `.net -> .com` 301 is a clean single hop. (Tracked in `03`.)

### 3.1 Internationalization (English + Hindi, from day one) — D10

Bilingual at launch. **Subpath locale routing:** English at the root, Hindi under `/hi/`.

- English (default): `/questions/why-did-krishna-not-marry-radha/`
- Hindi: `/hi/questions/why-did-krishna-not-marry-radha/` (same slug; Hindi content).
- **hreflang** alternates on every page (`en`, `hi`, `x-default` -> English), self-referencing, plus the
  reciprocal. Each locale has its own entry in the sitemap.
- **hreflang is a build-time invariant (P0-7).** Generate alternates ONLY from the **set intersection of
  locale files that actually exist**, wired to the same "file exists" condition the content model already
  uses. Emit the **reciprocal** tag for both members of every existing pair, so a missing Hindi file can
  never ship a dangling `en -> hi` alternate. **Validate reciprocity in CI** (`03` §9). Standing rule:
  **subpath + manual switcher only — no IP/Accept-Language auto-redirect** between locales.
- **Canonical is per-locale** (the Hindi page is canonical for itself, not a duplicate of English).
- Slugs stay Latin/English for both locales (stable URLs, easier linking); the visible content, title,
  meta, and OG are translated. Devanagari body via the Noto Serif Devanagari face (`03` §2).
- Locale routing via Next 16 App Router (a `[locale]` or optional-catch-all segment, the bg-frontend
  pattern). Single origin `radhakrishna.com` (`NEXT_PUBLIC_SITE_URL`).
- **Stage Hindi behind proven English winners (P1-1), respecting D10.** Architecture supports per-locale
  trailing at zero structural cost, so we do not overrule D10 — we sequence it. Ship the ~8 English pages
  that drive 80% of results to real depth first, prove they get cited, then translate those specific
  winners into Hindi. Hindi doctrinal pages pass the **same verification gate** as English (D15 pipeline +
  native Devanagari + transliteration accuracy), never a lighter one, and never the long tail via raw
  Codex first. See D10 sequencing note in `DECISIONS.md` and `05`.

## 4. Page-type templates (few templates, many pages)

The core engineering principle, borrowed from writesonic-website: **serve many content pages from few
templates.** One route file + `generateStaticParams` over the content directory pre-renders every page.
Each template is a typed shell; the MDX file supplies the content. Templates:

| Template                                  | Serves                                    | Distinct sections                                                                                                                                                                                                                                                                                             |
| ----------------------------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **QuestionPage**                          | `/questions/*`                            | Answer-first block **leading with the crisp dominant answer** (nuance moves to the table below, P1-7), scripture comparison table, "the short answer", deep dive, related questions, sources                                                                                                                  |
| **StoryPage**                             | `/stories/*`                              | Narrative with statement + question headings, key figures table, scripture sources, image set, related                                                                                                                                                                                                        |
| **DeityHub**                              | `/radha/`, `/krishna/`                    | Definition, quick-facts table, life sections, names, related clusters, gallery                                                                                                                                                                                                                                |
| **PrayerPage**                            | `/mantras/ /aartis/ /stotras/ /bhajans/*` | Answer-first meaning, lyrics (Devanagari + transliteration + word-by-word), audio player, significance, how to chant, source                                                                                                                                                                                  |
| **FestivalPage**                          | `/festivals/*`                            | What/when/why answer-first, this-year date (server-rendered island, P2-5), significance, how to observe, story, where (temple links), image set                                                                                                                                                               |
| **VratPage** _(FestivalPage variant, C1)_ | `/festivals/ekadashi/*` + vrats           | What/when answer-first + this-year date island, the katha/story, significance, how to observe (vrat vidhi: what to eat/avoid, paran timing), benefits, all sourced (Padma / Bhavishya / Skanda Purana mahatmyas). Adds `tithi`, `paran`, presiding-deity fields; reuses FestivalPage where possible           |
| **TemplePage**                            | `/temples/*`                              | Answer-first summary, quick-facts (timings/darshan/aarti/location table) with a visible "timings verified [date] by [author], sourced from [temple office]" stamp + quarterly re-verification (P1-6), or defer hard timings to official sources; history, significance, how to reach, gallery, `Place` schema |
| **PlacePage**                             | `/places/*`                               | City overview, temples list, how to reach, itinerary, festivals there, gallery                                                                                                                                                                                                                                |
| **GalleryPage**                           | `/images/ /wallpapers/ /quotes/*`         | Downloadable grid, per-image metadata, related story/mantra cross-links, `ImageObject` schema                                                                                                                                                                                                                 |
| **ClusterHub**                            | `/stories/`, `/festivals/`, etc           | Intro, curated grid of spokes, featured, cross-cluster links                                                                                                                                                                                                                                                  |
| **DailyDarshan**                          | `/daily-darshan/`                         | Today's image, verse/quote, reflection, mantra audio, tithi/festival, share, archive link                                                                                                                                                                                                                     |

Every template bakes in the non-negotiables from `01` §6: question-led headings, answer-first blocks,
TL;DR, tables, semantic HTML, real author byline + verification stamp (verified date / method / sources,
D15), last-updated date, connected schema, image alt/caption discipline.

**Moat vs coverage tier (P1-2).** Effort is not uniform across the template. Every page is tagged
`tier: moat | coverage` in frontmatter (§5). The 5-8 **moat** pages (the master hub, the love story, why
they did not marry, how Radha died, Radhashtami, Banke Bihari, the HD gallery, the sampradaya concordance)
get disproportionate firsthand value and must carry **at least one E of Experience or Experimentation**
(a real Braj visit, original photography, personally-verified temple timings, the scripture table done
exhaustively, the proprietary-data study) as a **ship condition** — Effort alone (a citation) does not
qualify. The long tail is **coverage**: the lean template, still sourced and verified, but not buffed to
the same firsthand depth. Do not buff 50 pages to the same medium sheen; concentrate the firsthand work.

## 5. The content model (MDX, no CMS)

**Decision: MDX files in a `content/` directory, no headless CMS.** Rationale: the catalogue is bounded
and slow-changing (hundreds of pages, not millions), the team is comfortable in markdown, and MDX in git
gives versioning, review, and zero CMS cost/latency. This matches the founder's steer and the
writesonic-website pattern (we swap Sanity's `getAllSlugs()/findBySlug()` for a filesystem glob +
gray-matter, and keep the repository/template/component-map layers unchanged).

**Directory shape:**

```
content/
  en/
    questions/why-did-krishna-not-marry-radha.mdx
    stories/raas-lila.mdx
    mantras/hare-krishna-maha-mantra.mdx
    festivals/radhashtami.mdx
    temples/banke-bihari.mdx
  hi/
    questions/why-did-krishna-not-marry-radha.mdx   # same slug, Hindi content
    ...
```

Locale is the top directory; the same slug in `en/` and `hi/` are hreflang alternates. A page exists in a
locale only if its file exists there, so Hindi can trail English on the long tail without breaking routing.

**Frontmatter schema (typed, validated at build).** Shared fields on every file, plus per-type fields.

Shared:

```yaml
title: 'Why Did Krishna Not Marry Radha?'
slug: why-did-krishna-not-marry-radha
type: question # question | story | deity | prayer | festival | vrata | temple | place | gallery
cluster: questions
question: 'Why did Krishna and Radha never marry?' # the exact user query
answer: > # the 40-75 word answer-first block, single-sourced into page + meta + schema
  Krishna and Radha never married because...
tldr: ['…', '…', '…'] # key takeaways
description: '…' # meta description
author: samanyou-garg # real editorial identity (Samanyou Garg); publisher = Ved Vyas Foundation. Never fabricated (D15)
tier: moat # moat | coverage — moat pages carry >=1 E of Experience/Experimentation as a ship condition (P1-2)
verified: # replaces the required-human reviewer (D15): the automated verification record
  date: 2026-08-01
  method: 'parallel.ai (Search + Deep Research) + research Workflows; multi-source, per-claim provenance'
  sources: ['Bhagavata Purana 10.29-33', '…'] # the corroborating authoritative sources
advisorReviewedBy: # OPTIONAL — a future real, consenting, credentialed scholar advisor (fast-follow). Never invented.
datePublished: 2026-08-01
dateModified: 2026-08-01
image: /images/questions/krishna-radha-marriage.webp
imageAlt: 'Radha and Krishna beside the Yamuna, painterly devotional art'
sources: # scripture/citations, rendered + fed to schema
  - { text: 'Bhagavata Purana 10.29-33', url: '…' }
related: [why-did-krishna-leave-vrindavan, radha-krishna-love-story]
faq: [] # only where genuine Q&A; markup kept, no rich-result dependency
```

Per-type extras: `prayer` adds `lyricsDevanagari`, `transliteration`, `wordMeanings[]`, `audioUrl`,
`tradition`; `festival` adds `dateThisYear`, `tithi`, `templeLinks[]`; `vrata` (Ekadashi/vrat, C1) adds
`tithi`, `paran` (the Dvadashi breaking-day + timing), `presidingDeity`, `dateThisYear`, `mahatmyaSource`
(Padma / Bhavishya / Skanda Purana), `vratVidhi`; `temple` adds `timings`, `darshan`, `aarti`,
`location{lat,lng,address}`, `howToReach`, plus `timingsVerified{date, by, source}` (the P1-6 verification
stamp); `gallery` adds `images[]` with per-image `{src, alt, caption, width, height, license, downloads[]}`.

**Rendering:** a central MDX-components map (the analogue of writesonic-website's PortableText map)
provides branded components writers use in-body: `<AnswerFirst>`, `<KeyTakeaways>`, `<ScriptureTable>`,
`<ComparisonTable>`, `<Definition>`, `<ShlokaCard>`, `<AudioPlayer>`, `<Figure>`, `<FestivalDate>`,
`<TempleFacts>`, `<RelatedGrid>`, `<Sources>`, `<ShareRow>`. Writers get structure by default, so the
answer-first + table + source discipline is impossible to skip.

## 6. The sourcing + trust layer (rendered on every doctrinal page)

- **`<Sources>`** renders the scripture citations with chapter/verse and links, and feeds `citation` /
  `Article` schema.
- **`<ScriptureTable>`** renders the sampradaya-transparency comparison (what each named text/tradition
  says), with the transparency label per row (scripture / later literature / tradition / legend /
  retelling). Each table is a surface of the named **Radha Krishna Scripture Concordance** — the canonical,
  versioned, citable dataset (`01` §5, P1-4) — not a one-off per page; every row is its own extractable node.
- **Real author byline + verification stamp** ("verified [date] / method / sources", D15) and **"Last
  updated"** are template chrome, not optional. The optional `advisorReviewedBy` renders only if a real
  scholar advisor is credited. No fabricated reviewer, ever.

## 7. Build order (mapped from the landscape research)

**The build unit is a journey × its query fan-out, not "50 keywords" (P0-6).** Before building, run a
fan-out simulator (Qforia or equivalent) on the top ~15 head queries; map each synthetic sub-query to a
specific spoke or a specific passage/row in a hub. Where an expansion has no home, that is the next page.
The spoke model is already fan-out-shaped, so this is mostly verification — but every scripture-table row
and sub-entity must be its own extractable, linkable node. The tracked-prompt constellation (`01` §11) =
this fan-out set. The page inventory below (from `research/07-devotional-landscape.md` §7) is the journey
map the fan-out expands, not a flat keyword list.

**Ranking rule (D14 + P1-2 + P1-8):** the build order is re-ranked by which pages feed the business
conversion (subscribers + app installs) and by winnable-citation-first sequencing. Every page is tagged
`tier: moat | coverage`; moat pages get the firsthand E (§4).

**P0 - Pillars + highest-opportunity (build first):** **Radha Krishna master hub** (the primary entity —
top pillar, strongest internal-link anchor, C2), Radha Krishna love story (hub), Who is Radha (hub), the
**Radha Krishna Scripture Concordance** synthesis pages (marriage / death / husband tables,
Radha-vs-Rukmini, sampradaya comparisons — the winnable citations, P1-8), Why Krishna did not marry Radha,
Who is Radha's husband, Why Krishna left Vrindavan, Is Radha an incarnation of Lakshmi,
Hare Krishna Maha Mantra, Radhashtakam, Radhashtami, Janmashtami, Banke Bihari temple, **one** "Radha
Krishna HD images" page that kills the story query and the image query together (the single image page kept
in P0; other galleries demoted). Radha Krishna quotes stays P0 as a light entry.

**P1 - Fast follow:** reunion question, what their love symbolizes, Radha's parents/birth, 108 names, Radha
aarti, bhajan hub, Radha Kripa Kataksha stotram, Prem Mandir, Nidhivan, Barsana, Lathmar Holi, Vrindavan
guide, ISKCON Vrindavan, Radha Raman, Radhe Radhe meaning + images, Radha vs Rukmini deep dive, how to
worship at home, the **Ekadashi hub** (`/festivals/ekadashi/`) + the top few high-demand Ekadashis
(Nirjala, Devshayani, Prabodhini/Devutthana, Mokshada/Gita Jayanti, Vaikuntha — each has strong recurring
monthly demand for its date + katha, C1). **Demoted here from P0 (P1-3):** wallpapers 4K, WhatsApp
DP/status, art/paintings gallery — reach/brand plays, near-zero text-citation value; front-load only the
single "story + image" page above, hold every gallery to the same info-gain bar (original art + real
context + full metadata, never a bare grid).

**P2 - Depth + long-tail:** name meaning, age question, Gita Govinda/Jayadeva, viraha, Raas Lila, Kartik
month, Govardhan Puja, Gopashtami, Radha Vallabh, Govardhan parikrama, Mathura, Gokul/Nandgaon, Dwarka,
festivals calendar hub, **the remaining ~19 Ekadashis + Dvadashi/vrat pages** (C1), the remaining
master-hub spokes, sad/emotional quotes, mantra for love & marriage, the demoted wallpaper/DP/status
galleries.

**Sequencing logic:** P0 leads with the **differentiated synthesis** (the concordance tables where no
authority yet exists and citations are actually winnable, P1-8) plus the master hub and the two pillars —
the head-entity pillars ("Who is Radha", "love story") are built for organic traffic + internal-link
anchoring, but they are the _least_ winnable citations for years (Wikipedia/Britannica/ISKCON out-authority
a new site on head-entity definitions), so we do not wait on them for citation capture. P0 also lands the
two tentpole festivals + the top temple. P1 completes each cluster, the internal-link graph, and the
Ekadashi hub. P2 fills nuance long-tail, the Braj geography, and the full Ekadashi/vrata set so the hub is
comprehensive before Janmashtami/Radhashtami season (Sep 2026). Festival + Ekadashi date pages ship 4-6
weeks ahead of each spike.

## 8. Navigation

- **Primary nav:** Radha Krishna · Stories · Questions · Prayers · Festivals · Temples · Images ·
  Daily Darshan. (Plus "Ask Krishna AI" if in scope, see `DECISIONS.md`.)
- **Footer:** cluster links + the org network (bhagavadgita.com, vedvyas.com, the apps, Gita GPT, Hanuman
  Chalisa) + about/authors + social (Pinterest, Instagram, YouTube). See `03` for the exact footer spec.
- **Breadcrumbs** on every page (`BreadcrumbList` schema), reflecting the cluster path.

---

_Built on `research/03-writesonic-website.md` (templating), `research/06` (architecture for AI), and
`research/07` (the page inventory + priority)._
