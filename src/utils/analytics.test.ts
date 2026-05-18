// Aptabase publishes its CJS+ESM bundle as `import` syntax which jest-expo
// doesn't transform by default. Mock both so the analytics module loads in
// the test environment.
jest.mock('@aptabase/react-native', () => ({
  init: jest.fn(),
  trackEvent: jest.fn(),
}));

import { normalizeQueryForAnalytics } from './analytics';

describe('normalizeQueryForAnalytics — PII contract', () => {
  // The contract: never forward raw user input. The normalizer must always
  // produce ASCII-ish, lowercased, ≤24-char output. Any change to this
  // function should also force these tests to be updated.

  describe('Japanese queries (kana / kanji pass through)', () => {
    it('preserves JP characters as-is, lowercases nothing JP-side', () => {
      expect(normalizeQueryForAnalytics('在留カード')).toBe('在留カード');
    });

    it('preserves hiragana queries', () => {
      expect(normalizeQueryForAnalytics('ふるさと納税')).toBe('ふるさと納税');
    });

    it('lowercases Latin chars even in a mixed JP+EN query', () => {
      expect(normalizeQueryForAnalytics('VISA 在留')).toBe('visa 在留');
    });
  });

  describe('Vietnamese diacritic queries → ASCII', () => {
    it('strips standard combining diacritics', () => {
      expect(normalizeQueryForAnalytics('thẻ cư trú')).toBe('the cu tru');
    });

    it('maps đ/Đ to d (NFD does not split đ)', () => {
      expect(normalizeQueryForAnalytics('Đại sứ quán')).toBe('dai su quan');
    });

    it('mixed diacritics + ASCII normalizes consistently', () => {
      expect(normalizeQueryForAnalytics('Quá hạn Visa')).toBe('qua han visa');
    });
  });

  describe('Vietnamese no-diacritic queries (already ASCII)', () => {
    it('passes through unchanged except for case', () => {
      expect(normalizeQueryForAnalytics('the cu tru')).toBe('the cu tru');
    });

    it('lowercases ASCII input', () => {
      expect(normalizeQueryForAnalytics('VISA RENEWAL')).toBe('visa renewal');
    });
  });

  describe('length cap (24 chars)', () => {
    it('caps long input at exactly 24 chars', () => {
      const longQuery = 'a'.repeat(50);
      const result = normalizeQueryForAnalytics(longQuery);
      expect(result.length).toBe(24);
      expect(result).toBe('a'.repeat(24));
    });

    it('caps at 24 chars even after diacritic stripping', () => {
      // 30-char Vietnamese sentence with diacritics — strip first, then cap
      const result = normalizeQueryForAnalytics('Tôi cần làm thẻ cư trú mới và khám sức khỏe');
      expect(result.length).toBeLessThanOrEqual(24);
      // Must start with the normalized prefix (proves order: normalize → cap)
      expect(result).toMatch(/^toi can lam the cu tru/);
    });

    it('short input is left at its natural length', () => {
      expect(normalizeQueryForAnalytics('visa').length).toBe(4);
    });
  });

  describe('whitespace normalization', () => {
    it('trims leading whitespace', () => {
      expect(normalizeQueryForAnalytics('   visa')).toBe('visa');
    });

    it('trims trailing whitespace', () => {
      expect(normalizeQueryForAnalytics('visa   ')).toBe('visa');
    });

    it('trims both sides', () => {
      expect(normalizeQueryForAnalytics('  visa  ')).toBe('visa');
    });

    it('returns empty string for whitespace-only input', () => {
      expect(normalizeQueryForAnalytics('     ')).toBe('');
    });

    it('returns empty string for empty input', () => {
      expect(normalizeQueryForAnalytics('')).toBe('');
    });

    // Note: we deliberately do NOT collapse internal whitespace. Two spaces
    // between words may carry signal (typo, double-tap on space) and the
    // normalized output is still bounded by the 24-char cap.
    it('preserves internal whitespace', () => {
      expect(normalizeQueryForAnalytics('visa  renewal')).toBe('visa  renewal');
    });
  });

  describe('sensitive raw query handling', () => {
    // The PII contract says: forward a short normalized form. We are NOT
    // running PII detection here — the safeguard is the 24-char cap + ASCII
    // form, which makes accidental name/address leakage hard to reconstruct
    // across queries. These tests pin the cap-and-normalize behavior on
    // realistic worst-case input.

    it('truncates a full name to a 24-char prefix', () => {
      // A user typing their own name into search — bad search query but
      // legal under the PII contract because of the cap.
      const fullName = 'Nguyễn Văn An Bình Trường';
      const result = normalizeQueryForAnalytics(fullName);
      expect(result.length).toBeLessThanOrEqual(24);
      // No diacritics in output
      expect(result).not.toMatch(/[̀-ͯ]/);
      // No uppercase
      expect(result).toBe(result.toLowerCase());
    });

    it('truncates a long Japanese address to a 24-char prefix', () => {
      // 30+ chars — guarantees truncation at the 24-char cap
      const address = '東京都新宿区西新宿2-8-1 都庁第一本庁舎の隣のビル3階';
      const result = normalizeQueryForAnalytics(address);
      expect(result.length).toBeLessThanOrEqual(24);
      // The trailing suffix past 24 chars must be cut
      expect(result).not.toContain('ビル3階');
    });

    it('truncates an email address to a 24-char prefix', () => {
      const email = 'thanhduy8vn+test@gmail.com.long.suffix';
      const result = normalizeQueryForAnalytics(email);
      expect(result.length).toBeLessThanOrEqual(24);
      // The domain TLD past 24 chars should be cut
      expect(result).not.toContain('long.suffix');
    });

    it('never returns a string longer than 24 chars regardless of input', () => {
      const inputs = [
        'a'.repeat(100),
        'Tôi đang muốn xin vĩnh trú và đi khám bệnh ở 東京 mai',
        '在留カードを失くしたので再発行が必要です住所も変わりました',
        '🎌🎌🎌🎌🎌🎌🎌🎌🎌🎌🎌🎌🎌🎌🎌🎌',  // emoji edge case
      ];
      for (const input of inputs) {
        expect(normalizeQueryForAnalytics(input).length).toBeLessThanOrEqual(24);
      }
    });
  });

  describe('idempotence', () => {
    it('normalizing twice equals normalizing once', () => {
      const once = normalizeQueryForAnalytics('Thẻ Cư Trú');
      const twice = normalizeQueryForAnalytics(once);
      expect(twice).toBe(once);
    });
  });
});
