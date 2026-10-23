import { unstable_cache } from "next/cache";
import { createAdminClient } from "@/utils/supabase/admin";
import { CACHE_TAGS, DEFAULT_REVALIDATE_SECONDS } from "./cache-tags";
import type { ServiceDataProps } from "@/features/services/data/ServicesData";
import type { ProjectProps } from "@/features/projects/data/projectListData";
import type { TimelineItemData } from "@/features/home/components/timeline/components/TimelineMapping";
import { ResumeData, DEFAULT_RESUME_DATA } from "./resume-data";

export type { ResumeData };

export interface HeroData {
  id?: number;
  name?: string;
  title?: string;
  description?: string;
  profile_image?: string;
  cv_url?: string;
}

type RawServiceRow = {
  title: string;
  skills?: string[] | null;
};

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

type RawTimelineRow = {
  id?: number;
  date: string;
  title: string;
  task_done?: string | null;
  icon_name?: string | null;
  icon_class?: string | null;
};

/**
 * Next Cache wrapper for Services data.
 * Revalidates every hour or on-demand via CACHE_TAGS.SERVICES.
 */
export const getCachedServices = unstable_cache(
  async (): Promise<ServiceDataProps[]> => {
    try {
      const supabase = createAdminClient();
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("id", { ascending: true });

      if (error || !Array.isArray(data)) return [];
      return data.map((s: RawServiceRow) => ({
        title: s.title,
        skills: s.skills ?? [],
      }));
    } catch (err) {
      console.error("Error in getCachedServices:", err);
      return [];
    }
  },
  ["services-cache-key"],
  {
    tags: [CACHE_TAGS.SERVICES],
    revalidate: DEFAULT_REVALIDATE_SECONDS,
  }
);

/**
 * Next Cache wrapper for Projects data.
 * Revalidates every hour or on-demand via CACHE_TAGS.PROJECTS.
 */
export const getCachedProjects = unstable_cache(
  async (): Promise<ProjectProps[]> => {
    try {
      const supabase = createAdminClient();
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("id", { ascending: true });

      if (error || !Array.isArray(data)) return [];
      return data.map((p: RawProjectRow) => ({
        id: p.id,
        projectType: p.project_type ?? "",
        name: p.name,
        type: p.type,
        technologiesUsed: p.technologies_used ?? [],
        description: p.description,
        images: p.images ?? [],
        taskCompleted: p.task_completed ?? [],
        urlBtnLinks: p.url_btn_links ?? [],
      }));
    } catch (err) {
      console.error("Error in getCachedProjects:", err);
      return [];
    }
  },
  ["projects-cache-key"],
  {
    tags: [CACHE_TAGS.PROJECTS],
    revalidate: DEFAULT_REVALIDATE_SECONDS,
  }
);

/**
 * Next Cache wrapper for Hero data.
 * Revalidates every hour or on-demand via CACHE_TAGS.HERO.
 */
export const getCachedHero = unstable_cache(
  async (): Promise<HeroData | null> => {
    try {
      const supabase = createAdminClient();
      const { data, error } = await supabase
        .from("hero")
        .select("*")
        .maybeSingle();

      if (error) return null;
      return (data as HeroData) ?? null;
    } catch (err) {
      console.error("Error in getCachedHero:", err);
      return null;
    }
  },
  ["hero-cache-key"],
  {
    tags: [CACHE_TAGS.HERO, CACHE_TAGS.HOME],
    revalidate: DEFAULT_REVALIDATE_SECONDS,
  }
);

/**
 * Next Cache wrapper for Timeline data.
 * Revalidates every hour or on-demand via CACHE_TAGS.TIMELINE.
 */
export const getCachedTimeline = unstable_cache(
  async (): Promise<TimelineItemData[]> => {
    try {
      const supabase = createAdminClient();
      const { data, error } = await supabase
        .from("timeline")
        .select("*")
        .order("sort_order", { ascending: true });

      if (error || !Array.isArray(data)) return [];
      return data.map((item: RawTimelineRow) => ({
        id: item.id,
        date: item.date,
        title: item.title,
        taskDone: item.task_done ?? "",
        iconName: item.icon_name ?? "devicon-nextjs-plain",
        iconClass: item.icon_class ?? "text-white",
      }));
    } catch (err) {
      console.error("Error in getCachedTimeline:", err);
      return [];
    }
  },
  ["timeline-cache-key"],
  {
    tags: [CACHE_TAGS.TIMELINE, CACHE_TAGS.HOME],
    revalidate: DEFAULT_REVALIDATE_SECONDS,
  }
);

/**
 * Next Cache wrapper for Resume data.
 * Revalidates every hour or on-demand via CACHE_TAGS.RESUME.
 */
export const getCachedResume = unstable_cache(
  async (): Promise<ResumeData> => {
    try {
      const supabase = createAdminClient();
      const { data, error } = await supabase
        .from("resume")
        .select("*")
        .eq("is_active", true)
        .order("id", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error || !data) {
        return DEFAULT_RESUME_DATA;
      }
      return data as ResumeData;
    } catch (err) {
      console.error("Error in getCachedResume:", err);
      return DEFAULT_RESUME_DATA;
    }
  },
  ["resume-cache-key"],
  {
    tags: [CACHE_TAGS.RESUME],
    revalidate: DEFAULT_REVALIDATE_SECONDS,
  }
);

/**
 * Fetches all home page data using the respective cached queries.
 */
export async function getCachedHomeData(): Promise<{
  heroData: HeroData | null;
  timelineItems: TimelineItemData[];
}> {
  const [heroData, timelineItems] = await Promise.all([
    getCachedHero(),
    getCachedTimeline(),
  ]);
  return { heroData, timelineItems };
}
