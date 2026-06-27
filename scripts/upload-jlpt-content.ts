/**
 * Upload paid JLPT content (N4–N1) to Supabase `jlpt_content`.
 *
 * Reads content/jlpt/<level>/day-*.json (from `npm run jlpt:generate`) and
 * upserts each day's { vocab, quiz, lesson } payload. Uses the Supabase SERVICE
 * ROLE key, which bypasses RLS — so it can write content that normal clients
 * can only read behind the Pro entitlement.
 *
 *   npm run jlpt:upload                 # N4,N3,N2,N1 (N5 is bundled, skipped)
 *   npm run jlpt:upload -- --level=N3   # one level
 *   npm run jlpt:upload -- --dry        # list rows, no network
 *
 * Required env (auto-loaded from .env if present):
 *   SUPABASE_URL                 (or EXPO_PUBLIC_SUPABASE_URL / *_REMOTE_CONTENT_URL)
 *   SUPABASE_SERVICE_ROLE_KEY    ← SECRET. Never prefix EXPO_PUBLIC_ (would ship in the app).
 */

import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

import { createClient } from '@supabase/supabase-js';

import type { JlptLevel } from '../src/services/jlptRecoveryTypes';

const PAID_LEVELS: JlptLevel[] = ['N4', 'N3', 'N2', 'N1'];
const SRC_ROOT = join(process.cwd(), 'content', 'jlpt');

interface Args {
  levels: JlptLevel[];
  dry: boolean;
}

function parseArgs(argv: string[]): Args {
  const levels: JlptLevel[] = [];
  let dry = false;
  for (const arg of argv) {
    if (arg === '--dry') dry = true;
    else if (arg.startsWith('--level=')) {
      levels.push(arg.slice('--level='.length).toUpperCase() as JlptLevel);
    }
  }
  return { levels: levels.length ? levels : PAID_LEVELS, dry };
}

interface DayFile {
  level: JlptLevel;
  day: number;
  contentSchemaVersion?: number;
  vocab: unknown[];
  quiz: unknown[];
  lesson?: unknown[];
}

interface Row {
  level: JlptLevel;
  day: number;
  payload: { vocab: unknown[]; quiz: unknown[]; lesson?: unknown[] };
  schema_version: number;
}

function collectRows(levels: JlptLevel[]): Row[] {
  const rows: Row[] = [];
  for (const level of levels) {
    const dir = join(SRC_ROOT, level);
    if (!existsSync(dir)) continue;
    for (const f of readdirSync(dir).filter((x) => x.endsWith('.json')).sort()) {
      const d = JSON.parse(readFileSync(join(dir, f), 'utf8')) as DayFile;
      if (!d.vocab?.length) continue;
      rows.push({
        level,
        day: d.day,
        payload: {
          vocab: d.vocab,
          quiz: d.quiz ?? [],
          ...(d.lesson?.length ? { lesson: d.lesson } : {}),
        },
        schema_version: d.contentSchemaVersion ?? 1,
      });
    }
  }
  return rows;
}

async function run(): Promise<void> {
  const args = parseArgs(process.argv.slice(2));

  if (
    !process.env.SUPABASE_SERVICE_ROLE_KEY &&
    !process.env.SUPABASE_URL &&
    !process.env.EXPO_PUBLIC_SUPABASE_URL
  ) {
    try {
      process.loadEnvFile('.env');
    } catch {
      // no .env
    }
  }

  const rows = collectRows(args.levels);
  const byLevel = args.levels.map((l) => `${l}:${rows.filter((r) => r.level === l).length}`).join('  ');
  console.log(`Rows to upload — ${byLevel}  (total ${rows.length})`);

  if (args.dry) {
    console.log('[dry] Khong ket noi Supabase.');
    return;
  }
  if (rows.length === 0) {
    console.log('Khong co content de upload (chay `npm run jlpt:generate` truoc).');
    return;
  }

  const url =
    process.env.SUPABASE_URL ||
    process.env.EXPO_PUBLIC_SUPABASE_URL ||
    process.env.EXPO_PUBLIC_REMOTE_CONTENT_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    console.error('Thieu SUPABASE_URL hoac SUPABASE_SERVICE_ROLE_KEY trong .env.');
    process.exit(1);
  }

  const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });

  // Upsert in chunks to keep requests small.
  const CHUNK = 50;
  let done = 0;
  for (let i = 0; i < rows.length; i += CHUNK) {
    const chunk = rows.slice(i, i + CHUNK);
    const { error } = await supabase
      .from('jlpt_content')
      .upsert(chunk, { onConflict: 'level,day' });
    if (error) {
      console.error(`Loi upsert (rows ${i}..${i + chunk.length}): ${error.message}`);
      process.exit(1);
    }
    done += chunk.length;
    console.log(`  upserted ${done}/${rows.length}`);
  }
  console.log('Xong.');
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
