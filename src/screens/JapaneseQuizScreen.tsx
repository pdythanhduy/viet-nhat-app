import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../constants/colors';
import { ESSENTIAL_PHRASES } from '../constants/content';
import { RootStackParamList } from '../navigation/AppNavigator';
import { markStudiedToday } from '../utils/japaneseStreak';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RouteType = RouteProp<RootStackParamList, 'JapaneseQuiz'>;

type QuizPhrase = { jp: string; romaji: string; vn: string; category: string };
type QuizQuestion = { phrase: QuizPhrase; options: string[]; correctIndex: number };

function shuffleArray<T>(items: T[]): T[] {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

function buildQuestions(phrases: QuizPhrase[], allPool: QuizPhrase[]): QuizQuestion[] {
  return shuffleArray(phrases).map((phrase) => {
    const wrongPool = allPool.filter((item) => item.vn !== phrase.vn);
    const wrongOptions = shuffleArray(wrongPool)
      .slice(0, 3)
      .map((item) => item.vn);
    const options = shuffleArray([phrase.vn, ...wrongOptions]);
    return { phrase, options, correctIndex: options.indexOf(phrase.vn) };
  });
}

export default function JapaneseQuizScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteType>();
  const { categoryName, categoryColor } = route.params;
  const accentColor = categoryColor || Colors.primary;

  const questions = useMemo(() => {
    const allPhrases: QuizPhrase[] = ESSENTIAL_PHRASES.flatMap((category) =>
      category.phrases.map((phrase) => ({ ...phrase, category: category.category }))
    );

    const targetPhrases =
      categoryName
        ? allPhrases.filter((phrase) => phrase.category === categoryName)
        : allPhrases;

    return buildQuestions(targetPhrases, allPhrases);
  }, [categoryName]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [wrongAnswers, setWrongAnswers] = useState<QuizPhrase[]>([]);
  const [done, setDone] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: categoryName ? `Trắc nghiệm: ${categoryName}` : 'Trắc nghiệm tổng hợp',
    });
  }, [categoryName, navigation]);

  if (questions.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <View style={styles.centerBox}>
          <Text style={styles.emptyText}>Chưa có câu hỏi để làm quiz.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const currentQuestion = questions[currentIndex];
  const isAnswered = selectedIndex !== null;

  const handleSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedIndex(index);

    if (index === currentQuestion.correctIndex) {
      setScore((prev) => prev + 1);
    } else {
      setWrongAnswers((prev) => [...prev, currentQuestion.phrase]);
    }
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

  const handleRetry = () => {
    setCurrentIndex(0);
    setSelectedIndex(null);
    setWrongAnswers([]);
    setDone(false);
    setScore(0);
  };

  if (done) {
    const total = questions.length;
    const percent = Math.round((score / total) * 100);

    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
        <ScrollView contentContainerStyle={styles.summaryContainer} showsVerticalScrollIndicator={false}>
          <Text style={styles.summaryTitle}>Hoàn thành quiz</Text>
          <Text style={styles.summarySubtitle}>{categoryName || 'Tổng hợp'}</Text>
          <Text style={[styles.summaryPercent, { color: accentColor }]}>{percent}% đúng</Text>
          <Text style={styles.summaryScore}>
            {score}/{total} câu
          </Text>

          {wrongAnswers.length > 0 && (
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
          )}

          <TouchableOpacity
            style={[styles.primaryButton, { backgroundColor: accentColor }]}
            onPress={handleRetry}
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
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${progressPercent}%`, backgroundColor: accentColor }]} />
      </View>

      <View style={styles.topRow}>
        <Text style={styles.counterText}>
          Câu {currentIndex + 1} / {questions.length}
        </Text>
        <Text style={styles.scoreText}>{score} đúng</Text>
      </View>

      <View style={styles.questionCard}>
        <Text style={styles.questionLabel}>Câu tiếng Nhật</Text>
        <Text style={styles.questionJp}>{currentQuestion.phrase.jp}</Text>
        <Text style={styles.questionRomaji}>{currentQuestion.phrase.romaji}</Text>
      </View>

      <View style={styles.optionsList}>
        {currentQuestion.options.map((option, index) => {
          const isCorrect = index === currentQuestion.correctIndex;
          const isSelected = index === selectedIndex;

          const optionStyle = [
            styles.option,
            isAnswered && isCorrect ? styles.optionCorrect : null,
            isAnswered && isSelected && !isCorrect ? styles.optionWrong : null,
          ];
          const optionTextStyle = [
            styles.optionText,
            isAnswered && isCorrect ? styles.optionTextCorrect : null,
            isAnswered && isSelected && !isCorrect ? styles.optionTextWrong : null,
          ];

          return (
            <TouchableOpacity
              key={`${currentQuestion.phrase.jp}-${index}`}
              style={optionStyle}
              onPress={() => handleSelect(index)}
              disabled={isAnswered}
            >
              <Text style={optionTextStyle}>{option}</Text>
              {isAnswered && isCorrect ? (
                <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
              ) : null}
              {isAnswered && isSelected && !isCorrect ? (
                <Ionicons name="close-circle" size={20} color={Colors.danger} />
              ) : null}
            </TouchableOpacity>
          );
        })}
      </View>

      {isAnswered && (
        <TouchableOpacity
          style={[styles.primaryButton, { backgroundColor: accentColor, marginTop: 12 }]}
          onPress={handleNext}
        >
          <Text style={styles.primaryButtonText}>
            {currentIndex + 1 >= questions.length ? 'Xem kết quả' : 'Câu tiếp theo'}
          </Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, padding: 16 },
  centerBox: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyText: { fontSize: 15, color: Colors.textSecondary },
  progressTrack: { height: 6, backgroundColor: Colors.border, borderRadius: 999, overflow: 'hidden' },
  progressFill: { height: 6, borderRadius: 999 },
  topRow: { marginTop: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  counterText: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary },
  scoreText: { fontSize: 13, fontWeight: '700', color: Colors.primary },
  questionCard: {
    marginTop: 18,
    backgroundColor: Colors.white,
    borderRadius: 18,
    padding: 20,
    alignItems: 'center',
  },
  questionLabel: { fontSize: 12, fontWeight: '700', color: Colors.primary, marginBottom: 10 },
  questionJp: { fontSize: 30, fontWeight: '800', color: Colors.textPrimary, textAlign: 'center' },
  questionRomaji: { fontSize: 14, color: Colors.textMuted, marginTop: 8, fontStyle: 'italic', textAlign: 'center' },
  optionsList: { marginTop: 18, gap: 10 },
  option: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  optionCorrect: { backgroundColor: '#EAF7EF', borderColor: '#27AE6030' },
  optionWrong: { backgroundColor: '#FDECEA', borderColor: '#E74C3C30' },
  optionText: { flex: 1, fontSize: 14, color: Colors.textPrimary, fontWeight: '600' },
  optionTextCorrect: { color: Colors.success },
  optionTextWrong: { color: Colors.danger },
  primaryButton: {
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  primaryButtonText: { color: Colors.white, fontSize: 14, fontWeight: '700' },
  secondaryButton: {
    marginTop: 10,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  secondaryButtonText: { color: Colors.textPrimary, fontSize: 14, fontWeight: '700' },
  summaryContainer: { paddingVertical: 40 },
  summaryTitle: { fontSize: 26, fontWeight: '800', color: Colors.textPrimary, textAlign: 'center' },
  summarySubtitle: { marginTop: 6, fontSize: 14, color: Colors.textSecondary, textAlign: 'center' },
  summaryPercent: { marginTop: 12, fontSize: 28, fontWeight: '800', textAlign: 'center' },
  summaryScore: { marginTop: 6, fontSize: 14, color: Colors.textSecondary, textAlign: 'center' },
  reviewCard: { marginTop: 24, backgroundColor: Colors.white, borderRadius: 16, padding: 16 },
  reviewTitle: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary, marginBottom: 12 },
  reviewItem: { paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: Colors.border },
  reviewJp: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary },
  reviewRomaji: { marginTop: 2, fontSize: 12, color: Colors.textMuted, fontStyle: 'italic' },
  reviewVn: { marginTop: 3, fontSize: 13, color: Colors.textSecondary },
});
