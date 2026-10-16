import type { AdminGuide } from '../types/content';
import type { InProgressGuide, ReadyGuide } from './homeScreenContent';

export type GuideProgressSource = Pick<AdminGuide, 'id' | 'title' | 'color' | 'documentsChecklist' | 'steps'>;
type ProgressMap<T> = Record<string, T[]>;

/**
 * The "5 giấy tờ · 4 bước" line on a guide card. Both numbers are counted
 * from structured fields, so they can't drift from the guide body.
 * `estimatedTime` is deliberately left out — it holds free-form prose
 * (sometimes several sentences), not a duration that fits a chip.
 */
export function buildGuideMetaChips(guide: GuideProgressSource | undefined): string[] {
  if (!guide) return [];

  const chips: string[] = [];
  const documents = guide.documentsChecklist?.length ?? 0;
  if (documents > 0) chips.push(`${documents} giấy tờ`);
  if (guide.steps.length > 0) chips.push(`${guide.steps.length} bước`);
  return chips;
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
