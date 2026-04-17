import type {
  BjtAuthoringQuestion,
  BjtPracticeQuestion,
  BjtReviewDecision,
  BjtReviewedAuthoringQuestion,
} from '../types/content';

const TOPIC_LABELS: Record<string, string> = {
  announcement: 'Internal Announcement',
  email: 'Business Email',
  logistics: 'Logistics Coordination',
  meeting: 'Meeting Coordination',
  memo: 'Internal Memo',
  phone: 'Phone Response',
  reporting: 'Progress Reporting',
  schedule: 'Schedule Update',
  sales: 'Sales Coordination',
};

const REQUIRED_STRING_FIELDS: Array<keyof BjtAuthoringQuestion> = [
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

function normalizeOption(value: string): string {
  return value.trim().replace(/\s+/g, ' ');
}

export function buildBjtRuntimeTitle(item: Pick<
  BjtAuthoringQuestion,
  'business_topic' | 'level'
>): string {
  const topicLabel = TOPIC_LABELS[item.business_topic] ?? 'Business Situation';
  return `${topicLabel} (${item.level})`;
}

export function validateBjtAuthoringQuestion(item: BjtAuthoringQuestion): string[] {
  const errors: string[] = [];

  for (const field of REQUIRED_STRING_FIELDS) {
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
    item.correctIndex >= item.options.length
  ) {
    errors.push('correctIndex must point to a valid option');
  }

  const normalizedOptions = item.options.map(normalizeOption);
  if (new Set(normalizedOptions).size !== normalizedOptions.length) {
    errors.push('options must not contain duplicates');
  }

  return errors;
}

export function toBjtPracticeQuestion(
  item: BjtReviewedAuthoringQuestion
): BjtPracticeQuestion {
  if (item.reviewStatus !== 'approved') {
    throw new Error(`Cannot transform item "${item.id}" with status "${item.reviewStatus}"`);
  }

  const errors = validateBjtAuthoringQuestion(item);
  if (errors.length > 0) {
    throw new Error(`Cannot transform invalid item "${item.id}": ${errors.join('; ')}`);
  }

  return {
    id: item.id,
    level: item.level,
    skill: item.skill,
    difficulty: item.difficulty,
    title: item.runtimeTitle?.trim() || buildBjtRuntimeTitle(item),
    situation: item.situation,
    prompt: item.prompt,
    options: item.options,
    correctIndex: item.correctIndex,
    explanation: item.explanation_vi,
  };
}

export function toApprovedBjtPracticeQuestions(
  items: BjtReviewedAuthoringQuestion[]
): BjtPracticeQuestion[] {
  return items
    .filter((item) => item.reviewStatus === 'approved')
    .map(toBjtPracticeQuestion);
}

export function applyBjtReviewDecisions(
  items: BjtAuthoringQuestion[],
  decisions: BjtReviewDecision[]
): BjtReviewedAuthoringQuestion[] {
  const decisionMap = new Map(decisions.map((decision) => [decision.id, decision]));

  return items.map((item) => {
    const decision = decisionMap.get(item.id);
    if (!decision) {
      throw new Error(`Missing review decision for item "${item.id}"`);
    }

    return {
      ...item,
      reviewStatus: decision.reviewStatus,
      reviewNotes: decision.reviewNotes,
      runtimeTitle: decision.runtimeTitle,
    };
  });
}
