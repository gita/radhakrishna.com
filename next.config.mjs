import { readFileSync } from "node:fs";

// Legacy /blog/* URLs -> new cluster URLs (preserve SEO). Generated at migration.
let legacyRedirects = [];
try {
  legacyRedirects = JSON.parse(
    readFileSync(new URL("./content/_redirects.json", import.meta.url), "utf8"),
  );
} catch {
  legacyRedirects = [];
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Pin the workspace root so stray parent lockfiles don't confuse Turbopack.
  turbopack: {
    root: import.meta.dirname,
  },
  images: {
    // Serve modern formats; masters are high-res, downscaled per breakpoint.
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return legacyRedirects.map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },
};

export default nextConfig;
