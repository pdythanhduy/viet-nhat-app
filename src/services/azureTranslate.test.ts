const mockInvoke = jest.fn();

jest.mock('./supabaseClient', () => ({
  supabase: { functions: { invoke: (...args: unknown[]) => mockInvoke(...args) } },
}));

import { translateSentenceViaAzure, MAX_TRANSLATE_CHARS } from './azureTranslate';

describe('azureTranslate', () => {
  beforeEach(() => {
    mockInvoke.mockReset();
  });

  it('translates a sentence via the proxy', async () => {
    mockInvoke.mockResolvedValueOnce({ data: { translation: 'Xin chao' }, error: null });
    await expect(translateSentenceViaAzure('こんにちは')).resolves.toBe('Xin chao');
    expect(mockInvoke).toHaveBeenCalledWith('azure-translate-proxy', { body: { text: 'こんにちは' } });
  });

  it('rejects text longer than the character limit without calling the proxy', async () => {
    const long = 'あ'.repeat(MAX_TRANSLATE_CHARS + 1);
    await expect(translateSentenceViaAzure(long)).rejects.toThrow(/quá dài/);
    expect(mockInvoke).not.toHaveBeenCalled();
  });

  it('returns empty string for blank input', async () => {
    await expect(translateSentenceViaAzure('   ')).resolves.toBe('');
    expect(mockInvoke).not.toHaveBeenCalled();
  });

  it('surfaces proxy-level errors', async () => {
    mockInvoke.mockResolvedValueOnce({ data: { error: { message: 'quota' } }, error: null });
    await expect(translateSentenceViaAzure('こんにちは')).rejects.toThrow('quota');
  });

  it('surfaces transport-level errors', async () => {
    mockInvoke.mockResolvedValueOnce({ data: null, error: { message: 'network down' } });
    await expect(translateSentenceViaAzure('こんにちは')).rejects.toThrow('network down');
  });
});
