export type JlptLevel = 'N5' | 'N4' | 'N3' | 'N2' | 'N1';

export type RecoveryExampleTag = 'B' | 'D' | 'N';

export interface RecoveryVocabCard {
  id: string;
  jp: string;
  acc: string;
  meta: string;
  mean: string;
  nu: string;
  syn: string;
  ant: string;
  col: string;
  use: string;
  mis: string;
  note: string;
  ex: [RecoveryExampleTag, string][];
}

export interface RecoveryQuizItem {
  q: string;
  o: string[];
  a: number;
}

export interface RecoveryReviewItem {
  term: string;
  note: string;
}

export interface RecoveryDayContent {
  level?: JlptLevel;
  day: number;
  review?: RecoveryReviewItem[];
  vocab: RecoveryVocabCard[];
  quiz: RecoveryQuizItem[];
}

export interface RecoveryGrammarExample {
  jp: string;
  vn: string;
}

export interface RecoveryGrammarItem {
  pattern: string;
  meaning: string;
  usage: string;
  examples: RecoveryGrammarExample[];
}

export interface RecoveryLesson {
  level?: JlptLevel;
  day: number;
  grammar: RecoveryGrammarItem[];
}

// One day's pre-generated content (bundled for the free level, or served from
// Supabase for paid levels). `lesson` is the grammar lesson's `grammar` array.
export interface RecoveryPregeneratedDay {
  vocab: RecoveryVocabCard[];
  quiz: RecoveryQuizItem[];
  lesson?: RecoveryGrammarItem[];
}

export type RecoveryDayKind = 'normal' | 'review' | 'test';

export interface RecoveryCurriculumPhase {
  id: number;
  jp: string;
  vi: string;
  dayFrom: number;
  dayTo: number;
  focus?: string;
}

export interface RecoveryCurriculumDay {
  day: number;
  phase: number;
  theme: string;
  vocabTopic: string; // '—' for review/test days
  grammar: string[];
  kind: RecoveryDayKind;
}

export interface RecoveryCurriculum {
  level: JlptLevel;
  phases: readonly RecoveryCurriculumPhase[];
  days: readonly RecoveryCurriculumDay[];
}
