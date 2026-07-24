# 08 — Marketing Automation (AI social + email + content growth)

Cross-property plan (Radhakrishna.com + Bhagavadgita.com + the apps). The goal: an **always-on AI
marketing system** that grows every property daily without a human doing the grunt work. It learns from
what is trending and what competitors are winning with, clones + improves it, invents new ideas, A/B tests,
measures, and repeats. Same content system we are building here (Codex writing + our image/video pipeline),
pointed at social, email, and net-new site content.

> Founder direction (2026-07-24): build an intelligent AI social media manager that ships >=1 post/day to
> every platform, plus a weekly email engine, plus a content engine adding 5-10 new pages/week, all linked
> together across the network. Plan it now; build after the sites' foundations + first content land.

---

## 1. The three engines (one brain)

| Engine             | Output                                                                      | Cadence              | Goal                                   |
| ------------------ | --------------------------------------------------------------------------- | -------------------- | -------------------------------------- |
| **Social engine**  | Images, carousels, quote/shloka cards, AI videos (Reels/Shorts), animations | >=1/day per platform | Reach, virality, followers, traffic    |
| **Email engine**   | Weekly devotional/wisdom newsletters per property                           | Weekly               | Retention, return visits, app installs |
| **Content engine** | New site pages (stories, questions, festivals, temples, mantras)            | 5-10 pages/week      | SEO/GEO growth, an always-fresh site   |

One shared "brain" feeds all three: a trend + competitor monitor, an ideation model, our asset-generation
pipeline (Codex copy + gpt-image-2 / Gemini images + AI video), a scheduler/publisher, and an analytics +
learning loop.

## 2. The learning loop (the core idea)

```
MONITOR  -> what's trending + what competitors' top posts are (views, likes, saves, shares)
IDEATE   -> clone the winners, improve them, and generate net-new angles
CREATE   -> copy (Codex, house voice) + image/video (our pipeline), on-brand, bright, reverent
TEST     -> A/B variants (hook, art, format, caption, time)
MEASURE  -> per-post + per-account performance vs the goal
LEARN    -> feed winners + losers back into IDEATE; double down, kill duds
```

This is the "intelligent AI social media manager": not a scheduler, a system that studies the field and
gets better every week.

## 3. Competitive + trend research (first workstream — do this before building)

Research and document what the best accounts actually do, then reverse-engineer the playbook. Run as a
workflow (multi-agent) and save findings to `research/`.

- **Radha Krishna / devotional Instagram + Pinterest + YouTube accounts:** the big devotional pages,
  ISKCON-adjacent creators, Radha Krishna art/reels accounts. What formats, hooks, cadence, audio/trending
  sounds, hashtags, captions, series, and post types get the most reach + saves.
- **"Bhagavad Gita For All" app:** the founder flags they market really well. Reverse-engineer their social
  - email + ASO + content: what they post, how often, what converts to installs, their creative style.
- **Adjacent winners:** Calm/Headspace social, other spiritual/meditation brands, top quote accounts.
- **Deliverable:** a "what works" playbook per platform (formats, hooks, cadence, sounds, hashtags,
  series ideas, posting times) + a swipe file of the best-performing creative to learn from (reference,
  then make original — same rule as our art references, docs/04).

## 4. The social engine

**Platforms:** Instagram (feed + Reels + Stories), Pinterest (huge for devotional imagery), YouTube
(Shorts + long darshan/aarti/story videos), Facebook, X, WhatsApp channels. Per platform, native formats.

**Content types (reuse our pipeline):**

- **Quote / shloka cards** (gpt-image-2 typography-in-image, docs/04 T3) — the daily-quote engine.
- **Leela art posts** (Gemini/gpt-image-2, the shot list docs/04 §5b) — bright, delightful scenes.
- **Carousels** — a story or teaching in 5-8 slides.
- **AI-generated videos / Reels + Shorts** — this is the growth lever. Options: Sora 2 / Veo 3 / Kling for
  generative devotional video; image-to-video (Kling/Runway) to animate our stills; Remotion for
  templated, data-driven video (verse-of-the-day, festival countdowns). Use the `ai-ad-prompt-guide` +
  `remotion-video-toolkit` skills. Trending-audio aware.
- **Animations** — subtle motion on our art (parallax, glow, particle petals) for Reels.

**Per-property voice:**

- **Radhakrishna.com:** leelas, Radha Krishna quotes, daily darshan, festivals, bhajans, "did you know"
  scripture facts, Braj/temple content. Warm, devotional, delightful.
