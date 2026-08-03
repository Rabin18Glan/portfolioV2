import { ImageResponse } from "next/og";
// Logo lives in public/ — imported so next/og inlines it (no network dependency)
import logo from "../public/RG.png";

export const runtime = "edge";
export const alt = "Rabin Glan — Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://bgzahpcisfioxbwbvhmd.supabase.co";

// Profile photo lives in the public 'rabin' storage bucket
const PROFILE_SRC = `${supabaseUrl}/storage/v1/object/public/rabin/profile.png`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1B293A 0%, #0F1A27 50%, #070D15 100%)",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        {/* Logo (local public asset) */}
        <img
          src={logo.src}
          width={176}
          height={110}
          alt=""
          style={{ objectFit: "contain" }}
        />

        {/* Profile photo in a gold ring */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 252,
            height: 252,
            marginTop: 32,
            borderRadius: "50%",
            border: "6px solid #D4B062",
            boxShadow: "0 0 40px rgba(212, 176, 98, 0.35)",
            overflow: "hidden",
          }}
        >
          <img
            src={PROFILE_SRC}
            width={240}
            height={240}
            alt=""
            style={{ objectFit: "cover", objectPosition: "top" }}
          />
        </div>

        {/* Name */}
        <div style={{ display: "flex", marginTop: 32, fontSize: 52, fontWeight: 700, color: "#FAF8F5" }}>
          Rabin Glan
        </div>

        {/* Gold divider */}
        <div
          style={{
            display: "flex",
            width: 120,
            height: 4,
            borderRadius: 999,
            background: "linear-gradient(90deg, #DFBD6C, #B38E3C)",
            marginTop: 16,
          }}
        />

        {/* Title */}
        <div style={{ display: "flex", marginTop: 16, fontSize: 28, letterSpacing: 6, color: "#D4B062", textTransform: "uppercase" }}>
          Full Stack Developer
        </div>
      </div>
    ),
    size,
  );
}
