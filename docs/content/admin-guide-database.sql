-- Postgres/Supabase schema for admin guide content.
-- Source rows: buildAdminGuideDatabaseRows(buildAdminGuideDatabaseSnapshot(ADMIN_CONTENT_META, ADMIN_GUIDES))
-- Current app schema version: ADMIN_GUIDE_DATABASE_SCHEMA_VERSION = 1

create table if not exists public.admin_content_versions (
  id text primary key,
  schema_version integer not null check (schema_version = 1),
  content_version date not null,
  metadata jsonb not null,
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists public.admin_guides (
  id text primary key,
  schema_version integer not null check (schema_version = 1),
  content_version date not null,
  category text not null check (
    category in ('immigration', 'visa', 'daily-law', 'traffic', 'health', 'money', 'license')
  ),
  priority text check (priority in ('high', 'normal')),
  last_verified date not null,
  title text not null,
  title_jp text not null,
  icon text not null,
  color text not null check (color ~ '^#[0-9A-Fa-f]{6}$'),
  description text not null,
  search_keywords text[] not null default '{}',
  legal_scope jsonb,
  quick_action jsonb,
  hero_image_key text,
  hero_image_caption text,
  who_is_this_for jsonb not null default '[]'::jsonb,
  when_to_do jsonb not null default '[]'::jsonb,
  where_to_do jsonb not null default '[]'::jsonb,
  estimated_time text,
  fees jsonb not null default '[]'::jsonb,
  documents_checklist jsonb not null default '[]'::jsonb,
  common_mistakes jsonb not null default '[]'::jsonb,
  faq jsonb not null default '[]'::jsonb,
  official_links jsonb not null,
  steps jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint admin_guides_official_links_array check (jsonb_typeof(official_links) = 'array'),
  constraint admin_guides_steps_array check (jsonb_typeof(steps) = 'array'),
  constraint admin_guides_has_official_links check (jsonb_array_length(official_links) > 0),
  constraint admin_guides_has_steps check (jsonb_array_length(steps) >= 2)
);

create index if not exists admin_guides_content_version_idx
  on public.admin_guides (content_version desc);

create index if not exists admin_guides_category_idx
  on public.admin_guides (category);

create index if not exists admin_guides_last_verified_idx
  on public.admin_guides (last_verified desc);

create index if not exists admin_guides_official_links_gin_idx
  on public.admin_guides using gin (official_links);

create index if not exists admin_guides_steps_gin_idx
  on public.admin_guides using gin (steps);

create index if not exists admin_guides_search_keywords_gin_idx
  on public.admin_guides using gin (search_keywords);
