"use client";

import { useState } from "react";

/**
 * Email capture. The form only renders when a provider is configured
 * (NEXT_PUBLIC_NEWSLETTER_ENABLED), so we never show a signup box that quietly
 * drops addresses.
 */
export function Newsletter({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  if (process.env.NEXT_PUBLIC_NEWSLETTER_ENABLED !== "true") return null;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Something went wrong");
      setState("done");
      setMessage("You are on the list. Radhey Radhey.");
    } catch (err) {
      setState("error");
      setMessage(
        err instanceof Error ? err.message : "Something went wrong, try again",
      );
    }
  }

  return (
    <section
      className={`rounded-2xl border border-gold/25 bg-gold/5 p-6 ${compact ? "" : "mt-14"}`}
    >
      <h2 className="font-serif text-xl font-semibold">
        A little Vrindavan in your inbox
      </h2>
      <p className="mt-1.5 text-sm text-muted-foreground">
        One thoughtful email: a story, a verse, and the festivals coming up. No
        noise, unsubscribe anytime.
      </p>

      {state === "done" ? (
        <p className="mt-4 font-medium text-divine">{message}</p>
      ) : (
        <form
          onSubmit={submit}
          className="mt-4 flex flex-col gap-2 sm:flex-row"
        >
          <label htmlFor="nl-email" className="sr-only">
            Email address
          </label>
          <input
            id="nl-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            // 16px on phones, not 14. iOS Safari zooms the whole page in when a
            // focused input is under 16px, and the page then sits wider than the
            // window and scrolls sideways until you pinch back out. The fix is
            // the font size; never `maximum-scale=1`, which takes pinch zoom
            // away from everyone who needs it.
            className="min-w-0 flex-1 rounded-full border border-border bg-background px-4 py-2.5 text-base outline-none focus:border-gold focus:ring-2 focus:ring-gold/25 sm:text-sm"
          />
          <button
            type="submit"
            disabled={state === "loading"}
            data-analytics="newsletter-subscribe"
            className="rounded-full bg-divine px-6 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {state === "loading" ? "Joining..." : "Subscribe"}
          </button>
        </form>
      )}
      {state === "error" ? (
        <p className="mt-2 text-sm text-red-600">{message}</p>
      ) : null}
    </section>
  );
}
