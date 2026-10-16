import { Projects } from "@/features/projects";
import { getCachedProjects } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects & Portfolio Showcase",
  description:
    "Browse featured web apps, mobile apps, and architectural projects built by Rabin Glan using React, Next.js, Django, TypeScript, and modern cloud technologies.",
  keywords: [
    "rabin glan projects",
    "full stack developer projects",
    "react portfolio",
    "next.js showcase",
    "django full stack apps",
    "flutter mobile applications",
  ],
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projects & Portfolio Showcase | Rabin Glan",
    description:
      "Browse featured web apps, mobile apps, and architectural projects built by Rabin Glan using React, Next.js, and Django.",
    url: "/projects",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects & Portfolio Showcase | Rabin Glan",
    description:
      "Browse featured web apps, mobile apps, and software projects built by Rabin Glan.",
  },
};

export const revalidate = 3600;

export default async function ProjectsPage() {
  const projects = await getCachedProjects();

  const projectsJsonLd = {
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
        name: "Projects",
        item: "https://rabinglan.com.np/projects",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsJsonLd) }}
      />
      <Projects projects={projects} />
    </>
  );
}
