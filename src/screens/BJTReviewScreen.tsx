import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '../constants/colors';
import { BJT_MOCK_V2_EXAMS, BJT_PRACTICE_QUESTIONS } from '../constants/content';
import { RootStackParamList } from '../navigation/AppNavigator';
import { BjtTargetLevel, getAvailableBjtLevels, getBjtQuestionLevel } from '../utils/bjtQuestionLevels';
import { clearBjtWrongQuestions, loadBjtProgress } from '../utils/bjtProgress';

const DIFFICULTY_LABELS = {
  basic: 'Cơ bản',
  intermediate: 'Trung cấp',
  advanced: 'Nâng cao',
} as const;

const LEVEL_LABELS: Record<BjtTargetLevel, string> = {
  all: 'Tất cả',
  J5: 'J5',
  J4: 'J4',
  J3: 'J3',
  J2: 'J2',
  J1: 'J1',
  'J1+': 'J1+',
};

const SOURCE_LABELS = {
  all: 'Tất cả',
  mock: 'Tình huống / Mock',
  'mock-v2': '50 đề',
} as const;

type ReviewSourceFilter = keyof typeof SOURCE_LABELS;

type ReviewItem = {
  id: string;
  source: 'scenario' | 'mock' | 'mock-v2';
  level: string;
  title: string;
  subtitle: string;
  prompt: string;
  explanation: string;
  kindLabel: string;
  options: Array<{ label: string; value: string; correct: boolean }>;
};

