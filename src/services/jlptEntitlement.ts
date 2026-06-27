// JLPT "Pro" entitlement (unlocks paid levels N4–N1).
//
// The READ here is only for UI gating — the real security boundary is Supabase
// RLS on `jlpt_content` (paid rows are unreadable without a Pro entitlement
// row). Pro is granted ONLY server-side (RevenueCat webhook / Edge Function via
// the service role); the client can never write it.

import { supabase } from './supabaseClient';

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

/** Read the signed-in user's entitlement from Supabase. Returns false when not
 * configured / not signed in / no row / error. */
export async function loadJlptPro(): Promise<boolean> {
  loaded = true;
  let next = false;
  if (supabase) {
    try {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData.user?.id;
      if (userId) {
        const { data, error } = await supabase
          .from('entitlements')
          .select('has_pro')
          .eq('user_id', userId)
          .maybeSingle();
        next = !error && Boolean((data as { has_pro?: boolean } | null)?.has_pro);
      }
    } catch {
      next = false;
    }
  }
  cached = next;
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
