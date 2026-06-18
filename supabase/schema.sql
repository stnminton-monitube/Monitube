-- ============================================================
-- MONITUBE — Full Database Schema
-- Run this once in Supabase SQL Editor
-- ============================================================

-- Extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- ============================================================
-- TABLES
-- ============================================================

-- Users (synced from Clerk on first sign in)
create table public.users (
  id              uuid primary key default uuid_generate_v4(),
  clerk_user_id   text unique not null,
  email           text not null,
  first_name      text,
  last_name       text,
  avatar_url      text,
  created_at      timestamptz default now() not null,
  updated_at      timestamptz default now() not null
);

-- Workspaces (one per channel owner — their command center)
create table public.workspaces (
  id                            uuid primary key default uuid_generate_v4(),
  owner_id                      uuid references public.users(id) on delete cascade not null,
  name                          text not null,
  youtube_channel_id            text unique,
  youtube_channel_name          text,
  youtube_channel_thumbnail     text,
  youtube_access_token          text,
  youtube_refresh_token         text,
  youtube_token_expires_at      timestamptz,
  plan                          text default 'free' check (plan in ('free', 'pro')) not null,
  stripe_customer_id            text unique,
  stripe_subscription_id        text unique,
  created_at                    timestamptz default now() not null,
  updated_at                    timestamptz default now() not null
);

-- Workspace members (the team — editors, writers, designers, etc.)
create table public.workspace_members (
  id                  uuid primary key default uuid_generate_v4(),
  workspace_id        uuid references public.workspaces(id) on delete cascade not null,
  user_id             uuid references public.users(id) on delete cascade not null,
  role                text not null check (role in ('owner', 'manager', 'editor', 'writer', 'thumbnail_designer', 'assistant_editor')),
  availability_status text default 'available' check (availability_status in ('available', 'unavailable')) not null,
  bio                 text,
  location            text,
  niche_tags          text[] default '{}' not null,
  show_on_profile     boolean default true not null,
  joined_at           timestamptz default now() not null,
  unique(workspace_id, user_id)
);

-- Invitations (pending team invites sent by owner)
create table public.invitations (
  id            uuid primary key default uuid_generate_v4(),
  workspace_id  uuid references public.workspaces(id) on delete cascade not null,
  email         text not null,
  role          text not null check (role in ('manager', 'editor', 'writer', 'thumbnail_designer', 'assistant_editor')),
  token         text unique not null default encode(gen_random_bytes(32), 'hex'),
  status        text default 'pending' check (status in ('pending', 'accepted', 'expired')) not null,
  invited_by    uuid references public.users(id),
  created_at    timestamptz default now() not null,
  expires_at    timestamptz default (now() + interval '7 days') not null
);

-- Videos (YouTube videos credited in the system)
create table public.videos (
  id                  uuid primary key default uuid_generate_v4(),
  workspace_id        uuid references public.workspaces(id) on delete cascade not null,
  youtube_video_id    text not null,
  title               text,
  thumbnail_url       text,
  published_at        timestamptz,
  content_type        text check (content_type in ('long_form', 'short_form', 'shorts')),
  -- YouTube Analytics stats
  view_count          bigint,
  retention_rate      numeric(5,2),   -- percentage 0-100
  ctr                 numeric(5,2),   -- percentage 0-100
  watch_time_hours    numeric(12,2),
  impressions         bigint,
  likes               bigint,
  comments            bigint,
  shares              bigint,
  subscribers_gained  bigint,
  subscribers_lost    bigint,
  unique_viewers      bigint,
  playlist_adds       bigint,
  stats_pulled_at     timestamptz,
  created_at          timestamptz default now() not null,
  unique(workspace_id, youtube_video_id)
);

-- Video credits (who gets credited for what role on each video)
create table public.video_credits (
  id                  uuid primary key default uuid_generate_v4(),
  video_id            uuid references public.videos(id) on delete cascade not null,
  workspace_id        uuid references public.workspaces(id) on delete cascade not null,
  member_id           uuid references public.workspace_members(id) on delete cascade not null,
  role                text not null check (role in ('editor', 'writer', 'thumbnail_designer', 'assistant_editor', 'manager')),
  weight_percentage   numeric(5,2) default 100 check (weight_percentage > 0 and weight_percentage <= 100),
  description         text,   -- from team member: what they specifically did
  owner_comment       text,   -- private, never shown publicly
  submitted_by        text default 'owner' check (submitted_by in ('owner', 'member')) not null,
  status              text default 'approved' check (status in ('pending', 'approved', 'declined')) not null,
  approved_at         timestamptz,
  show_on_profile     boolean default true not null,
  created_at          timestamptz default now() not null
);

