import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../constants/colors';
import { ESSENTIAL_PHRASES } from '../constants/content';
import { RootStackParamList } from '../navigation/AppNavigator';
import {
  LEVEL_COLORS,
  LEVEL_LABELS,
  loadProgress,
  PhraseLevel,
  ProgressData,
  sortByLevel,
  updatePhraseLevel,
} from '../utils/japaneseProgress';
import { markStudiedToday } from '../utils/japaneseStreak';
import { recordRecentJapaneseCategory } from '../utils/japaneseRecentCategories';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RouteType = RouteProp<RootStackParamList, 'JapanesePractice'>;
type Answer = 'forgot' | 'remembered' | 'mastered';
type Phrase = { jp: string; romaji: string; vn: string };

export default function JapanesePracticeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteType>();
  const { categoryName, categoryColor } = route.params;
  const accentColor = categoryColor || Colors.primary;

  const category = ESSENTIAL_PHRASES.find((item) => item.category === categoryName);
  const allPhrases: Phrase[] = category?.phrases ?? [];

  const [progress, setProgress] = useState<ProgressData>({});
  const [cards, setCards] = useState<Phrase[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [results, setResults] = useState<Answer[]>([]);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(true);

  const flipAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    navigation.setOptions({ headerTitle: categoryName });
    recordRecentJapaneseCategory(categoryName, accentColor).catch(() => undefined);
    loadProgress().then((data) => {
      setProgress(data);
      setCards(sortByLevel(allPhrases, data));
      setLoading(false);
    });
  }, [accentColor, allPhrases, categoryName, navigation]);

  useEffect(() => {
    flipAnim.setValue(0);
    setFlipped(false);
  }, [currentIndex, flipAnim]);

  const frontOpacity = flipAnim.interpolate({
    inputRange: [0, 0.45, 0.5, 1],
    outputRange: [1, 1, 0, 0],
  });
  const backOpacity = flipAnim.interpolate({
    inputRange: [0, 0.45, 0.5, 1],
    outputRange: [0, 0, 1, 1],
  });
  const frontRotate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });
  const backRotate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['-180deg', '0deg'],
  });

  const flipCard = () => {
    if (flipped) return;
    Animated.spring(flipAnim, {
      toValue: 1,
      friction: 7,
      tension: 12,
      useNativeDriver: true,
    }).start();
    setFlipped(true);
  };

  const handleAnswer = async (answer: Answer) => {
    const card = cards[currentIndex];
    const currentLevel = (progress[card.jp] ?? 0) as PhraseLevel;
    const newLevel = await updatePhraseLevel(card.jp, answer, currentLevel);
    setProgress((prev) => ({ ...prev, [card.jp]: newLevel }));
    setResults((prev) => [...prev, answer]);

    if (currentIndex + 1 >= cards.length) {
      await markStudiedToday();
      setDone(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleRetryAll = () => {
    setCards(sortByLevel(allPhrases, progress));
    setCurrentIndex(0);
    setResults([]);
    setDone(false);
  };

  const handleRetryForgotten = () => {
    const forgottenCards = cards.filter((_, index) => results[index] === 'forgot');
    setCards(sortByLevel(forgottenCards.length > 0 ? forgottenCards : allPhrases, progress));
    setCurrentIndex(0);
    setResults([]);
    setDone(false);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <View style={styles.centerBox}>
          <Text style={styles.loadingText}>Đang tải...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (cards.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <View style={styles.centerBox}>
          <Text style={styles.loadingText}>Chưa có dữ liệu luyện tập.</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (done) {
    const masteredCount = results.filter((item) => item === 'mastered').length;
    const rememberedCount = results.filter((item) => item === 'remembered').length;
    const forgotCount = results.filter((item) => item === 'forgot').length;
    const percent = Math.round(((masteredCount + rememberedCount) / results.length) * 100);

    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>Hoàn thành luyện tập</Text>
          <Text style={styles.summarySubtitle}>{categoryName}</Text>
          <Text style={[styles.summaryPercent, { color: accentColor }]}>{percent}% đã nhớ</Text>

          <View style={styles.summaryStats}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{masteredCount}</Text>
              <Text style={styles.statLabel}>Thành thạo</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{rememberedCount}</Text>
              <Text style={styles.statLabel}>Đã nhớ</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{forgotCount}</Text>
              <Text style={styles.statLabel}>Chưa nhớ</Text>
            </View>
          </View>

          {forgotCount > 0 ? (
            <TouchableOpacity
              style={[styles.primaryAction, { backgroundColor: accentColor }]}
              onPress={handleRetryForgotten}
            >
              <Text style={styles.primaryActionText}>Luyện lại phần chưa nhớ</Text>
            </TouchableOpacity>
          ) : null}

          <TouchableOpacity style={styles.secondaryAction} onPress={handleRetryAll}>
            <Text style={styles.secondaryActionText}>Luyện lại toàn bộ</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.doneButton} onPress={() => navigation.goBack()}>
            <Text style={styles.doneButtonText}>Xong</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const card = cards[currentIndex];
  const cardLevel = (progress[card.jp] ?? 0) as PhraseLevel;
  const progressPercent = ((currentIndex + 1) / cards.length) * 100;

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${progressPercent}%`, backgroundColor: accentColor }]} />
      </View>

      <View style={styles.topRow}>
        <Text style={styles.counterText}>
          {currentIndex + 1} / {cards.length}
        </Text>
        <View style={[styles.levelBadge, { backgroundColor: `${LEVEL_COLORS[cardLevel]}20` }]}>
          <View style={[styles.levelDot, { backgroundColor: LEVEL_COLORS[cardLevel] }]} />
          <Text style={[styles.levelText, { color: LEVEL_COLORS[cardLevel] }]}>{LEVEL_LABELS[cardLevel]}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.cardWrapper} onPress={flipCard} activeOpacity={1}>
        <Animated.View
          style={[
            styles.card,
            styles.cardFront,
            { opacity: frontOpacity, transform: [{ perspective: 1200 }, { rotateY: frontRotate }] },
          ]}
        >
          <Text style={styles.cardLabel}>Tiếng Nhật</Text>
          <Text style={styles.cardJp}>{card.jp}</Text>
          <Text style={styles.cardRomaji}>{card.romaji}</Text>
          <Text style={styles.cardHint}>Chạm để xem nghĩa</Text>
        </Animated.View>

        <Animated.View
          pointerEvents="none"
          style={[
            styles.card,
            styles.cardBack,
            { opacity: backOpacity, transform: [{ perspective: 1200 }, { rotateY: backRotate }] },
          ]}
        >
          <Text style={styles.cardLabel}>Nghĩa tiếng Việt</Text>
          <Text style={styles.cardMeaning}>{card.vn}</Text>
          <Text style={styles.cardHint}>Chọn mức độ bạn nhớ câu này</Text>
        </Animated.View>
      </TouchableOpacity>

      <View style={styles.answerRow}>
        <TouchableOpacity
          style={[styles.answerButton, { backgroundColor: '#FDECEA', borderColor: '#E74C3C30' }]}
          onPress={() => handleAnswer('forgot')}
          disabled={!flipped}
        >
          <Text style={[styles.answerText, { color: Colors.danger }]}>Chưa nhớ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.answerButton, { backgroundColor: '#EDF4FE', borderColor: '#2980B930' }]}
          onPress={() => handleAnswer('remembered')}
          disabled={!flipped}
        >
          <Text style={[styles.answerText, { color: '#2980B9' }]}>Đã nhớ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.answerButton, { backgroundColor: '#EAF7EF', borderColor: '#27AE6030' }]}
          onPress={() => handleAnswer('mastered')}
          disabled={!flipped}
        >
          <Text style={[styles.answerText, { color: Colors.success }]}>Thành thạo</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, padding: 16 },
  centerBox: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  loadingText: { fontSize: 15, color: Colors.textSecondary },
  progressTrack: { height: 6, backgroundColor: Colors.border, borderRadius: 999, overflow: 'hidden' },
  progressFill: { height: 6, borderRadius: 999 },
  topRow: { marginTop: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  counterText: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  levelDot: { width: 8, height: 8, borderRadius: 999 },
  levelText: { fontSize: 12, fontWeight: '700' },
  cardWrapper: { flex: 1, justifyContent: 'center' },
  card: {
    position: 'absolute',
    width: '100%',
    minHeight: 300,
    borderRadius: 20,
    backgroundColor: Colors.white,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  cardFront: {},
  cardBack: {},
  cardLabel: { fontSize: 12, fontWeight: '700', color: Colors.primary, marginBottom: 12 },
  cardJp: { fontSize: 32, fontWeight: '800', color: Colors.textPrimary, textAlign: 'center' },
  cardRomaji: { fontSize: 15, color: Colors.textMuted, marginTop: 8, fontStyle: 'italic', textAlign: 'center' },
  cardMeaning: { fontSize: 24, fontWeight: '700', color: Colors.textPrimary, textAlign: 'center' },
  cardHint: { marginTop: 16, fontSize: 13, color: Colors.textSecondary, textAlign: 'center' },
  answerRow: { flexDirection: 'row', gap: 8, marginTop: 20 },
  answerButton: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 14,
    alignItems: 'center',
  },
  answerText: { fontSize: 13, fontWeight: '700' },
  summaryContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  summaryTitle: { fontSize: 26, fontWeight: '800', color: Colors.textPrimary },
  summarySubtitle: { marginTop: 6, fontSize: 14, color: Colors.textSecondary },
  summaryPercent: { marginTop: 12, fontSize: 28, fontWeight: '800' },
  summaryStats: { flexDirection: 'row', gap: 10, marginTop: 20, width: '100%' },
  statCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
  },
  statValue: { fontSize: 22, fontWeight: '800', color: Colors.textPrimary },
  statLabel: { marginTop: 4, fontSize: 12, color: Colors.textSecondary },
  primaryAction: {
    marginTop: 24,
    width: '100%',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  primaryActionText: { color: Colors.white, fontSize: 14, fontWeight: '700' },
  secondaryAction: {
    marginTop: 10,
    width: '100%',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  secondaryActionText: { color: Colors.textPrimary, fontSize: 14, fontWeight: '700' },
  doneButton: { marginTop: 10, paddingVertical: 12 },
  doneButtonText: { color: Colors.textSecondary, fontSize: 14, fontWeight: '700' },
});
