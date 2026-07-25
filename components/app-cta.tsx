"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { appLinks } from "@/lib/site";

const DISMISS_KEY = "rk_app_cta_dismissed_until";
const SNOOZE_DAYS = 7;

function snoozed() {
  if (typeof window === "undefined") return true;
  try {
    const until = window.localStorage.getItem(DISMISS_KEY);
    return until ? Date.now() < Number(until) : false;
  } catch {
    return false;
  }
}

function snooze() {
  try {
    window.localStorage.setItem(
      DISMISS_KEY,
      String(Date.now() + SNOOZE_DAYS * 864e5),
    );
  } catch {
    /* storage blocked, banner simply returns next visit */
  }
}

/**
 * The primary conversion goal is an app install (docs/01). This appears after the
 * reader is engaged rather than on load, and a dismissal is remembered for a week
 * so it keeps asking without becoming a nuisance.
 *
 * Desktop cannot install from a click, so it offers a QR code. Mobile gets a slim
 * bar that deep links straight to the right store.
 */
export function AppCta() {
  const [show, setShow] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (snoozed()) return;
    const onScroll = () => {
      if (window.scrollY > 700) {
        setShow(true);
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function close() {
    setClosing(true);
    snooze();
    window.setTimeout(() => setShow(false), 200);
  }

  if (!show) return null;

  return (
    <>
      {/* Mobile: slim sticky bar */}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 border-t border-gold/25 bg-background/95 p-3 shadow-[0_-6px_24px_rgba(0,0,0,0.08)] backdrop-blur md:hidden ${
          closing ? "translate-y-full" : "translate-y-0"
        } transition-transform duration-200`}
      >
        <div className="flex items-center gap-3">
          <Image
            src="/brand/morpankh.png"
            alt=""
            width={40}
            height={40}
            className="size-10 shrink-0 rounded-xl ring-1 ring-gold/30"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">
              Bhagavad Gita, free app
            </p>
            <p className="truncate text-xs text-muted-foreground">
              Read and listen, verse by verse
            </p>
          </div>
          <a
            href={appLinks.android}
            target="_blank"
            rel="noopener noreferrer"
            data-analytics="app-cta-mobile"
            className="shrink-0 rounded-full bg-divine px-4 py-2 text-sm font-semibold text-background"
          >
            Get app
          </a>
          <button
            type="button"
            onClick={close}
            aria-label="Dismiss"
            className="shrink-0 p-1 text-xl leading-none text-muted-foreground"
          >
            <span aria-hidden>&times;</span>
          </button>
        </div>
      </div>

      {/* Desktop: QR card, since a desktop click cannot install anything */}
      <div
        className={`fixed bottom-6 right-6 z-50 hidden w-[22rem] rounded-2xl border border-gold/25 bg-card p-5 shadow-xl md:block ${
          closing ? "opacity-0" : "opacity-100"
        } transition-opacity duration-200`}
      >
        <button
          type="button"
          onClick={close}
          aria-label="Dismiss"
          className="absolute right-3 top-3 text-xl leading-none text-muted-foreground hover:text-foreground"
        >
          <span aria-hidden>&times;</span>
        </button>
        <div className="flex items-center gap-3">
          <Image
            src="/brand/morpankh.png"
            alt=""
            width={44}
            height={44}
            className="size-11 rounded-xl ring-1 ring-gold/30"
          />
          <div>
            <p className="font-serif text-base font-semibold leading-tight">
              Bhagavad Gita, free app
            </p>
            <p className="text-xs text-muted-foreground">
              Read and listen, verse by verse
            </p>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-4">
          <Image
            src="/brand/app-qr.png"
            alt="Scan to download the Bhagavad Gita app"
            width={104}
            height={104}
            className="size-26 rounded-lg bg-background p-1 ring-1 ring-border"
          />
          <div className="flex-1 space-y-2">
            <p className="text-xs text-muted-foreground">
              Scan with your phone, or open a store:
            </p>
            <div className="flex flex-col gap-1.5">
              <a
                href={appLinks.ios}
                target="_blank"
                rel="noopener noreferrer"
                data-analytics="app-cta-ios"
                className="rounded-lg border border-border px-3 py-1.5 text-center text-xs font-semibold transition-colors hover:border-gold/50 hover:text-divine"
              >
                App Store
              </a>
              <a
                href={appLinks.android}
                target="_blank"
                rel="noopener noreferrer"
                data-analytics="app-cta-android"
                className="rounded-lg border border-border px-3 py-1.5 text-center text-xs font-semibold transition-colors hover:border-gold/50 hover:text-divine"
              >
                Google Play
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
