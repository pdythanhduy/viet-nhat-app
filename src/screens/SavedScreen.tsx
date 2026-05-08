import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Share,
  TextInput,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../constants/colors';
import { loadBookmarks, saveBookmarks, Bookmark, toggleBookmarkPin } from '../utils/bookmarks';
import { RootStackParamList, TabParamList } from '../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type SavedFilter = 'all' | 'guide' | 'daily-life' | 'phrase' | 'dialogue';
// Saved is a bottom-tab now (was a stack screen). Filter param still flows
// in via the nested-navigator pattern: navigation.navigate('MainTabs',
// { screen: 'Saved', params: { filter: 'guide' } }).
type RouteType = RouteProp<TabParamList, 'Saved'>;

export default function SavedScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteType>();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [activeFilter, setActiveFilter] = useState<SavedFilter>('all');
  const [search, setSearch] = useState('');

  useFocusEffect(
    useCallback(() => {
      loadBookmarks().then(setBookmarks);
    }, [])
  );

  React.useEffect(() => {
    if (route.params?.filter) {
      setActiveFilter(route.params.filter);
    }
  }, [route.params?.filter]);

  const removeBookmark = (id: string, type: string) => {
    Alert.alert('Xóa khỏi danh sách lưu?', undefined, [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Xóa',
        style: 'destructive',
        onPress: async () => {
          const updated = bookmarks.filter((b) => !(b.id === id && b.type === type));
          await saveBookmarks(updated);
          setBookmarks(updated);
        },
      },
    ]);
  };

  const handleTogglePin = async (id: string, type: Bookmark['type']) => {
    const nextPinned = await toggleBookmarkPin(id, type);
    const updated = await loadBookmarks();
    setBookmarks(updated);
    Alert.alert(nextPinned ? 'Đã ghim' : 'Đã bỏ ghim', nextPinned ? 'Mục này sẽ được ưu tiên lên đầu.' : 'Mục này không còn ghim nữa.');
  };

  const clearAll = () => {
    Alert.alert('Xóa tất cả?', 'Toàn bộ mục đã lưu sẽ bị xóa.', [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Xóa hết',
        style: 'destructive',
        onPress: async () => {
          await saveBookmarks([]);
          setBookmarks([]);
        },
      },
    ]);
  };

  const copyText = (title: string, lines: string[]) => {
    Clipboard.setStringAsync([title, ...lines].join('\n')).catch(() => {});
    Alert.alert('Đã sao chép', `Đã copy "${title}".`);
  };

  const shareText = async (title: string, lines: string[]) => {
    try {
      await Share.share({
        message: [title, ...lines].join('\n'),
      });
    } catch {
      Alert.alert('Lỗi', 'Không thể chia sẻ mục này lúc này.');
    }
  };

  const buildBookmarkLines = (item: Bookmark): string[] => {
    if (item.type === 'guide') {
      return [`[Thủ tục] ${item.title} (${item.titleJp})`, item.description, ''];
    }

    if (item.type === 'daily-life') {
      return [`[Cuộc sống] ${item.title} (${item.titleJp})`, item.description, ''];
    }

    if (item.type === 'phrase') {
      return [`[Tiếng Nhật] ${item.category}`, item.jp, item.romaji, item.vn, ''];
    }

    return [
      `[Hội thoại] ${item.category}`,
      item.situation,
      ...item.lines.flatMap((line) => [line.speakerLabel, line.jp, line.romaji, line.vn, '']),
    ];
  };

  const copyAllBookmarks = () => {
    copyText('Bộ note đã lưu', bookmarks.flatMap(buildBookmarkLines));
  };

  const shareAllBookmarks = () => {
    void shareText('Bộ note đã lưu', bookmarks.flatMap(buildBookmarkLines));
  };

  const normalizedSearch = search.trim().toLowerCase();

  const visibleBookmarks = bookmarks.filter((item) => {
    if (activeFilter !== 'all' && item.type !== activeFilter) return false;

    if (!normalizedSearch) return true;

    if (item.type === 'guide' || item.type === 'daily-life') {
      return [item.title, item.titleJp, item.description]
        .join(' ')
        .toLowerCase()
        .includes(normalizedSearch);
    }

    if (item.type === 'phrase') {
      return [item.category, item.jp, item.romaji, item.vn]
        .join(' ')
        .toLowerCase()
        .includes(normalizedSearch);
    }

    return [item.category, item.situation, ...item.lines.flatMap((line) => [line.speakerLabel, line.jp, line.romaji, line.vn])]
      .join(' ')
      .toLowerCase()
      .includes(normalizedSearch);
  });

  const pinnedBookmarks = visibleBookmarks.filter((b) => !!b.pinnedAt);
  const unpinnedBookmarks = visibleBookmarks.filter((b) => !b.pinnedAt);

  const guides = unpinnedBookmarks.filter((b) => b.type === 'guide');
  const dailyLifeTopics = unpinnedBookmarks.filter((b) => b.type === 'daily-life');
  const phrases = unpinnedBookmarks.filter((b) => b.type === 'phrase');
  const dialogues = unpinnedBookmarks.filter((b) => b.type === 'dialogue');

  const filters: { id: SavedFilter; label: string }[] = [
    { id: 'all', label: 'Tất cả' },
    { id: 'guide', label: 'Thủ tục' },
    { id: 'daily-life', label: 'Cuộc sống' },
    { id: 'phrase', label: 'Tiếng Nhật' },
    { id: 'dialogue', label: 'Hội thoại' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Đã lưu</Text>
        {bookmarks.length > 0 ? (
          <View style={styles.headerActions}>
            <TouchableOpacity onPress={copyAllBookmarks}>
              <Text style={styles.headerActionText}>Copy hết</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={shareAllBookmarks}>
              <Text style={styles.headerActionText}>Chia sẻ</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={clearAll}>
              <Text style={styles.clearBtn}>Xóa hết</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>

      {bookmarks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="bookmark-outline" size={56} color={Colors.textMuted} />
          <Text style={styles.emptyTitle}>Chưa có mục nào được lưu</Text>
          <Text style={styles.emptyDesc}>
            Nhấn biểu tượng bookmark trong màn thủ tục, cuộc sống hoặc tiếng Nhật để lưu lại.
          </Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={16} color={Colors.textMuted} />
            <TextInput
              style={styles.searchInput}
              placeholder="Tìm trong mục đã lưu..."
              placeholderTextColor={Colors.textMuted}
              value={search}
              onChangeText={setSearch}
            />
            {search.length > 0 ? (
              <TouchableOpacity onPress={() => setSearch('')}>
                <Ionicons name="close-circle" size={18} color={Colors.textMuted} />
              </TouchableOpacity>
            ) : null}
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterRow}
          >
            {filters.map((filter) => {
              const selected = activeFilter === filter.id;
              return (
                <TouchableOpacity
                  key={filter.id}
                  style={[styles.filterChip, selected && styles.filterChipActive]}
                  onPress={() => setActiveFilter(filter.id)}
                >
                  <Text style={[styles.filterChipText, selected && styles.filterChipTextActive]}>
                    {filter.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {visibleBookmarks.length === 0 ? (
            <View style={styles.emptyFilteredContainer}>
              <Ionicons name="search-outline" size={42} color={Colors.textMuted} />
              <Text style={styles.emptyTitle}>Không có kết quả phù hợp</Text>
              <Text style={styles.emptyDesc}>Thử đổi bộ lọc hoặc dùng từ khóa ngắn hơn.</Text>
            </View>
          ) : null}

          {pinnedBookmarks.length > 0 ? (
            <>
              <View style={styles.sectionHeader}>
                <Ionicons name="pin" size={16} color={Colors.primary} />
                <Text style={styles.sectionTitle}>Đã ghim ({pinnedBookmarks.length})</Text>
              </View>
              {pinnedBookmarks.map((item) => {
                const title =
                  item.type === 'guide' || item.type === 'daily-life'
                    ? item.title
                    : item.type === 'phrase'
                      ? item.vn
                      : item.situation;
                const subtitle =
                  item.type === 'guide' || item.type === 'daily-life'
                    ? item.description
                    : item.type === 'phrase'
                      ? `${item.jp} • ${item.romaji}`
                      : item.category;
                const color =
                  item.type === 'guide' || item.type === 'daily-life' ? item.color : Colors.primary;

                return (
                  <TouchableOpacity
                    key={`${item.type}-${item.id}-pinned`}
                    style={styles.guideCard}
                    onPress={() => {
                      if (item.type === 'guide') navigation.navigate('AdminDetail', { guideId: item.id });
                      else if (item.type === 'daily-life') navigation.navigate('DailyLifeDetail', { topicId: item.id });
                      else navigation.navigate('MainTabs', { screen: 'Japanese' });
                    }}
                  >
                    <View style={[styles.guideColorBar, { backgroundColor: color }]} />
                    <View style={styles.guideInfo}>
                      <Text style={styles.guideTitle}>{title}</Text>
                      <Text style={styles.guideDesc} numberOfLines={2}>{subtitle}</Text>
                    </View>
                    <View style={styles.cardActions}>
                      <TouchableOpacity
                        style={styles.iconActionBtn}
                        onPress={() => handleTogglePin(item.id, item.type)}
                      >
                        <Ionicons name="pin" size={18} color={color} />
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </>
          ) : null}

          {guides.length > 0 ? (
            <>
              <View style={styles.sectionHeader}>
                <Ionicons name="document-text" size={16} color={Colors.primary} />
                <Text style={styles.sectionTitle}>Thủ tục hành chính ({guides.length})</Text>
              </View>
              {guides.map((b) => (
                <TouchableOpacity
                  key={b.id}
                  style={styles.guideCard}
                  onPress={() => navigation.navigate('AdminDetail', { guideId: b.id })}
                >
                  <View style={[styles.guideColorBar, { backgroundColor: b.color }]} />
                  <View style={styles.guideInfo}>
                    <Text style={styles.guideTitleJp}>{b.titleJp}</Text>
                    <Text style={styles.guideTitle}>{b.title}</Text>
                    <Text style={styles.guideDesc} numberOfLines={2}>
                      {b.description}
                    </Text>
                  </View>
                  <View style={styles.cardActions}>
                    <TouchableOpacity
                      style={styles.iconActionBtn}
                      onPress={() => handleTogglePin(b.id, b.type)}
                    >
                      <Ionicons
                        name={b.pinnedAt ? 'pin' : 'pin-outline'}
                        size={18}
                        color={b.color}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.iconActionBtn}
                      onPress={() => void shareText(b.title, [`${b.titleJp}`, b.description])}
                    >
                      <Ionicons name="share-social-outline" size={18} color={b.color} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.iconActionBtn}
                      onPress={() => copyText(b.title, [`${b.titleJp}`, b.description])}
                    >
                      <Ionicons name="copy-outline" size={18} color={b.color} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.iconActionBtn}
                      onPress={() => removeBookmark(b.id, b.type)}
                    >
                      <Ionicons name="bookmark" size={20} color={b.color} />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </>
          ) : null}

          {dailyLifeTopics.length > 0 ? (
            <>
              <View style={styles.sectionHeader}>
                <Ionicons name="sunny" size={16} color={Colors.primary} />
                <Text style={styles.sectionTitle}>Cuộc sống hằng ngày ({dailyLifeTopics.length})</Text>
              </View>
              {dailyLifeTopics.map((b) => (
                <TouchableOpacity
                  key={b.id}
                  style={styles.guideCard}
                  onPress={() => navigation.navigate('DailyLifeDetail', { topicId: b.id })}
                >
                  <View style={[styles.guideColorBar, { backgroundColor: b.color }]} />
                  <View style={styles.guideInfo}>
                    <Text style={styles.guideTitleJp}>{b.titleJp}</Text>
                    <Text style={styles.guideTitle}>{b.title}</Text>
                    <Text style={styles.guideDesc} numberOfLines={2}>
                      {b.description}
                    </Text>
                  </View>
                  <View style={styles.cardActions}>
                    <TouchableOpacity
                      style={styles.iconActionBtn}
                      onPress={() => handleTogglePin(b.id, b.type)}
                    >
                      <Ionicons
                        name={b.pinnedAt ? 'pin' : 'pin-outline'}
                        size={18}
                        color={b.color}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.iconActionBtn}
                      onPress={() => void shareText(b.title, [`${b.titleJp}`, b.description])}
                    >
                      <Ionicons name="share-social-outline" size={18} color={b.color} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.iconActionBtn}
                      onPress={() => copyText(b.title, [`${b.titleJp}`, b.description])}
                    >
                      <Ionicons name="copy-outline" size={18} color={b.color} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.iconActionBtn}
                      onPress={() => removeBookmark(b.id, b.type)}
                    >
                      <Ionicons name="bookmark" size={20} color={b.color} />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </>
          ) : null}

          {phrases.length > 0 ? (
            <>
              <View style={styles.sectionHeader}>
                <Ionicons name="language" size={16} color={Colors.primary} />
                <Text style={styles.sectionTitle}>Cụm từ tiếng Nhật ({phrases.length})</Text>
              </View>
              {phrases.map((b) => (
                <View key={b.id} style={styles.phraseCard}>
                  <View style={styles.phraseCatBadge}>
                    <Text style={styles.phraseCatText}>{b.category}</Text>
                  </View>
                  <View style={styles.phraseBody}>
                    <Text style={styles.phraseJp}>{b.jp}</Text>
                    <Text style={styles.phraseRomaji}>{b.romaji}</Text>
                    <Text style={styles.phraseVn}>{b.vn}</Text>
                  </View>
                  <View style={styles.cardActions}>
                    <TouchableOpacity
                      style={styles.iconActionBtn}
                      onPress={() => handleTogglePin(b.id, b.type)}
                    >
                      <Ionicons
                        name={b.pinnedAt ? 'pin' : 'pin-outline'}
                        size={18}
                        color={Colors.primary}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.iconActionBtn}
                      onPress={() => void shareText(b.category, [b.jp, b.romaji, b.vn])}
                    >
                      <Ionicons name="share-social-outline" size={18} color={Colors.primary} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.iconActionBtn}
                      onPress={() => copyText(b.category, [b.jp, b.romaji, b.vn])}
                    >
                      <Ionicons name="copy-outline" size={18} color={Colors.primary} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.iconActionBtn}
                      onPress={() => removeBookmark(b.id, b.type)}
                    >
                      <Ionicons name="bookmark" size={20} color={Colors.primary} />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </>
          ) : null}

          {dialogues.length > 0 ? (
            <>
              <View style={styles.sectionHeader}>
                <Ionicons name="chatbubbles" size={16} color={Colors.primary} />
                <Text style={styles.sectionTitle}>Hội thoại đã lưu ({dialogues.length})</Text>
              </View>
              {dialogues.map((b) => (
                <View key={b.id} style={styles.dialogueCard}>
                  <View style={styles.phraseCatBadge}>
                    <Text style={styles.phraseCatText}>{b.category}</Text>
                  </View>
                  <View style={styles.phraseBody}>
                    <Text style={styles.dialogueSituation}>{b.situation}</Text>
                    {b.lines.slice(0, 2).map((line, index) => (
                      <View key={`${b.id}-${index}`} style={styles.dialoguePreviewLine}>
                        <Text style={styles.dialoguePreviewSpeaker}>{line.speakerLabel}</Text>
                        <Text style={styles.dialoguePreviewJp}>{line.jp}</Text>
                        <Text style={styles.dialoguePreviewVn}>{line.vn}</Text>
                      </View>
                    ))}
                  </View>
                  <View style={styles.cardActions}>
                    <TouchableOpacity
                      style={styles.iconActionBtn}
                      onPress={() => handleTogglePin(b.id, b.type)}
                    >
                      <Ionicons
                        name={b.pinnedAt ? 'pin' : 'pin-outline'}
                        size={18}
                        color={Colors.primary}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.iconActionBtn}
                      onPress={() =>
                        void shareText(
                          b.situation,
                          [
                            `Nhóm: ${b.category}`,
                            ...b.lines.flatMap((line) => [
                              line.speakerLabel,
                              line.jp,
                              line.romaji,
                              line.vn,
                              '',
                            ]),
                          ]
                        )
                      }
                    >
                      <Ionicons name="share-social-outline" size={18} color={Colors.primary} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.iconActionBtn}
                      onPress={() =>
                        copyText(
                          b.situation,
                          [
                            `Nhóm: ${b.category}`,
                            ...b.lines.flatMap((line) => [
                              line.speakerLabel,
                              line.jp,
                              line.romaji,
                              line.vn,
                              '',
                            ]),
                          ]
                        )
                      }
                    >
                      <Ionicons name="copy-outline" size={18} color={Colors.primary} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.iconActionBtn}
                      onPress={() => removeBookmark(b.id, b.type)}
                    >
                      <Ionicons name="bookmark" size={20} color={Colors.primary} />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </>
          ) : null}

          <View style={{ height: 32 }} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  backBtn: {
    padding: 2,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.white,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerActionText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.92)',
    fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold',
  },
  clearBtn: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '600', fontFamily: 'BeVietnamPro_600SemiBold',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    gap: 12,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  emptyDesc: {
    fontSize: 13,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 20,
  },
  content: {
    padding: 16,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.textPrimary,
    padding: 0,
  },
  filterRow: {
    gap: 8,
    paddingBottom: 4,
    marginBottom: 8,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textSecondary,
  },
  filterChipTextActive: {
    color: Colors.white,
  },
  emptyFilteredContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 28,
    gap: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textPrimary,
  },
  guideCard: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    overflow: 'hidden',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  guideColorBar: {
    width: 5,
    alignSelf: 'stretch',
  },
  guideInfo: {
    flex: 1,
    padding: 14,
  },
  cardActions: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    paddingRight: 8,
    gap: 4,
  },
  iconActionBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  guideTitleJp: {
    fontSize: 11,
    color: Colors.textMuted,
    marginBottom: 2,
  },
  guideTitle: {
    fontSize: 14,
    fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  guideDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 17,
  },
  phraseCard: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  phraseCatBadge: {
    position: 'absolute',
    top: 10,
    left: 14,
    backgroundColor: Colors.accent,
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  phraseCatText: {
    fontSize: 10,
    fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.primary,
  },
  phraseBody: {
    flex: 1,
    marginTop: 22,
  },
  phraseJp: {
    fontSize: 17,
    fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  phraseRomaji: {
    fontSize: 12,
    color: Colors.textMuted,
    fontStyle: 'italic',
    marginBottom: 2,
  },
  phraseVn: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  dialogueCard: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  dialogueSituation: {
    fontSize: 14,
    fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  dialoguePreviewLine: {
    marginBottom: 8,
  },
  dialoguePreviewSpeaker: {
    fontSize: 11,
    fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.primary,
    marginBottom: 2,
  },
  dialoguePreviewJp: {
    fontSize: 13,
    fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  dialoguePreviewVn: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 17,
  },
});
