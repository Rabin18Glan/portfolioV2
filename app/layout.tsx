import { headers } from "next/headers";
import { ColorModeProvider } from "@/context/colorModeContext";
import ScrollToProvider from "@/context/ScrollToProvider";
import CVContent from "@/features/home/components/cv/components/CVContent";
import ScrollToTop from "@/hooks/ScrollToTop";
import { Footer, Header } from "@/layouts";
import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rabinglan.com.np";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Rabin Glan | Full Stack Developer",
    template: "%s | Rabin Glan",
  },
  description:
    "Rabin Glan - Full Stack Developer specializing in React, Next.js, Django, Flutter, Node.js and modern web technologies. View my portfolio, projects and experience.",
  keywords: [
    "rabin glan",
    "full stack developer",
    "react developer",
    "next.js developer",
    "django developer",
    "flutter developer",
    "web development",
    "portfolio",
    "nepal developer",
  ],
  authors: [{ name: "Rabin Glan", url: siteUrl }],
  creator: "Rabin Glan",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Rabin Glan",
    title: "Rabin Glan | Full Stack Developer",
    description:
      "Rabin Glan - Full Stack Developer specializing in React, Next.js, Django, Flutter and modern web technologies. View my portfolio, projects and experience.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Rabin Glan - Full Stack Developer",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rabin Glan | Full Stack Developer",
    description:
      "Rabin Glan - Full Stack Developer specializing in React, Next.js, Django, Flutter and modern web technologies.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/RG.png",
    apple: "/RG.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1a27" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Rabin Glan",
  url: siteUrl,
  image: `${siteUrl}/RG.png`,
  jobTitle: "Full Stack Developer",
  worksFor: {
    "@type": "Organization",
    name: "Truenary Solutions",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Bachelor in CS & IT",
  },
  knowsAbout: [
    "React",
    "Next.js",
    "Django",
    "Node.js",
    "Flutter",
    "GraphQL",
    "Kubernetes",
    "Docker",
    "PostgreSQL",
    "MySQL",
  ],
  sameAs: [
    "https://github.com/Rabin18Glan",
    "https://www.linkedin.com/in/rabin-glan-95ba41303/",
    "https://www.upwork.com/freelancers/~01593d9f2913e8f562",
    "https://www.facebook.com/profile.php?id=61551905339042",
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
