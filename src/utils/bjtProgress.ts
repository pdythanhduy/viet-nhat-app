import AsyncStorage from '@react-native-async-storage/async-storage';

import { StorageKeys } from '../constants/storageKeys';
import { BjtAuthoringLevel } from '../types/content';

export type BjtSkill = 'listening' | 'listening-reading' | 'reading';
export type BjtProgressLevel = BjtAuthoringLevel | 'all';

export interface BjtMockSummary {
  level: BjtProgressLevel;
  score: number;
  total: number;
  percent: number;
  completedAt: string;
  skillBreakdown: Record<BjtSkill, { correct: number; total: number }>;
}

export interface BjtMockExamV2Summary {
  examId: string;
  level: 'J2' | 'J3' | 'J4' | 'all';
  score: number;
  total: number;
  percent: number;
  completedAt: string;
  partBreakdown: Record<'I' | 'II' | 'III', { correct: number; total: number }>;
}

export interface BjtScenarioSession {
  level: BjtProgressLevel;
  answered: number;
  correct: number;
  percent: number;
  completedAt: string;
  skillBreakdown: Record<BjtSkill, { correct: number; total: number }>;
}

export interface BjtWrongQuestion {
  questionId: string;
  source: 'scenario' | 'mock' | 'mock-v2';
  skill?: BjtSkill;
  part?: 'I' | 'II' | 'III';
  examId?: string;
  level: BjtProgressLevel;
  recordedAt: string;
}

export interface BjtProgressData {
  reviewedVocabularyIds: string[];
  totalVocabularyReviewed: number;
  scenarioPracticeSessions: number;
  totalScenarioQuestionsAnswered: number;
  totalScenarioCorrect: number;
  scenarioSkillBreakdown: Record<BjtSkill, { correct: number; total: number }>;
  scenarioHistory: BjtScenarioSession[];
  recentWrongQuestions: BjtWrongQuestion[];
  bestMockPercent: number;
  lastMock?: BjtMockSummary;
  mockHistory: BjtMockSummary[];
  bestMockExamV2Percent: number;
  lastMockExamV2?: BjtMockExamV2Summary;
  mockExamsV2History: BjtMockExamV2Summary[];
  weakestSkill?: BjtSkill;
}

export interface BjtLevelSnapshot {
  level: BjtProgressLevel;
  scenarioPracticeSessions: number;
  totalScenarioQuestionsAnswered: number;
  totalScenarioCorrect: number;
  scenarioAccuracy: number | null;
  scenarioSkillBreakdown: Record<BjtSkill, { correct: number; total: number }>;
  recentScenarioHistory: BjtScenarioSession[];
  bestMockPercent: number;
  lastMock?: BjtMockSummary;
  recentMockHistory: BjtMockSummary[];
  bestMockExamV2Percent: number;
  lastMockExamV2?: BjtMockExamV2Summary;
  recentMockExamsV2History: BjtMockExamV2Summary[];
  weakestSkill?: BjtSkill;
  wrongReviewCount: number;
}

const HISTORY_LIMIT = 6;

const emptySkillBreakdown = (): Record<BjtSkill, { correct: number; total: number }> => ({
  listening: { correct: 0, total: 0 },
  'listening-reading': { correct: 0, total: 0 },
  reading: { correct: 0, total: 0 },
});

const DEFAULT_DATA: BjtProgressData = {
  reviewedVocabularyIds: [],
  totalVocabularyReviewed: 0,
  scenarioPracticeSessions: 0,
  totalScenarioQuestionsAnswered: 0,
  totalScenarioCorrect: 0,
  scenarioSkillBreakdown: emptySkillBreakdown(),
  scenarioHistory: [],
  recentWrongQuestions: [],
  bestMockPercent: 0,
  mockHistory: [],
  bestMockExamV2Percent: 0,
  mockExamsV2History: [],
};

