import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'japanese_progress_v1';

export type PhraseLevel = 0 | 1 | 2 | 3;
// 0 = Chưa học, 1 = Đang học, 2 = Đã nhớ, 3 = Thành thạo

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
    answer === 'mastered' ? 3 :
    answer === 'remembered' ? (Math.min(2, currentLevel + 1) as PhraseLevel) :
    1; // forgot → level 1 (Đang học)

  const data = await loadProgress();
  data[jp] = next;
  await saveProgress(data);
  return next;
}

export function getCategoryStats(
  phrases: { jp: string }[],
  progress: ProgressData
) {
  let unseen = 0, learning = 0, remembered = 0, mastered = 0;
  for (const p of phrases) {
    const level = (progress[p.jp] ?? 0) as PhraseLevel;
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

/** Sort phrases: weakest first (unseen → learning → remembered → mastered) */
export function sortByLevel<T extends { jp: string }>(
  phrases: T[],
  progress: ProgressData
): T[] {
  return [...phrases].sort((a, b) => {
    const la = progress[a.jp] ?? 0;
    const lb = progress[b.jp] ?? 0;
    return la !== lb ? la - lb : Math.random() - 0.5;
  });
}
