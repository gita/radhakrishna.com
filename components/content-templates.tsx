import Link from "next/link";
import Image from "next/image";
import { MDXBody } from "@/components/mdx";
import { inCluster, related, type Doc } from "@/lib/content";

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
        <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-2xl ring-1 ring-gold/20">
          <Image
            src={doc.image}
            alt={doc.imageAlt ?? doc.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>
      ) : null}

      {doc.answer ? (
        <div className="mt-8 rounded-2xl border border-gold/30 bg-gold/5 p-6">
          <p className="text-lg leading-relaxed text-foreground">
            {doc.answer}
          </p>
        </div>
      ) : null}

      {doc.tldr?.length ? (
        <div className="mt-8 rounded-2xl border border-border bg-secondary/40 p-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-divine">
            Key takeaways
          </p>
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/90">
            {doc.tldr.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="prose prose-lg mt-8 max-w-none prose-headings:font-serif prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-divine prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-img:rounded-xl prose-blockquote:border-gold">
        <MDXBody code={doc.body} />
      </div>

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

      {rel.length ? (
        <section className="mt-12 border-t border-border pt-8">
          <h2 className="font-serif text-xl font-semibold">Continue reading</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {rel.map((r) => (
              <Link
                key={r.url}
                href={r.url}
                className="rounded-xl border border-border bg-card p-4 transition-colors hover:border-gold/50"
              >
                <span className="font-medium hover:text-divine">{r.title}</span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}

export function HubPage({ doc }: { doc: Doc }) {
  const items = inCluster(doc.cluster ?? doc.slug, doc.url);
  return (
    <div className="container py-14 md:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
          {clusterLabel(doc.cluster ?? doc.slug)}
        </p>
        <h1 className="mt-2 text-balance font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
          {doc.title}
        </h1>
        {doc.description ? (
          <p className="mt-4 text-lg text-muted-foreground">
            {doc.description}
          </p>
        ) : null}
      </div>

      {doc.body ? (
        <div className="prose prose-lg mx-auto mt-8 max-w-2xl prose-headings:font-serif prose-a:text-divine">
          <MDXBody code={doc.body} />
        </div>
      ) : null}

      {items.length ? (
        <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <Link
              key={it.url}
              href={it.url}
              className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:border-gold/50"
            >
              {it.image ? (
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={it.image}
                    alt={it.imageAlt ?? it.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
              ) : null}
              <div className="p-5">
                <h3 className="font-serif text-lg font-semibold group-hover:text-divine">
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
    </div>
  );
}
