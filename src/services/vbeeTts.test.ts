import {
  clearVbeeSpeechCache,
  getConfiguredVbeeJapaneseVoiceCode,
  getVbeeApiBaseUrl,
  getVbeeJapaneseVoiceCode,
  getVbeeVoiceCode,
  isVbeeConfigured,
  synthesizeVbeeSpeech,
} from './vbeeTts';

type MockFetchResponse = {
  ok: boolean;
  status: number;
  json: () => Promise<unknown>;
};

type VbeeRequestPayload = {
  app_id: string;
  input_text: string;
  voice_code: string;
  callback_url: string;
};

const originalEnv = {
  baseUrl: process.env.EXPO_PUBLIC_VBEE_API_BASE_URL,
  appId: process.env.EXPO_PUBLIC_VBEE_APP_ID,
  apiKey: process.env.EXPO_PUBLIC_VBEE_API_KEY,
  voiceCode: process.env.EXPO_PUBLIC_VBEE_VOICE_CODE,
  voiceId: process.env.EXPO_PUBLIC_VBEE_VOICE_ID,
  jaVoiceCode: process.env.EXPO_PUBLIC_VBEE_JA_VOICE_CODE,
  jaVoiceId: process.env.EXPO_PUBLIC_VBEE_JA_VOICE_ID,
  callbackUrl: process.env.EXPO_PUBLIC_VBEE_CALLBACK_URL,
};
const originalFetch = globalThis.fetch;
const fetchMock = jest.fn<Promise<MockFetchResponse>, [string, RequestInit | undefined]>();

function setMockFetch() {
  (globalThis as unknown as { fetch: typeof fetchMock }).fetch = fetchMock;
}

function restoreEnv() {
  const entries: Array<[keyof typeof originalEnv, string]> = [
    ['baseUrl', 'EXPO_PUBLIC_VBEE_API_BASE_URL'],
    ['appId', 'EXPO_PUBLIC_VBEE_APP_ID'],
    ['apiKey', 'EXPO_PUBLIC_VBEE_API_KEY'],
    ['voiceCode', 'EXPO_PUBLIC_VBEE_VOICE_CODE'],
    ['voiceId', 'EXPO_PUBLIC_VBEE_VOICE_ID'],
    ['jaVoiceCode', 'EXPO_PUBLIC_VBEE_JA_VOICE_CODE'],
    ['jaVoiceId', 'EXPO_PUBLIC_VBEE_JA_VOICE_ID'],
    ['callbackUrl', 'EXPO_PUBLIC_VBEE_CALLBACK_URL'],
  ];

  for (const [sourceKey, envKey] of entries) {
    const value = originalEnv[sourceKey];
    if (value === undefined) {
      delete process.env[envKey];
    } else {
      process.env[envKey] = value;
    }
  }
}

