import AsyncStorage from '@react-native-async-storage/async-storage';

import { getJlptRecoveryLevelConfig } from '../constants/jlptRecovery';
import type { JlptLevel } from './jlptRecoveryTypes';

export interface RecoveryProgress {
  completedDays: number[];
}

interface StoreState {
  cache: RecoveryProgress;
  loaded: boolean;
  listeners: Set<(p: RecoveryProgress) => void>;
}

const stores = new Map<JlptLevel, StoreState>();

function storageKey(level: JlptLevel): string {
  return `jlpt_recovery_progress_v1:${level}`;
}

function getStore(level: JlptLevel): StoreState {
  let store = stores.get(level);
  if (!store) {
    store = {
      cache: { completedDays: [] },
      loaded: false,
      listeners: new Set(),
    };
    stores.set(level, store);
  }
  return store;
}

function sanitize(level: JlptLevel, raw: unknown): RecoveryProgress {
  const totalDays = getJlptRecoveryLevelConfig(level).dayCount;
  const out: RecoveryProgress = { completedDays: [] };
  if (raw && typeof raw === 'object') {
    const days = (raw as { completedDays?: unknown }).completedDays;
    if (Array.isArray(days)) {
      const valid = days.filter(
        (n): n is number => typeof n === 'number' && n >= 1 && n <= totalDays,
      );
      out.completedDays = Array.from(new Set(valid)).sort((a, b) => a - b);
    }
  }
  return out;
}

function broadcast(level: JlptLevel): void {
  const store = getStore(level);
  const snapshot: RecoveryProgress = { completedDays: [...store.cache.completedDays] };
  for (const cb of store.listeners) cb(snapshot);
}

async function persistLocal(level: JlptLevel): Promise<void> {
  const store = getStore(level);
  try {
    await AsyncStorage.setItem(storageKey(level), JSON.stringify(store.cache));
  } catch {
    // Best-effort only.
  }
}

export function subscribeProgress(level: JlptLevel, cb: (p: RecoveryProgress) => void): () => void {
  const store = getStore(level);
  store.listeners.add(cb);
  return () => store.listeners.delete(cb);
}

export function getProgress(level: JlptLevel): RecoveryProgress {
  const store = getStore(level);
  return { completedDays: [...store.cache.completedDays] };
}

export function isLoaded(level: JlptLevel): boolean {
  return getStore(level).loaded;
}

export function isDayDone(level: JlptLevel, day: number): boolean {
  return getStore(level).cache.completedDays.includes(day);
}

export function getCurrentDay(level: JlptLevel): number {
  const totalDays = getJlptRecoveryLevelConfig(level).dayCount;
  const store = getStore(level);
  for (let day = 1; day <= totalDays; day++) {
    if (!store.cache.completedDays.includes(day)) return day;
  }
  return totalDays;
}

export async function loadProgress(level: JlptLevel): Promise<RecoveryProgress> {
  const store = getStore(level);
  try {
    const raw = await AsyncStorage.getItem(storageKey(level));
    store.cache = raw ? sanitize(level, JSON.parse(raw)) : { completedDays: [] };
  } catch {
    store.cache = { completedDays: [] };
  }
  store.loaded = true;
  broadcast(level);
  return getProgress(level);
}

export async function toggleDay(level: JlptLevel, day: number): Promise<void> {
  const store = getStore(level);
  const set = new Set(store.cache.completedDays);
  if (set.has(day)) set.delete(day);
  else set.add(day);
  store.cache = { completedDays: Array.from(set).sort((a, b) => a - b) };
  broadcast(level);
  await persistLocal(level);
}
