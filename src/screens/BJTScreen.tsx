import React from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { Colors } from '../constants/colors';
import {
  BJT_LEVEL_BANDS,
  BJT_OVERVIEW,
  BJT_PIPELINE_BATCHES,
  BJT_PRACTICE_QUESTIONS,
  BJT_QUESTION_TYPES,
  BJT_STUDY_MODULES,
  BJT_STUDY_PLAN,
} from '../constants/content';
import { RootStackParamList } from '../navigation/AppNavigator';
import { BjtTargetLevel, filterBjtQuestionsByLevel, getAvailableBjtLevels } from '../utils/bjtQuestionLevels';
import { getBjtCoverageSummary } from '../utils/bjtQuestionCoverage';
import { getBjtPipelineStage, getBjtPipelineSummary } from '../utils/bjtPipeline';
import { buildClaudePromptForGapAction, getBjtPipelineGapActions } from '../utils/bjtPipelineGaps';
import { BjtSkill, getBjtLevelSnapshot, loadBjtProgress } from '../utils/bjtProgress';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const SKILL_LABELS = {
  listening: 'Listening',
  'listening-reading': 'Listening + Reading',
  reading: 'Reading',
} as const;

const SKILL_TITLES: Record<BjtSkill, string> = {
  listening: 'Listening',
  'listening-reading': 'Listening + Reading',
  reading: 'Reading',
};

const LEVEL_LABELS: Record<BjtTargetLevel, string> = {
  all: 'All',
  J5: 'J5',
  J4: 'J4',
  J3: 'J3',
  J2: 'J2',
  J1: 'J1',
  'J1+': 'J1+',
};

const PIPELINE_STAGE_LABELS = {
  raw: 'Raw',
  reviewed: 'Reviewed',
  'runtime-imported': 'Imported',
} as const;

const LEVEL_GUIDANCE: Record<
  Exclude<BjtTargetLevel, 'all'>,
  { title: string; description: string; actionLabel: string; route: 'BJTVocabulary' | 'BJTQuiz' | 'BJTMockTest' }
> = {
  J5: {
    title: 'Build base business Japanese',
    description: 'Tap trung vao tu vung cong so co ban va tinh huong ngan, ro hanh dong.',
    actionLabel: 'Open vocabulary',
    route: 'BJTVocabulary',
  },
  J4: {
    title: 'Cung co routine workplace',
    description: 'On lai email, memo, lich hop va deadline de quen flow xu ly business.',
    actionLabel: 'Practice vocabulary',
    route: 'BJTVocabulary',
  },
  J3: {
    title: 'Train common office decisions',
    description: 'J3 can xu ly thay doi lich, thong bao noi bo va quyet dinh cong viec quen thuoc.',
    actionLabel: 'Start J3 practice',
    route: 'BJTQuiz',
  },
  J2: {
    title: 'Handle denser business context',
    description: 'Tang kha nang doi chieu thong tin, uu tien hanh dong va nhan ra sac thai lich su.',
    actionLabel: 'Run J2 mock',
    route: 'BJTMockTest',
  },
  J1: {
    title: 'Push to advanced judgment',
    description: 'Tap trung vao tinh huong nhieu dieu kien, nhieu vai tro va phan ung dung.',
    actionLabel: 'Run J1 mock',
    route: 'BJTMockTest',
  },
  'J1+': {
    title: 'Practice top-end reasoning',
    description: 'On dang bai phuc tap, nhieu lop thong tin va quyet dinh chat che duoi ap luc thoi gian.',
    actionLabel: 'Run top-level mock',
    route: 'BJTMockTest',
  },
};

const SKILL_RECOMMENDATIONS: Record<
  BjtSkill,
  { title: string; description: string; actionLabel: string; route: 'BJTVocabulary' | 'BJTQuiz' | 'BJTMockTest' }
