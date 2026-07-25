import Link from "next/link";
import Image from "next/image";
import { MDXBody } from "@/components/mdx";
import { inCluster, related, type Doc } from "@/lib/content";
import { articleGraph } from "@/lib/schema";
import { LightboxImage } from "@/components/lightbox-image";
import { PlaceGallery } from "@/components/place-gallery";

/**
 * Credit for a hero image that is someone else's photograph. Renders nothing for
 * our own art. CC BY and CC BY-SA allow reuse only with attribution, so this is
 * a condition of showing the picture at all, not a courtesy.
 */
function HeroCredit({ doc }: { doc: Doc }) {
  if (!doc.imageCredit) return null;
  return (
    <span className="mt-1.5 block text-xs text-muted-foreground">
      Photograph by {doc.imageCredit}
      {doc.imageLicence ? (
        <>
          {", "}
          {doc.imageLicenceUrl ? (
            <a
              href={doc.imageLicenceUrl}
              target="_blank"
              rel="noopener noreferrer license"
              className="underline decoration-dotted underline-offset-2 hover:text-divine"
            >
              {doc.imageLicence}
            </a>
          ) : (
            doc.imageLicence
          )}
        </>
      ) : null}
      {doc.imageSource ? (
        <>
          {", via "}
          <a
            href={doc.imageSource}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-dotted underline-offset-2 hover:text-divine"
          >
            Wikimedia Commons
          </a>
        </>
      ) : null}
    </span>
  );
}
import {
  ShortAnswer,
  KeyTakeaways,
  FaqBlock,
  RelatedCards,
  FestivalDates,
} from "@/components/content-blocks";

const CLUSTER_LABEL: Record<string, string> = {
  "radha-krishna": "Radha Krishna",
  radha: "Radha",
  krishna: "Krishna",
  stories: "Stories",
  questions: "Questions",
  teachings: "Teachings",
  mantras: "Prayers",
  stotras: "Stotras",
  aartis: "Aartis",
  bhajans: "Bhajans",
  festivals: "Festivals",
  temples: "Temples",
  places: "Places",
  images: "Images",
  about: "About",
};

function clusterLabel(c?: string) {
  if (!c) return "";
  return CLUSTER_LABEL[c] ?? c.replace(/-/g, " ");
}

function fmtDate(d?: string) {
  if (!d) return null;
  return new Date(d).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function Breadcrumb({ doc }: { doc: Doc }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground"
    >
      <Link href="/" className="hover:text-divine">
        Home
      </Link>
      {doc.cluster ? (
        <>
          <span aria-hidden>/</span>
          <Link href={`/${doc.cluster}`} className="hover:text-divine">
            {clusterLabel(doc.cluster)}
          </Link>
        </>
      ) : null}
    </nav>
  );
}

