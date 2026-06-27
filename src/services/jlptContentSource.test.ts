jest.mock('../constants/jlpt/n5Content', () => ({
  N5_PREGENERATED: {
    1: {
      vocab: [{ id: 'VOC0001', jp: '本' }],
      quiz: [{ q: '?', o: ['a', 'b'], a: 0 }],
      lesson: [{ pattern: '〜は〜です', meaning: '', usage: '', examples: [] }],
    },
    2: { vocab: [{ id: 'VOC0001', jp: '水' }], quiz: [] }, // no lesson
  },
}));

const mockMaybeSingle = jest.fn();
jest.mock('./supabaseClient', () => ({
  supabase: {
    from: () => ({
      select: () => ({
        eq: () => ({ eq: () => ({ maybeSingle: mockMaybeSingle }) }),
      }),
    }),
  },
  isSupabaseConfigured: () => true,
}));

import {
  clearPregeneratedMemo,
  hasBundledDay,
  hasBundledLesson,
  loadPregeneratedDay,
} from './jlptContentSource';

describe('jlptContentSource', () => {
  beforeEach(() => {
    clearPregeneratedMemo();
    mockMaybeSingle.mockReset();
  });

  describe('hasBundledDay / hasBundledLesson (sync, N5 only)', () => {
    it('reflects the bundle for N5', () => {
      expect(hasBundledDay('N5', 1)).toBe(true);
      expect(hasBundledDay('N5', 99)).toBe(false);
      expect(hasBundledLesson('N5', 1)).toBe(true);
      expect(hasBundledLesson('N5', 2)).toBe(false); // day 2 has no lesson
    });

    it('is always false for paid levels', () => {
      expect(hasBundledDay('N4', 1)).toBe(false);
      expect(hasBundledLesson('N2', 1)).toBe(false);
    });
  });

  describe('loadPregeneratedDay', () => {
    it('returns bundled N5 content without touching Supabase', async () => {
      const day = await loadPregeneratedDay('N5', 1);
      expect(day?.vocab[0].jp).toBe('本');
      expect(day?.lesson?.length).toBe(1);
      expect(mockMaybeSingle).not.toHaveBeenCalled();
    });

    it('fetches paid levels from Supabase', async () => {
      mockMaybeSingle.mockResolvedValue({
        data: { payload: { vocab: [{ id: 'VOC0001', jp: '会議' }], quiz: [] } },
        error: null,
      });
      const day = await loadPregeneratedDay('N4', 5);
      expect(day?.vocab[0].jp).toBe('会議');
      expect(mockMaybeSingle).toHaveBeenCalledTimes(1);
    });

    it('returns null when Supabase has no row', async () => {
      mockMaybeSingle.mockResolvedValue({ data: null, error: null });
      expect(await loadPregeneratedDay('N4', 6)).toBeNull();
    });

    it('returns null (no throw) when the query errors', async () => {
      mockMaybeSingle.mockRejectedValue(new Error('relation does not exist'));
      expect(await loadPregeneratedDay('N3', 1)).toBeNull();
    });

    it('memoizes successful loads (Supabase queried once)', async () => {
      mockMaybeSingle.mockResolvedValue({
        data: { payload: { vocab: [{ id: 'VOC0001', jp: '電話' }], quiz: [] } },
        error: null,
      });
      await loadPregeneratedDay('N1', 3);
      await loadPregeneratedDay('N1', 3);
      expect(mockMaybeSingle).toHaveBeenCalledTimes(1);
    });

    it('does not memoize nulls (can retry after a transient failure)', async () => {
      mockMaybeSingle.mockResolvedValueOnce({ data: null, error: null });
      expect(await loadPregeneratedDay('N2', 9)).toBeNull();
      mockMaybeSingle.mockResolvedValueOnce({
        data: { payload: { vocab: [{ id: 'VOC0001', jp: '報告' }], quiz: [] } },
        error: null,
      });
      const retry = await loadPregeneratedDay('N2', 9);
      expect(retry?.vocab[0].jp).toBe('報告');
      expect(mockMaybeSingle).toHaveBeenCalledTimes(2);
    });
  });
});
