const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  eslint: {
    dirs: ['pages', 'components', 'lib', 'layouts', 'scripts'],
  },
  turbopack: {
    // This repo sits under other directories that also contain lockfiles, so pin
    // the workspace root explicitly rather than let Turbopack infer it.
    root: __dirname,
    rules: {
      // Replaces the old @svgr/webpack rule: .svg imports become React components.
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
})
