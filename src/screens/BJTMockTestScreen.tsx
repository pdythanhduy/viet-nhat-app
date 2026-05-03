import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '../constants/colors';
import { BJT_PRACTICE_QUESTIONS } from '../constants/content';
import { RootStackParamList } from '../navigation/AppNavigator';
import { BjtSkill, loadBjtProgress, recordBjtMockResult } from '../utils/bjtProgress';
import {
  BjtTargetLevel,
  filterBjtQuestionsByLevel,
  getAvailableBjtLevels,
  getBjtQuestionLevel,
} from '../utils/bjtQuestionLevels';

type SkillKey = BjtSkill;

interface AnswerRecord {
  questionId: string;
  selectedIndex: number;
  correct: boolean;
}

const TOTAL_SECONDS = 12 * 60;
const MOCK_CONFIG: Record<SkillKey, number> = {
  listening: 4,
  'listening-reading': 4,
  reading: 4,
};

const DIFFICULTY_LABELS = {
  basic: 'Cơ bản',
  intermediate: 'Trung cấp',
  advanced: 'Nâng cao',
} as const;

const SKILL_LABELS: Record<SkillKey, string> = {
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

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

function shuffle<T>(items: T[]) {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

export default function BJTMockTestScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'BJTMockTest'>>();
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const [level, setLevel] = useState<BjtTargetLevel>(route.params?.level ?? 'J3');
  const [adaptiveSkill, setAdaptiveSkill] = useState<BjtSkill | null>(null);
  const [timeLeft, setTimeLeft] = useState(TOTAL_SECONDS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    loadBjtProgress().then((progress) => {
      setAdaptiveSkill(progress.weakestSkill ?? null);
    });
  }, []);

  const availableLevels = useMemo(() => getAvailableBjtLevels(BJT_PRACTICE_QUESTIONS), []);

  const questions = useMemo(() => {
    const scoped = filterBjtQuestionsByLevel(BJT_PRACTICE_QUESTIONS, level);
    const counts: Record<SkillKey, number> = { ...MOCK_CONFIG };

    if (adaptiveSkill) {
      counts[adaptiveSkill] = 5;
      const otherSkills = (Object.keys(counts) as SkillKey[]).filter((skill) => skill !== adaptiveSkill);
      counts[otherSkills[0]] = 4;
      counts[otherSkills[1]] = 3;
    }

    const selected: typeof scoped = [];
    const usedIds = new Set<string>();

    for (const skill of Object.keys(counts) as SkillKey[]) {
      const primaryPool = shuffle(scoped.filter((item) => item.skill === skill));
      for (const question of primaryPool) {
        if (selected.filter((item) => item.skill === skill).length >= counts[skill]) break;
        if (usedIds.has(question.id)) continue;
        selected.push(question);
        usedIds.add(question.id);
      }

      if (selected.filter((item) => item.skill === skill).length < counts[skill]) {
        const fallbackPool = shuffle(
          BJT_PRACTICE_QUESTIONS.filter((item) => item.skill === skill && !usedIds.has(item.id))
        );

        for (const question of fallbackPool) {
          if (selected.filter((item) => item.skill === skill).length >= counts[skill]) break;
          selected.push(question);
          usedIds.add(question.id);
        }
      }
    }

    return shuffle(selected);
  }, [adaptiveSkill, level]);

  const buildSkillBreakdown = (records: AnswerRecord[]) =>
    questions.reduce<Record<SkillKey, { correct: number; total: number }>>(
      (acc, question) => {
        acc[question.skill].total += 1;
        if (records.some((item) => item.questionId === question.id && item.correct)) {
          acc[question.skill].correct += 1;
        }
        return acc;
      },
      {
        listening: { total: 0, correct: 0 },
        'listening-reading': { total: 0, correct: 0 },
        reading: { total: 0, correct: 0 },
      }
    );

  useEffect(() => {
    if (done) return;
    if (timeLeft <= 0) {
      void recordBjtMockResult({
        level,
        score: answers.filter((item) => item.correct).length,
        total: questions.length,
        skillBreakdown: buildSkillBreakdown(answers),
        wrongQuestions: answers
          .filter((item) => !item.correct)
          .map((item) => {
            const question = questions.find((entry) => entry.id === item.questionId)!;
            return { questionId: item.questionId, skill: question.skill };
          }),
      });
      setDone(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [answers, done, questions, timeLeft]);

  const currentQuestion = questions[currentIndex];
  const answered = selectedIndex !== null;

  const score = answers.filter((item) => item.correct).length;
  const skillStats = questions.reduce<Record<SkillKey, { total: number; correct: number }>>(
    (acc, question) => {
      acc[question.skill].total += 1;
      if (answers.some((item) => item.questionId === question.id && item.correct)) {
        acc[question.skill].correct += 1;
      }
      return acc;
    },
    {
      listening: { total: 0, correct: 0 },
      'listening-reading': { total: 0, correct: 0 },
      reading: { total: 0, correct: 0 },
    }
  );

  const wrongQuestions = questions.filter((question) =>
    answers.some((item) => item.questionId === question.id && !item.correct)
  );

  const reset = (nextLevel?: BjtTargetLevel) => {
    if (nextLevel) setLevel(nextLevel);
    setTimeLeft(TOTAL_SECONDS);
    setCurrentIndex(0);
    setSelectedIndex(null);
    setAnswers([]);
    setDone(false);
  };

  if (questions.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <View style={styles.center}>
          <Text style={styles.emptyText}>Chưa có đủ câu hỏi để tạo mock cho level này.</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (done) {
    const percent = Math.round((score / questions.length) * 100);
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
        <ScrollView style={styles.container} contentContainerStyle={[styles.summaryContent, isTablet && styles.contentTablet]}>
          <Text style={styles.summaryTitle}>Kết quả Mock Test</Text>
          <Text style={styles.summarySub}>
            {score}/{questions.length} câu đúng
          </Text>
          <Text style={styles.summaryPercent}>{percent}%</Text>
          <Text style={styles.summaryNote}>Level tập trung: {LEVEL_LABELS[level]}</Text>

          <View style={styles.statsGrid}>
            {([
              ['listening', 'Nghe'],
              ['listening-reading', 'Nghe + Đọc'],
              ['reading', 'Đọc'],
            ] as const).map(([key, label]) => (
              <View key={key} style={styles.statCard}>
                <Text style={styles.statLabel}>{label}</Text>
                <Text style={styles.statValue}>
                  {skillStats[key].correct}/{skillStats[key].total}
                </Text>
              </View>
            ))}
          </View>

          {wrongQuestions.length > 0 ? (
            <View style={styles.reviewCard}>
              <Text style={styles.reviewTitle}>Cần xem lại</Text>
              {wrongQuestions.map((question) => (
                <View key={question.id} style={styles.reviewItem}>
                  <Text style={styles.reviewSkill}>
                    {question.skill} · {getBjtQuestionLevel(question)}
                  </Text>
                  <Text style={styles.reviewQuestion}>{question.title}</Text>
                  <Text style={styles.reviewExplanation}>{question.explanation}</Text>
                </View>
              ))}
            </View>
          ) : null}

          <TouchableOpacity style={styles.primaryButton} onPress={() => reset()}>
            <Text style={styles.primaryButtonText}>Làm lại mock</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  const progressPercent = ((currentIndex + 1) / questions.length) * 100;
  const currentQuestionLevel = getBjtQuestionLevel(currentQuestion);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
      </View>

      <ScrollView style={styles.container} contentContainerStyle={[styles.content, isTablet && styles.contentTablet]}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.title}>Mock có giờ</Text>
            <Text style={styles.subtitle}>
              Mock có timer và chọn câu theo level. Mặc định đang tập trung vào J3.
            </Text>
          </View>
          <View style={[styles.timerCard, timeLeft <= 60 && styles.timerCardDanger]}>
            <Ionicons
              name="time-outline"
              size={16}
              color={timeLeft <= 60 ? Colors.danger : Colors.primary}
            />
            <Text style={[styles.timerText, timeLeft <= 60 && styles.timerTextDanger]}>
              {formatTime(timeLeft)}
            </Text>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
          {availableLevels.map((item) => {
            const active = item === level;
            return (
              <TouchableOpacity
                key={item}
                style={[styles.chip, active && styles.chipActive]}
                onPress={() => reset(item)}
              >
                <Text style={[styles.chipText, active && styles.chipTextActive]}>
                  {LEVEL_LABELS[item]}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.noticeCard}>
          <Ionicons name="information-circle-outline" size={18} color={Colors.primary} />
          <Text style={styles.noticeText}>
            Đây là mock nội bộ theo hướng BJT. Nếu level đang chọn không đủ câu trong một skill, app sẽ bổ
            sung bằng câu cùng skill từ bank hiện có.
          </Text>
        </View>

        {adaptiveSkill ? (
          <View style={styles.noticeCard}>
            <Ionicons name="pulse-outline" size={18} color={Colors.primary} />
            <Text style={styles.noticeText}>
              Mock đang tăng trọng số cho kỹ năng yếu nhất: {adaptiveSkill ? SKILL_LABELS[adaptiveSkill] : ''}.
            </Text>
          </View>
        ) : null}

        <View style={styles.counterRow}>
          <Text style={styles.counter}>
            Câu {currentIndex + 1} / {questions.length}
          </Text>
          <Text style={styles.counter}>
            {LEVEL_LABELS[level]} · Đúng: {score}
          </Text>
        </View>

        <View style={styles.questionCard}>
          <View style={styles.questionHeader}>
            <Text style={styles.questionTitle}>{currentQuestion.title}</Text>
            <View style={styles.questionBadges}>
              <View style={styles.skillChip}>
                <Text style={styles.skillChipText}>{SKILL_LABELS[currentQuestion.skill]}</Text>
              </View>
              <View style={styles.difficultyChip}>
                <Text style={styles.difficultyChipText}>
                  {DIFFICULTY_LABELS[currentQuestion.difficulty]}
                </Text>
              </View>
              <View style={styles.levelChip}>
                <Text style={styles.levelChipText}>{currentQuestionLevel}</Text>
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
                  setAnswers((prev) => [
                    ...prev,
                    {
                      questionId: currentQuestion.id,
                      selectedIndex: index,
                      correct: isCorrect,
                    },
                  ]);
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
                const finalScore = score + (selectedIndex === currentQuestion.correctIndex ? 1 : 0);
                const nextAnswers = [
                  ...answers.filter((item) => item.questionId !== currentQuestion.id),
                  {
                    questionId: currentQuestion.id,
                    selectedIndex: selectedIndex ?? -1,
                    correct: selectedIndex === currentQuestion.correctIndex,
                  },
                ];

                void recordBjtMockResult({
                  level,
                  score: finalScore,
                  total: questions.length,
                  skillBreakdown: buildSkillBreakdown(nextAnswers),
                  wrongQuestions: nextAnswers
                    .filter((item) => !item.correct)
                    .map((item) => {
                      const question = questions.find((entry) => entry.id === item.questionId)!;
                      return { questionId: item.questionId, skill: question.skill };
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
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 14, color: Colors.textSecondary },
  content: { padding: 16, paddingBottom: 108 },
  summaryContent: { padding: 16, paddingBottom: 108 },
  contentTablet: {
    width: '100%',
    maxWidth: 900,
    alignSelf: 'center',
  },
  progressTrack: { height: 6, backgroundColor: Colors.border, overflow: 'hidden' },
  progressFill: { height: 6, backgroundColor: Colors.primary },
  headerRow: { gap: 12, marginBottom: 12 },
  title: { fontSize: 24, fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold', color: Colors.textPrimary },
  subtitle: { marginTop: 8, fontSize: 13, lineHeight: 19, color: Colors.textSecondary },
  timerCard: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 999,
    backgroundColor: Colors.accent,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  timerCardDanger: { backgroundColor: Colors.dangerLight },
  timerText: { fontSize: 13, fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold', color: Colors.primary },
  timerTextDanger: { color: Colors.danger },
  chips: { gap: 8, paddingBottom: 10, paddingRight: 12 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  chipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  chipText: { fontSize: 12, fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold', color: Colors.textPrimary },
  chipTextActive: { color: Colors.white },
  noticeCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 10,
  },
  noticeText: { flex: 1, fontSize: 12, lineHeight: 18, color: Colors.textSecondary },
  counterRow: {
    marginTop: 4,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    flexWrap: 'wrap',
  },
  counter: { fontSize: 13, fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold', color: Colors.textSecondary, flexShrink: 1 },
  questionCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  questionHeader: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' },
  questionBadges: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 6 },
  questionTitle: { flex: 1, fontSize: 16, fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold', color: Colors.textPrimary },
  skillChip: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: Colors.accent,
  },
  skillChipText: { fontSize: 11, fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold', color: Colors.primary },
  difficultyChip: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: Colors.warningLight,
  },
  difficultyChipText: { fontSize: 11, fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold', color: '#B26A00' },
  levelChip: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: Colors.primaryLight,
  },
  levelChipText: { fontSize: 11, fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold', color: Colors.white },
  situation: { marginTop: 10, fontSize: 13, lineHeight: 20, color: Colors.textSecondary },
  prompt: { marginTop: 12, fontSize: 15, lineHeight: 22, fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold', color: Colors.textPrimary },
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
  explanationTitle: { fontSize: 13, fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold', color: Colors.primaryDark, marginBottom: 6 },
  explanationText: { fontSize: 12, lineHeight: 18, color: Colors.primaryDark },
  primaryButton: {
    marginTop: 14,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    alignItems: 'center',
  },
  primaryButtonText: { color: Colors.white, fontSize: 14, fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold' },
  summaryTitle: { fontSize: 24, fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold', color: Colors.textPrimary, textAlign: 'center' },
  summarySub: { marginTop: 8, fontSize: 14, color: Colors.textSecondary, textAlign: 'center' },
  summaryPercent: { marginTop: 12, fontSize: 36, fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold', color: Colors.primary, textAlign: 'center' },
  summaryNote: { marginTop: 12, fontSize: 12, lineHeight: 18, color: Colors.textSecondary, textAlign: 'center' },
  statsGrid: { flexDirection: 'row', gap: 10, marginTop: 16 },
  statCard: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  statLabel: { fontSize: 11, fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold', color: Colors.textSecondary, textAlign: 'center' },
  statValue: { marginTop: 8, fontSize: 22, fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold', color: Colors.textPrimary },
  reviewCard: {
    marginTop: 16,
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  reviewTitle: { fontSize: 15, fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold', color: Colors.textPrimary, marginBottom: 10 },
  reviewItem: { paddingTop: 10, borderTopWidth: 1, borderTopColor: Colors.border },
  reviewSkill: { fontSize: 11, fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold', color: Colors.primary, textTransform: 'uppercase' },
  reviewQuestion: { marginTop: 4, fontSize: 13, fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold', color: Colors.textPrimary },
  reviewExplanation: { marginTop: 4, fontSize: 12, lineHeight: 18, color: Colors.textSecondary },
});
