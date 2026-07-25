/**
 * Connected JSON-LD graph for content pages (docs/03 §5-6).
 * One @graph per page: BreadcrumbList + Article + (FAQPage) + (ImageObject),
 * all wired to the site-wide Organization and WebSite nodes emitted in app/layout.tsx
 * (#organization, #website) so the entities connect instead of floating.
 * Author is the foundation (organizational authorship); we do not fabricate a person.
 */
import type { Doc } from "@/lib/content";
import { site } from "@/lib/site";

const CLUSTER_LABEL: Record<string, string> = {
  "radha-krishna": "Radha Krishna",
  radha: "Radha",
  krishna: "Krishna",
  stories: "Stories",
  questions: "Questions",
  teachings: "Teachings",
  mantras: "Prayers",
  stotras: "Stotras",
  aartis: "Aartis",
  bhajans: "Bhajans",
  festivals: "Festivals",
  temples: "Temples",
  places: "Places",
  images: "Images",
};

function clusterLabel(c?: string) {
  if (!c) return "";
  return CLUSTER_LABEL[c] ?? c.replace(/-/g, " ");
}

/** Build the page's JSON-LD @graph. Returns a plain object ready to JSON.stringify. */
export function articleGraph(doc: Doc) {
  const pageUrl = `${site.url}${doc.url}`;
  const org = { "@id": `${site.foundation.href}/#organization` };
  const website = { "@id": `${site.url}/#website` };
  const published = doc.date ?? doc.updated;
  const modified = doc.updated ?? doc.date;

  const breadcrumbItems = [
    { name: "Home", item: site.url },
    doc.cluster
      ? { name: clusterLabel(doc.cluster), item: `${site.url}/${doc.cluster}` }
      : null,
    { name: doc.title, item: pageUrl },
  ].filter(Boolean) as { name: string; item: string }[];

  const graph: Record<string, unknown>[] = [];

  graph.push({
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: breadcrumbItems.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: b.name,
      item: b.item,
    })),
  });

  const image = doc.image ? `${site.url}${doc.image}` : undefined;
  if (image) {
    graph.push({
      "@type": "ImageObject",
      "@id": `${pageUrl}#primaryimage`,
      url: image,
      contentUrl: image,
      caption: doc.imageAlt ?? doc.title,
    });
  }

  graph.push({
    "@type": "Article",
    "@id": `${pageUrl}#article`,
    isPartOf: { "@id": pageUrl },
    headline: doc.title,
    description: doc.description ?? doc.answer,
    inLanguage: site.locale,
    ...(published ? { datePublished: published } : {}),
    ...(modified ? { dateModified: modified } : {}),
    author: org,
    publisher: org,
    mainEntityOfPage: pageUrl,
    ...(image ? { image: { "@id": `${pageUrl}#primaryimage` } } : {}),
    ...(doc.tags?.length ? { keywords: doc.tags } : {}),
  });

  graph.push({
    "@type": "WebPage",
    "@id": pageUrl,
    url: pageUrl,
    name: doc.title,
    description: doc.description ?? doc.answer,
    isPartOf: website,
    inLanguage: site.locale,
    breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
    ...(image
      ? { primaryImageOfPage: { "@id": `${pageUrl}#primaryimage` } }
      : {}),
  });

  if (doc.faq?.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      mainEntity: doc.faq.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}
