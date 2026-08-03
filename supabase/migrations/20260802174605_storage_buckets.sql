-- ============================================================================
-- Migration: storage_buckets
-- Purpose:   Create the Supabase Storage bucket for file assets:
--              * rabin -> CV / resume PDF and files (project screenshots,
--                         profile image, logos, ...)
--
-- The bucket is public (files are referenced by the public site).
-- Reads are open to everyone; writes are allowed for authenticated users so
-- the owner can upload from an admin flow. The service_role key (server-side
-- code / dashboard) bypasses RLS entirely and can always write.
--
-- NOTE: if the bucket already exists (e.g. created via the dashboard), the
-- `on conflict (id) do nothing` keeps this safe to run.
-- ============================================================================

begin;

-- ---------------------------------------------------------------------------
-- 1. Bucket
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('rabin', 'rabin', true)
on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- 2. Storage object policies
-- ---------------------------------------------------------------------------

-- Public read
create policy "rabin_public_read"
  on storage.objects for select
  using (bucket_id = 'rabin');

-- Authenticated writes (upload/replace/delete) for the portfolio owner
create policy "rabin_authenticated_write"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'rabin');

create policy "rabin_authenticated_update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'rabin')
  with check (bucket_id = 'rabin');

create policy "rabin_authenticated_delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'rabin');

commit;
