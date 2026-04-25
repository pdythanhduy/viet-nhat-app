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
  { id: 'city', label: 'Cơ quan' },
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
  if (text.includes('cơ quan')) tags.add('city');
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
    return () => { void stopJapaneseAudio(); };
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
      category.category, '',
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
      category.dialogue.lines.map((line, index) => ({ id: `${categoryName}:${index}`, text: line.jp })),
      `dialogue-sequence:${categoryName}`
    );
    if (result?.ok === false && result.reason === 'missing-ja-voice') {
      Alert.alert('Thiết bị chưa có giọng Nhật', 'Máy này hiện chưa có voice tiếng Nhật. Hãy cài Japanese TTS voice trong cài đặt ngôn ngữ của thiết bị.');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>Tiếng Nhật</Text>
            <Text style={styles.headerSub}>{getGreeting()}</Text>
          </View>
          {streak ? (
            <View style={styles.streakBadge}>
              <Text style={styles.streakNum}>{streak.currentStreak}</Text>
              <Text style={styles.streakLabel}>ngày</Text>
            </View>
          ) : null}
        </View>

        <View style={styles.searchBox}>
          <Ionicons name="search" size={16} color="rgba(255,255,255,0.7)" />
          <TextInput
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
            placeholder="Tìm câu, tình huống, từ khóa..."
            placeholderTextColor="rgba(255,255,255,0.5)"
          />
          {search.length > 0 ? (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Ionicons name="close-circle" size={16} color="rgba(255,255,255,0.7)" />
            </TouchableOpacity>
          ) : null}
        </View>

        <View style={styles.quickRow}>
          <TouchableOpacity style={styles.quickBtn} onPress={() => navigation.navigate('JapaneseKana')}>
            <Ionicons name="grid-outline" size={16} color={Colors.white} />
            <Text style={styles.quickBtnText}>Bảng chữ</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickBtn} onPress={() => navigation.navigate('JapaneseQuiz', {})}>
            <Ionicons name="help-circle-outline" size={16} color={Colors.white} />
            <Text style={styles.quickBtnText}>Trắc nghiệm</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickBtn} onPress={() => navigation.navigate('BJT')}>
            <Ionicons name="briefcase-outline" size={16} color={Colors.white} />
            <Text style={styles.quickBtnText}>Luyện BJT</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>

        {/* Tag filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tags}>
          {TAGS.map((tag) => (
            <TouchableOpacity
              key={tag.id}
              style={[styles.chip, selectedTag === tag.id && styles.chipActive]}
              onPress={() => setSelectedTag(tag.id)}
            >
              <Text style={[styles.chipText, selectedTag === tag.id && styles.chipTextActive]}>{tag.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity
          style={[styles.toggle, dialogueOnly && styles.toggleActive]}
          onPress={() => setDialogueOnly((prev) => !prev)}
        >
          <Ionicons
            name={dialogueOnly ? 'chatbubbles' : 'chatbubbles-outline'}
            size={14}
            color={dialogueOnly ? Colors.white : Colors.primary}
          />
          <Text style={[styles.toggleText, dialogueOnly && styles.toggleTextActive]}>Chỉ mục có hội thoại</Text>
        </TouchableOpacity>

        {/* Search results */}
        {search.trim() ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Kết quả tìm kiếm</Text>
            {searchResults.length === 0 ? (
              <Text style={styles.empty}>Không tìm thấy câu phù hợp.</Text>
            ) : (
              searchResults.map(({ category, phrase }) => (
                <View key={`${category.category}-${phrase.jp}`} style={styles.card}>
                  <View style={styles.cardMeta}>
                    <Text style={styles.metaLabel}>{category.category}</Text>
                    <AudioButton audioId={`search:${category.category}:${phrase.jp}`} text={phrase.jp} />
                  </View>
                  <Text style={styles.jpText}>{phrase.jp}</Text>
                  <Text style={styles.romajiText}>{phrase.romaji}</Text>
                  <Text style={styles.vnText}>{phrase.vn}</Text>
                  <View style={styles.actions}>
                    <TouchableOpacity onPress={() => copyPhrase(phrase.jp, phrase.romaji, phrase.vn)}>
                      <Text style={styles.actionText}>Sao chép</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => bookmarkPhrase(phrase, category.category)}>
                      <Text style={styles.actionText}>{savedPhrases.has(phrase.jp) ? 'Bỏ lưu' : 'Lưu'}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}
          </View>
        ) : (
          <>
            {/* Từ của hôm nay */}
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.cardMeta}>
                  <Text style={styles.metaLabel}>Từ của hôm nay</Text>
                  <AudioButton audioId={`word:${currentWord.word}`} text={currentWord.word} />
                </View>
                <Text style={styles.indexLabel}>{wordIndex + 1}/{JAPANESE_WORDS.length}</Text>
              </View>
              <Text style={styles.wordText}>{currentWord.word}</Text>
              <Text style={styles.romajiText}>{currentWord.reading}</Text>
              {showRomaji ? <Text style={styles.romajiText}>{currentWord.romaji}</Text> : null}
              <Text style={styles.meaningText}>{currentWord.meaning}</Text>
              <View style={styles.subCard}>
                <Text style={styles.metaLabel}>Ví dụ</Text>
                <Text style={styles.jpText}>{currentWord.example}</Text>
                {showRomaji ? <Text style={styles.romajiText}>{currentWord.exampleRomaji}</Text> : null}
                <Text style={styles.vnText}>{currentWord.exampleMeaning}</Text>
              </View>
              {currentWord.culturalNote ? (
                <View style={styles.noteCard}>
                  <Text style={styles.metaLabel}>Lưu ý thực tế</Text>
                  <Text style={styles.vnText}>{currentWord.culturalNote}</Text>
                </View>
              ) : null}
              <View style={styles.actions}>
                <TouchableOpacity onPress={() => setShowRomaji((prev) => !prev)}>
                  <Text style={styles.actionText}>{showRomaji ? 'Ẩn romaji' : 'Hiện romaji'}</Text>
                </TouchableOpacity>
                <View style={styles.navRow}>
                  <TouchableOpacity onPress={() => setWordIndex((prev) => (prev - 1 + JAPANESE_WORDS.length) % JAPANESE_WORDS.length)}>
                    <Ionicons name="chevron-back-circle-outline" size={22} color={Colors.primary} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setWordIndex((prev) => (prev + 1) % JAPANESE_WORDS.length)}>
                    <Ionicons name="chevron-forward-circle-outline" size={22} color={Colors.primary} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Mẫu câu cơ bản */}
            <View style={styles.card}>
              <TouchableOpacity style={styles.accordionRow} onPress={() => setGrammarExpanded((prev) => !prev)}>
                <View style={styles.flex}>
                  <Text style={styles.cardTitle}>Mẫu câu cơ bản</Text>
                  <Text style={styles.cardSubtitle}>{GRAMMAR_PATTERNS.length} mẫu ngữ pháp thực dụng</Text>
                </View>
                <Ionicons name={grammarExpanded ? 'chevron-up' : 'chevron-down'} size={18} color={Colors.textMuted} />
              </TouchableOpacity>
              {grammarExpanded ? (
                <View style={styles.patternList}>
                  {GRAMMAR_PATTERNS.map((p) => (
                    <TouchableOpacity
                      key={p.pattern}
                      style={styles.patternItem}
                      onPress={() => setExpandedPattern((prev) => prev === p.pattern ? null : p.pattern)}
                    >
                      <View style={styles.flex}>
                        <Text style={styles.patternText}>{p.pattern}</Text>
                        <Text style={styles.patternMeaning}>{p.meaning}</Text>
                        {expandedPattern === p.pattern ? (
                          <View style={[styles.subCard, { marginTop: 8 }]}>
                            <Text style={styles.jpText}>{p.example_jp}</Text>
                            <Text style={styles.romajiText}>{p.example_romaji}</Text>
                            <Text style={styles.vnText}>{p.example_vn}</Text>
                            {p.notes ? (
                              <View style={[styles.noteCard, { marginTop: 8 }]}>
                                <Text style={styles.metaLabel}>Ghi chú</Text>
                                <Text style={styles.vnText}>{p.notes}</Text>
                              </View>
                            ) : null}
                          </View>
                        ) : null}
                      </View>
                      <Ionicons
                        name={expandedPattern === p.pattern ? 'chevron-up' : 'chevron-down'}
                        size={16}
                        color={Colors.textMuted}
                        style={{ marginTop: 2 }}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              ) : null}
            </View>

            {/* Luyện gần đây */}
            {recentCategories.length > 0 ? (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Luyện gần đây</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tags}>
                  {recentCategories.map((item) => (
                    <TouchableOpacity
                      key={item.categoryName}
                      style={styles.recentChip}
                      onPress={() => navigation.navigate('JapanesePractice', { categoryName: item.categoryName, categoryColor: item.categoryColor })}
                    >
                      <Text style={styles.recentChipText}>{item.categoryName}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            ) : null}

            {/* Câu theo tình huống */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Câu theo tình huống</Text>
              {categories.map((category) => {
                const stats = getCategoryStats(category.phrases, progress);
                const dialogueId = `dialogue:${category.category}`;
                const dialogueSaved = savedDialogues.has(dialogueId);
                const isOpen = expanded === category.category;
                return (
                  <View key={category.category} style={styles.card}>
                    <TouchableOpacity
                      style={styles.accordionRow}
                      onPress={() => setExpanded((prev) => prev === category.category ? null : category.category)}
                    >
                      <View style={styles.flex}>
                        <Text style={styles.cardTitle}>{category.category}</Text>
                        <Text style={styles.cardSubtitle}>{category.phrases.length} câu • {stats.learnedCount}/{stats.total} đã nhớ</Text>
                      </View>
                      <View style={styles.rightRow}>
                        <Text style={[styles.percentLabel, { color: category.color ?? Colors.primary }]}>
                          {Math.round(stats.learnedPercent * 100)}%
                        </Text>
                        <Ionicons name={isOpen ? 'chevron-up' : 'chevron-down'} size={16} color={Colors.textMuted} />
                      </View>
                    </TouchableOpacity>

                    {isOpen ? (
                      <View style={styles.expandedBody}>
                        {/* Hội thoại */}
                        {category.dialogue ? (
                          <View style={styles.subCard}>
                            <View style={styles.cardMeta}>
                              <Text style={styles.metaLabel}>{category.dialogue.situation}</Text>
                              <TouchableOpacity onPress={() => void playDialogueSequence(category.category)}>
                                <Text style={styles.actionText}>Nghe hội thoại</Text>
                              </TouchableOpacity>
                            </View>
                            {category.dialogue.lines.map((line, index) => (
                              <View key={`${category.category}-${index}`} style={styles.dialogueLine}>
                                <View style={styles.cardMeta}>
                                  <Text style={styles.metaLabel}>{line.speakerLabel}</Text>
                                  <AudioButton audioId={`dialogue:${category.category}:${index}`} text={line.jp} />
                                </View>
                                <Text style={styles.jpText}>{line.jp}</Text>
                                <Text style={styles.romajiText}>{line.romaji}</Text>
                                <Text style={styles.vnText}>{line.vn}</Text>
                              </View>
                            ))}
                            <View style={styles.actions}>
                              <TouchableOpacity onPress={() => bookmarkDialogue(category.category)}>
                                <Text style={styles.actionText}>{dialogueSaved ? 'Bỏ lưu hội thoại' : 'Lưu hội thoại'}</Text>
                              </TouchableOpacity>
                              <TouchableOpacity onPress={() => shareDialogue(category.category)}>
                                <Text style={styles.actionText}>Chia sẻ</Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        ) : null}

                        {/* Danh sách câu */}
                        {category.phrases.map((phrase) => {
                          const level = (progress[phrase.jp] ?? 0) as PhraseLevel;
                          return (
                            <View key={phrase.jp} style={styles.phraseRow}>
                              <View style={[styles.dot, { backgroundColor: LEVEL_COLORS[level] }]} />
                              <View style={styles.flex}>
                                <View style={styles.cardMeta}>
                                  <Text style={styles.jpText}>{phrase.jp}</Text>
                                  <AudioButton audioId={`phrase:${category.category}:${phrase.jp}`} text={phrase.jp} />
                                </View>
                                <Text style={styles.romajiText}>{phrase.romaji}</Text>
                                <Text style={styles.vnText}>{phrase.vn}</Text>
                                <Text style={[styles.levelLabel, { color: LEVEL_COLORS[level] }]}>{LEVEL_LABELS[level]}</Text>
                              </View>
                              <View style={styles.phraseActions}>
                                <TouchableOpacity onPress={() => copyPhrase(phrase.jp, phrase.romaji, phrase.vn)}>
                                  <Ionicons name="copy-outline" size={16} color={Colors.textMuted} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => bookmarkPhrase(phrase, category.category)}>
                                  <Ionicons
                                    name={savedPhrases.has(phrase.jp) ? 'bookmark' : 'bookmark-outline'}
                                    size={16}
                                    color={savedPhrases.has(phrase.jp) ? Colors.primary : Colors.textMuted}
                                  />
                                </TouchableOpacity>
                              </View>
                            </View>
                          );
                        })}

                        {/* Category actions */}
                        <View style={styles.categoryActions}>
                          <TouchableOpacity style={styles.actionPill} onPress={() => navigation.navigate('JapanesePractice', { categoryName: category.category, categoryColor: category.color })}>
                            <Ionicons name="layers-outline" size={14} color={Colors.primary} />
                            <Text style={styles.actionPillText}>Flashcard</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.actionPill} onPress={() => navigation.navigate('JapaneseQuiz', { categoryName: category.category, categoryColor: category.color })}>
                            <Ionicons name="help-circle-outline" size={14} color={Colors.primary} />
                            <Text style={styles.actionPillText}>Quiz</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.actionPill} onPress={() => copyCategory(category.category)}>
                            <Ionicons name="copy-outline" size={14} color={Colors.primary} />
                            <Text style={styles.actionPillText}>Sao chép</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    ) : null}
                  </View>
                );
              })}
            </View>

          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },

  // Header
  header: { backgroundColor: Colors.primary, paddingHorizontal: 16, paddingTop: 12, paddingBottom: 16, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  headerText: { flex: 1 },
  headerTitle: { fontSize: 22, fontWeight: '800', color: Colors.white },
  headerSub: { marginTop: 2, fontSize: 12, color: 'rgba(255,255,255,0.75)' },
  streakBadge: { backgroundColor: 'rgba(255,255,255,0.18)', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8, alignItems: 'center' },
  streakNum: { fontSize: 18, fontWeight: '800', color: Colors.white },
  streakLabel: { fontSize: 10, color: 'rgba(255,255,255,0.8)', fontWeight: '600' },
  searchBox: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: 'rgba(255,255,255,0.14)', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, marginBottom: 12 },
  searchInput: { flex: 1, color: Colors.white, fontSize: 14, paddingVertical: 0 },
  quickRow: { flexDirection: 'row', gap: 8 },
  quickBtn: { flex: 1, flexDirection: 'row', gap: 6, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.14)', borderRadius: 10, paddingVertical: 9 },
  quickBtnText: { color: Colors.white, fontSize: 12, fontWeight: '700' },

  // Content
  content: { flex: 1, paddingHorizontal: 14, paddingTop: 14 },
  tags: { gap: 8, paddingBottom: 10, paddingRight: 16 },
  chip: { paddingHorizontal: 12, paddingVertical: 7, borderRadius: 999, backgroundColor: Colors.card, borderWidth: 1, borderColor: Colors.border },
  chipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  chipText: { fontSize: 12, fontWeight: '600', color: Colors.textPrimary },
  chipTextActive: { color: Colors.white },
  toggle: { flexDirection: 'row', gap: 6, alignSelf: 'flex-start', alignItems: 'center', borderRadius: 10, borderWidth: 1, borderColor: Colors.primary, paddingHorizontal: 12, paddingVertical: 8, backgroundColor: Colors.white, marginBottom: 14 },
  toggleActive: { backgroundColor: Colors.primary },
  toggleText: { color: Colors.primary, fontSize: 12, fontWeight: '700' },
  toggleTextActive: { color: Colors.white },

  // Sections
  section: { marginBottom: 16 },
  sectionTitle: { fontSize: 17, fontWeight: '800', color: Colors.textPrimary, marginBottom: 10 },
  empty: { color: Colors.textMuted, textAlign: 'center', lineHeight: 20, paddingVertical: 12 },

  // Cards
  card: { backgroundColor: Colors.card, borderRadius: 14, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: Colors.border },
  aiCard: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: Colors.card, borderRadius: 14, padding: 14, borderWidth: 1, borderColor: Colors.border },
  subCard: { backgroundColor: Colors.background, borderRadius: 10, padding: 12, marginTop: 10 },
  noteCard: { backgroundColor: Colors.warningLight, borderRadius: 10, padding: 12, marginTop: 10 },
  expandedBody: { marginTop: 12, borderTopWidth: 1, borderTopColor: Colors.border, paddingTop: 12 },

  // Card internals
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  cardMeta: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 2 },
  cardTitle: { fontSize: 14, fontWeight: '800', color: Colors.textPrimary },
  cardSubtitle: { marginTop: 2, fontSize: 12, color: Colors.textMuted },
  accordionRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  flex: { flex: 1 },
  rightRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  indexLabel: { fontSize: 12, color: Colors.textMuted },
  metaLabel: { fontSize: 11, fontWeight: '700', color: Colors.primary },
  percentLabel: { fontSize: 13, fontWeight: '800' },
  levelLabel: { marginTop: 4, fontSize: 11, fontWeight: '700' },
  navRow: { flexDirection: 'row', gap: 4 },

  // Typography
  wordText: { marginTop: 8, fontSize: 28, fontWeight: '800', color: Colors.textPrimary },
  meaningText: { marginTop: 6, fontSize: 15, fontWeight: '700', color: Colors.primary },
  jpText: { marginTop: 4, fontSize: 15, fontWeight: '700', color: Colors.textPrimary },
  romajiText: { marginTop: 3, fontSize: 12, color: Colors.textSecondary, fontStyle: 'italic' },
  vnText: { marginTop: 4, fontSize: 12, lineHeight: 17, color: Colors.textSecondary },
  patternText: { fontSize: 14, fontWeight: '700', color: Colors.primary },
  patternMeaning: { marginTop: 2, fontSize: 12, color: Colors.textSecondary },

  // Actions
  actions: { marginTop: 12, flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  actionText: { color: Colors.primary, fontWeight: '700', fontSize: 12 },
  phraseActions: { flexDirection: 'column', gap: 8, justifyContent: 'center' },
  categoryActions: { marginTop: 12, flexDirection: 'row', gap: 8 },
  actionPill: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 10, paddingVertical: 7, borderRadius: 999, borderWidth: 1, borderColor: Colors.primary, backgroundColor: Colors.background },
  actionPillText: { fontSize: 11, fontWeight: '700', color: Colors.primary },

  // Phrase list
  phraseRow: { marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: Colors.border, flexDirection: 'row', gap: 10 },
  dot: { width: 8, height: 8, borderRadius: 999, marginTop: 8 },

  // Dialogue
  dialogueLine: { marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: Colors.border },

  // Grammar
  patternList: { marginTop: 10 },
  patternItem: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 10, borderTopWidth: 1, borderTopColor: Colors.border },

  // Recent
  recentChip: { backgroundColor: Colors.card, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1, borderColor: Colors.border, minWidth: 120 },
  recentChipText: { fontSize: 12, fontWeight: '700', color: Colors.textPrimary },
});
