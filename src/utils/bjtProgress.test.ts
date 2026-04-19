import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  clearBjtWrongQuestions,
  getBjtMockExamV2Stats,
  getBjtLevelSnapshot,
  loadBjtProgress,
  recordBjtMockExamV2Result,
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

  it('stores Mock Exams V2 history by exam and part', async () => {
    await recordBjtMockExamV2Result({
      examId: 'BJT_MOCK_01',
      level: 'J3',
      score: 60,
      total: 80,
      partBreakdown: {
        I: { correct: 18, total: 25 },
        II: { correct: 12, total: 15 },
        III: { correct: 30, total: 40 },
      },
      wrongQuestions: [{ questionId: 'e01_q07', examId: 'BJT_MOCK_01', part: 'I' }],
    });
    await recordBjtMockExamV2Result({
      examId: 'BJT_MOCK_01',
      level: 'J3',
      score: 64,
      total: 80,
      partBreakdown: {
        I: { correct: 20, total: 25 },
        II: { correct: 12, total: 15 },
        III: { correct: 32, total: 40 },
      },
      wrongQuestions: [{ questionId: 'e01_q11', examId: 'BJT_MOCK_01', part: 'II' }],
    });

    const progress = await loadBjtProgress();
    expect(progress.bestMockExamV2Percent).toBe(80);
    expect(progress.lastMockExamV2?.examId).toBe('BJT_MOCK_01');
    expect(progress.lastMockExamV2?.partBreakdown.III.correct).toBe(32);
    expect(progress.mockExamsV2History).toHaveLength(2);
    expect(progress.recentWrongQuestions[0]?.source).toBe('mock-v2');
    expect(progress.recentWrongQuestions[0]?.examId).toBe('BJT_MOCK_01');
    expect(progress.recentWrongQuestions[0]?.part).toBe('II');

    const stats = getBjtMockExamV2Stats(progress, 'BJT_MOCK_01');
    expect(stats.attempts).toBe(2);
    expect(stats.bestPercent).toBe(80);
    expect(stats.latest?.percent).toBe(80);
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
    expect(snapshot.bestMockExamV2Percent).toBe(0);
    expect(snapshot.lastMock?.level).toBe('J3');
    expect(snapshot.wrongReviewCount).toBe(2);
    expect(snapshot.weakestSkill).toBe('reading');
  });
});
