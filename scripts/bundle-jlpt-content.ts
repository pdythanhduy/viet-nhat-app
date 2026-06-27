/**
 * Bundle the free level (N5) into the app.
 *
 * Reads content/jlpt/N5/day-*.json (produced by `npm run jlpt:generate`) and
 * writes src/constants/jlpt/n5Content.ts so the free sample ships inside the app
 * (offline, zero backend cost). Paid levels (N4–N1) are NOT bundled — they go to
 * Supabase behind an entitlement gate.
 *
 *   npm run jlpt:bundle
 */

import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import type { RecoveryPregeneratedDay } from '../src/services/jlptRecoveryTypes';

const SRC_DIR = join(process.cwd(), 'content', 'jlpt', 'N5');
const OUT_FILE = join(process.cwd(), 'src', 'constants', 'jlpt', 'n5Content.ts');

interface DayFile {
  day: number;
  vocab: RecoveryPregeneratedDay['vocab'];
  quiz: RecoveryPregeneratedDay['quiz'];
  lesson?: RecoveryPregeneratedDay['lesson'];
}

function build(): void {
  const map: Record<number, RecoveryPregeneratedDay> = {};

  if (existsSync(SRC_DIR)) {
    const files = readdirSync(SRC_DIR)
      .filter((f) => f.endsWith('.json'))
      .sort();
    for (const f of files) {
      const parsed = JSON.parse(readFileSync(join(SRC_DIR, f), 'utf8')) as DayFile;
      if (!parsed.vocab?.length) continue;
      map[parsed.day] = {
        vocab: parsed.vocab,
        quiz: parsed.quiz ?? [],
        ...(parsed.lesson?.length ? { lesson: parsed.lesson } : {}),
      };
    }
  }

  const days = Object.keys(map).length;
  const body =
    '// Bundled, pre-generated N5 content (free sample level).\n' +
    '//\n' +
    '// GENERATED FILE — produced by `npm run jlpt:bundle` from content/jlpt/N5/*.json.\n' +
    '// Do not edit by hand. Empty until the owner runs `npm run jlpt:generate` then\n' +
    '// `npm run jlpt:bundle`. While empty, the app falls back to other sources.\n' +
    '\n' +
    "import type { RecoveryPregeneratedDay } from '../../services/jlptRecoveryTypes';\n" +
    '\n' +
    'export const N5_PREGENERATED: Record<number, RecoveryPregeneratedDay> = ' +
    `${JSON.stringify(map, null, 2)};\n`;

  writeFileSync(OUT_FILE, body);
  console.log(`Bundled ${days} N5 day(s) -> ${OUT_FILE}`);
  if (days === 0) {
    console.log('(content/jlpt/N5 rong — chay `npm run jlpt:generate -- --level=N5` truoc.)');
  }
}

build();
