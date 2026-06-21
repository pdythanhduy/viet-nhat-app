const DEFAULT_API_BASE_URL = 'https://vbee.vn/api/v1';
const DEFAULT_VOICE_CODE = 'hn_female_ngochuyen_full_48k-fhg';
const DEFAULT_CALLBACK_URL = 'https://example.com/vbee-callback';
const REQUEST_TIMEOUT_MS = 30000;
const POLL_INTERVAL_MS = 1500;
const MAX_POLL_ATTEMPTS = 40;

type VbeeTtsRequestOptions = {
  pollIntervalMs?: number;
  maxPollAttempts?: number;
  requestTimeoutMs?: number;
};

export type VbeeSpeechResult = {
  audioUrl: string;
  requestId: string;
};

type VbeeApiResponse = {
  status?: number | boolean | string;
  message?: string;
  error?: { message?: string } | string;
  result?: {
    request_id?: string;
    requestId?: string;
    status?: string;
    audio_link?: string;
    audio_url?: string;
    audioLink?: string;
    audioUrl?: string;
  };
};

function cleanEnv(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  if (!trimmed) return undefined;
  const upper = trimmed.toUpperCase();
  if (upper.startsWith('PASTE_') || upper.includes('TU_DOCS_VBEE')) return undefined;
  return trimmed;
}

function normalizeBaseUrl(value: string): string {
  const trimmed = value.trim().replace(/\/+$/, '');
  return trimmed.endsWith('/tts') ? trimmed.slice(0, -4) : trimmed;
}

export function getVbeeApiBaseUrl(): string {
  return normalizeBaseUrl(cleanEnv(process.env.EXPO_PUBLIC_VBEE_API_BASE_URL) ?? DEFAULT_API_BASE_URL);
}

export function getVbeeAppId(): string | undefined {
  return cleanEnv(process.env.EXPO_PUBLIC_VBEE_APP_ID);
}

export function getVbeeApiKey(): string | undefined {
  return cleanEnv(process.env.EXPO_PUBLIC_VBEE_API_KEY);
}

export function getVbeeVoiceCode(): string {
  return (
    cleanEnv(process.env.EXPO_PUBLIC_VBEE_VOICE_CODE) ??
    cleanEnv(process.env.EXPO_PUBLIC_VBEE_VOICE_ID) ??
    DEFAULT_VOICE_CODE
  );
}

export function getVbeeCallbackUrl(): string {
  return cleanEnv(process.env.EXPO_PUBLIC_VBEE_CALLBACK_URL) ?? DEFAULT_CALLBACK_URL;
}

export function isVbeeConfigured(): boolean {
  return Boolean(getVbeeAppId() && getVbeeApiKey());
}

function toAsciiJson(value: unknown): string {
  const s = JSON.stringify(value);
  let out = '';
  for (let i = 0; i < s.length; i++) {
    const code = s.charCodeAt(i);
    out += code < 128 ? s[i] : '\\u' + code.toString(16).padStart(4, '0');
  }
  return out;
}

function buildUrl(path: string): string {
  return `${getVbeeApiBaseUrl()}${path.startsWith('/') ? path : `/${path}`}`;
}

function sleep(ms: number): Promise<void> {
  if (ms <= 0) return Promise.resolve();
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getResponseError(json: VbeeApiResponse): string | undefined {
  if (typeof json.error === 'string') return json.error;
  if (json.error?.message) return json.error.message;
  return json.message;
}

function assertVbeeSuccess(json: VbeeApiResponse): void {
  if (json.status === 0 || json.status === false || String(json.status).toLowerCase() === 'false') {
    throw new Error(getResponseError(json) || 'Vbee API rejected the request.');
  }
  if (json.error) {
    throw new Error(getResponseError(json) || 'Vbee API returned an error.');
  }
}

function getRequestId(json: VbeeApiResponse): string | undefined {
  return json.result?.request_id ?? json.result?.requestId;
}

function getAudioUrl(json: VbeeApiResponse): string | undefined {
  return json.result?.audio_link ?? json.result?.audio_url ?? json.result?.audioLink ?? json.result?.audioUrl;
}

function getSynthesisStatus(json: VbeeApiResponse): string | undefined {
  return json.result?.status?.toUpperCase();
}

async function fetchVbeeJson(
  url: string,
  init: RequestInit,
  requestTimeoutMs: number
): Promise<VbeeApiResponse> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), requestTimeoutMs);
  try {
    const res = await fetch(url, { ...init, signal: controller.signal });
    const json = (await res.json()) as VbeeApiResponse;
    if (!res.ok) {
      throw new Error(getResponseError(json) || `Vbee API returned HTTP ${res.status}`);
    }
    assertVbeeSuccess(json);
    return json;
  } finally {
    clearTimeout(timer);
  }
}

export async function synthesizeVbeeSpeech(
  text: string,
  options: VbeeTtsRequestOptions = {}
): Promise<VbeeSpeechResult> {
  const appId = getVbeeAppId();
  const apiKey = getVbeeApiKey();
  if (!appId || !apiKey) {
    throw new Error('not-configured');
  }

  const trimmed = text.trim();
  if (!trimmed) {
    throw new Error('empty-text');
  }

  const requestTimeoutMs = options.requestTimeoutMs ?? REQUEST_TIMEOUT_MS;
  const submitResponse = await fetchVbeeJson(
    buildUrl('/tts'),
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: toAsciiJson({
        app_id: appId,
        input_text: trimmed,
        voice_code: getVbeeVoiceCode(),
        callback_url: getVbeeCallbackUrl(),
      }),
    },
    requestTimeoutMs
  );

  const requestId = getRequestId(submitResponse);
  const immediateAudioUrl = getAudioUrl(submitResponse);
  if (requestId && immediateAudioUrl) {
    return { requestId, audioUrl: immediateAudioUrl };
  }
  if (!requestId) {
    throw new Error('Vbee did not return a request id.');
  }

  const maxPollAttempts = options.maxPollAttempts ?? MAX_POLL_ATTEMPTS;
  const pollIntervalMs = options.pollIntervalMs ?? POLL_INTERVAL_MS;
  for (let attempt = 0; attempt < maxPollAttempts; attempt++) {
    await sleep(pollIntervalMs);
    const pollResponse = await fetchVbeeJson(
      buildUrl(`/tts/${encodeURIComponent(requestId)}`),
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      },
      requestTimeoutMs
    );

    const status = getSynthesisStatus(pollResponse);
    const audioUrl = getAudioUrl(pollResponse);
    if (audioUrl && (!status || status === 'SUCCESS' || status === 'DONE')) {
      return { requestId, audioUrl };
    }
    if (status === 'FAIL' || status === 'FAILED' || status === 'ERROR') {
      throw new Error(getResponseError(pollResponse) || 'Vbee synthesis failed.');
    }
  }

  throw new Error('Vbee synthesis timed out.');
}
