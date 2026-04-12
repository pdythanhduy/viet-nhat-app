import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '../constants/storageKeys';

const STORAGE_KEY = StorageKeys.laborResources;

export type LaborResourceId = 'labor-guide' | 'labor-help' | 'official-law';

export interface LaborResourceState {
  id: LaborResourceId;
  savedAt?: string;
  pinnedAt?: string;
  lastViewedAt?: string;
}

export interface LaborResourceDefinition {
  id: LaborResourceId;
  title: string;
  description: string;
  color: string;
}

async function loadStateMap(): Promise<Record<string, LaborResourceState>> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Record<string, LaborResourceState>;
  } catch {
    return {};
  }
}

async function saveStateMap(map: Record<string, LaborResourceState>): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(map));
}

export async function loadLaborResourceStates(): Promise<LaborResourceState[]> {
  const stateMap = await loadStateMap();
  return Object.values(stateMap);
}

export async function toggleLaborResourceSaved(id: LaborResourceId): Promise<boolean> {
  const stateMap = await loadStateMap();
  const existing = stateMap[id];

  if (existing?.savedAt) {
    stateMap[id] = {
      id,
      lastViewedAt: existing.lastViewedAt,
    };
    await saveStateMap(stateMap);
    return false;
  }

  stateMap[id] = {
    id,
    savedAt: new Date().toISOString(),
    pinnedAt: existing?.pinnedAt,
    lastViewedAt: existing?.lastViewedAt,
  };
  await saveStateMap(stateMap);
  return true;
}

export async function toggleLaborResourcePinned(id: LaborResourceId): Promise<boolean> {
  const stateMap = await loadStateMap();
  const existing = stateMap[id] ?? { id };
  const nextPinned = !existing.pinnedAt;

  stateMap[id] = {
    id,
    savedAt: existing.savedAt ?? new Date().toISOString(),
    pinnedAt: nextPinned ? new Date().toISOString() : undefined,
    lastViewedAt: existing.lastViewedAt,
  };
  await saveStateMap(stateMap);
  return nextPinned;
}

export async function markLaborResourceViewed(id: LaborResourceId): Promise<LaborResourceState[]> {
  const stateMap = await loadStateMap();
  const existing = stateMap[id] ?? { id };

  stateMap[id] = {
    ...existing,
    id,
    lastViewedAt: new Date().toISOString(),
  };
  await saveStateMap(stateMap);
  return Object.values(stateMap);
}