- **Bhagavadgita.com + apps:** Gita verse-of-the-day, wisdom-for-life, "what the Gita says about X",
  practical application, Gita GPT demos, install CTAs. Wise, practical, calm.
- **Linked:** cross-promote (Radhakrishna audience -> Gita content and app; Gita audience -> Radhakrishna
  daily darshan), shared brand family, shared pipeline. One system, many mouths.

**Cadence:** >=1 post/day/platform, mixed formats, a repeatable weekly grid (e.g., Mon quote, Tue reel,
Wed carousel story, Thu festival/temple, Fri question, Sat art, Sun darshan). A/B the hook + creative.

**Publishing:** schedule + publish via platform APIs or a scheduler (Buffer/Metricool/Publer) or the
Zapier/Higgsfield integrations already connected; keep a human approval gate at first, then loosen as trust
builds.

## 5. The email engine

- **Weekly newsletter per property**, in the house voice (docs/05 writing / `research/05`), differentiated:
  - **Radhakrishna weekly:** a leela or story, a shloka + meaning, this week's festival/tithi, a darshan
    image, a question answered. Warm, devotional.
  - **Bhagavadgita weekly:** a verse + practical wisdom, a "Gita on [life theme]", a Gita GPT prompt, an
    app nudge. Practical.
- **Linked:** shared subscriber system where sensible, cross-promotion between lists, unified brand.
- **Tooling:** the marketing repo already has Brevo / Postmark / Loops keys; pick one (Loops or Brevo for
  lifecycle). Capture emails on-site (the daily-darshan + PWA subscribe = the D14 conversion, docs/01 §11).
- **Automation:** the same brain drafts the weekly issue from that week's new content + top-performing
  social + the festival calendar; human approves; send. Segment + A/B subject lines.

## 6. The content-growth engine (always-growing site)

- **Phase gate:** first ship the foundation + the P0/P1 pages + a **clean sitemap, internal-link graph, and
  references** (docs/02, docs/03). Do NOT scale content before that base + the verification pipeline exist.
- **Then:** add **5-10 new pages/week**, forever, via the content pipeline (docs/06: discover -> research
  -> Codex draft -> parallel.ai verify -> MDX). Always-growing, never static.
- **Guardrails (docs/01):** every page passes the information-gain test + the citation-verification gate;
  publish in themed clusters; never 10x faster than we can verify. Sitemap + internal links auto-update on
  each add. This is what keeps Google + AI engines seeing a live, deepening site.
- **Feedback:** the social + search analytics tell us which topics resonate -> prioritize those next.

## 7. System architecture (what to build)

A modular "AI marketing OS", likely living in / extending the `writesonic-marketing` repo pattern (it
already has the SERP/Ahrefs/OpenAI/email/Slack integrations + the Codex draft + image engines):

1. **Monitor** — pull trends + competitor top-posts (Instagram/YouTube/Pinterest APIs or scraping; trend
   sources), store performance data.
2. **Ideate** — an LLM planner that turns monitor data + the calendar + our content into a ranked idea
   queue per property/platform.
3. **Create** — Codex (copy) + gpt-image-2/Gemini (images) + Sora/Veo/Kling/Remotion (video), on-brand.
4. **Schedule/Publish** — queue + platform APIs/scheduler, with an approval gate.
5. **Measure** — per-post analytics back into the store.
6. **Learn/Optimize** — A/B results + winners feed back into Ideate. Weekly auto-report.

Cross-property config so one system runs Radhakrishna + Bhagavadgita + apps with per-brand voice + assets.

## 8. Sequencing (how this fits the roadmap)

1. **Now / near-term:** finish the site foundation + first content + sitemap/links/refs (docs/05 Phases
   1-2). Stand up email capture (the conversion).
2. **Research workstream:** the competitive/trend research (§3) as a workflow -> the "what works" playbooks.
3. **Build the social engine** MVP: daily quote/shloka cards + leela posts + a few AI Reels, one property
   first (Radhakrishna), human-approved, learn.
4. **Add the email engine** (weekly), then the content-growth cadence (5-10 pages/week).
5. **Add the learning loop** (competitor monitor + A/B + auto-optimize), then scale to Bhagavadgita + apps.
6. **Loosen the human gate** as the system proves itself.

---

_Cross-property. Applies to Radhakrishna.com, Bhagavadgita.com, and the apps. Reuses the content +
image/video pipelines in docs/04 + docs/06 and the tooling in `writesonic-marketing`. Living doc — append
as we research competitors and build each engine._