function getWeakestSkill(
  breakdown: Record<BjtSkill, { correct: number; total: number }>
): BjtSkill | undefined {
  const ranked = (Object.entries(breakdown) as [BjtSkill, { correct: number; total: number }][])
    .filter(([, value]) => value.total > 0)
    .map(([key, value]) => ({ key, ratio: value.correct / value.total }))
    .sort((a, b) => a.ratio - b.ratio);

  return ranked[0]?.key;
}

function mergeSkillBreakdown(
  base: Record<BjtSkill, { correct: number; total: number }>,
  incoming: Record<BjtSkill, { correct: number; total: number }>
): Record<BjtSkill, { correct: number; total: number }> {
  const result = emptySkillBreakdown();
  const skills: BjtSkill[] = ['listening', 'listening-reading', 'reading'];

  for (const skill of skills) {
    result[skill] = {
      correct: (base[skill]?.correct ?? 0) + (incoming[skill]?.correct ?? 0),
      total: (base[skill]?.total ?? 0) + (incoming[skill]?.total ?? 0),
    };
  }

  return result;
}

function computeWeakestSkill(
  scenarioBreakdown: Record<BjtSkill, { correct: number; total: number }>,
  lastMock: BjtMockSummary | undefined
): BjtSkill | undefined {
  const combined = mergeSkillBreakdown(
    scenarioBreakdown,
    lastMock?.skillBreakdown ?? emptySkillBreakdown()
  );
  return getWeakestSkill(combined);
}

function mergeWrongQuestions(
  current: BjtWrongQuestion[],
  incoming: { questionId: string; skill: BjtSkill }[],
  source: 'scenario' | 'mock',
  level: BjtProgressLevel
): BjtWrongQuestion[] {
  const additions: BjtWrongQuestion[] = incoming.map((item) => ({
    questionId: item.questionId,
    skill: item.skill,
    source,
    level,
    recordedAt: new Date().toISOString(),
  }));

  return [
    ...additions,
    ...current.filter((item) => !incoming.some((next) => next.questionId === item.questionId)),
  ].slice(0, HISTORY_LIMIT * 2);
}

function mergeWrongQuestionsV2(
  current: BjtWrongQuestion[],
  incoming: { questionId: string; examId: string; part: 'I' | 'II' | 'III' }[],
  level: 'J2' | 'J3' | 'J4' | 'all'
): BjtWrongQuestion[] {
  const additions: BjtWrongQuestion[] = incoming.map((item) => ({
    questionId: item.questionId,
    source: 'mock-v2',
    examId: item.examId,
    part: item.part,
    level,
    recordedAt: new Date().toISOString(),
  }));

  return [
    ...additions,
    ...current.filter((item) => !incoming.some((next) => next.questionId === item.questionId)),
  ].slice(0, HISTORY_LIMIT * 2);
}

export async function loadBjtProgress(): Promise<BjtProgressData> {
  try {
    const raw = await AsyncStorage.getItem(StorageKeys.bjtProgress);
    if (!raw) {
      return { ...DEFAULT_DATA, scenarioSkillBreakdown: emptySkillBreakdown() };
    }

    const parsed = JSON.parse(raw) as Partial<BjtProgressData>;
    return {
      ...DEFAULT_DATA,
      ...parsed,
      scenarioSkillBreakdown: parsed.scenarioSkillBreakdown ?? emptySkillBreakdown(),
      scenarioHistory: (parsed.scenarioHistory ?? []).map((item) => ({
        ...item,
        level: item.level ?? 'all',
        skillBreakdown: item.skillBreakdown ?? emptySkillBreakdown(),
      })),
      mockHistory: (parsed.mockHistory ?? []).map((item) => ({
        ...item,
        level: item.level ?? 'all',
      })),
      mockExamsV2History: (parsed.mockExamsV2History ?? []).map((item) => ({
        ...item,
        level: item.level ?? 'all',
      })),
      lastMock: parsed.lastMock
        ? {
            ...parsed.lastMock,
            level: parsed.lastMock.level ?? 'all',
          }
        : undefined,
      lastMockExamV2: parsed.lastMockExamV2
        ? {
            ...parsed.lastMockExamV2,
            level: parsed.lastMockExamV2.level ?? 'all',
          }
        : undefined,
      recentWrongQuestions: (parsed.recentWrongQuestions ?? []).map((item) => ({
        ...item,
        level: item.level ?? 'all',
      })),
    };
  } catch {
    return { ...DEFAULT_DATA, scenarioSkillBreakdown: emptySkillBreakdown() };
  }
}

