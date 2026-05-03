import type { AdminGuide } from '../types/content';
import { getAdminGuideSearchKeywords } from '../constants/content/adminGuideSearchKeywords';

export function normalizeAdminGuideSearchText(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .toLowerCase()
    .trim();
}

export function adminGuideMatchesSearch(guide: AdminGuide, query: string) {
  const normalizedQuery = normalizeAdminGuideSearchText(query);

  if (!normalizedQuery) return true;

  return [
    guide.title,
    guide.titleJp,
    guide.description,
    ...getAdminGuideSearchKeywords(guide),
  ].some((value) => normalizeAdminGuideSearchText(value).includes(normalizedQuery));
}
