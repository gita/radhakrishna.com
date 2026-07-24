import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { docs, findByUrl } from "@/lib/content";
import { ArticlePage, HubPage } from "@/components/content-templates";

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
  return {
    title: doc.title,
    description: doc.description,
    alternates: { canonical: doc.url },
    openGraph: {
      title: doc.title,
      description: doc.description,
      url: doc.url,
      type: doc.type === "hub" ? "website" : "article",
      images: doc.image ? [doc.image] : undefined,
    },
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const doc = findByUrl("/" + slug.join("/"));
  if (!doc) notFound();
  return doc.type === "hub" ? <HubPage doc={doc} /> : <ArticlePage doc={doc} />;
}
