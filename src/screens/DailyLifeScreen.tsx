import React, { useMemo, useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  TextInput,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../constants/colors';
import { DAILY_LIFE_TOPICS } from '../constants/content';
import { RootStackParamList } from '../navigation/AppNavigator';
import { loadBookmarks, type Bookmark } from '../utils/bookmarks';
import { loadRecentDailyLifeTopics } from '../utils/dailyLifeRecentTopics';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type FilterId = 'all' | 'move-in' | 'daily-routine' | 'health-safety';

const ICON_MAP: Record<string, keyof typeof Ionicons.glyphMap> = {
  home: 'home',
  flash: 'flash',
  trash: 'trash',
  train: 'train',
  timer: 'timer',
  storefront: 'storefront',
  wallet: 'wallet',
  basket: 'basket',
  cash: 'cash',
  medical: 'medical',
  'help-circle': 'help-circle',
  bulb: 'bulb',
  receipt: 'receipt',
  mail: 'mail',
  warning: 'warning',
};

const TOPIC_GROUPS = [
  {
    id: 'move-in' as const,
    title: 'Mới chuyển đến',
    description: 'Những việc nên nắm sớm để đỡ mất tiền và đỡ rối trong tháng đầu.',
    topicIds: ['apartment', 'utilities', 'trash', 'banking'],
  },
  {
    id: 'daily-routine' as const,
    title: 'Sinh hoạt hằng ngày',
    description: 'Đi tàu, đi chợ, nhận hàng, đọc giấy lương và các việc lặp lại mỗi tuần.',
    topicIds: [
      'transportation',
      'grocery',
      'tax',
      'post-office',
      'practical-tips',
      'time-money-saving-tips',
      'common-misunderstandings',
      'combini-supermarket-station-tips',
      'avoid-losing-money-checklist',
    ],
  },
  {
    id: 'health-safety' as const,
    title: 'Sức khỏe và an toàn',
    description: 'Những phần nên biết trước khi thật sự cần dùng đến.',
    topicIds: ['hospital', 'earthquake'],
  },
];

const FILTERS: { id: FilterId; label: string }[] = [
  { id: 'all', label: 'Tất cả' },
  { id: 'move-in', label: 'Chuyển nhà' },
  { id: 'daily-routine', label: 'Sinh hoạt' },
  { id: 'health-safety', label: 'Sức khỏe / an toàn' },
];

export default function DailyLifeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterId>('all');
  const [recentTopicIds, setRecentTopicIds] = useState<string[]>([]);
  const [savedTopicIds, setSavedTopicIds] = useState<string[]>([]);
  const [pinnedTopicIds, setPinnedTopicIds] = useState<string[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadRecentDailyLifeTopics().then((items) => {
        setRecentTopicIds(items.map((item) => item.topicId));
      });
      loadBookmarks().then((items: Bookmark[]) => {
        const dailyLifeItems = items.filter((item) => item.type === 'daily-life');
        setSavedTopicIds(dailyLifeItems.map((item) => item.id));
        setPinnedTopicIds(
          dailyLifeItems.filter((item) => !!item.pinnedAt).map((item) => item.id)
        );
      });
    }, [])
  );

  const normalizedSearch = search.trim().toLowerCase();

  const recentTopics = useMemo(
    () =>
      recentTopicIds
        .map((topicId) => DAILY_LIFE_TOPICS.find((topic) => topic.id === topicId))
        .filter(Boolean),
    [recentTopicIds]
  );

  const quickTopics = useMemo(
    () =>
      ['practical-tips', 'common-misunderstandings', 'avoid-losing-money-checklist', 'hospital']
        .map((topicId) => DAILY_LIFE_TOPICS.find((topic) => topic.id === topicId))
        .filter(Boolean),
    []
  );

  const savedTopics = useMemo(
    () =>
      savedTopicIds
        .map((topicId) => DAILY_LIFE_TOPICS.find((topic) => topic.id === topicId))
        .filter(Boolean),
    [savedTopicIds]
  );

  const pinnedTopics = useMemo(
    () =>
      pinnedTopicIds
        .map((topicId) => DAILY_LIFE_TOPICS.find((topic) => topic.id === topicId))
        .filter(Boolean),
    [pinnedTopicIds]
  );

  const visibleGroups = useMemo(() => {
    return TOPIC_GROUPS.map((group) => {
      const topics = DAILY_LIFE_TOPICS.filter((topic) => {
        if (!group.topicIds.includes(topic.id)) return false;
        if (activeFilter !== 'all' && activeFilter !== group.id) return false;

        if (!normalizedSearch) return true;

        const haystack = [
          topic.title,
          topic.titleJp,
          topic.description,
          ...(topic.sections?.map((section) => section.title) ?? []),
          ...(topic.sections?.flatMap((section) => section.items ?? []) ?? []),
        ]
          .join(' ')
          .toLowerCase();

        return haystack.includes(normalizedSearch);
      });

      return { ...group, topics };
    }).filter((group) => group.topics.length > 0);
  }, [activeFilter, normalizedSearch]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Cuộc sống hằng ngày</Text>
        <Text style={styles.headerSubtitle}>
          Nội dung thực tế để xử lý chuyện thuê nhà, đi lại, khám bệnh, nhận hàng và sinh hoạt ở Nhật.
        </Text>

        <View style={styles.searchBox}>
          <Ionicons name="search" size={17} color="rgba(255,255,255,0.78)" />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm: chuyển nhà, đi khám, nhận hàng..."
            placeholderTextColor="rgba(255,255,255,0.62)"
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 ? (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Ionicons name="close-circle" size={18} color="rgba(255,255,255,0.78)" />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.introCard}>
          <Ionicons name="information-circle-outline" size={18} color={Colors.primary} />
          <Text style={styles.introText}>
            Mỗi mục đều viết theo cách dễ làm theo: cần làm gì trước, lỗi nào hay gặp và mẹo nào đáng nhớ.
          </Text>
        </View>

        {recentTopics.length > 0 ? (
          <View style={styles.groupBlock}>
            <Text style={styles.groupTitle}>Đọc gần đây</Text>
            <Text style={styles.groupDesc}>Quay lại nhanh các mục bạn vừa mở.</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickRow}>
              {recentTopics.map((topic) => (
                <TouchableOpacity
                  key={`recent-${topic!.id}`}
                  style={styles.quickCard}
                  onPress={() => navigation.navigate('DailyLifeDetail', { topicId: topic!.id })}
                >
                  <View style={[styles.quickIcon, { backgroundColor: `${topic!.color}18` }]}>
                    <Ionicons
                      name={ICON_MAP[topic!.icon] || 'help-circle'}
                      size={18}
                      color={topic!.color}
                    />
                  </View>
                  <Text style={styles.quickTitle} numberOfLines={2}>
                    {topic!.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        ) : null}

        {pinnedTopics.length > 0 ? (
          <View style={styles.groupBlock}>
            <View style={styles.groupTitleRow}>
              <Text style={styles.groupTitle}>Đã ghim</Text>
              <Text style={styles.groupMeta}>{pinnedTopics.length} mục</Text>
            </View>
            <Text style={styles.groupDesc}>Những mục sinh hoạt bạn đang ưu tiên giữ lên đầu.</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickRow}>
              {pinnedTopics.map((topic) => (
                <TouchableOpacity
                  key={`pinned-${topic!.id}`}
                  style={styles.quickCard}
                  onPress={() => navigation.navigate('DailyLifeDetail', { topicId: topic!.id })}
                >
                  <View style={[styles.quickIcon, { backgroundColor: `${topic!.color}18` }]}>
                    <Ionicons
                      name={ICON_MAP[topic!.icon] || 'help-circle'}
                      size={18}
                      color={topic!.color}
                    />
                  </View>
                  <Text style={styles.quickTitle} numberOfLines={2}>
                    {topic!.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        ) : null}

        {savedTopics.length > 0 ? (
          <View style={styles.groupBlock}>
            <View style={styles.groupTitleRow}>
              <Text style={styles.groupTitle}>Đã lưu</Text>
              <Text style={styles.groupMeta}>{savedTopics.length} mục</Text>
            </View>
            <Text style={styles.groupDesc}>Các mục sinh hoạt bạn đã lưu để mở lại nhanh.</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickRow}>
              {savedTopics.slice(0, 8).map((topic) => (
                <TouchableOpacity
                  key={`saved-${topic!.id}`}
                  style={styles.quickCard}
                  onPress={() => navigation.navigate('DailyLifeDetail', { topicId: topic!.id })}
                >
                  <View style={[styles.quickIcon, { backgroundColor: `${topic!.color}18` }]}>
                    <Ionicons
                      name={ICON_MAP[topic!.icon] || 'help-circle'}
                      size={18}
                      color={topic!.color}
                    />
                  </View>
                  <Text style={styles.quickTitle} numberOfLines={2}>
                    {topic!.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        ) : null}

        <View style={styles.groupBlock}>
          <Text style={styles.groupTitle}>Vào nhanh các mục hay dùng</Text>
          <Text style={styles.groupDesc}>
            Mẹo thực tế, lỗi dễ hiểu nhầm và các mục hay cần khi gặp chuyện đột xuất.
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickRow}>
            {quickTopics.map((topic) => (
              <TouchableOpacity
                key={`quick-${topic!.id}`}
                style={styles.quickCard}
                onPress={() => navigation.navigate('DailyLifeDetail', { topicId: topic!.id })}
              >
                <View style={[styles.quickIcon, { backgroundColor: `${topic!.color}18` }]}>
                  <Ionicons
                    name={ICON_MAP[topic!.icon] || 'help-circle'}
                    size={18}
                    color={topic!.color}
                  />
                </View>
                <Text style={styles.quickTitle} numberOfLines={2}>
                  {topic!.title}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
        >
          {FILTERS.map((filter) => {
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

        {visibleGroups.length > 0 ? (
          visibleGroups.map((group) => (
            <View key={group.id} style={styles.groupBlock}>
              <Text style={styles.groupTitle}>{group.title}</Text>
              <Text style={styles.groupDesc}>{group.description}</Text>

              {group.topics.map((topic) => (
                <TouchableOpacity
                  key={topic.id}
                  style={styles.topicCard}
                  onPress={() => navigation.navigate('DailyLifeDetail', { topicId: topic.id })}
                >
                  <View style={[styles.topicIcon, { backgroundColor: `${topic.color}18` }]}>
                    <Ionicons
                      name={ICON_MAP[topic.icon] || 'help-circle'}
                      size={22}
                      color={topic.color}
                    />
                  </View>

                  <View style={styles.topicInfo}>
                    <Text style={styles.topicJp}>{topic.titleJp}</Text>
                    <Text style={styles.topicTitle}>{topic.title}</Text>
                    <Text style={styles.topicDesc} numberOfLines={2}>
                      {topic.description}
                    </Text>
                  </View>

                  <Ionicons name="chevron-forward" size={18} color={Colors.textMuted} />
                </TouchableOpacity>
              ))}
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={36} color={Colors.textMuted} />
            <Text style={styles.emptyTitle}>Không có mục phù hợp</Text>
            <Text style={styles.emptyText}>
              Thử từ khóa ngắn hơn hoặc đổi sang nhóm khác như `Chuyển nhà` hay `Sức khỏe`.
            </Text>
          </View>
        )}

        <View style={{ height: 28 + Math.max(insets.bottom, 12) }} />
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
    paddingBottom: 24,
  },
  headerTitle: { fontSize: 24, fontWeight: '800', color: Colors.white },
  headerSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
    lineHeight: 18,
  },
  searchBox: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.16)',
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
  introCard: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: Colors.accent,
    padding: 12,
    borderRadius: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: `${Colors.primary}28`,
  },
  introText: { flex: 1, fontSize: 12, color: Colors.textSecondary, lineHeight: 18 },
  filterRow: { gap: 8, paddingBottom: 4, marginBottom: 14 },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  filterChipText: { fontSize: 12, fontWeight: '600', color: Colors.textSecondary },
  filterChipTextActive: { color: Colors.white },
  groupBlock: { marginBottom: 18 },
  groupTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  groupTitle: { fontSize: 17, fontWeight: '800', color: Colors.textPrimary },
  groupMeta: { fontSize: 11, fontWeight: '700', color: Colors.textMuted },
  groupDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 4,
    marginBottom: 10,
    lineHeight: 18,
  },
  quickRow: { gap: 10, paddingRight: 12 },
  quickCard: {
    width: 148,
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 12,
  },
  quickIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  quickTitle: { fontSize: 13, fontWeight: '700', color: Colors.textPrimary, lineHeight: 18 },
  topicCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  topicIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topicInfo: { flex: 1 },
  topicJp: { fontSize: 11, color: Colors.textMuted, marginBottom: 3 },
  topicTitle: { fontSize: 14, fontWeight: '800', color: Colors.textPrimary, marginBottom: 3 },
  topicDesc: { fontSize: 12, color: Colors.textSecondary, lineHeight: 18 },
  emptyState: { alignItems: 'center', paddingVertical: 40, gap: 8 },
  emptyTitle: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary },
  emptyText: { fontSize: 13, color: Colors.textSecondary, textAlign: 'center', lineHeight: 18 },
});
