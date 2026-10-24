export const CACHE_TAGS = {
  SERVICES: "services",
  PROJECTS: "projects",
  HERO: "hero",
  TIMELINE: "timeline",
  HOME: "home",
  STATUS: "status",
  REVIEWS: "reviews",
  CLIENTS: "clients",
  RESUME: "resume",
  CONTENTS: "contents",
} as const;

export type CacheTag = (typeof CACHE_TAGS)[keyof typeof CACHE_TAGS];

export const DEFAULT_REVALIDATE_SECONDS: number =
  Number(process.env.NEXT_CACHE_REVALIDATE_TIME) || 3600;
