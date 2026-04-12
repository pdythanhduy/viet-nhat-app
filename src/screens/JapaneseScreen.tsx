import React, { useCallback, useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Share,
  Alert,
  Clipboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../constants/colors';
import { ESSENTIAL_PHRASES, JAPANESE_WORDS } from '../constants/content';
import { RootStackParamList } from '../navigation/AppNavigator';
import { toggleBookmark } from '../utils/bookmarks';
import {
  getCategoryStats,
  LEVEL_COLORS,
  LEVEL_LABELS,
  loadProgress,
  ProgressData,
  PhraseLevel,
} from '../utils/japaneseProgress';
import { getTodayWordIndex, loadStreak, StreakData } from '../utils/japaneseStreak';
import {
  loadRecentJapaneseCategories,
  RecentJapaneseCategory,
} from '../utils/japaneseRecentCategories';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type TagId = 'all' | 'saved' | 'phone' | 'work' | 'health' | 'city' | 'money' | 'housing';

const TAGS: { id: TagId; label: string }[] = [
  { id: 'all', label: 'Tất cả' },
  { id: 'saved', label: 'Đã lưu' },
  { id: 'phone', label: 'Gọi điện' },
  { id: 'work', label: 'Công ty' },
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

function getCategoryTags(categoryName: string): TagId[] {
  const text = categoryName.toLowerCase();
  const tags = new Set<TagId>(['all']);

  if (text.includes('gọi')) tags.add('phone');
  if (
    text.includes('công việc') ||
    text.includes('lao động') ||
    text.includes('phiếu lương') ||
    text.includes('xin nghỉ') ||
    text.includes('trễ')
  ) {
    tags.add('work');
  }
  if (text.includes('bệnh') || text.includes('khám') || text.includes('sức khỏe')) tags.add('health');
  if (text.includes('city hall')) tags.add('city');
  if (text.includes('ngân hàng') || text.includes('sim') || text.includes('internet')) tags.add('money');
  if (text.includes('nhà') || text.includes('bưu điện') || text.includes('退去')) tags.add('housing');

  return [...tags];
}

export default function JapaneseScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [showRomaji, setShowRomaji] = useState(true);
  const [expandedCategory, setExpandedCategory] = useState<string | null>('Chào hỏi cơ bản');
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState<TagId>('all');
  const [dialogueOnly, setDialogueOnly] = useState(false);
  const [wordIndex, setWordIndex] = useState(() => getTodayWordIndex(JAPANESE_WORDS.length));
  const [progress, setProgress] = useState<ProgressData>({});
  const [savedPhrases, setSavedPhrases] = useState<Set<string>>(new Set());
  const [savedDialogues, setSavedDialogues] = useState<Set<string>>(new Set());
  const [recentCategories, setRecentCategories] = useState<RecentJapaneseCategory[]>([]);
  const [streak, setStreak] = useState<StreakData | null>(null);

  useFocusEffect(
    useCallback(() => {
      loadProgress().then(setProgress);
      loadStreak().then(setStreak);
      loadRecentJapaneseCategories().then(setRecentCategories);
      import('../utils/bookmarks').then(({ loadBookmarks }) => {
        loadBookmarks().then((all) => {
          const ids = new Set(all.filter((item) => item.type === 'phrase').map((item) => item.id));
          const dialogueIds = new Set(all.filter((item) => item.type === 'dialogue').map((item) => item.id));
          setSavedPhrases(ids);
          setSavedDialogues(dialogueIds);
        });
      });
    }, [])
  );

  const currentWord = JAPANESE_WORDS[wordIndex];

  const filteredCategories = useMemo(() => {
    return ESSENTIAL_PHRASES.filter((category) => {
      const tags = getCategoryTags(category.category);
      const dialogueId = `dialogue:${category.category}`;
      const hasSavedContent =
        savedDialogues.has(dialogueId) || category.phrases.some((phrase) => savedPhrases.has(phrase.jp));
      const matchesTag =
        selectedTag === 'all' ||
        (selectedTag === 'saved' ? hasSavedContent : tags.includes(selectedTag));
      const matchesDialogue = !dialogueOnly || Boolean(category.dialogue);
      return matchesTag && matchesDialogue;
    });
  }, [dialogueOnly, savedDialogues, savedPhrases, selectedTag]);

  const searchResults = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return [];

    return filteredCategories.flatMap((category) =>
      category.phrases
        .filter(
          (phrase) =>
            phrase.jp.toLowerCase().includes(q) ||
            phrase.romaji.toLowerCase().includes(q) ||
            phrase.vn.toLowerCase().includes(q) ||
            category.category.toLowerCase().includes(q)
        )
        .map((phrase) => ({ category, phrase }))
    );
  }, [filteredCategories, search]);

  const handlePhraseBookmark = async (
    phrase: { jp: string; romaji: string; vn: string },
    categoryName: string
  ) => {
    const added = await toggleBookmark({
      type: 'phrase',
      id: phrase.jp,
      jp: phrase.jp,
      romaji: phrase.romaji,
      vn: phrase.vn,
      category: categoryName,
      savedAt: '',
    });

    setSavedPhrases((prev) => {
      const next = new Set(prev);
      if (added) next.add(phrase.jp);
      else next.delete(phrase.jp);
      return next;
    });
  };

  const handleDialogueBookmark = async (categoryName: string) => {
    const category = ESSENTIAL_PHRASES.find((item) => item.category === categoryName);
    if (!category?.dialogue) return;

    const dialogueId = `dialogue:${category.category}`;
    const added = await toggleBookmark({
      type: 'dialogue',
      id: dialogueId,
      category: category.category,
      situation: category.dialogue.situation,
      lines: category.dialogue.lines.map((line) => ({
        speakerLabel: line.speakerLabel,
        jp: line.jp,
        romaji: line.romaji,
        vn: line.vn,
      })),
      savedAt: '',
    });

    setSavedDialogues((prev) => {
      const next = new Set(prev);
      if (added) next.add(dialogueId);
      else next.delete(dialogueId);
      return next;
    });
  };

  const handleShareDialogue = async (categoryName: string) => {
    const category = ESSENTIAL_PHRASES.find((item) => item.category === categoryName);
    if (!category?.dialogue) return;

    const message = [
      category.category,
      category.dialogue.situation,
      '',
      ...category.dialogue.lines.flatMap((line) => [
        `${line.speakerLabel}: ${line.jp}`,
        line.romaji,
        line.vn,
        '',
      ]),
    ].join('\n');

    await Share.share({
      title: category.category,
      message,
    });
  };

  const handleCopyPhrase = (jp: string, romaji: string, vn: string) => {
    Clipboard.setString(`${jp}\n${romaji}\n${vn}`);
    Alert.alert('Đã sao chép', 'Đã copy câu vào clipboard.');
  };

  const handleCopyCategory = (categoryName: string) => {
    const category = ESSENTIAL_PHRASES.find((item) => item.category === categoryName);
    if (!category) return;

    const content = [
      category.category,
      '',
      ...category.phrases.flatMap((phrase) => [phrase.jp, phrase.romaji, phrase.vn, '']),
      ...(category.dialogue
        ? [
            'Hội thoại',
            category.dialogue.situation,
            '',
            ...category.dialogue.lines.flatMap((line) => [
              `${line.speakerLabel}: ${line.jp}`,
              line.romaji,
              line.vn,
              '',
            ]),
          ]
        : []),
    ].join('\n');

    Clipboard.setString(content);
    Alert.alert('Đã sao chép', 'Đã copy toàn bộ nhóm câu vào clipboard.');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View style={styles.headerTextBlock}>
            <Text style={styles.headerTitle}>Tiếng Nhật</Text>
            <Text style={styles.headerSubtitle}>
              {getGreeting()} • Câu thực tế để dùng ngay trong đời sống ở Nhật
            </Text>
          </View>
          {streak ? (
            <View style={styles.streakBadge}>
              <Ionicons name="flame" size={16} color="#F39C12" />
              <Text style={styles.streakValue}>{streak.currentStreak}</Text>
              <Text style={styles.streakLabel}>ngày</Text>
            </View>
          ) : null}
        </View>

        <TouchableOpacity
          style={styles.quizBanner}
          onPress={() => navigation.navigate('JapaneseQuiz', {})}
          activeOpacity={0.9}
        >
          <View style={styles.quizLeft}>
            <Ionicons name="school" size={18} color="#F39C12" />
            <View>
              <Text style={styles.quizTitle}>Trắc nghiệm tổng hợp</Text>
              <Text style={styles.quizSubtitle}>Kiểm tra lại phần đã học</Text>
            </View>
          </View>
          <Ionicons name="arrow-forward-circle" size={22} color={Colors.white} />
        </TouchableOpacity>

        <View style={styles.searchBox}>
          <Ionicons name="search" size={16} color="rgba(255,255,255,0.75)" />
          <TextInput
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
            placeholder="Tìm câu, tình huống hoặc từ khóa..."
            placeholderTextColor="rgba(255,255,255,0.55)"
          />
          {search.length > 0 ? (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Ionicons name="close-circle" size={16} color="rgba(255,255,255,0.75)" />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.filterSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
            {TAGS.map((tag) => {
              const active = selectedTag === tag.id;
              return (
                <TouchableOpacity
                  key={tag.id}
                  style={[styles.filterChip, active && styles.filterChipActive]}
                  onPress={() => setSelectedTag(tag.id)}
                >
                  <Text style={[styles.filterChipText, active && styles.filterChipTextActive]}>{tag.label}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <TouchableOpacity
            style={[styles.dialogueToggle, dialogueOnly && styles.dialogueToggleActive]}
            onPress={() => setDialogueOnly((prev) => !prev)}
          >
            <Ionicons
              name={dialogueOnly ? 'chatbubble' : 'chatbubble-outline'}
              size={15}
              color={dialogueOnly ? Colors.white : Colors.primary}
            />
            <Text style={[styles.dialogueToggleText, dialogueOnly && styles.dialogueToggleTextActive]}>
              Chỉ mục có hội thoại
            </Text>
          </TouchableOpacity>
        </View>
        {search.trim() ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Kết quả tìm kiếm</Text>
            {searchResults.length === 0 ? (
              <View style={styles.emptyCard}>
                <Ionicons name="search-outline" size={28} color={Colors.textMuted} />
                <Text style={styles.emptyText}>Không tìm thấy câu phù hợp với bộ lọc hiện tại.</Text>
              </View>
            ) : (
              searchResults.map(({ category, phrase }) => {
                const level = (progress[phrase.jp] ?? 0) as PhraseLevel;
                return (
                  <View key={`${category.category}-${phrase.jp}`} style={styles.resultCard}>
                    <View style={styles.resultHeader}>
                      <Text style={styles.resultCategory}>{category.category}</Text>
                      <View style={[styles.levelBadge, { backgroundColor: `${LEVEL_COLORS[level]}20` }]}>
                        <View style={[styles.levelDot, { backgroundColor: LEVEL_COLORS[level] }]} />
                        <Text style={[styles.levelText, { color: LEVEL_COLORS[level] }]}>{LEVEL_LABELS[level]}</Text>
                      </View>
                    </View>
                    <View style={styles.phraseRow}>
                      <View style={styles.phraseTextBlock}>
                        <Text style={styles.phraseJp}>{phrase.jp}</Text>
                        <Text style={styles.phraseRomaji}>{phrase.romaji}</Text>
                        <Text style={styles.phraseVn}>{phrase.vn}</Text>
                      </View>
                      <View style={styles.inlineActions}>
                        <TouchableOpacity
                          onPress={() => handleCopyPhrase(phrase.jp, phrase.romaji, phrase.vn)}
                          style={styles.bookmarkButton}
                        >
                          <Ionicons name="copy-outline" size={18} color={Colors.primary} />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => handlePhraseBookmark(phrase, category.category)}
                          style={styles.bookmarkButton}
                        >
                          <Ionicons
                            name={savedPhrases.has(phrase.jp) ? 'bookmark' : 'bookmark-outline'}
                            size={18}
                            color={savedPhrases.has(phrase.jp) ? Colors.primary : Colors.textMuted}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                );
              })
            )}
          </View>
        ) : (
          <>
            <View style={styles.wordCard}>
              <View style={styles.wordHeader}>
                <Text style={styles.wordBadge}>Từ của hôm nay</Text>
                <Text style={styles.wordCount}>
                  {wordIndex + 1}/{JAPANESE_WORDS.length}
                </Text>
              </View>

              <Text style={styles.wordJp}>{currentWord.word}</Text>
              <Text style={styles.wordReading}>{currentWord.reading}</Text>
              {showRomaji ? <Text style={styles.wordRomaji}>{currentWord.romaji}</Text> : null}
              <Text style={styles.wordMeaning}>{currentWord.meaning}</Text>

              <View style={styles.exampleBox}>
                <Text style={styles.exampleLabel}>Ví dụ</Text>
                <Text style={styles.exampleJp}>{currentWord.example}</Text>
                {showRomaji ? <Text style={styles.exampleRomaji}>{currentWord.exampleRomaji}</Text> : null}
                <Text style={styles.exampleVn}>{currentWord.exampleMeaning}</Text>
              </View>

              {currentWord.culturalNote ? (
                <View style={styles.tipBox}>
                  <Text style={styles.tipTitle}>Lưu ý thực tế</Text>
                  <Text style={styles.tipText}>{currentWord.culturalNote}</Text>
                </View>
              ) : null}

              <View style={styles.wordActions}>
                <TouchableOpacity style={styles.secondaryButton} onPress={() => setShowRomaji((prev) => !prev)}>
                  <Ionicons
                    name={showRomaji ? 'eye-off-outline' : 'eye-outline'}
                    size={16}
                    color={Colors.primary}
                  />
                  <Text style={styles.secondaryButtonText}>{showRomaji ? 'Ẩn romaji' : 'Hiện romaji'}</Text>
                </TouchableOpacity>

                <View style={styles.wordNav}>
                  <TouchableOpacity
                    style={styles.navButton}
                    onPress={() => setWordIndex((prev) => (prev - 1 + JAPANESE_WORDS.length) % JAPANESE_WORDS.length)}
                  >
                    <Ionicons name="chevron-back" size={18} color={Colors.primary} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.navButton}
                    onPress={() => setWordIndex((prev) => (prev + 1) % JAPANESE_WORDS.length)}
                  >
                    <Ionicons name="chevron-forward" size={18} color={Colors.primary} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {recentCategories.length > 0 ? (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Luyện gần đây</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.recentRow}>
                  {recentCategories.map((item) => (
                    <TouchableOpacity
                      key={item.categoryName}
                      style={styles.recentCard}
                      onPress={() =>
                        navigation.navigate('JapanesePractice', {
                          categoryName: item.categoryName,
                          categoryColor: item.categoryColor,
                        })
                      }
                    >
                      <View
                        style={[
                          styles.recentIcon,
                          { backgroundColor: `${item.categoryColor ?? Colors.primary}18` },
                        ]}
                      >
                        <Ionicons
                          name="time-outline"
                          size={16}
                          color={item.categoryColor ?? Colors.primary}
                        />
                      </View>
                      <Text style={styles.recentTitle} numberOfLines={2}>
                        {item.categoryName}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            ) : null}

            <Text style={styles.sectionTitle}>Câu theo tình huống</Text>
            {filteredCategories.map((category) => {
              const stats = getCategoryStats(category.phrases, progress);
              const expanded = expandedCategory === category.category;
              const tags = getCategoryTags(category.category).filter((tag) => tag !== 'all');
              const dialogueId = `dialogue:${category.category}`;
              const dialogueSaved = savedDialogues.has(dialogueId);

              return (
                <View key={category.category} style={styles.categoryCard}>
                  <TouchableOpacity
                    style={styles.categoryHeader}
                    onPress={() => setExpandedCategory((prev) => (prev === category.category ? null : category.category))}
                    activeOpacity={0.9}
                  >
                    <View style={styles.categoryInfo}>
                      <View style={[styles.categoryIcon, { backgroundColor: `${category.color ?? Colors.primary}18` }]}>
                        <Ionicons
                          name={(category.icon ?? 'chatbubbles') as keyof typeof Ionicons.glyphMap}
                          size={18}
                          color={category.color ?? Colors.primary}
                        />
                      </View>
                      <View style={styles.categoryTextBlock}>
                        <Text style={styles.categoryTitle}>{category.category}</Text>
                        <Text style={styles.categorySubtitle}>
                          {category.phrases.length} câu • {stats.learnedCount}/{stats.total} đã nhớ
                        </Text>
                        {tags.length > 0 ? (
                          <View style={styles.categoryTags}>
                            {tags.map((tag) => {
                              const label = TAGS.find((item) => item.id === tag)?.label ?? tag;
                              return (
                                <View key={`${category.category}-${tag}`} style={styles.categoryTagChip}>
                                  <Text style={styles.categoryTagText}>{label}</Text>
                                </View>
                              );
                            })}
                          </View>
                        ) : null}
                      </View>
                    </View>
                    <Ionicons name={expanded ? 'chevron-up' : 'chevron-down'} size={18} color={Colors.textMuted} />
                  </TouchableOpacity>

                  <View style={styles.progressTrack}>
                    <View
                      style={[
                        styles.progressFill,
                        {
                          width: `${stats.learnedPercent * 100}%`,
                          backgroundColor: category.color ?? Colors.primary,
                        },
                      ]}
                    />
                  </View>

                  {expanded ? (
                    <View style={styles.categoryBody}>
                      {category.dialogue ? (
                        <View style={styles.dialogueCard}>
                          <View style={styles.dialogueHeader}>
                            <Text style={styles.dialogueTitle}>{category.dialogue.situation}</Text>
                            <View style={styles.dialogueActions}>
                              <TouchableOpacity
                                style={styles.dialogueActionButton}
                                onPress={() => handleDialogueBookmark(category.category)}
                              >
                                <Ionicons
                                  name={dialogueSaved ? 'bookmark' : 'bookmark-outline'}
                                  size={15}
                                  color={Colors.primary}
                                />
                                <Text style={styles.dialogueShareText}>
                                  {dialogueSaved ? 'Đã lưu' : 'Lưu'}
                                </Text>
                              </TouchableOpacity>
                              <TouchableOpacity
                                style={styles.dialogueActionButton}
                                onPress={() => handleShareDialogue(category.category)}
                              >
                                <Ionicons name="share-social-outline" size={15} color={Colors.primary} />
                                <Text style={styles.dialogueShareText}>Chia sẻ</Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                          {category.dialogue.lines.map((line, index) => (
                            <View key={`${category.category}-line-${index}`} style={styles.dialogueLine}>
                              <Text style={styles.dialogueSpeaker}>{line.speakerLabel}</Text>
                              <Text style={styles.dialogueJp}>{line.jp}</Text>
                              <Text style={styles.dialogueRomaji}>{line.romaji}</Text>
                              <Text style={styles.dialogueVn}>{line.vn}</Text>
                            </View>
                          ))}
                        </View>
                      ) : null}

                      {category.phrases.map((phrase) => {
                        const level = (progress[phrase.jp] ?? 0) as PhraseLevel;
                        return (
                          <View key={phrase.jp} style={styles.categoryPhraseRow}>
                          <View style={styles.phraseLeft}>
                              <View style={[styles.levelDotLarge, { backgroundColor: LEVEL_COLORS[level] }]} />
                              <View style={styles.phraseTextBlock}>
                                <Text style={styles.phraseJp}>{phrase.jp}</Text>
                                <Text style={styles.phraseRomaji}>{phrase.romaji}</Text>
                                <Text style={styles.phraseVn}>{phrase.vn}</Text>
                              </View>
                            </View>
                            <View style={styles.inlineActions}>
                              <TouchableOpacity
                                onPress={() => handleCopyPhrase(phrase.jp, phrase.romaji, phrase.vn)}
                                style={styles.bookmarkButton}
                              >
                                <Ionicons name="copy-outline" size={18} color={Colors.primary} />
                              </TouchableOpacity>
                              <TouchableOpacity
                                onPress={() => handlePhraseBookmark(phrase, category.category)}
                                style={styles.bookmarkButton}
                              >
                                <Ionicons
                                  name={savedPhrases.has(phrase.jp) ? 'bookmark' : 'bookmark-outline'}
                                  size={18}
                                  color={savedPhrases.has(phrase.jp) ? Colors.primary : Colors.textMuted}
                                />
                              </TouchableOpacity>
                            </View>
                          </View>
                        );
                      })}

                      <View style={styles.categoryActions}>
                        <TouchableOpacity
                          style={styles.copyCategoryButton}
                          onPress={() => handleCopyCategory(category.category)}
                        >
                          <Ionicons name="copy-outline" size={16} color={Colors.primary} />
                          <Text style={styles.copyCategoryText}>Copy nhóm</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[styles.primaryButton, { backgroundColor: category.color ?? Colors.primary }]}
                          onPress={() =>
                            navigation.navigate('JapanesePractice', {
                              categoryName: category.category,
                              categoryColor: category.color,
                            })
                          }
                        >
                          <Ionicons name="albums-outline" size={16} color={Colors.white} />
                          <Text style={styles.primaryButtonText}>Luyện flashcard</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={[styles.secondaryOutlineButton, { borderColor: category.color ?? Colors.primary }]}
                          onPress={() =>
                            navigation.navigate('JapaneseQuiz', {
                              categoryName: category.category,
                              categoryColor: category.color,
                            })
                          }
                        >
                          <Ionicons
                            name="help-circle-outline"
                            size={16}
                            color={category.color ?? Colors.primary}
                          />
                          <Text style={[styles.secondaryOutlineText, { color: category.color ?? Colors.primary }]}>
                            Làm quiz
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ) : null}
                </View>
              );
            })}

            <TouchableOpacity
              style={styles.aiCard}
              onPress={() =>
                navigation.navigate('AIChat', {
                  title: 'Luyện tiếng Nhật',
                  prefilledQuestion:
                    'Hãy giúp tôi luyện 5 câu tiếng Nhật ngắn, tự nhiên, dùng trong đời sống ở Nhật. Giải thích bằng tiếng Việt.',
                })
              }
            >
              <View style={styles.aiLeft}>
                <View style={styles.aiIcon}>
                  <Ionicons name="sparkles" size={18} color={Colors.white} />
                </View>
                <View style={styles.aiTextBlock}>
                  <Text style={styles.aiTitle}>Nhờ AI luyện thêm</Text>
                  <Text style={styles.aiSubtitle}>Xin câu mẫu theo đúng tình huống bạn đang gặp</Text>
                </View>
              </View>
              <Ionicons name="arrow-forward" size={18} color={Colors.primary} />
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  headerTextBlock: { flex: 1 },
  headerTitle: { fontSize: 24, fontWeight: '800', color: Colors.white },
  headerSubtitle: { marginTop: 4, fontSize: 13, lineHeight: 19, color: 'rgba(255,255,255,0.82)' },
  streakBadge: {
    minWidth: 56,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  streakValue: { marginTop: 2, fontSize: 16, fontWeight: '800', color: Colors.textPrimary },
  streakLabel: { fontSize: 11, color: Colors.textMuted },
  quizBanner: {
    marginTop: 14,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quizLeft: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 },
  quizTitle: { color: Colors.white, fontSize: 14, fontWeight: '700' },
  quizSubtitle: { color: 'rgba(255,255,255,0.78)', fontSize: 12, marginTop: 2 },
  searchBox: {
    marginTop: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.12)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    gap: 8,
  },
  searchInput: { flex: 1, color: Colors.white, paddingVertical: 11, fontSize: 14 },
  content: { flex: 1, paddingHorizontal: 16, paddingTop: 14 },
  filterSection: { gap: 10, marginBottom: 16 },
  filterRow: { gap: 8, paddingRight: 16 },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  filterChipText: { fontSize: 12, fontWeight: '600', color: Colors.textPrimary },
  filterChipTextActive: { color: Colors.white },
  dialogueToggle: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
  },
  dialogueToggleActive: { backgroundColor: Colors.primary },
  dialogueToggleText: { fontSize: 12, fontWeight: '700', color: Colors.primary },
  dialogueToggleTextActive: { color: Colors.white },
  section: { marginBottom: 18 },
  sectionTitle: { marginBottom: 12, fontSize: 18, fontWeight: '800', color: Colors.textPrimary },
  emptyCard: {
    borderRadius: 8,
    padding: 20,
    backgroundColor: Colors.card,
    alignItems: 'center',
    gap: 8,
  },
  emptyText: { color: Colors.textMuted, textAlign: 'center', lineHeight: 20 },
  recentRow: { gap: 10, paddingRight: 12 },
  recentCard: {
    width: 148,
    backgroundColor: Colors.card,
    borderRadius: 8,
    padding: 12,
  },
  recentIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  recentTitle: { fontSize: 13, fontWeight: '700', color: Colors.textPrimary, lineHeight: 18 },
  resultCard: {
    backgroundColor: Colors.card,
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
  },
  resultHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 10 },
  resultCategory: { flex: 1, fontSize: 12, fontWeight: '700', color: Colors.textMuted },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  levelDot: { width: 7, height: 7, borderRadius: 999 },
  levelText: { fontSize: 11, fontWeight: '700' },
  wordCard: { backgroundColor: Colors.card, borderRadius: 8, padding: 16, marginBottom: 18 },
  wordHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  wordBadge: { fontSize: 12, fontWeight: '700', color: Colors.primary },
  wordCount: { fontSize: 12, color: Colors.textMuted },
  wordJp: { marginTop: 12, fontSize: 28, fontWeight: '800', color: Colors.textPrimary },
  wordReading: { marginTop: 6, fontSize: 15, color: Colors.textSecondary },
  wordRomaji: { marginTop: 4, fontSize: 14, color: Colors.textMuted },
  wordMeaning: { marginTop: 10, fontSize: 16, fontWeight: '700', color: Colors.textPrimary },
  exampleBox: {
    marginTop: 14,
    padding: 12,
    borderRadius: 8,
    backgroundColor: Colors.background,
    gap: 4,
  },
  exampleLabel: { fontSize: 12, fontWeight: '700', color: Colors.textMuted },
  exampleJp: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary },
  exampleRomaji: { fontSize: 13, color: Colors.textSecondary },
  exampleVn: { fontSize: 13, lineHeight: 19, color: Colors.textSecondary },
  tipBox: {
    marginTop: 12,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#FFF7E8',
  },
  tipTitle: { fontSize: 12, fontWeight: '700', color: '#C47A00', marginBottom: 4 },
  tipText: { fontSize: 13, lineHeight: 19, color: Colors.textSecondary },
  wordActions: { marginTop: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12 },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: Colors.background,
  },
  secondaryButtonText: { color: Colors.primary, fontWeight: '700', fontSize: 13 },
  wordNav: { flexDirection: 'row', gap: 8 },
  navButton: {
    width: 38,
    height: 38,
    borderRadius: 8,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryCard: { marginBottom: 12, backgroundColor: Colors.card, borderRadius: 8, overflow: 'hidden' },
  categoryHeader: {
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  categoryInfo: { flexDirection: 'row', flex: 1, gap: 12 },
  categoryIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryTextBlock: { flex: 1 },
  categoryTitle: { fontSize: 15, fontWeight: '800', color: Colors.textPrimary, lineHeight: 20 },
  categorySubtitle: { marginTop: 3, fontSize: 12, color: Colors.textMuted },
  categoryTags: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 8 },
  categoryTagChip: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: Colors.background,
  },
  categoryTagText: { fontSize: 11, fontWeight: '700', color: Colors.textSecondary },
  progressTrack: { height: 4, backgroundColor: Colors.border, marginHorizontal: 14, borderRadius: 999 },
  progressFill: { height: 4, borderRadius: 999 },
  categoryBody: { padding: 14, gap: 12 },
  dialogueCard: { padding: 12, borderRadius: 8, backgroundColor: Colors.background },
  dialogueHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 10, marginBottom: 10 },
  dialogueTitle: { flex: 1, fontSize: 13, fontWeight: '800', color: Colors.textPrimary },
  dialogueActions: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  dialogueActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  dialogueShareText: { fontSize: 12, fontWeight: '700', color: Colors.primary },
  dialogueLine: { marginTop: 10 },
  dialogueSpeaker: { fontSize: 12, fontWeight: '700', color: Colors.primary, marginBottom: 4 },
  dialogueJp: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary },
  dialogueRomaji: { marginTop: 3, fontSize: 12, color: Colors.textSecondary },
  dialogueVn: { marginTop: 3, fontSize: 12, lineHeight: 18, color: Colors.textSecondary },
  categoryPhraseRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 10, alignItems: 'flex-start' },
  phraseRow: { marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', gap: 10, alignItems: 'flex-start' },
  phraseLeft: { flex: 1, flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  inlineActions: { gap: 8 },
  levelDotLarge: { width: 10, height: 10, borderRadius: 999, marginTop: 7 },
  phraseTextBlock: { flex: 1 },
  phraseJp: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary, lineHeight: 19 },
  phraseRomaji: { marginTop: 3, fontSize: 12, color: Colors.textSecondary },
  phraseVn: { marginTop: 4, fontSize: 12, lineHeight: 18, color: Colors.textSecondary },
  bookmarkButton: {
    width: 34,
    height: 34,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },
  categoryActions: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 2 },
  copyCategoryButton: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 11,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
  },
  copyCategoryText: { color: Colors.primary, fontWeight: '800', fontSize: 13 },
  primaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 11,
    borderRadius: 8,
  },
  primaryButtonText: { color: Colors.white, fontWeight: '800', fontSize: 13 },
  secondaryOutlineButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 11,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: Colors.white,
  },
  secondaryOutlineText: { fontWeight: '800', fontSize: 13 },
  aiCard: {
    marginTop: 6,
    marginBottom: 24,
    borderRadius: 8,
    padding: 14,
    backgroundColor: '#EEF5FF',
    borderWidth: 1,
    borderColor: '#D7E8FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  aiLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  aiIcon: {
    width: 38,
    height: 38,
    borderRadius: 8,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiTextBlock: { flex: 1 },
  aiTitle: { fontSize: 14, fontWeight: '800', color: Colors.textPrimary },
  aiSubtitle: { marginTop: 3, fontSize: 12, lineHeight: 18, color: Colors.textSecondary },
});
