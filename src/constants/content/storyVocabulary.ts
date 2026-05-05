// Story vocabulary database
// Maps Japanese words to definitions, furigana, and JLPT levels
// Source: JMDict + JLPT vocab + story-specific words

import { JLPTLevel } from '../../types/jlpt';

export interface StoryWord {
  kanji: string; // or hiragana if no kanji
  hiragana: string;
  meaning: string;
  jlptLevel?: JLPTLevel;
  examples?: string[]; // example sentences from stories
}

// Common N5 vocabulary for stories
export const STORY_VOCABULARY: Record<string, StoryWord> = {
  // N5 - Basic verbs
  '行く': {
    kanji: '行く',
    hiragana: 'いく',
    meaning: 'đi, chuỗi lên',
    jlptLevel: 'N5',
    examples: ['学校に行きます。', '朝7時に家を出て、駅に行きます。'],
  },
  '来る': {
    kanji: '来る',
    hiragana: 'くる',
    meaning: 'đến, tới',
    jlptLevel: 'N5',
    examples: ['明日の朝来てください。'],
  },
  '見る': {
    kanji: '見る',
    hiragana: 'みる',
    meaning: 'xem, nhìn',
    jlptLevel: 'N5',
    examples: ['映画を見ます。', 'テレビを見ています。'],
  },
  '聞く': {
    kanji: '聞く',
    hiragana: 'きく',
    meaning: 'nghe, hỏi',
    jlptLevel: 'N5',
    examples: ['先生に聞きます。', '音楽を聞きます。'],
  },
  '読む': {
    kanji: '読む',
    hiragana: 'よむ',
    meaning: 'đọc',
    jlptLevel: 'N5',
    examples: ['本を読みます。', '新聞を読んでいます。'],
  },
  '書く': {
    kanji: '書く',
    hiragana: 'かく',
    meaning: 'viết',
    jlptLevel: 'N5',
    examples: ['手紙を書きます。', '日記を書いています。'],
  },
  '食べる': {
    kanji: '食べる',
    hiragana: 'たべる',
    meaning: 'ăn',
    jlptLevel: 'N5',
    examples: ['昼ご飯を食べます。', 'おいしい食べ物を食べたいです。'],
  },
  '飲む': {
    kanji: '飲む',
    hiragana: 'のむ',
    meaning: 'uống',
    jlptLevel: 'N5',
    examples: ['水を飲みます。', 'コーヒーを飲んでいます。'],
  },
  '作る': {
    kanji: '作る',
    hiragana: 'つくる',
    meaning: 'làm, tạo',
    jlptLevel: 'N5',
    examples: ['弁当を作ります。', 'ケーキを作っています。'],
  },
  '買う': {
    kanji: '買う',
    hiragana: 'かう',
    meaning: 'mua',
    jlptLevel: 'N5',
    examples: ['本を買います。', '新しい洋服を買いたいです。'],
  },

  // N5 - Nouns
  '学校': {
    kanji: '学校',
    hiragana: 'がっこう',
    meaning: 'trường học',
    jlptLevel: 'N5',
    examples: ['私は毎日学校に行きます。'],
  },
  '先生': {
    kanji: '先生',
    hiragana: 'せんせい',
    meaning: 'giáo viên, thầy cô',
    jlptLevel: 'N5',
    examples: ['日本語の先生が好きです。'],
  },
  '友達': {
    kanji: '友達',
    hiragana: 'ともだち',
    meaning: 'bạn bè',
    jlptLevel: 'N5',
    examples: ['学校の友達と一緒に遊びます。'],
  },
  '家': {
    kanji: '家',
    hiragana: 'いえ',
    meaning: 'nhà',
    jlptLevel: 'N5',
    examples: ['私の家は東京にあります。', '家に帰ります。'],
  },
  '子ども': {
    kanji: '子ども',
    hiragana: 'こども',
    meaning: 'trẻ em',
    jlptLevel: 'N5',
    examples: ['子どもが公園で遊んでいます。'],
  },
  '母': {
    kanji: '母',
    hiragana: 'はは',
    meaning: 'mẹ',
    jlptLevel: 'N5',
    examples: ['母は毎日料理をします。'],
  },
  '父': {
    kanji: '父',
    hiragana: 'ちち',
    meaning: 'bố',
    jlptLevel: 'N5',
    examples: ['父は朝早く起きます。'],
  },
  '兄': {
    kanji: '兄',
    hiragana: 'あに',
    meaning: 'anh trai',
    jlptLevel: 'N5',
  },
  '妹': {
    kanji: '妹',
    hiragana: 'いもうと',
    meaning: 'em gái',
    jlptLevel: 'N5',
  },
  '天気': {
    kanji: '天気',
    hiragana: 'てんき',
    meaning: 'thời tiết',
    jlptLevel: 'N5',
  },
  '雨': {
    kanji: '雨',
    hiragana: 'あめ',
    meaning: 'mưa',
    jlptLevel: 'N5',
  },
  '朝': {
    kanji: '朝',
    hiragana: 'あさ',
    meaning: 'sáng',
    jlptLevel: 'N5',
  },
  '昼': {
    kanji: '昼',
    hiragana: 'ひる',
    meaning: 'trưa',
    jlptLevel: 'N5',
  },
  '夜': {
    kanji: '夜',
    hiragana: 'よる',
    meaning: 'đêm',
    jlptLevel: 'N5',
  },

  // N5 - Adjectives
  '新しい': {
    kanji: '新しい',
    hiragana: 'あたらしい',
    meaning: 'mới',
    jlptLevel: 'N5',
    examples: ['新しい本を買いました。'],
  },
  '古い': {
    kanji: '古い',
    hiragana: 'ふるい',
    meaning: 'cũ',
    jlptLevel: 'N5',
    examples: ['古い家ですが、住んでいます。'],
  },
  '大きい': {
    kanji: '大きい',
    hiragana: 'おおきい',
    meaning: 'lớn',
    jlptLevel: 'N5',
    examples: ['大きい公園があります。'],
  },
  '小さい': {
    kanji: '小さい',
    hiragana: 'ちいさい',
    meaning: 'nhỏ',
    jlptLevel: 'N5',
  },
  'いい': {
    kanji: 'いい',
    hiragana: 'いい',
    meaning: 'tốt, đẹp',
    jlptLevel: 'N5',
    examples: ['いい天気ですね。'],
  },
  '悪い': {
    kanji: '悪い',
    hiragana: 'わるい',
    meaning: 'xấu, tồi',
    jlptLevel: 'N5',
  },
};

/**
 * Get word definition by kanji or hiragana
 */
export function getWordDefinition(word: string): StoryWord | undefined {
  return STORY_VOCABULARY[word];
}

/**
 * Get all words for a specific JLPT level
 */
export function getWordsByLevel(level: JLPTLevel): StoryWord[] {
  return Object.values(STORY_VOCABULARY).filter((w) => w.jlptLevel === level);
}
