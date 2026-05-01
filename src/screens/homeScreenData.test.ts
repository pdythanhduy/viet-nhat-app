import type { Bookmark } from '../utils/bookmarks';
import {
  GuideProgressSource,
  buildChecklistProgressItems,
  buildCompletedChecklistItems,
  buildSavedCounts,
  buildStepProgressItems,
} from './homeScreenData';

function guide(
  id: string,
  documents: number,
  steps: number,
  color = '#185FA5'
): GuideProgressSource {
  return {
    id,
    title: `Guide ${id}`,
    color,
    documentsChecklist: Array.from({ length: documents }, (_, index) => ({
      label: `Doc ${index + 1}`,
      required: true,
    })),
    steps: Array.from({ length: steps }, (_, index) => ({
      step: index + 1,
      title: `Step ${index + 1}`,
      description: `Description ${index + 1}`,
      documents: [],
    })),
  };
}

describe('homeScreenData', () => {
  it('counts saved bookmark types', () => {
    const bookmarks: Bookmark[] = [
      {
        type: 'guide',
        id: 'guide-1',
        title: 'Guide',
        titleJp: 'Guide JP',
        description: 'Description',
        color: '#185FA5',
        savedAt: '2026-01-01T00:00:00.000Z',
      },
      {
        type: 'daily-life',
        id: 'daily-1',
        title: 'Daily',
        titleJp: 'Daily JP',
        description: 'Description',
        color: '#27AE60',
        savedAt: '2026-01-01T00:00:00.000Z',
      },
      {
        type: 'phrase',
        id: 'phrase-1',
        jp: 'おはようございます',
        romaji: 'Ohayou gozaimasu',
        vn: 'Chào buổi sáng',
        category: 'Greeting',
        savedAt: '2026-01-01T00:00:00.000Z',
      },
      {
        type: 'dialogue',
        id: 'dialogue-1',
        category: 'Greeting',
        situation: 'Morning',
        lines: [],
        savedAt: '2026-01-01T00:00:00.000Z',
      },
      {
        type: 'phrase',
        id: 'phrase-2',
        jp: 'ありがとうございます',
        romaji: 'Arigatou gozaimasu',
        vn: 'Cảm ơn',
        category: 'Greeting',
        savedAt: '2026-01-01T00:00:00.000Z',
      },
    ];

    expect(buildSavedCounts(bookmarks)).toEqual({
      guide: 1,
      'daily-life': 1,
      phrase: 2,
      dialogue: 1,
    });
  });

  it('builds in-progress checklist items sorted by completion ratio', () => {
    const guides = [
      guide('a', 4, 2),
      guide('b', 3, 2),
      guide('c', 0, 2),
      guide('d', 2, 2),
      guide('e', 5, 2),
    ];

    expect(
      buildChecklistProgressItems(
        guides,
        {
          a: ['1', '2'],
          b: ['1', '2'],
          d: ['1', '2'],
          e: ['1'],
        },
        2
      )
    ).toEqual([
      { guideId: 'b', title: 'Guide b', checked: 2, total: 3, color: '#185FA5' },
      { guideId: 'a', title: 'Guide a', checked: 2, total: 4, color: '#185FA5' },
    ]);
  });

  it('builds completed checklist items in source order', () => {
    const guides = [guide('a', 2, 2), guide('b', 2, 2), guide('c', 0, 2), guide('d', 1, 2)];

    expect(
      buildCompletedChecklistItems(
        guides,
        {
          a: ['1'],
          b: ['1', '2'],
          d: ['1'],
        }
      )
    ).toEqual([
      { guideId: 'b', title: 'Guide b', total: 2, color: '#185FA5' },
      { guideId: 'd', title: 'Guide d', total: 1, color: '#185FA5' },
    ]);
  });

  it('builds in-progress step items sorted by completion ratio', () => {
    const guides = [guide('a', 1, 4), guide('b', 1, 3), guide('c', 1, 0), guide('d', 1, 2)];

    expect(
      buildStepProgressItems(guides, {
        a: [1, 2],
        b: [1, 2],
        d: [1, 2],
      })
    ).toEqual([
      { guideId: 'b', title: 'Guide b', checked: 2, total: 3, color: '#185FA5' },
      { guideId: 'a', title: 'Guide a', checked: 2, total: 4, color: '#185FA5' },
    ]);
  });
});
