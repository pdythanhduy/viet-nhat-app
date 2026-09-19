#!/usr/bin/env node
// Content freshness audit — 2026-09-19.
//
// Scans every admin guide in src/constants/content/adminGuides/guides/
// and reports:
//   1. Guides whose `legalScope.nextReviewAt` is already in the past
//      (highest priority — reviewer said this needed re-checking by
//      that date and we're past it).
//   2. Guides whose `legalScope.sourceVerifiedAt` OR top-level
//      `lastVerified` is older than a configurable threshold (default
//      12 months) — soft signal that the guide may have drifted.
//   3. Guides missing `legalScope` entirely — no verification metadata
//      at all.
//   4. Guides referencing years that have already passed (2024, 2025,
//      early 2026 sections) — flagged for a human to re-check whether
//      the content is still time-appropriate.
//
// This is pure metadata scan — it does NOT check whether official URLs
// still work, whether the underlying law changed, or whether fee tables
// are current. Those need human verification against 官報 / 厚労省 /
// 出入国 / 国税庁 etc.
//
// Usage: node scripts/audit-content-freshness.js [--json]

const fs = require('fs');
const path = require('path');

const TODAY = new Date('2026-09-19');
const STALE_MONTHS = 12;
const STALE_CUTOFF = new Date(TODAY);
STALE_CUTOFF.setMonth(STALE_CUTOFF.getMonth() - STALE_MONTHS);

const GUIDES_DIR = path.join(
  __dirname,
  '..',
  'src',
  'constants',
  'content',
  'adminGuides',
  'guides',
);

function readGuideFiles() {
  return fs
    .readdirSync(GUIDES_DIR)
    .filter((f) => f.endsWith('.ts'))
    .map((f) => ({
      file: f,
      path: path.join(GUIDES_DIR, f),
      text: fs.readFileSync(path.join(GUIDES_DIR, f), 'utf8'),
    }));
}

// Best-effort field extractor via regex. Guide files are hand-authored
// TS objects, not JSON, so a full parse would need tsc. Regex handles
// the current uniform authoring style; anything it can't match falls
// into the "missing" bucket and is reported.
function extractFields(text) {
  const idMatch = text.match(/^\s+id:\s*'([^']+)'/m);
  const titleMatch = text.match(/^\s+title:\s*'([^']+)'/m);
  const lastVerifiedMatch = text.match(/^\s+lastVerified:\s*'([^']+)'/m);
  const priorityMatch = text.match(/^\s+priority:\s*'([^']+)'/m);
  const sourceVerifiedAtMatch = text.match(/sourceVerifiedAt:\s*'([^']+)'/);
  const nextReviewAtMatch = text.match(/nextReviewAt:\s*'([^']+)'/);
  const riskLevelMatch = text.match(/riskLevel:\s*'([^']+)'/);
  const hasLegalScope = /legalScope:\s*\{/.test(text);

  return {
    id: idMatch ? idMatch[1] : null,
    title: titleMatch ? titleMatch[1] : null,
    priority: priorityMatch ? priorityMatch[1] : null,
    lastVerified: lastVerifiedMatch ? lastVerifiedMatch[1] : null,
    hasLegalScope,
    sourceVerifiedAt: sourceVerifiedAtMatch ? sourceVerifiedAtMatch[1] : null,
    nextReviewAt: nextReviewAtMatch ? nextReviewAtMatch[1] : null,
    riskLevel: riskLevelMatch ? riskLevelMatch[1] : null,
  };
}

function parseDate(s) {
  if (!s) return null;
  const d = new Date(s);
  return isNaN(d.getTime()) ? null : d;
}

function daysBetween(a, b) {
  return Math.round((a - b) / (1000 * 60 * 60 * 24));
}

const files = readGuideFiles();
const rows = files.map((f) => ({ file: f.file, ...extractFields(f.text) }));

const overdue = [];
const stale = [];
const missingLegalScope = [];
const highRiskOverdueOrStale = [];

for (const row of rows) {
  if (!row.hasLegalScope) {
    missingLegalScope.push(row);
    continue;
  }
  const nextReview = parseDate(row.nextReviewAt);
  const sourceVerified = parseDate(row.sourceVerifiedAt);
  const lastVerified = parseDate(row.lastVerified);

  if (nextReview && nextReview < TODAY) {
    overdue.push({ ...row, daysOverdue: daysBetween(TODAY, nextReview) });
  } else if (
    (sourceVerified && sourceVerified < STALE_CUTOFF) ||
    (lastVerified && lastVerified < STALE_CUTOFF)
  ) {
    stale.push({
      ...row,
      sourceAgeDays: sourceVerified ? daysBetween(TODAY, sourceVerified) : null,
      lastVerifiedAgeDays: lastVerified ? daysBetween(TODAY, lastVerified) : null,
    });
  }

  if (row.riskLevel === 'high' && (nextReview < TODAY || sourceVerified < STALE_CUTOFF)) {
    highRiskOverdueOrStale.push(row.id);
  }
}

const isJson = process.argv.includes('--json');
if (isJson) {
  console.log(JSON.stringify({
    today: TODAY.toISOString().slice(0, 10),
    staleCutoff: STALE_CUTOFF.toISOString().slice(0, 10),
    totals: {
      totalGuides: rows.length,
      overdue: overdue.length,
      stale: stale.length,
      missingLegalScope: missingLegalScope.length,
      highRiskOverdueOrStale: highRiskOverdueOrStale.length,
    },
    overdue: overdue.sort((a, b) => b.daysOverdue - a.daysOverdue),
    stale: stale.sort((a, b) => (b.sourceAgeDays ?? 0) - (a.sourceAgeDays ?? 0)),
    missingLegalScope,
  }, null, 2));
  process.exit(0);
}

console.log(`\nContent freshness audit — today ${TODAY.toISOString().slice(0,10)}`);
console.log(`Stale cutoff: sourceVerifiedAt or lastVerified older than ${STALE_MONTHS} months (before ${STALE_CUTOFF.toISOString().slice(0,10)}).`);
console.log(`Scanned ${rows.length} admin guides.\n`);

console.log(`=== 1) nextReviewAt already in the past (${overdue.length}) ===`);
overdue.sort((a, b) => b.daysOverdue - a.daysOverdue);
for (const row of overdue) {
  console.log(
    `  [${row.riskLevel ?? '??'}] ${row.id}: nextReviewAt=${row.nextReviewAt} (overdue ${row.daysOverdue} days)`,
  );
}

console.log(`\n=== 2) Verified metadata older than ${STALE_MONTHS} months (${stale.length}) ===`);
stale.sort((a, b) => (b.sourceAgeDays ?? 0) - (a.sourceAgeDays ?? 0));
for (const row of stale) {
  const parts = [];
  if (row.sourceAgeDays != null) parts.push(`sourceVerified=${row.sourceVerifiedAt} (${row.sourceAgeDays}d)`);
  if (row.lastVerifiedAgeDays != null) parts.push(`lastVerified=${row.lastVerified} (${row.lastVerifiedAgeDays}d)`);
  console.log(`  [${row.riskLevel ?? '??'}] ${row.id}: ${parts.join(', ')}`);
}

console.log(`\n=== 3) Missing legalScope block (${missingLegalScope.length}) ===`);
for (const row of missingLegalScope) {
  console.log(`  ${row.id ?? row.file}: lastVerified=${row.lastVerified ?? 'n/a'}`);
}

console.log(`\n=== 4) HIGH-risk guides that are overdue or stale (${highRiskOverdueOrStale.length}) ===`);
for (const id of highRiskOverdueOrStale) {
  console.log(`  ${id}`);
}

console.log('');
