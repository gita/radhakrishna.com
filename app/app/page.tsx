import type { Metadata } from "next";
import { ogMeta } from "@/lib/og";
import Image from "next/image";
import { appLinks, site } from "@/lib/site";

const description =
  "Read and listen to the Bhagavad Gita, verse by verse, in Hindi and English. Free on iOS and Android.";

export const metadata: Metadata = {
  title: "Get the Bhagavad Gita app",
  description,
  alternates: { canonical: "/app" },
  ...ogMeta({
    title: "Get the Bhagavad Gita app",
    description,
    url: "/app",
    eyebrow: "app",
  }),
};

/**
 * Smart link behind every app CTA: one shareable URL for the app, so links and
 * printed material do not have to pick a store up front.
 */
export default function AppPage() {
  return (
    <div className="container max-w-2xl py-16 text-center md:py-24">
      <Image
        src="/brand/gita-app-icon.webp"
        alt="Bhagavad Gita app icon"
        width={144}
        height={144}
        className="mx-auto size-20 rounded-[1.15rem] shadow-md ring-1 ring-black/5"
      />
      <h1 className="mt-6 text-balance font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
        The Bhagavad Gita, in your pocket
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Read and listen to every verse in Hindi and English, with meaning and
        commentary. Free, from the {site.foundation.label}.
      </p>

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a
          href={appLinks.ios}
          target="_blank"
          rel="noopener noreferrer"
          data-analytics="app-page-ios"
          className="w-full rounded-full bg-divine px-7 py-3 font-semibold text-background transition-opacity hover:opacity-90 sm:w-auto"
        >
          Download on iPhone
        </a>
        <a
          href={appLinks.android}
          target="_blank"
          rel="noopener noreferrer"
          data-analytics="app-page-android"
          className="w-full rounded-full border border-border px-7 py-3 font-semibold transition-colors hover:border-gold/50 hover:text-divine sm:w-auto"
        >
          Download on Android
        </a>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MobileApplication",
            name: "Bhagavad Gita",
            applicationCategory: "LifestyleApplication",
            operatingSystem: "iOS, Android",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            publisher: { "@id": `${site.foundation.href}/#organization` },
          }),
        }}
      />
    </div>
  );
}
