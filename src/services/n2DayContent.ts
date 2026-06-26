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
