import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const contentType = "image/png";

// Dynamic, light-first OG card (docs/03 §6, docs/07). A route handler (not a
// metadata image file) so it works alongside the [...slug] catch-all, which
// forbids a nested opengraph-image. Params: ?title=&eyebrow=
export function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get("title") ?? "Radhakrishna.com").slice(0, 120);
  const eyebrow = (
    searchParams.get("eyebrow") ?? "The digital home of Shri Radha Krishna"
  ).slice(0, 60);

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background:
          "linear-gradient(135deg, #FCF8F0 0%, #F6EEDD 55%, #EFE3C9 100%)",
        padding: "72px 80px",
        fontFamily: "serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 999,
            background: "#1E6E7E",
          }}
        />
        <div
          style={{
            fontSize: 26,
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
            width: 88,
            height: 5,
            background: "#C79A3B",
            marginBottom: 28,
          }}
        />
        <div
          style={{
            fontSize: title.length > 60 ? 62 : 76,
            lineHeight: 1.08,
            color: "#171422",
            fontWeight: 700,
            maxWidth: 980,
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
          fontSize: 28,
          color: "#5b5344",
        }}
      >
        <span>radhakrishna.com</span>
        <span style={{ color: "#8a7f68" }}>Ved Vyas Foundation</span>
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
