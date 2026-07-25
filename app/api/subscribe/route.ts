import { NextResponse } from "next/server";

/**
 * Provider-agnostic newsletter signup. Set NEWSLETTER_PROVIDER plus its key and
 * this starts working; until then it refuses loudly rather than silently
 * discarding an address. Supported: resend, buttondown, convertkit.
 */
export async function POST(req: Request) {
  let email = "";
  try {
    const body = await req.json();
    email = String(body?.email ?? "").trim();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address" },
      { status: 400 },
    );
  }

  const provider = process.env.NEWSLETTER_PROVIDER;
  if (!provider) {
    return NextResponse.json(
      { error: "Newsletter is not configured yet" },
      { status: 503 },
    );
  }

  try {
    if (provider === "resend") {
      const res = await fetch(
        `https://api.resend.com/audiences/${process.env.RESEND_AUDIENCE_ID}/contacts`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, unsubscribed: false }),
        },
      );
      if (!res.ok) throw new Error(`Resend responded ${res.status}`);
    } else if (provider === "buttondown") {
      const res = await fetch("https://api.buttondown.com/v1/subscribers", {
        method: "POST",
        headers: {
          Authorization: `Token ${process.env.BUTTONDOWN_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email_address: email }),
      });
      if (!res.ok && res.status !== 409)
        throw new Error(`Buttondown responded ${res.status}`);
    } else if (provider === "convertkit") {
      const res = await fetch(
        `https://api.convertkit.com/v3/forms/${process.env.CONVERTKIT_FORM_ID}/subscribe`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            api_key: process.env.CONVERTKIT_API_KEY,
            email,
          }),
        },
      );
      if (!res.ok) throw new Error(`ConvertKit responded ${res.status}`);
    } else {
      return NextResponse.json(
        { error: "Newsletter is not configured yet" },
        { status: 503 },
      );
    }
  } catch {
    return NextResponse.json(
      { error: "Could not subscribe right now, please try again" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
