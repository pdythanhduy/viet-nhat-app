import React, { useMemo, useState } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../constants/colors';
import { DAILY_LIFE_TOPICS } from '../constants/content';
import { RootStackParamList } from '../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type FilterId = 'all' | 'move-in' | 'daily-routine' | 'health-safety';

const ICON_MAP: Record<string, keyof typeof Ionicons.glyphMap> = {
  home: 'home',
  trash: 'trash',
  train: 'train',
  basket: 'basket',
  cash: 'cash',
  medical: 'medical',
  receipt: 'receipt',
  flash: 'flash',
  warning: 'warning',
  mail: 'mail',
};

const TOPIC_GROUPS = [
  {
    id: 'move-in' as const,
    title: 'Mới chuyển đến',
    description: 'Những việc nền phải nắm sớm để sống ổn và đỡ mất tiền.',
    topicIds: ['apartment', 'utilities', 'trash', 'banking'],
  },
  {
    id: 'daily-routine' as const,
    title: 'Đi lại và sinh hoạt',
    description: 'Các việc bạn sẽ dùng gần như mỗi tuần: tàu xe, chợ búa, giấy tờ lương.',
    topicIds: ['transportation', 'grocery', 'tax', 'post-office'],
  },
  {
    id: 'health-safety' as const,
    title: 'Sức khỏe và an toàn',
    description: 'Phần nên đọc trước khi thực sự cần dùng đến.',
    topicIds: ['hospital', 'earthquake'],
  },
];

const FILTERS: {
  id: FilterId;
  label: string;
}[] = [
  { id: 'all', label: 'Tất cả' },
  { id: 'move-in', label: 'Chuyển nhà' },
  { id: 'daily-routine', label: 'Sinh hoạt' },
  { id: 'health-safety', label: 'Sức khỏe / an toàn' },
];

export default function DailyLifeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterId>('all');

  const normalizedSearch = search.trim().toLowerCase();

  const visibleGroups = useMemo(() => {
    return TOPIC_GROUPS.map((group) => {
      const topics = DAILY_LIFE_TOPICS.filter((topic) => {
        const inGroup = group.topicIds.includes(topic.id);
        if (!inGroup) return false;

        const matchesFilter = activeFilter === 'all' || activeFilter === group.id;
        if (!matchesFilter) return false;

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

  const hasResults = visibleGroups.length > 0;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Cuộc sống hằng ngày</Text>
        <Text style={styles.headerSub}>
          Nội dung thực tế để sống, đi lại, khám bệnh và xử lý việc thường ngày ở Nhật.
        </Text>

        <View style={styles.searchBox}>
          <Ionicons name="search" size={17} color="rgba(255,255,255,0.78)" />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm: chuyển nhà, đi khám, nhận hàng..."
            placeholderTextColor="rgba(255,255,255,0.65)"
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
            Mỗi mục được viết theo kiểu dễ làm theo: việc cần làm trước, lỗi hay gặp và mẹo
            thực tế. Bạn có thể lọc nhanh theo tình huống hoặc gõ từ khóa để vào đúng mục.
          </Text>
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

        {hasResults ? (
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
                  <View style={[styles.topicIcon, { backgroundColor: topic.color + '18' }]}>
                    <Ionicons
                      name={ICON_MAP[topic.icon] || 'help-circle'}
                      size={24}
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

        <TouchableOpacity
          style={styles.generalAiCard}
          onPress={() =>
            navigation.navigate('AIChat', {
              title: 'Cuộc sống ở Nhật',
              prefilledQuestion: search.trim(),
            })
          }
        >
          <Ionicons name="chatbubbles" size={24} color={Colors.primary} />
          <View style={styles.generalAiText}>
            <Text style={styles.generalAiTitle}>Có câu hỏi sinh hoạt cụ thể?</Text>
            <Text style={styles.generalAiSub}>
              Hỏi thẳng tình huống của bạn như chuyển nhà, đi khám, nhận hàng hay đi tàu.
            </Text>
          </View>
          <Ionicons name="arrow-forward-circle" size={26} color={Colors.primary} />
        </TouchableOpacity>

        <View style={styles.bottomPad} />
      </ScrollView>
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
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.white,
  },
  headerSub: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.78)',
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
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.white,
    padding: 0,
  },
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
    borderColor: Colors.primary + '28',
  },
  introText: {
    flex: 1,
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  filterRow: {
    gap: 8,
    paddingBottom: 4,
    marginBottom: 14,
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
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  filterChipTextActive: {
    color: Colors.white,
  },
  groupBlock: {
    marginBottom: 18,
  },
  groupTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  groupDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 18,
    marginBottom: 10,
  },
  topicCard: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 10,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  topicIcon: {
    width: 52,
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topicInfo: {
    flex: 1,
  },
  topicJp: {
    fontSize: 11,
    color: Colors.textMuted,
    marginBottom: 2,
  },
  topicTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 3,
  },
  topicDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 17,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 28,
    paddingHorizontal: 16,
    gap: 8,
    backgroundColor: Colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 18,
  },
  emptyTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  emptyText: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 18,
    textAlign: 'center',
  },
  generalAiCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1.5,
    borderColor: Colors.primary + '30',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  generalAiText: {
    flex: 1,
  },
  generalAiTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  generalAiSub: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
    lineHeight: 17,
  },
  bottomPad: {
    height: 24,
  },
});
