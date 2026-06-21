// N2 Recovery — rich per-Day content (Vocabulary + Quiz), matching the
// owner's Day-1 reference layout: each vocab card carries reading, accent,
// level/PoS/frequency, meaning, nuance, syn/ant, collocations, usage band,
// a Vietnamese-learner pitfall, a native note, and tagged examples.

export type ExTag = 'B' | 'D' | 'N'; // Business / Daily / News

export interface N2VocabCard {
  id: string;
  jp: string; // word with reading, e.g. 久しぶり（ひさしぶり）
  acc: string; // pitch accent, e.g. [5]
  meta: string; // "N3→N2 ｜ 名・副 ｜ ★★★"
  mean: string; // Vietnamese meaning
  nu: string; // nuance (Vietnamese)
  syn: string; // synonyms
  ant: string; // antonyms
  col: string; // collocations
  use: string; // "Daily◎ Business○ News△"
  mis: string; // ⚠ common Vietnamese-learner mistake
  note: string; // native note
  ex: [ExTag, string][]; // tagged example sentences
}

export interface N2QuizItem {
  q: string;
  o: string[]; // options
  a: number; // index of the correct option
}

export interface N2ReviewItem {
  term: string; // word / pattern being reviewed
  note: string; // the key reminder (Vietnamese)
}

export interface N2DayContent {
  day: number;
  review?: N2ReviewItem[]; // SRS recap of earlier days (optional)
  vocab: N2VocabCard[];
  quiz: N2QuizItem[];
}
