jest.mock('react-native-purchases', () => ({
  __esModule: true,
  default: {
    configure: jest.fn(),
    logIn: jest.fn(async () => ({})),
    getCustomerInfo: jest.fn(async () => ({ entitlements: { active: {} } })),
    getOfferings: jest.fn(async () => ({ current: null, all: {} })),
    purchasePackage: jest.fn(),
    restorePurchases: jest.fn(async () => ({ entitlements: { active: {} } })),
  },
}));

const mockGetUser = jest.fn();
const mockMaybeSingle = jest.fn();

jest.mock('./supabaseClient', () => ({
  supabase: {
    // Wrap in arrows so the mock fns are read lazily — a bare `getUser:
    // mockGetUser` is evaluated when the factory runs (before the const is
    // initialized under jest hoisting) and would be undefined.
    auth: { getUser: () => mockGetUser() },
    from: () => ({
      select: () => ({ eq: () => ({ maybeSingle: () => mockMaybeSingle() }) }),
    }),
  },
  isSupabaseConfigured: () => true,
}));

import { getJlptPro, loadJlptPro, setJlptProLocal } from './jlptEntitlement';

describe('jlptEntitlement', () => {
  beforeEach(() => {
    mockGetUser.mockReset();
    mockMaybeSingle.mockReset();
    setJlptProLocal(false);
  });

  it('is false when there is no signed-in user', async () => {
    mockGetUser.mockResolvedValue({ data: { user: null } });
    expect(await loadJlptPro()).toBe(false);
    expect(mockMaybeSingle).not.toHaveBeenCalled();
  });

  it('is true when the user has a Pro entitlement row', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: 'u1' } } });
    mockMaybeSingle.mockResolvedValue({ data: { has_pro: true }, error: null });
    expect(await loadJlptPro()).toBe(true);
    expect(getJlptPro()).toBe(true);
  });

  it('is false when the entitlement row says has_pro=false', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: 'u1' } } });
    mockMaybeSingle.mockResolvedValue({ data: { has_pro: false }, error: null });
    expect(await loadJlptPro()).toBe(false);
  });

  it('is false when there is no entitlement row', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: 'u1' } } });
    mockMaybeSingle.mockResolvedValue({ data: null, error: null });
    expect(await loadJlptPro()).toBe(false);
  });

  it('is false (no throw) when the query errors', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: 'u1' } } });
    mockMaybeSingle.mockResolvedValue({ data: null, error: { message: 'relation missing' } });
    expect(await loadJlptPro()).toBe(false);
  });

  it('setJlptProLocal updates the cached flag optimistically', () => {
    setJlptProLocal(true);
    expect(getJlptPro()).toBe(true);
  });
});
