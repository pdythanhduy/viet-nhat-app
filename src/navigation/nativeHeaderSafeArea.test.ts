import * as fs from 'fs';
import * as path from 'path';

const NATIVE_HEADER_SCREEN_FILES = [
  'BJTScreen.tsx',
  'BJTVocabularyScreen.tsx',
  'BJTKeigoScreen.tsx',
  'BJTScenariosScreen.tsx',
  'BJTDocumentMockScreen.tsx',
  'BJTBusinessToolkitScreen.tsx',
  'BJTLanguageAssetsScreen.tsx',
  'BJTJobDocsScreen.tsx',
  'BJTReadingPassagesScreen.tsx',
  'BJTFlashcardsScreen.tsx',
  'BJTUltimateStudyPlanScreen.tsx',
  'BJTMockExamsV2Screen.tsx',
  'BJTQuizScreen.tsx',
  'BJTMockTestScreen.tsx',
  'BJTReviewScreen.tsx',
  'JapanesePracticeScreen.tsx',
  'JapaneseQuizScreen.tsx',
] as const;

describe('native header stack screens', () => {
  it('does not add a second top safe-area below the native header', () => {
    for (const fileName of NATIVE_HEADER_SCREEN_FILES) {
      const source = fs.readFileSync(path.join(__dirname, '..', 'screens', fileName), 'utf8');

      expect(source).not.toContain("edges={['top']}");
      expect(source).not.toMatch(/<SafeAreaView style=\{styles\.container\}(?![^>]*edges=)/);
    }
  });
});
