jest.mock('@react-native-async-storage/async-storage', () => ({
  __esModule: true,
  default: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
  },
}));

import { buildUserProfileSummary, getUserProfileGreeting } from './userProfile';

describe('userProfile helpers', () => {
  it('builds a readable profile summary', () => {
    expect(
      buildUserProfileSummary({
        visaStatus: 'student',
        lifeStage: 'new-arrival',
        household: 'alone',
        prefecture: 'Tokyo',
        createdAt: '2026-04-12T00:00:00.000Z',
        updatedAt: '2026-04-12T00:00:00.000Z',
      })
    ).toBe('Du học sinh • Mới sang Nhật • Sống một mình • đang sống ở Tokyo');
  });

  it('builds a greeting with optional prefecture', () => {
    expect(
      getUserProfileGreeting({
        visaStatus: 'engineer',
        lifeStage: 'settling-in',
        household: 'with-family',
        prefecture: '',
        createdAt: '2026-04-12T00:00:00.000Z',
        updatedAt: '2026-04-12T00:00:00.000Z',
      })
    ).toBe('Đang ổn định cuộc sống');
  });
});
