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
