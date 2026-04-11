import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '../constants/storageKeys';

type ProgressMap = Record<string, string[]>;

const STORAGE_KEY = StorageKeys.laborHelpChecklistProgress;

export async function loadLaborHelpProgress(scenarioId: string): Promise<string[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    const data: ProgressMap = raw ? JSON.parse(raw) : {};
    return Array.isArray(data[scenarioId]) ? data[scenarioId] : [];
  } catch {
    return [];
  }
}

export async function toggleLaborHelpEvidenceItem(
  scenarioId: string,
  item: string
): Promise<string[]> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  const data: ProgressMap = raw ? JSON.parse(raw) : {};
  const current = Array.isArray(data[scenarioId]) ? data[scenarioId] : [];
  const next = current.includes(item)
    ? current.filter((value) => value !== item)
    : [...current, item];
  data[scenarioId] = next;
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  return next;
}

export async function clearLaborHelpProgress(scenarioId: string): Promise<void> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  const data: ProgressMap = raw ? JSON.parse(raw) : {};
  delete data[scenarioId];
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