export async function saveBjtProgress(input: BjtProgressData): Promise<void> {
  await AsyncStorage.setItem(StorageKeys.bjtProgress, JSON.stringify(input));
}

export function getBjtLevelSnapshot(
  progress: BjtProgressData,
  level: BjtProgressLevel
): BjtLevelSnapshot {
  const scenarioHistory = (progress.scenarioHistory ?? []).filter((item) => item.level === level);
  const mockHistory = (progress.mockHistory ?? []).filter((item) => item.level === level);
  const scenarioSkillBreakdown = scenarioHistory.reduce(
    (acc, item) => mergeSkillBreakdown(acc, item.skillBreakdown),
    emptySkillBreakdown()
  );
  const totalScenarioQuestionsAnswered = scenarioHistory.reduce((sum, item) => sum + item.answered, 0);
  const totalScenarioCorrect = scenarioHistory.reduce((sum, item) => sum + item.correct, 0);
  const scenarioAccuracy =
    totalScenarioQuestionsAnswered > 0
      ? Math.round((totalScenarioCorrect / totalScenarioQuestionsAnswered) * 100)
      : null;
  const bestMockPercent = mockHistory.reduce((best, item) => Math.max(best, item.percent), 0);
  const lastMock = mockHistory[0];
  const mockExamsV2History = (progress.mockExamsV2History ?? []).filter((item) => item.level === level);
  const bestMockExamV2Percent = mockExamsV2History.reduce((best, item) => Math.max(best, item.percent), 0);
  const lastMockExamV2 = mockExamsV2History[0];

  return {
    level,
    scenarioPracticeSessions: scenarioHistory.length,
    totalScenarioQuestionsAnswered,
    totalScenarioCorrect,
    scenarioAccuracy,
    scenarioSkillBreakdown,
    recentScenarioHistory: scenarioHistory.slice(0, 3),
    bestMockPercent,
    lastMock,
    recentMockHistory: mockHistory.slice(0, 3),
    bestMockExamV2Percent,
    lastMockExamV2,
    recentMockExamsV2History: mockExamsV2History.slice(0, 3),
    weakestSkill: computeWeakestSkill(scenarioSkillBreakdown, lastMock),
    wrongReviewCount: (progress.recentWrongQuestions ?? []).filter((item) => item.level === level).length,
  };
}

export async function recordBjtVocabularyReview(vocabularyId: string): Promise<BjtProgressData> {
  const current = await loadBjtProgress();
  if (current.reviewedVocabularyIds.includes(vocabularyId)) {
    return current;
  }

  const next: BjtProgressData = {
    ...current,
    reviewedVocabularyIds: [...current.reviewedVocabularyIds, vocabularyId],
    totalVocabularyReviewed: current.totalVocabularyReviewed + 1,
  };
  await saveBjtProgress(next);
  return next;
}

export async function recordBjtScenarioPractice(result: {
  level: BjtProgressLevel;
  answered: number;
  correct: number;
  skillBreakdown: Record<BjtSkill, { correct: number; total: number }>;
  wrongQuestions?: { questionId: string; skill: BjtSkill }[];
}): Promise<BjtProgressData> {
  const current = await loadBjtProgress();
  const session: BjtScenarioSession = {
    level: result.level,
    answered: result.answered,
    correct: result.correct,
    percent: result.answered > 0 ? Math.round((result.correct / result.answered) * 100) : 0,
    completedAt: new Date().toISOString(),
    skillBreakdown: result.skillBreakdown,
  };
  const updatedScenarioBreakdown = mergeSkillBreakdown(
    current.scenarioSkillBreakdown,
    result.skillBreakdown
  );

  const next: BjtProgressData = {
    ...current,
    scenarioPracticeSessions: current.scenarioPracticeSessions + 1,
    totalScenarioQuestionsAnswered: current.totalScenarioQuestionsAnswered + result.answered,
    totalScenarioCorrect: current.totalScenarioCorrect + result.correct,
    scenarioSkillBreakdown: updatedScenarioBreakdown,
    scenarioHistory: [session, ...(current.scenarioHistory ?? [])].slice(0, HISTORY_LIMIT),
    recentWrongQuestions: mergeWrongQuestions(
      current.recentWrongQuestions ?? [],
      result.wrongQuestions ?? [],
      'scenario',
      result.level
    ),
    weakestSkill: computeWeakestSkill(updatedScenarioBreakdown, current.lastMock),
  };
  await saveBjtProgress(next);
  return next;
}

