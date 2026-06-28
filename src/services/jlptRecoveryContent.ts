import { readCache, stableHash, writeCache } from './jlptRecoveryCache';
import { getJlptRecoveryLevelConfig } from '../constants/jlptRecovery';
import { hasBundledDay, loadPregeneratedDay } from './jlptContentSource';
import type { JlptLevel, RecoveryDayContent } from './jlptRecoveryTypes';

export interface RecoveryDayInfo {
  theme: string;
  vocabTopic: string;
  kind?: 'normal' | 'review' | 'test';
}

export interface RecoveryContentSource {
  level: JlptLevel;
  day: number;
  getDayInfo: (day: number) => RecoveryDayInfo | undefined;
  seeds?: Record<number, RecoveryDayContent>;
}

// Content is always pre-generated (bundled N5 / Supabase N4–N1). Kept for the
// screens' API; there is no on-device generation path anymore.
export function isRecoveryContentConfigured(): boolean {
  return true;
}

function cacheKey(level: JlptLevel, day: number, promptVersion: string): string {
  return `jlpt_daycontent:${level}:d${day}:p${promptVersion}`;
}

export async function getRecoveryDayContent(source: RecoveryContentSource): Promise<RecoveryDayContent> {
  const config = getJlptRecoveryLevelConfig(source.level);

  const seed = source.seeds?.[source.day];
  if (seed) return seed;

  const dayInfo = source.getDayInfo(source.day);
  if (!dayInfo) throw new Error(`Khong co du lieu cho Day ${source.day}.`);

  const key = cacheKey(source.level, source.day, config.promptVersion);
  const cached = await readCache<RecoveryDayContent>(key, config.contentSchemaVersion);
  if (cached?.data?.vocab?.length) return cached.data;

  // Pre-generated content: bundle for free N5, Supabase for paid N4–N1.
  const pre = await loadPregeneratedDay(source.level, source.day);
  if (pre?.vocab?.length) {
    const content: RecoveryDayContent = {
      level: source.level,
      day: source.day,
      vocab: pre.vocab,
      quiz: pre.quiz,
    };
    await writeCache(key, content, config.contentSchemaVersion);
    return content;
  }

  // No pre-generated content for this day (not uploaded / not entitled / offline).
  throw new Error('no-content');
}

export async function hasReadyRecoveryDayContent(source: RecoveryContentSource): Promise<boolean> {
  const config = getJlptRecoveryLevelConfig(source.level);
  if (source.seeds?.[source.day]) return true;
  if (hasBundledDay(source.level, source.day)) return true;
  try {
    const cached = await readCache<RecoveryDayContent>(
      cacheKey(source.level, source.day, config.promptVersion),
      config.contentSchemaVersion,
    );
    return Boolean(cached?.data?.vocab?.length);
  } catch {
    return false;
  }
}

export function getRecoveryDayContentCacheKey(level: JlptLevel, day: number): string {
  return cacheKey(level, day, getJlptRecoveryLevelConfig(level).promptVersion);
}

export function getRecoveryDayContentHash(level: JlptLevel, day: number, topic: string): string {
  return stableHash(`${level}:${day}:${topic}`);
}
