import { revalidateTag, revalidatePath, updateTag } from "next/cache";
import { CACHE_TAGS } from "./cache-tags";

interface RevalidationTarget {
  tags: string[];
  paths: string[];
}

const RESOURCE_REVALIDATION_MAP: Record<string, RevalidationTarget> = {
  hero: {
    tags: [CACHE_TAGS.HERO, CACHE_TAGS.HOME],
    paths: ["/", "/admin/hero"],
  },
  timeline: {
    tags: [CACHE_TAGS.TIMELINE, CACHE_TAGS.HOME],
    paths: ["/", "/admin/timeline"],
  },
  services: {
    tags: [CACHE_TAGS.SERVICES],
    paths: ["/services", "/admin/services"],
  },
  projects: {
    tags: [CACHE_TAGS.PROJECTS],
    paths: ["/projects", "/admin/projects"],
  },
  status: {
    tags: [CACHE_TAGS.STATUS, CACHE_TAGS.HOME],
    paths: ["/", "/admin/status"],
  },
  reviews: {
    tags: [CACHE_TAGS.REVIEWS, CACHE_TAGS.HOME],
    paths: ["/", "/admin/reviews"],
  },
  clients: {
    tags: [CACHE_TAGS.CLIENTS, CACHE_TAGS.HOME],
    paths: ["/", "/admin/clients"],
  },
  resume: {
    tags: [CACHE_TAGS.RESUME],
    paths: ["/resume", "/admin/resume"],
  },
  contents: {
    tags: [CACHE_TAGS.CONTENTS, CACHE_TAGS.HOME],
    paths: ["/", "/admin/contents"],
  },
};

/**
 * Revalidates Next Cache entries associated with a specific database/admin resource.
 */
export function revalidateResource(resourceKey: string): void {
  const target = RESOURCE_REVALIDATION_MAP[resourceKey];

  if (!target) {
    try {
      revalidatePath(`/admin/${resourceKey}`);
    } catch (err) {
      console.warn(`revalidatePath error for /admin/${resourceKey}:`, err);
    }
    return;
  }

  for (const tag of target.tags) {
    try {
      updateTag(tag);
    } catch {
      // updateTag is for Server Actions; fallback to revalidateTag
      try {
        revalidateTag(tag, "max");
      } catch (err) {
        console.warn(`revalidateTag error for tag ${tag}:`, err);
      }
    }
  }

  for (const path of target.paths) {
    try {
      revalidatePath(path);
    } catch (err) {
      console.warn(`revalidatePath error for path ${path}:`, err);
    }
  }
}

/**
 * On-demand revalidation by explicit tag or path.
 */
export function revalidateCustom(options: { tag?: string; path?: string }): void {
  if (options.tag) {
    try {
      revalidateTag(options.tag, "max");
    } catch (err) {
      console.warn(`revalidateTag error for tag ${options.tag}:`, err);
    }
  }
  if (options.path) {
    try {
      revalidatePath(options.path);
    } catch (err) {
      console.warn(`revalidatePath error for path ${options.path}:`, err);
    }
  }
}
