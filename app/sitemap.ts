import type { MetadataRoute } from "next";
import { docs } from "@/lib/content";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const home: MetadataRoute.Sitemap[number] = {
    url: site.url,
    lastModified: now,
    changeFrequency: "daily",
    priority: 1,
  };
  const pages = docs.map((d) => ({
    url: site.url + d.url,
    lastModified: (d.updated ?? d.date) ? new Date(d.updated ?? d.date!) : now,
    changeFrequency: "weekly" as const,
    priority: d.type === "hub" ? 0.8 : 0.7,
  }));
  // Static routes live outside the content collection, so list them explicitly.
  const staticRoutes: MetadataRoute.Sitemap = [
    "/images",
    "/daily-darshan",
    "/app",
    "/about",
    "/privacy",
  ].map((p) => ({
    url: site.url + p,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));
  // The concordance is the site's reference asset, not an ordinary page: it is
  // what the scripture tables everywhere else are surfaces of (docs/01 §5), so
  // it ranks with the hubs rather than with the utility pages.
  const concordance: MetadataRoute.Sitemap[number] = {
    url: site.url + "/radha-in-scripture",
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  };
  return [home, ...pages, concordance, ...staticRoutes];
}
