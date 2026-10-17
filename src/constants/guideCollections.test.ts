import { ADMIN_GUIDES } from './content/adminGuides';
import { GUIDE_COLLECTIONS, getGuideCollection } from './guideCollections';

describe('guideCollections', () => {
  const guideIds = new Set(ADMIN_GUIDES.map((guide) => guide.id));

  it.each(GUIDE_COLLECTIONS.map((c) => [c.id, c] as const))('%s only points at existing guides', (_id, collection) => {
    const missing = collection.guideIds.filter((id) => !guideIds.has(id));
    expect(missing).toEqual([]);
  });

  it('has unique ids and no duplicate guides within a collection', () => {
    expect(new Set(GUIDE_COLLECTIONS.map((c) => c.id)).size).toBe(GUIDE_COLLECTIONS.length);
    for (const collection of GUIDE_COLLECTIONS) {
      expect(new Set(collection.guideIds).size).toBe(collection.guideIds.length);
      expect(collection.guideIds.length).toBeGreaterThanOrEqual(3);
    }
  });

  it('looks collections up by id', () => {
    expect(getGuideCollection('pre-departure')?.title).toBe('Chuẩn bị sang Nhật');
  });
});
