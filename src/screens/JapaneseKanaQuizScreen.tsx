import React, { useEffect, useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import AudioButton from '../components/AudioButton';
import { Colors } from '../constants/colors';
import { RootStackParamList } from '../navigation/AppNavigator';
import { stopJapaneseAudio } from '../utils/audio';
import { buildKanaQuizQuestions, KanaQuizMode } from '../utils/kanaQuiz';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RouteType = RouteProp<RootStackParamList, 'JapaneseKanaQuiz'>;

const MODE_LABELS: Record<KanaQuizMode, string> = {
  hiragana: 'Hiragana',
  katakana: 'Katakana',
  mixed: 'Trộn',
};

const MODE_COLORS: Record<KanaQuizMode, string> = {
  hiragana: Colors.primary,
  katakana: '#E67E22',
  mixed: '#0F766E',
};

export default function JapaneseKanaQuizScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteType>();
  const [mode, setMode] = useState<KanaQuizMode>(route.params?.mode ?? 'mixed');
  const [questions, setQuestions] = useState(() => buildKanaQuizQuestions(route.params?.mode ?? 'mixed'));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const accentColor = MODE_COLORS[mode];
  const question = questions[currentIndex];
  const progressPercent = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0;
  const title = useMemo(() => `Quiz ${MODE_LABELS[mode]}`, [mode]);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        void stopJapaneseAudio();
      };
    }, [])
  );

  useEffect(() => {
    const nextQuestions = buildKanaQuizQuestions(mode);
    setQuestions(nextQuestions);
    setCurrentIndex(0);
    setSelectedIndex(null);
    setScore(0);
    setFinished(false);
  }, [mode]);

  const handleAnswer = (index: number) => {
    if (!question || selectedIndex !== null) return;

    const isCorrect = index === question.correctIndex;
    setSelectedIndex(index);
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      if (currentIndex + 1 >= questions.length) {
        setFinished(true);
      } else {
        setCurrentIndex((prev) => prev + 1);
        setSelectedIndex(null);
      }
    }, 450);
  };

  const restartQuiz = () => {
    setQuestions(buildKanaQuizQuestions(mode));
    setCurrentIndex(0);
    setSelectedIndex(null);
    setScore(0);
    setFinished(false);
  };

  if (!question && !finished) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <Text style={styles.emptyText}>Chưa có dữ liệu quiz kana.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={[styles.header, { backgroundColor: accentColor }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={Colors.white} />
        </TouchableOpacity>
        <View style={styles.headerText}>
          <Text style={styles.headerTitle}>{title}</Text>
          <Text style={styles.headerDesc}>Luyện nhận diện kana theo từng bảng chữ hoặc trộn hai bảng để tăng phản xạ đọc.</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.modeRow}>
          {(['hiragana', 'katakana', 'mixed'] as KanaQuizMode[]).map((item) => {
            const active = item === mode;
            return (
              <TouchableOpacity
                key={item}
                style={[
                  styles.modeChip,
                  active && { backgroundColor: MODE_COLORS[item], borderColor: MODE_COLORS[item] },
                ]}
                onPress={() => setMode(item)}
              >
                <Text style={[styles.modeChipText, active && styles.modeChipTextActive]}>{MODE_LABELS[item]}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {finished ? (
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Kết quả</Text>
            <Text style={[styles.summaryScore, { color: accentColor }]}>{score} / {questions.length}</Text>
            <Text style={styles.summaryText}>
              {score === questions.length
                ? 'Bạn đã nhớ chắc toàn bộ kana trong lượt này.'
                : 'Làm lại một lượt nữa để khóa phản xạ đọc kana.'}
            </Text>
            <TouchableOpacity style={[styles.primaryButton, { backgroundColor: accentColor }]} onPress={restartQuiz}>
              <Text style={styles.primaryButtonText}>Làm lại</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.goBack()}>
              <Text style={styles.secondaryButtonText}>Quay lại bảng chữ</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${progressPercent}%`, backgroundColor: accentColor }]} />
            </View>
            <View style={styles.metaRow}>
              <Text style={styles.counter}>{currentIndex + 1} / {questions.length}</Text>
              <Text style={[styles.scriptBadge, { color: accentColor }]}>
                {question.item.script === 'hiragana' ? 'Hiragana' : 'Katakana'}
              </Text>
            </View>

            <View style={styles.questionCard}>
              <Text style={styles.promptLabel}>Kana này đọc là gì?</Text>
              <AudioButton
                audioId={`kana-quiz:${question.item.script}:${question.item.kana}:${currentIndex}`}
                text={question.item.kana}
                backgroundColor={Colors.background}
              />
              <Text style={styles.kana}>{question.item.kana}</Text>
              <Text style={styles.promptHint}>Nghe lại nếu cần rồi chọn romaji đúng.</Text>
            </View>

            <View style={styles.options}>
              {question.options.map((option, index) => {
                const isSelected = selectedIndex === index;
                const isCorrect = index === question.correctIndex;
                const backgroundColor = isSelected
                  ? isCorrect
                    ? '#EAF7EF'
                    : '#FDECEA'
                  : isCorrect && selectedIndex !== null
                    ? '#EAF7EF'
                    : Colors.white;
                const borderColor = isSelected
                  ? isCorrect
                    ? Colors.success
                    : Colors.danger
                  : isCorrect && selectedIndex !== null
                    ? Colors.success
                    : Colors.border;

                return (
                  <TouchableOpacity
                    key={`${question.item.kana}-${option}`}
                    style={[styles.optionButton, { backgroundColor, borderColor }]}
                    onPress={() => handleAnswer(index)}
                    disabled={selectedIndex !== null}
                  >
                    <Text style={styles.optionText}>{option}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  emptyText: { fontSize: 15, color: Colors.textSecondary, textAlign: 'center' },
  header: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 22,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  backBtn: { paddingTop: 2 },
  headerText: { flex: 1 },
  headerTitle: { fontSize: 22, fontWeight: '800', color: Colors.white, marginBottom: 6 },
  headerDesc: { fontSize: 13, lineHeight: 19, color: 'rgba(255,255,255,0.88)' },
  content: {
    flex: 1,
    marginTop: -10,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: Colors.background,
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  modeRow: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  modeChip: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  modeChipText: { fontSize: 13, fontWeight: '800', color: Colors.textPrimary },
  modeChipTextActive: { color: Colors.white },
  progressTrack: { height: 6, backgroundColor: Colors.border, borderRadius: 999, overflow: 'hidden' },
  progressFill: { height: 6, borderRadius: 999 },
  metaRow: { marginTop: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  counter: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary },
  scriptBadge: { fontSize: 13, fontWeight: '700' },
  questionCard: {
    marginTop: 16,
    backgroundColor: Colors.white,
    borderRadius: 18,
    padding: 22,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  promptLabel: { fontSize: 13, fontWeight: '700', color: Colors.textSecondary, marginBottom: 12 },
  kana: { fontSize: 64, fontWeight: '800', color: Colors.textPrimary, marginTop: 12 },
  promptHint: { marginTop: 10, fontSize: 12, color: Colors.textSecondary, textAlign: 'center' },
  options: { marginTop: 16, gap: 10 },
  optionButton: {
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 14,
    borderWidth: 1,
    alignItems: 'center',
  },
  optionText: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary },
  summaryCard: {
    flex: 1,
    marginTop: 12,
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryLabel: { fontSize: 14, fontWeight: '700', color: Colors.textSecondary },
  summaryScore: { fontSize: 38, fontWeight: '800', marginTop: 12 },
  summaryText: { marginTop: 10, fontSize: 14, lineHeight: 21, color: Colors.textSecondary, textAlign: 'center' },
  primaryButton: { marginTop: 24, borderRadius: 14, paddingHorizontal: 18, paddingVertical: 14 },
  primaryButtonText: { color: Colors.white, fontWeight: '800' },
  secondaryButton: {
    marginTop: 12,
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
  },
  secondaryButtonText: { color: Colors.textPrimary, fontWeight: '700' },
});
