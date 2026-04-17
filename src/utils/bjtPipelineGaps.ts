import { BjtPipelineBatch } from '../types/content';
import { BjtCoverageSummary } from './bjtQuestionCoverage';
import { BjtTargetLevel } from './bjtQuestionLevels';
import { getBjtPipelineStage } from './bjtPipeline';

export interface BjtPipelineGapAction {
  id: string;
  severity: 'high' | 'medium';
  title: string;
  detail: string;
  focusSkill?: 'listening' | 'listening-reading' | 'reading';
  focusDifficulty?: 'basic' | 'intermediate' | 'advanced';
}

export function getBjtPipelineGapActions(input: {
  level: BjtTargetLevel;
  coverage: BjtCoverageSummary;
  batches: BjtPipelineBatch[];
}): BjtPipelineGapAction[] {
  const actions: BjtPipelineGapAction[] = [];
  const { level, coverage, batches } = input;

  if (level !== 'all' && batches.length === 0) {
    actions.push({
      id: `${level}-missing-batch`,
      severity: 'high',
      title: `${level} chưa có batch nào`,
      detail: `Cần tạo ít nhất 1 raw batch cho ${level} trước khi tiếp tục import vào runtime.`,
    });
  }

  const rawOrReviewed = batches.filter((batch) => getBjtPipelineStage(batch) !== 'runtime-imported');
  if (level !== 'all' && rawOrReviewed.length > 0) {
    actions.push({
      id: `${level}-pending-import`,
      severity: 'medium',
      title: `${level} còn batch chưa import`,
      detail: `${rawOrReviewed.length} batch của ${level} đang ở raw/reviewed, nên ưu tiên review và import trước khi tạo batch mới.`,
    });
  }

  const lowestSkill = Object.entries(coverage.bySkill).sort((a, b) => a[1] - b[1])[0];
  if (lowestSkill && lowestSkill[1] < 4) {
    actions.push({
      id: `${level}-skill-gap-${lowestSkill[0]}`,
      severity: 'high',
      title: `${String(lowestSkill[0])} đang mỏng`,
      detail: `Level ${level} mới có ${lowestSkill[1]} câu cho skill ${String(lowestSkill[0])}. Nên bổ sung batch mới ưu tiên skill này.`,
      focusSkill: lowestSkill[0] as 'listening' | 'listening-reading' | 'reading',
    });
  }

  const lowestDifficulty = Object.entries(coverage.byDifficulty).sort((a, b) => a[1] - b[1])[0];
  if (lowestDifficulty && lowestDifficulty[1] < 3) {
    actions.push({
      id: `${level}-difficulty-gap-${lowestDifficulty[0]}`,
      severity: 'medium',
      title: `${String(lowestDifficulty[0])} đang mỏng`,
      detail: `Level ${level} mới có ${lowestDifficulty[1]} câu ở difficulty ${String(lowestDifficulty[0])}. Nên bổ sung để mock đa dạng hơn.`,
      focusDifficulty: lowestDifficulty[0] as 'basic' | 'intermediate' | 'advanced',
    });
  }

  if (coverage.total < 12 && level !== 'all') {
    actions.push({
      id: `${level}-total-gap`,
      severity: 'high',
      title: `${level} chưa đủ độ sâu`,
      detail: `Question bank của ${level} hiện mới có ${coverage.total} câu. Mục tiêu tối thiểu nên là 12-18 câu để practice và mock bớt lặp.`,
    });
  }

  return actions;
}

export function buildClaudePromptForGapAction(
  action: BjtPipelineGapAction,
  level: BjtTargetLevel
): string {
  const skillLine = action.focusSkill
    ? `- Focus skill: ${action.focusSkill}\n`
    : '';
  const difficultyLine = action.focusDifficulty
    ? `- Preferred difficulty: ${action.focusDifficulty}\n`
    : '';

  return [
    'You are helping generate original BJT-style practice data for a learning app.',
    '',
    `Task: create 12 original items for level ${level}.`,
    skillLine + difficultyLine + '- Keep all output original, not official BJT material.',
    '- Output should help close this gap:',
    `  ${action.title}: ${action.detail}`,
    '- Use realistic Japanese workplace situations.',
    '- Keep one clearly defensible correct answer per item.',
    '- Do not rely on hidden authority assumptions.',
    '- Return valid JSON array only.',
    '- Include these fields for each item:',
    '  id, level, skill, difficulty, business_topic, situation, prompt, options, correctIndex, explanation_vi, vocabulary, grammar_points, action_focus, level_reason, why_not_lower_level, why_not_higher_level',
    '- Vary scenarios across email, meeting, reporting, phone, and schedule changes when possible.',
    '- Self-check schema validity, answer uniqueness, explanation alignment, and level consistency before returning.',
  ].join('\n');
}
