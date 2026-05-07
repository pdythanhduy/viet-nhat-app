import { useEffect, useState } from 'react';

import { loadContent } from '../services/contentLoader';
import type { GrammarPattern, JapaneseWord, PhraseCategory } from '../types/content';

export function useJapaneseWords(): JapaneseWord[] | null {
  const [data, setData] = useState<JapaneseWord[] | null>(null);
  useEffect(() => {
    let cancelled = false;
    loadContent<JapaneseWord[]>('japanese.words')
      .then((value) => {
        if (!cancelled) setData(value);
      })
      .catch(() => {
        if (!cancelled) setData([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);
  return data;
}

export function useGrammarPatterns(): GrammarPattern[] | null {
  const [data, setData] = useState<GrammarPattern[] | null>(null);
  useEffect(() => {
    let cancelled = false;
    loadContent<GrammarPattern[]>('japanese.grammar')
      .then((value) => {
        if (!cancelled) setData(value);
      })
      .catch(() => {
        if (!cancelled) setData([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);
  return data;
}

export function useEssentialPhrases(): PhraseCategory[] | null {
  const [data, setData] = useState<PhraseCategory[] | null>(null);
  useEffect(() => {
    let cancelled = false;
    loadContent<PhraseCategory[]>('japanese.phrases.all')
      .then((value) => {
        if (!cancelled) setData(value);
      })
      .catch(() => {
        if (!cancelled) setData([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);
  return data;
}
