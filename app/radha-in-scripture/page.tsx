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
  title: "Radha in the Scriptures",
  description,
  alternates: { canonical: "/radha-in-scripture" },
  ...ogMeta({
    title: "Radha in the Scriptures",
    description,
    url: "/radha-in-scripture",
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
    name: "Scripture",
    meaning:
      "A Purana or other canonical text carries it, with chapter and verse. How old that text is sits beside its name, because a Mahapurana composed late is a Mahapurana still.",
  },
  {
    name: "Devotional text",
    meaning:
      "A named work outside the Puranic canon: a poet, a commentator, a sampradaya handbook. Jayadeva is here. So is Rupa Goswami. Some of the most beloved things ever written about Radha sit under this label.",
  },
  {
    name: "Tradition",
    meaning:
      "A sampradaya holds it and teaches it, and the school is named so you know whose voice is speaking. What a living tradition holds is not a lesser thing than a verse.",
  },
  {
    name: "Braj legend",
    meaning:
      "Braj has carried it, sometimes for five hundred years, in its lanes and its lila plays rather than in a manuscript. Loved, and worth knowing as what it is.",
  },
  {
    name: "Modern retelling",
    meaning:
      "It reached us through television, film and popular writing. Widely believed, and traceable to no older source.",
  },
];

export default function ConcordancePage() {
  const topics = populatedTopics();

  // schema.org Dataset, because that is what this is: a versioned, citable
  // reference asset with its own identity, not an article about one.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": `${site.url}/radha-in-scripture#dataset`,
    name: "The Radha Krishna Scripture Concordance",
    description,
    url: `${site.url}/radha-in-scripture`,
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
        <span>Radha in the Scriptures</span>
      </nav>

      <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-gold">
        Reference
      </p>
      <h1 className="mt-2 text-balance font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
        Radha in the Scriptures
      </h1>

      <div className="mt-6 rounded-2xl border border-gold/30 bg-gold/5 p-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-gold">
          The short answer
        </p>
        <p className="text-lg leading-relaxed text-foreground">
          Radha is sung in more voices than any other figure in the tradition.
          The Puranas name her, the poets adore her, and each sampradaya holds
          her in its own way, so a devotee who reads only one of them meets only
          part of her. This page gathers what each named scripture and each
          school actually says, with chapter and verse, so that the whole of her
          is in view at once.
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
          A verse in a named text, a school&apos;s teaching, and a story Braj
          has told for centuries are three different kinds of statement, and all
          three are treasured. The label is here so you always know which one is
          speaking. None of them means a claim is worth less. A Braj legend
          carried by the lanes for five hundred years is not a lesser thing than
          a numbered verse. It is a different thing, and knowing which you hold
          only makes the holding richer.
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
          This was gathered so it could be used, not only read. Every row has
          its own anchor, so a single claim can be linked on its own rather than
          pointing at the whole page, and the version is given because rows are
          corrected as more sources are checked. Released under{" "}
          <a
            href="https://creativecommons.org/licenses/by-sa/4.0/"
            target="_blank"
            rel="noopener noreferrer license"
            className="text-divine hover:underline"
          >
            CC BY-SA 4.0
          </a>
          , so any devotee, teacher or temple may reuse it freely with credit to the {site.foundation.label}.
        </p>
      </section>
    </div>
  );
}
