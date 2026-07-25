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

  // A recurring festival: one Event per listed year, so a search engine can
  // surface the right date rather than guessing from prose.
  if (doc.occurrences?.length) {
    for (const o of doc.occurrences) {
      graph.push({
        "@type": "Event",
        "@id": `${pageUrl}#event-${o.year}`,
        name: `${doc.title} ${o.year}`,
        startDate: o.date,
        eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
        eventStatus: "https://schema.org/EventScheduled",
        description: doc.description ?? doc.answer,
        ...(image ? { image } : {}),
        organizer: org,
        ...(doc.place
          ? {
              location: {
                "@type": "Place",
                name: doc.place.name,
                address: {
                  "@type": "PostalAddress",
                  ...(doc.place.locality
                    ? { addressLocality: doc.place.locality }
                    : {}),
                  ...(doc.place.region
                    ? { addressRegion: doc.place.region }
                    : {}),
                  addressCountry: doc.place.country,
                },
              },
            }
          : {}),
      });
    }
  }

  if (doc.place && !doc.occurrences?.length) {
    graph.push({
      "@type": "Place",
      "@id": `${pageUrl}#place`,
      name: doc.place.name,
      ...(image ? { image } : {}),
      address: {
        "@type": "PostalAddress",
        ...(doc.place.locality ? { addressLocality: doc.place.locality } : {}),
        ...(doc.place.region ? { addressRegion: doc.place.region } : {}),
        addressCountry: doc.place.country,
      },
      ...(doc.place.latitude != null && doc.place.longitude != null
        ? {
            geo: {
              "@type": "GeoCoordinates",
              latitude: doc.place.latitude,
              longitude: doc.place.longitude,
            },
          }
        : {}),
    });
  }

  if (doc.faq?.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      mainEntity: doc.faq.map((f) => ({
        "@type": "Question",
        name: f.question,
        // Answers carry paragraph breaks for the reader; schema.org wants one
        // flat string, so collapse them rather than emitting raw newlines.
        acceptedAnswer: {
          "@type": "Answer",
          text: f.answer.replace(/\s+/g, " ").trim(),
        },
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}
