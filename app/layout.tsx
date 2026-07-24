import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Crimson_Pro, Noto_Serif_Devanagari } from "next/font/google";
import { site, network, social } from "@/lib/site";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { RevealInit } from "@/components/reveal-init";
import "./globals.css";

// Self-hosted via next/font (no runtime CDN). Subsetted, display:swap. docs/03 §4.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const crimson = Crimson_Pro({
  subsets: ["latin"],
  variable: "--font-crimson",
  display: "swap",
  weight: ["400", "600", "700"],
});
const devanagari = Noto_Serif_Devanagari({
  subsets: ["devanagari", "latin"],
  variable: "--font-devanagari",
  display: "swap",
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.title,
    description: site.description,
    url: site.url,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

/** Connected Organization + WebSite graph (docs/03 §5). Real editorial identity (D15). */
function OrgJsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}/#organization`,
        name: site.name,
        url: site.url,
        description: site.description,
        sameAs: [...network.map((n) => n.href), ...social.map((s) => s.href)],
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        publisher: { "@id": `${site.url}/#organization` },
        inLanguage: "en",
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${crimson.variable} ${devanagari.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans">
        <OrgJsonLd />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <RevealInit />
        {/* Privacy-friendly analytics */}
        <Script
          defer
          data-domain="radhakrishna.com"
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
