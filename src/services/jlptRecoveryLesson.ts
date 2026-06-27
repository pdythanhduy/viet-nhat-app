import { getAnthropicApiKey } from './translate';
import { readCache, stableHash, writeCache } from './jlptRecoveryCache';
import { getJlptRecoveryLevelConfig } from '../constants/jlptRecovery';
import { generateRecoveryLesson } from './jlptGenerationCore';
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
