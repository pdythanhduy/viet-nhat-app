import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

const CACHE_PREFIX = 'jlpt_recovery_cache_v1::';

export interface RecoveryCacheEnvelope<T> {
  schemaVersion: number;
  fetchedAt: number;
  appVersion: string;
  data: T;
}

export function getAppVersion(): string {
  return Constants.expoConfig?.version ?? '0.0.0';
}

function fullKey(key: string): string {
  return `${CACHE_PREFIX}${key}`;
}

export function toAsciiJson(value: unknown): string {
  const s = JSON.stringify(value);
  let out = '';
  for (let i = 0; i < s.length; i++) {
    const code = s.charCodeAt(i);
    out += code < 128 ? s[i] : `\\u${code.toString(16).padStart(4, '0')}`;
  }
  return out;
}

export function stableHash(value: string): string {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(36);
}

export function extractJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    const a = text.indexOf('[');
    const b = text.lastIndexOf(']');
    if (a >= 0 && b > a) return JSON.parse(text.slice(a, b + 1));
    const c = text.indexOf('{');
    const d = text.lastIndexOf('}');
    if (c >= 0 && d > c) return JSON.parse(text.slice(c, d + 1));
    throw new Error('Claude khong tra ve JSON hop le.');
  }
}

export async function readCache<T>(
  key: string,
  expectedSchemaVersion: number,
): Promise<RecoveryCacheEnvelope<T> | null> {
  try {
    const raw = await AsyncStorage.getItem(fullKey(key));
    if (!raw) return null;
    const env = JSON.parse(raw) as RecoveryCacheEnvelope<T>;
    // Only the schema version invalidates the cache. `appVersion` is stored for
    // diagnostics, not used to invalidate — content shape changes are already
    // covered by schemaVersion (and promptVersion in the key), so keying off the
    // app version would needlessly regenerate every cached day on each release.
    if (env.schemaVersion !== expectedSchemaVersion) return null;
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
    const env: RecoveryCacheEnvelope<T> = {
      schemaVersion,
      fetchedAt: Date.now(),
      appVersion: getAppVersion(),
      data,
    };
    await AsyncStorage.setItem(fullKey(key), JSON.stringify(env));
  } catch {
    // Best-effort cache.
  }
}
