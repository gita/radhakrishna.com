"use client";

import { useEffect } from "react";

/**
 * Enables scroll-reveal. Marks the document ready (so [data-reveal] elements
 * start hidden only when JS runs — no-JS stays fully visible for crawlers) and
 * reveals each element as it enters the viewport. Tiny, no dependencies.
 */
export function RevealInit() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    root.classList.add("reveal-ready");

    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("revealed"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("revealed");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
