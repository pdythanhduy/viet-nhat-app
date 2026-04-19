const fs = require('fs');
const path = require('path');
const vm = require('vm');
const ts = require('typescript');

const repoRoot = path.resolve(__dirname, '..');
const bjtPath = path.join(repoRoot, 'src/constants/content/bjt.ts');
const outputDir = path.join(repoRoot, 'docs/bjt/document/partitioned');
const outputVocabulary = path.join(outputDir, 'legacy_runtime_vocabulary.json');
const outputQuestions = path.join(outputDir, 'legacy_runtime_practice_questions.json');
const MOJIBAKE_MARKER_PATTERN =
  /\u00C2[\u0080-\u00BF]|\u00C3[\u0080-\u00BF]|\u00E2[\u0080-\u00BF]{2}|\u00E3[\u0080-\u00BF]{2}|\u00E5[\u0080-\u00BF]{2}|\u00E6[\u0080-\u00BF]{2}|\u00E7[\u0080-\u00BF]{2}|\u00E8[\u0080-\u00BF]{2}|\u00E9[\u0080-\u00BF]{2}|\u00EF\u00BE[\u0080-\u00BF]?/;

function countMarkers(value) {
  return value.match(MOJIBAKE_MARKER_PATTERN)?.length ?? 0;
}

function normalizeString(value) {
  if (!MOJIBAKE_MARKER_PATTERN.test(value)) {
    return value;
  }

  let current = value;
  for (let pass = 0; pass < 4; pass += 1) {
    const decoded = Buffer.from(current, 'latin1').toString('utf8');
    if (decoded === current || decoded.includes('\uFFFD')) {
      break;
    }
    if (countMarkers(decoded) > countMarkers(current)) {
      break;
    }
    current = decoded;
    if (!MOJIBAKE_MARKER_PATTERN.test(current)) {
      break;
    }
  }

  return current;
}

function normalizeDeep(value) {
  if (typeof value === 'string') {
    return normalizeString(value);
  }
  if (Array.isArray(value)) {
    return value.map(normalizeDeep);
  }
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, nested]) => [key, normalizeDeep(nested)]));
  }
  return value;
}

const source = fs.readFileSync(bjtPath, 'utf8');
const transpiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2020,
    esModuleInterop: true,
    resolveJsonModule: true,
  },
  fileName: bjtPath,
}).outputText;

const moduleRef = { exports: {} };
const sandbox = {
  module: moduleRef,
  exports: moduleRef.exports,
  __dirname: path.dirname(bjtPath),
  __filename: bjtPath,
  console,
  require: (specifier) => {
    if (specifier.startsWith('.')) {
      return require(path.resolve(path.dirname(bjtPath), specifier));
    }

    return require(specifier);
  },
};

vm.runInNewContext(transpiled, sandbox, { filename: bjtPath });

const { BJT_VOCABULARY, BJT_PRACTICE_QUESTIONS } = moduleRef.exports;

if (!Array.isArray(BJT_VOCABULARY) || !Array.isArray(BJT_PRACTICE_QUESTIONS)) {
  throw new Error('Failed to load legacy BJT runtime exports');
}

const normalizedVocabulary = normalizeDeep(BJT_VOCABULARY);
const normalizedQuestions = normalizeDeep(BJT_PRACTICE_QUESTIONS);

fs.writeFileSync(outputVocabulary, JSON.stringify(normalizedVocabulary, null, 2) + '\n', 'utf8');
fs.writeFileSync(outputQuestions, JSON.stringify(normalizedQuestions, null, 2) + '\n', 'utf8');

console.log(`Wrote ${normalizedVocabulary.length} vocabulary items to ${path.relative(repoRoot, outputVocabulary)}`);
console.log(`Wrote ${normalizedQuestions.length} questions to ${path.relative(repoRoot, outputQuestions)}`);