export async function recordBjtMockResult(input: {
  level: BjtProgressLevel;
  score: number;
  total: number;
  skillBreakdown: Record<BjtSkill, { correct: number; total: number }>;
  wrongQuestions?: { questionId: string; skill: BjtSkill }[];
}): Promise<BjtProgressData> {
  const current = await loadBjtProgress();
  const percent = input.total > 0 ? Math.round((input.score / input.total) * 100) : 0;
  const summary: BjtMockSummary = {
    level: input.level,
    score: input.score,
    total: input.total,
    percent,
    completedAt: new Date().toISOString(),
    skillBreakdown: input.skillBreakdown,
  };

  const next: BjtProgressData = {
    ...current,
    bestMockPercent: Math.max(current.bestMockPercent, percent),
    lastMock: summary,
    mockHistory: [summary, ...(current.mockHistory ?? [])].slice(0, HISTORY_LIMIT),
    recentWrongQuestions: mergeWrongQuestions(
      current.recentWrongQuestions ?? [],
      input.wrongQuestions ?? [],
      'mock',
      input.level
    ),
    weakestSkill: computeWeakestSkill(current.scenarioSkillBreakdown, summary),
  };
  await saveBjtProgress(next);
  return next;
}

export async function recordBjtMockExamV2Result(input: {
  examId: string;
  level: 'J2' | 'J3' | 'J4' | 'all';
  score: number;
  total: number;
  partBreakdown: Record<'I' | 'II' | 'III', { correct: number; total: number }>;
  wrongQuestions?: { questionId: string; examId: string; part: 'I' | 'II' | 'III' }[];
}): Promise<BjtProgressData> {
  const current = await loadBjtProgress();
  const percent = input.total > 0 ? Math.round((input.score / input.total) * 100) : 0;
  const summary: BjtMockExamV2Summary = {
    examId: input.examId,
    level: input.level,
    score: input.score,
    total: input.total,
    percent,
    completedAt: new Date().toISOString(),
    partBreakdown: input.partBreakdown,
  };

  const next: BjtProgressData = {
    ...current,
    bestMockExamV2Percent: Math.max(current.bestMockExamV2Percent ?? 0, percent),
    lastMockExamV2: summary,
    mockExamsV2History: [summary, ...(current.mockExamsV2History ?? [])].slice(0, HISTORY_LIMIT * 2),
    recentWrongQuestions: mergeWrongQuestionsV2(
      current.recentWrongQuestions ?? [],
      input.wrongQuestions ?? [],
      input.level
    ),
  };
  await saveBjtProgress(next);
  return next;
}

export function getBjtMockExamV2Stats(
  progress: BjtProgressData,
  examId: string
): {
  attempts: number;
  bestPercent: number;
  latest?: BjtMockExamV2Summary;
} {
  const history = (progress.mockExamsV2History ?? []).filter((item) => item.examId === examId);
  return {
    attempts: history.length,
    bestPercent: history.reduce((best, item) => Math.max(best, item.percent), 0),
    latest: history[0],
  };
}

export async function clearBjtWrongQuestions(questionIds: string[]): Promise<BjtProgressData> {
  const current = await loadBjtProgress();
  const next: BjtProgressData = {
    ...current,
    recentWrongQuestions: current.recentWrongQuestions.filter(
      (item) => !questionIds.includes(item.questionId)
    ),
  };
  await saveBjtProgress(next);
  return next;
}
