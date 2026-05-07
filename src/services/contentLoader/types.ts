export interface CacheEnvelope<T> {
  schemaVersion: number;
  fetchedAt: number;
  appVersion: string;
  data: T;
}

export interface LoadOptions {
  ttlMs?: number;
  forceRefresh?: boolean;
  schemaVersion?: number;
}
