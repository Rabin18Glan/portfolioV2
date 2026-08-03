"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/utils/supabase/admin";
import { requireAdmin, getResourceOrThrow, buildPayload } from "./helpers";

type Row = Record<string, unknown>;

export async function listResource(key: string): Promise<Row[]> {
  await requireAdmin();
  const resource = getResourceOrThrow(key);

  const admin = createAdminClient();
  let query = admin.from(resource.key).select("*");
  if (resource.orderBy) {
    query = query.order(resource.orderBy.column, {
      ascending: resource.orderBy.ascending ?? true,
    });
  }

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return (data ?? []) as Row[];
}

export async function getResourceRow(key: string, id: string): Promise<Row> {
  await requireAdmin();
  const resource = getResourceOrThrow(key);

  const admin = createAdminClient();
  const { data, error } = await admin
    .from(resource.key)
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) throw new Error("Record not found.");
  return data as Row;
}

export async function createResource(
  key: string,
  body: Record<string, unknown>
): Promise<Row> {
  await requireAdmin();
  const resource = getResourceOrThrow(key);
  if (resource.readonly) throw new Error(`${resource.label} is read-only.`);

  const payload = buildPayload(resource, body);
  const admin = createAdminClient();
  const { data, error } = await admin.from(resource.key).insert(payload).select().single();

  if (error) throw new Error(error.message);
  revalidatePath(`/admin/${resource.key}`);
  return data as Row;
}

export async function updateResource(
  key: string,
  id: string,
  body: Record<string, unknown>
): Promise<Row> {
  await requireAdmin();
  const resource = getResourceOrThrow(key);
  if (resource.readonly) throw new Error(`${resource.label} is read-only.`);

  const payload = buildPayload(resource, body);
  const admin = createAdminClient();
  const { data, error } = await admin
    .from(resource.key)
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  revalidatePath(`/admin/${resource.key}`);
  return data as Row;
}

export async function deleteResource(key: string, id: string): Promise<void> {
  await requireAdmin();
  const resource = getResourceOrThrow(key);

  const admin = createAdminClient();
  const { error } = await admin.from(resource.key).delete().eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath(`/admin/${resource.key}`);
}