export default function BJTReviewScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'BJTReview'>>();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const bottomContentPadding = Math.max(insets.bottom, 16) + 24;
  const [level, setLevel] = useState<BjtTargetLevel>(route.params?.level ?? 'J3');
  const [sourceFilter, setSourceFilter] = useState<ReviewSourceFilter>('all');
  const [wrongIds, setWrongIds] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const [resolvedIds, setResolvedIds] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  const availableLevels = useMemo(() => getAvailableBjtLevels(BJT_PRACTICE_QUESTIONS), []);
  const mockV2QuestionMap = useMemo(() => {
    const map = new Map<string, (typeof BJT_MOCK_V2_EXAMS)[number]['questions'][number]>();
    for (const exam of BJT_MOCK_V2_EXAMS) {
      for (const question of exam.questions) {
        map.set(question.id, question);
      }
    }
    return map;
  }, []);

  const reloadWrongIds = React.useCallback(async () => {
    const progress = await loadBjtProgress();
    const filteredIds = progress.recentWrongQuestions
      .filter((item) => (level === 'all' ? true : item.level === level))
      .map((item) => item.questionId);
    setWrongIds(filteredIds);
  }, [level]);

  useEffect(() => {
    void reloadWrongIds();
  }, [reloadWrongIds]);

  const allQuestions = useMemo(() => {
    return wrongIds
      .map((id) => {
        const legacy = BJT_PRACTICE_QUESTIONS.find((item) => item.id === id);
        if (legacy) {
          return {
            id: legacy.id,
            source: 'mock' as const,
            level: getBjtQuestionLevel(legacy),
            title: legacy.title,
            subtitle: `${legacy.skill} • ${DIFFICULTY_LABELS[legacy.difficulty]}`,
            prompt: legacy.prompt,
            explanation: legacy.explanation,
            kindLabel: 'Scenario / Timed Mock',
            options: legacy.options.map((option, index) => ({
              label: String.fromCharCode(65 + index),
              value: option,
              correct: index === legacy.correctIndex,
            })),
          } satisfies ReviewItem;
        }

        const mockV2 = mockV2QuestionMap.get(id);
        if (mockV2) {
          return {
            id: mockV2.id,
            source: 'mock-v2' as const,
            level: mockV2.level,
            title: `${mockV2.partName} • ${mockV2.level}`,
            subtitle: `Mock Exams V2 • Part ${mockV2.part}`,
            prompt: `${mockV2.passageJp}\n\n${mockV2.questionJp}`,
            explanation: mockV2.explanation || 'File gốc không cung cấp giải thích cho câu này.',
            kindLabel: '50 Mock Exams',
            options: mockV2.options.map((option) => ({
              label: option.label,
              value: option.text,
              correct: option.label === mockV2.answer,
            })),
          } satisfies ReviewItem;
        }

        return null;
      })
      .filter(Boolean) as ReviewItem[];
  }, [mockV2QuestionMap, wrongIds]);

  const questions = useMemo(
    () =>
      sourceFilter === 'all'
        ? allQuestions
        : allQuestions.filter((item) => item.source === sourceFilter),
    [allQuestions, sourceFilter]
  );

  const currentQuestion = questions[currentIndex];
  const answered = selectedLabel !== null;

  const resetReview = (nextLevel?: BjtTargetLevel) => {
    if (nextLevel) {
      setLevel(nextLevel);
    }
    setCurrentIndex(0);
    setSelectedLabel(null);
    setResolvedIds([]);
    setDone(false);
  };

  if (questions.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
        <ScrollView contentContainerStyle={styles.emptyWrap}>
          <Text style={styles.title}>Ôn lỗi</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips} style={styles.chipsRow}>
            {availableLevels.map((item) => {
              const active = item === level;
              return (
                <TouchableOpacity
                  key={item}
                  style={[styles.chip, active && styles.chipActive]}
                  onPress={() => resetReview(item)}
                >
                  <Text style={[styles.chipText, active && styles.chipTextActive]}>
                    {LEVEL_LABELS[item]}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips} style={styles.chipsRow}>
            {(Object.keys(SOURCE_LABELS) as ReviewSourceFilter[]).map((item) => {
              const active = item === sourceFilter;
              return (
                <TouchableOpacity
                  key={item}
                  style={[styles.chip, active && styles.chipActive]}
                  onPress={() => {
                    setSourceFilter(item);
                    setCurrentIndex(0);
                    setSelectedLabel(null);
                    setResolvedIds([]);
                    setDone(false);
                  }}
                >
                  <Text style={[styles.chipText, active && styles.chipTextActive]}>
                    {SOURCE_LABELS[item]}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <Ionicons name="checkmark-circle-outline" size={36} color={Colors.success} />
          <Text style={styles.emptyTitle}>Không còn câu sai cho level này</Text>
          <Text style={styles.emptyText}>
            Chế độ ôn lỗi chỉ hiển thị các câu sai gần đây của level {LEVEL_LABELS[level]} theo nguồn {SOURCE_LABELS[sourceFilter]}.
          </Text>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (done) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
        <View style={styles.summary}>
          <Text style={styles.summaryTitle}>Hoàn thành ôn lỗi</Text>
          <Text style={styles.summaryText}>
            Đã gỡ {resolvedIds.length} câu ra khỏi danh sách lỗi của {LEVEL_LABELS[level]}.
          </Text>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={async () => {
              await clearBjtWrongQuestions(resolvedIds);
              await reloadWrongIds();
              resetReview();
            }}
          >
            <Text style={styles.primaryButtonText}>Cập nhật danh sách lỗi</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (!currentQuestion) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
        <View style={styles.summary}>
          <Text style={styles.summaryTitle}>Không tìm thấy câu hỏi để ôn</Text>
          <Text style={styles.summaryText}>Danh sách lỗi hiện tại không khớp với nội dung ôn.</Text>
          <TouchableOpacity style={styles.primaryButton} onPress={() => resetReview()}>
            <Text style={styles.primaryButtonText}>Tải lại</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const progressPercent = ((currentIndex + 1) / questions.length) * 100;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
      </View>
      <ScrollView
        style={styles.container}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: bottomContentPadding },
          isTablet && styles.contentTablet,
        ]}
      >
        <Text style={styles.title}>Ôn lỗi</Text>
        <Text style={styles.subtitle}>
          Chế độ ôn lỗi tổng hợp câu sai từ Luyện tình huống, Mock có giờ và 50 đề. Câu nào làm đúng trong lúc ôn sẽ được gỡ khỏi danh sách lỗi.
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
          {availableLevels.map((item) => {
            const active = item === level;
            return (
              <TouchableOpacity
                key={item}
                style={[styles.chip, active && styles.chipActive]}
                onPress={() => resetReview(item)}
              >
                <Text style={[styles.chipText, active && styles.chipTextActive]}>
                  {LEVEL_LABELS[item]}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsCompact}>
          {(Object.keys(SOURCE_LABELS) as ReviewSourceFilter[]).map((item) => {
            const active = item === sourceFilter;
            return (
              <TouchableOpacity
                key={item}
                style={[styles.chip, active && styles.chipActive]}
                onPress={() => {
                  setSourceFilter(item);
                  setCurrentIndex(0);
                  setSelectedLabel(null);
                  setResolvedIds([]);
                  setDone(false);
                }}
              >
                <Text style={[styles.chipText, active && styles.chipTextActive]}>
                  {SOURCE_LABELS[item]}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.counterRow}>
          <Text style={styles.counter}>
            Cau {currentIndex + 1} / {questions.length}
          </Text>
          <Text style={styles.counter}>
            {LEVEL_LABELS[level]} • {SOURCE_LABELS[sourceFilter]} • Da sua {resolvedIds.length}
          </Text>
        </View>

        <View style={styles.questionCard}>
          <View style={styles.headerRow}>
            <Text style={styles.questionTitle}>{currentQuestion.title}</Text>
            <View style={styles.badges}>
              <View style={styles.skillBadge}>
                <Text style={styles.skillBadgeText}>{currentQuestion.kindLabel}</Text>
              </View>
              <View style={styles.levelBadge}>
                <Text style={styles.levelBadgeText}>{currentQuestion.level}</Text>
              </View>
            </View>
          </View>
          <Text style={styles.situation}>{currentQuestion.subtitle}</Text>
          <Text style={styles.prompt}>{currentQuestion.prompt}</Text>
        </View>

        <View style={styles.options}>
          {currentQuestion.options.map((option) => {
            const isCorrect = option.correct;
            const isSelected = option.label === selectedLabel;
            return (
              <TouchableOpacity
                key={`${currentQuestion.id}-${option.label}`}
                style={[
                  styles.option,
                  answered && isCorrect ? styles.optionCorrect : null,
                  answered && isSelected && !isCorrect ? styles.optionWrong : null,
                ]}
                disabled={answered}
                onPress={() => {
                  setSelectedLabel(option.label);
                  if (isCorrect && !resolvedIds.includes(currentQuestion.id)) {
                    setResolvedIds((prev) => [...prev, currentQuestion.id]);
                  }
                }}
              >
                <Text style={styles.optionText}>
                  {option.label}. {option.value}
                </Text>
                {answered && isCorrect ? (
                  <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
                ) : null}
                {answered && isSelected && !isCorrect ? (
                  <Ionicons name="close-circle" size={20} color={Colors.danger} />
                ) : null}
              </TouchableOpacity>
            );
          })}
        </View>

        {answered ? (
          <View style={styles.explanationCard}>
            <Text style={styles.explanationTitle}>Giai thich</Text>
            <Text style={styles.explanationText}>{currentQuestion.explanation}</Text>
          </View>
        ) : null}

        {answered ? (
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => {
              if (currentIndex + 1 >= questions.length) {
                setDone(true);
                return;
              }
              setCurrentIndex((prev) => prev + 1);
              setSelectedLabel(null);
            }}
          >
            <Text style={styles.primaryButtonText}>
              {currentIndex + 1 >= questions.length ? 'Hoàn thành ôn lỗi' : 'Câu tiếp theo'}
            </Text>
          </TouchableOpacity>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 16, flexGrow: 1 },
  contentTablet: {
    width: '100%',
    maxWidth: 900,
    alignSelf: 'center',
  },
  progressTrack: { height: 6, backgroundColor: Colors.border, overflow: 'hidden' },
  progressFill: { height: 6, backgroundColor: Colors.primary },
  title: { fontSize: 24, fontWeight: '800', color: Colors.textPrimary },
  subtitle: { marginTop: 8, fontSize: 13, lineHeight: 19, color: Colors.textSecondary },
  chips: { gap: 8, paddingTop: 10, paddingBottom: 6, paddingRight: 12, alignItems: 'flex-start' },
  chipsCompact: { gap: 8, paddingTop: 4, paddingBottom: 6, paddingRight: 12, alignItems: 'flex-start' },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  chipText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    textAlign: 'center',
    includeFontPadding: false,
  },
  chipTextActive: { color: Colors.white },
  counterRow: {
    marginTop: 14,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    flexWrap: 'wrap',
  },
  counter: { fontSize: 13, fontWeight: '700', color: Colors.textSecondary, flexShrink: 1 },
  questionCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' },
  badges: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 6 },
  questionTitle: { flex: 1, fontSize: 16, fontWeight: '800', color: Colors.textPrimary },
  skillBadge: {
    alignSelf: 'flex-start',
    minHeight: 30,
    minWidth: 96,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skillBadgeText: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '700',
    color: Colors.primary,
    textAlign: 'center',
    includeFontPadding: false,
  },
  levelBadge: {
    alignSelf: 'flex-start',
    minHeight: 30,
    minWidth: 52,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelBadgeText: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '700',
    color: Colors.white,
    textAlign: 'center',
    includeFontPadding: false,
  },
  situation: { marginTop: 10, fontSize: 13, lineHeight: 20, color: Colors.textSecondary },
  prompt: { marginTop: 12, fontSize: 15, lineHeight: 22, fontWeight: '700', color: Colors.textPrimary },
  options: { marginTop: 14, gap: 10 },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    padding: 14,
    backgroundColor: Colors.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  optionCorrect: {
    borderColor: Colors.success,
    backgroundColor: '#EAF9EE',
  },
  optionWrong: {
    borderColor: Colors.danger,
    backgroundColor: '#FFF1F1',
  },
  optionText: { flex: 1, fontSize: 14, lineHeight: 20, color: Colors.textPrimary },
  explanationCard: {
    marginTop: 14,
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  explanationTitle: { fontSize: 15, fontWeight: '800', color: Colors.textPrimary },
  explanationText: { marginTop: 8, fontSize: 13, lineHeight: 20, color: Colors.textSecondary },
  primaryButton: {
    marginTop: 18,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    alignItems: 'center',
  },
  primaryButtonText: { color: Colors.white, fontSize: 14, fontWeight: '800' },
  emptyWrap: {
    flexGrow: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  chipsRow: { alignSelf: 'stretch' },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 13,
    lineHeight: 20,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  summary: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryTitle: { fontSize: 24, fontWeight: '800', color: Colors.textPrimary, textAlign: 'center' },
  summaryText: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 22,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});
