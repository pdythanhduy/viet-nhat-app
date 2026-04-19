import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '../constants/colors';
import { BJT_PRACTICE_QUESTIONS } from '../constants/content';
import { RootStackParamList } from '../navigation/AppNavigator';
import { BjtSkill, loadBjtProgress, recordBjtScenarioPractice } from '../utils/bjtProgress';
import {
  BjtTargetLevel,
  filterBjtQuestionsByLevel,
  getAvailableBjtLevels,
  getBjtQuestionLevel,
} from '../utils/bjtQuestionLevels';

const FILTERS = [
  { id: 'all', label: 'Tất cả' },
  { id: 'listening', label: 'Nghe' },
  { id: 'listening-reading', label: 'Nghe + Đọc' },
  { id: 'reading', label: 'Đọc' },
] as const;

type FilterId = (typeof FILTERS)[number]['id'];

const DIFFICULTY_LABELS = {
  basic: 'Cơ bản',
  intermediate: 'Trung cấp',
  advanced: 'Nâng cao',
} as const;

const SKILL_LABELS: Record<BjtSkill, string> = {
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

function buildScenarioSkillBreakdown(
  questions: typeof BJT_PRACTICE_QUESTIONS,
  wrongQuestionIds: string[],
  latestQuestionId: string,
  latestWasCorrect: boolean
): Record<BjtSkill, { correct: number; total: number }> {
  const result: Record<BjtSkill, { correct: number; total: number }> = {
    listening: { correct: 0, total: 0 },
    'listening-reading': { correct: 0, total: 0 },
    reading: { correct: 0, total: 0 },
  };

  const wrongSet = new Set(wrongQuestionIds);
  if (!latestWasCorrect) {
    wrongSet.add(latestQuestionId);
  }

  for (const question of questions) {
    result[question.skill].total += 1;
    if (!wrongSet.has(question.id)) {
      result[question.skill].correct += 1;
    }
  }

  return result;
}

export default function BJTQuizScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'BJTQuiz'>>();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const bottomContentPadding = 28 + Math.max(insets.bottom, 12) + 20;
  const [level, setLevel] = useState<BjtTargetLevel>(route.params?.level ?? 'J3');
  const [filter, setFilter] = useState<FilterId>('all');
  const [adaptiveSkill, setAdaptiveSkill] = useState<BjtSkill | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [wrongQuestionIds, setWrongQuestionIds] = useState<string[]>([]);

  useEffect(() => {
    loadBjtProgress().then((progress) => {
      setAdaptiveSkill(progress.weakestSkill ?? null);
    });
  }, []);

  const availableLevels = useMemo(() => getAvailableBjtLevels(BJT_PRACTICE_QUESTIONS), []);

  const questions = useMemo(() => {
    const shuffle = <T,>(items: T[]) => {
      const next = [...items];
      for (let i = next.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [next[i], next[j]] = [next[j], next[i]];
      }
      return next;
    };

    const scopedQuestions = filterBjtQuestionsByLevel(BJT_PRACTICE_QUESTIONS, level);

    if (filter !== 'all') {
      return shuffle(scopedQuestions.filter((item) => item.skill === filter));
    }

    if (!adaptiveSkill) {
      return shuffle(scopedQuestions);
    }

    const focused = shuffle(scopedQuestions.filter((item) => item.skill === adaptiveSkill));
    const remaining = shuffle(scopedQuestions.filter((item) => item.skill !== adaptiveSkill));
    return [...focused, ...remaining];
  }, [adaptiveSkill, filter, level]);

  const currentQuestion = questions[currentIndex];
  const answered = selectedIndex !== null;

  const reset = (nextFilter?: FilterId, nextLevel?: BjtTargetLevel) => {
    if (nextFilter) setFilter(nextFilter);
    if (nextLevel) setLevel(nextLevel);
    setCurrentIndex(0);
    setSelectedIndex(null);
    setScore(0);
    setDone(false);
    setWrongQuestionIds([]);
  };

  if (questions.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.center}>
          <Text style={styles.emptyText}>Chưa có câu hỏi cho level này.</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (done) {
    const percent = Math.round((score / questions.length) * 100);
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
        <View style={styles.summary}>
          <Text style={styles.summaryTitle}>Hoàn thành BJT Practice</Text>
          <Text style={styles.summarySub}>
            {score}/{questions.length} câu đúng
          </Text>
          <Text style={styles.summaryPercent}>{percent}%</Text>
          <Text style={styles.summaryNote}>
            Level tập trung: {LEVEL_LABELS[level]}. Bộ câu hỏi này là nội dung tự biên soạn theo hướng BJT.
          </Text>
          <TouchableOpacity style={styles.primaryButton} onPress={() => reset()}>
            <Text style={styles.primaryButtonText}>Làm lại</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const progressPercent = ((currentIndex + 1) / questions.length) * 100;
  const currentQuestionLevel = getBjtQuestionLevel(currentQuestion);

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
        <Text style={styles.title}>Luyện tình huống BJT</Text>
        <Text style={styles.subtitle}>
          Luyện theo từng skill và từng level. Mặc định đang ưu tiên J3 để bám vào nhóm câu đã được review kỹ.
        </Text>

        {filter === 'all' && adaptiveSkill ? (
          <View style={styles.infoCard}>
            <Ionicons name="pulse-outline" size={16} color={Colors.primary} />
            <Text style={styles.infoText}>
              Đang ưu tiên kỹ năng yếu nhất: {adaptiveSkill ? SKILL_LABELS[adaptiveSkill] : ''}.
            </Text>
          </View>
        ) : null}

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
          {availableLevels.map((item) => {
            const active = item === level;
            return (
              <TouchableOpacity
                key={item}
                style={[styles.chip, active && styles.chipActive]}
                onPress={() => reset(undefined, item)}
              >
                <Text style={[styles.chipText, active && styles.chipTextActive]}>
                  {LEVEL_LABELS[item]}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
          {FILTERS.map((item) => {
            const active = item.id === filter;
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.chip, active && styles.chipActive]}
                onPress={() => reset(item.id)}
              >
                <Text style={[styles.chipText, active && styles.chipTextActive]}>{item.label}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.counterRow}>
          <Text style={styles.counter}>
            Câu {currentIndex + 1} / {questions.length}
          </Text>
          <Text style={styles.counter}>
            {LEVEL_LABELS[level]} · {score} đúng
          </Text>
        </View>

        <View style={styles.questionCard}>
          <View style={styles.headerRow}>
            <Text style={styles.questionTitle}>{currentQuestion.title}</Text>
            <View style={styles.badges}>
              <View style={styles.skillBadge}>
                <Text style={styles.skillBadgeText}>{SKILL_LABELS[currentQuestion.skill]}</Text>
              </View>
              <View style={styles.difficultyBadge}>
                <Text style={styles.difficultyBadgeText}>
                  {DIFFICULTY_LABELS[currentQuestion.difficulty]}
                </Text>
              </View>
              <View style={styles.levelBadge}>
                <Text style={styles.levelBadgeText}>{currentQuestionLevel}</Text>
              </View>
            </View>
          </View>
          <Text style={styles.situation}>{currentQuestion.situation}</Text>
          <Text style={styles.prompt}>{currentQuestion.prompt}</Text>
        </View>

        <View style={styles.options}>
          {currentQuestion.options.map((option, index) => {
            const isCorrect = index === currentQuestion.correctIndex;
            const isSelected = index === selectedIndex;
            return (
              <TouchableOpacity
                key={`${currentQuestion.id}-${index}`}
                style={[
                  styles.option,
                  answered && isCorrect ? styles.optionCorrect : null,
                  answered && isSelected && !isCorrect ? styles.optionWrong : null,
                ]}
                disabled={answered}
                onPress={() => {
                  setSelectedIndex(index);
                  if (isCorrect) {
                    setScore((prev) => prev + 1);
                  } else {
                    setWrongQuestionIds((prev) => [...prev, currentQuestion.id]);
                  }
                }}
              >
                <Text style={styles.optionText}>{option}</Text>
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
            <Text style={styles.explanationTitle}>Giải thích</Text>
            <Text style={styles.explanationText}>{currentQuestion.explanation}</Text>
          </View>
        ) : null}

        {answered ? (
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => {
              if (currentIndex + 1 >= questions.length) {
                const latestWasCorrect = selectedIndex === currentQuestion.correctIndex;
                const finalWrongQuestionIds = latestWasCorrect
                  ? wrongQuestionIds
                  : [...wrongQuestionIds, currentQuestion.id];
                void recordBjtScenarioPractice({
                  level,
                  answered: questions.length,
                  correct: score + (latestWasCorrect ? 1 : 0),
                  skillBreakdown: buildScenarioSkillBreakdown(
                    questions,
                    finalWrongQuestionIds,
                    currentQuestion.id,
                    latestWasCorrect
                  ),
                  wrongQuestions: finalWrongQuestionIds.map((questionId) => {
                    const question = questions.find((item) => item.id === questionId)!;
                    return { questionId, skill: question.skill };
                  }),
                });
                setDone(true);
                return;
              }

              setCurrentIndex((prev) => prev + 1);
              setSelectedIndex(null);
            }}
          >
            <Text style={styles.primaryButtonText}>
              {currentIndex + 1 >= questions.length ? 'Xem kết quả' : 'Câu tiếp theo'}
            </Text>
          </TouchableOpacity>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 16, paddingBottom: 28 },
  contentTablet: {
    width: '100%',
    maxWidth: 900,
    alignSelf: 'center',
  },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 14, color: Colors.textSecondary },
  progressTrack: { height: 6, backgroundColor: Colors.border, overflow: 'hidden' },
  progressFill: { height: 6, backgroundColor: Colors.primary },
  title: { fontSize: 24, fontWeight: '800', color: Colors.textPrimary },
  subtitle: { marginTop: 8, fontSize: 13, lineHeight: 19, color: Colors.textSecondary },
  infoCard: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 12,
    backgroundColor: Colors.accent,
    padding: 12,
  },
  infoText: { flex: 1, fontSize: 12, lineHeight: 18, color: Colors.primaryDark },
  chips: { gap: 8, paddingTop: 14, paddingBottom: 8, paddingRight: 12 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  chipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  chipText: { fontSize: 12, fontWeight: '700', color: Colors.textPrimary },
  chipTextActive: { color: Colors.white },
  counterRow: {
    marginTop: 8,
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
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: Colors.accent,
  },
  skillBadgeText: { fontSize: 11, fontWeight: '700', color: Colors.primary },
  difficultyBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: Colors.warningLight,
  },
  difficultyBadgeText: { fontSize: 11, fontWeight: '700', color: '#B26A00' },
  levelBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: Colors.primaryLight,
  },
  levelBadgeText: { fontSize: 11, fontWeight: '700', color: Colors.white },
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
  optionCorrect: { backgroundColor: Colors.successLight, borderColor: Colors.success },
  optionWrong: { backgroundColor: Colors.dangerLight, borderColor: Colors.danger },
  optionText: { flex: 1, fontSize: 13, lineHeight: 19, color: Colors.textPrimary },
  explanationCard: {
    marginTop: 14,
    backgroundColor: Colors.accent,
    borderRadius: 14,
    padding: 14,
  },
  explanationTitle: { fontSize: 13, fontWeight: '800', color: Colors.primaryDark, marginBottom: 6 },
  explanationText: { fontSize: 12, lineHeight: 18, color: Colors.primaryDark },
  primaryButton: {
    marginTop: 14,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    alignItems: 'center',
  },
  primaryButtonText: { color: Colors.white, fontSize: 14, fontWeight: '800' },
  summary: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  summaryTitle: { fontSize: 24, fontWeight: '800', color: Colors.textPrimary },
  summarySub: { marginTop: 8, fontSize: 14, color: Colors.textSecondary },
  summaryPercent: { marginTop: 12, fontSize: 36, fontWeight: '800', color: Colors.primary },
  summaryNote: { marginTop: 12, fontSize: 12, lineHeight: 18, color: Colors.textSecondary, textAlign: 'center' },
});
