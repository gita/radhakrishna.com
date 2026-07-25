import { content } from "#content";

export type Doc = (typeof content)[number];

/** All non-draft docs. */
export const docs: Doc[] = content.filter((d) => !d.draft);

export function allUrls(): string[] {
  return docs.map((d) => d.url);
}

export function findByUrl(url: string): Doc | undefined {
  const clean = "/" + url.replace(/^\/+/, "").replace(/\/+$/, "");
  return docs.find((d) => d.url === clean);
}

/** Content items in a cluster (excluding the cluster hub itself). */
export function inCluster(cluster: string, excludeUrl?: string): Doc[] {
  return docs
    .filter(
      (d) => d.cluster === cluster && d.type !== "hub" && d.url !== excludeUrl,
    )
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function related(doc: Doc): Doc[] {
  if (!doc.related?.length) return [];
  const resolved = doc.related.map((slug) => ({
    slug,
    doc: docs.find((d) => d.slug === slug || d.url === slug),
  }));
  // A related slug that matches nothing renders as no card at all, which silently
  // strips a page out of the internal link web. Fail loudly at build instead.
  const dangling = resolved.filter((r) => !r.doc).map((r) => r.slug);
  if (dangling.length) {
    throw new Error(
      `${doc.url}: related[] points at slugs that do not exist: ${dangling.join(", ")}. ` +
        `Fix the frontmatter or create the page.`,
    );
  }
  return resolved.map((r) => r.doc!);
}
