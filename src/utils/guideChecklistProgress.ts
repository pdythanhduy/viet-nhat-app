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

export async function loadAllGuideChecklistProgress(): Promise<ChecklistProgress> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    const progress: ChecklistProgress = raw ? JSON.parse(raw) : {};
    return Object.fromEntries(
      Object.entries(progress).map(([guideId, labels]) => [
        guideId,
        Array.isArray(labels) ? labels : [],
      ])
    );
  } catch {
    return {};
  }
}

export async function saveGuideChecklistProgress(
  guideId: string,
  checkedLabels: string[]
): Promise<void> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    const progress: ChecklistProgress = raw ? JSON.parse(raw) : {};
    progress[guideId] = Array.from(new Set(checkedLabels));
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Ignore storage failures so checklist actions remain non-fatal on device.
  }
}

export async function toggleGuideChecklistItem(
  guideId: string,
  label: string
): Promise<string[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    const progress: ChecklistProgress = raw ? JSON.parse(raw) : {};
    const checked = Array.isArray(progress[guideId]) ? progress[guideId] : [];
    const next = checked.includes(label)
      ? checked.filter((item) => item !== label)
      : [...checked, label];

    progress[guideId] = Array.from(new Set(next));
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    return progress[guideId];
  } catch {
    return [];
  }
}

export async function clearGuideChecklistProgress(guideId: string): Promise<void> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    const progress: ChecklistProgress = raw ? JSON.parse(raw) : {};
    delete progress[guideId];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Ignore storage failures so clearing progress cannot crash the app.
  }
}
