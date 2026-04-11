import type { ContentMetadata } from '../types/content';

export function formatLastUpdated(date: string): string {
  const [year, month, day] = date.split('-');
  if (!year || !month || !day) return date;
  return `${day}/${month}/${year}`;
}

export function getSourceLabels(meta: ContentMetadata): string {
  return meta.sources.map((source) => source.label).join(', ');
}
