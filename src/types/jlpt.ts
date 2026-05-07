export type JLPTLevel = 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
export type JLPTPartOfSpeech = 'noun' | 'verb' | 'adj-i' | 'adj-na' | 'other';

export interface JLPTWord {
  id: string;
  kanji: string;
  hiragana: string;
  vietnamese: string;
  level: JLPTLevel;
  partOfSpeech: JLPTPartOfSpeech;
  example?: string;
  exampleVn?: string;
  hanViet?: string;
}
