import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Rabin Glan | Full Stack Developer",
    short_name: "Rabin Glan",
    description:
      "Portfolio of Rabin Glan - Full Stack Developer specializing in React, Next.js, Django, Flutter & Node.js.",
    start_url: "/",
    display: "standalone",
    background_color: "#0F1A27",
    theme_color: "#1B293A",
    icons: [
      {
        src: "/RG.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/RG.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