> = {
  listening: {
    title: 'Tang toc do nghe tinh huong ngan',
    description: 'Tap trung vao key point, moc thoi gian va hanh dong can lam sau cuoc goi hoac trao doi ngan.',
    actionLabel: 'Open Scenario Practice',
    route: 'BJTQuiz',
  },
  'listening-reading': {
    title: 'Luyen doi chieu nghe va doc',
    description: 'Can on dang email, memo, lich va thong bao co thong tin cap nhat tu nhieu nguon.',
    actionLabel: 'Open Timed Mock',
    route: 'BJTMockTest',
  },
  reading: {
    title: 'Tang toc do doc business text',
    description: 'Can luyen email, thong bao va quy trinh ngan de rut ra hanh dong dung.',
    actionLabel: 'Open Vocabulary Pack',
    route: 'BJTVocabulary',
  },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

export default function BJTScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [progress, setProgress] = React.useState<Awaited<ReturnType<typeof loadBjtProgress>> | null>(null);
  const [targetLevel, setTargetLevel] = React.useState<BjtTargetLevel>('J3');

  useFocusEffect(
    React.useCallback(() => {
      loadBjtProgress().then(setProgress);
    }, [])
  );

  const availableLevels = React.useMemo(() => getAvailableBjtLevels(BJT_PRACTICE_QUESTIONS), []);
  const pipelineSummary = React.useMemo(() => getBjtPipelineSummary(BJT_PIPELINE_BATCHES), []);
  const pipelineBatches = React.useMemo(
    () => BJT_PIPELINE_BATCHES.filter((batch) => targetLevel === 'all' || batch.level === targetLevel),
    [targetLevel]
  );
  const levelQuestions = React.useMemo(
    () => filterBjtQuestionsByLevel(BJT_PRACTICE_QUESTIONS, targetLevel),
    [targetLevel]
  );
  const coverage = React.useMemo(
    () => getBjtCoverageSummary(BJT_PRACTICE_QUESTIONS, targetLevel),
    [targetLevel]
  );
  const pipelineGapActions = React.useMemo(
    () =>
      getBjtPipelineGapActions({
        level: targetLevel,
        coverage,
        batches: pipelineBatches,
      }),
    [coverage, pipelineBatches, targetLevel]
  );
  const recommendation = progress?.weakestSkill ? SKILL_RECOMMENDATIONS[progress.weakestSkill] : null;
  const levelGuidance = targetLevel === 'all' ? null : LEVEL_GUIDANCE[targetLevel];
  const levelSnapshot = React.useMemo(
    () => (progress ? getBjtLevelSnapshot(progress, targetLevel) : null),
    [progress, targetLevel]
  );
  const levelWeakestSkill = levelSnapshot?.weakestSkill;
  const levelRecommendation = levelWeakestSkill ? SKILL_RECOMMENDATIONS[levelWeakestSkill] : null;
  const scenarioAccuracy =
    progress && progress.totalScenarioQuestionsAnswered > 0
      ? Math.round((progress.totalScenarioCorrect / progress.totalScenarioQuestionsAnswered) * 100)
      : null;
  const recentScenario = levelSnapshot?.recentScenarioHistory ?? [];
  const recentMocks = levelSnapshot?.recentMockHistory ?? [];
  const wrongReviewCount = levelSnapshot?.wrongReviewCount ?? 0;
  const vocabularyReady = (progress?.totalVocabularyReviewed ?? 0) >= 10;
  const mockReady = (levelSnapshot?.bestMockPercent ?? 0) >= 70;
  const activeScenarioAccuracy = levelSnapshot?.scenarioAccuracy ?? scenarioAccuracy;
  const activeLastMock = levelSnapshot?.lastMock ?? progress?.lastMock;

  const formatSessionDate = (iso: string) =>
    new Date(iso).toLocaleDateString('vi-VN', { month: '2-digit', day: '2-digit' });

  const openRoute = React.useCallback(
    (route: 'BJTVocabulary' | 'BJTQuiz' | 'BJTMockTest') => {
      if (route === 'BJTVocabulary') {
        navigation.navigate('BJTVocabulary');
      } else if (route === 'BJTQuiz') {
        navigation.navigate('BJTQuiz', { level: targetLevel });
      } else {
        navigation.navigate('BJTMockTest', { level: targetLevel });
      }
    },
    [navigation, targetLevel]
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primaryDark} />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <View style={styles.heroBadge}>
            <Ionicons name="briefcase-outline" size={16} color={Colors.white} />
            <Text style={styles.heroBadgeText}>BJT Module</Text>
          </View>
          <Text style={styles.heroTitle}>{BJT_OVERVIEW.title}</Text>
          <Text style={styles.heroSubtitle}>{BJT_OVERVIEW.subtitle}</Text>
          <View style={styles.card}>
            <Text style={styles.overline}>BJT focus</Text>
            {BJT_OVERVIEW.examFocus.map((item) => (
              <View key={item} style={styles.bulletRow}>
                <Ionicons name="checkmark-circle" size={16} color={Colors.primary} />
                <Text style={styles.bodyText}>{item}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() =>
              navigation.navigate('AIChat', {
                title: 'BJT Coach',
                prefilledQuestion:
                  'Hay dong vai BJT coach. Lap cho toi mot buoi luyen 20 phut gom 5 tu business, 1 doan nghe ngan, 1 email ngan va giai thich dap an bang tieng Viet.',
              })
            }
          >
            <Ionicons name="sparkles-outline" size={18} color={Colors.white} />
            <Text style={styles.primaryButtonText}>Hoc voi AI Coach</Text>
          </TouchableOpacity>
        </View>

        <Section title="Target Level">
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Chon muc tieu hien tai</Text>
            <Text style={styles.bodyText}>Recommendation, scenario va mock se uu tien theo level ban chon.</Text>
            <View style={styles.chipRow}>
              {availableLevels.map((level) => {
                const active = level === targetLevel;
                return (
                  <TouchableOpacity
                    key={level}
                    style={[styles.chip, active && styles.chipActive]}
                    onPress={() => setTargetLevel(level)}
                  >
                    <Text style={[styles.chipText, active && styles.chipTextActive]}>{LEVEL_LABELS[level]}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Question bank</Text>
              <Text style={styles.summaryValue}>
                {levelQuestions.length} questions for {LEVEL_LABELS[targetLevel]}
              </Text>
            </View>
            <View style={styles.innerCard}>
              <Text style={styles.cardTitle}>{levelGuidance ? levelGuidance.title : 'Mixed-level review'}</Text>
              <Text style={styles.bodyText}>
                {levelGuidance
                  ? levelGuidance.description
                  : 'Dung khi muon on rong toan bo question bank truoc khi chot muc tieu cu the.'}
              </Text>
              {levelGuidance ? (
                <TouchableOpacity style={styles.primaryPill} onPress={() => openRoute(levelGuidance.route)}>
                  <Text style={styles.primaryPillText}>{levelGuidance.actionLabel}</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        </Section>

        <Section title="Question Bank Coverage">
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Coverage for {LEVEL_LABELS[targetLevel]}</Text>
            <Text style={styles.bodyText}>
              Dung bang nay de biet level hien tai dang thieu data o skill hay difficulty nao truoc khi tiep tuc nho Claude bo sung.
            </Text>
            <View style={styles.coverageGrid}>
              <View style={styles.coverageCard}>
                <Text style={styles.coverageTitle}>By skill</Text>
                <View style={styles.coverageRow}>
                  <Text style={styles.summaryLabel}>Listening</Text>
                  <Text style={styles.summaryValue}>{coverage.bySkill.listening}</Text>
                </View>
                <View style={styles.coverageRow}>
                  <Text style={styles.summaryLabel}>Listen + Read</Text>
                  <Text style={styles.summaryValue}>{coverage.bySkill['listening-reading']}</Text>
                </View>
                <View style={styles.coverageRow}>
                  <Text style={styles.summaryLabel}>Reading</Text>
                  <Text style={styles.summaryValue}>{coverage.bySkill.reading}</Text>
                </View>
              </View>
              <View style={styles.coverageCard}>
                <Text style={styles.coverageTitle}>By difficulty</Text>
                <View style={styles.coverageRow}>
                  <Text style={styles.summaryLabel}>Basic</Text>
                  <Text style={styles.summaryValue}>{coverage.byDifficulty.basic}</Text>
                </View>
                <View style={styles.coverageRow}>
                  <Text style={styles.summaryLabel}>Intermediate</Text>
                  <Text style={styles.summaryValue}>{coverage.byDifficulty.intermediate}</Text>
                </View>
                <View style={styles.coverageRow}>
                  <Text style={styles.summaryLabel}>Advanced</Text>
                  <Text style={styles.summaryValue}>{coverage.byDifficulty.advanced}</Text>
                </View>
              </View>
            </View>
            <View style={styles.innerCard}>
              <Text style={styles.cardTitle}>Current gap signal</Text>
              <Text style={styles.bodyText}>
                Skill it cau nhat: {Object.entries(coverage.bySkill).sort((a, b) => a[1] - b[1])[0]?.[0] ?? 'n/a'}.
              </Text>
              <Text style={styles.bodyText}>
                Difficulty it cau nhat: {Object.entries(coverage.byDifficulty).sort((a, b) => a[1] - b[1])[0]?.[0] ?? 'n/a'}.
              </Text>
            </View>
          </View>
        </Section>

        <Section title="Import Pipeline">
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Batch status</Text>
            <Text style={styles.bodyText}>
              Dashboard nay cho biet batch nao moi o raw, batch nao da reviewed, va batch nao da import vao runtime.
            </Text>
            <View style={styles.coverageGrid}>
              <View style={styles.coverageCard}>
                <Text style={styles.coverageTitle}>Overall</Text>
                <View style={styles.coverageRow}>
                  <Text style={styles.summaryLabel}>Total batches</Text>
                  <Text style={styles.summaryValue}>{pipelineSummary.totalBatches}</Text>
                </View>
                <View style={styles.coverageRow}>
                  <Text style={styles.summaryLabel}>Imported batches</Text>
                  <Text style={styles.summaryValue}>{pipelineSummary.runtimeImportedBatches}</Text>
                </View>
                <View style={styles.coverageRow}>
                  <Text style={styles.summaryLabel}>Imported questions</Text>
                  <Text style={styles.summaryValue}>{pipelineSummary.importedQuestions}</Text>
                </View>
              </View>
            </View>
            {pipelineBatches.map((batch) => {
              const stage = getBjtPipelineStage(batch);
              return (
                <View key={batch.id} style={styles.innerCard}>
                  <View style={styles.coverageRow}>
                    <Text style={styles.cardTitle}>{batch.label}</Text>
                    <Text style={styles.summaryValue}>{PIPELINE_STAGE_LABELS[stage]}</Text>
                  </View>
                  <Text style={styles.bodyText}>Level: {batch.level}</Text>
                  <Text style={styles.bodyText}>Raw: {batch.rawFile}</Text>
                  <Text style={styles.bodyText}>
                    Reviewed: {batch.reviewedFile ?? 'Chua co reviewed manifest'}
                  </Text>
                  <Text style={styles.bodyText}>
                    Runtime: {batch.runtimeFile ?? 'Chua co runtime file'}
                  </Text>
                  <Text style={styles.bodyText}>
                    Imported question count: {batch.importedQuestionIds.length}
                  </Text>
                </View>
              );
            })}
            <View style={styles.innerCard}>
              <Text style={styles.cardTitle}>Next data actions</Text>
              {pipelineGapActions.length > 0 ? (
                pipelineGapActions.map((action) => (
                  <View key={action.id} style={styles.bulletRow}>
                    <Ionicons
                      name={action.severity === 'high' ? 'alert-circle' : 'ellipse-outline'}
                      size={16}
                      color={action.severity === 'high' ? Colors.warning : Colors.textMuted}
                    />
                    <View style={styles.flex}>
                      <Text style={styles.cardTitle}>{action.title}</Text>
                      <Text style={styles.bodyText}>{action.detail}</Text>
                      <TouchableOpacity
                        style={styles.secondaryPill}
                        onPress={() =>
                          navigation.navigate('AIChat', {
                            title: 'Claude Prompt Builder',
                            prefilledQuestion: buildClaudePromptForGapAction(action, targetLevel),
                          })
                        }
                      >
                        <Text style={styles.secondaryPillText}>Open Claude prompt</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))
              ) : (
                <Text style={styles.bodyText}>
                  Chua co gap lon cho level nay. Co the tiep tuc mo rong coverage mot cach can bang.
                </Text>
              )}
            </View>
          </View>
        </Section>

        <Section title="Tien do BJT">
          <View style={styles.grid}>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Tu da on</Text>
              <Text style={styles.metricValue}>{progress?.totalVocabularyReviewed ?? 0}</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Practice sessions</Text>
              <Text style={styles.metricValue}>{progress?.scenarioPracticeSessions ?? 0}</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Best mock</Text>
              <Text style={styles.metricValue}>{progress?.bestMockPercent ?? 0}%</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Weakest skill</Text>
              <Text style={styles.metricValueSmall}>
                {progress?.weakestSkill ? SKILL_TITLES[progress.weakestSkill] : 'Chua co'}
              </Text>
            </View>
          </View>
          {activeLastMock ? (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Mock gan nhat</Text>
              <Text style={styles.bodyText}>
                {activeLastMock.score}/{activeLastMock.total} dung, {activeLastMock.percent}%
              </Text>
            </View>
          ) : null}
          {activeScenarioAccuracy !== null ? (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Scenario accuracy</Text>
              <Text style={styles.bodyText}>
                {levelSnapshot?.totalScenarioCorrect ?? progress?.totalScenarioCorrect}/
                {levelSnapshot?.totalScenarioQuestionsAnswered ?? progress?.totalScenarioQuestionsAnswered} dung, {activeScenarioAccuracy}%
              </Text>
            </View>
          ) : null}
        </Section>

        <Section title="Xu huong gan day">
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Scenario sessions</Text>
            {recentScenario.length > 0 ? (
              recentScenario.map((item) => (
                <View key={item.completedAt} style={styles.trendRow}>
                  <Text style={styles.trendDate}>{formatSessionDate(item.completedAt)}</Text>
                  <Text style={styles.trendValue}>{item.correct}/{item.answered} dung</Text>
                  <Text style={styles.trendPercent}>{item.percent}%</Text>
                </View>
              ))
            ) : (
              <Text style={styles.bodyText}>Chua co session scenario nao.</Text>
            )}
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Mock sessions</Text>
            {recentMocks.length > 0 ? (
              recentMocks.map((item) => (
                <View key={item.completedAt} style={styles.trendRow}>
                  <Text style={styles.trendDate}>{formatSessionDate(item.completedAt)}</Text>
                  <Text style={styles.trendValue}>{item.score}/{item.total} dung</Text>
                  <Text style={styles.trendPercent}>{item.percent}%</Text>
                </View>
              ))
            ) : (
              <Text style={styles.bodyText}>Chua co mock nao.</Text>
            )}
          </View>
        </Section>

        <Section title="Nen lam gi tiep theo">
          <View style={styles.card}>
            {levelRecommendation ? (
              <>
                <View style={styles.recommendationRow}>
                  <View style={styles.iconBox}>
                    <Ionicons name="compass-outline" size={18} color={Colors.primary} />
                  </View>
                  <View style={styles.flex}>
                    <Text style={styles.cardTitle}>{levelRecommendation.title}</Text>
                    <Text style={styles.bodyText}>{levelRecommendation.description}</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.primaryPill} onPress={() => openRoute(levelRecommendation.route)}>
                  <Text style={styles.primaryPillText}>
                    {levelRecommendation.actionLabel} ({LEVEL_LABELS[targetLevel]})
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.cardTitle}>Bat dau tu nen tang</Text>
                <Text style={styles.bodyText}>
                  Neu chua co du lieu, hay mo Vocabulary Pack truoc. Sau do lam Scenario Practice de app nhan ra skill yeu nhat.
                </Text>
                <TouchableOpacity style={styles.primaryPill} onPress={() => navigation.navigate('BJTVocabulary')}>
                  <Text style={styles.primaryPillText}>Open Vocabulary Pack</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Checkpoint hien tai</Text>
            <View style={styles.bulletRow}>
              <Ionicons name={vocabularyReady ? 'checkmark-circle' : 'ellipse-outline'} size={16} color={vocabularyReady ? Colors.success : Colors.textMuted} />
              <Text style={styles.bodyText}>Da on it nhat 10 tu business core: {progress?.totalVocabularyReviewed ?? 0}/10</Text>
            </View>
            <View style={styles.bulletRow}>
              <Ionicons
                name={activeScenarioAccuracy !== null && activeScenarioAccuracy >= 65 ? 'checkmark-circle' : 'ellipse-outline'}
                size={16}
                color={activeScenarioAccuracy !== null && activeScenarioAccuracy >= 65 ? Colors.success : Colors.textMuted}
              />
              <Text style={styles.bodyText}>Scenario Practice dat tu 65% tro len: {activeScenarioAccuracy ?? 0}%</Text>
            </View>
            <View style={styles.bulletRow}>
              <Ionicons name={mockReady ? 'checkmark-circle' : 'ellipse-outline'} size={16} color={mockReady ? Colors.success : Colors.textMuted} />
              <Text style={styles.bodyText}>Best mock dat tu 70% tro len: {levelSnapshot?.bestMockPercent ?? progress?.bestMockPercent ?? 0}%</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('BJTReview', { level: targetLevel })}>
            <View style={styles.recommendationRow}>
              <View style={styles.iconBox}>
                <Ionicons name="refresh-circle-outline" size={18} color={Colors.primary} />
              </View>
              <View style={styles.flex}>
                <Text style={styles.cardTitle}>Review loi gan day</Text>
                <Text style={styles.bodyText}>
                  {wrongReviewCount > 0
                    ? `Ban co ${wrongReviewCount} cau sai gan day de on lai ngay.`
                    : 'Hien chua co cau sai gan day de review.'}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={Colors.textMuted} />
            </View>
          </TouchableOpacity>
        </Section>

        <Section title="4 module dau tien">
          {BJT_STUDY_MODULES.map((module) => (
            <View key={module.id} style={styles.card}>
              <View style={[styles.iconBox, { backgroundColor: `${module.color}18` }]}>
                <Ionicons name={module.icon} size={18} color={module.color} />
              </View>
              <Text style={styles.moduleTitle}>{module.title}</Text>
              <Text style={styles.bodyText}>{module.description}</Text>
              {module.outcomes.map((outcome) => (
                <View key={outcome} style={styles.bulletRow}>
                  <Ionicons name="arrow-forward" size={14} color={module.color} />
                  <Text style={styles.bodyText}>{outcome}</Text>
                </View>
              ))}
              {module.linkedCategoryName ? (
                <TouchableOpacity
                  style={[styles.secondaryPill, { borderColor: `${module.color}55` }]}
                  onPress={() =>
                    navigation.navigate('JapanesePractice', {
                      categoryName: module.linkedCategoryName!,
                      categoryColor: module.color,
                    })
                  }
                >
                  <Text style={[styles.secondaryPillText, { color: module.color }]}>Open related practice</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          ))}
        </Section>

        <Section title="Luyen ngay">
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('BJTVocabulary')}>
            <Ionicons name="library-outline" size={20} color={Colors.primary} />
            <Text style={styles.moduleTitle}>Vocabulary Pack</Text>
            <Text style={styles.bodyText}>Tu vung business theo chu de email, meeting, reporting va coordination.</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('BJTQuiz', { level: targetLevel })}>
            <Ionicons name="help-circle-outline" size={20} color={Colors.primary} />
            <Text style={styles.moduleTitle}>Scenario Practice</Text>
            <Text style={styles.bodyText}>Cau hoi tinh huong mo phong theo huong BJT, uu tien level dang chon.</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('BJTMockTest', { level: targetLevel })}>
            <Ionicons name="timer-outline" size={20} color={Colors.primary} />
            <Text style={styles.moduleTitle}>Timed Mock Test</Text>
            <Text style={styles.bodyText}>Phien luyen co dem gio, cham theo skill va review loi sau khi xong.</Text>
          </TouchableOpacity>
        </Section>

        <Section title="Moc diem va trong tam">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
            {BJT_LEVEL_BANDS.map((band) => (
              <View key={band.level} style={styles.levelBandCard}>
                <Text style={styles.levelBadge}>{band.level}</Text>
                <Text style={styles.levelScore}>{band.scoreRange}</Text>
                <Text style={styles.bodyText}>{band.summary}</Text>
                {band.focus.map((item) => (
                  <View key={item} style={styles.bulletRow}>
                    <Ionicons name="ellipse" size={8} color={Colors.primary} />
                    <Text style={styles.bodyText}>{item}</Text>
                  </View>
                ))}
              </View>
            ))}
          </ScrollView>
        </Section>

        <Section title="Dang cau hoi can lam quen">
          {BJT_QUESTION_TYPES.map((item) => (
            <View key={item.id} style={styles.card}>
              <View style={styles.questionRow}>
                <Text style={styles.moduleTitle}>{item.title}</Text>
                <View style={styles.skillChip}>
                  <Text style={styles.skillChipText}>{SKILL_LABELS[item.skill]}</Text>
                </View>
              </View>
              <Text style={styles.bodyText}>{item.description}</Text>
              {item.whatToTrain.map((point) => (
                <View key={point} style={styles.bulletRow}>
                  <Ionicons name="checkmark" size={14} color={Colors.success} />
                  <Text style={styles.bodyText}>{point}</Text>
                </View>
              ))}
            </View>
          ))}
        </Section>

        <Section title="Ke hoach 14 ngay">
          <TouchableOpacity
            style={styles.linkRow}
            onPress={() =>
              navigation.navigate('AIChat', {
                title: 'BJT Study Plan',
                prefilledQuestion:
                  'Dua tren ke hoach BJT 14 ngay, hay ca nhan hoa thanh lich hoc 30 phut moi ngay cho nguoi di lam va yeu listening.',
              })
            }
          >
            <Text style={styles.sectionLink}>Ca nhan hoa voi AI</Text>
          </TouchableOpacity>
          {BJT_STUDY_PLAN.map((day) => (
            <View key={day.day} style={styles.planCard}>
              <View style={styles.planDay}>
                <Text style={styles.planDayText}>{day.day}</Text>
              </View>
              <View style={styles.flex}>
                <Text style={styles.cardTitle}>{day.theme}</Text>
                <Text style={styles.bodyText}>{day.goal}</Text>
                {day.tasks.map((task) => (
                  <View key={task} style={styles.bulletRow}>
                    <Ionicons name="remove" size={14} color={Colors.textMuted} />
                    <Text style={styles.bodyText}>{task}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </Section>

        <Section title="Nguyen tac lam bai">
          <View style={styles.card}>
            {BJT_OVERVIEW.strategyNotes.map((note) => (
              <View key={note} style={styles.bulletRow}>
                <Ionicons name="flash-outline" size={15} color={Colors.warning} />
                <Text style={styles.bodyText}>{note}</Text>
              </View>
            ))}
          </View>
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { paddingBottom: 28 },
  hero: {
    backgroundColor: Colors.primaryDark,
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  heroBadge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.14)',
  },
  heroBadgeText: { color: Colors.white, fontSize: 12, fontWeight: '700' },
  heroTitle: { marginTop: 12, fontSize: 28, fontWeight: '800', color: Colors.white },
  heroSubtitle: { marginTop: 8, fontSize: 14, lineHeight: 20, color: 'rgba(255,255,255,0.82)' },
  section: { paddingHorizontal: 16, marginTop: 18 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: Colors.textPrimary, marginBottom: 12 },
  sectionLink: { fontSize: 12, fontWeight: '700', color: Colors.primary },
  overline: { marginBottom: 10, fontSize: 11, fontWeight: '800', color: Colors.primary, textTransform: 'uppercase' },
  card: { backgroundColor: Colors.card, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: Colors.border, marginBottom: 12 },
  innerCard: { marginTop: 12, backgroundColor: Colors.background, borderRadius: 14, padding: 14 },
  cardTitle: { fontSize: 14, fontWeight: '800', color: Colors.textPrimary, marginBottom: 4 },
  bodyText: { flex: 1, fontSize: 12, lineHeight: 18, color: Colors.textPrimary },
  primaryButton: { marginTop: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, borderRadius: 14, paddingVertical: 14, backgroundColor: Colors.primary },
  primaryButtonText: { color: Colors.white, fontSize: 14, fontWeight: '800' },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 12 },
  chip: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999, borderWidth: 1, borderColor: Colors.border, backgroundColor: Colors.background },
  chipActive: { borderColor: Colors.primary, backgroundColor: Colors.accent },
  chipText: { fontSize: 12, fontWeight: '700', color: Colors.textSecondary },
  chipTextActive: { color: Colors.primary },
  summaryRow: { marginTop: 14, flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  coverageGrid: { gap: 12, marginTop: 12 },
  coverageCard: { backgroundColor: Colors.background, borderRadius: 14, padding: 14 },
  coverageTitle: { fontSize: 13, fontWeight: '800', color: Colors.textPrimary, marginBottom: 6 },
  coverageRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, marginTop: 8 },
  summaryLabel: { fontSize: 12, fontWeight: '700', color: Colors.textSecondary },
  summaryValue: { flex: 1, textAlign: 'right', fontSize: 12, color: Colors.textPrimary },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  metricCard: { width: '47%', backgroundColor: Colors.card, borderRadius: 16, padding: 14, borderWidth: 1, borderColor: Colors.border },
  metricLabel: { fontSize: 11, fontWeight: '700', color: Colors.textSecondary, marginBottom: 8 },
  metricValue: { fontSize: 24, fontWeight: '800', color: Colors.textPrimary },
  metricValueSmall: { fontSize: 16, fontWeight: '800', color: Colors.textPrimary },
  trendRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8, paddingTop: 10, marginTop: 10, borderTopWidth: 1, borderTopColor: Colors.border },
  trendDate: { minWidth: 42, fontSize: 12, color: Colors.textSecondary },
  trendValue: { flex: 1, fontSize: 12, color: Colors.textPrimary },
  trendPercent: { fontSize: 12, fontWeight: '800', color: Colors.primary },
  recommendationRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  iconBox: { width: 36, height: 36, borderRadius: 12, backgroundColor: Colors.accent, alignItems: 'center', justifyContent: 'center' },
  flex: { flex: 1 },
  primaryPill: { alignSelf: 'flex-start', marginTop: 12, borderRadius: 999, backgroundColor: Colors.primary, paddingHorizontal: 12, paddingVertical: 9 },
  primaryPillText: { color: Colors.white, fontSize: 12, fontWeight: '700' },
  secondaryPill: { alignSelf: 'flex-start', marginTop: 12, borderRadius: 999, borderWidth: 1, paddingHorizontal: 12, paddingVertical: 8, backgroundColor: Colors.background },
  secondaryPillText: { fontSize: 12, fontWeight: '700' },
  moduleTitle: { marginTop: 10, fontSize: 15, fontWeight: '800', color: Colors.textPrimary },
  horizontalList: { paddingRight: 16, gap: 12 },
  levelBandCard: { width: 260, backgroundColor: Colors.card, borderRadius: 18, padding: 16, borderWidth: 1, borderColor: Colors.border },
  levelBadge: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 999, backgroundColor: Colors.accent, color: Colors.primary, fontSize: 12, fontWeight: '800' },
  levelScore: { marginTop: 10, fontSize: 20, fontWeight: '800', color: Colors.textPrimary },
  questionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  skillChip: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999, backgroundColor: Colors.accent },
  skillChipText: { color: Colors.primary, fontSize: 11, fontWeight: '700' },
  linkRow: { alignSelf: 'flex-start', marginBottom: 10 },
  planCard: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, backgroundColor: Colors.card, borderRadius: 18, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: Colors.border },
  planDay: { width: 34, height: 34, borderRadius: 17, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center', marginTop: 2 },
  planDayText: { color: Colors.white, fontSize: 14, fontWeight: '800' },
  bulletRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginTop: 8 },
});
