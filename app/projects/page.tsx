import { Projects } from "@/features/projects";
import { getCachedProjects } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Rabin Glan",
  description: "Browse featured web apps, mobile apps, and architectural projects built by Rabin Glan.",
};

export const revalidate = 3600;

export default async function ProjectsPage() {
  const projects = await getCachedProjects();
  return <Projects projects={projects} />;
}
