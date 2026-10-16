import { Services } from "@/features/services";
import { getCachedServices } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services & Engineering Solutions",
  description:
    "Explore development and architectural services by Rabin Glan: Full Stack Web Development, REST API Architecture, Mobile App Development with Flutter, Cloud Deployment, and UI/UX Implementation.",
  keywords: [
    "web development services",
    "full stack developer nepal",
    "next.js developer hire",
    "django api architecture",
    "flutter app development",
    "software engineer services",
  ],
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Services & Engineering Solutions | Rabin Glan",
    description:
      "Explore development and architectural services by Rabin Glan: Full Stack Web Development, API Architecture, Mobile App Development, and Cloud Deployment.",
    url: "/services",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services & Engineering Solutions | Rabin Glan",
    description:
      "Explore software engineering and full stack development services by Rabin Glan.",
  },
};

export const revalidate = 3600;

export default async function ServicesPage() {
  const services = await getCachedServices();

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://rabinglan.com.np",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: "https://rabinglan.com.np/services",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <Services services={services} />
    </>
  );
}
