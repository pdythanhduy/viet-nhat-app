// JLPT Pro purchase — seam for the paywall.
//
// Phase 5 ships the paywall UI against this interface; Phase 4 implements it
// with RevenueCat (react-native-purchases): purchasePackage → on success call
// setJlptProLocal(true) for instant UI, while the RevenueCat webhook writes the
// server-side entitlement row (the real gate). Until then, purchases are
// "not-configured" and the paywall shows a coming-soon notice.

export type PurchaseReason = 'not-configured' | 'cancelled' | 'pending' | string;

export interface PurchaseResult {
  ok: boolean;
  reason?: PurchaseReason;
}

export function isJlptPurchaseConfigured(): boolean {
  // TODO(P4): true once RevenueCat is wired up.
  return false;
}

export async function purchaseJlptPro(): Promise<PurchaseResult> {
  // TODO(P4): RevenueCat purchasePackage(...) → setJlptProLocal(true) on success.
  return { ok: false, reason: 'not-configured' };
}

export async function restoreJlptPurchases(): Promise<PurchaseResult> {
  // TODO(P4): RevenueCat restorePurchases() → setJlptProLocal(entitlement).
  return { ok: false, reason: 'not-configured' };
}
