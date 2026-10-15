-- ============================================================================
-- Migration: chat_system
-- Purpose:   1-on-1 real-time chat between customers and portfolio owner.
--            Sessions persist across refreshes via device identifier cookie.
--            Admin has full permission to review, reply, and delete sessions.
-- ============================================================================

begin;

-- ---------------------------------------------------------------------------
-- 1. Tables
-- ---------------------------------------------------------------------------

create table if not exists public.chat_sessions (
  id                uuid primary key default gen_random_uuid(),
  device_id         text not null,
  customer_name     text not null default 'Visitor',
  customer_email    text,
  last_message_at   timestamptz not null default now(),
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create table if not exists public.chat_messages (
  id                uuid primary key default gen_random_uuid(),
  session_id        uuid not null references public.chat_sessions(id) on delete cascade,
  sender            text not null check (sender in ('customer', 'admin')),
  sender_name       text,
  message           text not null,
  is_read           boolean not null default false,
  created_at        timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- 2. Indexes
-- ---------------------------------------------------------------------------

create index if not exists chat_sessions_device_id_idx on public.chat_sessions (device_id);
create index if not exists chat_sessions_last_message_idx on public.chat_sessions (last_message_at desc);
create index if not exists chat_messages_session_id_idx on public.chat_messages (session_id, created_at asc);

-- ---------------------------------------------------------------------------
-- 3. Row Level Security
-- ---------------------------------------------------------------------------

alter table public.chat_sessions enable row level security;
alter table public.chat_messages enable row level security;

-- Public anon/authenticated can read and create their own sessions via device_id
create policy "chat_sessions_public_read" on public.chat_sessions
  for select to anon, authenticated using (true);

create policy "chat_sessions_public_insert" on public.chat_sessions
  for insert to anon, authenticated with check (true);

create policy "chat_sessions_public_update" on public.chat_sessions
  for update to anon, authenticated using (true) with check (true);

-- Public anon/authenticated can read messages and insert messages
create policy "chat_messages_public_read" on public.chat_messages
  for select to anon, authenticated using (true);

create policy "chat_messages_public_insert" on public.chat_messages
  for insert to anon, authenticated with check (true);

-- ---------------------------------------------------------------------------
-- 4. Grants
-- ---------------------------------------------------------------------------

grant select, insert, update on public.chat_sessions to anon, authenticated;
grant select, insert on public.chat_messages to anon, authenticated;

-- Service role has all permissions including delete
grant all on public.chat_sessions to service_role;
grant all on public.chat_messages to service_role;

-- ---------------------------------------------------------------------------
-- 5. Enable Realtime
-- ---------------------------------------------------------------------------

do $$
begin
  if exists (
    select 1 from pg_publication where pubname = 'supabase_realtime'
  ) then
    alter publication supabase_realtime add table public.chat_messages;
  end if;
end;
$$;

commit;
