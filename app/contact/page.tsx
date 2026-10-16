import { Contact } from "@/features/contact";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Collaboration",
  description:
    "Get in touch with Rabin Glan for consulting, freelance software development, project collaborations, or full-time opportunities.",
  keywords: [
    "contact rabin glan",
    "hire full stack developer",
    "freelance software engineer nepal",
    "hire next.js developer",
    "hire react developer",
  ],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact & Collaboration | Rabin Glan",
    description:
      "Get in touch with Rabin Glan for consulting, projects, or full-time software engineering opportunities.",
    url: "/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact & Collaboration | Rabin Glan",
    description:
      "Get in touch with Rabin Glan for software consulting, projects, or engineering collaborations.",
  },
};

export default function ContactPage() {
  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Rabin Glan",
    description: "Contact page for software engineering consulting and project inquiries.",
    url: "https://rabinglan.com.np/contact",
    mainEntity: {
      "@type": "Person",
      name: "Rabin Glan",
      email: "mailto:robinjsl321@gmail.com",
      telephone: "+9779840469397",
    },
  };

  return (
    <div className="bg-white dark:bg-dark-bg transition-colors duration-500">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <Contact />
    </div>
  );
}
