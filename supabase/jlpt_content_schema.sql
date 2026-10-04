-- JLPT Recovery — public content + entitlements (run once in Supabase SQL Editor).
-- Idempotent — safe to re-run.
--
-- N5 is bundled in the app; this table backs N4–N1. All levels are FREE: any
-- signed-in user (incl. anonymous auth) may read every level. The entitlements
-- table is kept so existing Pro rows / the RevenueCat webhook keep working.
--
-- Security model:
--   • entitlements  — a user may read their OWN row, but CANNOT write it. Pro is
--     granted exclusively by the service role (RevenueCat webhook / Edge Fn),
--     so a client can never grant itself Pro.
--   • jlpt_content  — anyone signed in (incl. anonymous-auth users) may read
--     every level. Rows are written ONLY by the service role (the upload
--     script / a webhook) — no client write policy.
--
-- NOTE: entitlements is created first (historically the content policy
-- referenced it; it is still used by the RevenueCat webhook).

-- ── Entitlements ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.entitlements (
  user_id    UUID        PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
  has_pro    BOOLEAN     NOT NULL DEFAULT FALSE,
  source     TEXT,                               -- e.g. 'revenuecat', 'manual'
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.entitlements ENABLE ROW LEVEL SECURITY;

-- Read: a user may read only their own entitlement row.
DROP POLICY IF EXISTS "read own entitlement" ON public.entitlements;
CREATE POLICY "read own entitlement"
  ON public.entitlements
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);
-- No write policy for clients → Pro is granted ONLY via the service role
-- (RevenueCat webhook / Edge Function), never by the app itself.

-- ── Content ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.jlpt_content (
  level          TEXT        NOT NULL,            -- 'N5'|'N4'|'N3'|'N2'|'N1'
  day            INT         NOT NULL,
  payload        JSONB       NOT NULL,            -- { vocab, quiz, lesson }
  schema_version INT         NOT NULL DEFAULT 1,
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (level, day)
);

ALTER TABLE public.jlpt_content ENABLE ROW LEVEL SECURITY;

-- Read: every level free to any signed-in (incl. anonymous) user.
DROP POLICY IF EXISTS "read jlpt content" ON public.jlpt_content;
CREATE POLICY "read jlpt content"
  ON public.jlpt_content
  FOR SELECT
  TO authenticated
  USING (true);
-- No INSERT/UPDATE/DELETE policy → only the service role can write content.
