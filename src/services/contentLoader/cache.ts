import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

import type { CacheEnvelope } from './types';

const KEY_PREFIX = 'content_cache_v1::';

function getAppVersion(): string {
  return Constants.expoConfig?.version ?? '0.0.0';
}

function fullKey(key: string): string {
  return KEY_PREFIX + key;
}

export async function readCache<T>(
  key: string,
  expectedSchemaVersion: number,
): Promise<CacheEnvelope<T> | null> {
  try {
    const raw = await AsyncStorage.getItem(fullKey(key));
    if (!raw) return null;
    const env = JSON.parse(raw) as CacheEnvelope<T>;
    if (env.schemaVersion !== expectedSchemaVersion) return null;
    if (env.appVersion !== getAppVersion()) return null;
    return env;
  } catch {
    return null;
  }
}

export async function writeCache<T>(
  key: string,
  data: T,
  schemaVersion: number,
): Promise<void> {
  try {
    const env: CacheEnvelope<T> = {
      schemaVersion,
      fetchedAt: Date.now(),
      appVersion: getAppVersion(),
      data,
    };
    await AsyncStorage.setItem(fullKey(key), JSON.stringify(env));
  } catch {
    // Cache write is best-effort.
  }
}

export async function clearCache(key?: string): Promise<void> {
  try {
    if (key) {
      await AsyncStorage.removeItem(fullKey(key));
      return;
    }
    const keys = await AsyncStorage.getAllKeys();
    const cacheKeys = keys.filter((k) => k.startsWith(KEY_PREFIX));
    if (cacheKeys.length > 0) {
      await AsyncStorage.multiRemove(cacheKeys);
    }
  } catch {
    // Best-effort.
  }
}
