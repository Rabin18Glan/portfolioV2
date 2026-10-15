export interface ProjectProps {
    id: number,
    name: string,
    type: string,
    technologiesUsed: Array<string>,
    description: string,
    images: Array<string>,
    taskCompleted: Array<string>,
    projectType?: string,
    urlBtnLinks: {
        name: string,
        link: string
    }[],
}

type RawProjectRow = {
  id: number;
  name: string;
  type: string;
  description: string;
  project_type?: string | null;
  technologies_used?: string[] | null;
  images?: string[] | null;
  task_completed?: string[] | null;
  url_btn_links?: { name: string; link: string }[] | null;
};

/**
 * Fetches projects from the Supabase-backed API and normalizes snake_case
 * columns to the camelCase shape the UI expects.
 */
export const fetchProjects = async (): Promise<ProjectProps[]> => {
    try {
        const res = await fetch("/api/projects");
        if (!res.ok) throw new Error(`Failed to fetch projects (${res.status})`);
        const data = await res.json();
        if (!Array.isArray(data)) return [];
        return data.map((p: RawProjectRow): ProjectProps => ({
            id: p.id,
            projectType: p.project_type ?? "",
            name: p.name,
            type: p.type,
            technologiesUsed: p.technologies_used ?? [],
            description: p.description,
            images: p.images ?? [],
            taskCompleted: p.task_completed ?? [],
            urlBtnLinks: p.url_btn_links ?? []
        }));
    } catch (err) {
        console.warn("Failed to fetch projects from API:", err);
        return [];
    }
};
