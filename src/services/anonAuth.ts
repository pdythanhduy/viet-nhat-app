// Ensure a Supabase session exists for public users.
//
// Paid content (RLS) and entitlement reads need an authenticated user. Public
// users get an ANONYMOUS session (one per device); the owner's Lab login, if
// present, takes precedence. Requires "Anonymous sign-ins" enabled in the
// Supabase project (Authentication → Providers). No-op when Supabase isn't
// configured or a session already exists.

import { supabase } from './supabaseClient';

let inflight: Promise<void> | null = null;

export async function ensureJlptSession(): Promise<void> {
  if (!supabase) return;
  if (inflight) return inflight;

  const client = supabase;
  inflight = (async () => {
    try {
      const { data } = await client.auth.getSession();
      if (data.session) return;
      await client.auth.signInAnonymously();
    } catch {
      // Anonymous sign-ins disabled / offline → entitlement just reads as false.
    } finally {
      inflight = null;
    }
  })();

  return inflight;
}
