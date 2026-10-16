"use client";

import { useState, useMemo } from "react";
import ProjectCard from "./ProjectCard";
import type { ProjectProps } from "../data/projectListData";

interface ProjectListProps {
  initialProjects: ProjectProps[];
}

export default function ProjectList({ initialProjects }: ProjectListProps) {
  const [activeTab, setActiveTab] = useState("All");

  const projectTypes = useMemo(() => {
    const rawTypes = Array.from(
      new Set(initialProjects.map((p) => p.projectType || "Other"))
    );
    return [
      "All",
      "Professional",
      "Personal",
      ...rawTypes.filter((t) => t !== "Professional" && t !== "Personal"),
    ];
  }, [initialProjects]);

  const filteredProjects = useMemo(() => {
    if (activeTab === "All") {
      return [...initialProjects].sort((a, b) => {
        const priority: Record<string, number> = {
          Professional: 0,
          "": 1,
          Other: 1,
          Personal: 2,
        };
        return (
          (priority[a.projectType || ""] ?? 1) -
          (priority[b.projectType || ""] ?? 1)
        );
      });
    }
    return initialProjects.filter(
      (p) => (p.projectType || "Other") === activeTab
    );
  }, [initialProjects, activeTab]);

  return (
    <div className="flex flex-col gap-10 w-full max-w-7xl mx-auto px-4">
      {/* Category Tabs */}
      <div className="flex justify-center px-4">
        <div className="flex flex-wrap justify-center gap-1.5 p-1 bg-gray-100 dark:bg-dark-card/90 rounded-2xl border border-gray-200/80 dark:border-dark-border">
          {projectTypes.map((tab) => {
            const isActive = activeTab === tab;
            let tabStyle = "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200";
            if (isActive) {
              tabStyle = "bg-primary-600 text-white shadow-sm";
            }

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${tabStyle}`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
