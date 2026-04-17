import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  clearBjtWrongQuestions,
  getBjtLevelSnapshot,
  loadBjtProgress,
  recordBjtMockResult,
  recordBjtScenarioPractice,
  recordBjtVocabularyReview,
} from './bjtProgress';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

describe('bjtProgress', () => {
  const emptyBreakdown = () => ({
    listening: { correct: 0, total: 0 },
    'listening-reading': { correct: 0, total: 0 },
    reading: { correct: 0, total: 0 },
  });

  beforeEach(async () => {
    await AsyncStorage.clear();
  });

  it('tracks unique reviewed vocabulary items', async () => {
    await recordBjtVocabularyReview('deadline');
    await recordBjtVocabularyReview('deadline');
    await recordBjtVocabularyReview('reply');

    const progress = await loadBjtProgress();
    expect(progress.totalVocabularyReviewed).toBe(2);
    expect(progress.reviewedVocabularyIds).toEqual(['deadline', 'reply']);
  });

  it('aggregates scenario practice sessions', async () => {
    await recordBjtScenarioPractice({
      level: 'J3',
      answered: 10,
      correct: 7,
      skillBreakdown: {
        ...emptyBreakdown(),
        listening: { correct: 2, total: 3 },
        'listening-reading': { correct: 2, total: 3 },
        reading: { correct: 3, total: 4 },
      },
      wrongQuestions: [{ questionId: 'q1', skill: 'reading' }],
    });
    await recordBjtScenarioPractice({
      level: 'J2',
      answered: 6,
      correct: 4,
      skillBreakdown: {
        ...emptyBreakdown(),
        listening: { correct: 2, total: 3 },
        reading: { correct: 2, total: 3 },
      },
      wrongQuestions: [{ questionId: 'q2', skill: 'listening' }],
    });

    const progress = await loadBjtProgress();
    expect(progress.scenarioPracticeSessions).toBe(2);
    expect(progress.totalScenarioQuestionsAnswered).toBe(16);
    expect(progress.totalScenarioCorrect).toBe(11);
    expect(progress.scenarioHistory).toHaveLength(2);
    expect(progress.scenarioHistory[0]?.level).toBe('J2');
    expect(progress.scenarioHistory[0]?.percent).toBe(67);
    expect(progress.recentWrongQuestions).toHaveLength(2);
    expect(progress.recentWrongQuestions[0]?.level).toBe('J2');
  });

  it('stores best and latest mock results', async () => {
    await recordBjtMockResult({
      level: 'J3',
      score: 6,
      total: 10,
      skillBreakdown: {
        listening: { correct: 1, total: 3 },
        'listening-reading': { correct: 2, total: 3 },
        reading: { correct: 3, total: 4 },
      },
    });
    await recordBjtMockResult({
      level: 'J2',
      score: 8,
      total: 10,
      skillBreakdown: {
        listening: { correct: 2, total: 3 },
        'listening-reading': { correct: 3, total: 3 },
        reading: { correct: 3, total: 4 },
      },
      wrongQuestions: [{ questionId: 'q3', skill: 'listening-reading' }],
    });

    const progress = await loadBjtProgress();
    expect(progress.bestMockPercent).toBe(80);
    expect(progress.lastMock?.percent).toBe(80);
    expect(progress.lastMock?.level).toBe('J2');
    expect(progress.mockHistory).toHaveLength(2);
    expect(progress.weakestSkill).toBe('listening');
  });

  it('clears reviewed wrong questions', async () => {
    await recordBjtScenarioPractice({
      level: 'J3',
      answered: 5,
      correct: 2,
      skillBreakdown: {
        ...emptyBreakdown(),
        listening: { correct: 1, total: 2 },
        reading: { correct: 1, total: 3 },
      },
      wrongQuestions: [
        { questionId: 'q1', skill: 'reading' },
        { questionId: 'q2', skill: 'listening' },
      ],
    });

    const next = await clearBjtWrongQuestions(['q1']);
    expect(next.recentWrongQuestions.map((item) => item.questionId)).toEqual(['q2']);
  });

  it('builds level snapshots from history', async () => {
    await recordBjtScenarioPractice({
      level: 'J3',
      answered: 8,
      correct: 6,
      skillBreakdown: {
        ...emptyBreakdown(),
        listening: { correct: 2, total: 3 },
        'listening-reading': { correct: 2, total: 2 },
        reading: { correct: 2, total: 3 },
      },
      wrongQuestions: [{ questionId: 'j3-q1', skill: 'reading' }],
    });
    await recordBjtScenarioPractice({
      level: 'J2',
      answered: 6,
      correct: 3,
      skillBreakdown: {
        ...emptyBreakdown(),
        listening: { correct: 1, total: 2 },
        'listening-reading': { correct: 1, total: 2 },
        reading: { correct: 1, total: 2 },
      },
    });
    await recordBjtMockResult({
      level: 'J3',
      score: 7,
      total: 10,
      skillBreakdown: {
        listening: { correct: 2, total: 3 },
        'listening-reading': { correct: 3, total: 3 },
        reading: { correct: 2, total: 4 },
      },
      wrongQuestions: [{ questionId: 'j3-q2', skill: 'reading' }],
    });

    const progress = await loadBjtProgress();
    const snapshot = getBjtLevelSnapshot(progress, 'J3');

    expect(snapshot.level).toBe('J3');
    expect(snapshot.scenarioPracticeSessions).toBe(1);
    expect(snapshot.totalScenarioQuestionsAnswered).toBe(8);
    expect(snapshot.totalScenarioCorrect).toBe(6);
    expect(snapshot.scenarioAccuracy).toBe(75);
    expect(snapshot.bestMockPercent).toBe(70);
    expect(snapshot.lastMock?.level).toBe('J3');
    expect(snapshot.wrongReviewCount).toBe(2);
    expect(snapshot.weakestSkill).toBe('reading');
  });
});
