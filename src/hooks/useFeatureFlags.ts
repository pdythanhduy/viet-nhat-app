// React bindings for the feature-flag store (services/featureFlags.ts).
//
// useFeatureFlags() — full state, re-renders on any change.
// useFeatureFlag(key) — a single flag, for gating one feature.

import { useEffect, useState } from 'react';
import {
  FeatureFlagKey,
  FeatureFlagState,
  getFlags,
  isLoaded,
  loadFlags,
  subscribeFlags,
} from '../services/featureFlags';

export function useFeatureFlags(): FeatureFlagState {
  const [state, setState] = useState<FeatureFlagState>(() => getFlags());

  useEffect(() => {
    // Lazily ensure flags are loaded from storage the first time any
    // component subscribes (idempotent — loadFlags just re-reads + broadcasts).
    if (!isLoaded()) void loadFlags();
    const unsub = subscribeFlags(setState);
    return unsub;
  }, []);

  return state;
}

export function useFeatureFlag(key: FeatureFlagKey): boolean {
  return useFeatureFlags()[key];
}
