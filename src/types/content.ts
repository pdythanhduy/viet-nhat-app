import type { ImageSourcePropType } from 'react-native';

export type IoniconName = keyof typeof import('@expo/vector-icons').Ionicons.glyphMap;

export type AlertUrgency = 'high' | 'medium' | 'low' | 'info';
export type AlertActionScreen = 'Admin' | 'DailyLife' | 'Jobs' | 'Japanese' | 'BJT';

export interface EmergencyContact {
  id: string;
  name: string;
  nameJp: string;
  number: string;
  icon: IoniconName;
  color: string;
}

export interface AlertItem {
  id: string;
  title: string;
  description: string;
  urgency: AlertUrgency;
  daysLeft?: number;
  actionLabel: string;
  actionScreen: AlertActionScreen;
}

export interface OfficialLink {
  label: string;
  url: string;
}

export type OfficialFormLinkType = 'official-page' | 'pdf' | 'fillable-pdf' | 'example-pdf';
export type OfficialFormJurisdiction = 'national' | 'prefecture' | 'municipality';

export interface OfficialFormLink extends OfficialLink {
  type: OfficialFormLinkType;
  jurisdiction: OfficialFormJurisdiction;
  jurisdictionLabel?: string;
  verifiedAt: string;
  note?: string;
  sourceUrl?: string;
}

export interface ContentMetadata {
  lastUpdated: string;
  sources: OfficialLink[];
}

export interface GuideStep {
  step: number;
  title: string;
  description: string;
  documents: string[];
  tip?: string;
  image?: ImageSourcePropType;
  imageCaption?: string;
}

