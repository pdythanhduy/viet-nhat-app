const fs = require('fs');
const path = require('path');

const TARGET_FILES = [
  'src/constants/content/japanese.ts',
  'src/constants/content/adminGuides.ts',
  'src/constants/content/dailyLife.ts',
  'src/constants/content/emergency.ts',
  'src/constants/content/jobs.ts',
  'src/constants/content/bjt.ts',
  'docs/bjt/document/partitioned/keigo.json',
  'docs/bjt/document/partitioned/scenarios.json',
  'docs/bjt/document/partitioned/mock_test.json',
  'docs/bjt/document/partitioned/vocabulary.json',
];

const FIX_MODE = process.argv.includes('--fix');

const SUSPICIOUS_PATTERNS = [
  /\u00c3./,
  /\u00c4./,
  /\u00e1[\u0080-\u00ff]/,
  /\u00e2[\u0080-\u00ff]/,
  /\u00e3[\u0080-\u00ff]/,
  /\u00e7[\u0080-\u00ff]/,
  /\ufffd/,
];

const CP1252_UNICODE_TO_BYTE = new Map([
  [0x20ac, 0x80], [0x201a, 0x82], [0x0192, 0x83], [0x201e, 0x84], [0x2026, 0x85],
  [0x2020, 0x86], [0x2021, 0x87], [0x02c6, 0x88], [0x2030, 0x89], [0x0160, 0x8a],
  [0x2039, 0x8b], [0x0152, 0x8c], [0x017d, 0x8e], [0x2018, 0x91], [0x2019, 0x92],
  [0x201c, 0x93], [0x201d, 0x94], [0x2022, 0x95], [0x2013, 0x96], [0x2014, 0x97],
  [0x02dc, 0x98], [0x2122, 0x99], [0x0161, 0x9a], [0x203a, 0x9b], [0x0153, 0x9c],
  [0x017e, 0x9e], [0x0178, 0x9f],
]);

function isSuspicious(text) {
  return SUSPICIOUS_PATTERNS.some((pattern) => pattern.test(text));
}

function scoreMojibake(text) {
  let score = 0;
  for (const pattern of SUSPICIOUS_PATTERNS) {
    const matches = text.match(new RegExp(pattern.source, 'g'));
    score += matches ? matches.length : 0;
  }
  return score;
}

function decodeCp1252Utf8Garbled(text) {
  const bytes = [];

  for (const ch of text) {
    const codePoint = ch.codePointAt(0);

    if (codePoint <= 0xff) {
      bytes.push(codePoint);
      continue;
    }

    const mapped = CP1252_UNICODE_TO_BYTE.get(codePoint);
    if (mapped === undefined) {
      return null;
    }

    bytes.push(mapped);
  }

  return Buffer.from(bytes).toString('utf8');
}

function tryFixLine(line) {
  if (!isSuspicious(line)) {
    return line;
  }

  const decoded = decodeCp1252Utf8Garbled(line);
  if (!decoded) {
    return line;
  }

  const before = scoreMojibake(line);
  const after = scoreMojibake(decoded);

  if (after >= before) {
    return line;
  }

  return decoded;
}

function auditFile(filePath) {
  const abs = path.resolve(filePath);
  if (!fs.existsSync(abs)) {
    return { filePath, missing: true, hits: [], fixed: 0 };
  }

  const content = fs.readFileSync(abs, 'utf8');
  const lines = content.split(/\r?\n/);
  const hits = [];
  let fixed = 0;

  const nextLines = lines.map((line, index) => {
    const next = tryFixLine(line);
    if (next !== line) {
      fixed += 1;
    }

    if (isSuspicious(next)) {
      hits.push({
        line: index + 1,
        sample: next.trim().slice(0, 180),
      });
    }

    return next;
  });

  if (FIX_MODE && fixed > 0) {
    fs.writeFileSync(abs, `${nextLines.join('\n')}\n`, 'utf8');
  }

  return { filePath, missing: false, hits, fixed };
}

function main() {
  const report = TARGET_FILES.map(auditFile);
  let total = 0;
  let filesWithIssues = 0;
  let fixedTotal = 0;

  for (const item of report) {
    if (item.missing) {
      console.log(`[MISSING] ${item.filePath}`);
      continue;
    }

    fixedTotal += item.fixed;

    if (item.hits.length === 0) {
      console.log(`[OK] ${item.filePath}${item.fixed > 0 ? ` (fixed ${item.fixed} lines)` : ''}`);
      continue;
    }

    filesWithIssues += 1;
    total += item.hits.length;
    console.log(`[ISSUE] ${item.filePath} (${item.hits.length} lines, fixed ${item.fixed})`);
    item.hits.slice(0, 5).forEach((hit) => {
      console.log(`  - L${hit.line}: ${hit.sample}`);
    });
    if (item.hits.length > 5) {
      console.log(`  ... and ${item.hits.length - 5} more`);
    }
  }

  console.log(`\nSummary: ${filesWithIssues} files with issues, ${total} suspicious lines, ${fixedTotal} lines fixed.`);
  process.exit(filesWithIssues > 0 ? 2 : 0);
}

main();
