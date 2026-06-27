import {
  extractJson,
  parseLesson,
  parseQuiz,
  parseVocabBatch,
  toAsciiJson,
} from './jlptGenerationCore';

describe('jlptGenerationCore parsing', () => {
  describe('extractJson', () => {
    it('parses plain JSON', () => {
      expect(extractJson('[1,2]')).toEqual([1, 2]);
    });
    it('extracts an array embedded in prose', () => {
      expect(extractJson('here: [{"a":1}] ok')).toEqual([{ a: 1 }]);
    });
    it('throws when no JSON present', () => {
      expect(() => extractJson('nope')).toThrow();
    });
  });

  describe('toAsciiJson', () => {
    it('escapes non-ASCII but stays parseable', () => {
      const ascii = toAsciiJson({ jp: '日本語' });
      expect(ascii).not.toMatch(/[^\x00-\x7F]/);
      expect(JSON.parse(ascii)).toEqual({ jp: '日本語' });
    });
  });

  describe('parseVocabBatch', () => {
    it('assigns sequential VOC ids from the start index and fills defaults', () => {
      const raw = JSON.stringify([
        { jp: '本（ほん）', mean: 'sách', ex: [['B', '本を読む。'], ['x', '日常です。']] },
      ]);
      const cards = parseVocabBatch(raw, 4);
      expect(cards).toHaveLength(1);
      expect(cards[0].id).toBe('VOC0005');
      expect(cards[0].syn).toBe('—'); // default when missing
      expect(cards[0].ant).toBe('—');
      // unknown example tag falls back to 'D'
      expect(cards[0].ex).toEqual([
        ['B', '本を読む。'],
        ['D', '日常です。'],
      ]);
    });

    it('drops cards missing jp or mean', () => {
      const raw = JSON.stringify([{ jp: '', mean: 'x' }, { jp: '本', mean: '' }]);
      expect(parseVocabBatch(raw, 0)).toHaveLength(0);
    });
  });

  describe('parseQuiz', () => {
    it('keeps valid items and clamps out-of-range answer index to 0', () => {
      const raw = JSON.stringify([
        { q: 'A?', o: ['x', 'y'], a: 9 },
        { q: '', o: ['x', 'y'], a: 0 },
        { q: 'B?', o: ['only'], a: 0 },
      ]);
      const quiz = parseQuiz(raw);
      expect(quiz).toHaveLength(1);
      expect(quiz[0]).toEqual({ q: 'A?', o: ['x', 'y'], a: 0 });
    });
  });

  describe('parseLesson', () => {
    it('falls back to the curriculum pattern when the model omits it', () => {
      const raw = JSON.stringify([{ meaning: 'nghĩa', usage: 'cách dùng', examples: [] }]);
      const lesson = parseLesson('N5', 1, raw, ['〜は〜です']);
      expect(lesson.grammar[0].pattern).toBe('〜は〜です');
      expect(lesson.day).toBe(1);
      expect(lesson.level).toBe('N5');
    });

    it('throws when the lesson array is empty', () => {
      expect(() => parseLesson('N5', 1, '[]', [])).toThrow();
    });
  });
});
