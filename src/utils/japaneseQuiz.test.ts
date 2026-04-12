import { buildQuizQuestions, QuizPhrase } from './japaneseQuiz';

const PHRASES: QuizPhrase[] = [
  { jp: '在留カード', romaji: 'zairyuu kaado', vn: 'Thẻ cư trú', category: 'Giấy tờ' },
  { jp: '健康保険', romaji: 'kenkou hoken', vn: 'Bảo hiểm y tế', category: 'Y tế' },
  { jp: '銀行口座', romaji: 'ginkou kouza', vn: 'Tài khoản ngân hàng', category: 'Ngân hàng' },
  { jp: '送金', romaji: 'soukin', vn: 'Chuyển tiền', category: 'Ngân hàng' },
];

describe('buildQuizQuestions', () => {
  it('builds japanese to vietnamese questions', () => {
    const [question] = buildQuizQuestions(PHRASES.slice(0, 1), PHRASES, 'jp-to-vn');

    expect(question.direction).toBe('jp-to-vn');
    expect(question.promptPrimary).toBe('在留カード');
    expect(question.options).toHaveLength(4);
  });

  it('builds vietnamese to japanese questions', () => {
    const [question] = buildQuizQuestions(PHRASES.slice(0, 1), PHRASES, 'vn-to-jp');

    expect(question.direction).toBe('vn-to-jp');
    expect(question.promptPrimary).toBe('Thẻ cư trú');
    expect(question.options[question.correctIndex].primary).toBe('在留カード');
  });

  it('alternates directions in mixed mode', () => {
    const questions = buildQuizQuestions(PHRASES, PHRASES, 'mixed');

    expect(questions.some((item) => item.direction === 'jp-to-vn')).toBe(true);
    expect(questions.some((item) => item.direction === 'vn-to-jp')).toBe(true);
  });
});
