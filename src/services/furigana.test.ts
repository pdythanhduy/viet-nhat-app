import { fetchFurigana } from './furigana';

type MockFetchResponse = {
  ok: boolean;
  status: number;
  json: () => Promise<unknown>;
  text: () => Promise<string>;
};

type YahooPayload = {
  jsonrpc: string;
  method: string;
  params: {
    q: string;
    grade: number;
  };
};

const originalAppId = process.env.EXPO_PUBLIC_YAHOO_APPID;
const originalFetch = globalThis.fetch;
const fetchMock = jest.fn<Promise<MockFetchResponse>, [string, RequestInit | undefined]>();

function setMockFetch() {
  (globalThis as unknown as { fetch: typeof fetchMock }).fetch = fetchMock;
}

function restoreEnv() {
  if (originalAppId === undefined) {
    delete process.env.EXPO_PUBLIC_YAHOO_APPID;
  } else {
    process.env.EXPO_PUBLIC_YAHOO_APPID = originalAppId;
  }
}

describe('fetchFurigana', () => {
  beforeEach(() => {
    process.env.EXPO_PUBLIC_YAHOO_APPID = 'test-app';
    fetchMock.mockReset();
    setMockFetch();
  });

  afterEach(() => {
    restoreEnv();
    (globalThis as unknown as { fetch: typeof originalFetch }).fetch = originalFetch;
  });

  it('renders non-Japanese text without calling Yahoo', async () => {
    await expect(fetchFurigana('Skip to navigation')).resolves.toEqual([
      { surface: 'Skip to navigation', reading: null },
    ]);

    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('posts JSON-RPC to the Yahoo gateway with appid auth', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      status: 200,
      text: async () => '',
      json: async () => ({
        result: { word: [{ surface: '\u6f22\u5b57', furigana: '\u304b\u3093\u3058' }] },
      }),
    });

    await expect(fetchFurigana('\u6f22\u5b57')).resolves.toEqual([
      { surface: '\u6f22\u5b57', reading: '\u304b\u3093\u3058' },
    ]);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    const payload = JSON.parse(String(init?.body)) as YahooPayload;

    expect(url).toBe('https://jlp.yahooapis.jp/jsonrpc?appid=test-app');
    expect(init?.method).toBe('POST');
    expect(init?.headers).toEqual({ 'Content-Type': 'application/json' });
    expect(payload).toMatchObject({
      jsonrpc: '2.0',
      method: 'jlp.furiganaservice.furigana',
      params: { q: '\u6f22\u5b57', grade: 1 },
    });
    expect(String(init?.body)).toContain('\\u6f22\\u5b57');
  });

  it('sanitizes characters that Yahoo rejects before posting', async () => {
    fetchMock.mockImplementation(async (_url, init) => {
      const payload = JSON.parse(String(init?.body)) as YahooPayload;
      return {
        ok: true,
        status: 200,
        text: async () => '',
        json: async () => ({ result: { word: [{ surface: payload.params.q }] } }),
      };
    });

    await fetchFurigana('\u6f22\u5b57\u00a0\u2014\u2122\ud83d\ude00\ud842\udfb7\u200b\ufffd\u30c6\u30b9\u30c8');

    const [, init] = fetchMock.mock.calls[0];
    const payload = JSON.parse(String(init?.body)) as YahooPayload;

    expect(payload.params.q).toBe('\u6f22\u5b57 -TM \u30c6\u30b9\u30c8');
    expect(payload.params.q).not.toContain('\u00a0');
    expect(payload.params.q).not.toContain('\u2014');
    expect(payload.params.q).not.toContain('\u200b');
    expect(payload.params.q).not.toContain('\ufffd');
  });

  it('splits long escaped Japanese text below Yahoo request size limits', async () => {
    const sentQueries: string[] = [];
    fetchMock.mockImplementation(async (_url, init) => {
      const body = String(init?.body);
      const payload = JSON.parse(body) as YahooPayload;
      sentQueries.push(payload.params.q);
      return {
        ok: true,
        status: 200,
        text: async () => '',
        json: async () => ({ result: { word: [{ surface: payload.params.q }] } }),
      };
    });

    const input = '\u6f22'.repeat(700);

    await fetchFurigana(input);

    expect(fetchMock.mock.calls.length).toBeGreaterThan(1);
    for (const [, init] of fetchMock.mock.calls) {
      expect(String(init?.body).length).toBeLessThanOrEqual(4096);
    }
    expect(sentQueries.join('')).toBe(input);
  });
});
