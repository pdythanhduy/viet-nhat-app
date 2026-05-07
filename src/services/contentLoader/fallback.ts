type BundledLoader = () => unknown;

export const BUNDLED: Record<string, BundledLoader> = {
  'japanese.words': () => require('../../constants/content/japanese').JAPANESE_WORDS,
  'japanese.grammar': () => require('../../constants/content/japanese').GRAMMAR_PATTERNS,
  'japanese.phrases.all': () => require('../../constants/content/japanese').ESSENTIAL_PHRASES,
};
