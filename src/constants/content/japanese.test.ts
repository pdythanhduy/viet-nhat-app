import { ESSENTIAL_PHRASES, JAPANESE_WORDS } from './japanese';

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
});
