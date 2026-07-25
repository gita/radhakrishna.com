import type { Metadata } from "next";

/**
 * The social card for a page.
 *
 * Every page gets its own drawn card from /og rather than a bare content image.
 * The art is WebP at roughly 3:2, and a social card has to be PNG or JPEG at
 * 1.91:1: X and WhatsApp render nothing at all for a WebP card, and every
 * network crops 3:2 to its own ratio. The card carries the art in its own
 * column, so a shared link still shows the page's own picture.
 */
export function ogCard({
  title,
  eyebrow,
  image,
}: {
  title: string;
  eyebrow?: string;
  image?: string;
}) {
  return (
    `/og?title=${encodeURIComponent(title)}` +
    (eyebrow ? `&eyebrow=${encodeURIComponent(eyebrow)}` : "") +
    (image ? `&img=${encodeURIComponent(image)}` : "")
  );
}

/** The openGraph and twitter blocks for a page, pointing at its own card. */
export function ogMeta({
  title,
  description,
  url,
  eyebrow,
  image,
  type = "website",
}: {
  title: string;
  description?: string;
  url?: string;
  eyebrow?: string;
  image?: string;
  type?: "website" | "article";
}): Pick<Metadata, "openGraph" | "twitter"> {
  const card = ogCard({ title, eyebrow, image });
  return {
    openGraph: {
      title,
      description,
      ...(url ? { url } : {}),
      type,
      images: [{ url: card, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [card],
    },
  };
}
