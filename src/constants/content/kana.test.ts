import { HIRAGANA_ROWS, KATAKANA_ROWS, type KanaRow } from './kana';

const EXPECTED_ROW_LABELS = ['Nguyên âm', 'K', 'S', 'T', 'N', 'H', 'M', 'Y', 'R', 'W/N'];

const EXPECTED_HIRAGANA = [
  'あ',
  'い',
  'う',
  'え',
  'お',
  'か',
  'き',
  'く',
  'け',
  'こ',
  'さ',
  'し',
  'す',
  'せ',
  'そ',
  'た',
  'ち',
  'つ',
  'て',
  'と',
  'な',
  'に',
  'ぬ',
  'ね',
  'の',
  'は',
  'ひ',
  'ふ',
  'へ',
  'ほ',
  'ま',
  'み',
  'む',
  'め',
  'も',
  'や',
  'ゆ',
  'よ',
  'ら',
  'り',
  'る',
  'れ',
  'ろ',
  'わ',
  'を',
  'ん',
];

const EXPECTED_KATAKANA = [
  'ア',
  'イ',
  'ウ',
  'エ',
  'オ',
  'カ',
  'キ',
  'ク',
  'ケ',
  'コ',
  'サ',
  'シ',
  'ス',
  'セ',
  'ソ',
  'タ',
  'チ',
  'ツ',
  'テ',
  'ト',
  'ナ',
  'ニ',
  'ヌ',
  'ネ',
  'ノ',
  'ハ',
  'ヒ',
  'フ',
  'ヘ',
  'ホ',
  'マ',
  'ミ',
  'ム',
  'メ',
  'モ',
  'ヤ',
  'ユ',
  'ヨ',
  'ラ',
  'リ',
  'ル',
  'レ',
  'ロ',
  'ワ',
  'ヲ',
  'ン',
];

const EXPECTED_ROMAJI = [
  'a',
  'i',
  'u',
  'e',
  'o',
  'ka',
  'ki',
  'ku',
  'ke',
  'ko',
  'sa',
  'shi',
  'su',
  'se',
  'so',
  'ta',
  'chi',
  'tsu',
  'te',
  'to',
  'na',
  'ni',
  'nu',
  'ne',
  'no',
  'ha',
  'hi',
  'fu',
  'he',
  'ho',
  'ma',
  'mi',
  'mu',
  'me',
  'mo',
  'ya',
  'yu',
  'yo',
  'ra',
  'ri',
  'ru',
  're',
  'ro',
  'wa',
  'o / wo',
  'n',
];

function flattenKana(rows: KanaRow[]) {
  return rows.flatMap((row) => row.entries.map((entry) => entry.kana));
}

function flattenRomaji(rows: KanaRow[]) {
  return rows.flatMap((row) => row.entries.map((entry) => entry.romaji));
}

describe('kana content quality', () => {
  it('keeps the expected row structure', () => {
    expect(HIRAGANA_ROWS.map((row) => row.label)).toEqual(EXPECTED_ROW_LABELS);
    expect(KATAKANA_ROWS.map((row) => row.label)).toEqual(EXPECTED_ROW_LABELS);
    expect(HIRAGANA_ROWS.map((row) => row.entries.length)).toEqual([5, 5, 5, 5, 5, 5, 5, 3, 5, 3]);
    expect(KATAKANA_ROWS.map((row) => row.entries.length)).toEqual([5, 5, 5, 5, 5, 5, 5, 3, 5, 3]);
  });

  it('keeps the base hiragana and katakana tables exact', () => {
    expect(flattenKana(HIRAGANA_ROWS)).toEqual(EXPECTED_HIRAGANA);
    expect(flattenKana(KATAKANA_ROWS)).toEqual(EXPECTED_KATAKANA);
  });

  it('keeps matching romaji across both scripts', () => {
    expect(flattenRomaji(HIRAGANA_ROWS)).toEqual(EXPECTED_ROMAJI);
    expect(flattenRomaji(KATAKANA_ROWS)).toEqual(EXPECTED_ROMAJI);
  });

  it('does not duplicate kana or romaji inside each script', () => {
    for (const rows of [HIRAGANA_ROWS, KATAKANA_ROWS]) {
      const kana = flattenKana(rows);
      const romaji = flattenRomaji(rows);

      expect(new Set(kana).size).toBe(kana.length);
      expect(new Set(romaji).size).toBe(romaji.length);
    }
  });
});
