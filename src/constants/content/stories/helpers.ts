import { Story } from '../../../types/story';
import { JLPTLevel } from '../../../types/jlpt';

export type StoryTokenSeed = [word: string, reading: string, pos: string, meaning: string, jlptLevel?: Story['level']];

// Tokens-per-minute calibrated for JLPT learners reading with this app's
// affordances (tap-for-definition, audio replay, furigana). Higher levels
// read faster because vocabulary is more familiar.
const TOKENS_PER_MINUTE: Record<JLPTLevel, number> = {
  N5: 5,
  N4: 8,
  N3: 15,
  N2: 25,
  N1: 40,
};

function countStoryTokens(paragraphs: Story['paragraphs']): number {
  return paragraphs.reduce(
    (acc, p) => acc + (p.sentences ?? []).reduce((a, s) => a + (s.tokens?.length ?? 0), 0),
    0
  );
}

function computeStoryMetadata(
  paragraphs: Story['paragraphs'],
  level: JLPTLevel
): { wordCount: number; estimatedReadTime: number } {
  const wordCount = countStoryTokens(paragraphs);
  const wpm = TOKENS_PER_MINUTE[level];
  const estimatedReadTime = Math.max(1, Math.round(wordCount / wpm));
  return { wordCount, estimatedReadTime };
}

// Apply computed wordCount + estimatedReadTime to every story so the values
// reflect the actual tokenized content. The seed/literal values were
// placeholders that overstated length by 5–60×.
export function withComputedMetadata(stories: Story[]): Story[] {
  return stories.map((story) => ({
    ...story,
    ...computeStoryMetadata(story.paragraphs, story.level),
  }));
}

export interface StorySentenceSeed {
  text: string;
  translation: string;
  tokens: StoryTokenSeed[];
}

export interface StorySeed {
  idNumber: number;
  slug: string;
  title: string;
  description: string;
  wordCount: number;
  estimatedReadTime: number;
  sentences: StorySentenceSeed[];
}

export function createSeedStory(seed: StorySeed, level: Story['level'] = 'N3'): Story {
  const paddedId = String(seed.idNumber).padStart(3, '0');
  const storyId = `story-${paddedId}-${seed.slug}`;

  return {
    id: storyId,
    title: seed.title,
    titleJp: seed.title,
    description: seed.description,
    level,
    category: 'slice-of-life',
    author: 'Anonymous',
    wordCount: seed.wordCount,
    estimatedReadTime: seed.estimatedReadTime,
    paragraphs: seed.sentences.map((sentence, sentenceIndex) => {
      const order = sentenceIndex + 1;
      const paragraphId = `para-${paddedId}-${String(order).padStart(3, '0')}`;
      const sentenceId = `sent-${paddedId}-${String(order).padStart(3, '0')}`;

      return {
        id: paragraphId,
        storyId,
        order,
        text: sentence.text,
        translation: sentence.translation,
        sentences: [
          {
            id: sentenceId,
            paragraphId,
            order: 1,
            text: sentence.text,
            translation: sentence.translation,
            tokens: sentence.tokens.map(([word, reading, pos, meaning, tokenLevel], tokenIndex) => ({
              id: `t${tokenIndex + 1}`,
              sentenceId,
              order: tokenIndex + 1,
              word,
              reading,
              pos,
              meaning,
              jlptLevel: tokenLevel ?? level,
            })),
          },
        ],
      };
    }),
    createdAt: '2026-05-06',
    lastUpdated: '2026-05-06',
  };
}
