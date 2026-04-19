const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const sourcePath = path.join(repoRoot, 'docs', 'bjt', 'document', 'BJT_ULTIMATE_BOOK_2026.json');
const outputDir = path.join(repoRoot, 'docs', 'bjt', 'document', 'partitioned');

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, ''));
}

function writeJson(fileName, value) {
  fs.writeFileSync(path.join(outputDir, fileName), JSON.stringify(value, null, 2) + '\n', 'utf8');
}

function main() {
  const book = readJson(sourcePath);

  const keigoTotal =
    (book.keigo?.sonkeigo?.length ?? 0) +
    (book.keigo?.kenjougo?.length ?? 0) +
    (book.keigo?.teineigo?.length ?? 0);

  const derivedMeta = {
    ...book.meta,
    total_vocab: book.vocabulary?.words?.length ?? 0,
    total_keigo: keigoTotal,
    total_scenarios: book.scenarios?.length ?? 0,
    total_mock: book.mock_test?.length ?? 0,
    total_emails: book.email_templates?.length ?? 0,
    total_manners: book.business_manners?.length ?? 0,
    total_kanji: book.kanji?.items?.length ?? 0,
    total_grammar: book.grammar?.items?.length ?? 0,
    total_abbreviations: book.abbreviations?.items?.length ?? 0,
    total_reading_passages: book.reading_passages?.length ?? 0,
    total_flashcard_sets: book.flashcard_sets?.length ?? 0,
  };

  writeJson('meta.json', derivedMeta);
  writeJson('vocabulary.json', book.vocabulary);
  writeJson('keigo.json', book.keigo);
  writeJson('scenarios.json', book.scenarios);
  writeJson('mock_test.json', book.mock_test);
  writeJson('email_templates.json', book.email_templates);
  writeJson('business_manners.json', book.business_manners);
  writeJson('kanji.json', book.kanji);
  writeJson('grammar.json', book.grammar);
  writeJson('cv_templates.json', book.cv_templates);
  writeJson('abbreviations.json', book.abbreviations);
  writeJson('reading_passages.json', book.reading_passages ?? []);
  writeJson('flashcard_sets.json', book.flashcard_sets ?? []);
  writeJson('study_plan.json', book.study_plan ?? { title: '', weeks: [] });

  writeJson('manifest.json', {
    canonical_source: 'BJT_ULTIMATE_BOOK_2026.json',
    generated_at: new Date().toISOString(),
    version: derivedMeta.version,
    updated: derivedMeta.updated,
    files: [
      { file: 'partitioned/meta.json', top_level_key: 'meta', item_count: null },
      { file: 'partitioned/vocabulary.json', top_level_key: 'vocabulary', item_count: derivedMeta.total_vocab },
      { file: 'partitioned/keigo.json', top_level_key: 'keigo', item_count: derivedMeta.total_keigo },
      { file: 'partitioned/scenarios.json', top_level_key: 'scenarios', item_count: derivedMeta.total_scenarios },
      { file: 'partitioned/mock_test.json', top_level_key: 'mock_test', item_count: derivedMeta.total_mock },
      { file: 'partitioned/email_templates.json', top_level_key: 'email_templates', item_count: derivedMeta.total_emails },
      { file: 'partitioned/business_manners.json', top_level_key: 'business_manners', item_count: derivedMeta.total_manners },
      { file: 'partitioned/kanji.json', top_level_key: 'kanji', item_count: derivedMeta.total_kanji },
      { file: 'partitioned/grammar.json', top_level_key: 'grammar', item_count: derivedMeta.total_grammar },
      { file: 'partitioned/cv_templates.json', top_level_key: 'cv_templates', item_count: null },
      { file: 'partitioned/abbreviations.json', top_level_key: 'abbreviations', item_count: derivedMeta.total_abbreviations },
      { file: 'partitioned/reading_passages.json', top_level_key: 'reading_passages', item_count: derivedMeta.total_reading_passages },
      { file: 'partitioned/flashcard_sets.json', top_level_key: 'flashcard_sets', item_count: derivedMeta.total_flashcard_sets },
      { file: 'partitioned/study_plan.json', top_level_key: 'study_plan', item_count: book.study_plan?.weeks?.length ?? 0 },
    ],
    legacy_files: [
      'legacy/bjt_vocab_697.json',
      'legacy/bjt_878_vocab.json',
      'legacy/bjt_960_vocab.csv',
      'legacy/bjt_book_complete_1000.json',
      'legacy/bjt_book_master_2026.json',
    ],
  });

  console.log('Partitioned BJT_ULTIMATE_BOOK_2026.json into docs/bjt/document/partitioned');
}

main();
