// JLPT "Pro" entitlement (unlocks paid levels N4–N1).
//
// The Pro flag for UI gating is the OR of two sources:
//   • RevenueCat (store) — the client-side truth, instant after purchase/restore.
//   • Supabase entitlements row — written server-side by the RevenueCat webhook;
//     this is also what Supabase RLS uses to actually serve paid content.
// The real content boundary is RLS; this flag only drives the picker/paywall UI.

import { supabase } from './supabaseClient';
import { configureJlptPurchases, syncJlptProFromStore } from './jlptPurchase';

let cached = false;
let loaded = false;
const listeners = new Set<(isPro: boolean) => void>();

function broadcast(): void {
  for (const cb of listeners) cb(cached);
}

export function getJlptPro(): boolean {
  return cached;
}

export function isJlptEntitlementLoaded(): boolean {
  return loaded;
}

export function subscribeJlptPro(cb: (isPro: boolean) => void): () => void {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

async function currentUserId(): Promise<string | undefined> {
  if (!supabase) return undefined;
  try {
    const { data } = await supabase.auth.getUser();
    return data.user?.id ?? undefined;
  } catch {
    return undefined;
  }
}

async function readServerPro(): Promise<boolean> {
  if (!supabase) return false;
  try {
    const userId = await currentUserId();
    if (!userId) return false;
    const { data, error } = await supabase
      .from('entitlements')
      .select('has_pro')
      .eq('user_id', userId)
      .maybeSingle();
    return !error && Boolean((data as { has_pro?: boolean } | null)?.has_pro);
  } catch {
    return false;
  }
}

/** Read Pro from both the store (RevenueCat) and the server (Supabase). Returns
 * false when not configured / not signed in / no entitlement / error. */
export async function loadJlptPro(): Promise<boolean> {
  loaded = true;
  // Link RevenueCat to the Supabase user so purchases attach to the right row.
  await configureJlptPurchases(await currentUserId());
  const [server, store] = await Promise.all([readServerPro(), syncJlptProFromStore()]);
  cached = server || store;
  broadcast();
  return cached;
}

/** Optimistic local update (e.g. right after a successful purchase, before the
 * webhook-written row is readable). RLS stays the source of truth for content. */
export function setJlptProLocal(isPro: boolean): void {
  cached = isPro;
  loaded = true;
  broadcast();
}
