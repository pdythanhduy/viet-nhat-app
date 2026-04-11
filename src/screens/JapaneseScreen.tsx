import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../constants/colors';
import { JAPANESE_WORDS, ESSENTIAL_PHRASES } from '../constants/content';
import { RootStackParamList } from '../navigation/AppNavigator';
import { toggleBookmark } from '../utils/bookmarks';
import {
  loadProgress,
  getCategoryStats,
  LEVEL_COLORS,
  LEVEL_LABELS,
  ProgressData,
  PhraseLevel,
} from '../utils/japaneseProgress';
import { loadStreak, getTodayWordIndex, StreakData } from '../utils/japaneseStreak';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function JapaneseScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [wordIndex, setWordIndex] = useState(() => getTodayWordIndex(JAPANESE_WORDS.length));
  const [showRomaji, setShowRomaji] = useState(true);
  const [expandedCategory, setExpandedCategory] = useState<string | null>('Chào hỏi cơ bản');
  const [search, setSearch] = useState('');
  const [savedPhrases, setSavedPhrases] = useState<Set<string>>(new Set());
  const [progress, setProgress] = useState<ProgressData>({});
  const [streak, setStreak] = useState<StreakData | null>(null);
  // 'phrases' | 'dialogue' per category
  const [categoryTab, setCategoryTab] = useState<Record<string, 'phrases' | 'dialogue'>>({});

  useFocusEffect(
    useCallback(() => {
      loadProgress().then(setProgress);
      loadStreak().then(setStreak);
      import('../utils/bookmarks').then(({ loadBookmarks }) => {
        loadBookmarks().then((all) => {
          const ids = new Set(all.filter((b) => b.type === 'phrase').map((b) => b.id));
          setSavedPhrases(ids);
        });
      });
    }, [])
  );

  const handlePhraseBookmark = async (
    phrase: { jp: string; romaji: string; vn: string },
    category: string
  ) => {
    const id = phrase.jp;
    const added = await toggleBookmark({
      type: 'phrase',
      id,
      jp: phrase.jp,
      romaji: phrase.romaji,
      vn: phrase.vn,
      category,
      savedAt: '',
    });
    setSavedPhrases((prev) => {
      const next = new Set(prev);
      if (added) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  const currentWord = JAPANESE_WORDS[wordIndex];
  const nextWord = () => setWordIndex((prev) => (prev + 1) % JAPANESE_WORDS.length);
  const prevWord = () => setWordIndex((prev) => (prev - 1 + JAPANESE_WORDS.length) % JAPANESE_WORDS.length);

  const searchResults = useMemo(() => {
    if (!search.trim()) return [];
    const q = search.toLowerCase();
    const results: { category: string; phrase: { jp: string; romaji: string; vn: string } }[] = [];
    ESSENTIAL_PHRASES.forEach((cat) => {
      cat.phrases.forEach((phrase) => {
        if (
          phrase.jp.toLowerCase().includes(q) ||
          phrase.vn.toLowerCase().includes(q) ||
          phrase.romaji.toLowerCase().includes(q)
        ) {
          results.push({ category: cat.category, phrase });
        }
      });
    });
    return results;
  }, [search]);

  const getCategoryTabMode = (catName: string) => categoryTab[catName] || 'phrases';
  const setCatTab = (catName: string, tab: 'phrases' | 'dialogue') => {
    setCategoryTab((prev) => ({ ...prev, [catName]: tab }));
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      <View style={styles.header}>
        <View style={styles.headerTopRow}>
          <View>
            <Text style={styles.headerTitle}>Tiếng Nhật</Text>
            <Text style={styles.headerSub}>Học từ vựng và cụm từ thực dụng</Text>
          </View>
          {/* Streak badge */}
          {streak !== null && (
            <TouchableOpacity
              style={styles.streakBadge}
              onPress={() =>
                navigation.navigate('AIChat', {
                  title: 'Luyện tiếng Nhật',
                  prefilledQuestion: 'Hãy ra cho tôi 5 câu tiếng Nhật để luyện tập hôm nay, phù hợp với người Việt mới đến Nhật.',
                })
              }
            >
              <Text style={styles.streakFire}>🔥</Text>
              <View>
                <Text style={styles.streakNum}>{streak.currentStreak}</Text>
                <Text style={styles.streakLabel}>ngày</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>

        {/* Quiz banner */}
        <TouchableOpacity
          style={styles.quizBanner}
          onPress={() => navigation.navigate('JapaneseQuiz', {})}
          activeOpacity={0.85}
        >
          <View style={styles.quizBannerLeft}>
            <Ionicons name="school" size={20} color="#F39C12" />
            <View>
              <Text style={styles.quizBannerTitle}>Trắc nghiệm tổng hợp</Text>
              <Text style={styles.quizBannerSub}>Kiểm tra kiến thức của bạn</Text>
            </View>
          </View>
          <Ionicons name="arrow-forward-circle" size={22} color="rgba(255,255,255,0.8)" />
        </TouchableOpacity>

        <View style={styles.searchBox}>
          <Ionicons name="search" size={17} color="rgba(255,255,255,0.7)" />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm cụm từ tiếng Nhật..."
            placeholderTextColor="rgba(255,255,255,0.55)"
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Ionicons name="close-circle" size={17} color="rgba(255,255,255,0.7)" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>

        {/* Search Results */}
        {search.trim() !== '' && (
          <>
            {searchResults.length === 0 ? (
              <View style={styles.emptyBox}>
                <Ionicons name="search-outline" size={36} color={Colors.textMuted} />
                <Text style={styles.emptyText}>Không tìm thấy cụm từ nào</Text>
              </View>
            ) : (
              <>
                <Text style={styles.searchResultCount}>{searchResults.length} kết quả</Text>
                {searchResults.map((item, i) => {
                  const level = (progress[item.phrase.jp] ?? 0) as PhraseLevel;
                  return (
                    <View key={i} style={styles.searchResultItem}>
                      <View style={styles.searchResultTop}>
                        <View style={styles.searchResultCatBadge}>
                          <Text style={styles.searchResultCatText}>{item.category}</Text>
                        </View>
                        <View style={[styles.levelPill, { backgroundColor: LEVEL_COLORS[level] + '20' }]}>
                          <View style={[styles.levelDot, { backgroundColor: LEVEL_COLORS[level] }]} />
                          <Text style={[styles.levelPillText, { color: LEVEL_COLORS[level] }]}>
                            {LEVEL_LABELS[level]}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.phraseRow}>
                        <View style={styles.phraseTexts}>
                          <Text style={styles.phraseJp}>{item.phrase.jp}</Text>
                          <Text style={styles.phraseRomaji}>{item.phrase.romaji}</Text>
                          <Text style={styles.phraseVn}>{item.phrase.vn}</Text>
                        </View>
                        <TouchableOpacity
                          onPress={() => handlePhraseBookmark(item.phrase, item.category)}
                          style={styles.phraseBookmarkBtn}
                        >
                          <Ionicons
                            name={savedPhrases.has(item.phrase.jp) ? 'bookmark' : 'bookmark-outline'}
                            size={18}
                            color={savedPhrases.has(item.phrase.jp) ? Colors.primary : Colors.textMuted}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                })}
              </>
            )}
          </>
        )}

        {/* Word of the Day */}
        {search.trim() === '' && (
          <View style={styles.wordCard}>
            <View style={styles.wordHeader}>
              <View style={styles.wotdBadge}>
                <Ionicons name="star" size={12} color="#F39C12" />
                <Text style={styles.wotdText}>Từ của ngày hôm nay</Text>
              </View>
              <View style={styles.wordNav}>
                <TouchableOpacity onPress={prevWord} style={styles.navBtn}>
                  <Ionicons name="chevron-back" size={18} color={Colors.primary} />
                </TouchableOpacity>
                <Text style={styles.wordCount}>{wordIndex + 1}/{JAPANESE_WORDS.length}</Text>
                <TouchableOpacity onPress={nextWord} style={styles.navBtn}>
                  <Ionicons name="chevron-forward" size={18} color={Colors.primary} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.wordMain}>
              <Text style={styles.wordJp}>{currentWord.word}</Text>
              <Text style={styles.wordReading}>{currentWord.reading}</Text>
              {showRomaji && <Text style={styles.wordRomaji}>{currentWord.romaji}</Text>}
              <View style={styles.meaningBadge}>
                <Text style={styles.wordMeaning}>{currentWord.meaning}</Text>
              </View>
            </View>

            <View style={styles.exampleBox}>
              <Text style={styles.exampleLabel}>Ví dụ:</Text>
              <Text style={styles.exampleJp}>{currentWord.example}</Text>
              {showRomaji && <Text style={styles.exampleRomaji}>{currentWord.exampleRomaji}</Text>}
              <Text style={styles.exampleVn}>{currentWord.exampleMeaning}</Text>
            </View>

            {currentWord.culturalNote && (
              <View style={styles.culturalBox}>
                <View style={styles.culturalLabelRow}>
                  <Ionicons name="bulb" size={13} color="#E67E22" />
                  <Text style={styles.culturalLabel}>Mẹo thực tế</Text>
                </View>
                <Text style={styles.culturalNote}>{currentWord.culturalNote}</Text>
              </View>
            )}

            <View style={styles.wordActions}>
              <TouchableOpacity
                style={styles.romajiToggle}
                onPress={() => setShowRomaji(!showRomaji)}
              >
                <Ionicons
                  name={showRomaji ? 'eye-off-outline' : 'eye-outline'}
                  size={15}
                  color={Colors.primary}
                />
                <Text style={styles.romajiToggleText}>
                  {showRomaji ? 'Ẩn phiên âm' : 'Hiện phiên âm'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.learnMoreBtn}
                onPress={() =>
                  navigation.navigate('AIChat', {
                    title: `Học từ: ${currentWord.word}`,
                    prefilledQuestion: `Giải thích chi tiết về từ "${currentWord.word}" (${currentWord.reading}) trong tiếng Nhật. Bao gồm: cách dùng, các câu ví dụ khác, từ liên quan, và những lưu ý khi sử dụng từ này trong cuộc sống tại Nhật.`,
                  })
                }
              >
                <Ionicons name="sparkles" size={14} color={Colors.white} />
                <Text style={styles.learnMoreText}>Học thêm với AI</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Essential Phrases */}
        {search.trim() === '' && (
          <>
            <Text style={styles.sectionTitle}>Cụm từ thiết yếu</Text>

            {ESSENTIAL_PHRASES.map((category) => {
              const catColor = category.color || Colors.primary;
              const stats = getCategoryStats(category.phrases as { jp: string }[], progress);
              const isOpen = expandedCategory === category.category;
              const tabMode = getCategoryTabMode(category.category);
              const hasDialogue = !!category.dialogue;

              return (
                <View key={category.category} style={styles.categoryCard}>
                  {/* Header */}
                  <TouchableOpacity
                    style={styles.categoryHeader}
                    onPress={() =>
                      setExpandedCategory(isOpen ? null : category.category)
                    }
                    activeOpacity={0.8}
                  >
                    <View style={styles.categoryLeft}>
                      <View style={[styles.categoryIcon, { backgroundColor: catColor + '18' }]}>
                        <Ionicons
                          name={category.icon || 'chatbubble'}
                          size={18}
                          color={catColor}
                        />
                      </View>
                      <View style={styles.categoryTitleBlock}>
                        <Text style={styles.categoryTitle}>{category.category}</Text>
                        <Text style={styles.categorySubtitle}>
                          {stats.learnedCount}/{stats.total} đã nhớ
                        </Text>
                      </View>
                    </View>
                    <View style={styles.categoryRight}>
                      {hasDialogue && (
                        <View style={styles.dialogueBadge}>
                          <Ionicons name="chatbubbles" size={11} color={catColor} />
                        </View>
                      )}
                      <View style={styles.countBadge}>
                        <Text style={[styles.countText, { color: catColor }]}>{category.phrases.length}</Text>
                      </View>
                      <Ionicons
                        name={isOpen ? 'chevron-up' : 'chevron-down'}
                        size={18}
                        color={Colors.textMuted}
                      />
                    </View>
                  </TouchableOpacity>

                  {/* Progress bar */}
                  <View style={styles.progressBarBg}>
                    {stats.learnedPercent > 0 && (
                      <View
                        style={[
                          styles.progressBarFill,
                          {
                            width: `${stats.learnedPercent * 100}%`,
                            backgroundColor:
                              stats.learnedPercent >= 1 ? '#27AE60' :
                              stats.learnedPercent >= 0.5 ? '#2980B9' : catColor,
                          },
                        ]}
                      />
                    )}
                  </View>

                  {/* Content tabs + list */}
                  {isOpen && (
                    <View style={styles.phrasesList}>
                      {/* Tab switcher (only if dialogue exists) */}
                      {hasDialogue && (
                        <View style={styles.tabRow}>
                          <TouchableOpacity
                            style={[styles.tabBtn, tabMode === 'phrases' && { backgroundColor: catColor }]}
                            onPress={() => setCatTab(category.category, 'phrases')}
                          >
                            <Ionicons
                              name="list"
                              size={13}
                              color={tabMode === 'phrases' ? Colors.white : Colors.textMuted}
                            />
                            <Text style={[styles.tabBtnText, tabMode === 'phrases' && styles.tabBtnTextActive]}>
                              Cụm từ
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[styles.tabBtn, tabMode === 'dialogue' && { backgroundColor: catColor }]}
                            onPress={() => setCatTab(category.category, 'dialogue')}
                          >
                            <Ionicons
                              name="chatbubbles"
                              size={13}
                              color={tabMode === 'dialogue' ? Colors.white : Colors.textMuted}
                            />
                            <Text style={[styles.tabBtnText, tabMode === 'dialogue' && styles.tabBtnTextActive]}>
                              Hội thoại
                            </Text>
                          </TouchableOpacity>
                        </View>
                      )}

                      {/* Phrases tab */}
                      {tabMode === 'phrases' && (
                        <>
                          {(category.phrases as { jp: string; romaji: string; vn: string }[]).map(
                            (phrase, i) => {
                              const level = (progress[phrase.jp] ?? 0) as PhraseLevel;
                              return (
                                <View
                                  key={i}
                                  style={[
                                    styles.phraseItem,
                                    i < category.phrases.length - 1 && styles.phraseBorder,
                                  ]}
                                >
                                  <View style={styles.phraseRow}>
                                    <View style={styles.levelIndicator}>
                                      <View
                                        style={[
                                          styles.levelDotLarge,
                                          { backgroundColor: LEVEL_COLORS[level] },
                                        ]}
                                      />
                                    </View>
                                    <View style={styles.phraseTexts}>
                                      <Text style={styles.phraseJp}>{phrase.jp}</Text>
                                      <Text style={styles.phraseRomaji}>{phrase.romaji}</Text>
                                      <Text style={styles.phraseVn}>{phrase.vn}</Text>
                                    </View>
                                    <TouchableOpacity
                                      onPress={() => handlePhraseBookmark(phrase, category.category)}
                                      style={styles.phraseBookmarkBtn}
                                    >
                                      <Ionicons
                                        name={
                                          savedPhrases.has(phrase.jp) ? 'bookmark' : 'bookmark-outline'
                                        }
                                        size={18}
                                        color={
                                          savedPhrases.has(phrase.jp) ? Colors.primary : Colors.textMuted
                                        }
                                      />
                                    </TouchableOpacity>
                                  </View>
                                </View>
                              );
                            }
                          )}
                        </>
                      )}

                      {/* Dialogue tab */}
                      {tabMode === 'dialogue' && category.dialogue && (
                        <View style={styles.dialogueContainer}>
                          <View style={styles.situationBadge}>
                            <Ionicons name="location" size={12} color={catColor} />
                            <Text style={[styles.situationText, { color: catColor }]}>
                              {category.dialogue.situation}
                            </Text>
                          </View>
                          {category.dialogue.lines.map((line, i) => {
                            const isA = line.speaker === 'A';
                            return (
                              <View
                                key={i}
                                style={[
                                  styles.dialogueLine,
                                  isA ? styles.dialogueLineA : styles.dialogueLineB,
                                ]}
                              >
                                <View
                                  style={[
                                    styles.speakerTag,
                                    { backgroundColor: isA ? catColor : Colors.textSecondary },
                                  ]}
                                >
                                  <Text style={styles.speakerTagText}>{line.speakerLabel}</Text>
                                </View>
                                <View
                                  style={[
                                    styles.dialogueBubble,
                                    isA
                                      ? { backgroundColor: catColor + '12', borderColor: catColor + '30' }
                                      : { backgroundColor: Colors.accent, borderColor: Colors.border },
                                  ]}
                                >
                                  <Text style={styles.dialogueJp}>{line.jp}</Text>
                                  <Text style={styles.dialogueRomaji}>{line.romaji}</Text>
                                  <Text style={styles.dialogueVn}>{line.vn}</Text>
                                </View>
                              </View>
                            );
                          })}
                        </View>
                      )}

                      {/* Action buttons */}
                      <View style={styles.categoryActions}>
                        <TouchableOpacity
                          style={[styles.practiceBtn, { backgroundColor: catColor }]}
                          onPress={() =>
                            navigation.navigate('JapanesePractice', {
                              categoryName: category.category,
                              categoryColor: catColor,
                            })
                          }
                        >
                          <Ionicons name="flash" size={15} color={Colors.white} />
                          <Text style={styles.practiceBtnText}>Flashcard</Text>
                          {stats.learnedCount > 0 && (
                            <View style={styles.practiceBtnBadge}>
                              <Text style={styles.practiceBtnBadgeText}>
                                {stats.learnedCount}/{stats.total}
                              </Text>
                            </View>
                          )}
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={[styles.quizBtn, { borderColor: catColor }]}
                          onPress={() =>
                            navigation.navigate('JapaneseQuiz', {
                              categoryName: category.category,
                              categoryColor: catColor,
                            })
                          }
                        >
                          <Ionicons name="school" size={15} color={catColor} />
                          <Text style={[styles.quizBtnText, { color: catColor }]}>Trắc nghiệm</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </View>
              );
            })}

            {/* Level legend */}
            <View style={styles.legendCard}>
              <Text style={styles.legendTitle}>Cấp độ học</Text>
              <View style={styles.legendRow}>
                {([0, 1, 2, 3] as PhraseLevel[]).map((level) => (
                  <View key={level} style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: LEVEL_COLORS[level] }]} />
                    <Text style={styles.legendLabel}>{LEVEL_LABELS[level]}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Learn More with AI */}
            <TouchableOpacity
              style={styles.aiCard}
              onPress={() =>
                navigation.navigate('AIChat', {
                  title: 'Học tiếng Nhật với AI',
                  prefilledQuestion:
                    'Tôi là người Việt Nam đang sinh sống tại Nhật. Hãy giúp tôi học tiếng Nhật theo cách thực dụng nhất. Tôi muốn bắt đầu với những mẫu câu cần thiết cho: đi làm, mua sắm, và giao tiếp hàng ngày. Hãy giải thích bằng tiếng Việt và có ví dụ cụ thể.',
                })
              }
            >
              <View style={styles.aiLeft}>
                <View style={styles.aiIconBg}>
                  <Ionicons name="sparkles" size={22} color={Colors.white} />
                </View>
                <View>
                  <Text style={styles.aiTitle}>Học tiếng Nhật với AI</Text>
                  <Text style={styles.aiSub}>Luyện tập theo tình huống thực tế</Text>
                </View>
              </View>
              <Ionicons name="arrow-forward-circle" size={28} color={Colors.primary} />
            </TouchableOpacity>

            {/* JLPT Info */}
            <View style={styles.jlptCard}>
              <Text style={styles.jlptTitle}>Cấp độ JLPT</Text>
              {[
                { level: 'N5', desc: 'Cơ bản — Hiểu câu đơn giản', color: '#27AE60' },
                { level: 'N4', desc: 'Sơ cấp — Giao tiếp hàng ngày', color: '#2980B9' },
                { level: 'N3', desc: 'Trung cấp — Hiểu văn phong thông thường', color: '#8E44AD' },
                { level: 'N2', desc: 'Cao cấp — Làm việc được bằng tiếng Nhật', color: '#D35400' },
                { level: 'N1', desc: 'Thành thạo — Hiểu mọi tình huống', color: '#C0392B' },
              ].map((item) => (
                <View key={item.level} style={styles.jlptRow}>
                  <View style={[styles.jlptBadge, { backgroundColor: item.color }]}>
                    <Text style={styles.jlptLevel}>{item.level}</Text>
                  </View>
                  <Text style={styles.jlptDesc}>{item.desc}</Text>
                </View>
              ))}
            </View>
          </>
        )}

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    gap: 10,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerTitle: { fontSize: 24, fontWeight: '800', color: Colors.white },
  headerSub: { fontSize: 13, color: 'rgba(255,255,255,0.75)', marginTop: 4 },

  // Streak badge
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  streakFire: { fontSize: 22 },
  streakNum: { fontSize: 18, fontWeight: '800', color: Colors.white, lineHeight: 22 },
  streakLabel: { fontSize: 10, color: 'rgba(255,255,255,0.75)', fontWeight: '600' },

  // Quiz banner
  quizBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  quizBannerLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  quizBannerTitle: { fontSize: 14, fontWeight: '700', color: Colors.white },
  quizBannerSub: { fontSize: 11, color: 'rgba(255,255,255,0.7)', marginTop: 1 },

  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  searchInput: { flex: 1, fontSize: 14, color: Colors.white, padding: 0 },
  content: {
    flex: 1,
    backgroundColor: Colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -16,
    paddingTop: 16,
    paddingHorizontal: 16,
  },

  // Search results
  emptyBox: { alignItems: 'center', paddingVertical: 40, gap: 8 },
  emptyText: { fontSize: 15, fontWeight: '700', color: Colors.textSecondary },
  searchResultCount: {
    fontSize: 13, color: Colors.textMuted, fontWeight: '600', marginBottom: 10, marginTop: 4,
  },
  searchResultItem: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  searchResultTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  searchResultCatBadge: {
    backgroundColor: Colors.accent,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  searchResultCatText: { fontSize: 11, fontWeight: '700', color: Colors.primary },

  // Level pill
  levelPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  levelDot: { width: 7, height: 7, borderRadius: 4 },
  levelPillText: { fontSize: 11, fontWeight: '700' },

  // Word card
  wordCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 18,
    marginBottom: 8,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 5,
    borderWidth: 1,
    borderColor: Colors.primary + '20',
  },
  wordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  wotdBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#FEF9EC',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FAD7A0',
  },
  wotdText: { fontSize: 11, fontWeight: '700', color: '#D68910' },
  wordNav: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  navBtn: {
    width: 30, height: 30, borderRadius: 10,
    backgroundColor: Colors.accent, justifyContent: 'center', alignItems: 'center',
  },
  wordCount: {
    fontSize: 12, color: Colors.textMuted, fontWeight: '600', minWidth: 30, textAlign: 'center',
  },
  wordMain: { alignItems: 'center', marginBottom: 16 },
  wordJp: { fontSize: 44, fontWeight: '800', color: Colors.textPrimary, marginBottom: 4 },
  wordReading: { fontSize: 18, color: Colors.textSecondary, marginBottom: 4 },
  wordRomaji: { fontSize: 14, color: Colors.textMuted, fontStyle: 'italic', marginBottom: 10 },
  meaningBadge: {
    backgroundColor: Colors.accent, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20,
  },
  wordMeaning: { fontSize: 16, fontWeight: '700', color: Colors.primary },
  exampleBox: {
    backgroundColor: Colors.background, borderRadius: 12, padding: 12,
    marginBottom: 10, borderLeftWidth: 3, borderLeftColor: Colors.primary,
  },
  exampleLabel: {
    fontSize: 11, fontWeight: '700', color: Colors.primary,
    marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.5,
  },
  exampleJp: { fontSize: 14, fontWeight: '600', color: Colors.textPrimary, marginBottom: 2 },
  exampleRomaji: { fontSize: 12, color: Colors.textMuted, fontStyle: 'italic', marginBottom: 4 },
  exampleVn: { fontSize: 13, color: Colors.textSecondary },

  // Cultural note
  culturalBox: {
    backgroundColor: '#FEF9EC',
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
    borderLeftWidth: 3,
    borderLeftColor: '#E67E22',
  },
  culturalLabelRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 4 },
  culturalLabel: { fontSize: 11, fontWeight: '700', color: '#E67E22', textTransform: 'uppercase', letterSpacing: 0.5 },
  culturalNote: { fontSize: 13, color: '#7D5A00', lineHeight: 19 },

  wordActions: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  romajiToggle: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    paddingHorizontal: 12, paddingVertical: 7, borderRadius: 10, backgroundColor: Colors.accent,
  },
  romajiToggleText: { fontSize: 12, fontWeight: '600', color: Colors.primary },
  learnMoreBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: Colors.primary, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 12,
  },
  learnMoreText: { fontSize: 13, fontWeight: '700', color: Colors.white },

  // Section title
  sectionTitle: {
    fontSize: 17, fontWeight: '700', color: Colors.textPrimary, marginTop: 16, marginBottom: 12,
  },

  // Category card
  categoryCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginBottom: 10,
    overflow: 'hidden',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
  },
  categoryLeft: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 },
  categoryRight: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  categoryIcon: {
    width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center',
  },
  categoryTitleBlock: { flex: 1 },
  categoryTitle: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary },
  categorySubtitle: { fontSize: 11, color: Colors.textMuted, marginTop: 2, fontWeight: '500' },
  dialogueBadge: {
    width: 22, height: 22, borderRadius: 6,
    backgroundColor: Colors.accent,
    justifyContent: 'center', alignItems: 'center',
  },
  countBadge: {
    backgroundColor: Colors.accent, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10,
  },
  countText: { fontSize: 11, fontWeight: '700' },

  // Progress bar
  progressBarBg: {
    height: 3,
    backgroundColor: Colors.border,
    marginHorizontal: 14,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: { height: 3, borderRadius: 2 },

  // Tab row
  tabRow: {
    flexDirection: 'row',
    gap: 8,
    paddingTop: 12,
    paddingBottom: 4,
  },
  tabBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: Colors.accent,
  },
  tabBtnText: { fontSize: 12, fontWeight: '700', color: Colors.textMuted },
  tabBtnTextActive: { color: Colors.white },

  // Phrases
  phrasesList: { paddingHorizontal: 14, borderTopWidth: 1, borderTopColor: Colors.border },
  phraseItem: { paddingVertical: 12 },
  phraseBorder: { borderBottomWidth: 1, borderBottomColor: Colors.border },
  phraseRow: { flexDirection: 'row', alignItems: 'center' },
  levelIndicator: { justifyContent: 'center', paddingRight: 10, paddingTop: 2 },
  levelDotLarge: { width: 9, height: 9, borderRadius: 5 },
  phraseTexts: { flex: 1 },
  phraseBookmarkBtn: { padding: 4, marginLeft: 8 },
  phraseJp: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary, marginBottom: 2 },
  phraseRomaji: { fontSize: 12, color: Colors.textMuted, fontStyle: 'italic', marginBottom: 2 },
  phraseVn: { fontSize: 13, color: Colors.textSecondary, fontWeight: '500' },

  // Dialogue
  dialogueContainer: { paddingTop: 10, paddingBottom: 6, gap: 10 },
  situationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    alignSelf: 'center',
    backgroundColor: Colors.accent,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 6,
  },
  situationText: { fontSize: 12, fontWeight: '700' },
  dialogueLine: { gap: 4 },
  dialogueLineA: { alignItems: 'flex-start' },
  dialogueLineB: { alignItems: 'flex-end' },
  speakerTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginBottom: 2,
  },
  speakerTagText: { fontSize: 10, fontWeight: '800', color: Colors.white },
  dialogueBubble: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 10,
    maxWidth: '90%',
    gap: 2,
  },
  dialogueJp: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary },
  dialogueRomaji: { fontSize: 11, color: Colors.textMuted, fontStyle: 'italic' },
  dialogueVn: { fontSize: 12, color: Colors.textSecondary, fontWeight: '500' },

  // Action buttons
  categoryActions: {
    flexDirection: 'row',
    gap: 8,
    marginVertical: 12,
  },
  practiceBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 11,
    borderRadius: 12,
  },
  practiceBtnText: { fontSize: 13, fontWeight: '700', color: Colors.white },
  practiceBtnBadge: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 7,
  },
  practiceBtnBadgeText: { fontSize: 10, fontWeight: '800', color: Colors.white },
  quizBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 11,
    borderRadius: 12,
    borderWidth: 1.5,
    backgroundColor: Colors.white,
  },
  quizBtnText: { fontSize: 13, fontWeight: '700' },

  // Legend
  legendCard: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  legendTitle: { fontSize: 12, fontWeight: '700', color: Colors.textMuted, marginBottom: 10 },
  legendRow: { flexDirection: 'row', justifyContent: 'space-between' },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 10, height: 10, borderRadius: 5 },
  legendLabel: { fontSize: 11, fontWeight: '600', color: Colors.textSecondary },

  // AI card
  aiCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: Colors.primary + '30',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  aiLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  aiIconBg: {
    width: 46, height: 46, borderRadius: 13,
    backgroundColor: Colors.primary, justifyContent: 'center', alignItems: 'center',
  },
  aiTitle: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary },
  aiSub: { fontSize: 12, color: Colors.textSecondary, marginTop: 2 },

  // JLPT
  jlptCard: {
    backgroundColor: Colors.white, borderRadius: 16, padding: 16, marginBottom: 8,
    shadowColor: Colors.shadow, shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 8, elevation: 2,
  },
  jlptTitle: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary, marginBottom: 12 },
  jlptRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 8 },
  jlptBadge: { width: 40, height: 26, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  jlptLevel: { fontSize: 12, fontWeight: '800', color: Colors.white },
  jlptDesc: { fontSize: 13, color: Colors.textSecondary },
});
