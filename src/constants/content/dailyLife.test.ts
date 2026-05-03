import { Ionicons } from '@expo/vector-icons';

import { DAILY_LIFE_CONTENT_META, DAILY_LIFE_TOPICS } from './dailyLife';

describe('DAILY_LIFE_TOPICS content quality', () => {
  it('keeps a broad topic catalog with unique ids', () => {
    const ids = DAILY_LIFE_TOPICS.map((topic) => topic.id);

    expect(DAILY_LIFE_TOPICS.length).toBeGreaterThanOrEqual(20);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('has valid metadata source links', () => {
    expect(DAILY_LIFE_CONTENT_META.lastUpdated).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(DAILY_LIFE_CONTENT_META.sources.length).toBeGreaterThan(0);

    for (const source of DAILY_LIFE_CONTENT_META.sources) {
      expect(source.label.trim().length).toBeGreaterThan(0);
      expect(source.url).toMatch(/^https:\/\//);
    }
  });

  it('has complete topic display fields', () => {
    for (const topic of DAILY_LIFE_TOPICS) {
      expect(topic.id).toMatch(/^[a-z0-9-]+$/);
      expect(topic.title.trim().length).toBeGreaterThan(0);
      expect(topic.titleJp.trim().length).toBeGreaterThan(0);
      expect(topic.description.trim().length).toBeGreaterThan(0);
      expect(topic.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
      expect(Ionicons.glyphMap[topic.icon]).toBeDefined();


    }
  });

  it('has useful structured sections for every topic', () => {
    for (const topic of DAILY_LIFE_TOPICS) {
      expect(topic.sections?.length).toBeGreaterThan(0);

      const sectionTitles = (topic.sections ?? []).map((section) => section.title);
      expect(new Set(sectionTitles).size).toBe(sectionTitles.length);

      for (const section of topic.sections ?? []) {
        expect(section.title.trim().length).toBeGreaterThan(0);
        expect(Boolean(section.content?.trim()) || Boolean(section.items?.length)).toBe(true);

        if (section.content) {
          expect(section.content.trim().length).toBeGreaterThan(0);
        }

        for (const item of section.items ?? []) {
          expect(item.trim().length).toBeGreaterThan(0);
        }

        if (section.tip) {
          expect(section.tip.trim().length).toBeGreaterThan(0);
        }

        if (section.image) {
          expect(section.imageCaption?.trim().length).toBeGreaterThan(0);
        }
      }
    }
  });
});
