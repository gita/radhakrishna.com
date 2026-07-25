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
            date: s.isodate(),
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

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    clean: true,
  },
  collections: { content },
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }]],
  },
});
