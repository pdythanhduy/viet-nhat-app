import { HIRAGANA_ROWS, KATAKANA_ROWS } from '../constants/content/kana';

export type KanaQuizMode = 'hiragana' | 'katakana' | 'mixed';

export interface KanaQuizItem {
  kana: string;
  romaji: string;
  script: 'hiragana' | 'katakana';
}

export interface KanaQuizQuestion {
  item: KanaQuizItem;
  options: string[];
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

export function getKanaQuizPool(mode: KanaQuizMode): KanaQuizItem[] {
  const hiragana = HIRAGANA_ROWS.flatMap((row) =>
    row.entries.map((entry) => ({ ...entry, script: 'hiragana' as const }))
  );
  const katakana = KATAKANA_ROWS.flatMap((row) =>
    row.entries.map((entry) => ({ ...entry, script: 'katakana' as const }))
  );

  if (mode === 'hiragana') return hiragana;
  if (mode === 'katakana') return katakana;
  return [...hiragana, ...katakana];
}

export function buildKanaQuizQuestions(mode: KanaQuizMode) {
  const pool = getKanaQuizPool(mode);

  return shuffle(pool).map((item) => {
    const wrong = shuffle(pool.filter((entry) => entry.romaji !== item.romaji))
      .slice(0, 3)
      .map((entry) => entry.romaji);
    const options = shuffle([item.romaji, ...wrong]);

    return {
      item,
      options,
      correctIndex: options.indexOf(item.romaji),
    } as KanaQuizQuestion;
  });
}
