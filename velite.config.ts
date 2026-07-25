import { defineConfig, defineCollection, s } from "velite";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";

/**
 * Typed MDX content layer (docs/02 §5, docs/03 §1). One `content` collection under
 * content/; the URL is derived from the file path, and `type` selects the template.
 * Runs via the `velite` step before `next build`/`next dev` (Turbopack-compatible).
 */
const content = defineCollection({
  name: "Content",
  pattern: "**/*.mdx",
  schema: s
    .object({
      title: s.string().max(120),
      // path relative to the collection root, e.g. "questions/why-...". Drives the URL.
      path: s.path(),
      type: s
        .enum([
          "hub",
          "question",
          "story",
          "deity",
          "prayer",
          "festival",
          "temple",
          "gallery",
          "page",
        ])
        .default("page"),
      cluster: s.string().optional(),
      description: s.string().max(300).optional(),
      // The self-contained answer-first block (question pages).
      question: s.string().optional(),
      answer: s.string().optional(),
      tldr: s.array(s.string()).default([]),
      image: s.string().optional(),
      imageAlt: s.string().optional(),
      date: s.isodate().optional(),
      updated: s.isodate().optional(),
      tags: s.array(s.string()).default([]),
      related: s.array(s.string()).default([]),
      // When the hero image is a photograph rather than our own art, it carries
      // the same credit the gallery does. CC BY and CC BY-SA permit use only
      // with attribution, so a licensed photo shown without one is a breach,
      // not an oversight.
      imageCredit: s.string().optional(),
      imageLicence: s.string().optional(),
      imageLicenceUrl: s.string().optional(),
      imageSource: s.string().optional(),
      // Real photographs of a real place. A temple photo is the photographer's
      // copyright even though the building is public, and the CC licences these
      // come under permit reuse only with credit, so `credit`, `licence` and
      // `source` are required, not optional. A photo whose photographer cannot
      // be named does not ship (CLAUDE.md).
      photos: s
        .array(
          s.object({
            src: s.string(),
            alt: s.string(),
            credit: s.string(),
            licence: s.string(),
            licenceUrl: s.string().optional(),
            source: s.string(),
          }),
        )
        .default([]),
      // Genuine Q&A, mirrored in-body; feeds FAQPage schema where present (docs/02 §5).
      faq: s
        .array(s.object({ question: s.string(), answer: s.string() }))
        .default([]),
      sources: s
        .array(s.object({ text: s.string(), url: s.string().optional() }))
        .default([]),
      // Festivals move each year with the lunar calendar. The page stays evergreen
      // and accrues authority; only this list is updated, so a stale year is
      // visible rather than silently wrong. Feeds Event schema (docs/03 §5).
      occurrences: s
        .array(
          s.object({
            year: s.number(),
            // `date` is the primary observance. Where smarta and vaishnava fall on
            // different days (ashtami spanning midnight), give both: the smarta
            // day is the earlier one, the vaishnava day the later.
            date: s.isodate(),
            smarta: s.isodate().optional(),
            vaishnava: s.isodate().optional(),
            // Where the date came from. Dates are taken from Indian panchang
            // authorities (Drik Panchang, the ISKCON Vaishnava calendar), never
            // from our own computation; the ephemeris check only cross-verifies.
            source: s.string().optional(),
            note: s.string().optional(),
          }),
        )
        .default([]),
      // Place pages (temples, towns) feed Place / LocalBusiness schema.
      place: s
        .object({
          name: s.string(),
          locality: s.string().optional(),
          region: s.string().optional(),
          country: s.string().default("IN"),
          latitude: s.number().optional(),
          longitude: s.number().optional(),
        })
        .optional(),
      draft: s.boolean().default(false),
      body: s.mdx(),
    })
    .transform((data) => ({
      ...data,
      // "content/questions/why-..." -> "/questions/why-..."; index files map to the folder
      url: "/" + data.path.replace(/(^|\/)index$/, "$1").replace(/\/$/, ""),
      slug: data.path.split("/").pop() as string,
    })),
});

/**
 * The Radha Krishna Scripture Concordance (docs/01 §5, docs/02 §6, P1-4).
 *
 * One named, versioned dataset, not a table restamped on each page. Nobody else
 * assembles what each named text and each sampradaya actually says about Radha's
 * marriage, her husband, her identity, side by side with chapter and verse. That
 * is the information gain, and it is the one thing on this site a thin blog
 * cannot copy by rewriting.
 *
 * Every claim is its own extractable node with a stable `id`, so it can be cited,
 * linked and anchored. `<ScriptureTable>` renders slices of this; the dataset is
 * the asset, the tables are only its surface.
 *
 * `label` is the transparency layer, and it is required. A reader must always be
 * able to tell a verse in a named text from a tradition's teaching from a folk
 * story, because conflating those is the single biggest failure of the pages
 * this site is competing with.
 */
const concordance = defineCollection({
  name: "ConcordanceClaim",
  pattern: "concordance/*.yaml",
  schema: s.object({
    // Stable and citable. Never renamed once published: it is an anchor target.
    id: s.string(),
    topic: s.enum(["marriage", "husband", "identity", "death", "rukmini"]),
    // The named text, school, or body of material the claim comes from.
    source: s.string(),
    approxDate: s.string().optional(),
    sampradaya: s.string().optional(),
    label: s.enum([
      "explicitly in scripture",
      "later devotional literature",
      "taught within a tradition",
      "folk legend",
      "modern retelling",
    ]),
    // What it actually says. Never a paraphrase of another site's paraphrase.
    says: s.string(),
    // Chapter and verse wherever the text is numbered. Absent only when the
    // material genuinely carries no numbered reference, which is itself a fact
    // worth stating on the page rather than papering over.
    citation: s.string().optional(),
    url: s.string().optional(),
    verified: s.isodate(),
  }),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    clean: true,
  },
  collections: { content, concordance },
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }]],
  },
});
