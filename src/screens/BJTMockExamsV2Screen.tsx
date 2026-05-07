import React, { useEffect, useMemo, useState } from 'react';
import {
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

import { Colors } from '../constants/colors';
import { BJT_MOCK_V2_EXAMS, BJT_MOCK_V2_META } from '../constants/content/bjt';
import { getBjtMockExamV2Stats, loadBjtProgress, recordBjtMockExamV2Result } from '../utils/bjtProgress';

type SessionState = 'idle' | 'active' | 'done';
type LevelFilter = 'all' | 'J4' | 'J3' | 'J2';
type AnswerRecord = {
  questionId: string;
  selected: string;
  correct: boolean;
};

const PART_LABELS: Record<'I' | 'II' | 'III', string> = {
  I: 'Nghe',
  II: 'Nghe + Đọc',
  III: 'Đọc hiểu',
};

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

export default function BJTMockExamsV2Screen() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const androidCtaLift = Platform.OS === 'android' ? 14 : 0;
  const stickyBottomPadding = Math.max(insets.bottom, 12);
  const stickyContentPadding = 112 + stickyBottomPadding + androidCtaLift;
  const [level, setLevel] = useState<LevelFilter>('all');
  const [selectedExamId, setSelectedExamId] = useState(BJT_MOCK_V2_EXAMS[0]?.examId ?? '');
  const [sessionState, setSessionState] = useState<SessionState>('idle');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [timeLeft, setTimeLeft] = useState((BJT_MOCK_V2_EXAMS[0]?.timeLimitMinutes ?? 120) * 60);
  const [progress, setProgress] = useState<Awaited<ReturnType<typeof loadBjtProgress>> | null>(null);

  useFocusEffect(
    React.useCallback(() => {
      loadBjtProgress().then(setProgress);
    }, [])
  );

  const availableLevels = useMemo(
    () =>
      ['all', ...Array.from(new Set(BJT_MOCK_V2_EXAMS.flatMap((exam) => exam.questions.map((question) => question.level))))] as LevelFilter[],
    []
  );

  const exams = useMemo(
    () =>
      level === 'all'
        ? BJT_MOCK_V2_EXAMS
        : BJT_MOCK_V2_EXAMS.filter((exam) => exam.questions.some((question) => question.level === level)),
    [level]
  );

  useEffect(() => {
    if (!exams.some((exam) => exam.examId === selectedExamId)) {
      const nextExam = exams[0];
      setSelectedExamId(nextExam?.examId ?? '');
      setTimeLeft((nextExam?.timeLimitMinutes ?? 120) * 60);
    }
  }, [exams, selectedExamId]);

  const selectedExam = exams.find((exam) => exam.examId === selectedExamId) ?? exams[0] ?? null;
  const selectedExamStats = selectedExam && progress ? getBjtMockExamV2Stats(progress, selectedExam.examId) : null;
  const currentQuestion = selectedExam?.questions[currentIndex] ?? null;
  const currentAnswer = currentQuestion
    ? answers.find((item) => item.questionId === currentQuestion.id)
    : undefined;
  const score = answers.filter((item) => item.correct).length;

  const buildPartBreakdown = React.useCallback(() => {
    if (!selectedExam) {
      return {
        I: { correct: 0, total: 0 },
        II: { correct: 0, total: 0 },
        III: { correct: 0, total: 0 },
      };
    }

    return (['I', 'II', 'III'] as const).reduce(
      (acc, part) => {
        const questions = selectedExam.questions.filter((question) => question.part === part);
        acc[part] = {
          total: questions.length,
          correct: questions.filter((question) =>
            answers.some((answer) => answer.questionId === question.id && answer.correct)
          ).length,
        };
        return acc;
      },
      {
        I: { correct: 0, total: 0 },
        II: { correct: 0, total: 0 },
        III: { correct: 0, total: 0 },
      }
    );
  }, [answers, selectedExam]);

  const finalizeSession = React.useCallback(async () => {
    if (!selectedExam) return;
    const examLevels = Array.from(new Set(selectedExam.questions.map((question) => question.level)));
    const recordLevel: 'J2' | 'J3' | 'J4' | 'all' =
      examLevels.length === 1 &&
      (examLevels[0] === 'J2' || examLevels[0] === 'J3' || examLevels[0] === 'J4')
        ? examLevels[0]
        : level;
    const nextProgress = await recordBjtMockExamV2Result({
      examId: selectedExam.examId,
      level: recordLevel,
      score,
      total: selectedExam.questions.length,
      partBreakdown: buildPartBreakdown(),
      wrongQuestions: selectedExam.questions
        .filter((question) => answers.some((answer) => answer.questionId === question.id && !answer.correct))
        .map((question) => ({
          questionId: question.id,
          examId: selectedExam.examId,
          part: question.part,
        })),
    });
    setProgress(nextProgress);
    setSessionState('done');
  }, [buildPartBreakdown, level, score, selectedExam]);

  useEffect(() => {
    if (sessionState !== 'active') return;
    if (timeLeft <= 0) {
      void finalizeSession();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [finalizeSession, sessionState, timeLeft]);

  const resetSession = (nextState: SessionState = 'idle') => {
    setSessionState(nextState);
    setCurrentIndex(0);
    setSelectedLabel(null);
    setAnswers([]);
    setTimeLeft((selectedExam?.timeLimitMinutes ?? 120) * 60);
  };

  const startSession = () => {
    resetSession('active');
  };

  const submitAnswer = () => {
    if (!currentQuestion || !selectedLabel || currentAnswer) return;
    setAnswers((prev) => [
      ...prev,
      {
        questionId: currentQuestion.id,
        selected: selectedLabel,
        correct: selectedLabel === currentQuestion.answer,
      },
    ]);
  };

  const moveNext = () => {
    if (!selectedExam || !currentQuestion) return;
    setSelectedLabel(null);
    if (currentIndex >= selectedExam.questions.length - 1) {
      void finalizeSession();
      return;
    }
    setCurrentIndex((prev) => prev + 1);
  };

  if (!selectedExam) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <View style={styles.center}>
          <Text style={styles.emptyText}>Không tìm thấy đề mock phù hợp.</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (sessionState === 'done') {
    const wrongItems = selectedExam.questions.filter((question) =>
      answers.some((answer) => answer.questionId === question.id && !answer.correct)
    );
    const partStats = (['I', 'II', 'III'] as const).map((part) => {
      const total = selectedExam.questions.filter((question) => question.part === part).length;
      const correct = selectedExam.questions
        .filter((question) => question.part === part)
        .filter((question) => answers.some((answer) => answer.questionId === question.id && answer.correct)).length;
      return { part, total, correct };
    });

    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
          <View style={styles.hero}>
            <Text style={styles.title}>Kết quả đề thi V2</Text>
            <Text style={styles.subtitle}>
              Kết quả cho {selectedExam.examId}. Màn này chấm điểm trên chính 80 câu của đề đã chọn, không random lại trong app.
            </Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryScore}>
              {score}/{selectedExam.questions.length}
            </Text>
            <Text style={styles.summaryPercent}>
              {Math.round((score / selectedExam.questions.length) * 100)}%
            </Text>
            <Text style={styles.summaryNote}>
              {selectedExam.examId} | {formatTime(timeLeft)} còn lại lúc nộp bài
            </Text>
            {selectedExamStats ? (
              <Text style={styles.summaryNote}>
                Đã làm {selectedExamStats.attempts} lần | Tốt nhất {selectedExamStats.bestPercent}%
              </Text>
            ) : null}
          </View>

          <View style={styles.statsGrid}>
            {partStats.map((item) => (
              <View key={item.part} style={styles.statCard}>
                <Text style={styles.statLabel}>{PART_LABELS[item.part]}</Text>
                <Text style={styles.statValue}>
                  {item.correct}/{item.total}
                </Text>
              </View>
            ))}
          </View>

          {wrongItems.length > 0 ? (
            <View style={styles.reviewCard}>
              <Text style={styles.reviewTitle}>Câu cần xem lại</Text>
              {wrongItems.map((item) => {
                const answer = answers.find((entry) => entry.questionId === item.id);
                return (
                  <View key={item.id} style={styles.reviewItem}>
                    <Text style={styles.reviewMeta}>
                      {item.part} | {item.level} | Chọn {answer?.selected ?? '-'} | Đúng {item.answer}
                    </Text>
                    <Text style={styles.reviewQuestion}>{item.questionJp}</Text>
                    <Text style={styles.reviewExplanation}>
                      {item.explanation || 'File gốc không cung cấp giải thích cho câu này.'}
                    </Text>
                  </View>
                );
              })}
            </View>
          ) : null}

          <TouchableOpacity style={styles.primaryButton} onPress={startSession}>
            <Text style={styles.primaryButtonText}>Làm lại đề này</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} onPress={() => resetSession('idle')}>
            <Text style={styles.secondaryButtonText}>Đổi đề khác</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (sessionState === 'active' && currentQuestion) {
    const submitted = Boolean(currentAnswer);

    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              { width: `${((currentIndex + 1) / selectedExam.questions.length) * 100}%` },
            ]}
          />
        </View>
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
          <View style={styles.questionTop}>
            <Text style={styles.badge}>
              {selectedExam.examId} | {currentQuestion.part} | {currentQuestion.level} | Câu {currentIndex + 1}/
              {selectedExam.questions.length}
            </Text>
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

          <View style={styles.card}>
            <Text style={styles.blockTitle}>Đoạn đọc</Text>
            <Text style={styles.promptJp}>{currentQuestion.passageJp}</Text>

            <Text style={styles.blockTitle}>Câu hỏi</Text>
            <Text style={styles.questionJp}>{currentQuestion.questionJp}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.blockTitle}>Chọn đáp án</Text>
            {currentQuestion.options.map((option) => {
              const isSelected = selectedLabel === option.label;
              const isCorrect = submitted && option.label === currentQuestion.answer;
              const isWrongSelected =
                submitted &&
                option.label === currentAnswer?.selected &&
                currentAnswer.selected !== currentQuestion.answer;

              return (
                <TouchableOpacity
                  key={`${currentQuestion.id}-${option.label}`}
                  style={[
                    styles.optionRow,
                    isSelected && styles.optionRowSelected,
                    isCorrect && styles.optionRowCorrect,
                    isWrongSelected && styles.optionRowWrong,
                  ]}
                  disabled={submitted}
                  onPress={() => setSelectedLabel(option.label)}
                >
                  <Text
                    style={[
                      styles.optionLabel,
                      isCorrect && styles.optionLabelCorrect,
                      isWrongSelected && styles.optionLabelWrong,
                    ]}
                  >
                    {option.label}.
                  </Text>
                  <Text
                    style={[
                      styles.optionValue,
                      isCorrect && styles.optionValueCorrect,
                      isWrongSelected && styles.optionValueWrong,
                    ]}
                  >
                    {option.text}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {submitted ? (
            <View style={styles.explanationBox}>
              <Ionicons
                name={currentAnswer?.correct ? 'checkmark-circle-outline' : 'close-circle-outline'}
                size={16}
                color={currentAnswer?.correct ? Colors.primary : Colors.danger}
              />
              <View style={styles.flex}>
                <Text style={styles.explanationTitle}>
                  {currentAnswer?.correct ? 'Đúng' : `Sai | Đáp án đúng là ${currentQuestion.answer}`}
                </Text>
                <Text style={styles.explanationText}>
                  {currentQuestion.explanation || 'File gốc không cung cấp giải thích cho câu này.'}
                </Text>
              </View>
            </View>
          ) : null}

          {!submitted ? (
            <TouchableOpacity
              style={[styles.primaryButton, !selectedLabel && styles.primaryButtonDisabled]}
              disabled={!selectedLabel}
              onPress={submitAnswer}
            >
              <Text style={styles.primaryButtonText}>Khóa đáp án</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.primaryButton} onPress={moveNext}>
              <Text style={styles.primaryButtonText}>
                {currentIndex >= selectedExam.questions.length - 1 ? 'Xem kết quả' : 'Câu tiếp theo'}
              </Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }

  const totalLevelQuestions =
    level === 'all'
      ? BJT_MOCK_V2_META.totalQuestions
      : BJT_MOCK_V2_EXAMS.flatMap((exam) => exam.questions).filter((question) => question.level === level).length;

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={[
          styles.content,
          styles.contentWithStickyCta,
          { paddingBottom: stickyContentPadding },
          isTablet && styles.contentTablet,
        ]}
      >
        <View style={styles.hero}>
          <Text style={styles.title}>50 đề thi V2</Text>
          <Text style={styles.subtitle}>
            Nguồn này có {BJT_MOCK_V2_META.totalExams} đề, {BJT_MOCK_V2_META.totalQuestions} câu, mỗi đề 80 câu trong 120 phút. App chỉ hiển thị level thực có trong file: J4, J3, J2.
          </Text>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Số đề</Text>
            <Text style={styles.statValue}>{BJT_MOCK_V2_META.totalExams}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Câu độc nhất</Text>
            <Text style={styles.statValue}>{BJT_MOCK_V2_META.uniqueQuestionBank.totalUnique}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Phạm vi level</Text>
            <Text style={styles.statValue}>J2–J4</Text>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
          {availableLevels.map((item) => {
            const active = item === level;
            const count =
              item === 'all'
                ? BJT_MOCK_V2_META.totalExams
                : BJT_MOCK_V2_EXAMS.filter((exam) => exam.questions.some((question) => question.level === item)).length;
            return (
              <TouchableOpacity
                key={item}
                style={[styles.chip, active && styles.chipActive]}
                onPress={() => setLevel(item)}
              >
                <Text style={[styles.chipText, active && styles.chipTextActive]}>
                  {item === 'all' ? 'Tất cả' : item} ({count})
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.noteCard}>
          <Ionicons name="information-circle-outline" size={18} color={Colors.primary} />
          <Text style={styles.noteText}>
            Pool câu gốc đã được audit: Nghe 10, Nghe + Đọc 10, Đọc hiểu 56. File hiện xác nhận randomized trên 50 đề, nhưng chưa có level J5, J1, J1+.
          </Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Bộ lọc hiện tại</Text>
          <Text style={styles.summaryScore}>{totalLevelQuestions} câu</Text>
          <Text style={styles.summaryNote}>
            {selectedExam.examId} | I {selectedExam.parts.I} | II {selectedExam.parts.II} | III {selectedExam.parts.III}
          </Text>
          {selectedExamStats ? (
            <>
              <Text style={styles.summaryNote}>
                Đã làm {selectedExamStats.attempts} lần | Tốt nhất {selectedExamStats.bestPercent}%
              </Text>
              {selectedExamStats.latest ? (
                <Text style={styles.summaryNote}>
                  Lần gần nhất {selectedExamStats.latest.score}/{selectedExamStats.latest.total} | I {selectedExamStats.latest.partBreakdown.I.correct}/{selectedExamStats.latest.partBreakdown.I.total} | II {selectedExamStats.latest.partBreakdown.II.correct}/{selectedExamStats.latest.partBreakdown.II.total} | III {selectedExamStats.latest.partBreakdown.III.correct}/{selectedExamStats.latest.partBreakdown.III.total}
                </Text>
              ) : null}
            </>
          ) : null}
        </View>

        <Text style={styles.sectionTitle}>Danh sách đề</Text>
        {exams.map((exam) => {
          const active = exam.examId === selectedExam.examId;
          const examLevels = Array.from(new Set(exam.questions.map((question) => question.level))).join(', ');
          const examStats = progress ? getBjtMockExamV2Stats(progress, exam.examId) : null;
          return (
            <TouchableOpacity
              key={exam.examId}
              style={[styles.examCard, active && styles.examCardActive]}
              onPress={() => {
                setSelectedExamId(exam.examId);
                setTimeLeft(exam.timeLimitMinutes * 60);
              }}
            >
              <View style={styles.rowBetween}>
                <Text style={styles.examTitle}>{exam.examId}</Text>
                <Text style={styles.examMeta}>{exam.timeLimitMinutes} phút</Text>
              </View>
              <Text style={styles.examSub}>{exam.title}</Text>
              <Text style={styles.examFoot}>
                80 câu | Level: {examLevels} | I {exam.parts.I} / II {exam.parts.II} / III {exam.parts.III}
              </Text>
              {examStats && examStats.attempts > 0 ? (
                <Text style={styles.examHistory}>
                  Đã làm {examStats.attempts} lần | Tốt nhất {examStats.bestPercent}%
                </Text>
              ) : null}
            </TouchableOpacity>
          );
        })}

      </ScrollView>
      <View style={[styles.stickyCtaWrap, { bottom: androidCtaLift, paddingBottom: stickyBottomPadding }]}>
        <TouchableOpacity style={styles.primaryButton} onPress={startSession}>
          <Text style={styles.primaryButtonText}>Bắt đầu {selectedExam.examId}</Text>
        </TouchableOpacity>
      </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 16, paddingBottom: 108 },
  contentTablet: {
    width: '100%',
    maxWidth: 920,
    alignSelf: 'center',
  },
  contentWithStickyCta: {
    paddingBottom: 112,
  },
  stickyCtaWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.background,
  },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  emptyText: { textAlign: 'center', fontSize: 14, lineHeight: 20, color: Colors.textSecondary },
  hero: { marginBottom: 14 },
  title: { fontSize: 24, fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold', color: Colors.textPrimary },
  subtitle: { marginTop: 8, fontSize: 13, lineHeight: 20, color: Colors.textSecondary },
  statsGrid: { flexDirection: 'row', gap: 10, marginBottom: 12 },
  statCard: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statLabel: { fontSize: 11, fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold', color: Colors.textSecondary, marginBottom: 6 },
  statValue: { fontSize: 20, fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold', color: Colors.textPrimary },
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
  noteCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: Colors.accent,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },
  noteText: { flex: 1, fontSize: 12, lineHeight: 18, color: Colors.primaryDark },
  summaryCard: {
    backgroundColor: Colors.card,
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  summaryLabel: { fontSize: 12, fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold', color: Colors.textSecondary },
  summaryScore: { marginTop: 6, fontSize: 28, fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold', color: Colors.textPrimary },
  summaryPercent: { marginTop: 6, fontSize: 22, fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold', color: Colors.primaryDark },
  summaryNote: { marginTop: 6, fontSize: 12, color: Colors.textSecondary },
  sectionTitle: { marginBottom: 10, fontSize: 16, fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold', color: Colors.textPrimary },
  examCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  examCardActive: { borderColor: Colors.primary, backgroundColor: Colors.accent },
  rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  examTitle: { fontSize: 15, fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold', color: Colors.textPrimary },
  examMeta: { fontSize: 11, fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold', color: Colors.textMuted },
  examSub: { marginTop: 6, fontSize: 13, lineHeight: 19, color: Colors.textPrimary },
  examFoot: { marginTop: 8, fontSize: 12, lineHeight: 18, color: Colors.textSecondary },
  examHistory: { marginTop: 8, fontSize: 12, fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold', color: Colors.primaryDark },
  primaryButton: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    paddingVertical: 14,
    backgroundColor: Colors.primary,
  },
  primaryButtonDisabled: { opacity: 0.4 },
  primaryButtonText: { color: Colors.white, fontSize: 14, fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold' },
  secondaryButton: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
  },
  secondaryButtonText: { color: Colors.textPrimary, fontSize: 14, fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold' },
  progressTrack: { height: 6, backgroundColor: Colors.border },
  progressFill: { height: 6, backgroundColor: Colors.primary },
  questionTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 10 },
  badge: { flex: 1, fontSize: 12, fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold', color: Colors.primaryDark },
  timerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: Colors.accent,
  },
  timerCardDanger: { backgroundColor: '#FFE5E5' },
  timerText: { fontSize: 13, fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold', color: Colors.primary },
  timerTextDanger: { color: Colors.danger },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 18,
    padding: 16,
    marginTop: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  blockTitle: { marginBottom: 8, fontSize: 11, fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold', color: Colors.textMuted, textTransform: 'uppercase' },
  promptJp: { fontSize: 13, lineHeight: 20, color: Colors.textPrimary },
  questionJp: { fontSize: 14, lineHeight: 20, color: Colors.textPrimary, fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold' },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
    marginTop: 10,
  },
  optionRowSelected: { borderColor: Colors.primary, backgroundColor: Colors.accent },
  optionRowCorrect: { borderColor: Colors.success, backgroundColor: '#EAF9EE' },
  optionRowWrong: { borderColor: Colors.danger, backgroundColor: '#FFF1F1' },
  optionLabel: { width: 24, fontSize: 13, fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold', color: Colors.textPrimary },
  optionLabelCorrect: { color: Colors.success },
  optionLabelWrong: { color: Colors.danger },
  optionValue: { flex: 1, fontSize: 13, lineHeight: 19, color: Colors.textPrimary },
  optionValueCorrect: { color: Colors.success },
  optionValueWrong: { color: Colors.danger },
  explanationBox: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  flex: { flex: 1 },
  explanationTitle: { fontSize: 13, fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold', color: Colors.textPrimary },
  explanationText: { marginTop: 4, fontSize: 12, lineHeight: 18, color: Colors.textSecondary },
  reviewCard: {
    backgroundColor: Colors.card,
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  reviewTitle: { fontSize: 16, fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold', color: Colors.textPrimary, marginBottom: 10 },
  reviewItem: {
    paddingTop: 10,
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  reviewMeta: { fontSize: 11, fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold', color: Colors.textMuted },
  reviewQuestion: { marginTop: 6, fontSize: 13, lineHeight: 19, color: Colors.textPrimary },
  reviewExplanation: { marginTop: 6, fontSize: 12, lineHeight: 18, color: Colors.textSecondary },
});
