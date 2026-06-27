-- JLPT Recovery — public content + entitlements (run once in Supabase SQL Editor).
-- Idempotent — safe to re-run.
--
-- Free level N5 is bundled in the app; this backs the PAID levels (N4–N1) and
-- the per-user "Pro" entitlement that gates them.
--
-- Security model:
--   • jlpt_content  — anyone (incl. anonymous-auth users) may read N5; paid
--     levels only when the user has a Pro entitlement. Rows are written ONLY by
--     the service role (the upload script / a webhook) — no client write policy.
--   • entitlements  — a user may read their OWN row, but CANNOT write it. Pro is
--     granted exclusively by the service role (RevenueCat webhook / Edge Fn),
--     so a client can never grant itself Pro.

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

-- Read: N5 free to any signed-in (incl. anonymous) user; paid levels need Pro.
DROP POLICY IF EXISTS "read jlpt content" ON public.jlpt_content;
CREATE POLICY "read jlpt content"
  ON public.jlpt_content
  FOR SELECT
  TO authenticated
  USING (
    level = 'N5'
    OR EXISTS (
      SELECT 1 FROM public.entitlements e
      WHERE e.user_id = auth.uid() AND e.has_pro = TRUE
    )
  );
-- No INSERT/UPDATE/DELETE policy → only the service role can write content.

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
