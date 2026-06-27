import { getAnthropicApiKey } from './translate';
import { readCache, stableHash, writeCache } from './jlptRecoveryCache';
import { getJlptRecoveryLevelConfig } from '../constants/jlptRecovery';
import { generateRecoveryDayContent } from './jlptGenerationCore';
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

export function isRecoveryContentConfigured(): boolean {
  return Boolean(getAnthropicApiKey());
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

  const apiKey = getAnthropicApiKey();
  if (!apiKey) throw new Error('not-configured');

  const content = await generateRecoveryDayContent(
    { apiKey },
    {
      level: source.level,
      day: source.day,
      theme: dayInfo.theme,
      vocabTopic: dayInfo.vocabTopic,
    },
  );

  await writeCache(key, content, config.contentSchemaVersion);
  return content;
}

export async function hasReadyRecoveryDayContent(source: RecoveryContentSource): Promise<boolean> {
  const config = getJlptRecoveryLevelConfig(source.level);
  if (source.seeds?.[source.day]) return true;
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
