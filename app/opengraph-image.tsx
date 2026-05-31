import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "80px", background: "#F6F1E9", color: "#3A3327" }}>
        <div style={{ fontSize: 28, letterSpacing: 6, color: "#9C8866" }}>SHIFT GEAR</div>
        <div style={{ fontSize: 72, fontWeight: 600, marginTop: 30 }}>ビジネス価値を、最大化する。</div>
      </div>
    ),
    { ...size }
  );
}
