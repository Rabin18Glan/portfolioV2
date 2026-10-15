"use client";

import { useState, useEffect, useMemo } from "react";
import { fetchProjects, type ProjectProps } from "../data/projectListData";

export function useProjects() {
  const [projects, setProjects] = useState<ProjectProps[]>([]);
  const [activeTab, setActiveTab] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const data = await fetchProjects();
        if (!ignore) {
          setProjects(data);
          setLoading(false);
        }
      } catch (err) {
        if (!ignore) {
          console.error("Failed to load projects:", err);
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, []);

  const projectTypes = useMemo(() => {
    const rawTypes = Array.from(new Set(projects.map((p) => p.projectType || "Other")));
    return [
      "All",
      "Professional",
      "Personal",
      ...rawTypes.filter((t) => t !== "Professional" && t !== "Personal"),
    ];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeTab === "All") {
      return [...projects].sort((a, b) => {
        const priority: Record<string, number> = {
          Professional: 0,
          "": 1,
          Other: 1,
          Personal: 2,
        };
        return (priority[a.projectType || ""] ?? 1) - (priority[b.projectType || ""] ?? 1);
      });
    }
    return projects.filter((p) => (p.projectType || "Other") === activeTab);
  }, [projects, activeTab]);

  return {
    projects,
    filteredProjects,
    activeTab,
    setActiveTab,
    projectTypes,
    loading,
  };
}