-- Performance logs (private timestamped notes per team member, owner only)
create table public.performance_logs (
  id              uuid primary key default uuid_generate_v4(),
  workspace_id    uuid references public.workspaces(id) on delete cascade not null,
  member_id       uuid references public.workspace_members(id) on delete cascade not null,
  note            text not null,
  visible_to_member boolean default false not null,
  created_by      uuid references public.users(id) not null,
  created_at      timestamptz default now() not null
);

-- Bonus targets (performance thresholds set by owner)
create table public.bonus_targets (
  id                    uuid primary key default uuid_generate_v4(),
  workspace_id          uuid references public.workspaces(id) on delete cascade not null,
  member_id             uuid references public.workspace_members(id) on delete cascade not null,
  stat_type             text not null,         -- e.g. 'retention_rate', 'ctr', 'view_count'
  threshold             numeric(10,2) not null,
  formula_description   text,                  -- human-readable: "$10 for every 1% above 50%"
  bonus_per_unit        numeric(10,2),
  video_count           integer,               -- how many videos to average across
  is_active             boolean default true not null,
  created_at            timestamptz default now() not null
);

-- Bonus achievements (when a target is hit)
create table public.bonus_achievements (
  id                uuid primary key default uuid_generate_v4(),
  target_id         uuid references public.bonus_targets(id) on delete cascade not null,
  member_id         uuid references public.workspace_members(id) on delete cascade not null,
  achieved_at       timestamptz default now() not null,
  suggested_amount  numeric(10,2),
  status            text default 'pending' check (status in ('pending', 'accepted', 'adjusted', 'dismissed')) not null,
  final_amount      numeric(10,2),
  owner_note        text
);

