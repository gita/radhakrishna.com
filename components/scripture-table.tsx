import Link from "next/link";
import { concordanceBy, CONCORDANCE_VERSION } from "@/lib/concordance";

/**
 * A slice of the Radha Krishna Scripture Concordance (docs/01 §5, docs/02 §6).
 *
 * The rows are not written into the page. They are read from the one dataset, so
 * a correction lands everywhere at once and no two pages can drift into
 * disagreeing with each other about what a text says.
 *
 * Every row is an extractable node: it carries its own `id` anchor, so a claim
 * can be linked and cited on its own, which is the whole point of building this
 * as a dataset rather than as prose.
 *
 * The label column is not decoration. Telling a verse in a named text apart from
 * a school's teaching apart from a folk story is the thing the pages we compete
 * with get wrong, and it is why this table exists at all.
 */
const LABEL_STYLE: Record<string, string> = {
  "explicitly in scripture": "bg-divine/10 text-divine",
  "later devotional literature": "bg-gold/15 text-gold-foreground",
  "taught within a tradition": "bg-lotus/15 text-foreground/80",
  "folk legend": "bg-secondary text-muted-foreground",
  "modern retelling": "bg-secondary text-muted-foreground",
};

export function ScriptureTable({
  topic,
  caption,
}: {
  topic: "marriage" | "husband" | "identity" | "death" | "rukmini";
  caption?: string;
}) {
  const rows = concordanceBy(topic);
  if (!rows.length) return null;

  return (
    <figure className="not-prose my-8">
      <div className="table-wrap overflow-x-auto">
        <table className="w-full border-separate border-spacing-0 overflow-hidden rounded-[0.85rem] border border-border text-[0.95rem]">
          <thead className="bg-secondary/65">
            <tr>
              <th className="border-b border-border p-3 text-left font-semibold">
                Text or tradition
              </th>
              <th className="border-b border-border p-3 text-left font-semibold">
                What it says
              </th>
              <th className="border-b border-border p-3 text-left font-semibold">
                How to read it
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={r.id}
                id={r.id}
                className="scroll-mt-24 even:bg-secondary/25"
              >
                <td className="border-b border-border/60 p-3 align-top">
                  <span className="font-medium">{r.source}</span>
                  {r.approxDate ? (
                    <span className="mt-0.5 block text-xs text-muted-foreground">
                      {r.approxDate}
                    </span>
                  ) : null}
                  {r.sampradaya ? (
                    <span className="mt-0.5 block text-xs text-muted-foreground">
                      {r.sampradaya}
                    </span>
                  ) : null}
                </td>
                <td className="border-b border-border/60 p-3 align-top">
                  {r.says}
                  {r.citation ? (
                    <span className="mt-1 block text-xs text-muted-foreground">
                      {r.url ? (
                        <a
                          href={r.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline decoration-dotted underline-offset-2 hover:text-divine"
                        >
                          {r.citation}
                        </a>
                      ) : (
                        r.citation
                      )}
                    </span>
                  ) : null}
                </td>
                <td className="border-b border-border/60 p-3 align-top">
                  <span
                    className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium ${
                      LABEL_STYLE[r.label] ??
                      "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {r.label}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="mt-2.5 text-xs text-muted-foreground">
        {caption ? `${caption} ` : null}
        From{" "}
        <Link
          href="/scripture-concordance"
          className="underline decoration-dotted underline-offset-2 hover:text-divine"
        >
          the Radha Krishna Scripture Concordance
        </Link>
        , version {CONCORDANCE_VERSION}. Every row links to the text it comes
        from.
      </figcaption>
    </figure>
  );
}
