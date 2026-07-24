# Original Brief — Radhakrishna.com Revamp

> Saved verbatim on 2026-07-24. This is the founder's (Samanyou / Radhey) original request that kicked
> off the full revamp. Everything in `/docs` traces back to this.

---

## The core ask

Radhey Radhey — we have this **Radhakrishna.com** website. We made some changes just yesterday, but it is
still a basic old blog. We need to make full use of it and redo the whole website.

A suggestion from another chat model is included at the bottom.

Notes / constraints:

- We have the **bg-frontend** repo + documents for **Bhagavadgita.com**, and we just yesterday did a
  **Ved Vyas website revamp**. Both use similar branding. **Stick to the branding we did on the new
  vedvyas.com site**, and the same tech stack.
- Redo this website **and** set up a proper **content strategy, SEO strategy, and AI search
  (GEO/AEO) strategy**.
- **First: make workflows to thoroughly explore these repos.**
- There is a **Writesonic marketing repo** in Documents; the `.env` file has API keys for **SERP APIs,
  Ahrefs**, and various other tools.
- Act as a **top head of SEO and content marketing** (HubSpot / Ahrefs pedigree). Understand what it
  takes to structure a proper website for SEO and now AI search (GEO / AEO).
- **Research the last 3–4 months** of GEO / AEO developments: top strategies, what's working, how to
  structure the website + content, what **schemas** to use, FAQs, comparison tables, what is getting
  cited, etc. Take both SEO + GEO into account and, as an expert, suggest and create the whole content +
  website + digital strategy.
- Actual content will be written using the **GPT-5.6-sol (codex) model** via Codex.
  - **No em dashes.** No AI tells / AI patterns. Very **human** voice.
  - Use my writing style: `writesonic-marketing/knowledge/writing/samanyou-house-style.md`.
  - Avoid blobs / unreadable paragraphs. Very readable, easy to understand, well-structured. Built for a
    younger generation with short attention spans **and** for the new generation of LLMs / AI models that
    prefer structured, well-formatted content.
- **No AI slop.** No scaled content abuse, thin content, or AI spam of the kind recent Google core
  updates penalize.
- Explore the marketing repo for the **newsletter** and other things. There's a **pricing doc** we made
  for our agents with really cool **brand images** — figure out whether it was a skill or a prompt so we
  can replicate that exact thing.
- We use the **GPT image model** for images: graphic/brand images, plus realistic/art beautiful
  Radhakrishna images.
- Make a **docs folder** with the entire roadmap, strategy, digital/SEO/GEO/content plan, how the site
  breaks into **clusters / hub-and-spoke**, so nothing is forgotten. Also keep a **working log** doc that
  notes what is being done + upcoming, so work can be picked up later.
- Proper **OG tags, OG images** everywhere. Ideally **dynamic OG images** with templated fields fed by
  text.
- Reference the **writesonic-website** repo (also in Documents) — same Next.js, mostly static, very good
  **design-token system**. Follow the same here:
  - proper design token system
  - reusable components
  - shadcn components are OK but **custom-branded**
  - **do not import a component if one already exists**; reuse as much as possible
- Decide static vs templated pages (blogs etc.) so we don't have 1000 pages to maintain. **No headless
  CMS needed** — a **markdown / MDX** approach where data feeds templates. See what Vercel has released
  recently that we could use.
- The writesonic-website uses **Sanity CMS** with templated blog structure + custom design. Same idea
  here, but likely **no CMS** — MDX files instead.
- Everything **SSR + very fast**. Static generation preferred (no load time). **Page performance is
  critical.** Images **WebP**, high-res. Alt tags, captions, and anything else that helps indexing +
  citation.
- Link out to our other apps / sites in the **footer**: bhagavadgita.com, vedvyas.com — that's our org.
  Also **Hanuman Chalisa**, **Bhagavad Gita Android + iOS apps**, **Gita GPT** AI. Note all of these.
- Content strategy extras to consider:
  - live darshan of certain temples
  - photos of certain temples
  - descriptions of devotional cities (Vrindavan, Mathura, …)
  - stories about deities across the country (Bhakti, Bhairavi ji, Dwarkadheesh ji, …)
- Writing model = the codex one. **Imagery + visuals are super important.** Must not feel like a sloppy
  website.
- **Thoroughly review everything.** Use Claude-in-Chrome, gstack browser, or Playwright for testing.
  Latest Next.js, latest Tailwind.
