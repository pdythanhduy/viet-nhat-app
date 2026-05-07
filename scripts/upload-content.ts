/**
 * Upload every BUNDLED content payload to Supabase.
 *
 * Run with:
 *   npm run content:upload
 *
 * Required env vars (do NOT commit them; export them in your shell or
 * paste them on the same line):
 *
 *   SUPABASE_URL                  https://<project-ref>.supabase.co
 *   SUPABASE_SERVICE_ROLE_KEY     "service_role" key from Settings → API
 *
 * The service-role key bypasses Row-Level Security and lets us upsert.
 * NEVER bundle it into the client app — that's what the anon key is for.
 *
 * Schema this script writes against:
 *
 *   content (
 *     key            TEXT PRIMARY KEY,
 *     schema_version INTEGER NOT NULL,
 *     payload        JSONB   NOT NULL,
 *     updated_at     TIMESTAMPTZ DEFAULT NOW()
 *   )
 *
 * Re-running is safe: each row is upserted on conflict(key), so existing
 * rows get their payload + schema_version refreshed and the trigger bumps
 * updated_at.
 */

import { createClient } from '@supabase/supabase-js';

import { BUNDLED } from '../src/services/contentLoader/fallback';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SCHEMA_VERSION = Number(process.env.CONTENT_SCHEMA_VERSION ?? '1');

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error(
    '[upload-content] Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env var.\n' +
      '  Get them from Supabase Dashboard → Settings → API.\n' +
      '  Service-role key is the secret one labelled "service_role / secret".',
  );
  process.exit(1);
}

const client = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

interface Result {
  key: string;
  status: 'ok' | 'fail';
  bytes: number;
  detail?: string;
}

function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

async function uploadOne(key: string, loader: () => unknown): Promise<Result> {
  let payload: unknown;
  try {
    payload = loader();
  } catch (err) {
    return {
      key,
      status: 'fail',
      bytes: 0,
      detail: `bundled loader threw: ${(err as Error).message}`,
    };
  }

  const serialized = JSON.stringify(payload);
  const bytes = Buffer.byteLength(serialized, 'utf8');

  const { error } = await client
    .from('content')
    .upsert(
      {
        key,
        schema_version: SCHEMA_VERSION,
        payload,
      },
      { onConflict: 'key' },
    );

  if (error) {
    return { key, status: 'fail', bytes, detail: error.message };
  }
  return { key, status: 'ok', bytes };
}

async function main() {
  const keys = Object.keys(BUNDLED).sort();
  console.log(`[upload-content] uploading ${keys.length} keys to ${SUPABASE_URL}`);

  const results: Result[] = [];
  for (const key of keys) {
    const result = await uploadOne(key, BUNDLED[key]);
    results.push(result);

    if (result.status === 'ok') {
      console.log(`  OK   ${key.padEnd(36)} ${formatBytes(result.bytes)}`);
    } else {
      console.log(
        `  FAIL ${key.padEnd(36)} ${formatBytes(result.bytes)} — ${result.detail}`,
      );
    }
  }

  const ok = results.filter((r) => r.status === 'ok').length;
  const fail = results.filter((r) => r.status === 'fail').length;
  const totalBytes = results.reduce((acc, r) => acc + r.bytes, 0);

  console.log(
    `\n[upload-content] done: ${ok} ok, ${fail} fail, ${formatBytes(totalBytes)} total payload`,
  );

  if (fail > 0) process.exit(2);
}

void main();
