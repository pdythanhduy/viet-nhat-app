// React binding for the N2 course progress store (services/n2Progress.ts).

import { useEffect, useState } from 'react';
import {
  N2Progress,
  getProgress,
  isLoaded,
  loadProgress,
  subscribeProgress,
} from '../services/n2Progress';

export function useN2Progress(): N2Progress {
  const [state, setState] = useState<N2Progress>(() => getProgress());

  useEffect(() => {
    if (!isLoaded()) void loadProgress();
    const unsub = subscribeProgress(setState);
    return unsub;
  }, []);

  return state;
}
