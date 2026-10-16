import {
  GuideProgressSource,
  buildChecklistProgressItems,
  buildCompletedChecklistItems,
  buildGuideMetaChips,
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
  it('builds guide meta chips from document and step counts', () => {
    expect(buildGuideMetaChips(guide('a', 5, 4))).toEqual(['5 giấy tờ', '4 bước']);
  });

  it('omits a meta chip whose count is zero', () => {
    expect(buildGuideMetaChips(guide('b', 0, 3))).toEqual(['3 bước']);
    expect(buildGuideMetaChips(guide('c', 2, 0))).toEqual(['2 giấy tờ']);
  });

  it('returns no meta chips for a missing guide', () => {
    expect(buildGuideMetaChips(undefined)).toEqual([]);
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
