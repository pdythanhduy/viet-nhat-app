// JLPT Pro purchase — RevenueCat (react-native-purchases) integration.
//
// One-time non-consumable unlock for N4–N1, entitlement id "pro". The client
// flips the local Pro flag for instant UI; the RevenueCat webhook writes the
// server-side entitlement row (Supabase RLS) which is the real content gate.
//
// This module does NOT import jlptEntitlement (avoids a cycle) — callers read
// the returned booleans and call setJlptProLocal themselves.
//
// Native module: only works in a dev client / EAS build, not Expo Go. All calls
// are guarded so the rest of the app (and tests) keep working when the native
// module or RevenueCat config is absent.

import { Platform } from 'react-native';
import Purchases, { type CustomerInfo } from 'react-native-purchases';

const ENTITLEMENT_ID = 'pro';

// Public SDK keys (safe to embed). Override via env if needed.
const IOS_KEY =
  process.env.EXPO_PUBLIC_REVENUECAT_IOS_KEY ?? 'appl_BZWxIBdhphqvLMYVRclIOggPHjS';
const ANDROID_KEY = process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_KEY ?? '';

function apiKey(): string {
  return Platform.OS === 'android' ? ANDROID_KEY : IOS_KEY;
}

export type PurchaseReason =
  | 'not-configured'
  | 'cancelled'
  | 'no-offering'
  | 'pending'
  | 'timeout'
  | string;

export interface PurchaseResult {
  ok: boolean;
  reason?: PurchaseReason;
}

export function isJlptPurchaseConfigured(): boolean {
  return Boolean(apiKey());
}

let configured = false;

/** Configure RevenueCat with the Supabase user id as appUserID so the webhook
 * can match the purchase to the right entitlements row. Safe to call repeatedly. */
export async function configureJlptPurchases(appUserId?: string | null): Promise<void> {
  if (!isJlptPurchaseConfigured()) return;
  try {
    if (!configured) {
      Purchases.configure({ apiKey: apiKey(), appUserID: appUserId ?? null });
      configured = true;
    } else if (appUserId) {
      await Purchases.logIn(appUserId);
    }
  } catch {
    // native module unavailable (Expo Go / web) — stay unconfigured
    configured = false;
  }
}

function hasPro(info: CustomerInfo): boolean {
  return Boolean(info.entitlements.active[ENTITLEMENT_ID]);
}

const STORE_TIMEOUT_MS = 20_000;

/** Races a store call against a timeout so a slow sandbox/network can't leave
 * the buy/restore button spinning forever. Rejects with a `timeout` Error. */
function withTimeout<T>(promise: Promise<T>, ms = STORE_TIMEOUT_MS): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('timeout')), ms);
    promise.then(
      (v) => {
        clearTimeout(timer);
        resolve(v);
      },
      (e) => {
        clearTimeout(timer);
        reject(e);
      },
    );
  });
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** RevenueCat's CustomerInfo can lag a beat behind a just-completed purchase
 * (more common in the App Review sandbox). Poll getCustomerInfo a few times
 * before concluding the entitlement really isn't there yet. */
async function waitForPro(initial: CustomerInfo): Promise<boolean> {
  if (hasPro(initial)) return true;
  for (let attempt = 0; attempt < 3; attempt++) {
    await sleep(700);
    try {
      const info = await withTimeout(Purchases.getCustomerInfo());
      if (hasPro(info)) return true;
    } catch {
      // keep retrying — a transient failure here shouldn't short-circuit the loop
    }
  }
  return false;
}

/** Read the current Pro entitlement from the store (RevenueCat). Returns false
 * when not configured / native module missing / error. */
export async function syncJlptProFromStore(): Promise<boolean> {
  if (!isJlptPurchaseConfigured() || !configured) return false;
  try {
    return hasPro(await Purchases.getCustomerInfo());
  } catch {
    return false;
  }
}

/** Localized price string for the Pro unlock (e.g. "¥1,500", "₫249,000"),
 * read from the store offering. Returns null when not configured / no offering /
 * native module missing — callers should hide the price rather than guess. */
export async function getJlptProPrice(): Promise<string | null> {
  if (!isJlptPurchaseConfigured() || !configured) return null;
  try {
    const offerings = await Purchases.getOfferings();
    const pkg =
      offerings.current?.availablePackages?.[0] ??
      offerings.all['default']?.availablePackages?.[0];
    return pkg?.product?.priceString ?? null;
  } catch {
    return null;
  }
}

export async function purchaseJlptPro(): Promise<PurchaseResult> {
  if (!isJlptPurchaseConfigured()) return { ok: false, reason: 'not-configured' };
  try {
    const offerings = await withTimeout(Purchases.getOfferings());
    const pkg =
      offerings.current?.availablePackages?.[0] ??
      offerings.all['default']?.availablePackages?.[0];
    if (!pkg) return { ok: false, reason: 'no-offering' };

    // Not timeout-wrapped: this is the actual StoreKit purchase sheet, which
    // can legitimately take a while for the user to interact with.
    const { customerInfo } = await Purchases.purchasePackage(pkg);
    // The transaction has already gone through at this point (no exception
    // thrown) — never report this as a plain failure. If the entitlement
    // isn't visible yet, poll briefly before falling back to 'pending'.
    const pro = await waitForPro(customerInfo);
    return { ok: pro, reason: pro ? undefined : 'pending' };
  } catch (e) {
    const err = e as { userCancelled?: boolean; message?: string };
    if (err?.userCancelled) return { ok: false, reason: 'cancelled' };
    if (err?.message === 'timeout') return { ok: false, reason: 'timeout' };
    return { ok: false, reason: err?.message ?? 'error' };
  }
}

export async function restoreJlptPurchases(): Promise<PurchaseResult> {
  if (!isJlptPurchaseConfigured()) return { ok: false, reason: 'not-configured' };
  try {
    return { ok: hasPro(await withTimeout(Purchases.restorePurchases())) };
  } catch (e) {
    const err = e as { message?: string };
    if (err?.message === 'timeout') return { ok: false, reason: 'timeout' };
    return { ok: false, reason: err?.message ?? 'error' };
  }
}
