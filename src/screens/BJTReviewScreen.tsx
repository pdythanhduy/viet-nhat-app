import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '../constants/colors';
import { BJT_PRACTICE_QUESTIONS } from '../constants/content';
import { RootStackParamList } from '../navigation/AppNavigator';
import { BjtTargetLevel, getAvailableBjtLevels, getBjtQuestionLevel } from '../utils/bjtQuestionLevels';
import { clearBjtWrongQuestions, loadBjtProgress } from '../utils/bjtProgress';

const DIFFICULTY_LABELS = {
  basic: 'Basic',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
} as const;

const LEVEL_LABELS: Record<BjtTargetLevel, string> = {
  all: 'Tat ca',
  J5: 'J5',
  J4: 'J4',
  J3: 'J3',
  J2: 'J2',
  J1: 'J1',
  'J1+': 'J1+',
};

export default function BJTReviewScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'BJTReview'>>();
  const [level, setLevel] = useState<BjtTargetLevel>(route.params?.level ?? 'J3');
  const [wrongIds, setWrongIds] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [resolvedIds, setResolvedIds] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  const availableLevels = useMemo(() => getAvailableBjtLevels(BJT_PRACTICE_QUESTIONS), []);

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

  const questions = useMemo(
    () => BJT_PRACTICE_QUESTIONS.filter((item) => wrongIds.includes(item.id)),
    [wrongIds]
  );

  const currentQuestion = questions[currentIndex];
  const answered = selectedIndex !== null;

  const resetReview = (nextLevel?: BjtTargetLevel) => {
    if (nextLevel) {
      setLevel(nextLevel);
    }
    setCurrentIndex(0);
    setSelectedIndex(null);
    setResolvedIds([]);
    setDone(false);
  };

  if (questions.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
        <ScrollView contentContainerStyle={styles.emptyWrap}>
          <Text style={styles.title}>Review Wrong Answers</Text>
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
          <Ionicons name="checkmark-circle-outline" size={36} color={Colors.success} />
          <Text style={styles.emptyTitle}>Khong con cau sai cho level nay</Text>
          <Text style={styles.emptyText}>
            Review mode chi hien cac cau sai gan day cua level {LEVEL_LABELS[level]}.
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
          <Text style={styles.summaryTitle}>Hoan thanh review</Text>
          <Text style={styles.summaryText}>
            Da go {resolvedIds.length} cau ra khoi danh sach loi cua {LEVEL_LABELS[level]}.
          </Text>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={async () => {
              await clearBjtWrongQuestions(resolvedIds);
              await reloadWrongIds();
              resetReview();
            }}
          >
            <Text style={styles.primaryButtonText}>Cap nhat danh sach loi</Text>
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
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Review Wrong Answers</Text>
        <Text style={styles.subtitle}>
          On lai cac cau sai gan day theo level. Cau nao lam dung trong review se duoc go khoi danh sach loi.
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

        <View style={styles.counterRow}>
          <Text style={styles.counter}>
            Cau {currentIndex + 1} / {questions.length}
          </Text>
          <Text style={styles.counter}>
            {LEVEL_LABELS[level]} • Da sua: {resolvedIds.length}
          </Text>
        </View>

        <View style={styles.questionCard}>
          <View style={styles.headerRow}>
            <Text style={styles.questionTitle}>{currentQuestion.title}</Text>
            <View style={styles.badges}>
              <View style={styles.skillBadge}>
                <Text style={styles.skillBadgeText}>{currentQuestion.skill}</Text>
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
                  if (isCorrect && !resolvedIds.includes(currentQuestion.id)) {
                    setResolvedIds((prev) => [...prev, currentQuestion.id]);
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
              setSelectedIndex(null);
            }}
          >
            <Text style={styles.primaryButtonText}>
              {currentIndex + 1 >= questions.length ? 'Hoan thanh review' : 'Cau tiep theo'}
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
  progressTrack: { height: 6, backgroundColor: Colors.border, overflow: 'hidden' },
  progressFill: { height: 6, backgroundColor: Colors.primary },
  title: { fontSize: 24, fontWeight: '800', color: Colors.textPrimary },
  subtitle: { marginTop: 8, fontSize: 13, lineHeight: 19, color: Colors.textSecondary },
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
    marginTop: 14,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  counter: { fontSize: 13, fontWeight: '700', color: Colors.textSecondary },
  questionCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  badges: { alignItems: 'flex-end', gap: 6 },
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
  emptyWrap: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyTitle: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: '800',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  emptyText: {
    marginTop: 8,
    fontSize: 13,
    lineHeight: 19,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  summary: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  summaryTitle: { fontSize: 24, fontWeight: '800', color: Colors.textPrimary, textAlign: 'center' },
  summaryText: { marginTop: 8, fontSize: 14, lineHeight: 20, color: Colors.textSecondary, textAlign: 'center' },
});
