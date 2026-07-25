import type { Metadata } from "next";
import Link from "next/link";
import { ogMeta } from "@/lib/og";
import { site } from "@/lib/site";
import { ScriptureTable } from "@/components/scripture-table";
import {
  CLAIMS,
  CONCORDANCE_VERSION,
  populatedTopics,
} from "@/lib/concordance";

const description =
  "What each named scripture and each sampradaya actually says about Radha: her marriage, her husband, her identity, with chapter and verse, and every claim labelled by the kind of source it comes from.";

export const metadata: Metadata = {
  title: "The Radha Krishna Scripture Concordance",
  description,
  alternates: { canonical: "/scripture-concordance" },
  ...ogMeta({
    title: "The Radha Krishna Scripture Concordance",
    description,
    url: "/scripture-concordance",
    eyebrow: "reference",
  }),
};

/** The most recent verification date across the dataset. */
function lastVerified() {
  const times = CLAIMS.map((c) => new Date(c.verified).getTime());
  return new Date(Math.max(...times)).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

const LABELS = [
  {
    name: "explicitly in scripture",
    meaning:
      "A Purana or other canonical text says it, with chapter and verse. How old that text is sits beside its name, because a Mahapurana composed late is still a Mahapurana.",
  },
  {
    name: "later devotional literature",
    meaning:
      "A named work outside the Puranic canon says it: a poet, a commentator, a sampradaya handbook. Citable, often beautiful, and not scripture.",
  },
  {
    name: "taught within a tradition",
    meaning:
      "A sampradaya holds it as doctrine. True within that school, and the school is named so you know whose voice it is.",
  },
  {
    name: "folk legend",
    meaning:
      "Braj tells it, and it may be very old, but no text carries it. Loved, and not scripture.",
  },
  {
    name: "modern retelling",
    meaning:
      "It circulates in television, film and popular writing. Widely believed, and traceable to no source.",
  },
];

export default function ConcordancePage() {
  const topics = populatedTopics();

  // schema.org Dataset, because that is what this is: a versioned, citable
  // reference asset with its own identity, not an article about one.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": `${site.url}/scripture-concordance#dataset`,
    name: "The Radha Krishna Scripture Concordance",
    description,
    url: `${site.url}/scripture-concordance`,
    version: CONCORDANCE_VERSION,
    inLanguage: "en",
    license: "https://creativecommons.org/licenses/by-sa/4.0/",
    isAccessibleForFree: true,
    creator: { "@id": `${site.url}/#organization` },
    publisher: { "@id": `${site.url}/#organization` },
    keywords: [
      "Radha",
      "Krishna",
      "Bhagavata Purana",
      "Brahma Vaivarta Purana",
      "Garga Samhita",
      "Gaudiya Vaishnava",
      "Nimbarka",
      "sampradaya",
      "scripture comparison",
    ],
    variableMeasured: topics.map((t) => t.question),
  };

  return (
    <div className="container max-w-4xl py-12 md:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="text-sm text-muted-foreground" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-divine">
          Home
        </Link>
        <span className="px-1.5">/</span>
        <span>Scripture Concordance</span>
      </nav>

      <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-gold">
        Reference
      </p>
      <h1 className="mt-2 text-balance font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
        The Radha Krishna Scripture Concordance
      </h1>

      <div className="mt-6 rounded-2xl border border-gold/30 bg-gold/5 p-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-gold">
          The short answer
        </p>
        <p className="text-lg leading-relaxed text-foreground">
          The questions people ask most about Radha have different answers in
          different texts, and most pages online quietly pick one and present it
          as the answer. This is the comparison instead: what each named
          scripture and each sampradaya actually says, with chapter and verse
          where the text is numbered, and every claim labelled by the kind of
          source it comes from.
        </p>
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        Version {CONCORDANCE_VERSION} · {CLAIMS.length} claims across{" "}
        {topics.length} questions · last verified {lastVerified()}
      </p>

      <section className="mt-12">
        <h2 className="font-serif text-2xl font-semibold tracking-tight">
          How to read the labels
        </h2>
        <p className="mt-3 leading-relaxed text-foreground/85">
          The label is the point of the whole table. A verse in a named text, a
          school&apos;s teaching, and a story Braj has told for centuries are
          three different kinds of statement, and treating them as one is the
          commonest mistake made about Radha. None of these labels means a claim
          is worth less. They mean you know what you are holding.
        </p>
        <dl className="mt-5 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
          {LABELS.map((l) => (
            <div key={l.name} className="p-5 sm:flex sm:gap-6">
              <dt className="shrink-0 font-medium sm:w-56">{l.name}</dt>
              <dd className="mt-1 text-foreground/85 sm:mt-0">{l.meaning}</dd>
            </div>
          ))}
        </dl>
      </section>

      {topics.map((t) => (
        <section key={t.id} className="mt-14">
          <div className="mb-2 flex items-center gap-3">
            <h2
              id={t.id}
              className="scroll-mt-24 font-serif text-2xl font-semibold tracking-tight"
            >
              {t.question}
            </h2>
            <span className="h-px flex-1 bg-gold/40" />
          </div>
          <ScriptureTable topic={t.id} />
        </section>
      ))}

      <section className="mt-14 border-t border-border pt-8">
        <h2 className="font-serif text-xl font-semibold">Citing this</h2>
        <p className="mt-3 leading-relaxed text-foreground/85">
          Every row has its own anchor, so a single claim can be linked on its
          own rather than pointing at the whole page. Cite the version, because
          the dataset is corrected as sources are checked and a row may be
          relabelled. Released under{" "}
          <a
            href="https://creativecommons.org/licenses/by-sa/4.0/"
            target="_blank"
            rel="noopener noreferrer license"
            className="text-divine hover:underline"
          >
            CC BY-SA 4.0
          </a>
          , so anyone may reuse it with credit to the {site.foundation.label}.
        </p>
      </section>
    </div>
  );
}
