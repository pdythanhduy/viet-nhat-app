import type {
  BjtAuthoringQuestion,
  BjtReviewDecision,
  BjtReviewedAuthoringQuestion,
} from '../types/content';
import { applyBjtReviewDecisions, toApprovedBjtPracticeQuestions, validateBjtAuthoringQuestion } from './bjtAuthoring';

export interface BjtImportAudit {
  totalItems: number;
  approvedCount: number;
  importableCount: number;
  readyToImport: boolean;
  missingDecisionIds: string[];
  nonApprovedIds: string[];
  invalidApprovedItems: Array<{ id: string; errors: string[] }>;
  runtimeQuestionIds: string[];
}

function safeApplyReviewDecisions(
  items: BjtAuthoringQuestion[],
  decisions: BjtReviewDecision[]
): { reviewedItems: BjtReviewedAuthoringQuestion[]; missingDecisionIds: string[] } {
  const decisionIds = new Set(decisions.map((item) => item.id));
  const missingDecisionIds = items
    .filter((item) => !decisionIds.has(item.id))
    .map((item) => item.id);

  if (missingDecisionIds.length > 0) {
    return { reviewedItems: [], missingDecisionIds };
  }

  return {
    reviewedItems: applyBjtReviewDecisions(items, decisions),
    missingDecisionIds: [],
  };
}

export function auditBjtImportReadiness(
  items: BjtAuthoringQuestion[],
  decisions: BjtReviewDecision[]
): BjtImportAudit {
  const { reviewedItems, missingDecisionIds } = safeApplyReviewDecisions(items, decisions);

  if (missingDecisionIds.length > 0) {
    return {
      totalItems: items.length,
      approvedCount: 0,
      importableCount: 0,
      readyToImport: false,
      missingDecisionIds,
      nonApprovedIds: [],
      invalidApprovedItems: [],
      runtimeQuestionIds: [],
    };
  }

  const approvedItems = reviewedItems.filter((item) => item.reviewStatus === 'approved');
  const nonApprovedIds = reviewedItems
    .filter((item) => item.reviewStatus !== 'approved')
    .map((item) => item.id);
  const invalidApprovedItems = approvedItems
    .map((item) => ({
      id: item.id,
      errors: validateBjtAuthoringQuestion(item),
    }))
    .filter((item) => item.errors.length > 0);

  const importableItems = approvedItems.filter(
    (item) => !invalidApprovedItems.some((invalid) => invalid.id === item.id)
  );

  return {
    totalItems: items.length,
    approvedCount: approvedItems.length,
    importableCount: importableItems.length,
    readyToImport:
      items.length > 0 &&
      missingDecisionIds.length === 0 &&
      nonApprovedIds.length === 0 &&
      invalidApprovedItems.length === 0,
    missingDecisionIds,
    nonApprovedIds,
    invalidApprovedItems,
    runtimeQuestionIds: toApprovedBjtPracticeQuestions(importableItems).map((item) => item.id),
  };
}
