import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../constants/colors';
import { ADMIN_GUIDES } from '../constants/content/adminGuides';
import { DAILY_LIFE_TOPICS } from '../constants/content/dailyLife';
import { loadImportantDates, getDaysUntil } from '../utils/notifications';
import { RootStackParamList } from '../navigation/AppNavigator';
import ProfileSetupModal from '../components/ProfileSetupModal';
import type { UserProfile } from '../types/profile';
import {
  FAMILY_VISA_GROUPS,
  GENERIC_TIPS,
  LAW_UPDATES,
  buildPersonalizedActions,
  getGreeting,
  type ActiveAlert,
  type CategoryTarget,
  type InProgressGuide,
  type PersonalizedAction,
  type ReadyGuide,
  type SavedCounts,
} from './homeScreenContent';
import { HomeHeader } from './home/HomeHeader';
import { HomeSearchCta, HomeAskCta } from './home/HomeTopCtas';
import {
  HomeQuickActions,
  type QuickAction,
  type QuickActionId,
} from './home/HomeQuickActions';
import { HomeCategoryGrid } from './home/HomeCategoryGrid';
import { HomeOnboardingGuides } from './home/HomeOnboardingGuides';
import { HomeFeaturedGuides } from './home/HomeFeaturedGuides';
import { HomeRecentlyViewed } from './home/HomeRecentlyViewed';
import { HomeSavedGuides } from './home/HomeSavedGuides';
import { HomeStartHere } from './home/HomeStartHere';
import { HomeEmergencyContacts } from './home/HomeEmergencyContacts';
import {
  buildChecklistProgressItems,
  buildCompletedChecklistItems,
  buildSavedCounts,
  buildStepProgressItems,
} from './homeScreenData';
import { loadRecentDailyLifeTopics } from '../utils/dailyLifeRecentTopics';
import { loadRecentJapaneseCategories, RecentJapaneseCategory } from '../utils/japaneseRecentCategories';
import { loadRecentlyViewedGuides, type RecentlyViewedGuide } from '../utils/recentlyViewedGuides';
import { loadBookmarks, Bookmark } from '../utils/bookmarks';
import { loadAllGuideChecklistProgress } from '../utils/guideChecklistProgress';
import { loadAllGuideStepProgress } from '../utils/guideStepProgress';
import {
  buildUserProfileSummary,
  dismissUserProfilePrompt,
  getUserProfileGreeting,
  loadUserProfile,
  loadUserProfilePromptDismissed,
  saveUserProfile,
} from '../utils/userProfile';
import { logHomeQuickActionPressed, logHomeSearchPressed } from '../utils/analytics';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [activeAlerts, setActiveAlerts] = useState<ActiveAlert[]>([]);
  const [recentDailyTopicIds, setRecentDailyTopicIds] = useState<string[]>([]);
  const [recentJapaneseCategories, setRecentJapaneseCategories] = useState<RecentJapaneseCategory[]>([]);
  const [recentlyViewedGuides, setRecentlyViewedGuides] = useState<RecentlyViewedGuide[]>([]);
  // Phase R1: guide-only saved bookmarks (full list, unsliced) so the
  // "Đã lưu" surface still renders even when the most recent 6 mixed
  // bookmarks are non-guide types (phrases, daily-life, etc.).
  const [savedGuideBookmarks, setSavedGuideBookmarks] = useState<Bookmark[]>([]);
  const [savedBookmarks, setSavedBookmarks] = useState<Bookmark[]>([]);
  const [pinnedBookmarks, setPinnedBookmarks] = useState<Bookmark[]>([]);
  const [inProgressGuides, setInProgressGuides] = useState<InProgressGuide[]>([]);
  const [inProgressStepGuides, setInProgressStepGuides] = useState<InProgressGuide[]>([]);
  const [readyGuides, setReadyGuides] = useState<ReadyGuide[]>([]);
  const [completedGuideIds, setCompletedGuideIds] = useState<string[]>([]);
  const [savedCounts, setSavedCounts] = useState<SavedCounts>({
    guide: 0,
    'daily-life': 0,
    phrase: 0,
    dialogue: 0,
  });
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        const profile = await loadUserProfile();
        setUserProfile(profile);

        if (!profile) {
          const dismissed = await loadUserProfilePromptDismissed();
          setShowProfileModal(!dismissed);
        } else {
          setShowProfileModal(false);
        }

        try {
          const dates = await loadImportantDates();
          const upcoming = dates
            .map((item) => ({ id: item.id, label: item.label, daysLeft: getDaysUntil(item.date) }))
            .filter((item) => item.daysLeft > 0 && item.daysLeft <= 90)
            .sort((a, b) => a.daysLeft - b.daysLeft);
          setActiveAlerts(upcoming);
        } catch {
          setActiveAlerts([]);
        }

        loadRecentDailyLifeTopics().then((items) => setRecentDailyTopicIds(items.map((item) => item.topicId)));
        loadRecentJapaneseCategories().then(setRecentJapaneseCategories);
        loadRecentlyViewedGuides().then(setRecentlyViewedGuides);
        loadBookmarks().then((items) => {
          setSavedBookmarks(items.slice(0, 6));
          setPinnedBookmarks(items.filter((item) => !!item.pinnedAt).slice(0, 4));
          setSavedGuideBookmarks(items.filter((b) => b.type === 'guide'));
          setSavedCounts(buildSavedCounts(items));
        });
        loadAllGuideChecklistProgress().then((progressMap) => {
          const progressItems = buildChecklistProgressItems(ADMIN_GUIDES, progressMap);
          setInProgressGuides(progressItems);

          const completedItems = buildCompletedChecklistItems(ADMIN_GUIDES, progressMap);
          setReadyGuides(completedItems);
          setCompletedGuideIds(completedItems.map((item) => item.guideId));
        });

        loadAllGuideStepProgress().then((progressMap) => {
          setInProgressStepGuides(buildStepProgressItems(ADMIN_GUIDES, progressMap));
        });
      };

      loadData();
    }, [])
  );

  const recentDailyTopics = recentDailyTopicIds
    .map((topicId) => DAILY_LIFE_TOPICS.find((topic) => topic.id === topicId))
    .filter(Boolean);
  const personalizedActions = userProfile ? buildPersonalizedActions(userProfile) : [];
  const isGuideActionCompleted = (action: PersonalizedAction) =>
    action.kind === 'guide' && completedGuideIds.includes(action.guideId);

  const handleCategoryPress = (tab: CategoryTarget) => {
    if (tab === 'DailyLife') {
      navigation.navigate('DailyLife');
      return;
    }
    navigation.navigate('MainTabs', { screen: tab });
  };

  const handleCallEmergency = (number: string) => {
    const tel = number.split('/')[0].trim().replace(/\s/g, '');
    Linking.openURL(`tel:${tel}`);
  };

  const handleProfileActionPress = (action: PersonalizedAction) => {
    if (action.kind === 'guide') {
      navigation.navigate('AdminDetail', { guideId: action.guideId });
      return;
    }

    if (action.kind === 'tab') {
      navigation.navigate('MainTabs', { screen: action.tab });
      return;
    }

    navigation.navigate(action.screen);
  };

  const handleSaveProfile = async (input: {
    visaStatus: UserProfile['visaStatus'];
    lifeStage: UserProfile['lifeStage'];
    household: UserProfile['household'];
    prefecture: string;
  }) => {
    const saved = await saveUserProfile(input, userProfile);
    setUserProfile(saved);
    setShowProfileModal(false);
  };

  const handleSearchCtaPress = () => {
    void logHomeSearchPressed();
    navigation.navigate('Search');
  };

  const handleQuickActionPress = (action: QuickAction) => {
    void logHomeQuickActionPressed(action.id);
    if (action.id === 'newcomer') {
      navigation.navigate('JourneyChecklist');
      return;
    }
    if (action.id === 'emergency') {
      navigation.navigate('EmergencyHub');
      return;
    }
    // "Mất giấy tờ" used to open Search with a generic "thẻ cư trú"
    // query, which dumped users into a long results list instead of
    // the urgent step-by-step they're actually looking for. Now it
    // jumps straight into the dedicated lost-residence-card guide.
    if (action.id === 'lost-document') {
      navigation.navigate('AdminDetail', { guideId: 'lost-residence-card' });
      return;
    }
    // The remaining situations open Search with a pre-filled query so
    // the user lands on results that match their tình huống immediately.
    // Keys are short Vietnamese phrases the searchIndex actually indexes
    // against; multi-word "thuế bảo hiểm" combos returned zero hits so
    // we pick the more useful single phrase from each pair.
    const queryByAction: Partial<
      Record<Exclude<QuickActionId, 'newcomer' | 'emergency' | 'lost-document'>, string>
    > = {
      'visa-renewal':  'gia hạn visa',
      'moving':        'chuyển nhà',
      'official-mail': 'thuế',
      'tax-insurance': 'bảo hiểm',
    };
    const initialQuery = queryByAction[action.id as keyof typeof queryByAction];
    navigation.navigate('Search', initialQuery ? { initialQuery } : undefined);
  };

  const handleDismissProfileModal = () => {
    void dismissUserProfilePrompt();
    setShowProfileModal(false);
  };

  // Phase UX1 — "Bắt đầu ở đâu?" shortcuts route to the most-asked
  // entry points. Reuses existing nav targets so no new routes need to
  // be added. Each shortcut emits the same `home_quick_action_pressed`
  // (when wired) so analytics stays consistent.
  const handleStartHereShortcutPress = (id: 'newcomer' | 'visa' | 'tax' | 'emergency' | 'jobs') => {
    if (id === 'newcomer') {
      navigation.navigate('AdminDetail', { guideId: 'first-7-days-in-japan', source: 'direct' });
      return;
    }
    if (id === 'emergency') {
      navigation.navigate('EmergencyHub');
      return;
    }
    if (id === 'jobs') {
      navigation.navigate('MainTabs', { screen: 'Jobs' });
      return;
    }
    const queryById: Record<'visa' | 'tax', string> = {
      visa: 'visa',
      tax: 'thuế',
    };
    navigation.navigate('Search', { initialQuery: queryById[id as 'visa' | 'tax'] });
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => ({ ...prev, [sectionId]: !prev[sectionId] }));
  };

  const getVisibleItems = <T,>(sectionId: string, items: readonly T[], defaultVisible: number) => {
    const expanded = !!expandedSections[sectionId];
    return {
      items: expanded ? [...items] : items.slice(0, defaultVisible),
      expanded,
      hasMore: items.length > defaultVisible,
    };
  };

  const handleBookmarkPress = (bookmark: Bookmark) => {
    if (bookmark.type === 'guide') {
      navigation.navigate('AdminDetail', { guideId: bookmark.id });
      return;
    }

    if (bookmark.type === 'daily-life') {
      navigation.navigate('DailyLifeDetail', { topicId: bookmark.id });
      return;
    }

    navigation.navigate('MainTabs', { screen: 'Japanese' });
  };

  const getBookmarkMeta = (bookmark: Bookmark) => {
    if (bookmark.type === 'guide') {
      return {
        label: 'Thủ tục',
        title: bookmark.title,
        icon: 'document-text-outline' as keyof typeof Ionicons.glyphMap,
        color: bookmark.color,
      };
    }

    if (bookmark.type === 'daily-life') {
      return {
        label: 'Cuộc sống',
        title: bookmark.title,
        icon: 'sunny-outline' as keyof typeof Ionicons.glyphMap,
        color: bookmark.color,
      };
    }

    if (bookmark.type === 'dialogue') {
      return {
        label: 'Hội thoại',
        title: bookmark.situation,
        icon: 'chatbubbles-outline' as keyof typeof Ionicons.glyphMap,
        color: Colors.primary,
      };
    }

    return {
      label: 'Tiếng Nhật',
      title: bookmark.vn,
      icon: 'language-outline' as keyof typeof Ionicons.glyphMap,
      color: Colors.primary,
    };
  };

  const priorityItems = [
    ...activeAlerts.slice(0, 3).map((alert) => ({ type: 'alert' as const, data: alert })),
    ...inProgressGuides.map((guide) => ({ type: 'progress' as const, data: guide })),
  ];
  const visiblePriority = getVisibleItems('priority', priorityItems, 3);
  const visibleReady = getVisibleItems('ready', readyGuides, 2);
  const visibleRecent = getVisibleItems('recent', savedBookmarks, 4);
  const visiblePinned = getVisibleItems('pinned', pinnedBookmarks, 4);
  const visibleUpdates = getVisibleItems('updates', LAW_UPDATES, 2);
  const visibleFamilyGroups = getVisibleItems('family', FAMILY_VISA_GROUPS, 1);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <HomeHeader
          greeting={getGreeting()}
          onSearchPress={() => navigation.navigate('Search')}
          onSettingsPress={() => navigation.navigate('Settings')}
        />

        <View style={styles.content}>
          <HomeSearchCta onPress={handleSearchCtaPress} />

          <HomeAskCta onPress={() => navigation.navigate('HoiCamNang')} />

          {/* AI Mail remains internal-only until gates in decision log are cleared.
              See docs/feature-ai-mail-translate-decision-log.md. Mail routes +
              screens stay registered for Phase 2 scaffolding, but no Home/Settings
              entry point is rendered. */}

          {/* Phase UX1 — beginner-friendly entry shortcuts placed right
              under the search/ask CTAs so a fresh user has a path that
              doesn't require typing. Old quick-actions row is kept
              below for users who already know what they need. */}
          <Text style={styles.sectionTitle}>Bắt đầu ở đâu?</Text>
          <HomeStartHere onShortcutPress={handleStartHereShortcutPress} />

          <HomeQuickActions onActionPress={handleQuickActionPress} />

          {userProfile ? (
            <View style={styles.profileHeroCard}>
              <View style={styles.profileHeroTop}>
                <View style={styles.profileHeroIcon}>
                  <Ionicons name="compass-outline" size={20} color={Colors.primary} />
                </View>
                <View style={styles.profileHeroText}>
                  <Text style={styles.profileHeroLabel}>Lộ trình đang ưu tiên</Text>
                  <Text style={styles.profileHeroTitle}>{getUserProfileGreeting(userProfile)}</Text>
                  <Text style={styles.profileHeroSummary}>{buildUserProfileSummary(userProfile)}</Text>
                </View>
                <TouchableOpacity style={styles.profileHeroEditBtn} onPress={() => setShowProfileModal(true)}>
                  <Ionicons name="create-outline" size={18} color={Colors.primary} />
                </TouchableOpacity>
              </View>

              <View style={styles.profileActionsWrap}>
                {personalizedActions.map((action) => (
                  (() => {
                    const completed = isGuideActionCompleted(action);
                    const actionTitle =
                      completed && action.id === 'first-7-days'
                        ? 'Chốt checklist 7 ngày đầu (ĐÃ CHỐT)'
                        : action.title;

                    return (
                  <TouchableOpacity
                    key={action.id}
                    style={styles.profileActionCard}
                    onPress={() => handleProfileActionPress(action)}
                  >
                    <View style={[styles.profileActionIconBg, { backgroundColor: `${action.color}18` }]}>
                      <Ionicons name={action.icon} size={18} color={action.color} />
                    </View>
                    <View style={styles.profileActionText}>
                      <Text style={styles.profileActionTitle}>{actionTitle}</Text>
                      <Text style={styles.profileActionDesc}>{action.description}</Text>
                    </View>
                    {completed ? (
                      <View style={styles.stampBadge}>
                        <Ionicons name="checkmark-done-outline" size={12} color={Colors.white} />
                        <Text style={styles.stampBadgeText}>ĐÃ CHỐT</Text>
                      </View>
                    ) : null}
                    <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
                  </TouchableOpacity>
                    );
                  })()
                ))}
              </View>
            </View>
          ) : (
            <TouchableOpacity style={styles.profileSetupCard} onPress={() => setShowProfileModal(true)}>
              <View style={styles.profileSetupTop}>
                <View style={styles.profileSetupIcon}>
                  <Ionicons name="sparkles-outline" size={20} color={Colors.primary} />
                </View>
                <View style={styles.profileSetupText}>
                  <Text style={styles.profileSetupTitle}>Thiết lập hồ sơ cá nhân hóa</Text>
                  <Text style={styles.profileSetupDesc}>
                    Chọn diện visa, giai đoạn hiện tại và cách đang sống để app ưu tiên đúng nội dung cho bạn.
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={Colors.textMuted} />
              </View>
              <View style={styles.profileSetupTags}>
                <View style={styles.profileSetupTag}>
                  <Text style={styles.profileSetupTagText}>Trang chủ đúng người hơn</Text>
                </View>
                <View style={styles.profileSetupTag}>
                  <Text style={styles.profileSetupTagText}>Gợi ý việc cần làm ngay</Text>
                </View>
                <View style={styles.profileSetupTag}>
                  <Text style={styles.profileSetupTagText}>Sửa lại bất cứ lúc nào</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}

          {activeAlerts.length > 0
            ? activeAlerts.map((alert) => (
                <TouchableOpacity
                  key={alert.id}
                  style={[styles.alertCard, alert.daysLeft <= 30 ? styles.alertHigh : styles.alertMedium]}
                  onPress={() => navigation.navigate('ImportantDates')}
                >
                  <View style={styles.alertLeft}>
                    <Ionicons
                      name={alert.daysLeft <= 30 ? 'warning' : 'alarm-outline'}
                      size={22}
                      color={alert.daysLeft <= 30 ? Colors.danger : Colors.warning}
                    />
                    <View style={styles.alertTextContainer}>
                      <Text style={styles.alertTitle}>{alert.label}</Text>
                      <Text style={styles.alertDesc}>Còn {alert.daysLeft} ngày nữa đến hạn. Nên kiểm tra sớm.</Text>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
                </TouchableOpacity>
              ))
            : GENERIC_TIPS.map((tip) => (
                <TouchableOpacity
                  key={tip.id}
                  style={[styles.alertCard, tip.urgency === 'medium' ? styles.alertMedium : styles.alertInfo]}
                  onPress={() => {
                    if (tip.screen === 'Admin') navigation.navigate('MainTabs', { screen: 'Admin' });
                    else navigation.navigate(tip.screen);
                  }}
                >
                  <View style={styles.alertLeft}>
                    <Ionicons name={tip.icon} size={22} color={tip.urgency === 'medium' ? Colors.warning : Colors.primary} />
                    <View style={styles.alertTextContainer}>
                      <Text style={styles.alertTitle}>{tip.title}</Text>
                      <Text style={styles.alertDesc}>{tip.description}</Text>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
                </TouchableOpacity>
              ))}

          {(activeAlerts.length > 0 || inProgressGuides.length > 0) ? (
            <>
              <View style={styles.sectionTitleRow}>
                <Text style={styles.sectionTitle}>Ưu tiên lúc này</Text>
                {visiblePriority.hasMore ? (
                  <TouchableOpacity onPress={() => toggleSection('priority')}>
                    <Text style={styles.sectionLink}>
                      {visiblePriority.expanded ? 'Thu gọn' : 'Xem thêm'}
                    </Text>
                  </TouchableOpacity>
                ) : null}
              </View>
              {visiblePriority.items.map((entry) =>
                entry.type === 'alert' ? (
                  <TouchableOpacity
                    key={`priority-alert-${entry.data.id}`}
                    style={[styles.priorityCard, entry.data.daysLeft <= 30 ? styles.alertHigh : styles.alertMedium]}
                    onPress={() => navigation.navigate('ImportantDates')}
                  >
                    <View style={styles.priorityLeft}>
                      <View style={[styles.priorityIconBg, { backgroundColor: Colors.white }]}>
                        <Ionicons
                          name={entry.data.daysLeft <= 30 ? 'warning' : 'alarm-outline'}
                          size={18}
                          color={entry.data.daysLeft <= 30 ? Colors.danger : Colors.warning}
                        />
                      </View>
                      <View style={styles.priorityTextBlock}>
                        <Text style={styles.priorityCardTitle}>{entry.data.label}</Text>
                        <Text style={styles.priorityCardDesc}>Còn {entry.data.daysLeft} ngày nữa đến hạn.</Text>
                      </View>
                    </View>
                    <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    key={`progress-${entry.data.guideId}`}
                    style={styles.priorityCard}
                    onPress={() => navigation.navigate('AdminDetail', { guideId: entry.data.guideId })}
                  >
                    <View style={styles.priorityLeft}>
                      <View style={[styles.priorityIconBg, { backgroundColor: `${entry.data.color}18` }]}>
                        <Ionicons name="document-text-outline" size={18} color={entry.data.color} />
                      </View>
                      <View style={styles.priorityTextBlock}>
                        <Text style={styles.priorityCardTitle}>{entry.data.title}</Text>
                        <Text style={styles.priorityCardDesc}>Đang làm dở: {entry.data.checked}/{entry.data.total} giấy tờ đã chuẩn bị.</Text>
                        <View style={styles.priorityProgressBar}>
                          <View
                            style={[
                              styles.priorityProgressFill,
                              { width: `${(entry.data.checked / entry.data.total) * 100}%`, backgroundColor: entry.data.color },
                            ]}
                          />
                        </View>
                      </View>
                    </View>
                    <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
                  </TouchableOpacity>
                )
              )}
            </>
          ) : null}

          {readyGuides.length > 0 ? (
            <>
              <View style={styles.sectionTitleRow}>
                <Text style={styles.sectionTitle}>Đã chuẩn bị đủ giấy tờ</Text>
                <View style={styles.sectionActionsInline}>
                  {visibleReady.hasMore ? (
                    <TouchableOpacity onPress={() => toggleSection('ready')}>
                      <Text style={styles.sectionLink}>
                        {visibleReady.expanded ? 'Thu gọn' : 'Xem thêm'}
                      </Text>
                    </TouchableOpacity>
                  ) : null}
                  <TouchableOpacity onPress={() => navigation.navigate('MainTabs', { screen: 'Admin' })}>
                    <Text style={styles.sectionLink}>Mở tab Thủ tục</Text>
                  </TouchableOpacity>
                </View>
              </View>
              {visibleReady.items.map((item) => (
                <TouchableOpacity
                  key={`ready-${item.guideId}`}
                  style={styles.readyCard}
                  onPress={() => navigation.navigate('AdminDetail', { guideId: item.guideId })}
                >
                  <View style={styles.readyLeft}>
                    <View style={[styles.readyIconBg, { backgroundColor: `${item.color}18` }]}>
                      <Ionicons name="checkmark-done-outline" size={18} color={item.color} />
                    </View>
                    <View style={styles.readyTextBlock}>
                      <Text style={styles.readyCardTitle}>{item.title}</Text>
                      <Text style={styles.readyCardDesc}>
                        Checklist hiện tại đã đủ {item.total}/{item.total} mục.
                      </Text>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
                </TouchableOpacity>
              ))}
            </>
          ) : null}

          {inProgressStepGuides.length > 0 ? (
            <>
              <View style={styles.sectionTitleRow}>
                <Text style={styles.sectionTitle}>Đang làm dở thủ tục</Text>
                <TouchableOpacity onPress={() => navigation.navigate('MainTabs', { screen: 'Admin' })}>
                  <Text style={styles.sectionLink}>Xem tất cả</Text>
                </TouchableOpacity>
              </View>
              {inProgressStepGuides.map((item) => (
                <TouchableOpacity
                  key={`step-progress-${item.guideId}`}
                  style={styles.priorityCard}
                  onPress={() => navigation.navigate('AdminDetail', { guideId: item.guideId })}
                >
                  <View style={styles.priorityLeft}>
                    <View style={[styles.priorityIconBg, { backgroundColor: `${item.color}18` }]}>
                      <Ionicons name="checkmark-circle-outline" size={18} color={item.color} />
                    </View>
                    <View style={styles.priorityTextBlock}>
                      <Text style={styles.priorityCardTitle}>{item.title}</Text>
                      <Text style={styles.priorityCardDesc}>
                        Đang làm dở: {item.checked}/{item.total} bước đã xong.
                      </Text>
                      <View style={styles.priorityProgressBar}>
                        <View
                          style={[
                            styles.priorityProgressFill,
                            {
                              width: `${(item.checked / item.total) * 100}%`,
                              backgroundColor: item.color,
                            },
                          ]}
                        />
                      </View>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
                </TouchableOpacity>
              ))}
            </>
          ) : null}

          {(recentDailyTopics.length > 0 || recentJapaneseCategories.length > 0) ? (
            <>
              <Text style={styles.sectionTitle}>Tiếp tục gần đây</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.recentRow}>
                {recentDailyTopics.map((topic) => (
                  <TouchableOpacity
                    key={`daily-${topic!.id}`}
                    style={styles.recentCard}
                    onPress={() => navigation.navigate('DailyLifeDetail', { topicId: topic!.id })}
                  >
                    <View style={[styles.recentIconBg, { backgroundColor: `${topic!.color}18` }]}>
                      <Ionicons name="sunny-outline" size={18} color={topic!.color} />
                    </View>
                    <Text style={styles.recentLabel}>Cuộc sống</Text>
                    <Text style={styles.recentTitle} numberOfLines={2}>{topic!.title}</Text>
                  </TouchableOpacity>
                ))}

                {recentJapaneseCategories.map((item) => (
                  <TouchableOpacity
                    key={`jp-${item.categoryName}`}
                    style={styles.recentCard}
                    onPress={() =>
                      navigation.navigate('JapanesePractice', {
                        categoryName: item.categoryName,
                        categoryColor: item.categoryColor,
                      })
                    }
                  >
                    <View style={[styles.recentIconBg, { backgroundColor: `${item.categoryColor ?? Colors.primary}18` }]}>
                      <Ionicons name="language-outline" size={18} color={item.categoryColor ?? Colors.primary} />
                    </View>
                    <Text style={styles.recentLabel}>Tiếng Nhật</Text>
                    <Text style={styles.recentTitle} numberOfLines={2}>{item.categoryName}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </>
          ) : null}

          {savedBookmarks.length > 0 ? (
            <>
              <View style={styles.sectionTitleRow}>
                <Text style={styles.sectionTitle}>Đã lưu gần đây</Text>
                <View style={styles.sectionActionsInline}>
                  {visibleRecent.hasMore ? (
                    <TouchableOpacity onPress={() => toggleSection('recent')}>
                      <Text style={styles.sectionLink}>
                        {visibleRecent.expanded ? 'Thu gọn' : 'Xem thêm'}
                      </Text>
                    </TouchableOpacity>
                  ) : null}
                  <TouchableOpacity onPress={() => navigation.navigate('MainTabs', { screen: 'Saved' })}>
                    <Text style={styles.sectionLink}>Xem tất cả</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.recentRow}>
                {visibleRecent.items.map((bookmark) => {
                  const meta = getBookmarkMeta(bookmark);
                  return (
                    <TouchableOpacity
                      key={`${bookmark.type}-${bookmark.id}`}
                      style={styles.recentCard}
                      onPress={() => handleBookmarkPress(bookmark)}
                    >
                      <View style={[styles.recentIconBg, { backgroundColor: `${meta.color}18` }]}>
                        <Ionicons name={meta.icon} size={18} color={meta.color} />
                      </View>
                      <Text style={styles.recentLabel}>{meta.label}</Text>
                      <Text style={styles.recentTitle} numberOfLines={2}>
                        {meta.title}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </>
          ) : null}

          {pinnedBookmarks.length > 0 ? (
            <>
              <View style={styles.sectionTitleRow}>
                <Text style={styles.sectionTitle}>Đã ghim</Text>
                <View style={styles.sectionActionsInline}>
                  {visiblePinned.hasMore ? (
                    <TouchableOpacity onPress={() => toggleSection('pinned')}>
                      <Text style={styles.sectionLink}>
                        {visiblePinned.expanded ? 'Thu gọn' : 'Xem thêm'}
                      </Text>
                    </TouchableOpacity>
                  ) : null}
                  <TouchableOpacity onPress={() => navigation.navigate('MainTabs', { screen: 'Saved' })}>
                    <Text style={styles.sectionLink}>Quản lý ghim</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.recentRow}>
                {visiblePinned.items.map((bookmark) => {
                  const meta = getBookmarkMeta(bookmark);
                  return (
                    <TouchableOpacity
                      key={`pin-${bookmark.type}-${bookmark.id}`}
                      style={styles.recentCard}
                      onPress={() => handleBookmarkPress(bookmark)}
                    >
                      <View style={[styles.recentIconBg, { backgroundColor: `${meta.color}18` }]}>
                        <Ionicons name="pin" size={16} color={meta.color} />
                      </View>
                      <Text style={styles.recentLabel}>{meta.label}</Text>
                      <Text style={styles.recentTitle} numberOfLines={2}>
                        {meta.title}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </>
          ) : null}

          {(savedCounts.guide > 0 ||
            savedCounts['daily-life'] > 0 ||
            savedCounts.phrase > 0 ||
            savedCounts.dialogue > 0) ? (
            <>
              <View style={styles.sectionTitleRow}>
                <Text style={styles.sectionTitle}>Đã lưu theo loại</Text>
                <TouchableOpacity onPress={() => navigation.navigate('MainTabs', { screen: 'Saved' })}>
                  <Text style={styles.sectionLink}>Mở tab Đã lưu</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.noteGrid}>
                <TouchableOpacity
                  style={styles.noteCard}
                  onPress={() => navigation.navigate('MainTabs', { screen: 'Saved', params: { filter: 'guide' } })}
                >
                  <View style={[styles.noteIconBg, { backgroundColor: Colors.accent }]}>
                    <Ionicons name="document-text-outline" size={20} color={Colors.primary} />
                  </View>
                  <Text style={styles.noteCount}>{savedCounts.guide}</Text>
                  <Text style={styles.noteTitle}>Thủ tục</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.noteCard}
                  onPress={() => navigation.navigate('MainTabs', { screen: 'Saved', params: { filter: 'daily-life' } })}
                >
                  <View style={[styles.noteIconBg, { backgroundColor: Colors.successLight }]}>
                    <Ionicons name="sunny-outline" size={20} color={Colors.success} />
                  </View>
                  <Text style={styles.noteCount}>{savedCounts['daily-life']}</Text>
                  <Text style={styles.noteTitle}>Cuộc sống</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.noteCard}
                  onPress={() => navigation.navigate('MainTabs', { screen: 'Saved', params: { filter: 'phrase' } })}
                >
                  <View style={[styles.noteIconBg, { backgroundColor: '#FDECEA' }]}>
                    <Ionicons name="language-outline" size={20} color="#E74C3C" />
                  </View>
                  <Text style={styles.noteCount}>{savedCounts.phrase}</Text>
                  <Text style={styles.noteTitle}>Tiếng Nhật</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.noteCard}
                  onPress={() => navigation.navigate('MainTabs', { screen: 'Saved', params: { filter: 'dialogue' } })}
                >
                  <View style={[styles.noteIconBg, { backgroundColor: '#F3EBF9' }]}>
                    <Ionicons name="chatbubbles-outline" size={20} color="#9B59B6" />
                  </View>
                  <Text style={styles.noteCount}>{savedCounts.dialogue}</Text>
                  <Text style={styles.noteTitle}>Hội thoại</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : null}

          <Text style={styles.sectionTitle}>Duyệt theo chủ đề</Text>
          <HomeCategoryGrid onCategoryPress={handleCategoryPress} />

          <Text style={styles.sectionTitle}>Cho người mới sang Nhật</Text>
          <HomeOnboardingGuides
            onGuidePress={(guideId) => navigation.navigate('AdminDetail', { guideId })}
          />

          {recentlyViewedGuides.length > 0 ? (
            <>
              <Text style={styles.sectionTitle}>Đã xem gần đây</Text>
              <HomeRecentlyViewed
                entries={recentlyViewedGuides}
                onGuidePress={(guideId) => navigation.navigate('AdminDetail', { guideId, source: 'recent_viewed' })}
              />
            </>
          ) : null}

          {savedGuideBookmarks.length > 0 ? (
            <>
              <Text style={styles.sectionTitle}>Đã lưu</Text>
              <HomeSavedGuides
                bookmarks={savedGuideBookmarks}
                onGuidePress={(guideId) => navigation.navigate('AdminDetail', { guideId, source: 'direct' })}
              />
            </>
          ) : null}

          <Text style={styles.sectionTitle}>Hay được dùng</Text>
          <HomeFeaturedGuides
            onGuidePress={(guideId) => navigation.navigate('AdminDetail', { guideId, source: 'featured' })}
          />

          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionTitle}>Cập nhật chính sách quan trọng</Text>
            {visibleUpdates.hasMore ? (
              <TouchableOpacity onPress={() => toggleSection('updates')}>
                <Text style={styles.sectionLink}>
                  {visibleUpdates.expanded ? 'Thu gọn' : 'Xem thêm'}
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
          <View style={styles.updatesContainer}>
            {visibleUpdates.items.map((item) => (
              <TouchableOpacity key={item.id} style={styles.updateCard} onPress={() => navigation.navigate('AdminDetail', { guideId: item.guideId })}>
                <View style={[styles.updateIcon, { backgroundColor: `${item.color}18` }]}>
                  <Ionicons name={item.icon} size={20} color={item.color} />
                </View>
                <View style={styles.updateInfo}>
                  <Text style={styles.updateTitle}>{item.title}</Text>
                  <Text style={styles.updateDesc}>{item.description}</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionTitle}>Gia đình / visa</Text>
            {visibleFamilyGroups.hasMore ? (
              <TouchableOpacity onPress={() => toggleSection('family')}>
                <Text style={styles.sectionLink}>
                  {visibleFamilyGroups.expanded ? 'Thu gọn' : 'Xem thêm'}
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
          <View style={styles.familyGroupsWrap}>
            {visibleFamilyGroups.items.map((group) => (
              <View key={group.id} style={styles.familyGroupCard}>
                <Text style={styles.familyGroupTitle}>{group.title}</Text>
                <Text style={styles.familyGroupDesc}>{group.description}</Text>
                {group.items.map((item, index) => (
                  <TouchableOpacity
                    key={item.id}
                    style={[styles.familyVisaCard, index === 0 && styles.familyVisaCardFirst]}
                    onPress={() => navigation.navigate('AdminDetail', { guideId: item.guideId })}
                  >
                    <View style={[styles.familyVisaIconBg, { backgroundColor: `${item.color}18` }]}>
                      <Ionicons name={item.icon} size={20} color={item.color} />
                    </View>
                    <View style={styles.familyVisaInfo}>
                      <Text style={styles.familyVisaTitle}>{item.title}</Text>
                      <Text style={styles.familyVisaDesc}>{item.description}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.allGuidesCard} onPress={() => navigation.navigate('MainTabs', { screen: 'Admin' })}>
            <View style={styles.allGuidesLeft}>
              <View style={styles.allGuidesIconBg}>
                <Ionicons name="folder-open-outline" size={20} color={Colors.primary} />
              </View>
              <View style={styles.allGuidesText}>
                <Text style={styles.allGuidesTitle}>Xem toàn bộ thủ tục</Text>
                <Text style={styles.allGuidesDesc}>Visa, gia đình, thuế, nenkin, ngân hàng, nhà ở, đời sống — đầy đủ trong tab Thủ tục.</Text>
              </View>
            </View>
            <Ionicons name="arrow-forward-circle" size={26} color={Colors.primary} />
          </TouchableOpacity>

          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionTitle}>Liên hệ khẩn và hỗ trợ</Text>
            <TouchableOpacity onPress={() => navigation.navigate('EmergencyHub')}>
              <Text style={styles.sectionLink}>Mở trung tâm khẩn</Text>
            </TouchableOpacity>
          </View>
          <HomeEmergencyContacts onCall={handleCallEmergency} />

          <View style={styles.bottomPad} />
        </View>
      </ScrollView>
      <ProfileSetupModal
        visible={showProfileModal}
        initialProfile={userProfile}
        onClose={handleDismissProfileModal}
        onSave={handleSaveProfile}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.primary },
  content: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -16,
    paddingTop: 18,
    paddingHorizontal: 16,
  },
  profileHeroCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  profileHeroTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 12,
  },
  profileHeroIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileHeroText: {
    flex: 1,
  },
  profileHeroLabel: {
    fontSize: 11,
    fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.primary,
    marginBottom: 3,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  profileHeroTitle: {
    fontSize: 17,
    fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  profileHeroSummary: {
    fontSize: 12,
    lineHeight: 18,
    color: Colors.textSecondary,
  },
  profileHeroEditBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileActionsWrap: {
    gap: 10,
  },
  profileActionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 16,
    padding: 12,
    backgroundColor: Colors.background,
  },
  profileActionIconBg: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileActionText: {
    flex: 1,
  },
  profileActionTitle: {
    fontSize: 13,
    fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.textPrimary,
    marginBottom: 3,
  },
  profileActionDesc: {
    fontSize: 12,
    lineHeight: 17,
    color: Colors.textSecondary,
  },
  stampBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.success,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
  },
  stampBadgeText: {
    fontSize: 10,
    fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.white,
    letterSpacing: 0.3,
  },
  profileSetupCard: {
    backgroundColor: Colors.accent,
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: `${Colors.primary}28`,
  },
  profileSetupTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  profileSetupIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileSetupText: {
    flex: 1,
  },
  profileSetupTitle: {
    fontSize: 15,
    fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  profileSetupDesc: {
    fontSize: 12,
    lineHeight: 18,
    color: Colors.textSecondary,
  },
  profileSetupTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  profileSetupTag: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: Colors.white,
  },
  profileSetupTagText: {
    fontSize: 11,
    fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.primary,
  },
  alertCard: {
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 10,
    borderWidth: 1,
  },
  alertInfo: { backgroundColor: Colors.accent, borderColor: `${Colors.primary}25` },
  alertMedium: { backgroundColor: Colors.warningLight, borderColor: '#F39C1228' },
  alertHigh: { backgroundColor: Colors.dangerLight, borderColor: '#E74C3C28' },
  alertLeft: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, flex: 1 },
  alertTextContainer: { flex: 1 },
  alertTitle: { fontSize: 13, fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold', color: Colors.textPrimary, marginBottom: 3 },
  alertDesc: { fontSize: 12, color: Colors.textSecondary, lineHeight: 17 },
  priorityCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  priorityLeft: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, flex: 1 },
  priorityIconBg: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  priorityTextBlock: { flex: 1 },
  priorityCardTitle: {
    fontSize: 13,
    fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.textPrimary,
    marginBottom: 3,
  },
  priorityCardDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 17,
  },
  priorityProgressBar: {
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.background,
    marginTop: 8,
    overflow: 'hidden',
  },
  priorityProgressFill: {
    height: '100%',
    borderRadius: 3,
  },
  readyCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  readyLeft: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, flex: 1 },
  readyIconBg: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  readyTextBlock: { flex: 1 },
  readyCardTitle: {
    fontSize: 13,
    fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.textPrimary,
    marginBottom: 3,
  },
  readyCardDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 17,
  },
  sectionTitle: { fontSize: 17, fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold', color: Colors.textPrimary, marginTop: 12, marginBottom: 12 },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    marginBottom: 12,
  },
  sectionActionsInline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sectionLink: { fontSize: 12, fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold', color: Colors.primary },
  recentRow: { gap: 10, paddingRight: 12, marginBottom: 4 },
  noteGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 4 },
  noteCard: {
    width: '47%',
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 14,
    alignItems: 'flex-start',
  },
  noteIconBg: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  noteCount: {
    fontSize: 22,
    fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  noteTitle: {
    fontSize: 13,
    fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textSecondary,
  },
  recentCard: {
    width: 148,
    borderRadius: 16,
    padding: 14,
    backgroundColor: Colors.white,
  },
  recentIconBg: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  recentLabel: { fontSize: 11, fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold', color: Colors.textMuted, marginBottom: 4 },
  recentTitle: { fontSize: 13, fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold', color: Colors.textPrimary, lineHeight: 18 },
  updatesContainer: { gap: 10, marginBottom: 4 },
  updateCard: { backgroundColor: Colors.white, borderRadius: 14, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12, borderWidth: 1, borderColor: Colors.border },
  updateIcon: { width: 42, height: 42, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  updateInfo: { flex: 1 },
  updateTitle: { fontSize: 13, fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold', color: Colors.textPrimary, marginBottom: 3 },
  updateDesc: { fontSize: 12, color: Colors.textSecondary, lineHeight: 17 },
  familyGroupsWrap: { gap: 12 },
  familyGroupCard: { backgroundColor: Colors.white, borderRadius: 16, padding: 14, borderWidth: 1, borderColor: Colors.border },
  familyGroupTitle: { fontSize: 14, fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold', color: Colors.textPrimary, marginBottom: 3 },
  familyGroupDesc: { fontSize: 12, color: Colors.textSecondary, lineHeight: 17, marginBottom: 10 },
  familyVisaCard: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10, borderTopWidth: 1, borderTopColor: Colors.border },
  familyVisaCardFirst: { borderTopWidth: 0, paddingTop: 0 },
  familyVisaIconBg: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  familyVisaInfo: { flex: 1 },
  familyVisaTitle: { fontSize: 13, fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold', color: Colors.textPrimary, marginBottom: 3 },
  familyVisaDesc: { fontSize: 12, color: Colors.textSecondary, lineHeight: 17 },
  allGuidesCard: { backgroundColor: Colors.accent, borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginTop: 12, borderWidth: 1, borderColor: `${Colors.primary}30` },
  allGuidesLeft: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, flex: 1 },
  allGuidesIconBg: { width: 40, height: 40, borderRadius: 12, backgroundColor: Colors.white, justifyContent: 'center', alignItems: 'center' },
  allGuidesText: { flex: 1 },
  allGuidesTitle: { fontSize: 14, fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold', color: Colors.textPrimary, marginBottom: 3 },
  allGuidesDesc: { fontSize: 12, color: Colors.textSecondary, lineHeight: 17 },
  bottomPad: { height: 24 },
});
