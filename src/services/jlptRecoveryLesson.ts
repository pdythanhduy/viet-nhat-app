import { readCache, stableHash, writeCache } from './jlptRecoveryCache';
import { getJlptRecoveryLevelConfig } from '../constants/jlptRecovery';
import { hasBundledLesson, loadPregeneratedDay } from './jlptContentSource';
import type { JlptLevel, RecoveryLesson } from './jlptRecoveryTypes';

export interface RecoveryLessonSource {
  level: JlptLevel;
  day: number;
  theme: string;
  patterns: string[];
}

// Lessons are pre-generated (bundled N5 / Supabase N4–N1). No on-device path.
export function isRecoveryLessonConfigured(): boolean {
  return true;
}

function cacheKey(level: JlptLevel, day: number, patterns: string[], promptVersion: string): string {
  return `jlpt_lesson:${level}:d${day}:p${promptVersion}:${stableHash(patterns.join('|'))}`;
}

export async function getRecoveryLesson(source: RecoveryLessonSource): Promise<RecoveryLesson> {
  const config = getJlptRecoveryLevelConfig(source.level);
  const key = cacheKey(source.level, source.day, source.patterns, config.promptVersion);

  const cached = await readCache<RecoveryLesson>(key, config.lessonSchemaVersion);
  if (cached?.data?.grammar?.length) return cached.data;

  // Pre-generated lesson: bundle for free N5, Supabase for paid N4–N1.
  const pre = await loadPregeneratedDay(source.level, source.day);
  if (pre?.lesson?.length) {
    const lesson: RecoveryLesson = {
      level: source.level,
      day: source.day,
      grammar: pre.lesson,
    };
    await writeCache(key, lesson, config.lessonSchemaVersion);
    return lesson;
  }

  // No pre-generated lesson for this day.
  throw new Error('no-content');
}

export async function hasCachedRecoveryLesson(source: RecoveryLessonSource): Promise<boolean> {
  const config = getJlptRecoveryLevelConfig(source.level);
  if (hasBundledLesson(source.level, source.day)) return true;
  try {
    const cached = await readCache<RecoveryLesson>(
      cacheKey(source.level, source.day, source.patterns, config.promptVersion),
      config.lessonSchemaVersion,
    );
    return Boolean(cached?.data?.grammar?.length);
  } catch {
    return false;
  }
}
