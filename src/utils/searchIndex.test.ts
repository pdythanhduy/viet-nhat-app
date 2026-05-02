import { searchAppContent } from './searchIndex';

describe('searchAppContent', () => {
  it('finds results without accents', () => {
    const results = searchAppContent('bao hiem');
    expect(results.length).toBeGreaterThan(0);
  });

  it('prioritizes direct title matches', () => {
    const results = searchAppContent('thẻ cư trú');
    expect(results[0]?.title).toContain('Thẻ cư trú');
  });

  it('includes admin guide search keyword metadata', () => {
    const results = searchAppContent('gaimen');
    expect(results.map((item) => item.id)).toContain('drivers-license');
  });
});
