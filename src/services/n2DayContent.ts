import AsyncStorage from '@react-native-async-storage/async-storage';
import { N2_DAY1_CONTENT } from '../constants/n2/day1Content';
import { N2_DAY2_CONTENT } from '../constants/n2/day2Content';
import { N2_DAY3_CONTENT } from '../constants/n2/day3Content';
import { getN2Day } from '../constants/n2RecoveryCurriculum';
import {
  getRecoveryDayContent,
  hasReadyRecoveryDayContent,
  isRecoveryContentConfigured,
} from './jlptRecoveryContent';
import type { N2DayContent } from './n2DayContentTypes';

// One-time cleanup of cache keys from the pre-refactor format.
// Old: 'n2_daycontent_v1:d{N}' and 'n2_lesson_v1:d{N}:...'
// New: 'jlpt_recovery_cache_v1::jlpt_daycontent:N2:...'
// Call once at app startup; safe to call multiple times (no-ops after first run).
export async function migrateN2CacheKeys(): Promise<void> {
  try {
    const allKeys = await AsyncStorage.getAllKeys();
    const staleKeys = allKeys.filter(
      (k) => k.startsWith('n2_daycontent_v1:') || k.startsWith('n2_lesson_v1:'),
    );
    if (staleKeys.length > 0) await AsyncStorage.multiRemove(staleKeys);
  } catch {
    // Best-effort; stale keys are harmless (just waste storage).
  }
}

const SEEDS: Record<number, N2DayContent> = {
  1: N2_DAY1_CONTENT,
  2: N2_DAY2_CONTENT,
  3: N2_DAY3_CONTENT,
};

export function isDayContentConfigured(): boolean {
  return isRecoveryContentConfigured();
}

export function hasSeed(day: number): boolean {
  return Boolean(SEEDS[day]);
}

export async function getDayContent(day: number): Promise<N2DayContent> {
  const result = await getRecoveryDayContent({
    level: 'N2',
    day,
    getDayInfo: (d) => {
      const info = getN2Day(d);
      return info ? { theme: info.theme, vocabTopic: info.vocabTopic, kind: info.kind } : undefined;
    },
    seeds: SEEDS,
  });
  return result as N2DayContent;
}

export async function hasReadyDayContent(day: number): Promise<boolean> {
  return hasReadyRecoveryDayContent({
    level: 'N2',
    day,
    getDayInfo: (d) => {
      const info = getN2Day(d);
      return info ? { theme: info.theme, vocabTopic: info.vocabTopic, kind: info.kind } : undefined;
    },
    seeds: SEEDS,
  });
}
