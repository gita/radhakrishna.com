"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/lib/site";

/**
 * The mobile menu.
 *
 * This was a native <details> so the header could ship with no client JS. It
 * looked right and behaved wrong: a <details> only ever toggles from its own
 * <summary>, so tapping anywhere else on the page left the menu open, and it
 * stayed open across a client-side navigation too, hanging over the page the
 * reader had just asked for.
 *
 * The rest of the header is still server-rendered. Only this piece is a client
 * component, so the cost is one small bundle rather than the whole header.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Any navigation closes it, including one the reader triggers from inside.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    // Pointerdown rather than click, so the menu is gone by the time a tap
    // outside it lands on whatever is underneath.
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-nav"
        className="flex size-10 cursor-pointer items-center justify-center rounded-md border border-border text-foreground/80"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          {open ? (
            <path d="M6 6l12 12M18 6L6 18" />
          ) : (
            <path d="M3 6h18M3 12h18M3 18h18" />
          )}
        </svg>
      </button>

      {open ? (
        <nav
          id="mobile-nav"
          className="absolute right-0 mt-2 w-56 rounded-lg border border-border bg-card p-2 shadow-lg"
          aria-label="Primary"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2 text-sm font-medium text-card-foreground/80 hover:bg-secondary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </div>
  );
}
