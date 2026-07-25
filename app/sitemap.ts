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
  const staticRoutes: MetadataRoute.Sitemap = ["/images", "/daily-darshan", "/app"].map((p) => ({
    url: site.url + p,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));
  return [home, ...pages, ...staticRoutes];
}
