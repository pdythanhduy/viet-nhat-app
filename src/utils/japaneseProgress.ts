import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'japanese_progress_v1';

export type PhraseLevel = 0 | 1 | 2 | 3;
export type ProgressData = Record<string, PhraseLevel>;

export const LEVEL_COLORS: Record<PhraseLevel, string> = {
  0: '#BDBDBD',
  1: '#F39C12',
  2: '#2980B9',
  3: '#27AE60',
};

export const LEVEL_LABELS: Record<PhraseLevel, string> = {
  0: 'Chưa học',
  1: 'Đang học',
  2: 'Đã nhớ',
  3: 'Thành thạo',
};

export async function loadProgress(): Promise<ProgressData> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export async function saveProgress(data: ProgressData): Promise<void> {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(data));
  } catch {}
}

export async function updatePhraseLevel(
  jp: string,
  answer: 'forgot' | 'remembered' | 'mastered',
  currentLevel: PhraseLevel
): Promise<PhraseLevel> {
  const next: PhraseLevel =
    answer === 'mastered'
      ? 3
      : answer === 'remembered'
        ? (Math.min(2, currentLevel + 1) as PhraseLevel)
        : 1;

  const data = await loadProgress();
  data[jp] = next;
  await saveProgress(data);
  return next;
}

export function getCategoryStats(phrases: { jp: string }[], progress: ProgressData) {
  let unseen = 0;
  let learning = 0;
  let remembered = 0;
  let mastered = 0;

  for (const phrase of phrases) {
    const level = (progress[phrase.jp] ?? 0) as PhraseLevel;
    if (level === 0) unseen++;
    else if (level === 1) learning++;
    else if (level === 2) remembered++;
    else mastered++;
  }

  const total = phrases.length;
  const learnedCount = remembered + mastered;
  const learnedPercent = total > 0 ? learnedCount / total : 0;

  return { total, unseen, learning, remembered, mastered, learnedCount, learnedPercent };
}

export function sortByLevel<T extends { jp: string }>(phrases: T[], progress: ProgressData): T[] {
  // Group by level first (deterministic), then shuffle within each group.
  const groups = new Map<PhraseLevel, T[]>();
  for (const phrase of phrases) {
    const level = (progress[phrase.jp] ?? 0) as PhraseLevel;
    if (!groups.has(level)) groups.set(level, []);
    groups.get(level)!.push(phrase);
  }

  const result: T[] = [];
  for (const level of [0, 1, 2, 3] as PhraseLevel[]) {
    const group = groups.get(level);
    if (!group) continue;
    // Fisher-Yates shuffle within the group
    for (let i = group.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [group[i], group[j]] = [group[j], group[i]];
    }
    result.push(...group);
  }
  return result;
}
