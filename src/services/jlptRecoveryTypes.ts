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
