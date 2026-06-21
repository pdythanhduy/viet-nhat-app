-- Private "Lab" (Phòng thí nghiệm) schema — owner-only feature flags.
-- Run once in the Supabase SQL Editor. Idempotent — safe to re-run.
--
-- Privacy model: one row per authenticated user, holding that user's flag
-- state as JSONB. Row-Level Security ties every row to auth.uid(), so a
-- signed-in user can only ever read/write their OWN row. The app ships the
-- public anon key, but the anon role can't touch this table at all —
-- access requires a real user session.

-- 1. Table: one flags blob per owner.
CREATE TABLE IF NOT EXISTS public.lab_feature_flags (
  user_id    UUID        PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
  flags      JSONB       NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Row-Level Security: each user sees and edits only their own row.
ALTER TABLE public.lab_feature_flags ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "owner reads own flags" ON public.lab_feature_flags;
CREATE POLICY "owner reads own flags"
  ON public.lab_feature_flags
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "owner inserts own flags" ON public.lab_feature_flags;
CREATE POLICY "owner inserts own flags"
  ON public.lab_feature_flags
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "owner updates own flags" ON public.lab_feature_flags;
CREATE POLICY "owner updates own flags"
  ON public.lab_feature_flags
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 3. Single-owner hard lock. Even with open sign-ups, only the session
--    whose verified JWT email matches the owner can touch this table —
--    any other account gets zero rows and zero writes. Re-run this block
--    to apply / update the owner email.
DROP POLICY IF EXISTS "owner reads own flags" ON public.lab_feature_flags;
CREATE POLICY "owner reads own flags"
  ON public.lab_feature_flags
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id
    AND (auth.jwt() ->> 'email') = 'thanhduy8vn@gmail.com');

DROP POLICY IF EXISTS "owner inserts own flags" ON public.lab_feature_flags;
CREATE POLICY "owner inserts own flags"
  ON public.lab_feature_flags
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id
    AND (auth.jwt() ->> 'email') = 'thanhduy8vn@gmail.com');

DROP POLICY IF EXISTS "owner updates own flags" ON public.lab_feature_flags;
CREATE POLICY "owner updates own flags"
  ON public.lab_feature_flags
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id
    AND (auth.jwt() ->> 'email') = 'thanhduy8vn@gmail.com')
  WITH CHECK (auth.uid() = user_id
    AND (auth.jwt() ->> 'email') = 'thanhduy8vn@gmail.com');
