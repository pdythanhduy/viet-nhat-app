import React, { useCallback, useMemo, useState } from 'react';
import { Alert, Clipboard, ScrollView, Share, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AudioButton from '../components/AudioButton';
import { Colors } from '../constants/colors';
import { ESSENTIAL_PHRASES, GRAMMAR_PATTERNS, JAPANESE_WORDS } from '../constants/content';
import { RootStackParamList, TabParamList } from '../navigation/AppNavigator';
import { stopJapaneseAudio } from '../utils/audio';
import { loadJapaneseAudioPreferences } from '../utils/audioPreferences';
import { toggleBookmark } from '../utils/bookmarks';
import { getCategoryStats, LEVEL_COLORS, LEVEL_LABELS, loadProgress, PhraseLevel, ProgressData } from '../utils/japaneseProgress';
import { getTodayWordIndex, loadStreak, StreakData } from '../utils/japaneseStreak';
import { loadRecentJapaneseCategories, RecentJapaneseCategory } from '../utils/japaneseRecentCategories';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RouteType = RouteProp<TabParamList, 'Japanese'>;
type TagId =
  | 'all'
  | 'saved'
  | 'phone'
  | 'work'
  | 'health'
  | 'city'
  | 'money'
  | 'housing'
  | 'factory'
  | 'construction'
  | 'agriculture'
  | 'restaurant';

const TAGS: { id: TagId; label: string }[] = [
  { id: 'all', label: 'Tất cả' },
  { id: 'saved', label: 'Đã lưu' },
  { id: 'phone', label: 'Gọi điện' },
  { id: 'work', label: 'Công ty' },
  { id: 'factory', label: 'Nhà máy' },
  { id: 'construction', label: 'Xây dựng' },
  { id: 'agriculture', label: 'Nông nghiệp' },
  { id: 'restaurant', label: 'Nhà hàng' },
  { id: 'health', label: 'Bệnh viện' },
  { id: 'city', label: 'City hall' },
  { id: 'money', label: 'Ngân hàng / SIM' },
  { id: 'housing', label: 'Nhà ở / bưu điện' },
];

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Chào buổi sáng';
  if (hour < 18) return 'Chào buổi chiều';
  return 'Chào buổi tối';
}

function getCategoryTags(name: string): TagId[] {
  const text = name.toLowerCase();
  const tags = new Set<TagId>(['all']);
  if (text.includes('gọi điện')) tags.add('phone');
  if (
    text.includes('công việc') ||
    text.includes('phiếu lương') ||
    text.includes('xin nghỉ') ||
    text.includes('đi trễ') ||
    text.includes('nhà máy') ||
    text.includes('xây dựng') ||
    text.includes('nông nghiệp') ||
    text.includes('nhà hàng')
  ) tags.add('work');
  if (text.includes('nhà máy')) tags.add('factory');
  if (text.includes('xây dựng')) tags.add('construction');
  if (text.includes('nông nghiệp')) tags.add('agriculture');
  if (text.includes('nhà hàng')) tags.add('restaurant');
  if (text.includes('bệnh') || text.includes('khám')) tags.add('health');
  if (text.includes('city hall')) tags.add('city');
  if (text.includes('ngân hàng') || text.includes('sim') || text.includes('internet')) tags.add('money');
  if (text.includes('nhà') || text.includes('bưu điện')) tags.add('housing');
  return [...tags];
}

