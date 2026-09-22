// Client for the `anthropic-proxy` Supabase Edge Function.
//
// The Anthropic key no longer ships in the app bundle. Owner-only features
// (the Furigana reader's translate / explain) call Claude through this proxy,
// which holds the key server-side and only answers the owner's signed-in
// account. supabase.functions.invoke attaches the caller's access token, which
// the function checks against the owner allowlist.

import { supabase } from './supabaseClient';
import { extractFunctionsErrorMessage } from './functionsError';

export interface ProxyMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface AnthropicPayload {
  model: string;
  max_tokens: number;
  system: string;
  messages: ProxyMessage[];
}

export interface ClaudeResponse {
  content?: Array<{ type: string; text?: string }>;
  stop_reason?: string;
  error?: { message?: string };
}

/** True when the proxy can be reached (Supabase configured). The function still
 * enforces owner-only access server-side; this only gates the client UI. */
export function isAnthropicProxyConfigured(): boolean {
  return Boolean(supabase);
}

/** Call Claude via the Edge Function. Throws 'not-configured' when Supabase is
 * absent, or the proxy's error message (e.g. Forbidden for non-owners). */
export async function callAnthropicProxy(payload: AnthropicPayload): Promise<ClaudeResponse> {
  if (!supabase) throw new Error('not-configured');

  const { data, error } = await supabase.functions.invoke<ClaudeResponse>('anthropic-proxy', {
    body: payload,
  });
  if (error) throw new Error((await extractFunctionsErrorMessage(error)) || 'proxy-failed');
  if (!data) throw new Error('Empty proxy response.');
  if (data.error) throw new Error(data.error.message || 'Anthropic error.');
  return data;
}
