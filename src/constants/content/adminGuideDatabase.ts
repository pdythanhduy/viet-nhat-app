import type {
  AdminGuide,
  AdminGuideLegalScope,
  AdminGuideQuickAction,
  ChecklistItem,
  ContentMetadata,
  FAQItem,
  GuideStep,
  OfficialLink,
} from '../../types/content';

export const ADMIN_GUIDE_DATABASE_SCHEMA_VERSION = 1 as const;

export type AdminGuideDatabaseSchemaVersion = typeof ADMIN_GUIDE_DATABASE_SCHEMA_VERSION;

export interface AdminGuideDatabaseStep extends Omit<GuideStep, 'image'> {
  imageKey?: string;
}

export interface AdminGuideDatabaseRecord
  extends Omit<AdminGuide, 'heroImage' | 'steps'> {
  schemaVersion: AdminGuideDatabaseSchemaVersion;
  heroImageKey?: string;
  steps: AdminGuideDatabaseStep[];
}

export interface AdminGuideDatabaseSnapshot {
  schemaVersion: AdminGuideDatabaseSchemaVersion;
  contentVersion: string;
  recordCount: number;
  metadata: ContentMetadata;
  guides: AdminGuideDatabaseRecord[];
}

export interface AdminGuideDatabaseRow {
  id: string;
  schema_version: AdminGuideDatabaseSchemaVersion;
  content_version: string;
  category: AdminGuide['category'];
  priority: NonNullable<AdminGuide['priority']> | null;
  last_verified: string;
  title: string;
  title_jp: string;
  icon: AdminGuide['icon'];
  color: string;
  description: string;
  search_keywords: string[];
  legal_scope: AdminGuideLegalScope | null;
  quick_action: AdminGuideQuickAction | null;
  hero_image_key: string | null;
  hero_image_caption: string | null;
  who_is_this_for: string[];
  when_to_do: string[];
  where_to_do: string[];
  estimated_time: string | null;
  fees: string[];
  documents_checklist: ChecklistItem[];
  common_mistakes: string[];
  faq: FAQItem[];
  official_links: OfficialLink[];
  steps: AdminGuideDatabaseStep[];
}

export interface AdminGuideDatabaseValidationIssue {
  path: string;
  message: string;
}

const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const HEX_COLOR_PATTERN = /^#[0-9A-Fa-f]{6}$/;
const HTTPS_URL_PATTERN = /^https:\/\/[^\s]+$/;

function cloneOfficialLinks(links: readonly OfficialLink[]): OfficialLink[] {
  return links.map((link) => ({ label: link.label, url: link.url }));
}

function cloneChecklistItems(items: readonly ChecklistItem[] | undefined) {
  return items?.map((item) => ({
    label: item.label,
    required: item.required,
    ...(item.note ? { note: item.note } : {}),
  }));
}

function cloneFaqItems(items: readonly FAQItem[] | undefined) {
  return items?.map((item) => ({ question: item.question, answer: item.answer }));
}

function cloneStringArray(items: readonly string[] | undefined) {
  return items ? [...items] : undefined;
}

function cloneLegalScope(scope: AdminGuideLegalScope | undefined): AdminGuideLegalScope | undefined {
  if (!scope) return undefined;

  return {
    ...(scope.appliesFrom ? { appliesFrom: scope.appliesFrom } : {}),
    ...(scope.appliesUntil ? { appliesUntil: scope.appliesUntil } : {}),
    jurisdiction: scope.jurisdiction,
    jurisdictionNote: scope.jurisdictionNote,
    sourceVerifiedAt: scope.sourceVerifiedAt,
    nextReviewAt: scope.nextReviewAt,
    riskLevel: scope.riskLevel,
    ...(scope.whenToAskExpert?.length ? { whenToAskExpert: [...scope.whenToAskExpert] } : {}),
  };
}

function cloneQuickAction(action: AdminGuideQuickAction | undefined): AdminGuideQuickAction | undefined {
  if (!action) return undefined;

  return {
    deadline: action.deadline,
    office: action.office,
    doNow: [...action.doNow],
    bring: [...action.bring],
    ifLate: action.ifLate,
    officialSourceLabels: [...action.officialSourceLabels],
  };
}

function createHeroImageKey(guideId: string) {
  return `admin-guides/${guideId}/hero`;
}

