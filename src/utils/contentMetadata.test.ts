import { formatLastUpdated, getSourceLabels } from './contentMetadata';
import type { ContentMetadata } from '../types/content';

describe('contentMetadata', () => {
  it('formats ISO dates as dd/mm/yyyy', () => {
    expect(formatLastUpdated('2026-04-10')).toBe('10/04/2026');
  });

  it('returns the original value for unexpected date input', () => {
    expect(formatLastUpdated('2026')).toBe('2026');
  });

  it('joins source labels in display order', () => {
    const meta: ContentMetadata = {
      lastUpdated: '2026-04-10',
      sources: [
        { label: 'Source A', url: 'https://example.com/a' },
        { label: 'Source B', url: 'https://example.com/b' },
      ],
    };

    expect(getSourceLabels(meta)).toBe('Source A, Source B');
  });
});