export function ArticlePage({ doc }: { doc: Doc }) {
  const rel = related(doc);
  const updated = fmtDate(doc.updated ?? doc.date);
  return (
    <article className="container max-w-3xl py-12 md:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleGraph(doc)) }}
      />
      <Breadcrumb doc={doc} />
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
        {clusterLabel(doc.cluster)}
      </p>
      <h1 className="text-balance font-serif text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl">
        {doc.title}
      </h1>
      {updated ? (
        <p className="mt-4 text-sm text-muted-foreground">
          Last updated {updated}
        </p>
      ) : null}

      {doc.image ? (
        <LightboxImage
          className="mt-8"
          src={doc.image}
          alt={doc.imageAlt ?? doc.title}
          caption={
            <>
              {doc.imageAlt}
              <HeroCredit doc={doc} />
            </>
          }
          priority
        />
      ) : null}

      {doc.answer ? <ShortAnswer>{doc.answer}</ShortAnswer> : null}
      <FestivalDates title={doc.title} occurrences={doc.occurrences ?? []} />
      <KeyTakeaways items={doc.tldr ?? []} />

      <div className="article-prose prose prose-lg mt-8 max-w-none prose-headings:font-serif prose-headings:font-semibold prose-headings:tracking-tight prose-strong:text-foreground prose-img:rounded-xl">
        <MDXBody code={doc.body} />
      </div>

      <PlaceGallery photos={doc.photos ?? []} />

      <FaqBlock faq={doc.faq ?? []} />

      {doc.sources?.length ? (
        <section className="mt-12 border-t border-border pt-6">
          <h2 className="font-serif text-lg font-semibold">Sources</h2>
          <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
            {doc.sources.map((s, i) => (
              <li key={i}>
                {s.url ? (
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-divine"
                  >
                    {s.text}
                  </a>
                ) : (
                  s.text
                )}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <RelatedCards items={rel} />
    </article>
  );
}

export function HubPage({ doc }: { doc: Doc }) {
  const items = inCluster(doc.cluster ?? doc.slug, doc.url);
  return (
    <div className="container py-14 md:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleGraph(doc)) }}
      />
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
          {clusterLabel(doc.cluster ?? doc.slug)}
        </p>
        <h1 className="mt-2 text-balance font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
          {doc.title}
        </h1>
        {/* A hub orients, so it leads with the answer and then the shelf. The
            longer prose sits below the grid as supporting reading, not as the
            first thing between a visitor and the pages they came for. */}
        <p className="mt-4 text-lg text-muted-foreground">
          {doc.answer ?? doc.description}
        </p>
      </div>

      {items.length ? (
        <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <Link
              key={it.url}
              href={it.url}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-md"
            >
              <div className="relative aspect-[16/10] shrink-0 overflow-hidden bg-secondary">
                {it.image ? (
                  <Image
                    src={it.image}
                    alt={it.imageAlt ?? it.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                ) : null}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-serif text-lg font-semibold leading-snug group-hover:text-divine">
                  {it.title}
                </h3>
                {it.description ? (
                  <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
                    {it.description}
                  </p>
                ) : null}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="mt-12 text-center text-muted-foreground">
          New pages are being added here every week.
        </p>
      )}

      {doc.body ? (
        <div className="mx-auto mt-16 max-w-3xl border-t border-border pt-12">
          <div className="article-prose prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-semibold prose-headings:tracking-tight prose-strong:text-foreground">
            <MDXBody code={doc.body} />
          </div>
          <div className="mx-auto max-w-3xl">
            <FaqBlock faq={doc.faq ?? []} />
          </div>
        </div>
      ) : null}
    </div>
  );
}

/**
 * A prayer or lyrics page. The sacred text is the reason someone is here, so the
 * page gives it the stage: a short orientation, then the prayer itself. Takeaways,
 * FAQ and sources sit underneath rather than between the reader and the words.
 */
export function PrayerPage({ doc }: { doc: Doc }) {
  const rel = related(doc);
  const updated = fmtDate(doc.updated ?? doc.date);
  return (
    <article className="container max-w-3xl py-12 md:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleGraph(doc)) }}
      />
      <Breadcrumb doc={doc} />
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
        {clusterLabel(doc.cluster)}
      </p>
      <h1 className="text-balance font-serif text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl">
        {doc.title}
      </h1>
      {updated ? (
        <p className="mt-4 text-sm text-muted-foreground">
          Last updated {updated}
        </p>
      ) : null}

      {doc.image ? (
        <LightboxImage
          className="mt-8"
          src={doc.image}
          alt={doc.imageAlt ?? doc.title}
          caption={
            <>
              {doc.imageAlt}
              <HeroCredit doc={doc} />
            </>
          }
          priority
        />
      ) : null}

      {doc.answer ? (
        <p className="mt-8 text-lg leading-relaxed text-foreground/90">
          {doc.answer}
        </p>
      ) : null}

      <div className="article-prose prayer-prose prose prose-lg mt-8 max-w-none prose-headings:font-serif prose-headings:font-semibold prose-headings:tracking-tight prose-strong:text-foreground">
        <MDXBody code={doc.body} />
      </div>

      <KeyTakeaways items={doc.tldr ?? []} />
      <FaqBlock faq={doc.faq ?? []} />

      {doc.sources?.length ? (
        <section className="mt-12 border-t border-border pt-6">
          <h2 className="font-serif text-lg font-semibold">Sources</h2>
          <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
            {doc.sources.map((s, i) => (
              <li key={i}>
                {s.url ? (
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-divine"
                  >
                    {s.text}
                  </a>
                ) : (
                  s.text
                )}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <RelatedCards items={rel} />
    </article>
  );
}
