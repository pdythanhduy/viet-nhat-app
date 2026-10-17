-- JLPT — make every level free (run once in Supabase SQL Editor). Idempotent.
--
-- Replaces the jlpt_content read policy that required a Pro entitlement for
-- N4–N1. After this, any signed-in user (incl. anonymous auth) can read all
-- levels. Writes stay service-role only (no client write policy).

DROP POLICY IF EXISTS "read jlpt content" ON public.jlpt_content;
CREATE POLICY "read jlpt content"
  ON public.jlpt_content
  FOR SELECT
  TO authenticated
  USING (true);
