const fs = require('fs');
const path = require('path');

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function normalizeOption(value) {
  return String(value).trim().replace(/\s+/g, ' ');
}

function validateAuthoringItem(item) {
  const errors = [];
  const requiredStringFields = [
    'id',
    'level',
    'skill',
    'difficulty',
    'business_topic',
    'situation',
    'prompt',
    'explanation_vi',
    'action_focus',
    'level_reason',
    'why_not_lower_level',
    'why_not_higher_level',
  ];

  for (const field of requiredStringFields) {
    if (typeof item[field] !== 'string' || item[field].trim().length === 0) {
      errors.push(`Missing required field: ${field}`);
    }
  }

  if (!Array.isArray(item.options) || item.options.length !== 4) {
    errors.push('options must contain exactly 4 entries');
  }

  if (!Array.isArray(item.vocabulary) || item.vocabulary.length === 0) {
    errors.push('vocabulary must contain at least 1 entry');
  }

  if (!Array.isArray(item.grammar_points) || item.grammar_points.length === 0) {
    errors.push('grammar_points must contain at least 1 entry');
  }

  if (
    typeof item.correctIndex !== 'number' ||
    item.correctIndex < 0 ||
    !Array.isArray(item.options) ||
    item.correctIndex >= item.options.length
  ) {
    errors.push('correctIndex must point to a valid option');
  }

  if (Array.isArray(item.options)) {
    const normalized = item.options.map(normalizeOption);
    if (new Set(normalized).size !== normalized.length) {
      errors.push('options must not contain duplicates');
    }
  }

  return errors;
}

function auditBatch(rawItems, decisions) {
  const decisionMap = new Map(decisions.map((decision) => [decision.id, decision]));
  const missingDecisionIds = rawItems
    .filter((item) => !decisionMap.has(item.id))
    .map((item) => item.id);

  if (missingDecisionIds.length > 0) {
    return {
      totalItems: rawItems.length,
      approvedCount: 0,
      importableCount: 0,
      readyToImport: false,
      missingDecisionIds,
      nonApprovedIds: [],
      invalidApprovedItems: [],
      runtimeQuestionIds: [],
    };
  }

  const reviewedItems = rawItems.map((item) => ({
    ...item,
    ...decisionMap.get(item.id),
  }));

  const approvedItems = reviewedItems.filter((item) => item.reviewStatus === 'approved');
  const nonApprovedIds = reviewedItems
    .filter((item) => item.reviewStatus !== 'approved')
    .map((item) => item.id);
  const invalidApprovedItems = approvedItems
    .map((item) => ({ id: item.id, errors: validateAuthoringItem(item) }))
    .filter((item) => item.errors.length > 0);
  const invalidSet = new Set(invalidApprovedItems.map((item) => item.id));
  const importableItems = approvedItems.filter((item) => !invalidSet.has(item.id));

  return {
    totalItems: rawItems.length,
    approvedCount: approvedItems.length,
    importableCount: importableItems.length,
    readyToImport:
      rawItems.length > 0 &&
      missingDecisionIds.length === 0 &&
      nonApprovedIds.length === 0 &&
      invalidApprovedItems.length === 0,
    missingDecisionIds,
    nonApprovedIds,
    invalidApprovedItems,
    runtimeQuestionIds: importableItems.map((item) => item.id),
  };
}

function printAudit(audit, rawPath, reviewedPath) {
  console.log('BJT Import Audit');
  console.log(`Raw file: ${rawPath}`);
  console.log(`Reviewed file: ${reviewedPath}`);
  console.log('');
  console.log(`Total items: ${audit.totalItems}`);
  console.log(`Approved items: ${audit.approvedCount}`);
  console.log(`Importable items: ${audit.importableCount}`);
  console.log(`Ready to import: ${audit.readyToImport ? 'YES' : 'NO'}`);

  if (audit.missingDecisionIds.length > 0) {
    console.log('');
    console.log('Missing review decisions:');
    for (const id of audit.missingDecisionIds) {
      console.log(`- ${id}`);
    }
  }

  if (audit.nonApprovedIds.length > 0) {
    console.log('');
    console.log('Non-approved items:');
    for (const id of audit.nonApprovedIds) {
      console.log(`- ${id}`);
    }
  }

  if (audit.invalidApprovedItems.length > 0) {
    console.log('');
    console.log('Invalid approved items:');
    for (const item of audit.invalidApprovedItems) {
      console.log(`- ${item.id}`);
      for (const error of item.errors) {
        console.log(`  * ${error}`);
      }
    }
  }

  console.log('');
  console.log('Runtime question ids:');
  if (audit.runtimeQuestionIds.length === 0) {
    console.log('- none');
  } else {
    for (const id of audit.runtimeQuestionIds) {
      console.log(`- ${id}`);
    }
  }
}

function main() {
  const rawArg = process.argv[2];
  const reviewedArg = process.argv[3];

  if (!rawArg || !reviewedArg) {
    console.error('Usage: node scripts/bjt-audit-batch.js <raw-json> <reviewed-json>');
    process.exit(1);
  }

  const cwd = process.cwd();
  const rawPath = path.resolve(cwd, rawArg);
  const reviewedPath = path.resolve(cwd, reviewedArg);

  if (!fs.existsSync(rawPath)) {
    console.error(`Raw file not found: ${rawPath}`);
    process.exit(1);
  }

  if (!fs.existsSync(reviewedPath)) {
    console.error(`Reviewed file not found: ${reviewedPath}`);
    process.exit(1);
  }

  const rawItems = readJson(rawPath);
  const reviewedItems = readJson(reviewedPath);
  const audit = auditBatch(rawItems, reviewedItems);
  printAudit(audit, rawArg, reviewedArg);

  process.exit(audit.readyToImport ? 0 : 2);
}

main();
