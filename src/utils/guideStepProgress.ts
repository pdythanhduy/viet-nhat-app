import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '../constants/storageKeys';

type StepProgress = Record<string, number[]>;

export async function loadGuideStepProgress(guideId: string): Promise<Set<number>> {
  try {
    const raw = await AsyncStorage.getItem(StorageKeys.guideStepProgress);
    const progress: StepProgress = raw ? JSON.parse(raw) : {};
    return new Set(Array.isArray(progress[guideId]) ? progress[guideId] : []);
  } catch {
    return new Set();
  }
}

export async function loadAllGuideStepProgress(): Promise<StepProgress> {
  try {
    const raw = await AsyncStorage.getItem(StorageKeys.guideStepProgress);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export async function toggleGuideStep(guideId: string, stepIndex: number): Promise<Set<number>> {
  try {
    const raw = await AsyncStorage.getItem(StorageKeys.guideStepProgress);
    const progress: StepProgress = raw ? JSON.parse(raw) : {};
    const current = new Set(Array.isArray(progress[guideId]) ? progress[guideId] : []);
    if (current.has(stepIndex)) current.delete(stepIndex);
    else current.add(stepIndex);
    progress[guideId] = Array.from(current);
    await AsyncStorage.setItem(StorageKeys.guideStepProgress, JSON.stringify(progress));
    return current;
  } catch {
    return new Set();
  }
}

export async function clearGuideStepProgress(guideId: string): Promise<void> {
  try {
    const raw = await AsyncStorage.getItem(StorageKeys.guideStepProgress);
    const progress: StepProgress = raw ? JSON.parse(raw) : {};
    delete progress[guideId];
    await AsyncStorage.setItem(StorageKeys.guideStepProgress, JSON.stringify(progress));
  } catch {
    // ignore
  }
}
