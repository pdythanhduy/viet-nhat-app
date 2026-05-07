import { JLPTLevel } from './jlpt';

// Story metadata
export type StoryCategory = 'slice-of-life' | 'web-novel' | 'fairy-tale' | 'graded-reader';

export interface Story {
  id: string;
  title: string;
  titleJp: string;
  description: string;
  level: JLPTLevel;
  category: StoryCategory;
  author?: string;
  wordCount: number;
  estimatedReadTime: number; // minutes
  imageUrl?: string;
  paragraphs: Paragraph[];
  createdAt: string;
  lastUpdated: string;
}

// Vietnamese display label for each category
export const STORY_CATEGORY_LABELS: Record<StoryCategory, string> = {
  'slice-of-life': 'Đời thường',
  'web-novel': 'Web novel',
  'fairy-tale': 'Cổ tích',
  'graded-reader': 'Bài tập đọc',
};

// Paragraph = main text unit
export interface Paragraph {
  id: string;
  storyId: string;
  order: number;
  text: string;
  translation: string; // Vietnamese translation
  sentences: Sentence[];
}

// Sentence = sub-unit for detailed analysis
export interface Sentence {
  id: string;
  paragraphId: string;
  order: number;
  text: string;
  translation: string;
  tokens: Token[];
}

// Token = word level (smallest unit)
export interface Token {
  id: string;
  sentenceId: string;
  order: number;
  word: string; // kanji/hiragana
  reading: string; // furigana (ひらがな)
  pos: string; // part of speech (noun, verb, adjective, etc.)
  meaning: string; // Vietnamese meaning
  jlptLevel?: JLPTLevel;
  examples?: string[]; // example sentences
}

// User progress tracking
export interface StoryProgress {
  storyId: string;
  userId: string;
  currentParagraphIndex: number;
  percentRead: number;
  isCompleted: boolean;
  lastReadAt: string;
}

// Bookmarks & favorites
export interface StoryBookmark {
  id: string;
  storyId: string;
  userId: string;
  createdAt: string;
}

export interface SentenceBookmark {
  id: string;
  sentenceId: string;
  storyId: string;
  userId: string;
  note?: string;
  createdAt: string;
}

export interface WordBookmark {
  id: string;
  word: string;
  reading: string;
  meaning: string;
  userId: string;
  createdAt: string;
  // Optional metadata captured at save-time. Older bookmarks (saved before
  // these fields existed) won't have them — UI must treat each as optional.
  jlptLevel?: JLPTLevel;
  pos?: string;
  sourceStoryId?: string;
  sourceStoryTitle?: string;
}
