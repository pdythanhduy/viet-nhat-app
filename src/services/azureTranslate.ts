// Client for the `azure-translate-proxy` Supabase Edge Function — the
// public, near-zero-cost "dịch câu" feature. Unlike anthropicProxy.ts,
// this is NOT owner-gated; it's meant for every app user. The Azure key
// stays server-side; this module just calls the proxy and never sees it.

import { supabase } from './supabaseClient';

// Keep in sync with MAX_CHARS in supabase/functions/azure-translate-proxy/index.ts.
export const MAX_TRANSLATE_CHARS = 200;

export function isAzureTranslateConfigured(): boolean {
  return supabase !== null;
}

type AzureProxyResponse = {
  translation?: string;
  error?: { message?: string };
};

export async function translateSentenceViaAzure(text: string): Promise<string> {
  const trimmed = text.trim();
  if (!trimmed) return '';
  if (!supabase) throw new Error('not-configured');
  if (trimmed.length > MAX_TRANSLATE_CHARS) {
    throw new Error(`Câu quá dài (tối đa ${MAX_TRANSLATE_CHARS} ký tự).`);
  }

  const { data, error } = await supabase.functions.invoke<AzureProxyResponse>('azure-translate-proxy', {
    body: { text: trimmed },
  });
  if (error) throw new Error(error.message || 'translate-failed');
  if (!data) throw new Error('Empty proxy response.');
  if (data.error) throw new Error(data.error.message || 'Translate error.');
  if (!data.translation) throw new Error('No translation returned.');
  return data.translation;
}
