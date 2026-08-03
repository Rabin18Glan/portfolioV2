-- ============================================================================
-- Migration: rename_nyauli_to_kinyoapp
-- Purpose:   Rename the "Nyauli" SaaS project to "Kinyoapp" in existing data.
--            The uploaded image stays at its bucket path (nyauli.png) — only
--            display name, links and client logo domain are updated.
-- ============================================================================

begin;

-- ---------------------------------------------------------------------------
-- 1. projects: display name + storefront demo link
-- ---------------------------------------------------------------------------
update public.projects
set name = 'Kinyoapp',
    url_btn_links = (
      select jsonb_agg(
        jsonb_build_object(
          'name', b.value->>'name',
          'link', replace(b.value->>'link', 'truenaryrest-35ff.nyauli.com', 'truenaryrest-35ff.kinyoapp.com')
        )
      )
      from jsonb_array_elements(url_btn_links) as b(value)
    )
where name = 'Nyauli';

-- ---------------------------------------------------------------------------
-- 2. clients: logo hosted on the old product domain
-- ---------------------------------------------------------------------------
update public.clients
set logo = replace(logo, 'truenaryrest-35ff.nyauli.com', 'truenaryrest-35ff.kinyoapp.com')
where logo like '%nyauli.com%';

-- ---------------------------------------------------------------------------
-- 3. reviews: project name reference
-- ---------------------------------------------------------------------------
update public.reviews
set project_name = 'Kinyoapp SaaS Platform'
where project_name = 'Nyauli SaaS Platform';

commit;
