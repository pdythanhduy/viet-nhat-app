import { searchAppContent } from './searchIndex';

// Mirror of SEARCH_SUGGESTIONS in src/screens/SearchScreen.tsx. Duplicated
// rather than imported because pulling SearchScreen into a util test would
// drag in react-native + native modules (analytics → @aptabase/react-native)
// that don't run under jest-node. If you add/remove a suggestion in
// SearchScreen, update this list — the comment in the screen file points
// callers back here.
const SEARCH_SUGGESTIONS = [
  'visa',
  'thẻ cư trú',
  'bảo hiểm',
  '住民税',
  'zairyu',
  'mất giấy tờ',
];

describe('SearchScreen empty-state suggestions', () => {
  it.each(SEARCH_SUGGESTIONS)(
    'returns at least one hit for "%s"',
    (suggestion) => {
      const results = searchAppContent(suggestion);
      expect(results.length).toBeGreaterThan(0);
    },
  );
});
