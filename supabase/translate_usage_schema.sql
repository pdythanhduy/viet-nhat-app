-- Daily character-usage counter for the public sentence-translate feature
-- (Azure Translator, via the azure-translate-proxy Edge Function).
-- Run once in the Supabase SQL Editor. Idempotent — safe to re-run.
--
-- Purpose: Azure Translator's free tier is a MONTHLY character budget. A
-- single client hammering the public proxy could burn through the whole
-- month's free quota (or push into billed usage) in minutes. This table
-- gives the proxy a cheap, atomic way to track today's total character
-- spend and hard-stop once a conservative daily budget is hit — well
-- before the monthly free-tier ceiling, and well before any real cost.
--
-- Privacy/security model: this table holds no user data, only one row per
-- day with a running character count. RLS is enabled with NO policies, so
-- neither the anon nor authenticated role can read or write it at all —
-- only the Edge Function (using the service-role key, which bypasses RLS)
-- can touch it. The increment function is additionally revoked from
-- PUBLIC so it can't be called via RPC from the app either.

CREATE TABLE IF NOT EXISTS public.translate_usage_daily (
  day        DATE    PRIMARY KEY,
  chars_used INTEGER NOT NULL DEFAULT 0
);

ALTER TABLE public.translate_usage_daily ENABLE ROW LEVEL SECURITY;
-- No policies added — table is unreachable from anon/authenticated roles.
-- Only the service-role key (used server-side by the Edge Function) can
-- read or write it.

-- Atomically add `p_chars` to today's counter and return the new total.
-- SECURITY DEFINER so the Edge Function's service-role call always works
-- regardless of RLS; REVOKE below keeps client-side RPC calls out.
CREATE OR REPLACE FUNCTION public.increment_translate_usage(p_chars INTEGER)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_total INTEGER;
BEGIN
  INSERT INTO public.translate_usage_daily (day, chars_used)
  VALUES (CURRENT_DATE, p_chars)
  ON CONFLICT (day) DO UPDATE
    SET chars_used = public.translate_usage_daily.chars_used + EXCLUDED.chars_used
  RETURNING chars_used INTO v_total;
  RETURN v_total;
END;
$$;

REVOKE ALL ON FUNCTION public.increment_translate_usage(INTEGER) FROM PUBLIC;
