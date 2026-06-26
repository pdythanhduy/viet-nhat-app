import { useEffect, useState } from 'react';

import type { JlptLevel } from '../services/jlptRecoveryTypes';
import {
  getProgress,
  isLoaded,
  loadProgress,
  subscribeProgress,
  type RecoveryProgress,
} from '../services/jlptRecoveryProgress';

export function useJlptRecoveryProgress(level: JlptLevel): RecoveryProgress {
  const [state, setState] = useState<RecoveryProgress>(() => getProgress(level));

  useEffect(() => {
    if (!isLoaded(level)) void loadProgress(level);
    const unsub = subscribeProgress(level, setState);
    return unsub;
  }, [level]);

  return state;
}
