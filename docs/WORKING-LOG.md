# Working Log — Radhakrishna.com Revamp

Newest entries on top. Each entry: date, what was done, what's next. This is the pick-up-anytime log.

---

## 2026-07-26 (latest) — The Holi cluster, and a date that only holds in some years

Built the last three festivals the hub was pointing at with no page behind them: **Lathmar Holi**,
**Holi** (Holika Dahan and Rangwali Holi) and **Vasant Panchami**. All ten hub festivals now have
pages, so the festivals table has no dead rows left.

Research turned up four things worth keeping:

- **The Bhagavata Purana does not name Holika.** 7.5.43 to 45 lists fire among the things Prahlada
  came through, in a single unbroken list with elephants, serpents and poison, and no woman is named.
  The **Narada Purana**, Purva-bhaga chapter 124, names her, ties her to Prahlada, sets the day on
  Phalguna Purnima, and offers three readings of the fire. The **Vishnu Purana** 1.18 has an unnamed
  fire-woman who turns back on the ones who sent her. The Holi page says exactly this.
- **Garga Samhita 4.12** is the earliest text placing Radha and Krishna at a Holi, and 4.12.7 ("has
  come to Your forest") is the seed of the Nandgaon to Barsana journey. The **lathi is Braj, not
  scripture**, and both Holi pages say so rather than dressing a village custom in a verse.
- **Phoolon wali Holi is at Banke Bihari, Vrindavan**, on Rangbhari Ekadashi, not at Barsana. My
  brief had assumed Barsana; the page carries the corrected version.
- **A live error on a published page.** `content/temples/barsana.mdx` carried "Lathmar Holi lands
  roughly a week to nine days before the Holi the rest of India keeps." True in 2024 to 2026 and in
  2028 (six days), **false in 2027**, where it is five, because Phalguna shukla **dashami is a kshaya
  tithi** that year: it begins and ends between two sunrises and never appears in the calendar. Fixed
  on Barsana, and the Lathmar page now explains the skipped tithi instead of repeating the
  generalisation.

**Dates verified for 2027 and 2028** against Drik Panchang and the ISKCON Vaishnava calendar, then
cross-checked with the Swiss Ephemeris. `npm run check:festivals` now reports **19 of 19 matching**.

**Vasant Panchami 2028 genuinely splits**, and by about two minutes: panchami begins 07:14 AM on 31
January, just after Delhi sunrise, so it fails the udaya tithi test while still prevailing at
madhyahna. Smarta keeps Monday 31 January, vaishnava Tuesday 1 February. The page leads with the
smarta day per house rule and gives the vaishnava day directly beneath it.

That split forced a real fix to the checker. It only knew `sunrise`, `midnight` and `night`, and
Vasant Panchami is a **madhyahna-vyapini** observance, so a correct smarta date would have been
reported as wrong. Added a `midday` reckoning that samples the tithi at local noon.

**Lineage voice, and where it actually is.** The strongest material on Holi in this lineage is
Kripalu Ji Maharaj's, not Swami Ji's: **Prem Ras Madira gives its whole eighteenth chapter, Hori
Madhuri, to Holi padas**, and JKP publishes a Holi discourse by him whose line is that the festival
exists to carry God's omnipresence. Both are on the Holi page, with two padas set in the house verse
pattern. Roughly a third of that discourse is unusable under the keep-the-negative-out rule and was
left alone. **Kirti Mandir keeps Vasant Panchami**, which is on that page. **JKP's Holi is at
Mangarh, not Barsana** (Holi Sadhana Shivir, colour played at Bhakti Mandir); Rangeeli Mahal appears
in JKP's own records for Mahashivratri and Basant Panchami and never for Holi, so the page does not
claim it.

**A grep that reported clean while the page was not.** The Holi draft carried "the widows' Holi" in
a table and an FAQ. The keep-the-negative-out sweep in CLAUDE.md uses `\bwidow\b`, and the plural
possessive does not match it, so the sweep passed on a site that had already cut the widows of
Vrindavan once on founder direction. Both mentions removed, and the grep in CLAUDE.md now drops its
word boundaries. A few false positives beat one silent miss.

**The art had drifted, and the founder caught it.** Nine images across the recent festival batches
came out as flat single-hue washes: Lathmar all pink, Vasant Panchami all yellow, Nandotsav all gold,
chalky and shallow. The twelve earlier images are all correct, so the drift was entirely mine and
entirely recent.

The cause was in the prompts, not the engine. Every scene line named a palette ("festive rose gold
and saffron palette", "yellow gold and soft green palette"). The model reads a named palette as an
instruction to tint the whole canvas, so each scene collapsed to one hue. Two further errors: the
engine should be **gpt-image-2**, not gpt-image-1, and the playbook's instruction to lock a BRAND
block and prepend it to every prompt (`research/08` §6) was never actually implemented.

Fixed with `scripts/generate-art.mjs`: one locked BRAND block, scene lines that describe only what is
in the picture, and all nine regenerated against `who-is-radha.webp` as the reference. The rule is
now in CLAUDE.md, with a single-hue image called a defect rather than a style choice.

Three alt texts were rewritten to match their new scenes. Sharad Purnima's is the biggest change: it
was an empty moonlit river and is now the maha raas itself, which is what the page is about.

**Next:** the newsletter component is still built and rendered nowhere (zero `<input>` site-wide);
place it or delete it. Sitemap submission in Search Console stays manual.

---

## 2026-07-26 — Three festival pages, and the hub stops being a dead end

Founder asked for the next set of topics. The plan I proposed first was wrong and checking saved it:
the existing Janmashtami and Radhashtami pages **already cover** fasting, puja at home, Dahi Handi,
Nandotsav and how Barsana keeps the day, so satellite pages would have cannibalised them.

**The real gap.** The festivals hub lists ten festivals in a table and only two had pages. The other
eight were dead ends, named with nowhere to click. Three of the nearest are now built and the hub
table links them.

| Page | Falls | Note |
| ---- | ----- | ---- |
| **Jhulan Yatra** | 23 to 28 Aug 2026 | Four weeks out, the urgent one |
| **Nandotsav** | 5 Sep 2026 | |
| **Sharad Purnima** | 25 Oct 2026 | The maha raas night |

**Jhulan** sets all three authentic lengths side by side rather than picking one: five days from
Pavitropana Ekadashi for most temples, thirteen from Hariyali Teej in Vrindavan town, seven at Puri.
Its differentiator is **Swami Mukundananda's jhulan meditation**, pulling the swing in the mind, which
no competing page carries.

**Sharad Purnima** quotes the Rasa Panchadhyayi at 10.29.1, 10.29.3, 10.33.3 and 10.33.38, with
Vishvanatha Chakravarti on how the name Radha slips out of Shukadeva's mouth at 10.30.28. It is also
**the night Kripalu Ji Maharaj appeared in 1922**, which the page says and links to the lineage.

**Nandotsav corrects an error Google is serving.** Several sources, and Google's own snippet, give 5
September 2026 as an ISKCON Janmashtami date. That is Nandotsav; ISKCON keeps Janmashtami on the 4th,
the same day as everyone this year. The research also confirmed the existing Janmashtami page is
**correct and must not be "fixed"** to match the error.

**A third reckoning was needed.** Sharad Purnima is kept through a night rather than at an instant,
and the moon can rise before the tithi begins (2027) or after it (2026), so testing moonrise alone
would have failed a date Drik Panchang gives correctly. The checker now asks whether Purnima prevails
at any point between moonrise and dawn. Rules also added for nandotsav (krishna navami) and jhulan
(Shravana purnima). **All nine published dates verify.**

**Banked, not built:** Govardhan Puja (10 Nov 2026) and Gopashtami (17 Nov 2026) are fully researched
and dated in `docs/research/festivals-next-batch.md`. One correction recorded there that would
otherwise have been got wrong: the once-a-year darshan of Radharani's feet at **Barsana belongs to
Radha Ashtami, not Gopashtami**, whose feet darshan is a Vrindavan and Gaudiya practice with her
dressed as a gwala.

Verified on production: three pages 200, 33 routes, zero broken links, 33/33 social cards, mobile and
desktop QA clean.

**Still dead ends in the hub:** Lathmar Holi, Holika Dahan and Rangwali Holi, Vasant Panchami. All
February to March, so there is runway.

---

## 2026-07-26 — The lineage page

Built `/lineage`, quote-led rather than a biography, and only from material that came back sourced. A
fabricated guru quote would be a worse failure here than a fabricated verse, so the research brief said
so explicitly and the researcher reported twenty items it could not confirm.

**Carried, each with its source:** the three statements JKP records him giving everyone he met, opening
"Shri Radha is the ultimate goal of every living being"; his reading of her name holding two opposite
meanings at once, she who worships Krishna and she whom Krishna worships, both correct; Prem Ras Madira
3.102; Radha Govind Geet 6597; his last discourse; and the couplet Prem Mandir takes its name from.

**Carried on purpose because it cuts against the easy version:** his warning against ranking them.
Whoever forms the idea that Radha is greater than Krishna, or Krishna than Radha, has misunderstood
both.

**Left out:** JKP's founding year (1970 and 1972 both attested), Prem Mandir's cost (aggregators only),
"only Jagadguru in seven hundred years" (single source), JKYog's follower counts (three different
figures on their own site), and a Bhakti Shatak line that circulates everywhere and ties to no verse
number. **No directly quotable line from Swami Mukundananda about Radha could be sourced**; everything
is JKYog Team paraphrase, so the page quotes him on divine love and on his guru and puts nothing in his
mouth. Worth revisiting with a book or a dated discourse.

**The landmine.** Radha Madhav Dham in Austin carries the JKP name but was founded as Barsana Dham by a
man convicted in 2011 on twenty counts of indecency with a child, who then fled; the organisation
removed him from its own materials and neither official site names a founder. It is not Swami
Mukundananda's. Nothing had shipped, but **docs/04 instructed a future run to source our art from there
as our own org's**. That is now an explicit do-not-source with the reason. The lineage page omits it.

Prem Mandir has its own section on the Vrindavan page now rather than a table row, being our lineage's
temple and that page's hero photograph. Kirti Mandir's entry on Barsana says what makes it singular.

Also: warmed the framing on `/radha-in-scripture`, which opened by saying what other pages get wrong
instead of opening with Radha, and fixed a real bug where the label legend still listed the old long
names while the table pills carried the new short ones. And the negative-content grep was matching
"studied"; word boundaries added.

Verified on production: 30 routes, zero broken links, 30/30 social cards, lineage in the sitemap.

**Next:** the newsletter is still built and wired to nothing, and the sitemap still needs submitting in
Search Console by hand.

---

## 2026-07-26 — Keep the negative out of the pages

Founder: delete the crowd safety incident and the Vrindavan widows passage, and avoid negative content
generally. This goes further than choosing topics. **No grim detail anywhere**, even inside a page that
is otherwise useful, and even when it is true and well sourced.

Removed: the fatal crush and the litigation on Banke Bihari, the widows of Vrindavan and the line
written only to answer it. The sweep then found three more of the same kind that would otherwise have
stayed: criticism of visitors' behaviour at Braj Holi, and a note on the Swami Haridas section saying
scholars find no evidence he was initiated into any sect and that the Tansen tradition is unlikely on
the dates. That last one was **debunking a revered saint on his own temple's page**. It now says his
lineage is remembered in more than one way and keeps what every account agrees on.

**Sources outlive the passage they were added for.** This bit twice in one pass. The Banke Bihari
citation carried "2022 stampede" in its visible title; the Vrindavan one hid the word in the URL, so the
content grep read clean while production still rendered the link. **The only sweep that counts is the
one against rendered output.** The standing grep now reads the whole line, link included.

**Practical safety guidance stays, written as care rather than as news.** A pilgrim does need to know a
festival day is very full, so the page gives the guidance and the reason and leaves out the casualty.
CLAUDE.md carries the rule, the never/always table and the grep.

Verified on production: zero hits across all temple and festival pages, 29 routes, zero broken links.

**Next:** name Kripalu Ji Maharaj properly on Prem Mandir and Kirti Mandir, where he is genuinely the
subject rather than a table row, and build a lineage page.

---

## 2026-07-26 — The site's own voice, and what it declines to write

Three founder directions in one pass, and the second showed a systemic problem rather than a page-level
one.

**Whose site this is.** Pro Radha Krishna, not a neutral encyclopedia. The lineage is Jagadguru Shri
Kripalu Ji Maharaj and Swami Mukundananda. CLAUDE.md carries the verified facts (Jagadguru 14 January
1957, Jagadguruttam, JKP founded 1972, Prem Mandir, Kirti Mandir, Bhakti Mandir) and three rings in
which nothing is ever disparaged: our lineage, the Vaishnava family as close kin, and the wider Sanatan
tradition including the Advaita line and the Ramakrishna Mission. **The data stays even-handed, because
that evenness is what makes the scripture tables worth citing. The prose is where we stand somewhere.**

**Never write about Radha in a debunking register.** Nineteen passages across ten files all led with an
absence. The worst framed the whole questions cluster as a case against her: "Almost every hard question
here traces back to one fact: the Bhagavata Purana never names Radha." All reframed. The facts survive;
what leads changed. The acharyas read that silence as concealment, not absence, her name held inside the
word aradhita.

**What we decline to write.** No pages on contested, gossip-adjacent questions however high the demand.
The husband topic is gone: fifteen sourced claims removed from content, archived unpublished at
`docs/research/retired/`, and the concordance `topic` enum no longer accepts them so a claim of that
shape fails the build. DECISIONS Q13 generalises it. **The test that replaces search volume: does a
reader finish with more love, or only with more argument?**

**The docs were still commissioning the retired pages.** `docs/02` listed "how did Radha die" and "who
is Radha's husband" as the cluster's example pages, and `research/07` still had the husband page as build
item 5. This is exactly what CLAUDE.md's deletion rule warns about: leaving a dropped topic in the
strategy docs is how a future run quietly rebuilds it. Struck at the source.

Also caught: the questions hub still advertised "how Radha died" among its most-asked, pointing at a page
deleted days earlier, and carried a paragraph about her passing. Both gone.

**Design and naming.** The concordance page is now `/radha-in-scripture` with a 301, because nobody
searches "concordance" and the word came from an internal doc rather than from readers. Labels are short
single-line pills (Scripture, Devotional text, Tradition, Braj legend, Modern retelling) in a two-column
table, instead of a phrase wrapping inside a mostly empty third column.

**The rule-zero grep was too narrow** to catch "when I go back to the older scriptures" on the Lakshmi
page. Broadened.

Verified on production: old URL 301s to the new one, zero husband hits on any page, 29 routes with zero
broken links, and content clean of the debunking register, first person, em dashes and rule zero.

**Next:** name the lineage properly on Prem Mandir and Kirti Mandir, where it is genuinely the subject,
and build a lineage page.

---

## 2026-07-25 — The Scripture Concordance is built

Founder picked the concordance cluster as the next build. `docs/01` §5 asks for it as **one named,
versioned dataset**, with the per-page tables its surface rather than the thing itself. The pages were
doing the opposite, each hand-typing its own comparison table, and two had already drifted into error.

**Live at `/scripture-concordance`.** 41 claims across four questions, each an extractable node with a
stable id. `content/concordance/*.yaml` validated by velite, `<ScriptureTable topic>` renders slices in
MDX, the page carries `schema.org/Dataset` with a version, a claim count and a last-verified date.

**The label is enforced, not advised.** A claim labelled outside the five values fails the build with the
valid ones named. Tested by trying to add one.

**D16 settles the taxonomy.** The label says what kind of text, `approxDate` says how old. A Mahapurana
stays scripture even when its recension is late. The alternative would collapse the Brahma Vaivarta
Purana and a sixteenth century sampradaya handbook into one label and destroy the best finding here:
**Rayana is in a Purana and Abhimanyu is not**. A researcher pushed back on the original scheme and was
right.

**Errors this caught on already-published pages.** `why-did-krishna-not-marry-radha` said a shadow Radha
was married to _Ayan_; the Brahma Vaivarta Purana says _Rayana_, and the page was treating Rayana,
Abhimanyu and Ayan as one man when they come from three literatures centuries apart. The same page
called the Garga Samhita and the Brahma Vaivarta "later devotional literature" while calling the
Bhagavata scripture. And the Lakshmi page's Bhagavata 10.47.60 fragment is now the full verse: two hosts
other than vedabase carry it, one was checked directly, and the page now says that the Sanskrit names
Sri alone with the queens entering only through the translator's phrase.

**Where the researchers disagreed.** Two agents split on Brahma Vaivarta Prakriti Khanda 49, one
corroborating the shadow-Radha passage and one able to reach only weak sources. It is load-bearing, so
the full translation was downloaded and read at the passage rather than taking a side. It is there
verbatim. Resolution and quotes in `docs/research/concordance-open-threads.md`.

**Still open, could change a page:** a 1948 journal cites Mahabhagavata Purana 49.16-22 for the name
_Ayana_. If it holds, Ayan moves out of vernacular poetry into a Sanskrit Purana. Single-sourced, text
not readable online, logged and not published.

**Next in this cluster:** "Who is Radha's husband" as its own page (the data is already there), and "Why
Krishna left Vrindavan". Both are P0 gaps.

Verified on production: page 200, in the sitemap, Dataset schema at version 1.0, 41 claim anchors, 27
rows rendering on the marriage question page, the old Ayan error gone, 29 routes with zero broken links,
IndexNow fired.

---

## 2026-07-25 — Real photographs on the place pages, and two mobile bugs

Founder: the temple pages were still leading with AI art after being asked for real photographs.
Correct, and it had been deferred twice.

**Photographs.** All three place pages now lead with a real photograph and carry a gallery of several
angles: Vrindavan (Prem Mandir, Ketandelhiwala, CC BY-SA 4.0), Barsana (the Shriji temple courtyard,
Kridha20, CC BY-SA 4.0), Banke Bihari (the facade from the lane, Guptaele, CC BY-SA 4.0), plus seven
gallery photographs including Keshi Ghat, Bhaktivedanta Swami Marg, the Barsana arch and Lathmar Holi
inside the temple.

**Look at every candidate at full size.** It mattered twice: `Chhatris of Barsana 01` is actually
Lathmar Holi indoors rather than architecture, and a widely used Prem Mandir shot has a NOKIA
watermark burned into the corner. Neither is detectable from the filename or the metadata.

**A licence breach caught in passing.** The heroes were switched to CC BY-SA photographs and rendered
at first with no credit at all. For those licences attribution is the condition of use. Every photo
now shows photographer, licence and source, and the `photos[]` schema makes `credit`, `licence` and
`source` required, so an uncredited photo cannot get through the build. Hero credit rides on
`imageCredit` / `imageLicence` / `imageLicenceUrl` / `imageSource`.

Tooling: `scripts/find-commons-photos.mjs` (search, filtered to large, freely licensed, named author)
and `scripts/fetch-commons-photos.mjs` (download, WebP, emit the exact `photos:` YAML).

**Mobile menu.** It was a native `<details>`, which only ever toggles from its own `<summary>`, so
tapping away did nothing and it stayed open across a client-side navigation. Now a small client
component; the rest of the header is still server-rendered. Verified in WebKit: closes on outside tap,
on Escape, and on navigation.

**Horizontal scroll: not reproduced, and said plainly.** Chromium and WebKit, 320/360/375/390px, all
28 routes with the app banner showing: the document width never exceeded the viewport. A promising
lead (the hero's animated `.ambient-glow`) was disproved by toggling the guard off at runtime and
measuring again, identical either way, so the guard was removed rather than shipped as a fix that
fixes nothing. Neither `body` nor `html` carries a global `overflow-x: hidden`, so real overflow would
show.

What was found is a real cause no emulator reproduces: the newsletter input was 14px, and **iOS
Safari zooms the whole page when a focused input is under 16px**, after which the page sits wider than
the window and pans sideways. Now 16px on phones. Never `maximum-scale=1`, which takes pinch zoom from
everyone who needs it. `visual-qa.mjs` now fails any form control under 16px, and only names
overflow culprits when the page actually scrolls, since an element clipped by an ancestor was
producing false positives.

---

## 2026-07-25 — Every page has a real social card

Founder asked whether the OG images actually worked across all the pages, and whether they were
dynamic or hard-coded. Worth asking: sixteen pages were broken.

`generateMetadata` read `doc.image ?? "/og?..."`, so any page **with** art used its raw content image
as `og:image`, and only the hub pages, which have none, got the drawn card. Exactly backwards. Three
things wrong with it: the image was **WebP**, which X does not render and WhatsApp usually shows
nothing at all for; it was 3:2 art in a 1.91:1 slot, so every network cropped it as it pleased; and
the metadata declared 1200x630 while serving 1536x1024. Separately, `/about`, `/privacy`, `/app`,
`/images` and `/daily-darshan` were all sharing one identical site-wide card.

The card's logo was a plain teal circle standing in for the real mark. It is now the morpankh, the
same feather the header and footer carry. Founder spotted that one.

Cards fail silently, which is why this survived so long: nothing on the page looks wrong when its
card is broken. `npm run check:og` walks the sitemap, reads the true format and pixel size out of the
image header, and fails on WebP, a 404, an HTML response, or anything under 600x315. It caught a bug
in itself during the build: without decoding `&amp;` it requested a parameter literally named
`amp;eyebrow` and reported a card with no eyebrow as fine.

**Text or art?** The card can draw the page's art in its own column, contained rather than covering
so a crop never cuts through faces. Built and working, but **off by default**: founder's call was
text only. To turn it on, pass `image: doc.image` to `ogCard` in `app/[...slug]/page.tsx`. The JPEG
copies it needs come from `scripts/build-og-art.mjs`, which runs as part of `npm run build` and is
gitignored. They exist because Satori cannot decode WebP and the Next image optimizer cannot help:
`next.config` sets `formats` to avif and webp, so it never returns a JPEG whatever Accept header it
is given.

Also fixed here: a citation whose **TLS certificate had expired** (utsav.gov.in, cited on
`/festivals` and `/festivals/janmashtami`). `check-links` had been filing it with the Britannica
403s as a harmless bot wall. It was not: a 403 stops crawlers, an expired certificate puts a
full-page security warning in front of every reader who clicks. Both pages now cite the Nandotsava
article, and the checker treats a TLS failure as a failure.

---

## 2026-07-25 — Quotes set as quotes, FAQ answers broken out of the blob

Two founder notes, both about formatting rather than substance, plus what the work turned up.

**Scripture quotes.** Four different conventions had grown up for the same thing: `<br />` tags on
Janmashtami, bare `_italic_` lines on the mantra page, plain unstyled text on Who is Radha, and on two
pages the translation was orphaned as a bare paragraph _outside_ the quote it belonged to. There was
no `blockquote` CSS at all, so every verse fell through to the typography plugin's generic italic bar
with auto quote marks that doubled up with the marks the translations already carried.

One house pattern now, written into CLAUDE.md: italic transliteration (one line per verse line),
translation in quotation marks, `<cite>` for chapter and verse. CSS gives it a gold rule, a warm
panel, the serif for the verse, and small-caps for the citation, matching the Daily Devotion panel
that already looked right. Verse lines get a **hanging indent**: on a phone a transliterated line
wraps, and without it a wrap is indistinguishable from the next line of the verse, which matters when
someone is chanting from it. Caught in a phone screenshot, not in review.

Left deliberately inline: the Bhagavata Purana 10.47.60 clause on the Lakshmi page. It is a
mid-sentence fragment, and vedabase.io 403s bots, so lifting it into a display quote would have meant
inventing a lead-in word for a scriptural quotation. Not worth it. Revisit if the full verse turns up
from a fetchable source.

**FAQ answers.** All 128 rendered as one unbroken `<p>`; 71 ran over 55 words. `FaqBlock` now splits
on newlines, and answers over ~50 words use a YAML folded scalar with a blank line at the pivot.
97 of 128 now render as two or three paragraphs; none over 55 words is still a single block.

The risk in a reflow like this is a sentence quietly getting reworded, which would undo the source
verification behind it. `scripts/check-faq-text.mjs` snapshots every answer with whitespace collapsed,
so a paragraph break is invisible to it and a changed word is not. `npm run check:faq`. It earned its
keep immediately: it flagged the three wording changes made on purpose and nothing else.

**What the pass turned up on its own.**

- Four rule-zero violations the previous sweep missed, all authorial first person rather than process
  narration: "I would keep those two apart", "I would read it as such", "I would enjoy them as
  stories", "the one I would treat with care". The CLAUDE.md grep now has a second line for `\bI
(would|will|think|...)\b`. Reader-voice questions ("How do I fast?") are fine and expected.
- A stale 2025 date still sitting in the Radhashtami takeaways and FAQ, which the festival-dates
  component fix never reached because it was prose, not structured data. `check-festival-dates.py`
  now scans takeaways and FAQ for past years and warns. It correctly flags and spares the two
  legitimate ones: Janmashtami's 2025, which is the worked example explaining the smarta/vaishnava
  split, and Barsana's 2024 ropeway opening.

Verified: build green, `check:links` 28 routes / 27 links / 29 images / 7 redirects zero broken,
`check:festivals` 4/4, `check:faq` clean, rule-zero grep clean, no em dashes in `content/`.
Visual pass at iPhone 14 and 1440px.

---

## 2026-07-25 (latest) — Phase 3 art shipped: all five pages illustrated

The five Phase 3 pages now have original art. gpt-image-2, 1536x1024, quality high, one distinct
scene each, converted with sharp to `public/images/content/<slug>.webp` at 1600w q80. Every image was
inspected at full size (and the risky corners crop-zoomed) before shipping: faces complete and
uncropped, no text or lettering anywhere, bright and light-first, correct subject.

| Page                     | Scene                                                                               |
| ------------------------ | ----------------------------------------------------------------------------------- |
| `/festivals/janmashtami` | Vasudeva crossing the flooded Yamuna at midnight, Sheshnaga's hoods over the basket |
| `/festivals/radhashtami` | Barsana courtyard at golden dawn, the infant Radharani, sakhis dancing              |
| `/temples/banke-bihari`  | The deity in tribhanga in a lamp-lit sanctum, devotees' folded hands in front       |
| `/temples/vrindavan`     | Place portrait, golden hour across the Yamuna, ghats and spires, no deity           |
| `/temples/barsana`       | The Shriji temple on Bhanugarh hill at sunrise, the long stone stairway             |

`image` + `imageAlt` sit immediately after `description:` in each frontmatter, matching the rest of
the content tree. Velite build green, all five carry an image, no image path used twice anywhere on
the site, so the `/images` gallery picks them up automatically.

Note for anyone repeating this: OpenAI had an "elevated error rates" incident that day and every
authenticated request 500'd for about half an hour. It was not the key.

**DONE, shipped in PR #23.** All of it: art on all five, `check:festivals` (6/6), `check:links`
(28 routes, zero broken), production build green, and Playwright visual QA at iPhone 14 + 1440px on
all five pages and both hubs. Awaiting founder review of the preview, then merge and IndexNow.

---

## 2026-07-25 — NEXT UP (agreed with founder)

1. **Real photos on place/temple pages.** Banke Bihari, Vrindavan, Barsana lead with a small gallery of
   real Wikimedia Commons photos (CC BY-SA, verified available and high-res), each with photographer +
   licence + source link rendered visibly. Generated art stays for festivals and for scenes no camera
   can show. Needs an `photos[]` frontmatter field and a gallery component with attribution.
2. **Quote formatting.** Some scripture sits inline in a paragraph rather than as a quote block, e.g.
   hare-krishna-maha-mantra.mdx:59 (the Prabhupada translation) and :74. Set them as blockquotes with
   attribution, across all pages.
3. **FAQ answers read as blobs.** Break each into two or three short paragraphs. Helps readers scan and
   helps answer engines extract. Across all pages.

## 2026-07-25 — NOTE: repo `.env` vanished mid-session

The gitignored `.env` disappeared partway through and the content agents hit missing keys. Restored
with all 14 keys and verified working. Cause unknown, so if keys go missing again, rebuild from
`writesonic-marketing/.env` plus the project-specific ones (Parallel, Reddit, IndexNow) recorded there.

## 2026-07-25 (later) — Phase 3 festival cluster: text done, art pending

Five pages written and validated, NOT yet illustrated:
/festivals/janmashtami, /festivals/radhashtami, /temples/banke-bihari,
/temples/vrindavan, /temples/barsana. 28 routes, 27 internal links, zero broken.
Rule-zero sweep clean, no em dashes, no curly quotes.

**DONE, in PR #23.** Art generated and reviewed at full size, festival and link checks green,
production build passing, and visual QA at iPhone 14 and 1440px on all five pages plus both hubs.

Two bugs the visual QA caught that code review had missed: the dates block rendered "Next: Invalid
Date" (velite's isodate() returns a full ISO datetime and the formatter appended T00:00:00Z on top),
and the fixed mobile app bar sat over the last of the footer. Both fixed.

Also corrected a factual clash the pipeline surfaced: the temples hub said Banke Bihari dates from
1864 while the temple's own site says 1862.

**Festival dates are solved.** Dates come from Indian panchang authorities (Drik Panchang for the
general/smarta day, ISKCON Vaishnava calendar for the Vaishnava day) and are recorded with a `source`
field. `scripts/check-festival-dates.py` cross-checks each against the tithi and amanta month using the
Lahiri ayanamsa and Mathura sunrise; it reports which reckoning a date satisfies and fails only when it
satisfies neither. All 6 published dates pass. It caught invented dates during testing, and resolved a
2027 disagreement in the panchang's favour.

Presentation: the general (smarta) day leads, the Vaishnava day sits beneath it, per Drik Panchang and
timeanddate convention. Never framed as householder vs sannyasi; the split is tradition, not ashrama.

## 2026-07-25 — LIVE. Rebuild merged to main and deployed

PR #22 squashed into main; radhakrishna.com now serves the rebuild (23 routes).

**Verified against production, not just locally:**

- check-links against https://radhakrishna.com: 23 routes, 22 internal links, 24 images,
  7 legacy redirects, zero broken.
- OG images resolve 200 on the live domain (they 404'd before the metadataBase fix, because
  absolute URLs pointed at a production that did not yet serve this branch).
- /blog/* legacy URLs 301 correctly, including the one that had been landing on a 404.
- robots.txt exposes the sitemap; sitemap has 23 entries; IndexNow key file live.
- Submitted all 23 URLs to IndexNow, accepted HTTP 200. That reaches Bing, Yandex, Seznam
  and Naver, and through Bing it reaches Copilot, ChatGPT search and Perplexity.

**Still to do by hand (no legitimate automation exists):**

1. Search Console: add the radhakrishna.com property, submit /sitemap.xml once.
2. Request indexing manually on 5-6 priority pages (no API; scripting the UI is against
   Google's automated-access terms, see CLAUDE.md).
3. Pick a newsletter provider and set NEWSLETTER_PROVIDER + its key, or the form stays hidden.
4. Once Google has crawled (give it a week or two), build the URL Inspection API monitor so we
   can see which pages are actually indexed and spend manual requests where they matter.

## 2026-07-25 — Content v1 SHIPPED to the branch (18 pages at standard)

The content pipeline ran end to end. Branch `revamp/foundation`, build green, 19 sitemap URLs.

**18 pages now at the CLAUDE.md standard** (11 articles 1.8k-2.4k words + 6 hubs 1.9k-2.6k + the
Sahasranama). Every one: answer-first block, Key Takeaways, question-led H2s, comparison/scripture
table, real FAQ mined from Reddit + Serper, sources cited by chapter/verse, internal links, original
art. Zero em dashes, zero curly quotes across all content.

**Doctrinal integrity held.** Where a claim could not be pinned to a verse the agents flagged it and
labelled it (tradition / folk retelling / later literature) instead of inventing a citation. Notable:
the "Radha dies as Krishna plays the flute" scene has no classical verse and is labelled a later
devotional retelling; hladini shakti is attributed to Gaudiya doctrine, not a fake reference; the
"poison turned Krishna blue" myth is debunked on chronology; the Sahasranama page states 1,007 sung
lines and explains the 1000/1008 difference rather than overclaiming.

**System built:** `faq` frontmatter field; `lib/schema.ts` connected JSON-LD @graph (BreadcrumbList +
Article + WebPage + FAQPage + ImageObject) wired to the site #organization/#website nodes; `app/og/route.tsx`
branded dynamic OG (a route handler, NOT a metadata file, because Next 16 forbids `opengraph-image`
inside the `[...slug]` catch-all); twitter cards.

**Art:** 11 bespoke gpt-image-2 images, one distinct scene each (no repeated flute pose), faces visible
and never cropped, no text on art, WebP ~300KB.

**Gotchas worth remembering:**

- `source .env` breaks unless values with parentheses are quoted (the Reddit UA). Now quoted.
- Serper returns NO `peopleAlsoAsk` on this plan. Use Serper **autocomplete** + Reddit OAuth search
  for demand mining instead.
- `npm start` silently keeps serving a STALE build if an old server still holds the port (EADDRINUSE
  in the log). Always confirm the port is free after killing, or you will QA the wrong build.
- Browser screenshots can capture before the Next image optimizer paints; scroll to force a repaint
  before concluding an image is broken.

**Still open (next session):** more pages toward the weekly cadence (Janmashtami, Radhashtami, Banke
Bihari, Vrindavan/Barsana temples, Daily Darshan, Images); the `/images` and `/daily-darshan` routes
have nav links but no content yet; merge `revamp/foundation` to main and point live radhakrishna.com
at it when the founder approves.

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
