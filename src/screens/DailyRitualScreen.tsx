import React, { useEffect, useMemo, useState } from 'react';
import {
  Animated,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import AudioButton from '../components/AudioButton';
import { Colors } from '../constants/colors';
import { ESSENTIAL_PHRASES } from '../constants/content/japanese';
import { RootStackParamList } from '../navigation/AppNavigator';
import { stopJapaneseAudio } from '../utils/audio';
import { getTodayPhrase, getTodayQuizQuestions } from '../utils/dailyRitualContent';
import type { QuizPhrase, QuizQuestion } from '../utils/japaneseQuiz';
import { loadStreak, markStudiedToday, StreakData } from '../utils/japaneseStreak';
import { refreshDailyReminderContent } from '../utils/dailyReminderSync';
import { track } from '../utils/analytics';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type Stage = 'intro' | 'quiz' | 'done';

function todayDateString(): string {
  return new Date().toISOString().slice(0, 10);
}

export default function DailyRitualScreen() {
  const navigation = useNavigation<NavigationProp>();

  const todayPhrase = useMemo<QuizPhrase | null>(() => getTodayPhrase(ESSENTIAL_PHRASES), []);
  const questions = useMemo<QuizQuestion[]>(() => getTodayQuizQuestions(ESSENTIAL_PHRASES, 3), []);

  const [stage, setStage] = useState<Stage>('intro');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState<StreakData | null>(null);
  const [postStreak, setPostStreak] = useState<StreakData | null>(null);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  useFocusEffect(
    React.useCallback(() => {
      track('daily_ritual_view');
      loadStreak().then((data) => {
        setStreak(data);
        track('streak_viewed', { current_streak: data.currentStreak });
      });
      return () => {
        void stopJapaneseAudio();
      };
    }, [])
  );

  useEffect(() => {
    if (stage === 'done') {
      Animated.timing(fadeAnim, { toValue: 1, duration: 320, useNativeDriver: true }).start();
    } else {
      fadeAnim.setValue(0);
    }
  }, [stage, fadeAnim]);

  const alreadyDoneToday = streak?.lastStudyDate === todayDateString();

  const handleStartQuiz = () => {
    track('ritual_started');
    setCurrentIndex(0);
    setSelectedIndex(null);
    setScore(0);
    setStage('quiz');
  };

  const handleSelect = (index: number) => {
    if (selectedIndex !== null) return;
    setSelectedIndex(index);
    const isCorrect = index === questions[currentIndex].correctIndex;
    if (isCorrect) setScore((prev) => prev + 1);
    track('quiz_answered', { correct: isCorrect, question_index: currentIndex });
  };

  const handleNext = async () => {
    if (currentIndex + 1 >= questions.length) {
      const updated = await markStudiedToday();
      setPostStreak(updated);
      track('ritual_completed', {
        score,
        total: questions.length,
        new_streak: updated.currentStreak,
      });
      // Re-sync notifications so tomorrow's text reflects new streak
      refreshDailyReminderContent().catch(() => undefined);
      setStage('done');
      return;
    }
    setCurrentIndex((prev) => prev + 1);
    setSelectedIndex(null);
  };

  if (!todayPhrase) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <View style={styles.center}>
          <Text style={styles.bodyText}>Chưa có nội dung cho hôm nay.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const renderStreakBadge = (data: StreakData | null, big = false) => {
    if (!data) return null;
    const fired = data.currentStreak > 0;
    return (
      <View style={[styles.streakChip, big && styles.streakChipBig, fired && styles.streakChipActive]}>
        <Text style={styles.streakEmoji}>{fired ? '🔥' : '✨'}</Text>
        <Text style={[styles.streakNum, big && styles.streakNumBig]}>{data.currentStreak}</Text>
        <Text style={styles.streakLabel}>ngày liên tiếp</Text>
      </View>
    );
  };

  if (stage === 'intro') {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.headerCard}>
            <Text style={styles.eyebrow}>HÔM NAY</Text>
            {renderStreakBadge(streak)}
            {alreadyDoneToday ? (
              <View style={styles.statusPillDone}>
                <Ionicons name="checkmark-circle" size={16} color={Colors.success} />
                <Text style={styles.statusPillDoneText}>Bạn đã hoàn thành hôm nay</Text>
              </View>
            ) : (
              <View style={styles.statusPillPending}>
                <Ionicons name="time-outline" size={16} color={Colors.warning} />
                <Text style={styles.statusPillPendingText}>Còn 1 phút để giữ chuỗi</Text>
              </View>
            )}
          </View>

          <View style={styles.phraseCard}>
            <Text style={styles.phraseLabel}>Cụm câu hôm nay</Text>
            <View style={styles.phraseRow}>
              <Text style={styles.phraseJp}>{todayPhrase.jp}</Text>
              <AudioButton
                audioId={`daily-ritual:${todayPhrase.jp}`}
                text={todayPhrase.jp}
                backgroundColor={Colors.background}
              />
            </View>
            <Text style={styles.phraseRomaji}>{todayPhrase.romaji}</Text>
            <Text style={styles.phraseVn}>"{todayPhrase.vn}"</Text>
            <Text style={styles.phraseCategory}>Chủ đề: {todayPhrase.category}</Text>
          </View>

          <TouchableOpacity style={styles.primaryButton} onPress={handleStartQuiz}>
            <Ionicons name="rocket-outline" size={18} color={Colors.white} />
            <Text style={styles.primaryButtonText}>
              {alreadyDoneToday ? 'Ôn lại quiz hôm nay' : 'Bắt đầu 3 câu quiz'}
            </Text>
          </TouchableOpacity>

          <Text style={styles.helperText}>
            Quiz tổng hợp 3 câu (~30 giây). Hoàn thành để cộng vào chuỗi.
          </Text>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (stage === 'quiz') {
    const question = questions[currentIndex];
    const isAnswered = selectedIndex !== null;
    const progressPercent = ((currentIndex + (isAnswered ? 1 : 0)) / questions.length) * 100;

    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.quizTopRow}>
            <Text style={styles.counter}>
              Câu {currentIndex + 1} / {questions.length}
            </Text>
            <Text style={styles.scoreSmall}>{score} đúng</Text>
          </View>

          <View style={styles.questionCard}>
            <Text style={styles.label}>
              {question.direction === 'jp-to-vn' ? 'Câu tiếng Nhật' : 'Nghĩa tiếng Việt'}
            </Text>
            {question.direction === 'jp-to-vn' ? (
              <AudioButton
                audioId={`daily-ritual-quiz:${question.phrase.jp}:${currentIndex}`}
                text={question.phrase.jp}
                backgroundColor={Colors.background}
              />
            ) : null}
            <Text style={styles.questionJp}>{question.promptPrimary}</Text>
            {question.promptSecondary ? (
              <Text style={styles.questionRomaji}>{question.promptSecondary}</Text>
            ) : null}
          </View>

          <View style={styles.options}>
            {question.options.map((option, index) => {
              const isCorrect = index === question.correctIndex;
              const isSelected = index === selectedIndex;
              return (
                <TouchableOpacity
                  key={`${question.phrase.jp}-${index}`}
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
                    <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
                  ) : null}
                  {isAnswered && isSelected && !isCorrect ? (
                    <Ionicons name="close-circle" size={20} color={Colors.danger} />
                  ) : null}
                </TouchableOpacity>
              );
            })}
          </View>

          {isAnswered ? (
            <TouchableOpacity style={styles.primaryButton} onPress={handleNext}>
              <Text style={styles.primaryButtonText}>
                {currentIndex + 1 >= questions.length ? 'Xem kết quả' : 'Câu tiếp'}
              </Text>
            </TouchableOpacity>
          ) : null}
        </ScrollView>
      </SafeAreaView>
    );
  }

  // stage === 'done'
  const total = questions.length;
  const percent = Math.round((score / total) * 100);
  const streakIncreased = postStreak && streak && postStreak.currentStreak > streak.currentStreak;

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <Animated.View style={[styles.scrollContent, { opacity: fadeAnim }]}>
        <Text style={styles.celebrate}>🎉</Text>
        <Text style={styles.title}>Hoàn thành ngày hôm nay!</Text>
        <Text style={styles.subtitle}>
          {score}/{total} câu đúng ({percent}%)
        </Text>

        <View style={styles.streakResultCard}>
          {renderStreakBadge(postStreak, true)}
          {streakIncreased ? (
            <Text style={styles.streakIncreaseText}>
              +1 ngày so với hôm qua. Tiếp tục ngày mai nhé!
            </Text>
          ) : (
            <Text style={styles.streakIncreaseText}>Bạn đã giữ chuỗi hôm nay.</Text>
          )}
          {postStreak && postStreak.longestStreak > 0 ? (
            <Text style={styles.streakStatText}>
              Chuỗi dài nhất: {postStreak.longestStreak} ngày · Tổng số ngày: {postStreak.totalDaysStudied}
            </Text>
          ) : null}
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.goBack()}>
          <Text style={styles.primaryButtonText}>Hẹn ngày mai</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('JapaneseQuiz', {})}
        >
          <Text style={styles.secondaryButtonText}>Làm thêm trắc nghiệm tổng hợp</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { padding: 16, paddingBottom: 40 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  bodyText: { fontSize: 14, color: Colors.textSecondary, textAlign: 'center' },

  headerCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    gap: 12,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: '800',
    fontFamily: 'BeVietnamPro_800ExtraBold',
    letterSpacing: 1.5,
    color: Colors.primary,
  },
  streakChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: Colors.background,
  },
  streakChipBig: { paddingHorizontal: 18, paddingVertical: 12 },
  streakChipActive: { backgroundColor: '#FFF1E0' },
  streakEmoji: { fontSize: 16 },
  streakNum: {
    fontSize: 20,
    fontWeight: '800',
    fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.textPrimary,
  },
  streakNumBig: { fontSize: 32 },
  streakLabel: { fontSize: 12, color: Colors.textSecondary, fontWeight: '600', fontFamily: 'BeVietnamPro_600SemiBold' },

  statusPillDone: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: Colors.successLight,
  },
  statusPillDoneText: { fontSize: 12, fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold', color: Colors.success },
  statusPillPending: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: Colors.warningLight,
  },
  statusPillPendingText: { fontSize: 12, fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold', color: Colors.warning },

  phraseCard: {
    marginTop: 16,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  phraseLabel: {
    fontSize: 11,
    fontWeight: '800',
    fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.primary,
    letterSpacing: 1.2,
    marginBottom: 12,
  },
  phraseRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  phraseJp: {
    fontSize: 26,
    fontWeight: '800',
    fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  phraseRomaji: {
    marginTop: 8,
    fontSize: 14,
    color: Colors.textMuted,
    fontStyle: 'italic',
  },
  phraseVn: {
    marginTop: 12,
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  phraseCategory: {
    marginTop: 14,
    fontSize: 11,
    color: Colors.textMuted,
    fontWeight: '600',
    fontFamily: 'BeVietnamPro_600SemiBold',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },

  primaryButton: {
    marginTop: 18,
    flexDirection: 'row',
    gap: 8,
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: { color: Colors.white, fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold', fontSize: 15 },
  secondaryButton: {
    marginTop: 12,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  secondaryButtonText: { color: Colors.textPrimary, fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold', fontSize: 14 },

  helperText: {
    marginTop: 12,
    fontSize: 12,
    color: Colors.textMuted,
    textAlign: 'center',
    fontStyle: 'italic',
  },

  progressTrack: { height: 6, backgroundColor: Colors.border, borderRadius: 999, overflow: 'hidden' },
  progressFill: { height: 6, borderRadius: 999, backgroundColor: Colors.primary },

  quizTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  counter: { fontSize: 14, fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold', color: Colors.textPrimary },
  scoreSmall: { fontSize: 13, fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold', color: Colors.primary },

  questionCard: {
    marginTop: 16,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  label: { fontSize: 12, fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold', color: Colors.primary, marginBottom: 10 },
  questionJp: {
    fontSize: 26,
    fontWeight: '800',
    fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginTop: 6,
  },
  questionRomaji: {
    fontSize: 14,
    color: Colors.textMuted,
    marginTop: 8,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  options: { marginTop: 16, gap: 10 },
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
  optionCorrect: { borderColor: Colors.success, backgroundColor: Colors.successLight },
  optionWrong: { borderColor: Colors.danger, backgroundColor: Colors.dangerLight },
  optionTextWrap: { flex: 1 },
  optionText: { fontSize: 14, fontWeight: '600', fontFamily: 'BeVietnamPro_600SemiBold', color: Colors.textPrimary },
  optionSubText: { marginTop: 4, fontSize: 12, color: Colors.textSecondary, fontStyle: 'italic' },

  celebrate: { fontSize: 48, textAlign: 'center', marginTop: 20 },
  title: {
    marginTop: 12,
    fontSize: 22,
    fontWeight: '800',
    fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  subtitle: { marginTop: 6, fontSize: 14, color: Colors.textSecondary, textAlign: 'center' },
  streakResultCard: {
    marginTop: 24,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    gap: 10,
  },
  streakIncreaseText: { fontSize: 13, color: Colors.textSecondary, textAlign: 'center' },
  streakStatText: { marginTop: 4, fontSize: 12, color: Colors.textMuted, textAlign: 'center' },
});