export default function JapaneseScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteType>();
  const [showRomaji, setShowRomaji] = useState(true);
  const [expanded, setExpanded] = useState<string | null>('Chào hỏi cơ bản');
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState<TagId>('all');
  const [dialogueOnly, setDialogueOnly] = useState(false);
  const [wordIndex, setWordIndex] = useState(() => getTodayWordIndex(JAPANESE_WORDS.length));
  const [progress, setProgress] = useState<ProgressData>({});
  const [savedPhrases, setSavedPhrases] = useState(new Set<string>());
  const [savedDialogues, setSavedDialogues] = useState(new Set<string>());
  const [recentCategories, setRecentCategories] = useState<RecentJapaneseCategory[]>([]);
  const [streak, setStreak] = useState<StreakData | null>(null);
  const [autoPlayDialogue, setAutoPlayDialogue] = useState(false);
  const [grammarExpanded, setGrammarExpanded] = useState(false);
  const [expandedPattern, setExpandedPattern] = useState<string | null>(null);

  React.useEffect(() => {
    if (route.params?.initialSearch) {
      setSearch(route.params.initialSearch);
    }
  }, [route.params?.initialSearch]);

  React.useEffect(() => {
    if (!autoPlayDialogue || !expanded) return;
    const category = ESSENTIAL_PHRASES.find((item) => item.category === expanded);
    if (!category?.dialogue) return;
    void playDialogueSequence(expanded);
  }, [autoPlayDialogue, expanded]);

  useFocusEffect(useCallback(() => {
    return () => {
      void stopJapaneseAudio();
    };
  }, []));

  useFocusEffect(useCallback(() => {
    loadProgress().then(setProgress);
    loadStreak().then(setStreak);
    loadRecentJapaneseCategories().then(setRecentCategories);
    loadJapaneseAudioPreferences().then((prefs) => setAutoPlayDialogue(prefs.autoPlayDialogue));
    import('../utils/bookmarks').then(({ loadBookmarks }) => {
      loadBookmarks().then((all) => {
        setSavedPhrases(new Set(all.filter((i) => i.type === 'phrase').map((i) => i.id)));
        setSavedDialogues(new Set(all.filter((i) => i.type === 'dialogue').map((i) => i.id)));
      });
    });
  }, []));

  const currentWord = JAPANESE_WORDS[wordIndex];

  const categories = useMemo(() => ESSENTIAL_PHRASES.filter((category) => {
    const tags = getCategoryTags(category.category);
    const dialogueId = `dialogue:${category.category}`;
    const hasSaved = savedDialogues.has(dialogueId) || category.phrases.some((phrase) => savedPhrases.has(phrase.jp));
    const tagOk = selectedTag === 'all' || (selectedTag === 'saved' ? hasSaved : tags.includes(selectedTag));
    const dialogueOk = !dialogueOnly || Boolean(category.dialogue);
    return tagOk && dialogueOk;
  }), [dialogueOnly, savedDialogues, savedPhrases, selectedTag]);

  const searchResults = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return [];
    return categories.flatMap((category) => category.phrases
      .filter((phrase) => phrase.jp.toLowerCase().includes(q) || phrase.romaji.toLowerCase().includes(q) || phrase.vn.toLowerCase().includes(q) || category.category.toLowerCase().includes(q))
      .map((phrase) => ({ category, phrase })));
  }, [categories, search]);

  const copyPhrase = (jp: string, romaji: string, vn: string) => {
    Clipboard.setString(`${jp}\n${romaji}\n${vn}`);
    Alert.alert('Đã sao chép', 'Đã copy câu vào clipboard.');
  };

  const copyCategory = (categoryName: string) => {
    const category = ESSENTIAL_PHRASES.find((item) => item.category === categoryName);
    if (!category) return;
    const content = [
      category.category,
      '',
      ...category.phrases.flatMap((phrase) => [phrase.jp, phrase.romaji, phrase.vn, '']),
      ...(category.dialogue ? ['Hội thoại', category.dialogue.situation, '', ...category.dialogue.lines.flatMap((line) => [`${line.speakerLabel}: ${line.jp}`, line.romaji, line.vn, ''])] : []),
    ].join('\n');
    Clipboard.setString(content);
    Alert.alert('Đã sao chép', 'Đã copy toàn bộ nhóm câu vào clipboard.');
  };

  const bookmarkPhrase = async (phrase: { jp: string; romaji: string; vn: string }, categoryName: string) => {
    const added = await toggleBookmark({ type: 'phrase', id: phrase.jp, jp: phrase.jp, romaji: phrase.romaji, vn: phrase.vn, category: categoryName, savedAt: '' });
    setSavedPhrases((prev) => {
      const next = new Set(prev);
      if (added) next.add(phrase.jp); else next.delete(phrase.jp);
      return next;
    });
  };

  const bookmarkDialogue = async (categoryName: string) => {
    const category = ESSENTIAL_PHRASES.find((item) => item.category === categoryName);
    if (!category?.dialogue) return;
    const dialogueId = `dialogue:${category.category}`;
    const added = await toggleBookmark({
      type: 'dialogue',
      id: dialogueId,
      category: category.category,
      situation: category.dialogue.situation,
      lines: category.dialogue.lines.map((line) => ({ speakerLabel: line.speakerLabel, jp: line.jp, romaji: line.romaji, vn: line.vn })),
      savedAt: '',
    });
    setSavedDialogues((prev) => {
      const next = new Set(prev);
      if (added) next.add(dialogueId); else next.delete(dialogueId);
      return next;
    });
  };

  const shareDialogue = async (categoryName: string) => {
    const category = ESSENTIAL_PHRASES.find((item) => item.category === categoryName);
    if (!category?.dialogue) return;
    const message = [category.category, category.dialogue.situation, '', ...category.dialogue.lines.flatMap((line) => [`${line.speakerLabel}: ${line.jp}`, line.romaji, line.vn, ''])].join('\n');
    await Share.share({ title: category.category, message });
  };

  const playDialogueSequence = async (categoryName: string) => {
    const category = ESSENTIAL_PHRASES.find((item) => item.category === categoryName);
    if (!category?.dialogue) return;

    const { playJapaneseSequence } = await import('../utils/audio');
    const result = await playJapaneseSequence(
      category.dialogue.lines.map((line, index) => ({
        id: `${categoryName}:${index}`,
        text: line.jp,
      })),
      `dialogue-sequence:${categoryName}`
    );
    if (result?.ok === false && result.reason === 'missing-ja-voice') {
      Alert.alert(
        'Thiết bị chưa có giọng Nhật',
        'Máy này hiện chưa có voice tiếng Nhật để phát âm hội thoại. Hãy cài thêm Japanese TTS voice trong phần ngôn ngữ hoặc giọng nói của thiết bị.'
      );
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      <View style={styles.header}>
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.headerTitle}>Tiếng Nhật</Text>
            <Text style={styles.headerSubtitle}>{getGreeting()} • Câu thực tế để dùng ngay trong đời sống ở Nhật</Text>
          </View>
          {streak ? <View style={styles.streak}><Text style={styles.streakNum}>{streak.currentStreak}</Text><Text style={styles.muted}>ngày</Text></View> : null}
        </View>
        <TouchableOpacity style={styles.banner} onPress={() => navigation.navigate('JapaneseQuiz', {})}>
          <View style={styles.row}><Ionicons name="school" size={18} color="#F39C12" /><Text style={styles.bannerText}>Trắc nghiệm tổng hợp</Text></View>
          <Ionicons name="arrow-forward-circle" size={22} color={Colors.white} />
        </TouchableOpacity>
        <View style={styles.quickStudyRow}>
          <TouchableOpacity style={styles.quickStudyCard} onPress={() => navigation.navigate('JapaneseKana')}>
            <Ionicons name="grid-outline" size={18} color={Colors.white} />
            <Text style={styles.quickStudyText}>Hiragana / Katakana</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickStudyCard}
            onPress={() => navigation.navigate('JapaneseQuiz', { direction: 'vn-to-jp' })}
          >
            <Ionicons name="swap-horizontal-outline" size={18} color={Colors.white} />
            <Text style={styles.quickStudyText}>Quiz VI → JP</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={16} color="rgba(255,255,255,0.75)" />
          <TextInput style={styles.searchInput} value={search} onChangeText={setSearch} placeholder="Tìm câu, tình huống hoặc từ khóa..." placeholderTextColor="rgba(255,255,255,0.55)" />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tags}>
          {TAGS.map((tag) => (
            <TouchableOpacity key={tag.id} style={[styles.chip, selectedTag === tag.id && styles.chipActive]} onPress={() => setSelectedTag(tag.id)}>
              <Text style={[styles.chipText, selectedTag === tag.id && styles.chipTextActive]}>{tag.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TouchableOpacity style={[styles.toggle, dialogueOnly && styles.toggleActive]} onPress={() => setDialogueOnly((prev) => !prev)}>
          <Text style={[styles.toggleText, dialogueOnly && styles.toggleTextActive]}>Chỉ mục có hội thoại</Text>
        </TouchableOpacity>

        {search.trim() ? (
          <View style={styles.block}>
            <Text style={styles.blockTitle}>Kết quả tìm kiếm</Text>
            {searchResults.length === 0 ? <Text style={styles.empty}>Không tìm thấy câu phù hợp.</Text> : searchResults.map(({ category, phrase }) => (
              <View key={`${category.category}-${phrase.jp}`} style={styles.card}>
                <View style={styles.inlineRow}>
                  <Text style={styles.smallLabel}>{category.category}</Text>
                  <AudioButton audioId={`search:${category.category}:${phrase.jp}`} text={phrase.jp} />
                </View>
                <Text style={styles.jp}>{phrase.jp}</Text>
                <Text style={styles.romaji}>{phrase.romaji}</Text>
                <Text style={styles.vn}>{phrase.vn}</Text>
                <View style={styles.actions}><TouchableOpacity onPress={() => copyPhrase(phrase.jp, phrase.romaji, phrase.vn)}><Text style={styles.actionText}>Copy</Text></TouchableOpacity><TouchableOpacity onPress={() => bookmarkPhrase(phrase, category.category)}><Text style={styles.actionText}>{savedPhrases.has(phrase.jp) ? 'Bỏ lưu' : 'Lưu'}</Text></TouchableOpacity></View>
              </View>
            ))}
          </View>
        ) : (
          <>
            <View style={styles.card}>
              <View style={styles.row}>
                <View style={styles.inlineRow}>
                  <Text style={styles.smallLabel}>Từ của hôm nay</Text>
                  <AudioButton audioId={`word:${currentWord.word}`} text={currentWord.word} />
                </View>
                <Text style={styles.muted}>{wordIndex + 1}/{JAPANESE_WORDS.length}</Text>
              </View>
              <Text style={styles.word}>{currentWord.word}</Text>
              <Text style={styles.romaji}>{currentWord.reading}</Text>
              {showRomaji ? <Text style={styles.romaji}>{currentWord.romaji}</Text> : null}
              <Text style={styles.meaning}>{currentWord.meaning}</Text>
              <View style={styles.subCard}><Text style={styles.smallLabel}>Ví dụ</Text><Text style={styles.jp}>{currentWord.example}</Text>{showRomaji ? <Text style={styles.romaji}>{currentWord.exampleRomaji}</Text> : null}<Text style={styles.vn}>{currentWord.exampleMeaning}</Text></View>
              {currentWord.culturalNote ? <View style={styles.note}><Text style={styles.smallLabel}>Lưu ý thực tế</Text><Text style={styles.vn}>{currentWord.culturalNote}</Text></View> : null}
              <View style={styles.actions}><TouchableOpacity onPress={() => setShowRomaji((prev) => !prev)}><Text style={styles.actionText}>{showRomaji ? 'Ẩn romaji' : 'Hiện romaji'}</Text></TouchableOpacity><View style={styles.row}><TouchableOpacity onPress={() => setWordIndex((prev) => (prev - 1 + JAPANESE_WORDS.length) % JAPANESE_WORDS.length)}><Text style={styles.actionText}>Trước</Text></TouchableOpacity><TouchableOpacity onPress={() => setWordIndex((prev) => (prev + 1) % JAPANESE_WORDS.length)}><Text style={styles.actionText}>Sau</Text></TouchableOpacity></View></View>
            </View>

            <View style={styles.card}>
              <TouchableOpacity style={styles.row} onPress={() => setGrammarExpanded((prev) => !prev)}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.category}>Mẫu câu cơ bản</Text>
                  <Text style={styles.muted}>{GRAMMAR_PATTERNS.length} mẫu ngữ pháp thực dụng</Text>
                </View>
                <Ionicons name={grammarExpanded ? 'chevron-up' : 'chevron-down'} size={18} color={Colors.textMuted} />
              </TouchableOpacity>
              {grammarExpanded ? (
                <View style={{ marginTop: 10 }}>
                  {GRAMMAR_PATTERNS.map((p) => (
                    <TouchableOpacity
                      key={p.pattern}
                      style={[styles.listItem, { alignItems: 'flex-start' }]}
                      onPress={() => setExpandedPattern((prev) => prev === p.pattern ? null : p.pattern)}
                    >
                      <View style={{ flex: 1 }}>
                        <View style={styles.inlineRow}>
                          <Text style={[styles.jp, { color: Colors.primary, fontSize: 14 }]}>{p.pattern}</Text>
                        </View>
                        <Text style={styles.meaning}>{p.meaning}</Text>
                        {expandedPattern === p.pattern ? (
                          <View style={[styles.subCard, { marginTop: 8 }]}>
                            <Text style={styles.jp}>{p.example_jp}</Text>
                            <Text style={styles.romaji}>{p.example_romaji}</Text>
                            <Text style={styles.vn}>{p.example_vn}</Text>
                            {p.notes ? <View style={[styles.note, { marginTop: 8 }]}><Text style={styles.smallLabel}>Ghi chú</Text><Text style={styles.vn}>{p.notes}</Text></View> : null}
                          </View>
                        ) : null}
                      </View>
                      <Ionicons name={expandedPattern === p.pattern ? 'chevron-up' : 'chevron-down'} size={16} color={Colors.textMuted} style={{ marginTop: 4 }} />
                    </TouchableOpacity>
                  ))}
                </View>
              ) : null}
            </View>

            {recentCategories.length > 0 ? <View style={styles.block}><Text style={styles.blockTitle}>Luyện gần đây</Text><ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tags}>{recentCategories.map((item) => <TouchableOpacity key={item.categoryName} style={styles.recent} onPress={() => navigation.navigate('JapanesePractice', { categoryName: item.categoryName, categoryColor: item.categoryColor })}><Text style={styles.recentText}>{item.categoryName}</Text></TouchableOpacity>)}</ScrollView></View> : null}

            <View style={styles.block}>
              <Text style={styles.blockTitle}>Câu theo tình huống</Text>
              {categories.map((category) => {
                const stats = getCategoryStats(category.phrases, progress);
                const dialogueId = `dialogue:${category.category}`;
                const dialogueSaved = savedDialogues.has(dialogueId);
                return (
                  <View key={category.category} style={styles.card}>
                    <TouchableOpacity style={styles.row} onPress={() => setExpanded((prev) => prev === category.category ? null : category.category)}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.category}>{category.category}</Text>
                        <Text style={styles.muted}>{category.phrases.length} câu • {stats.learnedCount}/{stats.total} đã nhớ</Text>
                      </View>
                      <Text style={[styles.smallLabel, { color: category.color ?? Colors.primary }]}>{Math.round(stats.learnedPercent * 100)}%</Text>
                    </TouchableOpacity>
                    {expanded === category.category ? (
                      <>
                        {category.dialogue ? <View style={styles.subCard}><View style={styles.row}><Text style={styles.smallLabel}>{category.dialogue.situation}</Text><TouchableOpacity onPress={() => void playDialogueSequence(category.category)}><Text style={styles.actionText}>{autoPlayDialogue ? 'Phát toàn bộ' : 'Nghe hội thoại'}</Text></TouchableOpacity></View>{category.dialogue.lines.map((line, index) => <View key={`${category.category}-${index}`} style={{ marginTop: 8 }}><View style={styles.inlineRow}><Text style={styles.smallLabel}>{line.speakerLabel}</Text><AudioButton audioId={`dialogue:${category.category}:${index}`} text={line.jp} /></View><Text style={styles.jp}>{line.jp}</Text><Text style={styles.romaji}>{line.romaji}</Text><Text style={styles.vn}>{line.vn}</Text></View>)}<View style={styles.actions}><TouchableOpacity onPress={() => bookmarkDialogue(category.category)}><Text style={styles.actionText}>{dialogueSaved ? 'Bỏ lưu hội thoại' : 'Lưu hội thoại'}</Text></TouchableOpacity><TouchableOpacity onPress={() => shareDialogue(category.category)}><Text style={styles.actionText}>Chia sẻ</Text></TouchableOpacity></View></View> : null}
                        {category.phrases.map((phrase) => {
                          const level = (progress[phrase.jp] ?? 0) as PhraseLevel;
                          return <View key={phrase.jp} style={styles.listItem}><View style={[styles.dot, { backgroundColor: LEVEL_COLORS[level] }]} /><View style={{ flex: 1 }}><View style={styles.inlineRow}><Text style={styles.jp}>{phrase.jp}</Text><AudioButton audioId={`phrase:${category.category}:${phrase.jp}`} text={phrase.jp} /></View><Text style={styles.romaji}>{phrase.romaji}</Text><Text style={styles.vn}>{phrase.vn}</Text><Text style={[styles.smallLabel, { color: LEVEL_COLORS[level], marginTop: 4 }]}>{LEVEL_LABELS[level]}</Text></View><View><TouchableOpacity onPress={() => copyPhrase(phrase.jp, phrase.romaji, phrase.vn)}><Text style={styles.actionText}>Copy</Text></TouchableOpacity><TouchableOpacity onPress={() => bookmarkPhrase(phrase, category.category)}><Text style={styles.actionText}>{savedPhrases.has(phrase.jp) ? 'Bỏ lưu' : 'Lưu'}</Text></TouchableOpacity></View></View>;
                        })}
                        <View style={styles.actions}><TouchableOpacity onPress={() => copyCategory(category.category)}><Text style={styles.actionText}>Copy nhóm</Text></TouchableOpacity><TouchableOpacity onPress={() => navigation.navigate('JapanesePractice', { categoryName: category.category, categoryColor: category.color })}><Text style={styles.actionText}>Luyện flashcard</Text></TouchableOpacity><TouchableOpacity onPress={() => navigation.navigate('JapaneseQuiz', { categoryName: category.category, categoryColor: category.color })}><Text style={styles.actionText}>Làm quiz</Text></TouchableOpacity></View>
                      </>
                    ) : null}
                  </View>
                );
              })}
            </View>

            <TouchableOpacity style={[styles.card, { marginBottom: 24 }]} onPress={() => navigation.navigate('AIChat', { title: 'Luyện tiếng Nhật', prefilledQuestion: 'Hãy giúp tôi luyện 5 câu tiếng Nhật ngắn, tự nhiên, dùng trong đời sống ở Nhật. Giải thích bằng tiếng Việt.' })}>
              <Text style={styles.category}>Nhờ AI luyện thêm</Text>
              <Text style={styles.vn}>Xin câu mẫu theo đúng tình huống bạn đang gặp.</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { backgroundColor: Colors.primary, padding: 16, borderBottomLeftRadius: 18, borderBottomRightRadius: 18 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 10 },
  inlineRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  headerTitle: { fontSize: 24, fontWeight: '800', color: Colors.white },
  headerSubtitle: { marginTop: 4, fontSize: 13, lineHeight: 18, color: 'rgba(255,255,255,0.82)' },
  streak: { backgroundColor: Colors.white, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8, alignItems: 'center' },
  streakNum: { fontSize: 16, fontWeight: '800', color: Colors.textPrimary },
  banner: { marginTop: 14, borderRadius: 8, padding: 12, backgroundColor: 'rgba(255,255,255,0.12)', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  bannerText: { color: Colors.white, fontSize: 14, fontWeight: '700' },
  quickStudyRow: { flexDirection: 'row', gap: 10, marginTop: 10 },
  quickStudyCard: { flex: 1, flexDirection: 'row', gap: 8, alignItems: 'center', justifyContent: 'center', borderRadius: 8, paddingVertical: 10, backgroundColor: 'rgba(255,255,255,0.12)' },
  quickStudyText: { color: Colors.white, fontSize: 12, fontWeight: '700' },
  searchBox: { marginTop: 12, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.12)', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, gap: 8 },
  searchInput: { flex: 1, color: Colors.white, paddingVertical: 11, fontSize: 14 },
  content: { flex: 1, paddingHorizontal: 16, paddingTop: 14 },
  tags: { gap: 8, paddingBottom: 8, paddingRight: 16 },
  chip: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999, backgroundColor: Colors.card, borderWidth: 1, borderColor: Colors.border },
  chipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  chipText: { fontSize: 12, fontWeight: '600', color: Colors.textPrimary },
  chipTextActive: { color: Colors.white },
  toggle: { alignSelf: 'flex-start', borderRadius: 8, borderWidth: 1, borderColor: Colors.primary, paddingHorizontal: 12, paddingVertical: 8, backgroundColor: Colors.white, marginBottom: 12 },
  toggleActive: { backgroundColor: Colors.primary },
  toggleText: { color: Colors.primary, fontSize: 12, fontWeight: '700' },
  toggleTextActive: { color: Colors.white },
  block: { marginBottom: 18 },
  blockTitle: { marginBottom: 12, fontSize: 18, fontWeight: '800', color: Colors.textPrimary },
  card: { backgroundColor: Colors.card, borderRadius: 8, padding: 14, marginBottom: 10 },
  subCard: { backgroundColor: Colors.background, borderRadius: 8, padding: 12, marginTop: 10 },
  note: { backgroundColor: Colors.warningLight, borderRadius: 8, padding: 12, marginTop: 10 },
  word: { marginTop: 10, fontSize: 28, fontWeight: '800', color: Colors.textPrimary },
  meaning: { marginTop: 8, fontSize: 16, fontWeight: '700', color: Colors.primary },
  category: { fontSize: 15, fontWeight: '800', color: Colors.textPrimary },
  jp: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary, marginTop: 4 },
  romaji: { marginTop: 4, fontSize: 12, color: Colors.textSecondary, fontStyle: 'italic' },
  vn: { marginTop: 5, fontSize: 12, lineHeight: 18, color: Colors.textSecondary },
  smallLabel: { fontSize: 12, fontWeight: '700', color: Colors.primary },
  muted: { fontSize: 12, color: Colors.textMuted },
  empty: { color: Colors.textMuted, textAlign: 'center', lineHeight: 20 },
  actions: { marginTop: 10, flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  actionText: { color: Colors.primary, fontWeight: '700', fontSize: 12 },
  recent: { backgroundColor: Colors.card, borderRadius: 8, padding: 10, minWidth: 140 },
  recentText: { fontSize: 12, fontWeight: '700', color: Colors.textPrimary },
  listItem: { marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: Colors.border, flexDirection: 'row', gap: 10 },
  dot: { width: 10, height: 10, borderRadius: 999, marginTop: 7 },
});
