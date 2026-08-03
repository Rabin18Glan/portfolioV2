"use server";

import { createAdminClient } from "@/utils/supabase/admin";
import { requireAdmin } from "./helpers";

/**
 * Uploads a file to the 'rabin' storage bucket (or another public bucket).
 * Accepts FormData with `file`, optional `bucket` and `folder` fields.
 */
export async function uploadFile(formData: FormData): Promise<{ path: string; url: string }> {
  await requireAdmin();

  const file = formData.get("file");
  if (!(file instanceof File)) throw new Error("No file provided.");

  const bucket = (formData.get("bucket") as string) || "rabin";
  const folder = ((formData.get("folder") as string) || "uploads").replace(/^\/+|\/+$/g, "");
  const ext = file.name.split(".").pop()?.toLowerCase() || "bin";
  const name = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const admin = createAdminClient();
  const { error } = await admin.storage.from(bucket).upload(name, file, {
    contentType: file.type || "application/octet-stream",
    upsert: true,
    cacheControl: "3600",
  });

  if (error) throw new Error(error.message);

  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/${name}`;
  return { path: name, url };
}
