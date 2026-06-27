/**
 * Offline JLPT content generator.
 *
 * Pre-generates Vocabulary + Quiz (+ optional grammar Lesson) for every `normal`
 * day of each JLPT level, ONCE, using the owner's Anthropic key — so public app
 * users never call Claude with that key. Output is plain JSON per day:
 *
 *   content/jlpt/<level>/day-<NN>.json
 *
 * Later steps bundle the free level (N5) into the app and upload the paid levels
 * (N4–N1) to Supabase behind an entitlement gate.
 *
 * Run (Node 22+, tsx is a devDependency):
 *   npm run jlpt:generate -- --dry                 # plan + cost estimate, no API calls
 *   npm run jlpt:generate -- --level=N5            # one level
 *   npm run jlpt:generate                          # all levels, skips existing files
 *   npm run jlpt:generate -- --no-lesson           # vocab+quiz only
 *
 * The API key is read from ANTHROPIC_API_KEY or EXPO_PUBLIC_ANTHROPIC_API_KEY.
 * If neither is set in the environment, the script auto-loads `.env` from the
 * project root (where Expo already keeps EXPO_PUBLIC_ANTHROPIC_API_KEY).
 */

import { mkdirSync, existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { JLPT_RECOVERY_LEVELS, getJlptRecoveryLevelConfig } from '../src/constants/jlptRecovery';
import {
  getRecoveryCurriculum,
  getRecoveryCurriculumDay,
} from '../src/constants/jlptRecoveryCurriculum';
import {
  generateRecoveryDayContent,
  generateRecoveryLesson,
} from '../src/services/jlptGenerationCore';
import type { JlptLevel } from '../src/services/jlptRecoveryTypes';

interface Args {
  levels: JlptLevel[];
  dry: boolean;
  withLesson: boolean;
  skipExisting: boolean;
  outDir: string;
}

function parseArgs(argv: string[]): Args {
  const levels: JlptLevel[] = [];
  let dry = false;
  let withLesson = true;
  let skipExisting = true;
  let outDir = join(process.cwd(), 'content', 'jlpt');

  for (const arg of argv) {
    if (arg === '--dry') dry = true;
    else if (arg === '--no-lesson') withLesson = false;
    else if (arg === '--force') skipExisting = false;
    else if (arg.startsWith('--level=')) {
      const v = arg.slice('--level='.length).toUpperCase() as JlptLevel;
      if ((JLPT_RECOVERY_LEVELS as readonly string[]).includes(v)) levels.push(v);
      else throw new Error(`Cap do khong hop le: ${v}`);
    } else if (arg.startsWith('--out=')) {
      outDir = arg.slice('--out='.length);
    }
  }

  return {
    levels: levels.length > 0 ? levels : [...JLPT_RECOVERY_LEVELS],
    dry,
    withLesson,
    skipExisting,
    outDir,
  };
}

function dayFile(outDir: string, level: JlptLevel, day: number): string {
  return join(outDir, level, `day-${String(day).padStart(3, '0')}.json`);
}

function normalDays(level: JlptLevel): number[] {
  const curriculum = getRecoveryCurriculum(level);
  if (!curriculum) return [];
  return curriculum.days.filter((d) => d.kind === 'normal').map((d) => d.day);
}

function printPlan(args: Args): void {
  console.log('JLPT content generation — plan\n');
  let totalDays = 0;
  for (const level of args.levels) {
    const days = normalDays(level);
    totalDays += days.length;
    const config = getJlptRecoveryLevelConfig(level);
    console.log(
      `  ${level}: ${days.length} normal day(s)  ` +
        `(${config.vocabBatchCount}x${config.vocabCardsPerBatch} vocab + ${config.quizCount} quiz` +
        `${args.withLesson ? ` + ${config.lessonItemCount} grammar` : ''})`,
    );
  }
  // Rough estimate: ~$0.07 content + ~$0.01 lesson per day on claude-haiku-4-5.
  const perDay = 0.07 + (args.withLesson ? 0.01 : 0);
  console.log(
    `\n  Total: ${totalDays} day(s)  ~$${(totalDays * perDay).toFixed(2)} (rough, +/-30%)`,
  );
  console.log(`  Output: ${args.outDir}`);
}

async function run(): Promise<void> {
  const args = parseArgs(process.argv.slice(2));

  if (args.dry) {
    printPlan(args);
    console.log('\n[dry] Khong goi API. Bo --dry de sinh that.');
    return;
  }

  // Auto-load .env (project root) when the key isn't already exported.
  if (!process.env.ANTHROPIC_API_KEY && !process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY) {
    try {
      process.loadEnvFile('.env');
    } catch {
      // no .env — fall through to the missing-key error below
    }
  }

  const apiKey = process.env.ANTHROPIC_API_KEY || process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error(
      'Thieu API key. Dat ANTHROPIC_API_KEY hoac EXPO_PUBLIC_ANTHROPIC_API_KEY ' +
        '(vd: npm run jlpt:generate -- --dry de xem ke hoach).',
    );
    process.exit(1);
  }

  printPlan(args);
  console.log('');

  let generated = 0;
  let skipped = 0;
  let failed = 0;

  for (const level of args.levels) {
    const days = normalDays(level);
    mkdirSync(join(args.outDir, level), { recursive: true });

    for (const day of days) {
      const file = dayFile(args.outDir, level, day);
      if (args.skipExisting && existsSync(file)) {
        skipped++;
        continue;
      }

      const info = getRecoveryCurriculumDay(level, day);
      if (!info) {
        console.warn(`  ! ${level} day ${day}: khong tim thay trong curriculum`);
        failed++;
        continue;
      }

      const config = getJlptRecoveryLevelConfig(level);
      try {
        process.stdout.write(`  ${level} day ${String(day).padStart(3, '0')} ... `);
        const content = await generateRecoveryDayContent(
          { apiKey },
          { level, day, theme: info.theme, vocabTopic: info.vocabTopic },
        );

        let lesson;
        if (args.withLesson) {
          lesson = await generateRecoveryLesson(
            { apiKey },
            { level, day, theme: info.theme, patterns: info.grammar },
          );
        }

        writeFileSync(
          file,
          JSON.stringify(
            {
              level,
              day,
              theme: info.theme,
              vocabTopic: info.vocabTopic,
              promptVersion: config.promptVersion,
              contentSchemaVersion: config.contentSchemaVersion,
              lessonSchemaVersion: config.lessonSchemaVersion,
              generatedAt: new Date().toISOString(),
              vocab: content.vocab,
              quiz: content.quiz,
              lesson: lesson ? lesson.grammar : undefined,
            },
            null,
            2,
          ),
        );
        generated++;
        console.log(`ok (${content.vocab.length} tu, ${content.quiz.length} quiz)`);
      } catch (e) {
        failed++;
        console.log(`LOI: ${e instanceof Error ? e.message : String(e)}`);
      }
    }
  }

  console.log(`\nXong. Sinh moi: ${generated}, bo qua (da co): ${skipped}, loi: ${failed}.`);
  if (failed > 0) process.exitCode = 1;
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
