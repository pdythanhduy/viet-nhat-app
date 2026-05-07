// Remote (Supabase) fetch layer — Phase 2 scaffolding.
//
// Feature flag: EXPO_PUBLIC_REMOTE_CONTENT_ENABLED must be the literal
// string 'true' for the loader to attempt a network round-trip. When
// disabled (default), `fetchRemote` returns null synchronously and the
// loader falls through to its bundled fallback.
//
// Schema expectation on the backend (table `content`):
//   key            TEXT PRIMARY KEY  -- e.g. 'japanese.phrases.greetings'
//   schema_version INTEGER NOT NULL
//   payload        JSONB   NOT NULL
//   updated_at     TIMESTAMPTZ DEFAULT NOW()
//
// PostgREST will return rows as: { key, schema_version, payload, updated_at }.

const FETCH_TIMEOUT_MS = 5000;

function isEnabled(): boolean {
  return process.env.EXPO_PUBLIC_REMOTE_CONTENT_ENABLED === 'true';
}

function getConfig(): { url: string; anonKey: string } | null {
  const url = process.env.EXPO_PUBLIC_REMOTE_CONTENT_URL;
  const anonKey = process.env.EXPO_PUBLIC_REMOTE_CONTENT_KEY;
  if (!url || !anonKey) return null;
  return { url, anonKey };
}

export interface RemoteResult<T> {
  data: T;
  schemaVersion: number;
}

export async function fetchRemote<T>(key: string): Promise<RemoteResult<T> | null> {
  if (!isEnabled()) return null;
  const config = getConfig();
  if (!config) return null;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(
      `${config.url}/rest/v1/content?key=eq.${encodeURIComponent(key)}&select=schema_version,payload`,
      {
        method: 'GET',
        headers: {
          apikey: config.anonKey,
          Authorization: `Bearer ${config.anonKey}`,
          Accept: 'application/json',
        },
        signal: controller.signal,
      },
    );

    if (!res.ok) return null;

    const rows = (await res.json()) as Array<{ schema_version: number; payload: T }>;
    const row = rows[0];
    if (!row) return null;

    return { data: row.payload, schemaVersion: row.schema_version };
  } catch {
    // Network error, timeout, JSON parse failure — treat as remote miss.
    return null;
  } finally {
    clearTimeout(timer);
  }
}