- It should be a **really, really beautiful website.**
- Keep the docs folder with roadmap + strategy + a **working log** so work can resume anytime.

---

## Notes from the other model (verbatim)

Radhey Radhey. Radhakrishna.com is underused and can become a strong devotional discovery property.

**What to build:** The current site is effectively an old blog (a few 2017–2018 posts: Radha's birth,
Krishna's peacock feather, a mantra, a bhajan). It lacks structured topic hubs, scripture sourcing, tools,
modern devotional experiences, and clear navigation. The domain is excellent — "Radha Krishna" supports
many intents: stories/questions, divine love + philosophy, bhajans/mantras/aartis/stotras,
wallpapers/images/quotes, festivals + temples, daily darshan, Krishna/Radha AI guidance, apps + audio.

**Positioning:** _The digital home of Shri Radha Krishna_ — stories, teachings, bhajans, prayers,
festivals, images, and daily devotion. Not another generic mythology blog: combine authoritative
explanations with a beautiful daily devotional experience.

**Homepage hero:** H1 "Experience the Divine Love of Radha Krishna". Sub: explore their stories,
teachings, sacred prayers, bhajans, temples and timeless meaning across Hindu traditions. Buttons:
Explore Radha Krishna · Begin Daily Darshan · Ask Krishna AI.

**Homepage sections:** (1) Start here — Who are Radha & Krishna? / Their story / Meaning of their divine
love / Why worshipped together. (2) Today's devotion — daily image, quote/verse, reflection, mantra
audio, festival/tithi, share to WhatsApp/Instagram. (3) Popular questions — were they married, why did
Krishna leave Vrindavan, who was Radha, where is Radha in scripture, what happened to Radha, why
worshipped together, is Radha an incarnation of Lakshmi, what does their love symbolize. (4) Stories —
birth of Radha, childhood pastimes, Vrindavan, Rasa Lila, Govardhan Lila, Krishna leaving Vrindavan,
Uddhava's visit, reunion at Kurukshetra, Radha in different traditions. (5) Prayers & bhakti — Radha
Krishna mantra, Radhashtakam, Yugalashtakam, Radha Sahasranama, Hare Krishna mantra, aarti, morning +
evening prayers, bhajan lyrics with audio + meaning. (6) Images & wallpapers — mobile/desktop wallpapers,
WhatsApp status images, festival images, quote cards, animated devotional videos, Hindi/English text,
one-click share (major distribution opportunity — Pinterest/Instagram/Google Images demand). (7) Temples
& pilgrimage — Barsana, Vrindavan, Radha Raman, Banke Bihari, Radha Vallabh, Radha Damodar, Nidhivan,
Govardhan, Prem Mandir, ISKCON (history, significance, darshan timings, festivals, location, original
photography). (8) Explore related properties — Read Bhagavad Gita, Ask Krishna AI, Ved Vyas, Radha
Krishna app.

**Content architecture:** /radha/ /krishna/ /radha-krishna/ /stories/ /questions/ /teachings/ /mantras/
/bhajans/ /aartis/ /stotras/ /quotes/ /wallpapers/ /festivals/ /temples/ /vrindavan/ /daily-darshan/
/app/

**Highest-priority SEO clusters:** Radha questions (who is Radha, where born, parents, married, husband,
how did Radha die, in Bhagavatam, is Radha Lakshmi, her names, why Rani); Radha–Krishna relationship (why
not marry, meet again, love symbolizes, same soul, why leave, older than Krishna, after Krishna left,
which scriptures); Devotional intent (mantra, aarti, bhajan, prayer, names, Radhashtakam lyrics, morning
mantra, wallpaper, quotes in Hindi, status video).

**Editorial caution:** Radha's portrayal varies across texts and sampradayas. Distinguish: what is
explicitly in a named scripture / what is later devotional literature / what is taught in a particular
tradition / regional legend / modern retelling. That distinction alone makes the site more trustworthy
than most current results.

**Growth model — three engines:** Search engine (questions, stories, temples, festivals, mantras,
source-based pages). Image engine (wallpapers, quote cards, WhatsApp status, Pinterest, Google Images).
Daily-habit engine (daily darshan, mantra, verse, story, notification, streak, app). Viral layer =
visual; SEO layer = questions + stories; retention layer = daily devotion.

Everything must be documented so it never needs re-explaining. Strategy first, then execution end to end.
