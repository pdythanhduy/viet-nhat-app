// Supabase Edge Function: Anthropic proxy for the owner-only Furigana reader.
//
// The app no longer ships EXPO_PUBLIC_ANTHROPIC_API_KEY (a public bundle would
// leak it). Instead the translation/explain calls go through this proxy, which
// holds the key as a server secret and only serves the OWNER's signed-in Lab
// account — translation is an owner-only feature, so a public/anonymous session
// is rejected before any Anthropic call (no key leak, no cost abuse).
//
// Deploy:
//   supabase functions deploy anthropic-proxy --no-verify-jwt
//   supabase secrets set ANTHROPIC_API_KEY=sk-ant-...
// (SUPABASE_URL and SUPABASE_ANON_KEY are injected automatically.)
//
// The client calls it via supabase.functions.invoke('anthropic-proxy', { body }),
// which attaches the caller's access token as the Authorization header.

import { createClient } from 'jsr:@supabase/supabase-js@2';

// Mirror of OWNER_EMAILS in src/services/jlptEntitlement.ts.
const OWNER_EMAILS = new Set(['thanhduy8vn@gmail.com', 'pdyttd8vn@gmail.com']);

const ANTHROPIC_ENDPOINT = 'https://api.anthropic.com/v1/messages';
const ANTHROPIC_VERSION = '2023-06-01';

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

  // Authenticate the caller and require an owner account.
  const authHeader = req.headers.get('Authorization') ?? '';
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  if (!token) return json({ error: { message: 'Missing token' } }, 401);

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const anonKey = Deno.env.get('SUPABASE_ANON_KEY');
  if (!supabaseUrl || !anonKey) return json({ error: { message: 'Proxy misconfigured' } }, 500);

  const supabase = createClient(supabaseUrl, anonKey);
  const { data, error } = await supabase.auth.getUser(token);
  const email = data?.user?.email?.toLowerCase();
  if (error || !email || !OWNER_EMAILS.has(email)) {
    return json({ error: { message: 'Forbidden' } }, 403);
  }

  const apiKey = Deno.env.get('ANTHROPIC_API_KEY');
  if (!apiKey) return json({ error: { message: 'ANTHROPIC_API_KEY not set' } }, 500);

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return json({ error: { message: 'Invalid JSON body' } }, 400);
  }

  // Pass the Messages API payload straight through (model, max_tokens, system, messages).
  const upstream = await fetch(ANTHROPIC_ENDPOINT, {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': ANTHROPIC_VERSION,
      'content-type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const text = await upstream.text();
  return new Response(text, {
    status: upstream.status,
    headers: { ...CORS, 'content-type': 'application/json' },
  });
});
