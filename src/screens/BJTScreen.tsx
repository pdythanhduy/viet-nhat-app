import React from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { Colors } from '../constants/colors';
import {
  BJT_OVERVIEW,
  BJT_PRACTICE_QUESTIONS,
  BJT_STUDY_PLAN,
} from '../constants/content';
import { RootStackParamList } from '../navigation/AppNavigator';
import { BjtTargetLevel, filterBjtQuestionsByLevel, getAvailableBjtLevels } from '../utils/bjtQuestionLevels';
import { BjtSkill, getBjtLevelSnapshot, loadBjtProgress } from '../utils/bjtProgress';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const SKILL_TITLES: Record<BjtSkill, string> = {
  listening: 'Nghe',
  'listening-reading': 'Nghe + Đọc',
  reading: 'Đọc',
};

const LEVEL_LABELS: Record<BjtTargetLevel, string> = {
  all: 'Tất cả',
  J5: 'J5',
  J4: 'J4',
  J3: 'J3',
  J2: 'J2',
  J1: 'J1',
  'J1+': 'J1+',
};

const LEVEL_GUIDANCE: Record<
  Exclude<BjtTargetLevel, 'all'>,
  { title: string; description: string; actionLabel: string; route: 'BJTVocabulary' | 'BJTQuiz' | 'BJTMockTest' }
> = {
  J5: { title: 'Xây nền tảng từ vựng công sở', description: 'Tập trung vào từ vựng công sở cơ bản và các tình huống ngắn, rõ hành động.', actionLabel: 'Mở từ vựng', route: 'BJTVocabulary' },
  J4: { title: 'Củng cố quy trình thường ngày', description: 'Ôn lại email, memo, lịch họp và deadline để quen flow xử lý business.', actionLabel: 'Luyện từ vựng', route: 'BJTVocabulary' },
  J3: { title: 'Luyện quyết định công việc phổ biến', description: 'J3 cần xử lý thay đổi lịch, thông báo nội bộ và quyết định công việc quen thuộc.', actionLabel: 'Bắt đầu luyện J3', route: 'BJTQuiz' },
  J2: { title: 'Xử lý ngữ cảnh business dày đặc hơn', description: 'Tăng khả năng đối chiếu thông tin, ưu tiên hành động và nhận ra sắc thái lịch sự.', actionLabel: 'Chạy mock J2', route: 'BJTMockTest' },
  J1: { title: 'Nâng lên phán đoán nâng cao', description: 'Tập trung vào tình huống nhiều điều kiện, nhiều vai trò và phản ứng đúng.', actionLabel: 'Chạy mock J1', route: 'BJTMockTest' },
  'J1+': { title: 'Luyện suy luận cấp cao nhất', description: 'Ôn dạng bài phức tạp, nhiều lớp thông tin và quyết định chặt chẽ dưới áp lực thời gian.', actionLabel: 'Chạy mock J1+', route: 'BJTMockTest' },
};

const SKILL_RECOMMENDATIONS: Record<
  BjtSkill,
  { title: string; description: string; actionLabel: string; route: 'BJTVocabulary' | 'BJTQuiz' | 'BJTMockTest' }
> = {
  listening: { title: 'Tăng tốc độ nghe tình huống ngắn', description: 'Tập trung vào key point, mốc thời gian và hành động cần làm sau cuộc gọi.', actionLabel: 'Luyện tình huống', route: 'BJTQuiz' },
  'listening-reading': { title: 'Luyện đối chiếu nghe và đọc', description: 'Cần ôn dạng email, memo, lịch và thông báo có thông tin cập nhật từ nhiều nguồn.', actionLabel: 'Chạy mock có giờ', route: 'BJTMockTest' },
  reading: { title: 'Tăng tốc độ đọc business text', description: 'Cần luyện email, thông báo và quy trình ngắn để rút ra hành động đúng.', actionLabel: 'Mở gói từ vựng', route: 'BJTVocabulary' },
};

