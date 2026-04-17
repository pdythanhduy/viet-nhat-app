const fs = require('fs');
const path = require('path');

function readJson(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, '');
  return JSON.parse(raw);
}

function renderSnippet(batch) {
  const optionalLines = [
    batch.reviewedFile ? `  reviewedFile: '${batch.reviewedFile}',` : '',
    batch.runtimeFile ? `  runtimeFile: '${batch.runtimeFile}',` : '',
    batch.reviewNoteFile ? `  reviewNoteFile: '${batch.reviewNoteFile}',` : '',
    batch.runtimePreviewFile ? `  runtimePreviewFile: '${batch.runtimePreviewFile}',` : '',
  ].filter(Boolean);

  const importedIds = batch.importedQuestionIds.map((id) => `    '${id}',`).join('\n');

  return [
    '{',
    `  id: '${batch.id}',`,
    `  level: '${batch.level}',`,
    `  label: '${batch.label}',`,
    `  rawFile: '${batch.rawFile}',`,
    ...optionalLines,
    '  importedQuestionIds: [',
    importedIds,
    '  ],',
    '}',
  ].join('\n');
}

function main() {
  const [id, level, label, rawFile, reviewedFile, runtimeFile, reviewNoteFile, runtimePreviewFile] =
    process.argv.slice(2);

  if (!id || !level || !label || !rawFile || !runtimeFile) {
    console.error(
      'Usage: node scripts/bjt-manifest-snippet.js <id> <level> <label> <rawFile> <reviewedFile> <runtimeFile> [reviewNoteFile] [runtimePreviewFile]'
    );
    process.exit(1);
  }

  const runtimePath = path.resolve(process.cwd(), runtimeFile);
  if (!fs.existsSync(runtimePath)) {
    console.error(`Runtime file not found: ${runtimePath}`);
    process.exit(1);
  }

  const runtimeQuestions = readJson(runtimePath);
  const batch = {
    id,
    level,
    label,
    rawFile,
    reviewedFile,
    runtimeFile,
    reviewNoteFile,
    runtimePreviewFile,
    importedQuestionIds: runtimeQuestions.map((item) => item.id),
  };

  console.log(renderSnippet(batch));
}

main();
