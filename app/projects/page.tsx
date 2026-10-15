import { Projects } from "@/features/projects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Rabin Glan",
  description: "Browse featured web apps, mobile apps, and architectural projects built by Rabin Glan.",
};

export default function ProjectsPage() {
  return (
    <div className="bg-white dark:bg-dark-bg transition-colors duration-500">
      <Projects />
    </div>
  );
}
