import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
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
type QuizQuestion = {
  phrase: QuizPhrase;
  options: string[]; // 4 Vietnamese options
  correctIndex: number;
};

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildQuestions(phrases: QuizPhrase[], allPool: QuizPhrase[]): QuizQuestion[] {
  return shuffleArray(phrases).map((phrase) => {
    // Pick 3 wrong answers from the pool (different from correct)
    const wrongPool = allPool.filter((p) => p.vn !== phrase.vn);
    const wrongs = shuffleArray(wrongPool)
      .slice(0, 3)
      .map((p) => p.vn);

    const options = shuffleArray([phrase.vn, ...wrongs]);
    const correctIndex = options.indexOf(phrase.vn);

    return { phrase, options, correctIndex };
  });
}

export default function JapaneseQuizScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteType>();
  const { categoryName, categoryColor } = route.params;

  const accentColor = categoryColor || Colors.primary;

  // Build question pool
  const questions: QuizQuestion[] = React.useMemo(() => {
    const allPhrases: QuizPhrase[] = ESSENTIAL_PHRASES.flatMap((cat) =>
      (cat.phrases as { jp: string; romaji: string; vn: string }[]).map((p) => ({
        ...p,
        category: cat.category,
      }))
    );

    let targetPhrases: QuizPhrase[];
    if (categoryName) {
      const cat = ESSENTIAL_PHRASES.find((c) => c.category === categoryName);
      targetPhrases = (cat?.phrases as { jp: string; romaji: string; vn: string }[] ?? []).map(
        (p) => ({ ...p, category: categoryName })
      );
    } else {
      targetPhrases = allPhrases;
    }

    return buildQuestions(targetPhrases, allPhrases);
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [wrongAnswers, setWrongAnswers] = useState<QuizPhrase[]>([]);
  const [done, setDone] = useState(false);
  const [score, setScore] = useState(0);

  const shakeAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    navigation.setOptions({
      headerTitle: categoryName ? `Trắc nghiệm: ${categoryName}` : 'Trắc nghiệm tổng hợp',
    });
  }, []);

  const currentQuestion = questions[currentIndex];
  const isAnswered = selectedIndex !== null;
  const isCorrect = selectedIndex === currentQuestion?.correctIndex;

  const handleSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedIndex(index);

    if (index === currentQuestion.correctIndex) {
      setScore((s) => s + 1);
    } else {
      // Shake animation for wrong answer
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: 10, duration: 60, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -10, duration: 60, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 8, duration: 60, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -8, duration: 60, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 60, useNativeDriver: true }),
      ]).start();
      setWrongAnswers((prev) => [...prev, currentQuestion.phrase]);
    }
  };

  const handleNext = async () => {
    // Fade transition
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0, duration: 150, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 150, useNativeDriver: true }),
    ]).start();

    if (currentIndex + 1 >= questions.length) {
      await markStudiedToday();
      setDone(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelectedIndex(null);
      shakeAnim.setValue(0);
    }
  };

  const handleRetry = () => {
    setCurrentIndex(0);
    setSelectedIndex(null);
    setScore(0);
    setWrongAnswers([]);
    setDone(false);
    shakeAnim.setValue(0);
    fadeAnim.setValue(1);
  };

  // ── SUMMARY ──
  if (done) {
    const total = questions.length;
    const percent = Math.round((score / total) * 100);
    const isExcellent = percent >= 80;

    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
        <ScrollView contentContainerStyle={styles.summaryScroll} showsVerticalScrollIndicator={false}>
          <View style={[styles.summaryIconBg, { backgroundColor: isExcellent ? '#27AE6020' : '#E67E2220' }]}>
            <Ionicons
              name={isExcellent ? 'trophy' : 'school'}
              size={56}
              color={isExcellent ? '#27AE60' : '#E67E22'}
            />
          </View>

          <Text style={styles.summaryTitle}>{isExcellent ? 'Tuyệt vời!' : 'Cố lên!'}</Text>
          <Text style={styles.summarySubtitle}>
            {categoryName || 'Tổng hợp'}
          </Text>

          <View style={styles.scoreCircle}>
            <Text style={[styles.scoreNum, { color: isExcellent ? '#27AE60' : accentColor }]}>
              {score}/{total}
            </Text>
            <Text style={styles.scoreLabel}>{percent}% chính xác</Text>
          </View>

          <View style={styles.statsRow}>
            <View style={[styles.statBox, { backgroundColor: '#27AE6015', borderColor: '#27AE6030' }]}>
              <Ionicons name="checkmark-circle" size={22} color="#27AE60" />
              <Text style={[styles.statNum, { color: '#27AE60' }]}>{score}</Text>
              <Text style={styles.statLabel}>Đúng</Text>
            </View>
            <View style={[styles.statBox, { backgroundColor: '#E74C3C15', borderColor: '#E74C3C30' }]}>
              <Ionicons name="close-circle" size={22} color="#E74C3C" />
              <Text style={[styles.statNum, { color: '#E74C3C' }]}>{total - score}</Text>
              <Text style={styles.statLabel}>Sai</Text>
            </View>
          </View>

          {wrongAnswers.length > 0 && (
            <View style={styles.wrongSection}>
              <Text style={styles.wrongTitle}>Cần ôn lại:</Text>
              {wrongAnswers.map((phrase, i) => (
                <View key={i} style={styles.wrongItem}>
                  <Text style={styles.wrongJp}>{phrase.jp}</Text>
                  <Text style={styles.wrongRomaji}>{phrase.romaji}</Text>
                  <Text style={styles.wrongVn}>{phrase.vn}</Text>
                </View>
              ))}
            </View>
          )}

          <TouchableOpacity
            style={[styles.retryBtn, { backgroundColor: accentColor }]}
            onPress={handleRetry}
          >
            <Ionicons name="refresh" size={18} color={Colors.white} />
            <Text style={styles.retryBtnText}>Làm lại</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.doneBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.doneBtnText}>Xong</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ── QUIZ CARD ──
  const progressPercent = currentIndex / questions.length;

  const getOptionStyle = (index: number) => {
    if (!isAnswered) return styles.optionDefault;
    if (index === currentQuestion.correctIndex) return styles.optionCorrect;
    if (index === selectedIndex) return styles.optionWrong;
    return styles.optionDisabled;
  };

  const getOptionTextStyle = (index: number) => {
    if (!isAnswered) return styles.optionTextDefault;
    if (index === currentQuestion.correctIndex) return styles.optionTextCorrect;
    if (index === selectedIndex) return styles.optionTextWrong;
    return styles.optionTextDisabled;
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      {/* Top progress bar */}
      <View style={styles.topProgressBg}>
        <View
          style={[
            styles.topProgressFill,
            { width: `${progressPercent * 100}%`, backgroundColor: accentColor },
          ]}
        />
      </View>

      {/* Counter */}
      <View style={styles.topRow}>
        <Text style={styles.cardCounter}>
          Câu {currentIndex + 1} / {questions.length}
        </Text>
        <View style={[styles.scoreBadge, { backgroundColor: accentColor + '18' }]}>
          <Ionicons name="checkmark-circle" size={14} color={accentColor} />
          <Text style={[styles.scoreBadgeText, { color: accentColor }]}>{score} đúng</Text>
        </View>
      </View>

      <Animated.View style={[styles.questionArea, { opacity: fadeAnim }]}>
        {/* Question card */}
        <Animated.View
          style={[
            styles.questionCard,
            { borderColor: accentColor + '30', transform: [{ translateX: shakeAnim }] },
          ]}
        >
          <View style={[styles.questionTopBar, { backgroundColor: accentColor + '12' }]}>
            <Text style={[styles.questionTopBarText, { color: accentColor }]}>
              Câu này nghĩa là gì?
            </Text>
          </View>
          <View style={styles.questionBody}>
            <Text style={styles.questionJp}>{currentQuestion?.phrase.jp}</Text>
            <Text style={styles.questionRomaji}>{currentQuestion?.phrase.romaji}</Text>
            <Text style={styles.questionCategory}>{currentQuestion?.phrase.category}</Text>
          </View>
        </Animated.View>

        {/* Options */}
        <View style={styles.optionsArea}>
          {currentQuestion?.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.optionBtn, getOptionStyle(index)]}
              onPress={() => handleSelect(index)}
              activeOpacity={isAnswered ? 1 : 0.75}
              disabled={isAnswered}
            >
              <View style={styles.optionInner}>
                <View
                  style={[
                    styles.optionLetter,
                    isAnswered && index === currentQuestion.correctIndex && styles.optionLetterCorrect,
                    isAnswered && index === selectedIndex && index !== currentQuestion.correctIndex && styles.optionLetterWrong,
                  ]}
                >
                  <Text
                    style={[
                      styles.optionLetterText,
                      isAnswered && index === currentQuestion.correctIndex && { color: '#27AE60' },
                      isAnswered && index === selectedIndex && index !== currentQuestion.correctIndex && { color: '#E74C3C' },
                    ]}
                  >
                    {['A', 'B', 'C', 'D'][index]}
                  </Text>
                </View>
                <Text style={[styles.optionText, getOptionTextStyle(index)]}>{option}</Text>
                {isAnswered && index === currentQuestion.correctIndex && (
                  <Ionicons name="checkmark-circle" size={20} color="#27AE60" />
                )}
                {isAnswered && index === selectedIndex && index !== currentQuestion.correctIndex && (
                  <Ionicons name="close-circle" size={20} color="#E74C3C" />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>

      {/* Feedback + Next button */}
      {isAnswered && (
        <View style={[styles.feedbackBar, isCorrect ? styles.feedbackCorrect : styles.feedbackWrong]}>
          <View style={styles.feedbackLeft}>
            <Ionicons
              name={isCorrect ? 'checkmark-circle' : 'close-circle'}
              size={22}
              color={isCorrect ? '#27AE60' : '#E74C3C'}
            />
            <Text style={[styles.feedbackText, { color: isCorrect ? '#27AE60' : '#E74C3C' }]}>
              {isCorrect ? 'Chính xác!' : 'Chưa đúng — ôn lại nhé!'}
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.nextBtn, { backgroundColor: accentColor }]}
            onPress={handleNext}
          >
            <Text style={styles.nextBtnText}>
              {currentIndex + 1 >= questions.length ? 'Xem kết quả' : 'Câu tiếp'}
            </Text>
            <Ionicons name="arrow-forward" size={16} color={Colors.white} />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },

  // Progress
  topProgressBg: { height: 4, backgroundColor: Colors.border, width: '100%' },
  topProgressFill: { height: 4, borderRadius: 2 },

  // Top row
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  cardCounter: { fontSize: 15, fontWeight: '700', color: Colors.textSecondary },
  scoreBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  scoreBadgeText: { fontSize: 12, fontWeight: '700' },

  // Question area
  questionArea: { flex: 1, paddingHorizontal: 16 },

  // Question card
  questionCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    borderWidth: 1.5,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  questionTopBar: { paddingHorizontal: 16, paddingVertical: 8, alignItems: 'center' },
  questionTopBarText: { fontSize: 11, fontWeight: '800', letterSpacing: 0.8, textTransform: 'uppercase' },
  questionBody: { alignItems: 'center', paddingHorizontal: 20, paddingVertical: 20, gap: 6 },
  questionJp: { fontSize: 38, fontWeight: '800', color: Colors.textPrimary, textAlign: 'center' },
  questionRomaji: { fontSize: 14, color: Colors.textMuted, fontStyle: 'italic', textAlign: 'center' },
  questionCategory: {
    fontSize: 11,
    color: Colors.textMuted,
    fontWeight: '600',
    backgroundColor: Colors.accent,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
    marginTop: 4,
  },

  // Options
  optionsArea: { gap: 10 },
  optionBtn: {
    borderRadius: 14,
    borderWidth: 1.5,
    overflow: 'hidden',
  },
  optionDefault: {
    backgroundColor: Colors.white,
    borderColor: Colors.border,
  },
  optionCorrect: {
    backgroundColor: '#27AE6012',
    borderColor: '#27AE6060',
  },
  optionWrong: {
    backgroundColor: '#E74C3C12',
    borderColor: '#E74C3C60',
  },
  optionDisabled: {
    backgroundColor: Colors.white,
    borderColor: Colors.border,
    opacity: 0.5,
  },
  optionInner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 13,
    gap: 12,
  },
  optionLetter: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionLetterCorrect: { backgroundColor: '#27AE6018' },
  optionLetterWrong: { backgroundColor: '#E74C3C18' },
  optionLetterText: { fontSize: 13, fontWeight: '800', color: Colors.textSecondary },
  optionText: { flex: 1, fontSize: 14, fontWeight: '600' },
  optionTextDefault: { color: Colors.textPrimary },
  optionTextCorrect: { color: '#27AE60' },
  optionTextWrong: { color: '#E74C3C' },
  optionTextDisabled: { color: Colors.textMuted },

  // Feedback bar
  feedbackBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderTopWidth: 1,
  },
  feedbackCorrect: {
    backgroundColor: '#27AE6010',
    borderTopColor: '#27AE6030',
  },
  feedbackWrong: {
    backgroundColor: '#E74C3C10',
    borderTopColor: '#E74C3C30',
  },
  feedbackLeft: { flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 },
  feedbackText: { fontSize: 14, fontWeight: '700' },
  nextBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
  },
  nextBtnText: { fontSize: 14, fontWeight: '700', color: Colors.white },

  // Summary
  summaryScroll: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
    gap: 14,
  },
  summaryIconBg: {
    width: 110,
    height: 110,
    borderRadius: 34,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  summaryTitle: { fontSize: 30, fontWeight: '800', color: Colors.textPrimary },
  summarySubtitle: { fontSize: 14, color: Colors.textSecondary, textAlign: 'center', marginTop: -6 },
  scoreCircle: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 20,
    paddingHorizontal: 40,
    paddingVertical: 18,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    width: '100%',
  },
  scoreNum: { fontSize: 40, fontWeight: '800' },
  scoreLabel: { fontSize: 15, color: Colors.textSecondary, fontWeight: '600', marginTop: 2 },
  statsRow: { flexDirection: 'row', gap: 12, width: '100%' },
  statBox: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    gap: 4,
  },
  statNum: { fontSize: 26, fontWeight: '800' },
  statLabel: { fontSize: 12, fontWeight: '600', color: Colors.textSecondary },
  wrongSection: {
    width: '100%',
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 14,
    gap: 10,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  wrongTitle: { fontSize: 13, fontWeight: '800', color: Colors.textSecondary, marginBottom: 2 },
  wrongItem: {
    borderLeftWidth: 3,
    borderLeftColor: '#E74C3C',
    paddingLeft: 12,
    paddingVertical: 4,
  },
  wrongJp: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary },
  wrongRomaji: { fontSize: 12, color: Colors.textMuted, fontStyle: 'italic' },
  wrongVn: { fontSize: 13, color: Colors.textSecondary, fontWeight: '500' },
  retryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 16,
    width: '100%',
    justifyContent: 'center',
    marginTop: 4,
  },
  retryBtnText: { fontSize: 15, fontWeight: '700', color: Colors.white },
  doneBtn: {
    paddingVertical: 12,
    paddingHorizontal: 48,
    borderRadius: 14,
    backgroundColor: Colors.accent,
  },
  doneBtnText: { fontSize: 15, fontWeight: '700', color: Colors.primary },
});
