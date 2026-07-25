import type { Metadata } from "next";
import { ogMeta } from "@/lib/og";
import { site } from "@/lib/site";

const description =
  "What Radhakrishna.com collects and what it does not. No advertising, no tracking cookies, and no selling of anyone's data.";

export const metadata: Metadata = {
  title: "Privacy",
  description,
  alternates: { canonical: "/privacy" },
  ...ogMeta({
    title: "Privacy",
    description,
    url: "/privacy",
    eyebrow: "privacy",
  }),
};

export default function PrivacyPage() {
  return (
    <div className="container max-w-2xl py-14 md:py-20">
      <h1 className="text-balance font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
        Privacy
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Last updated 25 July 2026
      </p>

      <div className="article-prose prose prose-lg mt-8 max-w-none prose-headings:font-serif prose-headings:font-semibold">
        <p>
          {site.name} is published by the {site.foundation.label}, a non-profit.
          We do not sell advertising and we do not sell anyone&apos;s data.
        </p>

        <h2>Analytics</h2>
        <p>
          We use Plausible Analytics to count page views and see which pages are
          useful. Plausible does not use cookies, does not collect personal
          data, and does not follow you across other websites. The statistics we
          see are aggregate: pages viewed, rough country, browser and referring
          site. We cannot identify an individual reader from them.
        </p>

        <h2>Cookies</h2>
        <p>
          This site sets no advertising or tracking cookies. If you dismiss the
          app banner, that choice is remembered in your own browser&apos;s local
          storage so we do not show it again for a week. It never leaves your
          device and we cannot read it.
        </p>

        <h2>Email</h2>
        <p>
          If you subscribe to updates, we store your email address only to send
          those emails. Every message carries an unsubscribe link, and
          unsubscribing removes the address. We do not share or sell it.
        </p>

        <h2>Links to other sites</h2>
        <p>
          Pages here cite outside sources such as scripture libraries and
          reference works, and link to our own apps on the Apple App Store and
          Google Play. Once you follow one of those links, that site&apos;s own
          privacy policy applies.
        </p>

        <h2>Children</h2>
        <p>
          This is a devotional reading site suitable for all ages. We do not
          knowingly collect personal information from children.
        </p>

        <h2>Contact</h2>
        <p>
          For any question about this policy, or to ask us to remove your email
          address, write to us through the{" "}
          <a
            href={site.foundation.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {site.foundation.label}
          </a>
          .
        </p>
      </div>
    </div>
  );
}
