import React, { useState, useRef, useEffect } from 'react';
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
  loadProgress,
  updatePhraseLevel,
  sortByLevel,
  LEVEL_COLORS,
  LEVEL_LABELS,
  PhraseLevel,
  ProgressData,
} from '../utils/japaneseProgress';
import { markStudiedToday } from '../utils/japaneseStreak';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RouteType = RouteProp<RootStackParamList, 'JapanesePractice'>;
type Answer = 'forgot' | 'remembered' | 'mastered';

type Phrase = { jp: string; romaji: string; vn: string };

export default function JapanesePracticeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteType>();
  const { categoryName, categoryColor } = route.params;

  const cat = ESSENTIAL_PHRASES.find((c) => c.category === categoryName);
  const allPhrases: Phrase[] = (cat?.phrases ?? []) as Phrase[];

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
    loadProgress().then((p) => {
      setProgress(p);
      setCards(sortByLevel(allPhrases, p));
      setLoading(false);
    });
  }, []);

  // Reset flip animation when card changes
  useEffect(() => {
    flipAnim.setValue(0);
    setFlipped(false);
  }, [currentIndex]);

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
    const newProgress = { ...progress, [card.jp]: newLevel };
    setProgress(newProgress);
    const newResults = [...results, answer];
    setResults(newResults);

    if (currentIndex + 1 >= cards.length) {
      await markStudiedToday();
      setDone(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleRetryForgotten = () => {
    const forgottenCards = cards.filter((_, i) => results[i] === 'forgot');
    setCards(sortByLevel(forgottenCards.length > 0 ? forgottenCards : allPhrases, progress));
    setCurrentIndex(0);
    setResults([]);
    setDone(false);
  };

  const handleRetryAll = () => {
    setCards(sortByLevel(allPhrases, progress));
    setCurrentIndex(0);
    setResults([]);
    setDone(false);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <View style={styles.loadingBox}>
          <Text style={styles.loadingText}>Đang tải...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // ── SUMMARY SCREEN ──
  if (done) {
    const masteredCount = results.filter((r) => r === 'mastered').length;
    const rememberedCount = results.filter((r) => r === 'remembered').length;
    const forgotCount = results.filter((r) => r === 'forgot').length;
    const totalLearned = masteredCount + rememberedCount;
    const percent = Math.round((totalLearned / results.length) * 100);
    const isExcellent = forgotCount === 0;

    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
        <View style={styles.summaryContainer}>
          <View style={[styles.summaryIconBg, { backgroundColor: isExcellent ? '#27AE6020' : '#2980B920' }]}>
            <Ionicons
              name={isExcellent ? 'trophy' : 'checkmark-circle'}
              size={56}
              color={isExcellent ? '#27AE60' : '#2980B9'}
            />
          </View>

          <Text style={styles.summaryTitle}>{isExcellent ? 'Xuất sắc!' : 'Hoàn thành!'}</Text>
          <Text style={styles.summarySubtitle}>{categoryName}</Text>
          <Text style={styles.summaryPercent}>{percent}% đã nhớ</Text>

          <View style={styles.statsRow}>
            <View style={[styles.statBox, { backgroundColor: '#27AE6015', borderColor: '#27AE6030' }]}>
              <Ionicons name="star" size={20} color="#27AE60" />
              <Text style={[styles.statNum, { color: '#27AE60' }]}>{masteredCount}</Text>
              <Text style={styles.statLabel}>Thành thạo</Text>
            </View>
            <View style={[styles.statBox, { backgroundColor: '#2980B915', borderColor: '#2980B930' }]}>
              <Ionicons name="checkmark-circle" size={20} color="#2980B9" />
              <Text style={[styles.statNum, { color: '#2980B9' }]}>{rememberedCount}</Text>
              <Text style={styles.statLabel}>Đã nhớ</Text>
            </View>
            <View style={[styles.statBox, { backgroundColor: '#E74C3C15', borderColor: '#E74C3C30' }]}>
              <Ionicons name="close-circle" size={20} color="#E74C3C" />
              <Text style={[styles.statNum, { color: '#E74C3C' }]}>{forgotCount}</Text>
              <Text style={styles.statLabel}>Chưa nhớ</Text>
            </View>
          </View>

          {forgotCount > 0 && (
            <TouchableOpacity
              style={[styles.retryForgotBtn, { backgroundColor: categoryColor || Colors.primary }]}
              onPress={handleRetryForgotten}
            >
              <Ionicons name="refresh" size={18} color={Colors.white} />
              <Text style={styles.retryBtnText}>Luyện lại {forgotCount} câu chưa nhớ</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.retryAllBtn} onPress={handleRetryAll}>
            <Ionicons name="albums-outline" size={16} color={Colors.textSecondary} />
            <Text style={styles.retryAllText}>Luyện lại toàn bộ {allPhrases.length} câu</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.doneBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.doneBtnText}>Xong</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // ── PRACTICE CARD ──
  const card = cards[currentIndex];
  const cardLevel = (progress[card?.jp] ?? 0) as PhraseLevel;
  const progressPercent = currentIndex / cards.length;

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      {/* Top progress bar */}
      <View style={styles.topProgressBg}>
        <Animated.View
          style={[
            styles.topProgressFill,
            {
              width: `${progressPercent * 100}%`,
              backgroundColor: categoryColor || Colors.primary,
            },
          ]}
        />
      </View>

      {/* Counter + level badge */}
      <View style={styles.topRow}>
        <Text style={styles.cardCounter}>
          {currentIndex + 1} / {cards.length}
        </Text>
        <View style={[styles.levelBadge, { backgroundColor: LEVEL_COLORS[cardLevel] + '20' }]}>
          <View style={[styles.levelDot, { backgroundColor: LEVEL_COLORS[cardLevel] }]} />
          <Text style={[styles.levelBadgeText, { color: LEVEL_COLORS[cardLevel] }]}>
            {LEVEL_LABELS[cardLevel]}
          </Text>
        </View>
      </View>

      {/* Flashcard */}
      <TouchableOpacity
        style={styles.cardWrapper}
        onPress={flipCard}
        activeOpacity={1}
      >
        {/* Front */}
        <Animated.View
          style={[
            styles.card,
            styles.cardFront,
            {
              opacity: frontOpacity,
              transform: [{ perspective: 1200 }, { rotateY: frontRotate }],
              borderColor: (categoryColor || Colors.primary) + '40',
            },
          ]}
        >
          <View style={[styles.cardTopBar, { backgroundColor: (categoryColor || Colors.primary) + '15' }]}>
            <Text style={[styles.cardTopBarText, { color: categoryColor || Colors.primary }]}>
              Tiếng Nhật
            </Text>
          </View>
          <View style={styles.cardBody}>
            <Text style={styles.cardJp}>{card?.jp}</Text>
            <View style={styles.tapHintRow}>
              <Ionicons name="hand-right-outline" size={15} color={Colors.textMuted} />
              <Text style={styles.tapHintText}>Nhấn để xem nghĩa</Text>
            </View>
          </View>
        </Animated.View>

        {/* Back */}
        <Animated.View
          style={[
            styles.card,
            styles.cardBack,
            {
              opacity: backOpacity,
              transform: [{ perspective: 1200 }, { rotateY: backRotate }],
              borderColor: (categoryColor || Colors.primary) + '40',
            },
          ]}
        >
          <View style={[styles.cardTopBar, { backgroundColor: (categoryColor || Colors.primary) + '15' }]}>
            <Text style={[styles.cardTopBarText, { color: categoryColor || Colors.primary }]}>
              Nghĩa
            </Text>
          </View>
          <View style={styles.cardBody}>
            <Text style={styles.cardJpSmall}>{card?.jp}</Text>
            <Text style={styles.cardRomaji}>{card?.romaji}</Text>
            <View style={[styles.meaningPill, { backgroundColor: (categoryColor || Colors.primary) + '12' }]}>
              <Text style={[styles.cardVn, { color: categoryColor || Colors.primary }]}>{card?.vn}</Text>
            </View>
          </View>
        </Animated.View>
      </TouchableOpacity>

      {/* Answer buttons */}
      <View style={[styles.answerArea, !flipped && styles.answerAreaHidden]}>
        {flipped ? (
          <View style={styles.answerBtns}>
            <TouchableOpacity
              style={[styles.answerBtn, styles.forgotBtn]}
              onPress={() => handleAnswer('forgot')}
            >
              <Ionicons name="close" size={22} color="#E74C3C" />
              <Text style={[styles.answerBtnText, { color: '#E74C3C' }]}>Chưa nhớ</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.answerBtn, styles.rememberedBtn]}
              onPress={() => handleAnswer('remembered')}
            >
              <Ionicons name="checkmark" size={22} color="#2980B9" />
              <Text style={[styles.answerBtnText, { color: '#2980B9' }]}>Nhớ rồi</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.answerBtn, styles.masteredBtn]}
              onPress={() => handleAnswer('mastered')}
            >
              <Ionicons name="star" size={18} color="#27AE60" />
              <Text style={[styles.answerBtnText, { color: '#27AE60' }]}>Thuộc rồi</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={styles.flipPrompt}>Nhấn vào thẻ để lật</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 15,
    color: Colors.textMuted,
  },

  // Progress bar
  topProgressBg: {
    height: 4,
    backgroundColor: Colors.border,
    width: '100%',
  },
  topProgressFill: {
    height: 4,
    borderRadius: 2,
  },

  // Top row
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  cardCounter: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  levelDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  levelBadgeText: {
    fontSize: 12,
    fontWeight: '700',
  },

  // Flashcard
  cardWrapper: {
    flex: 1,
    marginHorizontal: 20,
    marginBottom: 12,
  },
  card: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.white,
    borderRadius: 24,
    borderWidth: 1.5,
    overflow: 'hidden',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 8,
  },
  cardFront: {},
  cardBack: {},
  cardTopBar: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: 'center',
  },
  cardTopBarText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  cardBody: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 20,
    gap: 12,
  },
  cardJp: {
    fontSize: 42,
    fontWeight: '800',
    color: Colors.textPrimary,
    textAlign: 'center',
    lineHeight: 56,
  },
  cardJpSmall: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  cardRomaji: {
    fontSize: 16,
    color: Colors.textMuted,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  meaningPill: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 16,
    marginTop: 4,
  },
  cardVn: {
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
  },
  tapHintRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },
  tapHintText: {
    fontSize: 13,
    color: Colors.textMuted,
  },

  // Answer buttons
  answerArea: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  answerAreaHidden: {
    opacity: 0,
  },
  answerBtns: {
    flexDirection: 'row',
    gap: 10,
  },
  answerBtn: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1.5,
  },
  forgotBtn: {
    backgroundColor: '#E74C3C12',
    borderColor: '#E74C3C40',
  },
  rememberedBtn: {
    backgroundColor: '#2980B912',
    borderColor: '#2980B940',
  },
  masteredBtn: {
    backgroundColor: '#27AE6012',
    borderColor: '#27AE6040',
  },
  answerBtnText: {
    fontSize: 12,
    fontWeight: '700',
  },
  flipPrompt: {
    textAlign: 'center',
    fontSize: 13,
    color: Colors.textMuted,
    paddingVertical: 14,
  },

  // Summary screen
  summaryContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 12,
  },
  summaryIconBg: {
    width: 100,
    height: 100,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  summaryTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  summarySubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: -4,
  },
  summaryPercent: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
    marginBottom: 8,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    gap: 4,
  },
  statNum: {
    fontSize: 24,
    fontWeight: '800',
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  retryForgotBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 16,
    width: '100%',
    justifyContent: 'center',
  },
  retryBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.white,
  },
  retryAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
  },
  retryAllText: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  doneBtn: {
    paddingVertical: 14,
    paddingHorizontal: 48,
    borderRadius: 16,
    backgroundColor: Colors.accent,
    marginTop: 4,
  },
  doneBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.primary,
  },
});
