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
import { Disclaimers } from '../constants/disclaimers';
import { ADMIN_CONTENT_META, ADMIN_GUIDES } from '../constants/content';
import { RootStackParamList } from '../navigation/AppNavigator';
import { formatLastUpdated, getSourceLabels } from '../utils/contentMetadata';
import type { AdminGuideCategory } from '../types/content';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type CategoryFilter = 'all' | AdminGuideCategory;

const CATEGORY_FILTERS: { id: CategoryFilter; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { id: 'all', label: 'Tất cả', icon: 'apps' },
  { id: 'immigration', label: 'Lưu trú', icon: 'card' },
  { id: 'visa', label: 'Visa', icon: 'albums' },
  { id: 'daily-law', label: 'Luật sống', icon: 'shield-checkmark' },
  { id: 'traffic', label: 'Giao thông', icon: 'bicycle' },
  { id: 'health', label: 'Y tế', icon: 'heart' },
  { id: 'money', label: 'Tiền', icon: 'cash' },
  { id: 'license', label: 'Bằng lái', icon: 'car' },
];

const VISA_QUICK_ACTIONS = [
  {
    id: 'live-with-family',
    title: 'Tôi muốn sống cùng gia đình ở Nhật',
    description: 'Đi thẳng tới hướng bảo lãnh 家族滞在 và COE cho vợ/chồng hoặc con.',
    icon: 'people',
    color: '#2E86C1',
    guideId: 'family-stay-invitation',
  },
  {
    id: 'visit-relatives',
    title: 'Tôi chỉ muốn mời người thân sang thăm',
    description: 'Mở guide visa thăm thân ngắn hạn và hồ sơ người mời.',
    icon: 'airplane',
    color: '#E67E22',
    guideId: 'short-stay-relative-visit',
  },
  {
    id: 'tourism-evisa',
    title: 'Tôi đang tìm hiểu du lịch / eVISA',
    description: 'Phân biệt tourism, short stay và eVISA hiện hành.',
    icon: 'globe-outline',
    color: '#8E44AD',
    guideId: 'visa-highlights-2026',
  },
  {
    id: 'unsure-visa',
    title: 'Tôi chưa biết mình thuộc diện nào',
    description: 'Mở bài tổng quan visa và tư cách lưu trú trước khi chuẩn bị hồ sơ.',
    icon: 'help-circle-outline',
    color: '#5C6B8A',
    guideId: 'visa-status-overview',
  },
  {
    id: 'parents-elderly',
    title: 'Tôi muốn đưa cha mẹ sang Nhật',
    description: 'Xem rõ giới hạn pháp lý, ngoại lệ hẹp và khi nào chỉ nên đi visa thăm thân.',
    icon: 'people-circle',
    color: '#6C7A99',
    guideId: 'parents-elderly-relatives',
  },
] as const;

