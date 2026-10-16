// supabase-js's FunctionsHttpError always carries the generic message
// "Edge Function returned a non-2xx status code" — the actual reason our
// edge functions return (e.g. "Forbidden", "ANTHROPIC_API_KEY not set", or
// an upstream Anthropic/Azure error) sits unread on error.context, the raw
// Response object. Read it so callers surface something actionable instead
// of that generic string.
import { FunctionsHttpError } from '@supabase/supabase-js';

export async function extractFunctionsErrorMessage(error: unknown): Promise<string> {
  if (error instanceof FunctionsHttpError) {
    try {
      const body = await error.context.json();
      const message = body?.error?.message;
      if (typeof message === 'string' && message.trim()) return message;
    } catch {
      // Body wasn't JSON (or already consumed) — fall through to the generic message.
    }
  }
  const message = (error as { message?: unknown } | null)?.message;
  return typeof message === 'string' ? message : String(error);
}