function createStepImageKey(guideId: string, stepNumber: number) {
  return `admin-guides/${guideId}/steps/${stepNumber}`;
}

function toDatabaseStep(guideId: string, step: GuideStep): AdminGuideDatabaseStep {
  const databaseStep: AdminGuideDatabaseStep = {
    step: step.step,
    title: step.title,
    description: step.description,
    documents: [...step.documents],
  };

  if (step.tip) databaseStep.tip = step.tip;
  if (step.image) databaseStep.imageKey = createStepImageKey(guideId, step.step);
  if (step.imageCaption) databaseStep.imageCaption = step.imageCaption;

  return databaseStep;
}

function cloneDatabaseSteps(steps: readonly AdminGuideDatabaseStep[]) {
  return steps.map((step) => {
    const clonedStep: AdminGuideDatabaseStep = {
      step: step.step,
      title: step.title,
      description: step.description,
      documents: [...step.documents],
    };

    if (step.tip) clonedStep.tip = step.tip;
    if (step.imageKey) clonedStep.imageKey = step.imageKey;
    if (step.imageCaption) clonedStep.imageCaption = step.imageCaption;

    return clonedStep;
  });
}

export function toAdminGuideDatabaseRecord(guide: AdminGuide): AdminGuideDatabaseRecord {
  const record: AdminGuideDatabaseRecord = {
    schemaVersion: ADMIN_GUIDE_DATABASE_SCHEMA_VERSION,
    id: guide.id,
    category: guide.category,
    lastVerified: guide.lastVerified,
    title: guide.title,
    titleJp: guide.titleJp,
    icon: guide.icon,
    color: guide.color,
    description: guide.description,
    officialLinks: cloneOfficialLinks(guide.officialLinks),
    steps: guide.steps.map((step) => toDatabaseStep(guide.id, step)),
  };

  if (guide.priority) record.priority = guide.priority;
  if (guide.searchKeywords?.length) record.searchKeywords = [...guide.searchKeywords];

  const legalScope = cloneLegalScope(guide.legalScope);
  if (legalScope) record.legalScope = legalScope;

  const quickAction = cloneQuickAction(guide.quickAction);
  if (quickAction) record.quickAction = quickAction;

  if (guide.heroImage) record.heroImageKey = createHeroImageKey(guide.id);
  if (guide.heroImageCaption) record.heroImageCaption = guide.heroImageCaption;
  if (guide.whoIsThisFor?.length) record.whoIsThisFor = [...guide.whoIsThisFor];
  if (guide.whenToDo?.length) record.whenToDo = [...guide.whenToDo];
  if (guide.whereToDo?.length) record.whereToDo = [...guide.whereToDo];
  if (guide.estimatedTime) record.estimatedTime = guide.estimatedTime;
  if (guide.fees?.length) record.fees = [...guide.fees];

  const documentsChecklist = cloneChecklistItems(guide.documentsChecklist);
  if (documentsChecklist?.length) record.documentsChecklist = documentsChecklist;

  const commonMistakes = cloneStringArray(guide.commonMistakes);
  if (commonMistakes?.length) record.commonMistakes = commonMistakes;

  const faq = cloneFaqItems(guide.faq);
  if (faq?.length) record.faq = faq;

  return record;
}

export function toAdminGuideDatabaseRow(
  record: AdminGuideDatabaseRecord,
  contentVersion: string
): AdminGuideDatabaseRow {
  return {
    id: record.id,
    schema_version: record.schemaVersion,
    content_version: contentVersion,
    category: record.category,
    priority: record.priority ?? null,
    last_verified: record.lastVerified,
    title: record.title,
    title_jp: record.titleJp,
    icon: record.icon,
    color: record.color,
    description: record.description,
    search_keywords: record.searchKeywords ? [...record.searchKeywords] : [],
    legal_scope: cloneLegalScope(record.legalScope) ?? null,
    quick_action: cloneQuickAction(record.quickAction) ?? null,
    hero_image_key: record.heroImageKey ?? null,
    hero_image_caption: record.heroImageCaption ?? null,
    who_is_this_for: record.whoIsThisFor ? [...record.whoIsThisFor] : [],
    when_to_do: record.whenToDo ? [...record.whenToDo] : [],
    where_to_do: record.whereToDo ? [...record.whereToDo] : [],
    estimated_time: record.estimatedTime ?? null,
    fees: record.fees ? [...record.fees] : [],
    documents_checklist: cloneChecklistItems(record.documentsChecklist) ?? [],
    common_mistakes: record.commonMistakes ? [...record.commonMistakes] : [],
    faq: cloneFaqItems(record.faq) ?? [],
    official_links: cloneOfficialLinks(record.officialLinks),
    steps: cloneDatabaseSteps(record.steps),
  };
}