export default function AdminScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');

  const filteredGuides = useMemo(() => {
    const q = search.toLowerCase();

    return ADMIN_GUIDES.filter((guide) => {
      const matchesCategory = activeCategory === 'all' || guide.category === activeCategory;
      const matchesSearch =
        !search.trim() ||
        guide.title.toLowerCase().includes(q) ||
        guide.titleJp.toLowerCase().includes(q) ||
        guide.description.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    }).sort((a, b) => Number(b.priority === 'high') - Number(a.priority === 'high'));
  }, [activeCategory, search]);

  const showVisaQuickSelector = !search.trim() && (activeCategory === 'all' || activeCategory === 'visa');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Thủ tục hành chính</Text>
        <Text style={styles.headerSub}>Hướng dẫn từng bước cho người Việt tại Nhật</Text>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={17} color="rgba(255,255,255,0.7)" />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm thủ tục..."
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
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersScroll}
          contentContainerStyle={styles.filtersContent}
        >
          {CATEGORY_FILTERS.map((filter) => {
            const active = activeCategory === filter.id;
            return (
              <TouchableOpacity
                key={filter.id}
                style={[styles.filterPill, active && styles.filterPillActive]}
                onPress={() => setActiveCategory(filter.id)}
              >
                <Ionicons
                  name={filter.icon}
                  size={14}
                  color={active ? Colors.white : Colors.textSecondary}
                />
                <Text style={[styles.filterText, active && styles.filterTextActive]}>
                  {filter.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {showVisaQuickSelector && (
          <View style={styles.quickSection}>
            <Text style={styles.quickSectionTitle}>Chọn nhanh theo mục đích</Text>
            <Text style={styles.quickSectionDesc}>
              Nếu bạn đang rối giữa bảo lãnh gia đình, thăm thân, du lịch hay eVISA,
              hãy vào đúng guide từ đây.
            </Text>
            <View style={styles.quickGrid}>
              {VISA_QUICK_ACTIONS.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.quickCard}
                  onPress={() => navigation.navigate('AdminDetail', { guideId: item.guideId })}
                >
                  <View style={[styles.quickIconBg, { backgroundColor: item.color + '18' }]}>
                    <Ionicons name={item.icon} size={20} color={item.color} />
                  </View>
                  <Text style={styles.quickTitle}>{item.title}</Text>
                  <Text style={styles.quickDesc}>{item.description}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        <Text style={styles.resultsCount}>{filteredGuides.length} nội dung</Text>

        {!search.trim() && (
          <View style={styles.infoCard}>
            <Ionicons name="information-circle" size={20} color={Colors.primary} />
            <Text style={styles.infoText}>
              {Disclaimers.legal}
              {'\n'}Cập nhật: {formatLastUpdated(ADMIN_CONTENT_META.lastUpdated)}. Nguồn:{' '}
              {getSourceLabels(ADMIN_CONTENT_META)}.
            </Text>
          </View>
        )}

        {filteredGuides.length === 0 && (
          <View style={styles.emptyBox}>
            <Ionicons name="search-outline" size={36} color={Colors.textMuted} />
            <Text style={styles.emptyText}>Không tìm thấy thủ tục nào</Text>
            <Text style={styles.emptySubText}>Thử từ khóa khác hoặc hỏi AI bên dưới</Text>
          </View>
        )}

        {filteredGuides.map((guide) => (
          <TouchableOpacity
            key={guide.id}
            style={styles.guideCard}
            onPress={() => navigation.navigate('AdminDetail', { guideId: guide.id })}
          >
            <View style={[styles.guideIconBg, { backgroundColor: guide.color + '18' }]}>
              <Ionicons name={guide.icon} size={26} color={guide.color} />
            </View>
            <View style={styles.guideInfo}>
              <Text style={styles.guideTitleJp}>{guide.titleJp}</Text>
              <Text style={styles.guideTitle}>{guide.title}</Text>
              <Text style={styles.guideDesc} numberOfLines={2}>
                {guide.description}
              </Text>
              <View style={styles.stepsInfo}>
                {guide.priority === 'high' && (
                  <View style={styles.priorityBadge}>
                    <Ionicons name="alert-circle" size={11} color={Colors.danger} />
                    <Text style={styles.priorityText}>Quan trọng</Text>
                  </View>
                )}
                <Ionicons name="list" size={13} color={Colors.textMuted} />
                <Text style={styles.stepsText}>{guide.steps.length} bước thực hiện</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={styles.aiCard}
          onPress={() =>
            navigation.navigate('AIChat', {
              title: 'Hỏi về thủ tục hành chính',
              prefilledQuestion: 'Tôi cần hỏi về thủ tục hành chính tại Nhật Bản. ',
            })
          }
        >
          <Ionicons name="sparkles" size={22} color={Colors.white} />
          <View style={styles.aiTextContainer}>
            <Text style={styles.aiTitle}>Có câu hỏi khác?</Text>
            <Text style={styles.aiSub}>Hỏi trợ lý AI ngay</Text>
          </View>
          <Ionicons name="arrow-forward" size={18} color={Colors.white} />
        </TouchableOpacity>

        <View style={{ height: 24 }} />
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
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.white,
  },
  headerSub: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 4,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 12,
    gap: 8,
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
  },
  filtersScroll: {
    marginBottom: 10,
  },
  filtersContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  filterPillActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  filterTextActive: {
    color: Colors.white,
  },
  quickSection: {
    marginHorizontal: 16,
    marginBottom: 12,
  },
  quickSectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  quickSectionDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 18,
    marginBottom: 12,
  },
  quickGrid: {
    gap: 10,
  },
  quickCard: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  quickIconBg: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  quickTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  quickDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  resultsCount: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textMuted,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  infoCard: {
    backgroundColor: Colors.accent,
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    gap: 10,
    marginHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.primary + '30',
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  emptyBox: {
    alignItems: 'center',
    paddingVertical: 40,
    gap: 8,
  },
  emptyText: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  emptySubText: {
    fontSize: 13,
    color: Colors.textMuted,
  },
  guideCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginHorizontal: 16,
    marginBottom: 12,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  guideIconBg: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  guideInfo: {
    flex: 1,
  },
  guideTitleJp: {
    fontSize: 11,
    color: Colors.textMuted,
    marginBottom: 2,
  },
  guideTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  guideDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 17,
    marginBottom: 6,
  },
  stepsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flexWrap: 'wrap',
  },
  priorityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: Colors.dangerLight,
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 4,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.danger,
  },
  stepsText: {
    fontSize: 11,
    color: Colors.textMuted,
  },
  aiCard: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginHorizontal: 16,
    marginTop: 4,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  aiTextContainer: {
    flex: 1,
  },
  aiTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.white,
  },
  aiSub: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 2,
  },
});
