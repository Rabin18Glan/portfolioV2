import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { getResource, getFieldNames, type ResourceConfig } from "@/features/admin/config";

/**
 * Shared server-only helpers for the admin actions.
 * This file intentionally has NO "use server" directive — it is imported by
 * the action modules and must never be imported from client components.
 */

/** Verifies the caller has a valid session; throws otherwise. */
export async function requireAdmin() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized — please sign in.");
  return user;
}

export function getResourceOrThrow(key: string): ResourceConfig {
  const resource = getResource(key);
  if (!resource) throw new Error(`Unknown resource: ${key}`);
  return resource;
}

/**
 * Builds an insert/update payload, whitelisting values against the resource
 * config so arbitrary columns can never be written.
 */
export function buildPayload(resource: ResourceConfig, body: Record<string, unknown>) {
  const allowed = getFieldNames(resource);
  const immutable = new Set(["id", "created_at", "updated_at"]);
  const payload: Record<string, unknown> = {};
  for (const field of allowed) {
    if (field in body && body[field] !== undefined && !immutable.has(field)) {
      payload[field] = body[field];
    }
  }
  return payload;
}
