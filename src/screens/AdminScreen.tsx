import React, { useMemo, useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../constants/colors';
import { Disclaimers } from '../constants/disclaimers';
import { ADMIN_CONTENT_META, ADMIN_GUIDES } from '../constants/content';
import { RootStackParamList } from '../navigation/AppNavigator';
import { formatLastUpdated, getSourceLabels } from '../utils/contentMetadata';
import { adminGuideMatchesSearch, getAdminGuideSearchMatches } from '../utils/adminGuideSearch';
import {
  ADMIN_EMPTY_SEARCH_SUGGESTION_CHIPS,
  ADMIN_QUICK_SEARCH_CHIPS,
  type AdminQuickSearchChip,
} from '../utils/adminQuickSearch';
import { loadAllGuideChecklistProgress } from '../utils/guideChecklistProgress';
import { loadAllGuideStepProgress } from '../utils/guideStepProgress';
import {
  getGuideStepProgressState,
  matchesGuideStatusFilter,
  type GuideStatusFilter,
} from '../utils/guideStatus';
import { loadBookmarks, type Bookmark } from '../utils/bookmarks';
import {
  buildAdminGuideExportHtml,
  getAdminGuideExportFileName,
} from '../utils/adminGuideExport';
import { saveAndShareAdminGuideHtml } from '../utils/adminGuideExportFile';
import type { AdminGuide, AdminGuideCategory } from '../types/content';

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

const STATUS_FILTERS: { id: GuideStatusFilter; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { id: 'all', label: 'Tất cả', icon: 'layers-outline' },
  { id: 'in-progress', label: 'Đang làm', icon: 'time-outline' },
  { id: 'completed', label: 'Đã xong', icon: 'checkmark-done-outline' },
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
    guideId: 'japan-policy-2026-action-by-user-type',
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

const FEATURED_GUIDE_ORDER = ['japan-policy-2026-action-by-user-type'] as const;
const FEATURED_GUIDE_INDEX: ReadonlyMap<string, number> = new Map(
  FEATURED_GUIDE_ORDER.map((id, index) => [id, index])
);

export default function AdminScreen() {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [activeStatus, setActiveStatus] = useState<GuideStatusFilter>('all');
  const [inProgressGuideIds, setInProgressGuideIds] = useState<string[]>([]);
  const [readyGuideIds, setReadyGuideIds] = useState<string[]>([]);
  const [pinnedGuideIds, setPinnedGuideIds] = useState<string[]>([]);
  const [stepProgressMap, setStepProgressMap] = useState<Record<string, number>>({});
  const [exportingGuides, setExportingGuides] = useState(false);

  const handleQuickSearchPress = useCallback((chip: AdminQuickSearchChip) => {
    setSearch(chip.query);
    setActiveCategory(chip.category);
    setActiveStatus('all');
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadAllGuideChecklistProgress().then((progressMap) => {
        const inProgress = ADMIN_GUIDES.filter((guide) => {
          const total = guide.documentsChecklist?.length ?? 0;
          const checked = (progressMap[guide.id] ?? []).length;
          return total > 0 && checked > 0 && checked < total;
        }).map((guide) => guide.id);

        const ready = ADMIN_GUIDES.filter((guide) => {
          const total = guide.documentsChecklist?.length ?? 0;
          const checked = (progressMap[guide.id] ?? []).length;
          return total > 0 && checked >= total;
        }).map((guide) => guide.id);

        setInProgressGuideIds(inProgress);
        setReadyGuideIds(ready);
      });

      loadAllGuideStepProgress().then((raw) => {
        const counts: Record<string, number> = {};
        for (const [id, indices] of Object.entries(raw)) {
          counts[id] = indices.length;
        }
        setStepProgressMap(counts);
      });

      loadBookmarks().then((items: Bookmark[]) => {
        setPinnedGuideIds(
          items
            .filter((item) => item.type === 'guide' && !!item.pinnedAt)
            .map((item) => item.id)
        );
      });
    }, [])
  );

  const filteredGuides = useMemo(() => {
    return ADMIN_GUIDES.filter((guide) => {
      const matchesCategory = activeCategory === 'all' || guide.category === activeCategory;
      const completedStepCount = stepProgressMap[guide.id] ?? 0;
      const totalSteps = guide.steps.length;
      const matchesStatus = matchesGuideStatusFilter(totalSteps, completedStepCount, activeStatus);
      const matchesSearch = adminGuideMatchesSearch(guide, search);

      return matchesCategory && matchesStatus && matchesSearch;
    }).sort((a, b) => {
      const featuredA = FEATURED_GUIDE_INDEX.get(a.id);
      const featuredB = FEATURED_GUIDE_INDEX.get(b.id);

      if (featuredA !== undefined || featuredB !== undefined) {
        if (featuredA === undefined) return 1;
        if (featuredB === undefined) return -1;
        return featuredA - featuredB;
      }

      return Number(b.priority === 'high') - Number(a.priority === 'high');
    });
  }, [activeCategory, activeStatus, search, stepProgressMap]);

  const exportGuides = useCallback(
    async (guides: readonly AdminGuide[], scope: 'all' | 'filtered') => {
      if (exportingGuides) return;

      if (guides.length === 0) {
        Alert.alert('Không có nội dung', 'Danh sách hiện tại không có thủ tục nào để tải.');
        return;
      }

      setExportingGuides(true);
      try {
        const html = buildAdminGuideExportHtml({
          guides,
          title:
            scope === 'all'
              ? 'Viet-Nhat App - Tất cả thủ tục hành chính'
              : 'Viet-Nhat App - Danh sách thủ tục đã lọc',
          scopeLabel: scope === 'all' ? 'Tất cả thủ tục hành chính' : 'Danh sách đang hiển thị',
        });
        const fileName = getAdminGuideExportFileName({ scope });
        await saveAndShareAdminGuideHtml(fileName, html);
      } catch {
        Alert.alert('Không thể tạo file', 'Vui lòng thử lại sau hoặc kiểm tra quyền lưu/chia sẻ file.');
      } finally {
        setExportingGuides(false);
      }
    },
    [exportingGuides]
  );

  const showVisaQuickSelector =
    !search.trim() && activeStatus === 'all' && (activeCategory === 'all' || activeCategory === 'visa');
  const showQuickSearchChips = !search.trim() && activeStatus === 'all';
  const inProgressGuides = ADMIN_GUIDES.filter((guide) => inProgressGuideIds.includes(guide.id));
  const readyGuides = ADMIN_GUIDES.filter((guide) => readyGuideIds.includes(guide.id));
  const pinnedGuides = ADMIN_GUIDES.filter((guide) => pinnedGuideIds.includes(guide.id));
  const inProgressStepGuides = ADMIN_GUIDES.filter((guide) => {
    return getGuideStepProgressState(guide.steps.length, stepProgressMap[guide.id]).isInProgress;
  });
  const completedStepGuides = ADMIN_GUIDES.filter((guide) => {
    return getGuideStepProgressState(guide.steps.length, stepProgressMap[guide.id]).isCompleted;
  });

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

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.statusFiltersScroll}
          contentContainerStyle={styles.filtersContent}
        >
          {STATUS_FILTERS.map((filter) => {
            const active = activeStatus === filter.id;
            return (
              <TouchableOpacity
                key={filter.id}
                style={[styles.filterPill, active && styles.statusFilterPillActive]}
                onPress={() => setActiveStatus(filter.id)}
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

        <View style={styles.exportPanel}>
          <View style={styles.exportPanelText}>
            <Text style={styles.exportPanelTitle}>Tải file thủ tục</Text>
            <Text style={styles.exportPanelDesc}>
              File HTML để xem offline, không nhúng form cũ; dùng link chính thức để tải mẫu hiện hành.
            </Text>
          </View>
          <View style={styles.exportActions}>
            <TouchableOpacity
              style={[styles.exportButton, exportingGuides && styles.exportButtonDisabled]}
              onPress={() => exportGuides(ADMIN_GUIDES, 'all')}
              disabled={exportingGuides}
              activeOpacity={0.82}
            >
              <Ionicons name="download-outline" size={15} color={Colors.white} />
              <Text style={styles.exportButtonText}>{exportingGuides ? 'Đang tạo' : 'Tất cả'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.exportButtonSecondary, exportingGuides && styles.exportButtonDisabled]}
              onPress={() => exportGuides(filteredGuides, 'filtered')}
              disabled={exportingGuides}
              activeOpacity={0.82}
            >
              <Ionicons name="list-outline" size={15} color={Colors.primary} />
              <Text style={styles.exportButtonSecondaryText}>Danh sách này</Text>
            </TouchableOpacity>
          </View>
        </View>

        {showQuickSearchChips && (
          <View style={styles.quickSearchSection}>
            <Text style={styles.quickSearchTitle}>Tìm nhanh</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.quickSearchContent}
            >
              {ADMIN_QUICK_SEARCH_CHIPS.map((chip) => (
                <TouchableOpacity
                  key={chip.id}
                  style={styles.quickSearchChip}
                  onPress={() => handleQuickSearchPress(chip)}
                  activeOpacity={0.82}
                >
                  <View style={[styles.quickSearchIconBg, { backgroundColor: `${chip.color}18` }]}>
                    <Ionicons name={chip.icon} size={14} color={chip.color} />
                  </View>
                  <Text style={styles.quickSearchText} numberOfLines={1}>
                    {chip.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

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

        {!search.trim() && activeStatus === 'all' && (
          <>
            {inProgressStepGuides.length > 0 && (
              <View style={styles.statusSection}>
                <View style={styles.statusSectionHeader}>
                  <Text style={styles.statusSectionTitle}>Đang thực hiện thủ tục</Text>
                  <Text style={styles.statusSectionMeta}>{inProgressStepGuides.length} mục</Text>
                </View>
                {inProgressStepGuides.slice(0, 3).map((guide) => (
                  <TouchableOpacity
                    key={`step-progress-${guide.id}`}
                    style={styles.statusCard}
                    onPress={() => navigation.navigate('AdminDetail', { guideId: guide.id })}
                  >
                    <View style={[styles.statusIconBg, { backgroundColor: `${guide.color}18` }]}>
                      <Ionicons name="navigate-outline" size={18} color={guide.color} />
                    </View>
                    <View style={styles.statusInfo}>
                      <Text style={styles.statusTitle}>{guide.title}</Text>
                      <Text style={styles.statusDesc}>
                        {stepProgressMap[guide.id]}/{guide.steps.length} bước đã hoàn thành.
                      </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {completedStepGuides.length > 0 && (
              <View style={styles.statusSection}>
                <View style={styles.statusSectionHeader}>
                  <Text style={styles.statusSectionTitle}>Đã hoàn thành thủ tục</Text>
                  <Text style={styles.statusSectionMeta}>{completedStepGuides.length} mục</Text>
                </View>
                {completedStepGuides.slice(0, 3).map((guide) => (
                  <TouchableOpacity
                    key={`step-done-${guide.id}`}
                    style={styles.statusCard}
                    onPress={() => navigation.navigate('AdminDetail', { guideId: guide.id })}
                  >
                    <View style={[styles.statusIconBg, { backgroundColor: Colors.successLight }]}>
                      <Ionicons name="checkmark-circle-outline" size={18} color={Colors.success} />
                    </View>
                    <View style={styles.statusInfo}>
                      <Text style={styles.statusTitle}>{guide.title}</Text>
                      <Text style={styles.statusDesc}>
                        Đã hoàn thành cả {guide.steps.length} bước thực hiện.
                      </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {inProgressGuides.length > 0 && (
              <View style={styles.statusSection}>
                <View style={styles.statusSectionHeader}>
                  <Text style={styles.statusSectionTitle}>Đang làm dở</Text>
                  <Text style={styles.statusSectionMeta}>{inProgressGuides.length} mục</Text>
                </View>
                {inProgressGuides.slice(0, 3).map((guide) => (
                  <TouchableOpacity
                    key={`progress-${guide.id}`}
                    style={styles.statusCard}
                    onPress={() => navigation.navigate('AdminDetail', { guideId: guide.id })}
                  >
                    <View style={[styles.statusIconBg, { backgroundColor: `${guide.color}18` }]}>
                      <Ionicons name="time-outline" size={18} color={guide.color} />
                    </View>
                    <View style={styles.statusInfo}>
                      <Text style={styles.statusTitle}>{guide.title}</Text>
                      <Text style={styles.statusDesc}>Bạn đã bắt đầu checklist giấy tờ cho mục này.</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {readyGuides.length > 0 && (
              <View style={styles.statusSection}>
                <View style={styles.statusSectionHeader}>
                  <Text style={styles.statusSectionTitle}>Đã chuẩn bị đủ giấy tờ</Text>
                  <Text style={styles.statusSectionMeta}>{readyGuides.length} mục</Text>
                </View>
                {readyGuides.slice(0, 3).map((guide) => (
                  <TouchableOpacity
                    key={`ready-${guide.id}`}
                    style={styles.statusCard}
                    onPress={() => navigation.navigate('AdminDetail', { guideId: guide.id })}
                  >
                    <View style={[styles.statusIconBg, { backgroundColor: `${guide.color}18` }]}>
                      <Ionicons name="checkmark-done-outline" size={18} color={guide.color} />
                    </View>
                    <View style={styles.statusInfo}>
                      <Text style={styles.statusTitle}>{guide.title}</Text>
                      <Text style={styles.statusDesc}>Checklist hiện tại của guide này đã đủ 100%.</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {pinnedGuides.length > 0 && (
              <View style={styles.statusSection}>
                <View style={styles.statusSectionHeader}>
                  <Text style={styles.statusSectionTitle}>Đã ghim</Text>
                  <Text style={styles.statusSectionMeta}>{pinnedGuides.length} mục</Text>
                </View>
                {pinnedGuides.slice(0, 3).map((guide) => (
                  <TouchableOpacity
                    key={`pinned-${guide.id}`}
                    style={styles.statusCard}
                    onPress={() => navigation.navigate('AdminDetail', { guideId: guide.id })}
                  >
                    <View style={[styles.statusIconBg, { backgroundColor: `${guide.color}18` }]}>
                      <Ionicons name="pin" size={18} color={guide.color} />
                    </View>
                    <View style={styles.statusInfo}>
                      <Text style={styles.statusTitle}>{guide.title}</Text>
                      <Text style={styles.statusDesc}>Mục này đang được ưu tiên giữ ở đầu danh sách lưu.</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </>
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
            <Text style={styles.emptySubText}>Thử từ khóa khác hoặc chọn gợi ý bên dưới</Text>
            <View style={styles.emptySuggestionList}>
              {ADMIN_EMPTY_SEARCH_SUGGESTION_CHIPS.map((chip) => (
                <TouchableOpacity
                  key={chip.id}
                  style={styles.emptySuggestionChip}
                  onPress={() => handleQuickSearchPress(chip)}
                  activeOpacity={0.82}
                >
                  <View style={[styles.quickSearchIconBg, { backgroundColor: `${chip.color}18` }]}>
                    <Ionicons name={chip.icon} size={14} color={chip.color} />
                  </View>
                  <Text style={styles.emptySuggestionText} numberOfLines={1}>
                    {chip.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {filteredGuides.map((guide) => {
          const searchMatches = getAdminGuideSearchMatches(guide, search);

          return (
            <TouchableOpacity
              key={guide.id}
              style={styles.guideCard}
              onPress={() => navigation.navigate('AdminDetail', { guideId: guide.id })}
            >
              {guide.heroImage ? (
                <Image source={guide.heroImage} style={styles.guideCardThumb} resizeMode="cover" />
              ) : (
                <View style={[styles.guideIconBg, { backgroundColor: guide.color + '18' }]}>
                  <Ionicons name={guide.icon} size={26} color={guide.color} />
                </View>
              )}
              <View style={styles.guideInfo}>
                <Text style={styles.guideTitleJp}>{guide.titleJp}</Text>
                <Text style={styles.guideTitle}>{guide.title}</Text>
                <Text style={styles.guideDesc} numberOfLines={2}>
                  {guide.description}
                </Text>
                {searchMatches.length > 0 && (
                  <View style={styles.searchMatchRow}>
                    <Ionicons name="pricetag-outline" size={12} color={Colors.primary} />
                    <Text style={styles.searchMatchText} numberOfLines={1}>
                      Khớp: {searchMatches.join(' / ')}
                    </Text>
                  </View>
                )}
                <View style={styles.stepsInfo}>
                {guide.priority === 'high' && (
                  <View style={styles.priorityBadge}>
                    <Ionicons name="alert-circle" size={11} color={Colors.danger} />
                    <Text style={styles.priorityText}>Quan trọng</Text>
                  </View>
                )}
                {(stepProgressMap[guide.id] ?? 0) > 0 && (
                  <View style={styles.stepProgressPill}>
                    <Ionicons name="checkmark-circle" size={11} color={Colors.success} />
                    <Text style={styles.stepProgressPillText}>
                      {stepProgressMap[guide.id]}/{guide.steps.length} bước
                    </Text>
                  </View>
                )}
                <Ionicons name="list" size={13} color={Colors.textMuted} />
                <Text style={styles.stepsText}>{guide.steps.length} bước thực hiện</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
          </TouchableOpacity>
          );
        })}

        <View style={{ height: 24 + Math.max(insets.bottom, 12) }} />
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
    fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold',
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
    marginBottom: 8,
  },
  statusFiltersScroll: {
    marginBottom: 12,
  },
  exportPanel: {
    marginHorizontal: 16,
    marginBottom: 14,
    padding: 12,
    borderRadius: 14,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  exportPanelText: {
    marginBottom: 10,
  },
  exportPanelTitle: {
    fontSize: 13,
    fontWeight: '800',
    fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.textPrimary,
    marginBottom: 3,
  },
  exportPanelDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 17,
  },
  exportActions: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  exportButton: {
    minHeight: 36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: Colors.primary,
  },
  exportButtonSecondary: {
    minHeight: 36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: Colors.accent,
    borderWidth: 1,
    borderColor: Colors.primary + '30',
  },
  exportButtonDisabled: {
    opacity: 0.58,
  },
  exportButtonText: {
    fontSize: 12,
    fontWeight: '800',
    fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.white,
  },
  exportButtonSecondaryText: {
    fontSize: 12,
    fontWeight: '800',
    fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.primary,
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
  statusFilterPillActive: {
    backgroundColor: Colors.success,
    borderColor: Colors.success,
  },
  filterText: {
    fontSize: 12,
    fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textSecondary,
  },
  filterTextActive: {
    color: Colors.white,
  },
  quickSection: {
    marginHorizontal: 16,
    marginBottom: 12,
  },
  quickSearchSection: {
    marginBottom: 12,
  },
  quickSearchTitle: {
    fontSize: 13,
    fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.textPrimary,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  quickSearchContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  quickSearchChip: {
    minHeight: 38,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  quickSearchIconBg: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickSearchText: {
    fontSize: 12,
    fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.textPrimary,
  },
  quickSectionTitle: {
    fontSize: 17,
    fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold',
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
  statusSection: {
    marginHorizontal: 16,
    marginBottom: 12,
  },
  statusSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  statusSectionTitle: {
    fontSize: 16,
    fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.textPrimary,
  },
  statusSectionMeta: {
    fontSize: 11,
    fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textMuted,
  },
  statusCard: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 8,
  },
  statusIconBg: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusInfo: {
    flex: 1,
  },
  statusTitle: {
    fontSize: 13,
    fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.textPrimary,
    marginBottom: 3,
  },
  statusDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 17,
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
    fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold',
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
    fontWeight: '600', fontFamily: 'BeVietnamPro_600SemiBold',
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
    fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textSecondary,
  },
  emptySubText: {
    fontSize: 13,
    color: Colors.textMuted,
    textAlign: 'center',
    paddingHorizontal: 24,
  },
  emptySuggestionList: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 16,
    marginTop: 8,
  },
  emptySuggestionChip: {
    minHeight: 38,
    maxWidth: '46%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  emptySuggestionText: {
    flexShrink: 1,
    fontSize: 12,
    fontWeight: '800',
    fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.textPrimary,
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
  guideCardThumb: {
    width: 72,
    height: 56,
    borderRadius: 14,
    backgroundColor: Colors.border,
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
    fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  guideDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 17,
    marginBottom: 6,
  },
  searchMatchRow: {
    alignSelf: 'flex-start',
    maxWidth: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.accent,
    borderRadius: 8,
    paddingHorizontal: 7,
    paddingVertical: 3,
    marginBottom: 7,
  },
  searchMatchText: {
    flexShrink: 1,
    fontSize: 11,
    fontWeight: '800',
    fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.primary,
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
    fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.danger,
  },
  stepsText: {
    fontSize: 11,
    color: Colors.textMuted,
  },
  stepProgressPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: Colors.successLight,
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 4,
  },
  stepProgressPillText: {
    fontSize: 10,
    fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.success,
  },
});
