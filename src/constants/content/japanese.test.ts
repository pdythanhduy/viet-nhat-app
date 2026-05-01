import { Ionicons } from '@expo/vector-icons';

import { ESSENTIAL_PHRASES, GRAMMAR_PATTERNS, JAPANESE_WORDS } from './japanese';

function expectNonEmptyText(value: string) {
  expect(value.trim().length).toBeGreaterThan(0);
}

describe('JAPANESE content expansion', () => {
  it('keeps the word bank above 100 entries', () => {
    expect(JAPANESE_WORDS.length).toBeGreaterThanOrEqual(100);
  });

  it('includes major worker industry categories', () => {
    const categories = ESSENTIAL_PHRASES.map((item) => item.category);

    expect(categories).toContain('Công việc nhà máy');
    expect(categories).toContain('Công việc xây dựng');
    expect(categories).toContain('Công việc nông nghiệp');
    expect(categories).toContain('Công việc nhà hàng');
  });

  it('has at least one dialogue for each added industry category', () => {
    const targetCategories = ['Công việc nhà máy', 'Công việc xây dựng', 'Công việc nông nghiệp', 'Công việc nhà hàng'];

    for (const category of targetCategories) {
      const item = ESSENTIAL_PHRASES.find((entry) => entry.category === category);
      expect(item?.dialogue?.lines.length).toBeGreaterThanOrEqual(2);
      expect(item?.phrases.length).toBeGreaterThanOrEqual(6);
    }
  });

  it('has complete word bank entries with stable identifiers', () => {
    const wordKeys = JAPANESE_WORDS.map((item) => `${item.word}::${item.reading}`);

    expect(new Set(wordKeys).size).toBe(wordKeys.length);

    for (const item of JAPANESE_WORDS) {
      expectNonEmptyText(item.word);
      expectNonEmptyText(item.reading);
      expectNonEmptyText(item.romaji);
      expectNonEmptyText(item.meaning);
      expectNonEmptyText(item.example);
      expectNonEmptyText(item.exampleRomaji);
      expectNonEmptyText(item.exampleMeaning);

      if (item.culturalNote) {
        expectNonEmptyText(item.culturalNote);
      }
    }
  });

  it('has complete phrase categories, phrases, and dialogues', () => {
    const categories = ESSENTIAL_PHRASES.map((item) => item.category);

    expect(new Set(categories).size).toBe(categories.length);

    for (const category of ESSENTIAL_PHRASES) {
      expectNonEmptyText(category.category);
      expect(category.phrases.length).toBeGreaterThan(0);

      if (category.icon) {
        expect(Ionicons.glyphMap[category.icon]).toBeDefined();
      }

      if (category.color) {
        expect(category.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
      }

      for (const phrase of category.phrases) {
        expectNonEmptyText(phrase.jp);
        expectNonEmptyText(phrase.romaji);
        expectNonEmptyText(phrase.vn);
      }

      if (category.dialogue) {
        expectNonEmptyText(category.dialogue.situation);
        expect(category.dialogue.lines.length).toBeGreaterThanOrEqual(2);

        for (const line of category.dialogue.lines) {
          expect(['A', 'B']).toContain(line.speaker);
          expectNonEmptyText(line.speakerLabel);
          expectNonEmptyText(line.jp);
          expectNonEmptyText(line.romaji);
          expectNonEmptyText(line.vn);
        }
      }
    }
  });

  it('has complete grammar pattern entries', () => {
    expect(GRAMMAR_PATTERNS.length).toBeGreaterThan(0);

    for (const item of GRAMMAR_PATTERNS) {
      expectNonEmptyText(item.pattern);
      expectNonEmptyText(item.meaning);
      expectNonEmptyText(item.example_jp);
      expectNonEmptyText(item.example_romaji);
      expectNonEmptyText(item.example_vn);

      if (item.notes) {
        expectNonEmptyText(item.notes);
      }
    }
  });
});
