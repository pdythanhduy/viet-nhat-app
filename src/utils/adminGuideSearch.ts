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

function getAdminGuideSearchCandidateText(guide: AdminGuide) {
  return [
    ...getAdminGuideSearchKeywords(guide),
    guide.title,
    guide.titleJp,
    guide.description,
  ];
}

function formatAdminGuideSearchMatch(value: string) {
  const label = value.replace(/\s+/g, ' ').trim();
  return label.length > 42 ? `${label.slice(0, 39).trim()}...` : label;
}

export function getAdminGuideSearchMatches(guide: AdminGuide, query: string, limit = 3) {
  const normalizedQuery = normalizeAdminGuideSearchText(query);

  if (!normalizedQuery || limit <= 0) return [];

  const matches: string[] = [];
  const seen = new Set<string>();

  for (const value of getAdminGuideSearchCandidateText(guide)) {
    const normalizedValue = normalizeAdminGuideSearchText(value);
    if (!normalizedValue.includes(normalizedQuery)) continue;

    const label = formatAdminGuideSearchMatch(value);
    if (!label || seen.has(normalizedValue)) continue;

    seen.add(normalizedValue);
    matches.push(label);

    if (matches.length >= limit) break;
  }

  return matches;
}

export function adminGuideMatchesSearch(guide: AdminGuide, query: string) {
  const normalizedQuery = normalizeAdminGuideSearchText(query);

  if (!normalizedQuery) return true;

  return getAdminGuideSearchCandidateText(guide).some((value) =>
    normalizeAdminGuideSearchText(value).includes(normalizedQuery)
  );
}
