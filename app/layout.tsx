import { headers } from "next/headers";
import { ColorModeProvider } from "@/context/colorModeContext";
import ScrollToProvider from "@/context/ScrollToProvider";
import CVContent from "@/features/home/components/cv/components/CVContent";
import ScrollToTop from "@/hooks/ScrollToTop";
import { Footer, Header } from "@/layouts";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rabin Glan | Portfolio",
  description: "Rabin Glan - Full Stack Developer specializing in React, Next.js, Django, and modern web technologies. View my portfolio and projects.",
  keywords: ["rabin glan", "full stack developer", "react developer", "django developer", "web development", "portfolio"],
  openGraph: {
    type: "website",
    title: "Rabin Glan | Portfolio",
    description: "Rabin Glan - Full Stack Developer specializing in React, Next.js, Django, and modern web technologies. View my portfolio and projects.",
    images: ["/RG.png"],
    url: "https://rabin18glan.github.io/",
  },
  twitter: {
    card: "summary_large_image",
    creator: "Rabin Glan",
    title: "Rabin Glan | Portfolio",
    description: "Rabin Glan - Full Stack Developer specializing in React, Next.js, Django, and modern web technologies. View my portfolio and projects.",
    images: ["/RG.png"],
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // The middleware sets x-route-type: "slim" for /admin and /admin/login,
  // "full" for the public site — so the admin panel skips the site chrome.
  const headerList = await headers();
  const isSlim = headerList.get("x-route-type") === "slim";

  if (isSlim) {
    return (
      <html lang="en" className="h-full antialiased">
        <body className="min-h-full flex flex-col bg-white">
          {children}
        </body>
      </html>
    );
  }

  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">
        <ColorModeProvider>
          <ScrollToProvider>
            <ScrollToTop />
            <div className="bg-white dark:bg-dark-bg min-h-screen transition-colors duration-500">
              <Header />
              {children}
              <Footer />
            </div>

            {/* Off-screen CV for PDF generation */}
            <div className="fixed -left-[9999px] top-0">
              <CVContent />
            </div>
          </ScrollToProvider>
        </ColorModeProvider>
      </body>
    </html>
  );
}
