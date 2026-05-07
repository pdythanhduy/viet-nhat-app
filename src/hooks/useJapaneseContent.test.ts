import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useEssentialPhrases, useGrammarPatterns, useJapaneseWords } from './useJapaneseContent';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('expo-constants', () => ({
  expoConfig: { version: '1.3.0' },
}));

jest.mock('../services/contentLoader/fallback', () => ({
  BUNDLED: {
    'japanese.words': () => [{ word: 'テスト', reading: 'てすと', romaji: 'tesuto', meaning: 'Test', example: '', exampleRomaji: '', exampleMeaning: '' }],
    'japanese.grammar': () => [{ pattern: '〜です', meaning: 'is', example_jp: 'A', example_romaji: 'a', example_vn: 'a' }],
    'japanese.phrases.all': () => [{ category: 'Test category', phrases: [] }],
  },
}));

type TestRendererInstance = {
  unmount: () => void;
  update: (element: React.ReactElement) => void;
};
type TestRendererApi = {
  act: (callback: () => void | Promise<void>) => Promise<void>;
  create: (element: React.ReactElement) => TestRendererInstance;
};

const TestRenderer = require('react-test-renderer') as TestRendererApi;

(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

let latestWords: ReturnType<typeof useJapaneseWords> | undefined;
let latestGrammar: ReturnType<typeof useGrammarPatterns> | undefined;
let latestPhrases: ReturnType<typeof useEssentialPhrases> | undefined;

function WordsProbe() {
  latestWords = useJapaneseWords();
  return null;
}

function GrammarProbe() {
  latestGrammar = useGrammarPatterns();
  return null;
}

function PhrasesProbe() {
  latestPhrases = useEssentialPhrases();
  return null;
}

async function flushAsync() {
  await TestRenderer.act(async () => {
    await Promise.resolve();
    await Promise.resolve();
  });
}

describe('useJapaneseContent', () => {
  beforeEach(async () => {
    latestWords = undefined;
    latestGrammar = undefined;
    latestPhrases = undefined;
    await AsyncStorage.clear();
  });

  it('useJapaneseWords resolves to bundled words', async () => {
    let renderer: TestRendererInstance | undefined;
    await TestRenderer.act(async () => {
      renderer = TestRenderer.create(React.createElement(WordsProbe));
    });

    await flushAsync();

    expect(latestWords).toEqual([
      expect.objectContaining({ word: 'テスト', meaning: 'Test' }),
    ]);

    await TestRenderer.act(async () => {
      renderer?.unmount();
    });
  });

  it('useGrammarPatterns resolves to bundled patterns', async () => {
    let renderer: TestRendererInstance | undefined;
    await TestRenderer.act(async () => {
      renderer = TestRenderer.create(React.createElement(GrammarProbe));
    });

    await flushAsync();

    expect(latestGrammar).toEqual([
      expect.objectContaining({ pattern: '〜です', meaning: 'is' }),
    ]);

    await TestRenderer.act(async () => {
      renderer?.unmount();
    });
  });

  it('useEssentialPhrases resolves to the bundled categories list', async () => {
    let renderer: TestRendererInstance | undefined;
    await TestRenderer.act(async () => {
      renderer = TestRenderer.create(React.createElement(PhrasesProbe));
    });

    await flushAsync();

    expect(latestPhrases).toEqual([
      expect.objectContaining({ category: 'Test category' }),
    ]);

    await TestRenderer.act(async () => {
      renderer?.unmount();
    });
  });
});
