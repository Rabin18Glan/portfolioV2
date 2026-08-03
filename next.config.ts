import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "bgzahpcisfioxbwbvhmd.supabase.co" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "truenaryrest-35ff.kinyoapp.com" },
      { protocol: "https", hostname: "**.kinyoapp.com" },
    ],
  },
};

export default nextConfig;
