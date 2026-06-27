// Supabase Edge Function: RevenueCat webhook → grant/revoke the Pro entitlement.
//
// RevenueCat POSTs purchase events here. We match event.app_user_id (which the
// app sets to the Supabase user id via Purchases.configure({ appUserID })) and
// upsert public.entitlements with the SERVICE ROLE key (bypasses RLS — the only
// way Pro is ever granted; clients can't write that table).
//
// Deploy:
//   supabase functions deploy revenuecat-webhook --no-verify-jwt
//   supabase secrets set REVENUECAT_WEBHOOK_SECRET=<a long random string>
// (SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are injected automatically.)
//
// Then in RevenueCat → Integrations → Webhooks:
//   URL    = https://<project-ref>.supabase.co/functions/v1/revenuecat-webhook
//   Header = Authorization: <the same REVENUECAT_WEBHOOK_SECRET>

import { createClient } from 'jsr:@supabase/supabase-js@2';

// One-time non-consumable: these mean "the user now owns Pro".
const GRANT = new Set([
  'INITIAL_PURCHASE',
  'NON_RENEWING_PURCHASE',
  'UNCANCELLATION',
  'TRANSFER',
  'PRODUCT_CHANGE',
]);
// Refund / chargeback → revoke.
const REVOKE = new Set(['REFUND', 'CANCELLATION', 'EXPIRATION']);

Deno.serve(async (req: Request): Promise<Response> => {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 });

  // Shared-secret auth (configured as the webhook's Authorization header).
  const expected = Deno.env.get('REVENUECAT_WEBHOOK_SECRET');
  if (!expected || req.headers.get('Authorization') !== expected) {
    return new Response('Unauthorized', { status: 401 });
  }

  let event: { type?: string; app_user_id?: string };
  try {
    const body = await req.json();
    event = body?.event ?? {};
  } catch {
    return new Response('Bad JSON', { status: 400 });
  }

  const type = event.type ?? '';
  const userId = event.app_user_id ?? '';
  if (!userId) return new Response('No app_user_id', { status: 200 });

  // Anonymous RevenueCat ids (e.g. "$RCAnonymousID:...") aren't Supabase uids.
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-/i.test(userId)) {
    return new Response('Non-uuid app_user_id ignored', { status: 200 });
  }

  let hasPro: boolean;
  if (GRANT.has(type)) hasPro = true;
  else if (REVOKE.has(type)) hasPro = false;
  else return new Response(`Ignored event ${type}`, { status: 200 });

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    { auth: { persistSession: false } },
  );

  const { error } = await supabase.from('entitlements').upsert(
    { user_id: userId, has_pro: hasPro, source: 'revenuecat', updated_at: new Date().toISOString() },
    { onConflict: 'user_id' },
  );
  if (error) return new Response(`DB error: ${error.message}`, { status: 500 });

  return new Response(JSON.stringify({ ok: true, user_id: userId, has_pro: hasPro }), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  });
});
