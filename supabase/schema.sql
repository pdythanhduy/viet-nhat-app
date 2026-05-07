-- viet-nhat-app content schema for Phase 2 lazy-load.
-- Run once in Supabase SQL Editor (or via supabase migration if you set
-- that up later). Idempotent — re-running is safe.

-- 1. Table that holds every content payload, keyed the same way the
--    client's BUNDLED map keys them (e.g. 'japanese.phrases.greetings',
--    'stories.all', 'adminGuides.all').
CREATE TABLE IF NOT EXISTS public.content (
  key            TEXT PRIMARY KEY,
  schema_version INTEGER     NOT NULL DEFAULT 1,
  payload        JSONB       NOT NULL,
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Auto-bump updated_at on every UPDATE so cache invalidation is honest.
CREATE OR REPLACE FUNCTION public.set_content_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS content_set_updated_at ON public.content;
CREATE TRIGGER content_set_updated_at
  BEFORE UPDATE ON public.content
  FOR EACH ROW
  EXECUTE FUNCTION public.set_content_updated_at();

-- 3. Row-Level Security:
--    - anon clients (the app) can SELECT — that's how the lazy-loader fetches
--    - INSERT/UPDATE/DELETE require service_role (admin / upload script only)
ALTER TABLE public.content ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon read content" ON public.content;
CREATE POLICY "anon read content"
  ON public.content
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- service_role bypasses RLS by default in Supabase, so no INSERT/UPDATE
-- policy is needed — only the upload script (which uses the service-role
-- key) can write.

-- 4. Sanity check.
SELECT
  'public.content' AS table_name,
  COUNT(*)         AS rows
FROM public.content;
