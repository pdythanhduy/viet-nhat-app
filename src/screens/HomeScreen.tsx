import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../constants/colors';
import { ADMIN_GUIDES } from '../constants/content/adminGuides';
import { loadImportantDates, getDaysUntil } from '../utils/notifications';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useFeatureFlag } from '../hooks/useFeatureFlags';
import ProfileSetupModal from '../components/ProfileSetupModal';
import type { UserProfile } from '../types/profile';
import {
  buildPersonalizedActions,
  getGreeting,
  type ActiveAlert,
  type CategoryTarget,
  type InProgressGuide,
  type PersonalizedAction,
} from './homeScreenContent';
import { HomeHeader } from './home/HomeHeader';
import { HomeSearchCta } from './home/HomeTopCtas';
import {
  QUICK_ACTIONS,
  type QuickAction,
  type QuickActionId,
} from './home/HomeQuickActions';
import { HomeHero, type HomeHeroProps } from './home/HomeHero';
import { HomeCategoryGrid } from './home/HomeCategoryGrid';
import { HomeRecentlyViewed } from './home/HomeRecentlyViewed';
import {
  buildChecklistProgressItems,
  buildCompletedChecklistItems,
  buildGuideMetaChips,
  buildStepProgressItems,
} from './homeScreenData';
import { loadRecentlyViewedGuides, type RecentlyViewedGuide } from '../utils/recentlyViewedGuides';
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
import {
  logHomeQuickActionPressed,
  logHomeSearchPressed,
  logEmergencyCtaOpened,
  logHomeLayoutVariant,
} from '../utils/analytics';
import { getHomeLayoutVariant, getSearcherSignal } from '../utils/searcherSignal';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  // Experimental: surfaced on Home only when the owner enables the flag in Lab.
  const showFuriganaReader = useFeatureFlag('furiganaReader');
  const showNewsReader = useFeatureFlag('newsReader');
  const showN2RecoveryHome = useFeatureFlag('n2RecoveryHome');
  const showJlptRecoveryHome = useFeatureFlag('jlptRecoveryHome');
  const [activeAlerts, setActiveAlerts] = useState<ActiveAlert[]>([]);
  const [recentlyViewedGuides, setRecentlyViewedGuides] = useState<RecentlyViewedGuide[]>([]);
  const [inProgressGuides, setInProgressGuides] = useState<InProgressGuide[]>([]);
  const [inProgressStepGuides, setInProgressStepGuides] = useState<InProgressGuide[]>([]);
  const [completedGuideIds, setCompletedGuideIds] = useState<string[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        // Phase 2C cohorting. The variant no longer switches any layout
        // (the hero covers the cold-start case), but the event still
        // feeds the searcher-vs-browser split in analytics.
        try {
          const searchCount = await getSearcherSignal();
          void logHomeLayoutVariant(getHomeLayoutVariant(searchCount), searchCount);
        } catch {
          // Heuristic failure: no cohort event this focus.
        }

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

        loadRecentlyViewedGuides().then(setRecentlyViewedGuides);
        loadAllGuideChecklistProgress().then((progressMap) => {
          const progressItems = buildChecklistProgressItems(ADMIN_GUIDES, progressMap);
          setInProgressGuides(progressItems);

          setCompletedGuideIds(
            buildCompletedChecklistItems(ADMIN_GUIDES, progressMap).map((item) => item.guideId)
          );
        });

        loadAllGuideStepProgress().then((progressMap) => {
          setInProgressStepGuides(buildStepProgressItems(ADMIN_GUIDES, progressMap));
        });
      };

      loadData();
    }, [])
  );

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
      void logEmergencyCtaOpened('home_quick_action');
      navigation.navigate('EmergencyHub');
      return;
    }
    // "Mất giấy tờ" used to open Search with a generic "thẻ cư trú"
    // query, which dumped users into a long results list instead of
    // the urgent step-by-step they're actually looking for. Now it
    // jumps straight into the dedicated lost-residence-card guide.
    if (action.id === 'lost-document') {
      navigation.navigate('AdminDetail', { guideId: 'lost-residence-card', source: 'quick_action' });
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

  // The hero answers one question — "what should I do right now?" — so
  // only the most urgent candidate gets it: a real deadline beats an
  // unfinished guide, which beats a profile suggestion, which beats
  // asking the user to pick a situation.
  const allInProgress = [...inProgressGuides, ...inProgressStepGuides].filter(
    (item, index, list) => list.findIndex((other) => other.guideId === item.guideId) === index
  );

  const heroAlert = activeAlerts[0];
  const heroProgress = heroAlert ? undefined : allInProgress[0];
  const heroSuggestion =
    heroAlert || heroProgress ? undefined : personalizedActions.find((action) => !isGuideActionCompleted(action));

  const heroProps: HomeHeroProps = heroAlert
    ? {
        variant: 'deadline',
        label: heroAlert.label,
        daysLeft: heroAlert.daysLeft,
        ctaLabel: 'Xem mốc hạn của tôi',
        onPress: () => navigation.navigate('ImportantDates'),
      }
    : heroProgress
    ? {
        variant: 'continue',
        title: heroProgress.title,
        metaChips: buildGuideMetaChips(ADMIN_GUIDES.find((guide) => guide.id === heroProgress.guideId)),
        checked: heroProgress.checked,
        total: heroProgress.total,
        ctaLabel: 'Tiếp tục hướng dẫn',
        onPress: () => navigation.navigate('AdminDetail', { guideId: heroProgress.guideId }),
      }
    : heroSuggestion
    ? {
        variant: 'suggestion',
        title: heroSuggestion.title,
        description: heroSuggestion.description,
        ctaLabel: 'Mở hướng dẫn',
        onPress: () => handleProfileActionPress(heroSuggestion),
      }
    : {
        variant: 'situations',
        actions: QUICK_ACTIONS,
        onActionPress: handleQuickActionPress,
      };

  // Whatever the hero didn't take.
  const continueItems = allInProgress
    .filter((item) => item.guideId !== heroProgress?.guideId)
    .slice(0, 3);

  // Flag-gated extras. These are learning tools on a Home whose job is
  // thủ tục, so they ride as quiet chips rather than full-width cards —
  // News in particular has no other entry point, so it must stay here.
  const tools: { id: string; label: string; icon: keyof typeof Ionicons.glyphMap; onPress: () => void }[] = [];
  if (showNewsReader) {
    tools.push({ id: 'news', label: 'Tin tức Nhật', icon: 'newspaper-outline', onPress: () => navigation.navigate('News') });
  }
  if (showFuriganaReader) {
    tools.push({ id: 'furigana', label: 'Đọc báo tiếng Nhật', icon: 'book-outline', onPress: () => navigation.navigate('Furigana') });
  }
  if (showJlptRecoveryHome) {
    tools.push({ id: 'jlpt', label: 'JLPT Recovery', icon: 'library-outline', onPress: () => navigation.navigate('JlptRecoveryLevels') });
  }
  if (showN2RecoveryHome) {
    tools.push({ id: 'n2', label: 'N2 — 100 ngày', icon: 'school-outline', onPress: () => navigation.navigate('N2Recovery') });
  }

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
          {/* VÙNG 1 — việc của bạn. Một thẻ lớn duy nhất được phép to;
              mọi thứ bên dưới cố tình nhỏ hơn. */}
          <HomeSearchCta onPress={handleSearchCtaPress} />

          {/* Hỏi cẩm nang sits with search rather than in its own card:
              it is the fallback for when searching didn't answer it. */}
          <TouchableOpacity
            style={styles.askLine}
            onPress={() => navigation.navigate('HoiCamNang')}
            activeOpacity={0.7}
          >
            <Ionicons name="chatbubbles-outline" size={15} color={Colors.primary} />
            <Text style={styles.askLineText}>Không tìm thấy? Hỏi cẩm nang →</Text>
          </TouchableOpacity>

          <HomeHero {...heroProps} />

          {/* VÙNG 2 — đang làm dở. Chỉ hiện khi thật sự có dữ liệu. */}
          {continueItems.length > 0 || recentlyViewedGuides.length > 0 ? (
            <View style={styles.zone}>
              <Text style={styles.zoneLabel}>ĐANG LÀM DỞ</Text>

              {continueItems.map((item) => (
                <TouchableOpacity
                  key={item.guideId}
                  style={styles.progressCard}
                  onPress={() => navigation.navigate('AdminDetail', { guideId: item.guideId })}
                  activeOpacity={0.85}
                >
                  <View style={styles.progressCardBody}>
                    <Text style={styles.progressCardTitle} numberOfLines={1}>{item.title}</Text>
                    <View style={styles.progressCardRow}>
                      <View style={styles.progressCardTrack}>
                        <View
                          style={[
                            styles.progressCardFill,
                            { width: `${Math.round((item.checked / item.total) * 100)}%`, backgroundColor: item.color },
                          ]}
                        />
                      </View>
                      <Text style={styles.progressCardCount}>{item.checked}/{item.total}</Text>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
                </TouchableOpacity>
              ))}

              {recentlyViewedGuides.length > 0 ? (
                <HomeRecentlyViewed
                  entries={recentlyViewedGuides}
                  onGuidePress={(guideId) => navigation.navigate('AdminDetail', { guideId, source: 'recent_viewed' })}
                />
              ) : null}
            </View>
          ) : null}

          {/* VÙNG 3 — duyệt thư viện hướng dẫn. */}
          <View style={styles.zone}>
            <Text style={styles.zoneLabel}>DUYỆT</Text>
            <HomeCategoryGrid onCategoryPress={handleCategoryPress} />

            <TouchableOpacity
              onPress={() => navigation.navigate('MainTabs', { screen: 'Admin' })}
              activeOpacity={0.7}
            >
              <Text style={styles.zoneLink}>Xem toàn bộ {ADMIN_GUIDES.length} hướng dẫn →</Text>
            </TouchableOpacity>

            {tools.length > 0 ? (
              <View style={styles.toolWrap}>
                {tools.map((tool) => (
                  <TouchableOpacity
                    key={tool.id}
                    style={styles.toolChip}
                    onPress={tool.onPress}
                    activeOpacity={0.85}
                  >
                    <Ionicons name={tool.icon} size={15} color={Colors.primary} />
                    <Text style={styles.toolChipText}>{tool.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ) : null}
          </View>

          {/* Khẩn cấp: luôn chạm tới được, nhưng thôi chiếm hai thẻ lớn. */}
          <TouchableOpacity
            style={styles.emergencyLine}
            onPress={() => {
              void logEmergencyCtaOpened('home_section_link');
              navigation.navigate('EmergencyHub');
            }}
            activeOpacity={0.7}
          >
            <Ionicons name="call-outline" size={15} color={Colors.danger} />
            <Text style={styles.emergencyLineText}>Liên hệ khẩn cấp — 110 · 119</Text>
          </TouchableOpacity>

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

  // A zone is a labelled band. Its label is deliberately smaller and
  // quieter than the hero's title so the page keeps one focal point.
  zone: { gap: 10, marginTop: 20 },
  zoneLabel: {
    fontSize: 13,
    fontWeight: '800',
    fontFamily: 'BeVietnamPro_800ExtraBold',
    color: '#44506B',
    letterSpacing: 0.3,
  },
  zoneLink: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.primary,
    paddingVertical: 4,
  },

  progressCard: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 14,
    padding: 13,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressCardBody: { flex: 1, gap: 7 },
  progressCardTitle: {
    fontSize: 13,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textPrimary,
  },
  progressCardRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  progressCardTrack: {
    flex: 1,
    height: 5,
    borderRadius: 3,
    backgroundColor: Colors.border,
    overflow: 'hidden',
  },
  progressCardFill: { height: 5 },
  progressCardCount: {
    fontSize: 11,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textSecondary,
  },

  toolWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 2 },
  toolChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    backgroundColor: Colors.accent,
    borderRadius: 11,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  toolChipText: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.primary,
  },

  askLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    marginTop: -2,
    marginBottom: 6,
  },
  askLineText: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.primary,
  },

  emergencyLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    marginTop: 22,
    paddingVertical: 10,
  },
  emergencyLineText: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
    color: '#C0392B',
  },

  content: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -16,
    paddingTop: 18,
    paddingHorizontal: 16,
  },
  bottomPad: { height: 24 },
});
