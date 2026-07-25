import { LightboxImage } from "@/components/lightbox-image";
import type { Doc } from "@/lib/content";

/**
 * Photographs of a real place, with their credits visible.
 *
 * A reader researching Banke Bihari wants the actual building, not an
 * impression of it, so these pages lead with photographs and keep generated art
 * for scenes no camera can show (CLAUDE.md). Several angles rather than one
 * hero, because one framing never carries a place.
 *
 * The credit line is not a nicety. These are CC BY and CC BY-SA photographs,
 * where naming the photographer and the licence is the condition of use, so it
 * renders on the page rather than sitting unread in a data file.
 */
function Credit({ photo }: { photo: NonNullable<Doc["photos"]>[number] }) {
  return (
    <span className="block text-xs text-muted-foreground">
      Photograph by {photo.credit},{" "}
      {photo.licenceUrl ? (
        <a
          href={photo.licenceUrl}
          target="_blank"
          rel="noopener noreferrer license"
          className="underline decoration-dotted underline-offset-2 hover:text-divine"
        >
          {photo.licence}
        </a>
      ) : (
        photo.licence
      )}
      , via{" "}
      <a
        href={photo.source}
        target="_blank"
        rel="noopener noreferrer"
        className="underline decoration-dotted underline-offset-2 hover:text-divine"
      >
        Wikimedia Commons
      </a>
    </span>
  );
}

export function PlaceGallery({
  photos,
  title = "Photographs",
}: {
  photos: NonNullable<Doc["photos"]>;
  title?: string;
}) {
  if (!photos?.length) return null;
  return (
    <section className="mt-14">
      <div className="mb-5 flex items-center gap-3">
        <h2 className="font-serif text-2xl font-semibold tracking-tight">
          {title}
        </h2>
        <span className="h-px flex-1 bg-gold/40" />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {photos.map((p) => (
          <LightboxImage
            key={p.src}
            src={p.src}
            alt={p.alt}
            caption={
              <span className="block space-y-1 text-left">
                <span className="block text-sm leading-relaxed text-foreground/85">
                  {p.alt}
                </span>
                <Credit photo={p} />
              </span>
            }
          />
        ))}
      </div>
    </section>
  );
}