-- Channel stats snapshots (periodic averages for context/trend lines)
create table public.channel_stats_snapshots (
  id                      uuid primary key default uuid_generate_v4(),
  workspace_id            uuid references public.workspaces(id) on delete cascade not null,
  avg_views               numeric(12,2),
  avg_retention           numeric(5,2),
  avg_ctr                 numeric(5,2),
  total_videos            integer,
  total_watch_time_hours  numeric(12,2),
  snapshot_date           date not null,
  unique(workspace_id, snapshot_date)
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table public.users                  enable row level security;
alter table public.workspaces             enable row level security;
alter table public.workspace_members      enable row level security;
alter table public.invitations            enable row level security;
alter table public.videos                 enable row level security;
alter table public.video_credits          enable row level security;
alter table public.performance_logs       enable row level security;
alter table public.bonus_targets          enable row level security;
alter table public.bonus_achievements     enable row level security;
alter table public.channel_stats_snapshots enable row level security;

-- Helper: read the Clerk user ID out of the JWT
create or replace function public.requesting_clerk_id()
returns text language sql stable as $$
  select nullif(current_setting('request.jwt.claims', true)::json->>'sub', '')::text
$$;

-- Helper: get our internal users.id for the current request
create or replace function public.requesting_user_id()
returns uuid language sql stable as $$
  select id from public.users where clerk_user_id = public.requesting_clerk_id()
$$;

-- ============================================================
-- POLICIES: users
-- ============================================================

create policy "users: read own row"
  on public.users for select
  using (clerk_user_id = public.requesting_clerk_id());

create policy "users: insert own row"
  on public.users for insert
  with check (clerk_user_id = public.requesting_clerk_id());

create policy "users: update own row"
  on public.users for update
  using (clerk_user_id = public.requesting_clerk_id());

-- ============================================================
-- POLICIES: workspaces
-- ============================================================

create policy "workspaces: owner can read"
  on public.workspaces for select
  using (owner_id = public.requesting_user_id());

create policy "workspaces: members can read"
  on public.workspaces for select
  using (id in (
    select workspace_id from public.workspace_members
    where user_id = public.requesting_user_id()
  ));

create policy "workspaces: owner can update"
  on public.workspaces for update
  using (owner_id = public.requesting_user_id());

create policy "workspaces: owner can create"
  on public.workspaces for insert
  with check (owner_id = public.requesting_user_id());

create policy "workspaces: owner can delete"
  on public.workspaces for delete
  using (owner_id = public.requesting_user_id());

-- ============================================================
-- POLICIES: workspace_members
-- ============================================================

create policy "workspace_members: team can see each other"
  on public.workspace_members for select
  using (workspace_id in (
    select workspace_id from public.workspace_members
    where user_id = public.requesting_user_id()
  ));

create policy "workspace_members: owner can add"
  on public.workspace_members for insert
  with check (workspace_id in (
    select id from public.workspaces where owner_id = public.requesting_user_id()
  ));

create policy "workspace_members: owner can update"
  on public.workspace_members for update
  using (workspace_id in (
    select id from public.workspaces where owner_id = public.requesting_user_id()
  ));

create policy "workspace_members: owner can remove"
  on public.workspace_members for delete
  using (workspace_id in (
    select id from public.workspaces where owner_id = public.requesting_user_id()
  ));

create policy "workspace_members: member can update own row"
  on public.workspace_members for update
  using (user_id = public.requesting_user_id());

-- ============================================================
-- POLICIES: invitations
-- ============================================================

create policy "invitations: owner can manage"
  on public.invitations for all
  using (workspace_id in (
    select id from public.workspaces where owner_id = public.requesting_user_id()
  ));

-- Public read so uninvited users can claim via token (app verifies token)
create policy "invitations: public read"
  on public.invitations for select
  using (true);

-- ============================================================
-- POLICIES: videos
-- ============================================================

create policy "videos: workspace members can read"
  on public.videos for select
  using (workspace_id in (
    select workspace_id from public.workspace_members
    where user_id = public.requesting_user_id()
  ));

create policy "videos: owner can manage"
  on public.videos for all
  using (workspace_id in (
    select id from public.workspaces where owner_id = public.requesting_user_id()
  ));

-- ============================================================
-- POLICIES: video_credits
-- ============================================================

create policy "video_credits: members see approved credits in workspace"
  on public.video_credits for select
  using (
    status = 'approved'
    and workspace_id in (
      select workspace_id from public.workspace_members
      where user_id = public.requesting_user_id()
    )
  );

create policy "video_credits: owner sees all credits"
  on public.video_credits for select
  using (workspace_id in (
    select id from public.workspaces where owner_id = public.requesting_user_id()
  ));

create policy "video_credits: owner can manage"
  on public.video_credits for all
  using (workspace_id in (
    select id from public.workspaces where owner_id = public.requesting_user_id()
  ));

create policy "video_credits: member can submit pending credit"
  on public.video_credits for insert
  with check (
    submitted_by = 'member'
    and status = 'pending'
    and member_id in (
      select id from public.workspace_members
      where user_id = public.requesting_user_id()
    )
  );

create policy "video_credits: member can update own credit"
  on public.video_credits for update
  using (member_id in (
    select id from public.workspace_members
    where user_id = public.requesting_user_id()
  ));

-- ============================================================
-- POLICIES: performance_logs (STRICTLY PRIVATE)
-- ============================================================

create policy "performance_logs: owner can manage"
  on public.performance_logs for all
  using (workspace_id in (
    select id from public.workspaces where owner_id = public.requesting_user_id()
  ));

-- Members can only read notes explicitly marked visible to them
create policy "performance_logs: member reads own visible notes"
  on public.performance_logs for select
  using (
    visible_to_member = true
    and member_id in (
      select id from public.workspace_members
      where user_id = public.requesting_user_id()
    )
  );

-- ============================================================
-- POLICIES: bonus_targets
-- ============================================================

create policy "bonus_targets: owner can manage"
  on public.bonus_targets for all
  using (workspace_id in (
    select id from public.workspaces where owner_id = public.requesting_user_id()
  ));

-- ============================================================
-- POLICIES: bonus_achievements
-- ============================================================

create policy "bonus_achievements: owner can manage"
  on public.bonus_achievements for all
  using (target_id in (
    select id from public.bonus_targets
    where workspace_id in (
      select id from public.workspaces where owner_id = public.requesting_user_id()
    )
  ));

-- ============================================================
-- POLICIES: channel_stats_snapshots
-- ============================================================

create policy "channel_stats: members can read"
  on public.channel_stats_snapshots for select
  using (workspace_id in (
    select workspace_id from public.workspace_members
    where user_id = public.requesting_user_id()
  ));

create policy "channel_stats: owner can manage"
  on public.channel_stats_snapshots for all
  using (workspace_id in (
    select id from public.workspaces where owner_id = public.requesting_user_id()
  ));

-- ============================================================
-- INDEXES
-- ============================================================

create index on public.users (clerk_user_id);
create index on public.workspaces (owner_id);
create index on public.workspace_members (workspace_id);
create index on public.workspace_members (user_id);
create index on public.invitations (workspace_id);
create index on public.invitations (token);
create index on public.invitations (email);
create index on public.videos (workspace_id);
create index on public.videos (youtube_video_id);
create index on public.video_credits (video_id);
create index on public.video_credits (workspace_id);
create index on public.video_credits (member_id);
create index on public.video_credits (status);
create index on public.performance_logs (workspace_id);
create index on public.performance_logs (member_id);
create index on public.bonus_targets (workspace_id);
create index on public.bonus_targets (member_id);
create index on public.bonus_achievements (target_id);
create index on public.channel_stats_snapshots (workspace_id, snapshot_date);
