const mockGetSession = jest.fn();
const mockSignInAnonymously = jest.fn();

jest.mock('./supabaseClient', () => ({
  // Arrow-wrapped so the mock fns are read lazily (jest hoists the factory above
  // the const declarations).
  supabase: {
    auth: {
      getSession: () => mockGetSession(),
      signInAnonymously: () => mockSignInAnonymously(),
    },
  },
  isSupabaseConfigured: () => true,
}));

import { ensureJlptSession } from './anonAuth';

describe('ensureJlptSession', () => {
  beforeEach(() => {
    mockGetSession.mockReset();
    mockSignInAnonymously.mockReset();
  });

  it('does not sign in when a session already exists', async () => {
    mockGetSession.mockResolvedValue({ data: { session: { user: { id: 'u1' } } } });
    await ensureJlptSession();
    expect(mockSignInAnonymously).not.toHaveBeenCalled();
  });

  it('signs in anonymously when there is no session', async () => {
    mockGetSession.mockResolvedValue({ data: { session: null } });
    mockSignInAnonymously.mockResolvedValue({ data: {}, error: null });
    await ensureJlptSession();
    expect(mockSignInAnonymously).toHaveBeenCalledTimes(1);
  });

  it('swallows errors (anonymous sign-ins disabled / offline)', async () => {
    mockGetSession.mockRejectedValue(new Error('network'));
    await expect(ensureJlptSession()).resolves.toBeUndefined();
  });
});
