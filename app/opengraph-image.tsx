import { ImageResponse } from "next/og"
import { BRAND } from "@/lib/constants"

export const alt = `${BRAND.name} - ${BRAND.tagline}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: "#0f172a",
          backgroundImage:
            "radial-gradient(circle at 20% 10%, rgba(99, 102, 241, 0.35), transparent 55%), radial-gradient(circle at 85% 90%, rgba(56, 189, 248, 0.25), transparent 55%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top: wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              backgroundColor: "white",
              color: "#0f172a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "36px",
              fontWeight: 700,
            }}
          >
            R
          </div>
          <div
            style={{
              fontSize: "36px",
              fontWeight: 600,
              letterSpacing: "-0.02em",
            }}
          >
            {BRAND.name}
          </div>
        </div>

        {/* Middle: headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              fontSize: "72px",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              maxWidth: "900px",
            }}
          >
            AI Implementation for PE Portfolio Companies
          </div>
          <div
            style={{
              fontSize: "28px",
              fontWeight: 400,
              color: "#cbd5e1",
              lineHeight: 1.35,
              maxWidth: "860px",
            }}
          >
            Training, setup, and ongoing support that drives measurable
            operating leverage.
          </div>
        </div>

        {/* Bottom: byline */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "22px",
            color: "#94a3b8",
          }}
        >
          <div>Logan Day &nbsp;·&nbsp; Matt Horrigan</div>
          <div>{BRAND.domain}</div>
        </div>
      </div>
    ),
    { ...size }
  )
}
