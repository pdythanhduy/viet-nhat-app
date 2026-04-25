import React, { useCallback, useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Linking,
  Alert,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../constants/colors';
import {
  CURRENT_LABOR_UPDATES,
  JOB_PLATFORMS,
  JOBS_CONTENT_META,
  WORKER_RIGHTS,
  WORKER_TYPE_GUIDES,
} from '../constants/content';
import { RootStackParamList } from '../navigation/AppNavigator';
import type { EligibleWorkerType } from '../types/content';
import { formatLastUpdated } from '../utils/contentMetadata';
import {
  LaborResourceDefinition,
  LaborResourceId,
  LaborResourceState,
  loadLaborResourceStates,
  markLaborResourceViewed,
  toggleLaborResourcePinned,
  toggleLaborResourceSaved,
} from '../utils/laborResources';

 type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

function openUrl(url: string) {
  Linking.openURL(url).catch(() =>
    Alert.alert('Không thể mở link', 'Vui lòng kiểm tra kết nối mạng rồi thử lại.')
  );
}

const LABOR_RESOURCES: Array<
  LaborResourceDefinition & {
    icon: keyof typeof Ionicons.glyphMap;
    action: 'guide' | 'help' | 'official';
  }
> = [
  {
    id: 'labor-guide',
    title: 'Sắp ký hợp đồng',
    description:
      'Mở checklist đọc hợp đồng, dấu hiệu công ty rủi ro và các câu nên hỏi lại trước khi ký.',
    icon: 'document-text-outline',
    color: '#185FA5',
    action: 'guide',
  },
  {
    id: 'labor-help',
    title: 'Đang có vấn đề với công ty',
    description:
      'Đi thẳng vào các tình huống nợ lương, ép OT, giữ giấy tờ hoặc cản trở nghỉ việc.',
    icon: 'warning-outline',
    color: '#E67E22',
    action: 'help',
  },
  {
    id: 'official-law',
    title: 'Muốn đối chiếu luật chính thức',
    description:
      'Mở nguồn của MHLW để kiểm tra lại lương, giờ làm, phép và nghĩa vụ của công ty.',
    icon: 'shield-checkmark-outline',
    color: '#27AE60',
    action: 'official',
  },
];

function sortByRecent<T extends { timestamp?: string }>(items: T[]) {
  return [...items].sort((a, b) => {
    const aTime = a.timestamp ? new Date(a.timestamp).getTime() : 0;
    const bTime = b.timestamp ? new Date(b.timestamp).getTime() : 0;
    return bTime - aTime;
  });
}

export default function JobsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const [activeWorkerType, setActiveWorkerType] = useState<EligibleWorkerType>('student');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(
    JOB_PLATFORMS[0]?.category ?? null
  );
  const [resourceStates, setResourceStates] = useState<LaborResourceState[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadLaborResourceStates().then(setResourceStates);
    }, [])
  );

  const activeGuide =
    WORKER_TYPE_GUIDES.find((guide) => guide.id === activeWorkerType) ?? WORKER_TYPE_GUIDES[0];

  const resourcesWithState = useMemo(
    () =>
      LABOR_RESOURCES.map((resource) => {
        const state = resourceStates.find((item) => item.id === resource.id);
        return {
          ...resource,
          savedAt: state?.savedAt,
          pinnedAt: state?.pinnedAt,
          lastViewedAt: state?.lastViewedAt,
        };
      }),
    [resourceStates]
  );

  const pinnedResources = sortByRecent(
    resourcesWithState
      .filter((item) => !!item.pinnedAt)
      .map((item) => ({ ...item, timestamp: item.pinnedAt }))
  );
  const savedResources = sortByRecent(
    resourcesWithState
      .filter((item) => item.savedAt && !item.pinnedAt)
      .map((item) => ({ ...item, timestamp: item.savedAt }))
  );
  const recentResources = sortByRecent(
    resourcesWithState
      .filter((item) => !!item.lastViewedAt)
      .map((item) => ({ ...item, timestamp: item.lastViewedAt }))
  );

  const openLaborResource = async (resourceId: LaborResourceId) => {
    const nextStates = await markLaborResourceViewed(resourceId);
    setResourceStates(nextStates);

    if (resourceId === 'labor-guide') {
      navigation.navigate('LaborGuide');
      return;
    }

    if (resourceId === 'labor-help') {
      navigation.navigate('LaborHelp');
      return;
    }

    openUrl('https://www.check-roudou.mhlw.go.jp/');
  };

  const handleToggleSaved = async (resourceId: LaborResourceId) => {
    const { saved: nextSaved, states } = await toggleLaborResourceSaved(resourceId);
    setResourceStates(states);
    Alert.alert(
      nextSaved ? 'Đã lưu' : 'Đã bỏ lưu',
      nextSaved
        ? 'Mục này đã được thêm vào tab Việc làm.'
        : 'Mục này không còn nằm trong danh sách đã lưu.'
    );
  };

  const handleTogglePinned = async (resourceId: LaborResourceId) => {
    const { pinned: nextPinned, states } = await toggleLaborResourcePinned(resourceId);
    setResourceStates(states);
    Alert.alert(
      nextPinned ? 'Đã ghim' : 'Đã bỏ ghim',
      nextPinned
        ? 'Mục này sẽ hiện ưu tiên ở đầu tab Việc làm.'
        : 'Mục này không còn ghim nữa.'
    );
  };

  const renderResourceRow = (
    resource: (typeof resourcesWithState)[number],
    variant: 'compact' | 'full' = 'compact'
  ) => (
    <TouchableOpacity
      key={resource.id}
      style={[styles.resourceRow, variant === 'full' && styles.resourceRowFull]}
      onPress={() => void openLaborResource(resource.id)}
      activeOpacity={0.85}
    >
      <View style={[styles.resourceIconBg, { backgroundColor: resource.color + '18' }]}>
        <Ionicons name={resource.icon} size={18} color={resource.color} />
      </View>
      <View style={styles.resourceInfo}>
        <Text style={styles.resourceTitle}>{resource.title}</Text>
        <Text style={styles.resourceDesc} numberOfLines={variant === 'full' ? 4 : 2}>
          {resource.description}
        </Text>
      </View>
      <View style={styles.resourceActions}>
        <TouchableOpacity
          style={styles.resourceActionBtn}
          onPress={() => void handleTogglePinned(resource.id)}
        >
          <Ionicons
            name={resource.pinnedAt ? 'pin' : 'pin-outline'}
            size={17}
            color={resource.color}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.resourceActionBtn}
          onPress={() => void handleToggleSaved(resource.id)}
        >
          <Ionicons
            name={resource.savedAt ? 'bookmark' : 'bookmark-outline'}
            size={18}
            color={resource.color}
          />
        </TouchableOpacity>
        <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Việc làm tại Nhật</Text>
        <Text style={styles.headerSub}>
          Tìm đúng nguồn việc, hiểu quyền lao động và biết đi đâu khi công ty có vấn đề.
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {recentResources.length > 0 ? (
          <View style={styles.statusSection}>
            <Text style={styles.sectionTitle}>Vừa xem</Text>
            <View style={styles.statusList}>
              {recentResources.slice(0, 3).map((resource) => renderResourceRow(resource))}
            </View>
          </View>
        ) : null}

        {pinnedResources.length > 0 ? (
          <View style={styles.statusSection}>
            <Text style={styles.sectionTitle}>Đã ghim</Text>
            <View style={styles.statusList}>
              {pinnedResources.slice(0, 3).map((resource) => renderResourceRow(resource))}
            </View>
          </View>
        ) : null}

        {savedResources.length > 0 ? (
          <View style={styles.statusSection}>
            <Text style={styles.sectionTitle}>Đã lưu</Text>
            <View style={styles.statusList}>
              {savedResources.slice(0, 3).map((resource) => renderResourceRow(resource))}
            </View>
          </View>
        ) : null}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.workerFiltersScroll}
          contentContainerStyle={styles.workerFiltersContent}
        >
          {WORKER_TYPE_GUIDES.map((workerType) => {
            const active = activeWorkerType === workerType.id;
            return (
              <TouchableOpacity
                key={workerType.id}
                style={[
                  styles.workerFilter,
                  active && {
                    backgroundColor: workerType.color,
                    borderColor: workerType.color,
                  },
                ]}
                onPress={() => setActiveWorkerType(workerType.id)}
              >
                <Ionicons
                  name={workerType.icon}
                  size={14}
                  color={active ? Colors.white : Colors.textSecondary}
                />
                <Text style={[styles.workerFilterText, active && styles.workerFilterTextActive]}>
                  {workerType.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.quickActionSection}>
          <Text style={styles.sectionTitle}>Xử lý nhanh theo tình huống</Text>
          <View style={styles.quickActionGrid}>
            {resourcesWithState.map((item) => renderResourceRow(item, 'full'))}
          </View>
        </View>

        <View style={[styles.profileCard, { borderColor: activeGuide.color + '40' }]}>
          <View style={[styles.profileIcon, { backgroundColor: activeGuide.color + '18' }]}>
            <Ionicons name={activeGuide.icon} size={20} color={activeGuide.color} />
          </View>
          <View style={styles.profileText}>
            <Text style={styles.profileTitle}>{activeGuide.title}</Text>
            <Text style={styles.profileDesc}>{activeGuide.description}</Text>
            {activeGuide.warnings.map((warning) => (
              <View key={warning} style={styles.warningRow}>
                <View style={[styles.warningDot, { backgroundColor: activeGuide.color }]} />
                <Text style={styles.warningText}>{warning}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.noticeCard}>
          <Ionicons name="information-circle" size={20} color={Colors.primary} />
          <Text style={styles.noticeText}>
            Tab này không đăng tin tuyển dụng trực tiếp. Nó giúp bạn chốt đúng{' '}
            <Text style={styles.noticeBold}>
              nơi tìm việc, nơi tra luật và nơi cầu cứu khi gặp tranh chấp
            </Text>{' '}
            tại Nhật.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Thay đổi lớn đang áp dụng trong 2026</Text>
        <View style={styles.updatesWrap}>
          {CURRENT_LABOR_UPDATES.map((update) => (
            <TouchableOpacity
              key={update.id}
              style={styles.updateCard}
              onPress={() => openUrl(update.url)}
              activeOpacity={0.8}
            >
              <View style={[styles.updateIconBg, { backgroundColor: update.color + '18' }]}>
                <Ionicons name={update.icon} size={18} color={update.color} />
              </View>
              <View style={styles.updateText}>
                <Text style={styles.updateTitle}>{update.title}</Text>
                <Text style={styles.updateDate}>{update.effectiveDate}</Text>
                <Text style={styles.updateSummary}>{update.summary}</Text>
                <Text style={styles.updateImpact}>{update.impact}</Text>
              </View>
              <Ionicons name="open-outline" size={16} color={Colors.textMuted} />
            </TouchableOpacity>
          ))}
        </View>

        {JOB_PLATFORMS.map((group) => {
          const platforms = group.platforms.filter((platform) =>
            platform.eligibleFor.includes(activeWorkerType)
          );
          if (platforms.length === 0) return null;

          const isOpen = expandedCategory === group.category;

          return (
            <View key={group.category} style={styles.categoryBlock}>
              <TouchableOpacity
                style={[styles.categoryHeader, { borderLeftColor: group.color }]}
                onPress={() => setExpandedCategory(isOpen ? null : group.category)}
                activeOpacity={0.8}
              >
                <View style={[styles.categoryIconBg, { backgroundColor: group.color + '18' }]}>
                  <Ionicons name={group.icon} size={20} color={group.color} />
                </View>
                <Text style={styles.categoryTitle}>{group.category}</Text>
                <View style={styles.countChip}>
                  <Text style={styles.countChipText}>{platforms.length}</Text>
                </View>
                <Ionicons
                  name={isOpen ? 'chevron-up' : 'chevron-down'}
                  size={18}
                  color={Colors.textMuted}
                />
              </TouchableOpacity>

              {isOpen ? (
                <View style={styles.platformList}>
                  {platforms.map((platform) => (
                    <View key={platform.id} style={styles.platformCard}>
                      <View style={styles.platformTop}>
                        <View
                          style={[
                            styles.platformIconBg,
                            { backgroundColor: platform.color + '18' },
                          ]}
                        >
                          <Ionicons name={platform.icon} size={22} color={platform.color} />
                        </View>
                        <View style={styles.platformNameBlock}>
                          <Text style={styles.platformName}>{platform.name}</Text>
                          <Text style={styles.platformNameJp}>{platform.nameJp}</Text>
                        </View>
                        <TouchableOpacity
                          style={[styles.openBtn, { backgroundColor: platform.color }]}
                          onPress={() => openUrl(platform.url)}
                        >
                          <Ionicons name="open-outline" size={14} color={Colors.white} />
                          <Text style={styles.openBtnText}>Mở</Text>
                        </TouchableOpacity>
                      </View>

                      <Text style={styles.platformDesc}>{platform.description}</Text>

                      <View style={styles.visaNoteBox}>
                        <Ionicons
                          name={
                            platform.requiresPermission
                              ? 'alert-circle-outline'
                              : 'information-circle-outline'
                          }
                          size={15}
                          color={platform.requiresPermission ? Colors.warning : Colors.primary}
                        />
                        <Text style={styles.visaNoteText}>
                          {platform.visaNote}
                          {platform.workHourLimit ? ` ${platform.workHourLimit}` : ''}
                        </Text>
                      </View>

                      <View style={styles.tagsRow}>
                        <View style={[styles.targetTag, { backgroundColor: group.color + '15' }]}>
                          <Text style={[styles.targetTagText, { color: group.color }]}>
                            {platform.targetUser}
                          </Text>
                        </View>
                        {platform.tags.slice(0, 3).map((tag) => (
                          <View key={tag} style={styles.tag}>
                            <Text style={styles.tagText}>{tag}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  ))}
                </View>
              ) : null}
            </View>
          );
        })}

        <Text style={styles.sectionTitle}>Quyền lợi người lao động</Text>
        <View style={styles.rightsCard}>
          {WORKER_RIGHTS.map((right, index) => (
            <View
              key={right.title}
              style={[styles.rightRow, index < WORKER_RIGHTS.length - 1 && styles.rightBorder]}
            >
              <View style={styles.rightIconBg}>
                <Ionicons name={right.icon} size={18} color={Colors.primary} />
              </View>
              <View style={styles.rightInfo}>
                <Text style={styles.rightTitle}>{right.title}</Text>
                <Text style={styles.rightDesc}>{right.description}</Text>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.guideCard} onPress={() => void openLaborResource('labor-guide')}>
          <View style={styles.guideIconBg}>
            <Ionicons name="book-outline" size={20} color={Colors.primary} />
          </View>
          <View style={styles.guideText}>
            <Text style={styles.guideTitle}>Mở cẩm nang lao động</Text>
            <Text style={styles.guideDesc}>
              Xem dấu hiệu công ty rủi ro, checklist hợp đồng và các câu tiếng Nhật nên dùng.
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={Colors.textMuted} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.guideCard} onPress={() => void openLaborResource('labor-help')}>
          <View style={styles.guideIconBg}>
            <Ionicons name="help-buoy-outline" size={20} color={Colors.primary} />
          </View>
          <View style={styles.guideText}>
            <Text style={styles.guideTitle}>Mở mục khiếu nại / cần giúp gì</Text>
            <Text style={styles.guideDesc}>
              Xem ngay phải làm gì khi bị nợ lương, ép OT, giữ giấy tờ hoặc muốn nghỉ việc đúng luật.
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={Colors.textMuted} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.lawLink}
          onPress={() => void openLaborResource('official-law')}
        >
          <Ionicons name="document-text-outline" size={18} color={Colors.primary} />
          <View style={styles.lawLinkText}>
            <Text style={styles.lawLinkTitle}>Kiểm tra luật lao động chính thức</Text>
            <Text style={styles.lawLinkSub}>
              check-roudou.mhlw.go.jp - nguồn của Bộ Lao động Nhật
            </Text>
          </View>
          <Ionicons name="open-outline" size={16} color={Colors.textMuted} />
        </TouchableOpacity>

        <View style={styles.metaCard}>
          <Ionicons name="shield-checkmark-outline" size={18} color={Colors.primary} />
          <Text style={styles.metaText}>
            Xác minh nội dung Việc làm: {formatLastUpdated(JOBS_CONTENT_META.lastUpdated)}. Nguồn
            chính: MHLW, Hello Work, Check-Roudou, Japan Pension Service, OTIT.
          </Text>
        </View>

        <View style={{ height: 24 + Math.max(insets.bottom, 12) }} />
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
    paddingBottom: 20,
  },
  headerTitle: { fontSize: 24, fontWeight: '800', color: Colors.white },
  headerSub: { fontSize: 13, color: 'rgba(255,255,255,0.75)', marginTop: 4, lineHeight: 18 },
  content: {
    flex: 1,
    backgroundColor: Colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -8,
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  statusSection: { marginBottom: 12 },
  statusList: { gap: 10 },
  workerFiltersScroll: { marginBottom: 10 },
  workerFiltersContent: { gap: 8 },
  workerFilter: {
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
  workerFilterText: { fontSize: 12, fontWeight: '700', color: Colors.textSecondary },
  workerFilterTextActive: { color: Colors.white },
  quickActionSection: { marginBottom: 12 },
  quickActionGrid: { gap: 10, marginTop: 2 },
  resourceRow: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  resourceRowFull: { padding: 14 },
  resourceIconBg: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resourceInfo: { flex: 1 },
  resourceTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  resourceDesc: { fontSize: 12, color: Colors.textSecondary, lineHeight: 18 },
  resourceActions: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  resourceActionBtn: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileCard: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1.5,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  profileIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  profileText: { flex: 1 },
  profileTitle: { fontSize: 15, fontWeight: '800', color: Colors.textPrimary, marginBottom: 6 },
  profileDesc: { fontSize: 13, color: Colors.textSecondary, lineHeight: 19, marginBottom: 8 },
  warningRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginBottom: 6 },
  warningDot: { width: 6, height: 6, borderRadius: 3, marginTop: 6 },
  warningText: { flex: 1, fontSize: 12, color: Colors.textSecondary, lineHeight: 18 },
  noticeCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: Colors.accent,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.primary + '22',
  },
  noticeText: { flex: 1, fontSize: 12, color: Colors.textSecondary, lineHeight: 18 },
  noticeBold: { fontWeight: '700', color: Colors.textPrimary },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 10,
    marginTop: 4,
  },
  updatesWrap: { gap: 10, marginBottom: 12 },
  updateCard: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    gap: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  updateIconBg: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  updateText: { flex: 1 },
  updateTitle: { fontSize: 13, fontWeight: '800', color: Colors.textPrimary, marginBottom: 4 },
  updateDate: { fontSize: 11, color: Colors.textMuted, marginBottom: 4, lineHeight: 16 },
  updateSummary: { fontSize: 12, color: Colors.textSecondary, lineHeight: 18, marginBottom: 6 },
  updateImpact: { fontSize: 12, color: Colors.textPrimary, lineHeight: 18 },
  categoryBlock: { marginBottom: 12 },
  categoryHeader: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderLeftWidth: 4,
  },
  categoryIconBg: {
    width: 38,
    height: 38,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryTitle: { flex: 1, fontSize: 14, fontWeight: '700', color: Colors.textPrimary },
  countChip: {
    minWidth: 24,
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: Colors.accent,
    alignItems: 'center',
  },
  countChipText: { fontSize: 11, fontWeight: '700', color: Colors.primary },
  platformList: { gap: 10, marginTop: 10 },
  platformCard: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  platformTop: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  platformIconBg: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  platformNameBlock: { flex: 1 },
  platformName: { fontSize: 14, fontWeight: '800', color: Colors.textPrimary },
  platformNameJp: { fontSize: 11, color: Colors.textMuted, marginTop: 2 },
  openBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
  },
  openBtnText: { fontSize: 12, fontWeight: '700', color: Colors.white },
  platformDesc: { fontSize: 12, color: Colors.textSecondary, lineHeight: 18, marginBottom: 10 },
  visaNoteBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: Colors.accent,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  visaNoteText: { flex: 1, fontSize: 12, color: Colors.textSecondary, lineHeight: 18 },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  targetTag: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999 },
  targetTagText: { fontSize: 11, fontWeight: '700' },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: Colors.background,
  },
  tagText: { fontSize: 11, color: Colors.textSecondary, fontWeight: '600' },
  rightsCard: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  rightRow: { flexDirection: 'row', gap: 12, padding: 14 },
  rightBorder: { borderBottomWidth: 1, borderBottomColor: Colors.border },
  rightIconBg: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightInfo: { flex: 1 },
  rightTitle: { fontSize: 13, fontWeight: '700', color: Colors.textPrimary, marginBottom: 4 },
  rightDesc: { fontSize: 12, color: Colors.textSecondary, lineHeight: 18 },
  guideCard: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  guideIconBg: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  guideText: { flex: 1 },
  guideTitle: { fontSize: 13, fontWeight: '800', color: Colors.textPrimary, marginBottom: 3 },
  guideDesc: { fontSize: 12, color: Colors.textSecondary, lineHeight: 17 },
  lawLink: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.primary + '28',
  },
  lawLinkText: { flex: 1 },
  lawLinkTitle: { fontSize: 13, fontWeight: '700', color: Colors.primary, marginBottom: 3 },
  lawLinkSub: { fontSize: 11, color: Colors.textMuted, lineHeight: 16 },
  metaCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: Colors.accent,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.primary + '30',
  },
  metaText: { flex: 1, fontSize: 12, color: Colors.textSecondary, lineHeight: 18 },
});
