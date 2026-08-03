-- ============================================================================
-- Migration: hero_profile_image
-- Purpose:   Store the hero profile image in the 'rabin' storage bucket and
--            expose it for the admin panel (upload) and the public site.
--
--   * Adds hero.profile_image (text)  — path/URL, editable via the admin UI
--   * Backfills the seeded hero row with the bucket URL for profile.png
--   * Mirrors the value into contents.metadata (hero) for the CMS-style row
--
-- Idempotent: safe to re-run.
-- ============================================================================

begin;

-- ---------------------------------------------------------------------------
-- 1. Column
-- ---------------------------------------------------------------------------
alter table public.hero
  add column if not exists profile_image text;

-- ---------------------------------------------------------------------------
-- 2. Backfill the single hero row (public/ was uploaded to rabin bucket)
-- ---------------------------------------------------------------------------
update public.hero
set profile_image = 'https://bgzahpcisfioxbwbvhmd.supabase.co/storage/v1/object/public/rabin/profile.png'
where (profile_image is null or profile_image = '')
  and exists (select 1 from public.hero); -- only when a row exists

-- ---------------------------------------------------------------------------
-- 3. Mirror into contents (hero) metadata so both data sources stay in sync
-- ---------------------------------------------------------------------------
update public.contents
set metadata = metadata
  || jsonb_build_object(
       'profile_image',
       'https://bgzahpcisfioxbwbvhmd.supabase.co/storage/v1/object/public/rabin/profile.png'
     )
where section = 'hero'
  and not (metadata ? 'profile_image');

commit;
