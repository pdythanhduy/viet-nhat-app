import React, { useEffect, useRef, useState } from 'react';
import { Animated, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AudioButton from '../components/AudioButton';
import { Colors } from '../constants/colors';
import { ESSENTIAL_PHRASES } from '../constants/content';
import { RootStackParamList } from '../navigation/AppNavigator';
import { playJapaneseAudio, stopJapaneseAudio } from '../utils/audio';
import { loadJapaneseAudioPreferences } from '../utils/audioPreferences';
import { LEVEL_COLORS, LEVEL_LABELS, loadProgress, PhraseLevel, ProgressData, sortByLevel, updatePhraseLevel } from '../utils/japaneseProgress';
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
  const [autoPlayFlashcard, setAutoPlayFlashcard] = useState(false);
  const flipAnim = useRef(new Animated.Value(0)).current;
  const isSubmittingRef = useRef(false);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        void stopJapaneseAudio();
      };
    }, [])
  );

  useEffect(() => {
    navigation.setOptions({ headerTitle: categoryName });
    recordRecentJapaneseCategory(categoryName, accentColor).catch(() => undefined);
    loadJapaneseAudioPreferences().then((prefs) => setAutoPlayFlashcard(prefs.autoPlayFlashcard));
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

  useEffect(() => {
    if (!autoPlayFlashcard || !flipped || loading || done || cards.length === 0) return;
    const card = cards[currentIndex];
    void playJapaneseAudio(card.jp, `practice:auto:${categoryName}:${card.jp}:${currentIndex}`);
  }, [autoPlayFlashcard, cards, categoryName, currentIndex, done, flipped, loading]);

  const frontRotate = flipAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] });
  const backRotate = flipAnim.interpolate({ inputRange: [0, 1], outputRange: ['-180deg', '0deg'] });
  const frontOpacity = flipAnim.interpolate({ inputRange: [0, 0.45, 0.5, 1], outputRange: [1, 1, 0, 0] });
  const backOpacity = flipAnim.interpolate({ inputRange: [0, 0.45, 0.5, 1], outputRange: [0, 0, 1, 1] });

  const flipCard = () => {
    if (flipped) return;
    Animated.spring(flipAnim, { toValue: 1, friction: 7, tension: 12, useNativeDriver: true }).start();
    setFlipped(true);
  };

  const handleAnswer = async (answer: Answer) => {
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    try {
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
    } finally {
      isSubmittingRef.current = false;
    }
  };

  if (loading) return <SafeAreaView style={styles.container}><View style={styles.center}><Text>Đang tải...</Text></View></SafeAreaView>;
  if (cards.length === 0) return <SafeAreaView style={styles.container}><View style={styles.center}><Text>Chưa có dữ liệu luyện tập.</Text></View></SafeAreaView>;

  if (done) {
    const mastered = results.filter((item) => item === 'mastered').length;
    const remembered = results.filter((item) => item === 'remembered').length;
    const forgot = results.filter((item) => item === 'forgot').length;
    const percent = Math.round(((mastered + remembered) / results.length) * 100);
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
        <View style={styles.summary}>
          <Text style={styles.title}>Hoàn thành luyện tập</Text>
          <Text style={styles.subtitle}>{categoryName}</Text>
          <Text style={[styles.percent, { color: accentColor }]}>{percent}% đã nhớ</Text>
          <View style={styles.stats}>
            <View style={styles.stat}><Text style={styles.statNum}>{mastered}</Text><Text style={styles.statLabel}>Thành thạo</Text></View>
            <View style={styles.stat}><Text style={styles.statNum}>{remembered}</Text><Text style={styles.statLabel}>Đã nhớ</Text></View>
            <View style={styles.stat}><Text style={styles.statNum}>{forgot}</Text><Text style={styles.statLabel}>Chưa nhớ</Text></View>
          </View>
          <TouchableOpacity style={[styles.primaryButton, { backgroundColor: accentColor }]} onPress={() => { setCards(sortByLevel(allPhrases, progress)); setCurrentIndex(0); setResults([]); setDone(false); }}>
            <Text style={styles.primaryButtonText}>Luyện lại toàn bộ</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.goBack()}>
            <Text style={styles.secondaryButtonText}>Xong</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const card = cards[currentIndex];
  const cardLevel = (progress[card.jp] ?? 0) as PhraseLevel;
  const progressPercent = ((currentIndex + 1) / cards.length) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <View style={styles.progressTrack}><View style={[styles.progressFill, { width: `${progressPercent}%`, backgroundColor: accentColor }]} /></View>
      <View style={styles.topRow}>
        <Text style={styles.counter}>{currentIndex + 1} / {cards.length}</Text>
        <Text style={[styles.level, { color: LEVEL_COLORS[cardLevel] }]}>{LEVEL_LABELS[cardLevel]}</Text>
      </View>
      <TouchableOpacity style={styles.cardWrap} onPress={flipCard} activeOpacity={1}>
        <Animated.View style={[styles.card, { opacity: frontOpacity, transform: [{ perspective: 1200 }, { rotateY: frontRotate }] }]}>
          <Text style={styles.label}>Tiếng Nhật</Text>
          <AudioButton audioId={`practice:${categoryName}:${card.jp}`} text={card.jp} backgroundColor={Colors.background} />
          <Text style={styles.jp}>{card.jp}</Text>
          <Text style={styles.romaji}>{card.romaji}</Text>
          <Text style={styles.hint}>Chạm để xem nghĩa</Text>
        </Animated.View>
        <Animated.View pointerEvents="none" style={[styles.card, styles.back, { opacity: backOpacity, transform: [{ perspective: 1200 }, { rotateY: backRotate }] }]}>
          <Text style={styles.label}>Nghĩa tiếng Việt</Text>
          <Text style={styles.meaning}>{card.vn}</Text>
          <Text style={styles.hint}>Chọn mức độ bạn nhớ câu này</Text>
        </Animated.View>
      </TouchableOpacity>
      <View style={styles.answers}>
        <TouchableOpacity style={[styles.answer, { backgroundColor: '#FDECEA' }]} onPress={() => handleAnswer('forgot')} disabled={!flipped}><Text style={[styles.answerText, { color: Colors.danger }]}>Chưa nhớ</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.answer, { backgroundColor: '#EDF4FE' }]} onPress={() => handleAnswer('remembered')} disabled={!flipped}><Text style={[styles.answerText, { color: '#2980B9' }]}>Đã nhớ</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.answer, { backgroundColor: '#EAF7EF' }]} onPress={() => handleAnswer('mastered')} disabled={!flipped}><Text style={[styles.answerText, { color: Colors.success }]}>Thành thạo</Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, padding: 16 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  progressTrack: { height: 6, backgroundColor: Colors.border, borderRadius: 999, overflow: 'hidden' },
  progressFill: { height: 6, borderRadius: 999 },
  topRow: { marginTop: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  counter: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary },
  level: { fontSize: 13, fontWeight: '700' },
  cardWrap: { flex: 1, justifyContent: 'center', position: 'relative' },
  card: { position: 'absolute', width: '100%', minHeight: 300, backgroundColor: Colors.white, borderRadius: 16, padding: 24, alignItems: 'center', justifyContent: 'center' },
  back: { backgroundColor: '#FFF8EA' },
  label: { fontSize: 12, fontWeight: '700', color: Colors.primary, marginBottom: 12 },
  jp: { fontSize: 28, fontWeight: '800', color: Colors.textPrimary, textAlign: 'center' },
  romaji: { marginTop: 8, fontSize: 14, color: Colors.textMuted, fontStyle: 'italic', textAlign: 'center' },
  meaning: { fontSize: 24, fontWeight: '700', color: Colors.textPrimary, textAlign: 'center' },
  hint: { marginTop: 16, fontSize: 12, color: Colors.textSecondary, textAlign: 'center' },
  answers: { gap: 10 },
  answer: { borderRadius: 8, paddingVertical: 14, alignItems: 'center' },
  answerText: { fontSize: 14, fontWeight: '700' },
  summary: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: '800', color: Colors.textPrimary },
  subtitle: { marginTop: 8, fontSize: 14, color: Colors.textSecondary },
  percent: { marginTop: 12, fontSize: 32, fontWeight: '800' },
  stats: { flexDirection: 'row', gap: 12, marginTop: 18 },
  stat: { backgroundColor: Colors.white, borderRadius: 8, padding: 14, minWidth: 96, alignItems: 'center' },
  statNum: { fontSize: 22, fontWeight: '800', color: Colors.textPrimary },
  statLabel: { marginTop: 4, fontSize: 12, color: Colors.textSecondary },
  primaryButton: { marginTop: 22, borderRadius: 8, paddingHorizontal: 20, paddingVertical: 14 },
  primaryButtonText: { color: Colors.white, fontWeight: '700' },
  secondaryButton: { marginTop: 12, borderRadius: 8, borderWidth: 1, borderColor: Colors.border, paddingHorizontal: 20, paddingVertical: 14, backgroundColor: Colors.white },
  secondaryButtonText: { color: Colors.textPrimary, fontWeight: '700' },
});
