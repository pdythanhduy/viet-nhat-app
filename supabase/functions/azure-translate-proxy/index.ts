// Supabase Edge Function: Azure Translator proxy for the public
// "dịch câu" (sentence translate) feature.
//
// Unlike anthropic-proxy, this is NOT owner-gated — it's meant for every
// app user. To keep it free/near-free:
//   1. Per-request text is capped (MAX_CHARS) — bounds worst-case cost.
//   2. A running daily character total (public.translate_usage_daily,
//      via increment_translate_usage) hard-stops once DAILY_CHAR_BUDGET is
//      hit, well under Azure's free-tier monthly ceiling, so a single
//      abusive client can't burn the month's quota or trigger billing.
//   3. The Azure key never ships in the app bundle — it lives only as a
//      server secret here.
//
// Deploy:
//   supabase functions deploy azure-translate-proxy --no-verify-jwt
//   supabase secrets set AZURE_TRANSLATOR_KEY=...
//   supabase secrets set AZURE_TRANSLATOR_REGION=...   (e.g. "southeastasia")
// (SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are injected automatically.)
//
// Run supabase/translate_usage_schema.sql once before deploying.

import { createClient } from 'jsr:@supabase/supabase-js@2';

const AZURE_ENDPOINT = 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=ja&to=vi';

// One long Japanese sentence, not a paragraph/article — keeps this a
// "translate câu" feature, not a free substitute for the Claude reader.
const MAX_CHARS = 200;

// Conservative daily ceiling, well under Azure's free-tier monthly budget
// (2,000,000 chars/month ≈ 66,000/day average). Tune down if abuse shows up.
const DAILY_CHAR_BUDGET = 40_000;

const CORS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, content-type, apikey, x-client-info',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, 'content-type': 'application/json' },
  });
}

Deno.serve(async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });
  if (req.method !== 'POST') return json({ error: { message: 'Method not allowed' } }, 405);

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return json({ error: { message: 'Invalid JSON body' } }, 400);
  }

  const text = (payload as { text?: unknown })?.text;
  if (typeof text !== 'string' || !text.trim()) {
    return json({ error: { message: 'Missing "text".' } }, 400);
  }
  const trimmed = text.trim();
  if (trimmed.length > MAX_CHARS) {
    return json({ error: { message: `Text exceeds ${MAX_CHARS} character limit.` } }, 400);
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  const azureKey = Deno.env.get('AZURE_TRANSLATOR_KEY');
  const azureRegion = Deno.env.get('AZURE_TRANSLATOR_REGION');
  if (!supabaseUrl || !serviceRoleKey) return json({ error: { message: 'Proxy misconfigured' } }, 500);
  if (!azureKey || !azureRegion) return json({ error: { message: 'AZURE_TRANSLATOR_KEY/REGION not set' } }, 500);

  // Reserve budget before calling Azure — if this pushes today's total over
  // the ceiling, stop here (still counted, so the check stays a hard cap).
  const supabase = createClient(supabaseUrl, serviceRoleKey);
  const { data: totalToday, error: usageError } = await supabase.rpc('increment_translate_usage', {
    p_chars: trimmed.length,
  });
  if (usageError) return json({ error: { message: 'Usage tracking failed.' } }, 500);
  if (typeof totalToday === 'number' && totalToday > DAILY_CHAR_BUDGET) {
    return json({ error: { message: 'Đã đạt giới hạn dịch hôm nay, thử lại vào ngày mai.' } }, 429);
  }

  const upstream = await fetch(AZURE_ENDPOINT, {
    method: 'POST',
    headers: {
      'Ocp-Apim-Subscription-Key': azureKey,
      'Ocp-Apim-Subscription-Region': azureRegion,
      'content-type': 'application/json',
    },
    body: JSON.stringify([{ text: trimmed }]),
  });

  if (!upstream.ok) {
    const detail = await upstream.text();
    return json({ error: { message: `Azure Translator error: ${detail}` } }, upstream.status);
  }

  const result = (await upstream.json()) as Array<{ translations?: Array<{ text?: string }> }>;
  const translation = result?.[0]?.translations?.[0]?.text;
  if (!translation) return json({ error: { message: 'No translation returned.' } }, 502);

  return json({ translation }, 200);
});
