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
    const unsub = subscribeJlptPro(setIsPro);
    if (!isJlptEntitlementLoaded()) {
      void ensureJlptSession()
        .then(() => loadJlptPro())
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
    return unsub;
  }, []);

  return { isPro, loading };
}
