import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import AudioButton from '../components/AudioButton';
import { Colors } from '../constants/colors';
import { ESSENTIAL_PHRASES } from '../constants/content';
import { RootStackParamList } from '../navigation/AppNavigator';
import { stopJapaneseAudio } from '../utils/audio';
import { buildQuizQuestions, QuizDirection, QuizPhrase } from '../utils/japaneseQuiz';
import { markStudiedToday } from '../utils/japaneseStreak';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RouteType = RouteProp<RootStackParamList, 'JapaneseQuiz'>;

export default function JapaneseQuizScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteType>();
  const insets = useSafeAreaInsets();
  const { categoryName, categoryColor, direction: initialDirection } = route.params;
  const accentColor = categoryColor || Colors.primary;
  const [direction, setDirection] = useState<QuizDirection>(initialDirection ?? 'mixed');

  const questions = useMemo(() => {
    const allPhrases: QuizPhrase[] = ESSENTIAL_PHRASES.flatMap((category) =>
      category.phrases.map((phrase) => ({ ...phrase, category: category.category }))
    );
    const target = categoryName
      ? allPhrases.filter((phrase) => phrase.category === categoryName)
      : allPhrases;
    return buildQuizQuestions(target, allPhrases, direction);
  }, [categoryName, direction]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [wrongAnswers, setWrongAnswers] = useState<QuizPhrase[]>([]);
  const [done, setDone] = useState(false);
  const [score, setScore] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        void stopJapaneseAudio();
      };
    }, [])
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: categoryName ? `Trắc nghiệm: ${categoryName}` : 'Trắc nghiệm tổng hợp',
    });
  }, [categoryName, navigation]);

  if (questions.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.center}>
          <Text>Chưa có câu hỏi để làm quiz.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const currentQuestion = questions[currentIndex];
  const isAnswered = selectedIndex !== null;

  const handleSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedIndex(index);
    if (index === currentQuestion.correctIndex) setScore((prev) => prev + 1);
    else setWrongAnswers((prev) => [...prev, currentQuestion.phrase]);
  };

  const handleNext = async () => {
    if (currentIndex + 1 >= questions.length) {
      await markStudiedToday();
      setDone(true);
      return;
    }
    setCurrentIndex((prev) => prev + 1);
    setSelectedIndex(null);
  };

  if (done) {
    const total = questions.length;
    const percent = Math.round((score / total) * 100);
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
        <ScrollView contentContainerStyle={styles.summary} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Hoàn thành quiz</Text>
          <Text style={styles.subtitle}>{categoryName || 'Tổng hợp'}</Text>
          <Text style={[styles.percent, { color: accentColor }]}>{percent}% đúng</Text>
          <Text style={styles.score}>
            {score}/{total} câu
          </Text>
          {wrongAnswers.length > 0 ? (
            <View style={styles.reviewCard}>
              <Text style={styles.reviewTitle}>Cần ôn lại</Text>
              {wrongAnswers.map((phrase, index) => (
                <View key={`${phrase.jp}-${index}`} style={styles.reviewItem}>
                  <Text style={styles.reviewJp}>{phrase.jp}</Text>
                  <Text style={styles.reviewRomaji}>{phrase.romaji}</Text>
                  <Text style={styles.reviewVn}>{phrase.vn}</Text>
                </View>
              ))}
            </View>
          ) : null}
          <TouchableOpacity
            style={[styles.primaryButton, { backgroundColor: accentColor }]}
            onPress={() => {
              setCurrentIndex(0);
              setSelectedIndex(null);
              setWrongAnswers([]);
              setDone(false);
              setScore(0);
            }}
          >
            <Text style={styles.primaryButtonText}>Làm lại</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.goBack()}>
            <Text style={styles.secondaryButtonText}>Xong</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  const progressPercent = ((currentIndex + 1) / questions.length) * 100;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressFill,
            { width: `${progressPercent}%`, backgroundColor: accentColor },
          ]}
        />
      </View>

      <ScrollView
        style={styles.quizScroll}
        contentContainerStyle={[
          styles.quizContent,
          { paddingBottom: 20 + Math.max(insets.bottom, 12) },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.modeRow}
        >
          {[
            { id: 'mixed' as const, label: 'Trộn 2 chiều' },
            { id: 'jp-to-vn' as const, label: 'JP -> VI' },
            { id: 'vn-to-jp' as const, label: 'VI -> JP' },
          ].map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.modeChip,
                direction === item.id && {
                  backgroundColor: accentColor,
                  borderColor: accentColor,
                },
              ]}
              onPress={() => {
                setDirection(item.id);
                setCurrentIndex(0);
                setSelectedIndex(null);
                setWrongAnswers([]);
                setDone(false);
                setScore(0);
              }}
            >
              <Text
                style={[
                  styles.modeChipText,
                  direction === item.id && styles.modeChipTextActive,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.topRow}>
          <Text style={styles.counter}>
            Câu {currentIndex + 1} / {questions.length}
          </Text>
          <Text style={styles.scoreSmall}>{score} đúng</Text>
        </View>

        <View style={styles.questionCard}>
          <Text style={styles.label}>
            {currentQuestion.direction === 'jp-to-vn'
              ? 'Câu tiếng Nhật'
              : 'Nghĩa tiếng Việt'}
          </Text>
          <AudioButton
            audioId={`quiz:${currentQuestion.phrase.jp}:${currentIndex}`}
            text={currentQuestion.phrase.jp}
            backgroundColor={Colors.background}
          />
          <Text style={styles.questionJp}>{currentQuestion.promptPrimary}</Text>
          {currentQuestion.promptSecondary ? (
            <Text style={styles.questionRomaji}>{currentQuestion.promptSecondary}</Text>
          ) : null}
        </View>

        <View style={styles.options}>
          {currentQuestion.options.map((option, index) => {
            const isCorrect = index === currentQuestion.correctIndex;
            const isSelected = index === selectedIndex;

            return (
              <TouchableOpacity
                key={`${currentQuestion.phrase.jp}-${index}`}
                style={[
                  styles.option,
                  isAnswered && isCorrect ? styles.optionCorrect : null,
                  isAnswered && isSelected && !isCorrect ? styles.optionWrong : null,
                ]}
                onPress={() => handleSelect(index)}
                disabled={isAnswered}
              >
                <View style={styles.optionTextWrap}>
                  <Text style={styles.optionText}>{option.primary}</Text>
                  {option.secondary ? (
                    <Text style={styles.optionSubText}>{option.secondary}</Text>
                  ) : null}
                </View>
                {isAnswered && isCorrect ? (
                  <Ionicons
                    name="checkmark-circle"
                    size={20}
                    color={Colors.success}
                  />
                ) : null}
                {isAnswered && isSelected && !isCorrect ? (
                  <Ionicons name="close-circle" size={20} color={Colors.danger} />
                ) : null}
              </TouchableOpacity>
            );
          })}
        </View>

        {isAnswered ? (
          <TouchableOpacity
            style={[
              styles.primaryButton,
              { backgroundColor: accentColor, marginTop: 12 },
            ]}
            onPress={handleNext}
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
  container: { flex: 1, backgroundColor: Colors.background, padding: 16 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  progressTrack: {
    height: 6,
    backgroundColor: Colors.border,
    borderRadius: 999,
    overflow: 'hidden',
  },
  progressFill: { height: 6, borderRadius: 999 },
  quizScroll: { flex: 1 },
  quizContent: { paddingBottom: 20 },
  modeRow: { gap: 8, paddingTop: 14, paddingBottom: 4, paddingRight: 8 },
  modeChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  modeChipText: { fontSize: 12, fontWeight: '700', color: Colors.textPrimary },
  modeChipTextActive: { color: Colors.white },
  topRow: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  counter: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary },
  scoreSmall: { fontSize: 13, fontWeight: '700', color: Colors.primary },
  questionCard: {
    marginTop: 18,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  label: { fontSize: 12, fontWeight: '700', color: Colors.primary, marginBottom: 10 },
  questionJp: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  questionRomaji: {
    fontSize: 14,
    color: Colors.textMuted,
    marginTop: 8,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  options: { marginTop: 18, gap: 10 },
  option: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  optionCorrect: {
    borderColor: Colors.success,
    backgroundColor: Colors.successLight,
  },
  optionWrong: {
    borderColor: Colors.danger,
    backgroundColor: Colors.dangerLight,
  },
  optionTextWrap: { flex: 1 },
  optionText: { fontSize: 14, fontWeight: '600', color: Colors.textPrimary },
  optionSubText: {
    marginTop: 4,
    fontSize: 12,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
  summary: { paddingVertical: 40 },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  percent: {
    marginTop: 12,
    fontSize: 34,
    fontWeight: '800',
    textAlign: 'center',
  },
  score: { marginTop: 6, fontSize: 15, color: Colors.textSecondary, textAlign: 'center' },
  reviewCard: {
    marginTop: 18,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
  },
  reviewTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 10,
  },
  reviewItem: { paddingTop: 10, borderTopWidth: 1, borderTopColor: Colors.border },
  reviewJp: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary },
  reviewRomaji: {
    marginTop: 4,
    fontSize: 12,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
  reviewVn: { marginTop: 4, fontSize: 12, color: Colors.textSecondary },
  primaryButton: { borderRadius: 8, paddingVertical: 14, alignItems: 'center' },
  primaryButtonText: { color: Colors.white, fontWeight: '700' },
  secondaryButton: {
    marginTop: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  secondaryButtonText: { color: Colors.textPrimary, fontWeight: '700' },
});
