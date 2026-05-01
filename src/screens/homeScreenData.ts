import type { AdminGuide } from '../types/content';
import type { Bookmark } from '../utils/bookmarks';
import type { InProgressGuide, ReadyGuide, SavedCounts } from './homeScreenContent';

export type GuideProgressSource = Pick<AdminGuide, 'id' | 'title' | 'color' | 'documentsChecklist' | 'steps'>;
type ProgressMap<T> = Record<string, T[]>;

export function buildSavedCounts(bookmarks: readonly Bookmark[]): SavedCounts {
  return {
    guide: bookmarks.filter((item) => item.type === 'guide').length,
    'daily-life': bookmarks.filter((item) => item.type === 'daily-life').length,
    phrase: bookmarks.filter((item) => item.type === 'phrase').length,
    dialogue: bookmarks.filter((item) => item.type === 'dialogue').length,
  };
}

export function buildChecklistProgressItems(
  guides: readonly GuideProgressSource[],
  progressMap: ProgressMap<string>,
  limit = 4
): InProgressGuide[] {
  return guides
    .map((guide) => {
      const total = guide.documentsChecklist?.length ?? 0;
      if (total === 0) return null;

      const checked = (progressMap[guide.id] ?? []).length;
      if (checked === 0 || checked >= total) return null;

      return {
        guideId: guide.id,
        title: guide.title,
        checked,
        total,
        color: guide.color,
      };
    })
    .filter((item): item is InProgressGuide => item !== null)
    .sort((a, b) => (b.checked / b.total) - (a.checked / a.total))
    .slice(0, limit);
}

export function buildCompletedChecklistItems(
  guides: readonly GuideProgressSource[],
  progressMap: ProgressMap<string>,
  limit = 4
): ReadyGuide[] {
  return guides
    .map((guide) => {
      const total = guide.documentsChecklist?.length ?? 0;
      if (total === 0) return null;

      const checked = (progressMap[guide.id] ?? []).length;
      if (checked < total) return null;

      return {
        guideId: guide.id,
        title: guide.title,
        total,
        color: guide.color,
      };
    })
    .filter((item): item is ReadyGuide => item !== null)
    .slice(0, limit);
}

export function buildStepProgressItems(
  guides: readonly GuideProgressSource[],
  progressMap: ProgressMap<number>,
  limit = 4
): InProgressGuide[] {
  return guides
    .map((guide) => {
      const total = guide.steps.length;
      if (total === 0) return null;

      const checked = (progressMap[guide.id] ?? []).length;
      if (checked === 0 || checked >= total) return null;

      return {
        guideId: guide.id,
        title: guide.title,
        checked,
        total,
        color: guide.color,
      };
    })
    .filter((item): item is InProgressGuide => item !== null)
    .sort((a, b) => (b.checked / b.total) - (a.checked / a.total))
    .slice(0, limit);
}
