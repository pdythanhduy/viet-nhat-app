// Supabase client with Auth — powers the private "Lab" (Phòng thí nghiệm)
// owner-only screen and its synced feature flags.
//
// This is separate from the content lazy-loader (services/contentLoader/
// remote.ts), which talks to PostgREST with raw fetch and never needs a
// user session. The Lab needs a logged-in user so Row-Level Security can
// scope feature-flag rows to a single owner (auth.uid() = user_id).
//
// Config: reuse the existing content-backend project if present, otherwise
// fall back to dedicated EXPO_PUBLIC_SUPABASE_* vars. Either way the values
// are PUBLIC (anon key) — privacy comes from Supabase Auth + RLS, never
// from the key being secret.

import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

function readConfig(): { url: string; anonKey: string } | null {
  const url =
    process.env.EXPO_PUBLIC_SUPABASE_URL ?? process.env.EXPO_PUBLIC_REMOTE_CONTENT_URL;
  const anonKey =
    process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? process.env.EXPO_PUBLIC_REMOTE_CONTENT_KEY;
  if (!url || !anonKey) return null;
  return { url, anonKey };
}

const config = readConfig();

// `null` when no backend is configured (e.g. local dev with no .env). The
// Lab screen checks `isSupabaseConfigured()` and shows a friendly message
// instead of crashing.
export const supabase: SupabaseClient | null = config
  ? createClient(config.url, config.anonKey, {
      auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        // No URL-based session detection on native (that's a web-OAuth thing).
        detectSessionInUrl: false,
      },
    })
  : null;

export function isSupabaseConfigured(): boolean {
  return supabase !== null;
}
