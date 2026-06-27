import { useEffect, useState } from 'react';

import { ensureJlptSession } from '../services/anonAuth';
import {
  getJlptPro,
  isJlptEntitlementLoaded,
  loadJlptPro,
  subscribeJlptPro,
} from '../services/jlptEntitlement';

export interface JlptEntitlement {
  isPro: boolean;
  loading: boolean;
}

export function useJlptEntitlement(): JlptEntitlement {
  const [isPro, setIsPro] = useState<boolean>(getJlptPro);
  const [loading, setLoading] = useState<boolean>(!isJlptEntitlementLoaded());

  useEffect(() => {
    let mounted = true;
    const unsub = subscribeJlptPro(setIsPro);
    if (!isJlptEntitlementLoaded()) {
      void ensureJlptSession()
        .then(() => loadJlptPro())
        .finally(() => { if (mounted) setLoading(false); });
    }
    return () => {
      mounted = false;
      unsub();
    };
  }, []);

  return { isPro, loading };
}
