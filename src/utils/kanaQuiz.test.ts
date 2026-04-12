import { buildKanaQuizQuestions, getKanaQuizPool } from './kanaQuiz';

describe('kanaQuiz', () => {
  it('builds hiragana pool', () => {
    const pool = getKanaQuizPool('hiragana');
    expect(pool.length).toBeGreaterThan(0);
    expect(pool.every((item) => item.script === 'hiragana')).toBe(true);
  });

  it('builds mixed quiz questions with options', () => {
    const questions = buildKanaQuizQuestions('mixed');
    expect(questions.length).toBeGreaterThan(0);
    expect(questions[0].options).toHaveLength(4);
  });
});