const TOOLS = [
  { label: 'Tham khảo Keigo', icon: 'school-outline', route: 'BJTKeigo' },
  { label: 'Kho tình huống', icon: 'chatbubbles-outline', route: 'BJTScenarios' },
  { label: 'Mock tài liệu', icon: 'document-text-outline', route: 'BJTDocumentMock' },
  { label: '50 đề thi', icon: 'albums-outline', route: 'BJTMockExamsV2' },
  { label: 'Bài đọc dài', icon: 'reader-outline', route: 'BJTReadingPassages' },
  { label: 'Công cụ kinh doanh', icon: 'briefcase-outline', route: 'BJTBusinessToolkit' },
  { label: 'Ngữ liệu', icon: 'library-outline', route: 'BJTLanguageAssets' },
  { label: 'Bộ flashcard', icon: 'layers-outline', route: 'BJTFlashcards' },
  { label: 'Kế hoạch 12 tuần', icon: 'calendar-outline', route: 'BJTUltimateStudyPlan' },
  { label: 'Hồ sơ xin việc', icon: 'document-attach-outline', route: 'BJTJobDocs' },
] as const;

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

export default function BJTScreen() {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const navigation = useNavigation<NavigationProp>();
  const [progress, setProgress] = React.useState<Awaited<ReturnType<typeof loadBjtProgress>> | null>(null);
  const [targetLevel, setTargetLevel] = React.useState<BjtTargetLevel>('J3');

  useFocusEffect(React.useCallback(() => { loadBjtProgress().then(setProgress); }, []));

  const availableLevels = React.useMemo(() => getAvailableBjtLevels(BJT_PRACTICE_QUESTIONS), []);
  const levelQuestions = React.useMemo(() => filterBjtQuestionsByLevel(BJT_PRACTICE_QUESTIONS, targetLevel), [targetLevel]);
  const levelGuidance = targetLevel === 'all' ? null : LEVEL_GUIDANCE[targetLevel];
  const levelSnapshot = React.useMemo(() => (progress ? getBjtLevelSnapshot(progress, targetLevel) : null), [progress, targetLevel]);
  const levelRecommendation = levelSnapshot?.weakestSkill ? SKILL_RECOMMENDATIONS[levelSnapshot.weakestSkill] : null;
  const wrongReviewCount = levelSnapshot?.wrongReviewCount ?? 0;

  const openRoute = React.useCallback((route: 'BJTVocabulary' | 'BJTQuiz' | 'BJTMockTest') => {
    if (route === 'BJTVocabulary') navigation.navigate('BJTVocabulary');
    else if (route === 'BJTQuiz') navigation.navigate('BJTQuiz', { level: targetLevel });
    else navigation.navigate('BJTMockTest', { level: targetLevel });
  }, [navigation, targetLevel]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primaryDark} />
      <ScrollView style={styles.container} contentContainerStyle={[styles.content, isTablet && styles.contentTablet]}>

        {/* Hero */}
        <View style={styles.hero}>
          <View style={styles.heroBadge}>
            <Ionicons name="briefcase-outline" size={14} color={Colors.white} />
            <Text style={styles.heroBadgeText}>Luyện BJT</Text>
          </View>
          <Text style={styles.heroTitle}>{BJT_OVERVIEW.title}</Text>
          <Text style={styles.heroSubtitle}>{BJT_OVERVIEW.subtitle}</Text>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => openRoute('BJTQuiz')}
          >
            <Ionicons name="play-circle-outline" size={16} color={Colors.white} />
            <Text style={styles.primaryButtonText}>Bắt đầu luyện ngay</Text>
          </TouchableOpacity>
        </View>

        {/* Mục tiêu */}
        <Section title="Mục tiêu">
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Chọn level hiện tại</Text>
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
              <Text style={styles.summaryLabel}>Ngân hàng câu</Text>
              <Text style={styles.summaryValue}>{levelQuestions.length} câu cho {LEVEL_LABELS[targetLevel]}</Text>
            </View>
            {levelGuidance ? (
              <View style={styles.guidanceBox}>
                <Text style={styles.guidanceTitle}>{levelGuidance.title}</Text>
                <Text style={styles.guidanceBody}>{levelGuidance.description}</Text>
                <TouchableOpacity style={styles.pill} onPress={() => openRoute(levelGuidance.route)}>
                  <Text style={styles.pillText}>{levelGuidance.actionLabel}</Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        </Section>

        {/* Tiến độ */}
        <Section title="Tiến độ BJT">
          <View style={styles.grid}>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Từ đã ôn</Text>
              <Text style={styles.metricValue}>{progress?.totalVocabularyReviewed ?? 0}</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Số buổi luyện</Text>
              <Text style={styles.metricValue}>{progress?.scenarioPracticeSessions ?? 0}</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Mock tốt nhất</Text>
              <Text style={styles.metricValue}>{progress?.bestMockPercent ?? 0}%</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Tốt nhất 50 đề</Text>
              <Text style={styles.metricValue}>{progress?.bestMockExamV2Percent ?? 0}%</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Kỹ năng yếu</Text>
              <Text style={styles.metricValueSmall}>{progress?.weakestSkill ? SKILL_TITLES[progress.weakestSkill] : '—'}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.rowCard} onPress={() => navigation.navigate('BJTReview', { level: targetLevel })}>
            <View style={styles.iconBox}>
              <Ionicons name="refresh-circle-outline" size={18} color={Colors.primary} />
            </View>
            <View style={styles.flex}>
              <Text style={styles.cardTitle}>Ôn lỗi gần đây</Text>
              <Text style={styles.cardBody}>
                {wrongReviewCount > 0 ? `${wrongReviewCount} câu sai gần đây cần ôn lại` : 'Chưa có câu sai gần đây'}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
          </TouchableOpacity>
        </Section>

        {/* Gợi ý tiếp theo */}
        <Section title="Nên làm gì tiếp theo">
          <View style={styles.card}>
            {levelRecommendation ? (
              <>
                <View style={styles.rowInCard}>
                  <View style={styles.iconBox}>
                    <Ionicons name="compass-outline" size={18} color={Colors.primary} />
                  </View>
                  <View style={styles.flex}>
                    <Text style={styles.cardTitle}>{levelRecommendation.title}</Text>
                    <Text style={styles.cardBody}>{levelRecommendation.description}</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.pill} onPress={() => openRoute(levelRecommendation.route)}>
                  <Text style={styles.pillText}>{levelRecommendation.actionLabel} ({LEVEL_LABELS[targetLevel]})</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.cardTitle}>Bắt đầu từ nền tảng</Text>
                <Text style={styles.cardBody}>Mở gói từ vựng trước, rồi luyện tình huống để app nhận ra kỹ năng yếu nhất.</Text>
                <TouchableOpacity style={styles.pill} onPress={() => navigation.navigate('BJTVocabulary')}>
                  <Text style={styles.pillText}>Mở gói từ vựng</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </Section>

        {/* Luyện ngay */}
        <Section title="Luyện ngay">
          <TouchableOpacity style={styles.moduleCard} onPress={() => navigation.navigate('BJTVocabulary')}>
            <Ionicons name="library-outline" size={20} color={Colors.primary} />
            <View style={styles.flex}>
              <Text style={styles.moduleTitle}>Gói từ vựng</Text>
              <Text style={styles.cardBody}>Từ vựng business theo chủ đề email, họp, báo cáo và điều phối.</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.moduleCard} onPress={() => navigation.navigate('BJTQuiz', { level: targetLevel })}>
            <Ionicons name="help-circle-outline" size={20} color={Colors.primary} />
            <View style={styles.flex}>
              <Text style={styles.moduleTitle}>Luyện tình huống</Text>
              <Text style={styles.cardBody}>Câu hỏi tình huống theo hướng BJT, ưu tiên level đang chọn.</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.moduleCard} onPress={() => navigation.navigate('BJTMockTest', { level: targetLevel })}>
            <Ionicons name="timer-outline" size={20} color={Colors.primary} />
            <View style={styles.flex}>
              <Text style={styles.moduleTitle}>Mock có giờ</Text>
              <Text style={styles.cardBody}>Phiên luyện có đếm giờ, chấm theo kỹ năng và review lỗi.</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
          </TouchableOpacity>
        </Section>

        {/* Tài liệu BJT — grid 2 cột */}
        <Section title="Tài liệu BJT">
          <View style={styles.toolGrid}>
            {TOOLS.map((tool) => (
              <TouchableOpacity
                key={tool.route}
                style={styles.toolCell}
                onPress={() => navigation.navigate(tool.route as any)}
              >
                <Ionicons name={tool.icon as any} size={22} color={Colors.primary} />
                <Text style={styles.toolLabel}>{tool.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Section>

        {/* Kế hoạch 14 ngày */}
        <Section title="Kế hoạch 14 ngày">
          {BJT_STUDY_PLAN.map((day) => (
            <View key={day.day} style={styles.planCard}>
              <View style={styles.planDay}>
                <Text style={styles.planDayText}>{day.day}</Text>
              </View>
              <View style={styles.flex}>
                <Text style={styles.cardTitle}>{day.theme}</Text>
                <Text style={styles.cardBody}>{day.goal}</Text>
                {day.tasks.map((task) => (
                  <View key={task} style={styles.taskRow}>
                    <Ionicons name="remove" size={12} color={Colors.textMuted} />
                    <Text style={styles.taskText}>{task}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </Section>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { paddingBottom: 108 },
  contentTablet: {
    width: '100%',
    maxWidth: 960,
    alignSelf: 'center',
  },

  /* Hero */
  hero: {
    backgroundColor: Colors.primaryDark,
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 22,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  heroBadge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.14)',
  },
  heroBadgeText: { color: Colors.white, fontSize: 12, fontWeight: '700' },
  heroTitle: { marginTop: 12, fontSize: 26, fontWeight: '800', color: Colors.white },
  heroSubtitle: { marginTop: 6, fontSize: 13, lineHeight: 19, color: 'rgba(255,255,255,0.8)' },
  primaryButton: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 14,
    paddingVertical: 12,
    backgroundColor: Colors.primary,
  },
  primaryButtonText: { color: Colors.white, fontSize: 14, fontWeight: '800' },

  /* Section */
  section: { paddingHorizontal: 16, marginTop: 20 },
  sectionTitle: { fontSize: 17, fontWeight: '800', color: Colors.textPrimary, marginBottom: 10 },

  /* Card */
  card: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 10,
  },
  cardLabel: { fontSize: 11, fontWeight: '800', color: Colors.textMuted, textTransform: 'uppercase', marginBottom: 10 },
  cardTitle: { fontSize: 14, fontWeight: '800', color: Colors.textPrimary, marginBottom: 4 },
  cardBody: { flex: 1, fontSize: 12, lineHeight: 18, color: Colors.textSecondary },

  /* Level chips */
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { paddingHorizontal: 12, paddingVertical: 7, borderRadius: 999, borderWidth: 1, borderColor: Colors.border, backgroundColor: Colors.background },
  chipActive: { borderColor: Colors.primary, backgroundColor: Colors.accent },
  chipText: { fontSize: 12, fontWeight: '700', color: Colors.textSecondary },
  chipTextActive: { color: Colors.primary },

  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: Colors.border },
  summaryLabel: { fontSize: 12, fontWeight: '700', color: Colors.textSecondary },
  summaryValue: { fontSize: 12, color: Colors.textPrimary },

  guidanceBox: { marginTop: 12, backgroundColor: Colors.background, borderRadius: 12, padding: 12 },
  guidanceTitle: { fontSize: 13, fontWeight: '800', color: Colors.textPrimary, marginBottom: 4 },
  guidanceBody: { fontSize: 12, lineHeight: 18, color: Colors.textSecondary },

  /* Pill button */
  pill: {
    alignSelf: 'flex-start',
    marginTop: 12,
    borderRadius: 999,
    backgroundColor: Colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  pillText: { color: Colors.white, fontSize: 12, fontWeight: '700' },

  /* Metrics */
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 10 },
  metricCard: {
    width: '47%',
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  metricLabel: { fontSize: 11, fontWeight: '700', color: Colors.textSecondary, marginBottom: 6 },
  metricValue: { fontSize: 22, fontWeight: '800', color: Colors.textPrimary },
  metricValueSmall: { fontSize: 16, fontWeight: '800', color: Colors.textPrimary },

  /* Row cards */
  rowCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  rowInCard: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  iconBox: { width: 34, height: 34, borderRadius: 10, backgroundColor: Colors.accent, alignItems: 'center', justifyContent: 'center' },
  flex: { flex: 1 },

  /* Module cards */
  moduleCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 8,
  },
  moduleTitle: { fontSize: 14, fontWeight: '800', color: Colors.textPrimary, marginBottom: 2 },

  /* Tool grid */
  toolGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  toolCell: {
    width: '47%',
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'flex-start',
    gap: 8,
  },
  toolLabel: { fontSize: 12, fontWeight: '700', color: Colors.textPrimary, lineHeight: 17 },

  /* Study plan */
  planCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  planDay: { width: 32, height: 32, borderRadius: 16, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center', marginTop: 2 },
  planDayText: { color: Colors.white, fontSize: 13, fontWeight: '800' },
  taskRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 6, marginTop: 4 },
  taskText: { flex: 1, fontSize: 11, lineHeight: 17, color: Colors.textSecondary },
});
