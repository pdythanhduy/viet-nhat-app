import { getAnthropicApiKey } from './translate';
import { readCache, stableHash, writeCache } from './jlptRecoveryCache';
import { getJlptRecoveryLevelConfig } from '../constants/jlptRecovery';
import { generateRecoveryLesson } from './jlptGenerationCore';
import { hasBundledLesson, loadPregeneratedDay } from './jlptContentSource';
import type { JlptLevel, RecoveryLesson } from './jlptRecoveryTypes';

export interface RecoveryLessonSource {
  level: JlptLevel;
  day: number;
  theme: string;
  patterns: string[];
}

export function isRecoveryLessonConfigured(): boolean {
  return Boolean(getAnthropicApiKey());
}

function cacheKey(level: JlptLevel, day: number, patterns: string[], promptVersion: string): string {
  return `jlpt_lesson:${level}:d${day}:p${promptVersion}:${stableHash(patterns.join('|'))}`;
}

export async function getRecoveryLesson(source: RecoveryLessonSource): Promise<RecoveryLesson> {
  const config = getJlptRecoveryLevelConfig(source.level);
  const key = cacheKey(source.level, source.day, source.patterns, config.promptVersion);

  const cached = await readCache<RecoveryLesson>(key, config.lessonSchemaVersion);
  if (cached?.data?.grammar?.length) return cached.data;

  // Prefer pre-generated lesson (bundle for N5, Supabase for paid levels).
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

  // Fallback: on-device generation (transitional — removed with the client key).
  const apiKey = getAnthropicApiKey();
  if (!apiKey) throw new Error('not-configured');

  const lesson = await generateRecoveryLesson(
    { apiKey },
    {
      level: source.level,
      day: source.day,
      theme: source.theme,
      patterns: source.patterns,
    },
  );
  await writeCache(key, lesson, config.lessonSchemaVersion);
  return lesson;
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
