import { JLPT_RECOVERY_LEVELS, isJlptLevelFree } from './jlptRecovery';

describe('jlptRecovery monetization', () => {
  it('keeps every JLPT level free', () => {
    for (const level of JLPT_RECOVERY_LEVELS) {
      expect(isJlptLevelFree(level)).toBe(true);
    }
  });
});