export function buildAdminGuideDatabaseSnapshot(
  metadata: ContentMetadata,
  guides: readonly AdminGuide[]
): AdminGuideDatabaseSnapshot {
  const records = guides.map(toAdminGuideDatabaseRecord);

  return {
    schemaVersion: ADMIN_GUIDE_DATABASE_SCHEMA_VERSION,
    contentVersion: metadata.lastUpdated,
    recordCount: records.length,
    metadata: {
      lastUpdated: metadata.lastUpdated,
      sources: cloneOfficialLinks(metadata.sources),
    },
    guides: records,
  };
}

export function buildAdminGuideDatabaseRows(snapshot: AdminGuideDatabaseSnapshot) {
  return snapshot.guides.map((record) => toAdminGuideDatabaseRow(record, snapshot.contentVersion));
}

function addIssue(
  issues: AdminGuideDatabaseValidationIssue[],
  path: string,
  message: string
) {
  issues.push({ path, message });
}

function validateOfficialLinks(
  issues: AdminGuideDatabaseValidationIssue[],
  path: string,
  links: readonly OfficialLink[]
) {
  if (links.length === 0) {
    addIssue(issues, path, 'must contain at least one official link');
    return;
  }

  links.forEach((link, index) => {
    if (!link.label.trim()) {
      addIssue(issues, `${path}[${index}].label`, 'must not be empty');
    }

    if (!HTTPS_URL_PATTERN.test(link.url)) {
      addIssue(issues, `${path}[${index}].url`, 'must be an https URL');
    }
  });
}

