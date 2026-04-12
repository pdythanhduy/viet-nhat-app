export type QuizDirection = 'jp-to-vn' | 'vn-to-jp' | 'mixed';

export type QuizPhrase = { jp: string; romaji: string; vn: string; category: string };

export interface QuizOption {
  primary: string;
  secondary?: string;
}

export interface QuizQuestion {
  phrase: QuizPhrase;
  direction: 'jp-to-vn' | 'vn-to-jp';
  promptPrimary: string;
  promptSecondary?: string;
  options: QuizOption[];
  correctIndex: number;
}

function shuffle<T>(items: T[]) {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

export function buildQuizQuestions(
  phrases: QuizPhrase[],
  pool: QuizPhrase[],
  direction: QuizDirection
): QuizQuestion[] {
  return shuffle(phrases).map((phrase, index) => {
    const questionDirection =
      direction === 'mixed' ? (index % 2 === 0 ? 'jp-to-vn' : 'vn-to-jp') : direction;

    if (questionDirection === 'vn-to-jp') {
      const wrong = shuffle(pool.filter((item) => item.jp !== phrase.jp))
        .slice(0, 3)
        .map((item) => ({ primary: item.jp, secondary: item.romaji }));
      const correct = { primary: phrase.jp, secondary: phrase.romaji };
      const options = shuffle([correct, ...wrong]);
      return {
        phrase,
        direction: questionDirection,
        promptPrimary: phrase.vn,
        promptSecondary: phrase.category,
        options,
        correctIndex: options.findIndex((item) => item.primary === phrase.jp),
      };
    }

    const wrong = shuffle(pool.filter((item) => item.vn !== phrase.vn))
      .slice(0, 3)
      .map((item) => ({ primary: item.vn }));
    const correct = { primary: phrase.vn };
    const options = shuffle([correct, ...wrong]);
    return {
      phrase,
      direction: questionDirection,
      promptPrimary: phrase.jp,
      promptSecondary: phrase.romaji,
      options,
      correctIndex: options.findIndex((item) => item.primary === phrase.vn),
    };
  });
}
