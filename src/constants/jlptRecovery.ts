import type { JlptLevel } from '../services/jlptRecoveryTypes';

export interface JlptRecoveryLevelConfig {
  level: JlptLevel;
  title: string;
  subtitle: string;
  courseLabel: string;
  dayCount: number;
  promptVersion: string;
  contentSchemaVersion: number;
  lessonSchemaVersion: number;
  vocabBatchCount: number;
  vocabCardsPerBatch: number;
  quizCount: number;
  lessonItemCount: number;
  reviewCount: number;
  explanationTone: string;
}

export const JLPT_RECOVERY_LEVELS: readonly JlptLevel[] = ['N5', 'N4', 'N3', 'N2', 'N1'];

export const JLPT_RECOVERY_LEVEL_CONFIGS: Record<JlptLevel, JlptRecoveryLevelConfig> = {
  N5: {
    level: 'N5',
    title: 'JLPT Recovery N5',
    subtitle: 'Nền tảng sơ cấp, câu ngắn, giải thích rõ nghĩa',
    courseLabel: 'N5 Recovery',
    dayCount: 30,
    promptVersion: 'v1',
    contentSchemaVersion: 1,
    lessonSchemaVersion: 1,
    vocabBatchCount: 2,
    vocabCardsPerBatch: 13,
    quizCount: 12,
    lessonItemCount: 4,
    reviewCount: 6,
    explanationTone: 'very simple',
  },
  N4: {
    level: 'N4',
    title: 'JLPT Recovery N4',
    subtitle: 'Sơ trung cấp, giữ nhịp học đều và ngắn',
    courseLabel: 'N4 Recovery',
    dayCount: 40,
    promptVersion: 'v1',
    contentSchemaVersion: 1,
    lessonSchemaVersion: 1,
    vocabBatchCount: 2,
    vocabCardsPerBatch: 18,
    quizCount: 14,
    lessonItemCount: 4,
    reviewCount: 6,
    explanationTone: 'simple',
  },
  N3: {
    level: 'N3',
    title: 'JLPT Recovery N3',
    subtitle: 'Trung cấp, tăng chiều sâu ngữ pháp và ngữ cảnh',
    courseLabel: 'N3 Recovery',
    dayCount: 60,
    promptVersion: 'v1',
    contentSchemaVersion: 1,
    lessonSchemaVersion: 1,
    vocabBatchCount: 2,
    vocabCardsPerBatch: 27,
    quizCount: 16,
    lessonItemCount: 4,
    reviewCount: 8,
    explanationTone: 'balanced',
  },
  N2: {
    level: 'N2',
    title: 'JLPT Recovery N2',
    subtitle: 'Lấy lại N2 + giao tiếp + business, có chiều sâu sắc thái',
    courseLabel: 'N2 Recovery',
    dayCount: 100,
    promptVersion: 'v1',
    contentSchemaVersion: 1,
    lessonSchemaVersion: 1,
    vocabBatchCount: 2,
    vocabCardsPerBatch: 25,
    quizCount: 20,
    lessonItemCount: 5,
    reviewCount: 8,
    explanationTone: 'balanced',
  },
  N1: {
    level: 'N1',
    title: 'JLPT Recovery N1',
    subtitle: 'Nâng cao, ưu tiên nuance và văn phong thật',
    courseLabel: 'N1 Recovery',
    dayCount: 80,
    promptVersion: 'v1',
    contentSchemaVersion: 1,
    lessonSchemaVersion: 1,
    vocabBatchCount: 2,
    vocabCardsPerBatch: 25,
    quizCount: 16,
    lessonItemCount: 4,
    reviewCount: 8,
    explanationTone: 'advanced',
  },
};

export function getJlptRecoveryLevelConfig(level: JlptLevel): JlptRecoveryLevelConfig {
  return JLPT_RECOVERY_LEVEL_CONFIGS[level];
}

// A level is browsable once its curriculum is wired into the registry; see
// `hasRecoveryCurriculum` in constants/jlptRecoveryCurriculum.ts (single source
// of truth). Levels without a curriculum show as "coming soon" in the picker.
