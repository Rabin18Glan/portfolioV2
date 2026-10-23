import { headers } from "next/headers";
import { ColorModeProvider } from "@/context/colorModeContext";
import ScrollToProvider from "@/context/ScrollToProvider";
import ScrollToTop from "@/hooks/ScrollToTop";
import { Footer, Header } from "@/layouts";
import FloatingContactButtons from "@/components/Button/FloatingContactButtons";
import GoogleAnalytics from "@/components/Analytics/GoogleAnalytics";
import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rabinglan.com.np";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Rabin Glan | Full Stack Developer & Software Engineer",
    template: "%s | Rabin Glan",
  },
  description:
    "Rabin Glan is an experienced Full Stack Developer & Software Engineer specializing in Next.js, React, Node.js, Django, Flutter, and scalable cloud systems. Explore portfolio, projects, and engineering services.",
  keywords: [
    "Rabin Glan",
    "Full Stack Developer",
    "Software Engineer",
    "React Developer",
    "Next.js Developer",
    "Django Developer",
    "Flutter Developer",
    "Web Developer Nepal",
    "Full Stack Developer Kathmandu",
    "Frontend Architecture",
    "Backend REST API",
    "TypeScript",
    "PostgreSQL",
    "Portfolio",
  ],
  authors: [{ name: "Rabin Glan", url: siteUrl }],
  creator: "Rabin Glan",
  publisher: "Rabin Glan",
  category: "technology",
  classification: "Portfolio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Rabin Glan | Portfolio",
    title: "Rabin Glan | Full Stack Developer & Software Engineer",
    description:
      "Rabin Glan is an experienced Full Stack Developer & Software Engineer specializing in Next.js, React, Node.js, Django, Flutter, and scalable cloud systems.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Rabin Glan - Full Stack Developer Portfolio",
        type: "image/png",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rabin Glan | Full Stack Developer & Software Engineer",
    description:
      "Full Stack Developer specializing in Next.js, React, Django, Flutter, and modern web architectures.",
    images: ["/opengraph-image"],
    creator: "@RabinGlan",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/RG.png", sizes: "32x32", type: "image/png" },
      { url: "/RG.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/RG.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
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
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Rabin Glan - Portfolio",
      description: "Portfolio and projects of Rabin Glan - Full Stack Developer",
      publisher: { "@id": `${siteUrl}/#person` },
      inLanguage: "en-US",
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Rabin Glan",
      url: siteUrl,
      image: `${siteUrl}/RG.png`,
      jobTitle: "Full Stack Developer & Software Engineer",
      description:
        "Full Stack Developer specializing in React, Next.js, Django, Node.js, Flutter, and modern cloud technologies.",
      email: "mailto:robinjsl321@gmail.com",
      telephone: "+9779840469397",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kathmandu",
        addressCountry: "Nepal",
      },
      worksFor: {
        "@type": "Organization",
        name: "Truenary Solutions",
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Bachelor in Computer Science & Information Technology",
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
        "TypeScript",
        "REST APIs",
      ],
      sameAs: [
        "https://github.com/Rabin18Glan",
        "https://www.linkedin.com/in/rabin-glan-95ba41303/",
        "https://www.upwork.com/freelancers/~01593d9f2913e8f562",
        "https://www.facebook.com/profile.php?id=61551905339042",
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#service`,
      name: "Rabin Glan - Software Engineering Services",
      url: `${siteUrl}/services`,
      image: `${siteUrl}/RG.png`,
      telephone: "+9779840469397",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kathmandu",
        addressCountry: "Nepal",
      },
      provider: { "@id": `${siteUrl}/#person` },
      areaServed: "Worldwide",
    },
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
        <GoogleAnalytics />
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

            {/* Floating Phone and WhatsApp action buttons */}
            <FloatingContactButtons />
          </ScrollToProvider>
        </ColorModeProvider>
      </body>
    </html>
  );
}
