import type { Metadata } from "next";
import Link from "next/link";
import { docs } from "@/lib/content";
import { site } from "@/lib/site";
import { LightboxImage } from "@/components/lightbox-image";

export const metadata: Metadata = {
  title: "Radha Krishna images",
  description:
    "Original Radha Krishna art made for this site: Vrindavan leelas, Srimati Radharani, and the festivals of Braj. Free to view, in high resolution.",
  alternates: { canonical: "/images" },
};

/**
 * The gallery is assembled from the art already attached to our pages, so a new
 * article automatically appears here. Each piece keeps its caption and alt text
 * and links back to the page it illustrates.
 */
export default function ImagesPage() {
  const gallery = docs
    .filter((d) => d.image && d.type !== "hub")
    .map((d) => ({
      src: d.image!,
      alt: d.imageAlt ?? d.title,
      title: d.title,
      href: d.url,
    }));

  const graph = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "@id": `${site.url}/images#gallery`,
    name: "Radha Krishna images",
    description: metadata.description,
    isPartOf: { "@id": `${site.url}/#website` },
    publisher: { "@id": `${site.foundation.href}/#organization` },
    image: gallery.map((g) => ({
      "@type": "ImageObject",
      contentUrl: `${site.url}${g.src}`,
      caption: g.alt,
      isBasedOn: `${site.url}${g.href}`,
    })),
  };

  return (
    <div className="container py-14 md:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
          Images
        </p>
        <h1 className="mt-2 text-balance font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
          Radha Krishna images
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Original art made for this site: the leelas of Vrindavan, Srimati
          Radharani, and the festivals of Braj. Tap any picture to see it full
          screen.
        </p>
      </div>

      {gallery.length ? (
        <div className="mx-auto mt-12 grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((g) => (
            <div key={g.src}>
              <LightboxImage src={g.src} alt={g.alt} caption={g.alt} />
              <Link
                href={g.href}
                className="mt-2 block text-center font-serif text-sm font-semibold hover:text-divine"
              >
                {g.title}
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-12 text-center text-muted-foreground">
          New art is added here every week.
        </p>
      )}
    </div>
  );
}
