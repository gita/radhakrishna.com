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
