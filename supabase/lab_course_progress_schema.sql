-- N2 Recovery course progress — owner-only, one row per user.
-- Run once in the Supabase SQL Editor. Idempotent — safe to re-run.
--
-- Same privacy model as lab_feature_flags: RLS ties the row to the owner's
-- auth.uid() AND verified JWT email, so only the owner's session can touch it.

CREATE TABLE IF NOT EXISTS public.lab_course_progress (
  user_id    UUID        PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
  data       JSONB       NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.lab_course_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "owner reads own progress" ON public.lab_course_progress;
CREATE POLICY "owner reads own progress"
  ON public.lab_course_progress
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id
    AND (auth.jwt() ->> 'email') = 'thanhduy8vn@gmail.com');

DROP POLICY IF EXISTS "owner inserts own progress" ON public.lab_course_progress;
CREATE POLICY "owner inserts own progress"
  ON public.lab_course_progress
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id
    AND (auth.jwt() ->> 'email') = 'thanhduy8vn@gmail.com');

DROP POLICY IF EXISTS "owner updates own progress" ON public.lab_course_progress;
CREATE POLICY "owner updates own progress"
  ON public.lab_course_progress
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id
    AND (auth.jwt() ->> 'email') = 'thanhduy8vn@gmail.com')
  WITH CHECK (auth.uid() = user_id
    AND (auth.jwt() ->> 'email') = 'thanhduy8vn@gmail.com');
