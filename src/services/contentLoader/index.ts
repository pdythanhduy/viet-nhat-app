import { readCache } from './cache';
import { BUNDLED } from './fallback';
import type { LoadOptions } from './types';

const DEFAULT_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const DEFAULT_SCHEMA_VERSION = 1;

export async function loadContent<T>(key: string, opts: LoadOptions = {}): Promise<T> {
  const ttlMs = opts.ttlMs ?? DEFAULT_TTL_MS;
  const schemaVersion = opts.schemaVersion ?? DEFAULT_SCHEMA_VERSION;

  if (!opts.forceRefresh) {
    const cached = await readCache<T>(key, schemaVersion);
    if (cached && Date.now() - cached.fetchedAt < ttlMs) {
      return cached.data;
    }
  }

  // Phase 2 hook: insert Supabase fetch here, gated by feature flag.
  // On success: writeCache(key, data, schemaVersion); return data.
  // On failure: fall through to bundled fallback.

  const fn = BUNDLED[key];
  if (!fn) {
    throw new Error(`[contentLoader] No bundled fallback for key: ${key}`);
  }
  return fn() as T;
}

export { clearCache } from './cache';
export type { CacheEnvelope, LoadOptions } from './types';
