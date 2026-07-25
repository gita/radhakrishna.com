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
  // Dev only: allow the loopback IP as well as localhost, otherwise Next treats
  // http://127.0.0.1 as a cross origin dev request and the client never hydrates.
  allowedDevOrigins: ["127.0.0.1", "localhost", "192.168.1.5"],
  // Cap build workers when BUILD_LOW_MEM is set. Vercel has plenty of memory, so
  // this only helps constrained local machines avoid an OOM during static export.
  ...(process.env.BUILD_LOW_MEM ? { experimental: { cpus: 2 } } : {}),
  // Pin the workspace root so stray parent lockfiles don't confuse Turbopack.
  turbopack: {
    root: import.meta.dirname,
  },
  images: {
    // Serve modern formats; masters are high-res, downscaled per breakpoint.
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    // 301 rather than Next's default 308. Google treats both as permanent and
    // passes signals identically, but 301 is understood by every old crawler,
    // proxy and tool, and these are GET-only content URLs.
    return legacyRedirects.map(([source, destination]) => ({
      source,
      destination,
      statusCode: 301,
    }));
  },
};

export default nextConfig;
