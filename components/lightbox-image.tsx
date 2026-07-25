"use client";

import { useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";
import Image from "next/image";

/**
 * Devotional art is the point of this site, so every image opens full screen.
 * The <figure> keeps a visible caption (readable for people, and real text for
 * Google and the AI crawlers) alongside the alt attribute.
 */
export function LightboxImage({
  src,
  alt,
  caption,
  priority = false,
  className,
}: {
  src: string;
  alt: string;
  // ReactNode, not string: a photograph credit carries links to the licence
  // and to the source file page.
  caption?: ReactNode;
  priority?: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  const onKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onKey]);

  return (
    <figure className={className}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`View larger: ${alt}`}
        className="group relative block w-full cursor-zoom-in overflow-hidden rounded-2xl bg-secondary/50 ring-1 ring-gold/20"
      >
        <span className="relative block aspect-[16/10]">
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </span>
      </button>
      {caption ? (
        <figcaption className="mt-2.5 text-center text-sm text-muted-foreground">
          {caption}
        </figcaption>
      ) : null}

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-100 flex items-center justify-center bg-foreground/85 p-4 backdrop-blur-sm"
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-full bg-background/90 text-2xl leading-none text-foreground shadow-lg transition hover:bg-background"
          >
            <span aria-hidden>&times;</span>
          </button>
          <figure
            onClick={(e) => e.stopPropagation()}
            className="max-h-full w-full max-w-5xl"
          >
            <Image
              src={src}
              alt={alt}
              width={1536}
              height={1024}
              sizes="100vw"
              className="max-h-[82vh] w-full rounded-xl object-contain"
            />
            {caption ? (
              <figcaption className="mt-3 text-center text-sm text-background/90">
                {caption}
              </figcaption>
            ) : null}
          </figure>
        </div>
      ) : null}
    </figure>
  );
}
