-- ============================================================================
-- Migration: update_image_urls_to_rabin_bucket
-- Purpose:   Point stored image references at the public 'rabin' storage
--            bucket now that the assets (public/*.png etc.) have been
--            uploaded there via scripts/upload-to-supabase.mjs.
--
--            Values that are already absolute URLs (http:// or https://)
--            are left untouched, so this migration is idempotent and safe
--            to re-run.
--
-- Tables touched:
--   projects.images   -> text[] of paths/URLs (first image = card cover)
--   contents.image_url-> hero / section image
--   clients.logo      -> client logo URL (already absolute in practice)
--   reviews.avatar    -> reviewer avatar (empty in practice)
--
-- NOT touched:
--   services.skills   -> devicon CSS classes (e.g. 'devicon-react-original
--                        colored') — NOT storage paths, must stay as-is
--   hero.cv_url       -> PDF placeholder '/cv.pdf', not an image; replace
--                        manually when the CV is uploaded to the bucket
-- ============================================================================

begin;

-- ---------------------------------------------------------------------------
-- projects.images — rewrite every non-URL element to a rabin bucket URL
-- ---------------------------------------------------------------------------
update public.projects
set images = (
  select coalesce(
    array_agg(
      case
        when v ~ '^https?://' then v
        when v = '' then v
        else 'https://bgzahpcisfioxbwbvhmd.supabase.co/storage/v1/object/public/rabin/'
             || ltrim(v, '/')
      end
    ),
    '{}'::text[]
  )
  from unnest(images) as u(v)
)
where images is not null;

-- ---------------------------------------------------------------------------
-- contents.image_url — /profile.png -> full rabin bucket URL
-- ---------------------------------------------------------------------------
update public.contents
set image_url = 'https://bgzahpcisfioxbwbvhmd.supabase.co/storage/v1/object/public/rabin/'
                || ltrim(image_url, '/')
where image_url is not null
  and image_url <> ''
  and image_url !~ '^https?://';

-- ---------------------------------------------------------------------------
-- clients.logo — convert any non-URL logo values (no-op with current data)
-- ---------------------------------------------------------------------------
update public.clients
set logo = 'https://bgzahpcisfioxbwbvhmd.supabase.co/storage/v1/object/public/rabin/'
           || ltrim(logo, '/')
where logo is not null
  and logo <> ''
  and logo !~ '^https?://';

-- ---------------------------------------------------------------------------
-- reviews.avatar — convert any non-URL avatar values (no-op with current data)
-- ---------------------------------------------------------------------------
update public.reviews
set avatar = 'https://bgzahpcisfioxbwbvhmd.supabase.co/storage/v1/object/public/rabin/'
             || ltrim(avatar, '/')
where avatar is not null
  and avatar <> ''
  and avatar !~ '^https?://';

commit;
