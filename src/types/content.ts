export type IoniconName = keyof typeof import('@expo/vector-icons').Ionicons.glyphMap;

export type AlertUrgency = 'high' | 'medium' | 'low' | 'info';

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
  actionScreen: string;
}

export interface OfficialLink {
  label: string;
  url: string;
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

export interface AdminGuide {
  id: string;
  category?: AdminGuideCategory;
  lastVerified?: string;
  priority?: 'high' | 'normal';
  title: string;
  titleJp: string;
  icon: IoniconName;
  color: string;
  description: string;
  whoIsThisFor?: string[];
  whenToDo?: string[];
  whereToDo?: string[];
  estimatedTime?: string;
  fees?: string[];
  documentsChecklist?: ChecklistItem[];
  commonMistakes?: string[];
  faq?: FAQItem[];
  officialLinks?: OfficialLink[];
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
}

export interface DailyLifeTopic {
  id: string;
  title: string;
  titleJp: string;
  icon: IoniconName;
  color: string;
  description: string;
  prefilledQuestion: string;
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
