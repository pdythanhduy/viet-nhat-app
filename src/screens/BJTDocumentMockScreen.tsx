import React, { useMemo, useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '../constants/colors';
import { BJT_DOCUMENT_MOCK_QUESTIONS } from '../constants/content';

type AnswerRecord = {
  questionId: string;
  selected: string;
  correct: boolean;
};

type SessionState = 'idle' | 'active' | 'done';

const PART_LABELS: Record<string, string> = {
  I: 'Nghe',
  II: 'Nghe + Đọc',
  III: 'Đọc hiểu',
};

export default function BJTDocumentMockScreen() {
  const [level, setLevel] = useState('all');
  const [sessionState, setSessionState] = useState<SessionState>('idle');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);

  const levels = useMemo(
    () => ['all', ...Array.from(new Set(BJT_DOCUMENT_MOCK_QUESTIONS.map((item) => item.level)))],
    []
  );

  const items = useMemo(
    () =>
      level === 'all'
        ? BJT_DOCUMENT_MOCK_QUESTIONS
        : BJT_DOCUMENT_MOCK_QUESTIONS.filter((item) => item.level === level),
    [level]
  );

  const currentQuestion = items[currentIndex];
  const currentAnswer = currentQuestion
    ? answers.find((item) => item.questionId === currentQuestion.id)
    : undefined;
  const score = answers.filter((item) => item.correct).length;

  const partCounts = useMemo(
    () =>
      items.reduce<Record<string, number>>((acc, item) => {
        acc[item.part] = (acc[item.part] ?? 0) + 1;
        return acc;
      }, {}),
    [items]
  );

  const startSession = () => {
    setCurrentIndex(0);
    setSelectedLabel(null);
    setAnswers([]);
    setSessionState('active');
  };

  const resetSession = () => {
    setCurrentIndex(0);
    setSelectedLabel(null);
    setAnswers([]);
    setSessionState('idle');
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
    if (!currentQuestion) return;
    setSelectedLabel(null);
    if (currentIndex >= items.length - 1) {
      setSessionState('done');
      return;
    }
    setCurrentIndex((prev) => prev + 1);
  };

  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.center}>
          <Text style={styles.emptyText}>Không có câu hỏi tài liệu cho level này.</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (sessionState === 'done') {
    const wrongItems = items.filter((question) =>
      answers.some((answer) => answer.questionId === question.id && !answer.correct)
    );

    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
          <View style={styles.hero}>
            <Text style={styles.title}>Kết quả mock tài liệu</Text>
            <Text style={styles.subtitle}>
              Bạn đã hoàn thành bộ câu hỏi tài liệu cho level `{level}`. Điểm số được chấm theo đáp án gốc trong tài liệu.
            </Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryScore}>
              {score}/{items.length}
            </Text>
            <Text style={styles.summaryPercent}>{Math.round((score / items.length) * 100)}%</Text>
          </View>

          <View style={styles.statsGrid}>
            {Object.entries(partCounts).map(([part, count]) => {
              const partCorrect = items.filter((item) => item.part === part).filter((item) =>
                answers.some((answer) => answer.questionId === item.id && answer.correct)
              ).length;

              return (
                <View key={part} style={styles.statCard}>
                  <Text style={styles.statLabel}>{PART_LABELS[part] ?? part}</Text>
                  <Text style={styles.statValue}>
                    {partCorrect}/{count}
                  </Text>
                </View>
              );
            })}
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
                    <Text style={styles.reviewQuestion}>{item.questionVi}</Text>
                    <Text style={styles.reviewExplanation}>{item.explanation}</Text>
                  </View>
                );
              })}
            </View>
          ) : null}

          <TouchableOpacity style={styles.primaryButton} onPress={startSession}>
            <Text style={styles.primaryButtonText}>Lam lai bo nay</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} onPress={resetSession}>
            <Text style={styles.secondaryButtonText}>Doi level</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (sessionState === 'active' && currentQuestion) {
    const submitted = Boolean(currentAnswer);

    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
          <View style={styles.questionTop}>
            <Text style={styles.badge}>
              {currentQuestion.part} | {currentQuestion.level} | Câu {currentIndex + 1}/{items.length}
            </Text>
            <Text style={styles.progressText}>Đúng {score}/{answers.length}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.blockTitle}>Tóm tắt tiếng Việt</Text>
            <Text style={styles.promptVi}>{currentQuestion.promptVi}</Text>

            <Text style={styles.blockTitle}>Đề gốc tiếng Nhật</Text>
            <Text style={styles.promptJp}>{currentQuestion.promptJp}</Text>

            <Text style={styles.blockTitle}>Câu hỏi</Text>
            <Text style={styles.questionVi}>{currentQuestion.questionVi}</Text>
            <Text style={styles.promptJp}>{currentQuestion.questionJp}</Text>
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
                  <View style={styles.flex}>
                    <Text
                      style={[
                        styles.optionValue,
                        isCorrect && styles.optionValueCorrect,
                        isWrongSelected && styles.optionValueWrong,
                      ]}
                    >
                      {option.value}
                    </Text>
                    <Text style={styles.optionVi}>{option.labelVi}</Text>
                  </View>
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
                <Text style={styles.explanation}>{currentQuestion.explanation}</Text>
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
                {currentIndex >= items.length - 1 ? 'Xem kết quả' : 'Câu tiếp theo'}
              </Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.title}>Mock theo tài liệu</Text>
          <Text style={styles.subtitle}>
            Bộ câu hỏi này dùng trực tiếp đáp án và giải thích từ tài liệu BJT. App chỉ thêm phần chọn đáp án và tính điểm, không sửa nội dung gốc.
          </Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
          {levels.map((item) => {
            const active = item === level;
            const count =
              item === 'all'
                ? BJT_DOCUMENT_MOCK_QUESTIONS.length
                : BJT_DOCUMENT_MOCK_QUESTIONS.filter((question) => question.level === item).length;
            return (
              <TouchableOpacity
                key={item}
                style={[styles.chip, active && styles.chipActive]}
                onPress={() => setLevel(item)}
              >
                <Text style={[styles.chipText, active && styles.chipTextActive]}>
                  {item} ({count})
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Bộ hiện tại</Text>
          <Text style={styles.summaryScore}>{items.length} câu</Text>
          <Text style={styles.summaryNote}>
            {Object.entries(partCounts)
              .map(([part, count]) => `${PART_LABELS[part] ?? part}: ${count}`)
              .join(' | ')}
          </Text>
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={startSession}>
          <Text style={styles.primaryButtonText}>Bắt đầu làm bài</Text>
        </TouchableOpacity>

        <View style={styles.previewCard}>
          <Text style={styles.blockTitle}>Xem trước</Text>
          {items.slice(0, 3).map((item) => (
            <View key={item.id} style={styles.previewItem}>
              <Text style={styles.previewMeta}>
                {item.part} | {item.level}
              </Text>
              <Text style={styles.previewQuestion}>{item.questionVi}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 16, paddingBottom: 28 },
  hero: { marginBottom: 14 },
  title: { fontSize: 24, fontWeight: '800', color: Colors.textPrimary },
  subtitle: { marginTop: 8, fontSize: 13, lineHeight: 20, color: Colors.textSecondary },
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
  chipText: { fontSize: 12, fontWeight: '700', color: Colors.textPrimary },
  chipTextActive: { color: Colors.white },
  summaryCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  summaryLabel: { fontSize: 12, fontWeight: '700', color: Colors.textMuted, textTransform: 'uppercase' },
  summaryScore: { marginTop: 6, fontSize: 34, fontWeight: '800', color: Colors.textPrimary },
  summaryPercent: { marginTop: 4, fontSize: 18, fontWeight: '700', color: Colors.primary },
  summaryNote: { marginTop: 6, fontSize: 12, lineHeight: 18, color: Colors.textSecondary, textAlign: 'center' },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  previewCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginTop: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  previewItem: { paddingTop: 10, marginTop: 10, borderTopWidth: 1, borderTopColor: Colors.border },
  previewMeta: { fontSize: 11, fontWeight: '800', color: Colors.primary, textTransform: 'uppercase' },
  previewQuestion: { marginTop: 4, fontSize: 13, lineHeight: 19, color: Colors.textPrimary },
  questionTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, gap: 12 },
  badge: { fontSize: 11, fontWeight: '800', color: Colors.primary, textTransform: 'uppercase' },
  progressText: { fontSize: 12, fontWeight: '700', color: Colors.textSecondary },
  blockTitle: { marginBottom: 6, fontSize: 11, fontWeight: '800', color: Colors.textMuted, textTransform: 'uppercase' },
  promptVi: { marginBottom: 12, fontSize: 13, color: Colors.textSecondary, lineHeight: 19 },
  promptJp: { marginBottom: 12, fontSize: 13, color: Colors.textPrimary, lineHeight: 20 },
  questionVi: { marginBottom: 8, fontSize: 15, fontWeight: '700', color: Colors.textPrimary, lineHeight: 21 },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    backgroundColor: Colors.white,
  },
  optionRowSelected: { borderColor: Colors.primary },
  optionRowCorrect: { borderColor: Colors.primary, backgroundColor: Colors.accent },
  optionRowWrong: { borderColor: Colors.danger, backgroundColor: Colors.dangerLight },
  optionLabel: { width: 20, fontSize: 13, fontWeight: '800', color: Colors.textMuted },
  optionLabelCorrect: { color: Colors.primaryDark },
  optionLabelWrong: { color: Colors.danger },
  optionValue: { fontSize: 13, fontWeight: '700', color: Colors.textPrimary, lineHeight: 19 },
  optionValueCorrect: { color: Colors.primaryDark },
  optionValueWrong: { color: Colors.danger },
  optionVi: { marginTop: 4, fontSize: 12, color: Colors.textSecondary, lineHeight: 18 },
  explanationBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: Colors.accent,
  },
  explanationTitle: { fontSize: 13, fontWeight: '800', color: Colors.textPrimary, marginBottom: 4 },
  explanation: { fontSize: 12, color: Colors.primaryDark, lineHeight: 18 },
  primaryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: Colors.primary,
  },
  primaryButtonDisabled: {
    backgroundColor: Colors.textMuted,
  },
  primaryButtonText: { fontSize: 14, fontWeight: '800', color: Colors.white },
  secondaryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    marginTop: 10,
  },
  secondaryButtonText: { fontSize: 14, fontWeight: '800', color: Colors.textPrimary },
  statsGrid: { flexDirection: 'row', gap: 10, marginBottom: 12 },
  statCard: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  statLabel: { fontSize: 11, fontWeight: '700', color: Colors.textMuted, textAlign: 'center' },
  statValue: { marginTop: 6, fontSize: 20, fontWeight: '800', color: Colors.textPrimary },
  reviewCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  reviewTitle: { fontSize: 16, fontWeight: '800', color: Colors.textPrimary, marginBottom: 10 },
  reviewItem: { paddingTop: 10, marginTop: 10, borderTopWidth: 1, borderTopColor: Colors.border },
  reviewMeta: { fontSize: 11, fontWeight: '800', color: Colors.primary, textTransform: 'uppercase' },
  reviewQuestion: { marginTop: 5, fontSize: 13, fontWeight: '700', color: Colors.textPrimary, lineHeight: 19 },
  reviewExplanation: { marginTop: 5, fontSize: 12, color: Colors.textSecondary, lineHeight: 18 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, backgroundColor: Colors.background },
  emptyText: { fontSize: 14, color: Colors.textSecondary, textAlign: 'center', lineHeight: 20 },
  flex: { flex: 1 },
});