describe('vbeeTts', () => {
  beforeEach(() => {
    process.env.EXPO_PUBLIC_VBEE_API_BASE_URL = 'https://vbee.vn/api/v1/';
    process.env.EXPO_PUBLIC_VBEE_APP_ID = 'test-app-id';
    process.env.EXPO_PUBLIC_VBEE_API_KEY = 'test-token';
    process.env.EXPO_PUBLIC_VBEE_VOICE_CODE = 'test-voice';
    process.env.EXPO_PUBLIC_VBEE_CALLBACK_URL = 'https://example.com/callback';
    delete process.env.EXPO_PUBLIC_VBEE_VOICE_ID;
    delete process.env.EXPO_PUBLIC_VBEE_JA_VOICE_CODE;
    delete process.env.EXPO_PUBLIC_VBEE_JA_VOICE_ID;
    clearVbeeSpeechCache();
    fetchMock.mockReset();
    setMockFetch();
  });

  afterEach(() => {
    restoreEnv();
    (globalThis as unknown as { fetch: typeof originalFetch }).fetch = originalFetch;
  });

  it('ignores placeholder env values and uses safe defaults', () => {
    process.env.EXPO_PUBLIC_VBEE_API_BASE_URL = 'PASTE_API_BASE_URL_TU_DOCS_VBEE';
    process.env.EXPO_PUBLIC_VBEE_API_KEY = 'PASTE_TOKEN_BAN_COPY_O_DAY';
    delete process.env.EXPO_PUBLIC_VBEE_VOICE_CODE;
    process.env.EXPO_PUBLIC_VBEE_VOICE_ID = 'PASTE_VOICE_ID';

    expect(getVbeeApiBaseUrl()).toBe('https://vbee.vn/api/v1');
    expect(getVbeeVoiceCode()).toBe('hn_female_ngochuyen_full_48k-fhg');
    expect(isVbeeConfigured()).toBe(false);
  });

  it('prefers the Japanese voice env when present', () => {
    process.env.EXPO_PUBLIC_VBEE_JA_VOICE_CODE = 'ja-test-voice';

    expect(getConfiguredVbeeJapaneseVoiceCode()).toBe('ja-test-voice');
    expect(getVbeeJapaneseVoiceCode()).toBe('ja-test-voice');
  });

  it('keeps Japanese voice strict config separate from the default voice', () => {
    expect(getConfiguredVbeeJapaneseVoiceCode()).toBeUndefined();
    expect(getVbeeJapaneseVoiceCode()).toBe('test-voice');
  });

  it('submits Vietnamese text to Vbee and polls for the audio link', async () => {
    fetchMock
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          status: 1,
          result: { request_id: 'req-123', status: 'IN_PROGRESS' },
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          status: 1,
          result: { request_id: 'req-123', status: 'SUCCESS', audio_link: 'https://vbee.vn/s/audio.mp3' },
        }),
      });

    await expect(
      synthesizeVbeeSpeech('Xin chao Viet Nam', { pollIntervalMs: 0 })
    ).resolves.toEqual({
      requestId: 'req-123',
      audioUrl: 'https://vbee.vn/s/audio.mp3',
    });

    expect(fetchMock).toHaveBeenCalledTimes(2);
    const [submitUrl, submitInit] = fetchMock.mock.calls[0];
    const submitPayload = JSON.parse(String(submitInit?.body)) as VbeeRequestPayload;

    expect(submitUrl).toBe('https://vbee.vn/api/v1/tts');
    expect(submitInit?.method).toBe('POST');
    expect(submitInit?.headers).toEqual({
      Authorization: 'Bearer test-token',
      'Content-Type': 'application/json',
    });
    expect(submitPayload).toEqual({
      app_id: 'test-app-id',
      input_text: 'Xin chao Viet Nam',
      voice_code: 'test-voice',
      callback_url: 'https://example.com/callback',
    });

    const [pollUrl, pollInit] = fetchMock.mock.calls[1];
    expect(pollUrl).toBe('https://vbee.vn/api/v1/tts/req-123');
    expect(pollInit?.method).toBe('GET');
    expect(pollInit?.headers).toEqual({ Authorization: 'Bearer test-token' });
  });

  it('can submit text with an explicit voice code override', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({
        status: 1,
        result: { request_id: 'req-ja', status: 'SUCCESS', audio_link: 'https://vbee.vn/s/ja.mp3' },
      }),
    });

    await expect(
      synthesizeVbeeSpeech('にどね', { voiceCode: 'ja-test-voice' })
    ).resolves.toEqual({
      requestId: 'req-ja',
      audioUrl: 'https://vbee.vn/s/ja.mp3',
    });

    const [, submitInit] = fetchMock.mock.calls[0];
    const submitPayload = JSON.parse(String(submitInit?.body)) as VbeeRequestPayload;
    expect(submitPayload.voice_code).toBe('ja-test-voice');
    expect(submitPayload.input_text).toBe('にどね');
  });

  it('returns immediate audio when Vbee completes during submission', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({
        status: 1,
        result: { request_id: 'req-123', status: 'SUCCESS', audio_link: 'https://vbee.vn/s/audio.mp3' },
      }),
    });

    await expect(synthesizeVbeeSpeech('Xin chao')).resolves.toEqual({
      requestId: 'req-123',
      audioUrl: 'https://vbee.vn/s/audio.mp3',
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('reuses an in-memory result for repeated text and voice', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({
        status: 1,
        result: { request_id: 'req-cache', status: 'SUCCESS', audio_link: 'https://vbee.vn/s/cache.mp3' },
      }),
    });

    const first = await synthesizeVbeeSpeech('Xin chao');
    const second = await synthesizeVbeeSpeech('Xin chao');

    expect(first).toEqual(second);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('dedupes concurrent requests for the same text and voice', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({
        status: 1,
        result: { request_id: 'req-shared', status: 'SUCCESS', audio_link: 'https://vbee.vn/s/shared.mp3' },
      }),
    });

    const [first, second] = await Promise.all([
      synthesizeVbeeSpeech('Doc chung mot cau'),
      synthesizeVbeeSpeech('Doc chung mot cau'),
    ]);

    expect(first).toEqual(second);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('throws not-configured when app id or token is missing', async () => {
    delete process.env.EXPO_PUBLIC_VBEE_API_KEY;

    await expect(synthesizeVbeeSpeech('Xin chao')).rejects.toThrow('not-configured');
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('surfaces Vbee API errors', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ status: 0, message: 'Invalid token' }),
    });

    await expect(synthesizeVbeeSpeech('Xin chao')).rejects.toThrow('Invalid token');
  });
});
