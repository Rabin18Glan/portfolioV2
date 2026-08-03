import { createClient as createSupabaseClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client using the service role key.
 * Bypasses RLS — used exclusively in Route Handlers for admin mutations.
 * NEVER import this module from client components.
 */
let adminClient: SupabaseClient | null = null;

export const createAdminClient = (): SupabaseClient => {
  if (adminClient) return adminClient;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey =
    process.env.NEXT_PRIVATE_SUPBASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SECRET_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "Missing Supabase admin credentials. Set NEXT_PUBLIC_SUPABASE_URL and " +
        "NEXT_PRIVATE_SUPBASE_SECRET_KEY (service role key)."
    );
  }

  adminClient = createSupabaseClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return adminClient;
};
