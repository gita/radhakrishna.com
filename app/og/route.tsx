import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const contentType = "image/png";

/**
 * The social card, drawn per page (docs/03 §6, docs/07).
 *
 * A route handler rather than a metadata image file, because the [...slug]
 * catch-all forbids a nested opengraph-image.
 *
 * Params: ?title=&eyebrow=&img=
 *
 * `img` is a site-relative path to the page's art. It is drawn in its own
 * column with the title beside it, never underneath it: nothing may sit over
 * the deities' faces, and a full-bleed image with a text scrim would do exactly
 * that. Satori cannot decode WebP and all our content art is WebP, so the card
 * asks the Next image optimizer for a JPEG rendering rather than the original.
 */
export function GET(req: NextRequest) {
  const { searchParams, origin } = new URL(req.url);
  const title = (searchParams.get("title") ?? "Radhakrishna.com").slice(0, 120);
  const eyebrow = (
    searchParams.get("eyebrow") ?? "The digital home of Shri Radha Krishna"
  ).slice(0, 60);

  // `img` names the page's content art. Satori cannot decode WebP and the Next
  // image optimizer only ever returns AVIF or WebP here (see next.config
  // `formats`), so the card draws the JPEG copy that scripts/build-og-art.mjs
  // writes alongside it. Matching only our own slug shape means this cannot be
  // pointed at another host.
  const slug = searchParams
    .get("img")
    ?.match(/^\/images\/content\/([A-Za-z0-9_-]+)\.\w+$/)?.[1];
  const art = slug ? `${origin}/images/og/${slug}.jpg` : null;

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        background:
          "linear-gradient(135deg, #FCF8F0 0%, #F6EEDD 55%, #EFE3C9 100%)",
        fontFamily: "serif",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 56px",
          width: art ? "58%" : "100%",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* The morpankh, the same mark the header and footer carry. It used
              to be a plain teal circle standing in for a logo, which read as an
              unfinished placeholder on every link ever shared. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${origin}/brand/morpankh-og.png`}
            alt=""
            width={48}
            height={48}
            style={{ width: 48, height: 48, objectFit: "contain" }}
          />
          <div
            style={{
              fontSize: 24,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "#1E6E7E",
              fontWeight: 600,
            }}
          >
            {eyebrow}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              width: 80,
              height: 5,
              background: "#C79A3B",
              marginBottom: 24,
            }}
          />
          <div
            style={{
              fontSize: art
                ? title.length > 52
                  ? 46
                  : 58
                : title.length > 60
                  ? 62
                  : 76,
              lineHeight: 1.08,
              color: "#171422",
              fontWeight: 700,
              maxWidth: art ? 600 : 980,
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
            color: "#5b5344",
            gap: 24,
          }}
        >
          <span>radhakrishna.com</span>
          <span style={{ color: "#8a7f68" }}>Ved Vyas Foundation</span>
        </div>
      </div>

      {art ? (
        <div
          style={{
            display: "flex",
            width: "42%",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 48px 0 0",
          }}
        >
          {/* Contained, not covering. The art is 3:2 and this column is taller
              than it is wide, so a cover crop would cut straight through the
              faces. Nothing is ever cropped here. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={art}
            alt=""
            width={456}
            height={304}
            style={{
              width: 456,
              height: 304,
              objectFit: "contain",
              borderRadius: 18,
            }}
          />
        </div>
      ) : null}
    </div>,
    { width: 1200, height: 630 },
  );
}
