import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { docs, findByUrl } from "@/lib/content";
import {
  ArticlePage,
  HubPage,
  PrayerPage,
} from "@/components/content-templates";

type Params = { slug: string[] };

export function generateStaticParams(): Params[] {
  return docs.map((d) => ({ slug: d.url.replace(/^\//, "").split("/") }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = findByUrl("/" + slug.join("/"));
  if (!doc) return {};
  const eyebrow = doc.cluster ? doc.cluster.replace(/-/g, " ") : undefined;
  const ogImage =
    doc.image ??
    `/og?title=${encodeURIComponent(doc.title)}${
      eyebrow ? `&eyebrow=${encodeURIComponent(eyebrow)}` : ""
    }`;
  return {
    title: doc.title,
    description: doc.description,
    alternates: { canonical: doc.url },
    openGraph: {
      title: doc.title,
      description: doc.description,
      url: doc.url,
      type: doc.type === "hub" ? "website" : "article",
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: doc.title,
      description: doc.description,
      images: [ogImage],
    },
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const doc = findByUrl("/" + slug.join("/"));
  if (!doc) notFound();
  if (doc.type === "hub") return <HubPage doc={doc} />;
  if (doc.type === "prayer") return <PrayerPage doc={doc} />;
  return <ArticlePage doc={doc} />;
}
