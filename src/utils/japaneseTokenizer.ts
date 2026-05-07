// Japanese tokenizer utility using kuromoji
// Install: npm install kuromoji

import { Token as StoryToken } from '../types/story';

// Simulated tokenizer (kuromoji will be installed later)
// This is a fallback implementation using basic rules

export interface TokenizedWord {
  word: string;
  reading: string;
  pos: string;
  basicForm?: string;
}

/**
 * Tokenize Japanese text and add furigana reading
 * Currently a simplified version - kuromoji.js will be integrated in Phase 1
 */
export function tokenizeJapaneseText(text: string): TokenizedWord[] {
  // Placeholder implementation
  // In production, use kuromoji:
  // const tokenizer = await kuromoji.builder(...).build();
  // return tokenizer.tokenize(text);

  // For now, return simplified tokens
  // This will be replaced with actual kuromoji implementation

  const tokens: TokenizedWord[] = [];

  // Simple pattern matching for hiragana/katakana/kanji
  let i = 0;
  while (i < text.length) {
    const char = text[i];

    // Match hiragana
    if (isHiragana(char)) {
      let word = char;
      while (i + 1 < text.length && isHiragana(text[i + 1])) {
        word += text[++i];
      }
      tokens.push({
        word,
        reading: word,
        pos: 'HIRAGANA',
      });
      i++;
    }
    // Match katakana
    else if (isKatakana(char)) {
      let word = char;
      while (i + 1 < text.length && isKatakana(text[i + 1])) {
        word += text[++i];
      }
      tokens.push({
        word,
        reading: word,
        pos: 'KATAKANA',
      });
      i++;
    }
    // Match kanji
    else if (isKanji(char)) {
      tokens.push({
        word: char,
        reading: '', // Would be filled by kuromoji
        pos: 'KANJI',
      });
      i++;
    }
    // Skip other characters (punctuation, spaces)
    else {
      i++;
    }
  }

  return tokens;
}

// Character classification helpers
function isHiragana(char: string): boolean {
  return /[぀-ゟ]/.test(char);
}

function isKatakana(char: string): boolean {
  return /[゠-ヿ]/.test(char);
}

function isKanji(char: string): boolean {
  return /[一-鿿]/.test(char);
}

/**
 * Add ruby text (furigana) to Japanese text
 * Input: [{word: "漢字", reading: "かんじ"}, ...]
 * Output: "<ruby>漢字<rt>かんじ</rt></ruby>"
 */
export function addFuriganaToTokens(tokens: TokenizedWord[]): string {
  return tokens
    .map((token) => {
      if (token.pos === 'KANJI' && token.reading) {
        return `<ruby>${token.word}<rt>${token.reading}</rt></ruby>`;
      }
      return token.word;
    })
    .join('');
}

/**
 * Extract tokens from sentence for StoryToken format
 */
export function createStoryTokens(
  sentenceId: string,
  text: string,
  wordMeanings: Record<string, string>
): StoryToken[] {
  const tokenized = tokenizeJapaneseText(text);

  return tokenized.map((token, index) => ({
    id: `${sentenceId}-token-${index}`,
    sentenceId,
    order: index,
    word: token.word,
    reading: token.reading,
    pos: token.pos,
    meaning: wordMeanings[token.word] || '',
  }));
}
