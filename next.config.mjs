/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Pin the workspace root so stray parent lockfiles don't confuse Turbopack.
  turbopack: {
    root: import.meta.dirname,
  },
  images: {
    // Serve modern formats; masters are high-res, downscaled per breakpoint.
    formats: ['image/avif', 'image/webp'],
  },
  // Velite (content pipeline) is wired here in the content phase:
  // it builds .velite/ from content/ before/alongside the Next build.
}

export default nextConfig
