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

export type PurchaseReason = 'not-configured' | 'cancelled' | 'no-offering' | 'pending' | string;

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
    const offerings = await Purchases.getOfferings();
    const pkg =
      offerings.current?.availablePackages?.[0] ??
      offerings.all['default']?.availablePackages?.[0];
    if (!pkg) return { ok: false, reason: 'no-offering' };

    const { customerInfo } = await Purchases.purchasePackage(pkg);
    const pro = hasPro(customerInfo);
    return { ok: pro, reason: pro ? undefined : 'pending' };
  } catch (e) {
    const err = e as { userCancelled?: boolean; message?: string };
    if (err?.userCancelled) return { ok: false, reason: 'cancelled' };
    return { ok: false, reason: err?.message ?? 'error' };
  }
}

export async function restoreJlptPurchases(): Promise<PurchaseResult> {
  if (!isJlptPurchaseConfigured()) return { ok: false, reason: 'not-configured' };
  try {
    return { ok: hasPro(await Purchases.restorePurchases()) };
  } catch (e) {
    const err = e as { message?: string };
    return { ok: false, reason: err?.message ?? 'error' };
  }
}