export interface ChecklistItem {
  label: string;
  required: boolean;
  note?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export type AdminGuideJurisdiction = 'national' | 'prefecture' | 'municipality' | 'mixed';
export type AdminGuideRiskLevel = 'low' | 'medium' | 'high';

export interface AdminGuideLegalScope {
  appliesFrom?: string;
  appliesUntil?: string;
  jurisdiction: AdminGuideJurisdiction;
  jurisdictionNote: string;
  sourceVerifiedAt: string;
  nextReviewAt: string;
  riskLevel: AdminGuideRiskLevel;
  whenToAskExpert?: string[];
}

export interface AdminGuideQuickAction {
  deadline: string;
  office: string;
  doNow: string[];
  bring: string[];
  ifLate: string;
  officialSourceLabels: string[];
}

export interface CounterPhrase {
  jp: string;
  romaji?: string;
  vn: string;
  note?: string;
}

export interface AdminGuideKeyTerm {
  term: string;
  reading?: string;
  meaningVi: string;
  noteVi?: string;
}

export interface AdminGuide {
  id: string;
  category: AdminGuideCategory;
  lastVerified: string;
  priority?: 'high' | 'normal';
  title: string;
  titleJp: string;
  icon: IoniconName;
  color: string;
  description: string;
  searchKeywords?: string[];
  legalScope?: AdminGuideLegalScope;
  quickAction?: AdminGuideQuickAction;
  heroImage?: ImageSourcePropType;
  heroImageCaption?: string;
  whoIsThisFor?: string[];
  whenToDo?: string[];
  whereToDo?: string[];
  estimatedTime?: string;
  fees?: string[];
  documentsChecklist?: ChecklistItem[];
  commonMistakes?: string[];
  faq?: FAQItem[];
  counterPhrases?: CounterPhrase[];
  keyTerms?: AdminGuideKeyTerm[];
  officialLinks: OfficialLink[];
  steps: GuideStep[];
}

export type AdminGuideCategory =
  | 'immigration'
  | 'visa'
  | 'daily-law'
  | 'traffic'
  | 'health'
  | 'money'
  | 'license';

export interface DailyLifeSection {
  title: string;
  content?: string;
  items?: string[];
  tip?: string;
  image?: ImageSourcePropType;
  imageCaption?: string;
}

export interface DailyLifeTopic {
  id: string;
  title: string;
  titleJp: string;
  icon: IoniconName;
  color: string;
  description: string;
  sections?: DailyLifeSection[];
}

export type JobType = 'part-time' | 'full-time';
export type JobCategory = 'restaurant' | 'it' | 'manufacturing' | 'service';
export type EligibleWorkerType =
  | 'student'
  | 'dependent'
  | 'work-visa'
  | 'ssw'
  | 'unrestricted'
  | 'unsure';

export interface JobListing {
  id: string;
  title: string;
  titleJp: string;
  company: string;
  location: string;
  salary: string;
  type: JobType;
  category: JobCategory;
  tags: string[];
  japaneseLevel: string;
  benefits: string[];
  description: string;
  contact: string;
}

export interface WorkerRight {
  title: string;
  description: string;
  icon: IoniconName;
}

export interface JapaneseWord {
  word: string;
  reading: string;
  romaji: string;
  meaning: string;
  example: string;
  exampleRomaji: string;
  exampleMeaning: string;
  culturalNote?: string; // Mẹo văn hóa / ngữ cảnh thực tế
}

export interface EssentialPhrase {
  jp: string;
  romaji: string;
  vn: string;
}

export interface DialogueLine {
  speaker: 'A' | 'B';
  speakerLabel: string; // 'Bạn', 'Nhân viên', 'Đồng nghiệp'...
  jp: string;
  romaji: string;
  vn: string;
}

export interface CategoryDialogue {
  situation: string; // "Tại 7-Eleven buổi sáng"
  lines: DialogueLine[];
}

export interface PhraseCategory {
  category: string;
  icon?: IoniconName;
  color?: string;
  phrases: EssentialPhrase[];
  dialogue?: CategoryDialogue;
}

export interface GrammarPattern {
  pattern: string;
  meaning: string;
  example_jp: string;
  example_romaji: string;
  example_vn: string;
  notes?: string;
}

export interface BjtLevelBand {
  level: string;
  scoreRange: string;
  summary: string;
  focus: string[];
}

export interface BjtQuestionType {
  id: string;
  title: string;
  skill: 'listening' | 'listening-reading' | 'reading';
  description: string;
  whatToTrain: string[];
}

export interface BjtStudyModule {
  id: string;
  title: string;
  icon: IoniconName;
  color: string;
  description: string;
  outcomes: string[];
  linkedCategoryName?: string;
}

export interface BjtStudyPlanDay {
  day: number;
  theme: string;
  goal: string;
  tasks: string[];
}

export interface BjtVocabularyItem {
  id: string;
  theme: string;
  jp: string;
  reading: string;
  romaji: string;
  vn: string;
  exampleJp: string;
  exampleRomaji: string;
  exampleVn: string;
  note?: string;
}

export interface BjtPracticeQuestion {
  id: string;
  level?: BjtAuthoringLevel;
  skill: 'listening' | 'listening-reading' | 'reading';
  difficulty: 'basic' | 'intermediate' | 'advanced';
  title: string;
  situation: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface BjtDocumentMeta {
  title: string;
  version: string;
  updated: string;
  totalVocabulary: number;
  totalKeigo: number;
  totalScenarios: number;
  totalMockSets: number;
  totalEmailTemplates: number;
  totalManners: number;
  examQuestions: number;
  examDuration: string;
  examFormat: string;
  examScoring: string;
  examParts: string[];
  visaNote2026: string;
}

export interface BjtKeigoEntry {
  id: string;
  plain: string;
  plainReading: string;
  plainMeaning: string;
  keigo: string;
  keigoReading: string;
  keigoMeaning: string;
  exampleJp: string;
  exampleVi: string;
  level: string;
  category: 'sonkeigo' | 'kenjougo' | 'teineigo';
}

export interface BjtScenarioLine {
  speaker: string;
  jp: string;
  vi: string;
}

export interface BjtScenarioItem {
  id: string;
  titleVi: string;
  titleJp: string;
  level: string;
  situation: string;
  dialogue: BjtScenarioLine[];
  tips: string;
}

export interface BjtDocumentOption {
  label: string;
  labelVi: string;
  value: string;
}

export interface BjtDocumentMockQuestion {
  id: string;
  part: string;
  type: 'reading' | 'listening' | 'listening-reading';
  level: string;
  promptJp: string;
  promptVi: string;
  questionJp: string;
  questionVi: string;
  options: BjtDocumentOption[];
  answer: string;
  explanation: string;
}

export interface BjtMockV2Option {
  label: string;
  text: string;
}

export interface BjtMockV2Question {
  id: string;
  part: 'I' | 'II' | 'III';
  partName: string;
  level: BjtAuthoringLevel;
  passageJp: string;
  questionJp: string;
  options: BjtMockV2Option[];
  answer: string;
  explanation: string;
}

export interface BjtMockV2Exam {
  examId: string;
  title: string;
  totalQuestions: number;
  timeLimitMinutes: number;
  parts: {
    I: number;
    II: number;
    III: number;
  };
  questions: BjtMockV2Question[];
}

export interface BjtMockV2Meta {
  title: string;
  version: string;
  totalExams: number;
  totalQuestions: number;
  uniqueQuestionBank: {
    notices: number;
    emails: number;
    keigo: number;
    listening: number;
    listeningReading: number;
    totalUnique: number;
  };
  note: string;
}

export interface BjtEmailTemplate {
  id: string;
  title: string;
  titleJp: string;
  level: string;
  templateJp: string;
  keyPhrases: string[];
}

export interface BjtBusinessManner {
  id: string;
  category: string;
  categoryVi: string;
  description: string;
  mistakes: string[];
}

export interface BjtKanjiItem {
  kanji: string;
  on: string;
  kun: string;
  vi: string;
  words: string[];
}

export interface BjtGrammarItem {
  id: string;
  pattern: string;
  reading: string;
  vi: string;
  level: string;
  ex_jp: string;
  ex_vi: string;
  usage: string;
}

export interface BjtCvField {
  field_jp: string;
  field_vi: string;
  note: string;
}

export interface BjtCvSection {
  section_jp: string;
  section_vi: string;
  note: string;
}

export interface BjtCvTemplateBlock {
  title: string;
  description: string;
  tips: string;
  fields?: BjtCvField[];
  sections?: BjtCvSection[];
}

export interface BjtAbbreviationItem {
  symbol: string;
  reading: string;
  vi: string;
  usage: string;
  example: string;
}

export interface BjtReadingPassageQuestion {
  q: string;
  a: string;
}

export interface BjtReadingPassage {
  id: string;
  title: string;
  lv: string;
  passage_jp: string;
  passage_vi: string;
  questions: BjtReadingPassageQuestion[];
}

export interface BjtFlashcardSet {
  set_id: string;
  name: string;
  level: string;
  card_count: number;
  description: string;
}

export interface BjtUltimateStudyWeek {
  week: number;
  focus: string;
  vocab?: string;
  keigo?: string;
  grammar?: string;
  scenario?: string;
  reading?: string;
  email?: string;
  manners?: string;
  mock?: string;
  tips?: string;
}

export interface BjtUltimateStudyPlan {
  title: string;
  weeks: BjtUltimateStudyWeek[];
}

export type BjtAuthoringLevel = 'J5' | 'J4' | 'J3' | 'J2' | 'J1' | 'J1+';

export type BjtReviewStatus = 'approved' | 'needs_revision' | 'rejected';

export interface BjtAuthoringQuestion {
  id: string;
  level: BjtAuthoringLevel;
  skill: BjtPracticeQuestion['skill'];
  difficulty: BjtPracticeQuestion['difficulty'];
  business_topic: string;
  situation: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation_vi: string;
  explanation_ja?: string;
  vocabulary: string[];
  grammar_points: string[];
  action_focus: string;
  level_reason: string;
  why_not_lower_level: string;
  why_not_higher_level: string;
}

export interface BjtReviewedAuthoringQuestion extends BjtAuthoringQuestion {
  reviewStatus: BjtReviewStatus;
  reviewNotes?: string[];
  runtimeTitle?: string;
}

export interface BjtReviewDecision {
  id: string;
  reviewStatus: BjtReviewStatus;
  reviewNotes?: string[];
  runtimeTitle?: string;
}

export type BjtPipelineStage = 'raw' | 'reviewed' | 'runtime-imported';

export interface BjtPipelineBatch {
  id: string;
  level: BjtAuthoringLevel;
  label: string;
  rawFile: string;
  reviewedFile?: string;
  runtimeFile?: string;
  reviewNoteFile?: string;
  runtimePreviewFile?: string;
  importedQuestionIds: string[];
}
