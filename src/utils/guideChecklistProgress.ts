import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '../constants/storageKeys';

type ChecklistProgress = Record<string, string[]>;

const STORAGE_KEY = StorageKeys.guideChecklistProgress;

export async function loadGuideChecklistProgress(guideId: string): Promise<string[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    const progress: ChecklistProgress = raw ? JSON.parse(raw) : {};
    return Array.isArray(progress[guideId]) ? progress[guideId] : [];
  } catch {
    return [];
  }
}

export async function saveGuideChecklistProgress(
  guideId: string,
  checkedLabels: string[]
): Promise<void> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  const progress: ChecklistProgress = raw ? JSON.parse(raw) : {};
  progress[guideId] = Array.from(new Set(checkedLabels));
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export async function toggleGuideChecklistItem(
  guideId: string,
  label: string
): Promise<string[]> {
  const checked = await loadGuideChecklistProgress(guideId);
  const next = checked.includes(label)
    ? checked.filter((item) => item !== label)
    : [...checked, label];

  await saveGuideChecklistProgress(guideId, next);
  return next;
}

export async function clearGuideChecklistProgress(guideId: string): Promise<void> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  const progress: ChecklistProgress = raw ? JSON.parse(raw) : {};
  delete progress[guideId];
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}