export function validateAdminGuideDatabaseSnapshot(
  snapshot: AdminGuideDatabaseSnapshot
): AdminGuideDatabaseValidationIssue[] {
  const issues: AdminGuideDatabaseValidationIssue[] = [];

  if (snapshot.schemaVersion !== ADMIN_GUIDE_DATABASE_SCHEMA_VERSION) {
    addIssue(issues, 'schemaVersion', 'does not match the supported admin guide database schema');
  }

  if (!ISO_DATE_PATTERN.test(snapshot.contentVersion)) {
    addIssue(issues, 'contentVersion', 'must be an ISO date');
  }

  if (!ISO_DATE_PATTERN.test(snapshot.metadata.lastUpdated)) {
    addIssue(issues, 'metadata.lastUpdated', 'must be an ISO date');
  }

  validateOfficialLinks(issues, 'metadata.sources', snapshot.metadata.sources);

  if (snapshot.recordCount !== snapshot.guides.length) {
    addIssue(issues, 'recordCount', 'must match guides.length');
  }

  const seenIds = new Set<string>();

  snapshot.guides.forEach((guide, guideIndex) => {
    const guidePath = `guides[${guideIndex}]`;

    if (seenIds.has(guide.id)) {
      addIssue(issues, `${guidePath}.id`, `duplicate guide id: ${guide.id}`);
    }
    seenIds.add(guide.id);

    if (guide.schemaVersion !== ADMIN_GUIDE_DATABASE_SCHEMA_VERSION) {
      addIssue(issues, `${guidePath}.schemaVersion`, 'does not match the supported record schema');
    }

    if (!guide.id.trim()) addIssue(issues, `${guidePath}.id`, 'must not be empty');
    if (!guide.title.trim()) addIssue(issues, `${guidePath}.title`, 'must not be empty');
    if (!guide.titleJp.trim()) addIssue(issues, `${guidePath}.titleJp`, 'must not be empty');
    if (!guide.description.trim()) addIssue(issues, `${guidePath}.description`, 'must not be empty');
    if (!ISO_DATE_PATTERN.test(guide.lastVerified)) {
      addIssue(issues, `${guidePath}.lastVerified`, 'must be an ISO date');
    }
    if (!HEX_COLOR_PATTERN.test(guide.color)) {
      addIssue(issues, `${guidePath}.color`, 'must be a hex color');
    }
    if (guide.heroImageKey && !guide.heroImageKey.startsWith(`admin-guides/${guide.id}/`)) {
      addIssue(issues, `${guidePath}.heroImageKey`, 'must be scoped to the guide id');
    }

    if (guide.legalScope) {
      if (guide.legalScope.appliesFrom && !ISO_DATE_PATTERN.test(guide.legalScope.appliesFrom)) {
        addIssue(issues, `${guidePath}.legalScope.appliesFrom`, 'must be an ISO date');
      }
      if (guide.legalScope.appliesUntil && !ISO_DATE_PATTERN.test(guide.legalScope.appliesUntil)) {
        addIssue(issues, `${guidePath}.legalScope.appliesUntil`, 'must be an ISO date');
      }
      if (!guide.legalScope.jurisdictionNote.trim()) {
        addIssue(issues, `${guidePath}.legalScope.jurisdictionNote`, 'must not be empty');
      }
      if (!ISO_DATE_PATTERN.test(guide.legalScope.sourceVerifiedAt)) {
        addIssue(issues, `${guidePath}.legalScope.sourceVerifiedAt`, 'must be an ISO date');
      }
      if (!ISO_DATE_PATTERN.test(guide.legalScope.nextReviewAt)) {
        addIssue(issues, `${guidePath}.legalScope.nextReviewAt`, 'must be an ISO date');
      }
      if (!['low', 'medium', 'high'].includes(guide.legalScope.riskLevel)) {
        addIssue(issues, `${guidePath}.legalScope.riskLevel`, 'must be low, medium, or high');
      }
    }

    if (guide.quickAction) {
      if (!guide.quickAction.deadline.trim()) {
        addIssue(issues, `${guidePath}.quickAction.deadline`, 'must not be empty');
      }
      if (!guide.quickAction.office.trim()) {
        addIssue(issues, `${guidePath}.quickAction.office`, 'must not be empty');
      }
      if (guide.quickAction.doNow.length === 0) {
        addIssue(issues, `${guidePath}.quickAction.doNow`, 'must contain at least one item');
      }
      if (guide.quickAction.bring.length === 0) {
        addIssue(issues, `${guidePath}.quickAction.bring`, 'must contain at least one item');
      }
      if (!guide.quickAction.ifLate.trim()) {
        addIssue(issues, `${guidePath}.quickAction.ifLate`, 'must not be empty');
      }
      if (guide.quickAction.officialSourceLabels.length === 0) {
        addIssue(issues, `${guidePath}.quickAction.officialSourceLabels`, 'must contain at least one item');
      }
    }

    validateOfficialLinks(issues, `${guidePath}.officialLinks`, guide.officialLinks);

    if (guide.steps.length < 2) {
      addIssue(issues, `${guidePath}.steps`, 'must contain at least two steps');
    }

    guide.steps.forEach((step, stepIndex) => {
      const stepPath = `${guidePath}.steps[${stepIndex}]`;
      const expectedStepNumber = stepIndex + 1;

      if (step.step !== expectedStepNumber) {
        addIssue(issues, `${stepPath}.step`, `must be ${expectedStepNumber}`);
      }
      if (!step.title.trim()) addIssue(issues, `${stepPath}.title`, 'must not be empty');
      if (!step.description.trim()) {
        addIssue(issues, `${stepPath}.description`, 'must not be empty');
      }
      if (!Array.isArray(step.documents)) {
        addIssue(issues, `${stepPath}.documents`, 'must be an array');
      }
      if (step.imageKey && step.imageKey !== createStepImageKey(guide.id, step.step)) {
        addIssue(issues, `${stepPath}.imageKey`, 'must use the stable guide step image key');
      }
    });
  });

  return issues;
}

export function assertAdminGuideDatabaseSnapshotIsValid(snapshot: AdminGuideDatabaseSnapshot) {
  const issues = validateAdminGuideDatabaseSnapshot(snapshot);

  if (issues.length > 0) {
    const detail = issues.map((issue) => `${issue.path}: ${issue.message}`).join('\n');
    throw new Error(`Invalid admin guide database snapshot:\n${detail}`);
  }
}
