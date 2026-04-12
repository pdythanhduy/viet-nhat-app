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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '../constants/colors';
import { StorageKeys } from '../constants/storageKeys';
import { DAILY_LIFE_TOPICS, EMERGENCY_CONTACTS } from '../constants/content';
import { ImportantDate } from '../utils/notifications';
import { RootStackParamList, TabParamList } from '../navigation/AppNavigator';
import { loadRecentDailyLifeTopics } from '../utils/dailyLifeRecentTopics';
import { loadRecentJapaneseCategories, RecentJapaneseCategory } from '../utils/japaneseRecentCategories';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type CategoryTarget = keyof TabParamList | 'DailyLife';
type TipScreen = 'ImportantDates' | 'Admin';

const CATEGORIES: {
  id: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  bg: string;
  tab: CategoryTarget;
}[] = [
  { id: 'admin', title: 'Thủ tục\nhành chính', icon: 'document-text', color: Colors.primary, bg: Colors.accent, tab: 'Admin' },
  { id: 'daily', title: 'Cuộc sống\nhằng ngày', icon: 'sunny', color: '#27AE60', bg: Colors.successLight, tab: 'DailyLife' },
  { id: 'jobs', title: 'Việc làm\nvà quyền lợi', icon: 'briefcase', color: '#9B59B6', bg: '#F3EBF9', tab: 'Jobs' },
  { id: 'japanese', title: 'Tiếng\nNhật', icon: 'language', color: '#E74C3C', bg: '#FDECEA', tab: 'Japanese' },
];

const GENERIC_TIPS: {
  id: string;
  title: string;
  description: string;
  urgency: 'info' | 'medium';
  icon: keyof typeof Ionicons.glyphMap;
  screen: TipScreen;
}[] = [
  {
    id: 'tip1',
    title: 'Thiết lập ngày quan trọng',
    description: 'Thêm ngày hết hạn thẻ cư trú, bảo hiểm hoặc giấy tờ cá nhân để app nhắc trước khi quá hạn.',
    urgency: 'info',
    icon: 'calendar-outline',
    screen: 'ImportantDates',
  },
  {
    id: 'tip2',
    title: 'Kiểm tra lại bảo hiểm y tế',
    description: 'Nếu sống ở Nhật trên 3 tháng mà vẫn chưa chắc mình thuộc diện bảo hiểm nào, nên rà lại sớm.',
    urgency: 'medium',
    icon: 'heart-outline',
    screen: 'Admin',
  },
];

const LAW_UPDATES = [
  {
    id: 'bike-2026',
    guideId: 'bicycle-rules-2026',
    title: 'Luật xe đạp 2026',
    description: 'Nắm phần blue ticket, điện thoại khi lái và các lỗi dễ bị phạt.',
    icon: 'bicycle' as keyof typeof Ionicons.glyphMap,
    color: '#E67E22',
  },
  {
    id: 'health-insurance',
    guideId: 'health-insurance',
    title: 'Đi khám và giấy bảo hiểm',
    description: 'Kiểm tra lại thẻ bảo hiểm hoặc My Number liên kết bảo hiểm trước khi đi khám.',
    icon: 'heart' as keyof typeof Ionicons.glyphMap,
    color: '#27AE60',
  },
  {
    id: 'labor-reform',
    guideId: 'ssw-training-worker-2027',
    title: 'Cập nhật lao động 2026-2027',
    description: 'Phần kỹ năng đặc định và cải cách lao động cần theo dõi đúng thời điểm.',
    icon: 'construct' as keyof typeof Ionicons.glyphMap,
    color: '#9B59B6',
  },
];

const ONBOARDING_GUIDES = [
  {
    guideId: 'first-7-days-in-japan',
    title: '7 ngày đầu mới sang Nhật',
    description: 'Checklist giấy tờ, địa chỉ, bảo hiểm, sim và ngân hàng trong tuần đầu.',
    icon: 'rocket-outline' as keyof typeof Ionicons.glyphMap,
  },
  {
    guideId: 'first-30-days-work-study-japan',
    title: '30 ngày đầu đi làm / đi học',
    description: 'Rà lại việc đi làm, trường lớp, tiền bạc, đi lại và giấy tờ trong tháng đầu.',
    icon: 'calendar-outline' as keyof typeof Ionicons.glyphMap,
  },
  {
    guideId: 'first-90-days-in-japan',
    title: '90 ngày đầu ở Nhật',
    description: 'Tổng rà 3 tháng đầu: giấy tờ, tiền bạc, sức khỏe và các rủi ro dễ bỏ sót.',
    icon: 'map-outline' as keyof typeof Ionicons.glyphMap,
  },
];

const FAMILY_VISA_GROUPS = [
  {
    id: 'visa-entry',
    title: 'Visa và mời người thân',
    description: 'Chọn đúng loại hồ sơ ngay từ đầu để đỡ mất thời gian hỏi lại.',
    items: [
      {
        id: 'family-stay',
        title: 'Sống cùng gia đình ở Nhật',
        description: 'Bảo lãnh vợ/chồng/con, COE và điều kiện sống dài hạn.',
        icon: 'people' as keyof typeof Ionicons.glyphMap,
        color: '#2E86C1',
        guideId: 'family-stay-invitation',
      },
      {
        id: 'visit-relatives',
        title: 'Mời người thân sang thăm',
        description: 'Visa thăm thân ngắn hạn, hồ sơ người mời và người đi khác nhau thế nào.',
        icon: 'airplane' as keyof typeof Ionicons.glyphMap,
        color: '#E67E22',
        guideId: 'short-stay-relative-visit',
      },
      {
        id: 'visa-highlights',
        title: 'Các diện visa đáng chú ý 2026',
        description: 'J-Find, Digital Nomad, Start-up, eVISA và cách phân biệt nhanh.',
        icon: 'globe-outline' as keyof typeof Ionicons.glyphMap,
        color: '#8E44AD',
        guideId: 'visa-highlights-2026',
      },
    ],
  },
  {
    id: 'family-life',
    title: 'Gia đình và con nhỏ',
    description: 'Các việc hay phát sinh sau khi đã sống ở Nhật cùng gia đình.',
    items: [
      {
        id: 'pregnancy-childbirth',
        title: 'Mang thai và sinh con ở Nhật',
        description: 'Các mốc trước sinh, sau sinh, trợ cấp và giấy tờ bắt buộc.',
        icon: 'heart-circle' as keyof typeof Ionicons.glyphMap,
        color: '#D35454',
        guideId: 'pregnancy-childbirth-postpartum',
      },
      {
        id: 'baby-born-in-japan',
        title: 'Con sinh ở Nhật',
        description: 'Quốc tịch, hộ chiếu, cư trú, My Number và bảo hiểm của em bé.',
        icon: 'happy' as keyof typeof Ionicons.glyphMap,
        color: '#F39C12',
        guideId: 'baby-born-in-japan',
      },
      {
        id: 'parents-elderly',
        title: 'Cha mẹ và người thân lớn tuổi',
        description: 'Hiểu đúng giới hạn bảo lãnh dài hạn và các ngoại lệ hiếm.',
        icon: 'people-circle' as keyof typeof Ionicons.glyphMap,
        color: '#6C7A99',
        guideId: 'parents-elderly-relatives',
      },
    ],
  },
] as const;

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Chào buổi sáng';
  if (hour < 18) return 'Chào buổi chiều';
  return 'Chào buổi tối';
}

interface ActiveAlert {
  id: string;
  label: string;
  daysLeft: number;
}

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [activeAlerts, setActiveAlerts] = useState<ActiveAlert[]>([]);
  const [recentDailyTopicIds, setRecentDailyTopicIds] = useState<string[]>([]);
  const [recentJapaneseCategories, setRecentJapaneseCategories] = useState<RecentJapaneseCategory[]>([]);

  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        try {
          const raw = await AsyncStorage.getItem(StorageKeys.importantDates);
          if (!raw) {
            setActiveAlerts([]);
          } else {
            const dates: ImportantDate[] = JSON.parse(raw);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const upcoming = dates
              .map((item) => {
                const target = new Date(item.date);
                target.setHours(0, 0, 0, 0);
                const daysLeft = Math.ceil((target.getTime() - today.getTime()) / 86400000);
                return { id: item.id, label: item.label, daysLeft };
              })
              .filter((item) => item.daysLeft > 0 && item.daysLeft <= 90)
              .sort((a, b) => a.daysLeft - b.daysLeft);

            setActiveAlerts(upcoming);
          }
        } catch {
          setActiveAlerts([]);
        }

        loadRecentDailyLifeTopics().then((items) => setRecentDailyTopicIds(items.map((item) => item.topicId)));
        loadRecentJapaneseCategories().then(setRecentJapaneseCategories);
      };

      loadData();
    }, [])
  );

  const recentDailyTopics = recentDailyTopicIds
    .map((topicId) => DAILY_LIFE_TOPICS.find((topic) => topic.id === topicId))
    .filter(Boolean);

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

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{getGreeting()}</Text>
            <Text style={styles.appName}>Việt-Nhật</Text>
            <Text style={styles.subtitle}>Đồng hành cùng bạn trong đời sống thực tế ở Nhật</Text>
          </View>
          <View style={styles.headerButtons}>
            <TouchableOpacity style={styles.headerIconBtn} onPress={() => navigation.navigate('Saved')}>
              <Ionicons name="bookmark-outline" size={22} color={Colors.white} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.headerIconBtn}
              onPress={() => navigation.navigate('AIChat', { title: 'Trợ lý AI' })}
            >
              <Ionicons name="chatbubble-ellipses" size={22} color={Colors.white} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.content}>
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

          <Text style={styles.sectionTitle}>Đi nhanh vào đúng chỗ</Text>
          <View style={styles.categoryGrid}>
            {CATEGORIES.map((category) => (
              <TouchableOpacity key={category.id} style={styles.categoryCard} onPress={() => handleCategoryPress(category.tab)}>
                <View style={[styles.categoryIconBg, { backgroundColor: category.bg }]}>
                  <Ionicons name={category.icon} size={24} color={category.color} />
                </View>
                <Text style={[styles.categoryTitle, { color: category.color }]}>{category.title}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Mới sang Nhật</Text>
          {ONBOARDING_GUIDES.map((guide) => (
            <TouchableOpacity
              key={guide.guideId}
              style={styles.firstStepsCard}
              onPress={() => navigation.navigate('AdminDetail', { guideId: guide.guideId })}
            >
              <View style={styles.firstStepsLeft}>
                <View style={styles.firstStepsIconBg}>
                  <Ionicons name={guide.icon} size={20} color={Colors.primary} />
                </View>
                <View style={styles.firstStepsText}>
                  <Text style={styles.firstStepsTitle}>{guide.title}</Text>
                  <Text style={styles.firstStepsDesc}>{guide.description}</Text>
                </View>
              </View>
              <Ionicons name="arrow-forward-circle" size={26} color={Colors.primary} />
            </TouchableOpacity>
          ))}

          <Text style={styles.sectionTitle}>Điểm cần để ý</Text>
          <View style={styles.updatesContainer}>
            {LAW_UPDATES.map((item) => (
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

          <Text style={styles.sectionTitle}>Gia đình / visa</Text>
          <View style={styles.familyGroupsWrap}>
            {FAMILY_VISA_GROUPS.map((group) => (
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
                <Text style={styles.allGuidesDesc}>Mở tất cả guide về visa, gia đình, thuế, nenkin, ngân hàng, nhà ở và đời sống.</Text>
              </View>
            </View>
            <Ionicons name="arrow-forward-circle" size={26} color={Colors.primary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickAiCard} onPress={() => navigation.navigate('AIChat', { title: 'Trợ lý AI' })}>
            <View style={styles.quickAiLeft}>
              <View style={styles.quickAiIconBg}>
                <Ionicons name="sparkles" size={20} color={Colors.white} />
              </View>
              <View style={styles.quickAiText}>
                <Text style={styles.quickAiTitle}>Hỏi AI theo tình huống</Text>
                <Text style={styles.quickAiSub}>Dùng khi bạn có câu hỏi cụ thể như đổi nhà, đi khám, đổi việc hay mời người thân sang Nhật.</Text>
              </View>
            </View>
            <Ionicons name="arrow-forward-circle" size={26} color={Colors.primary} />
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Liên hệ khẩn và hỗ trợ</Text>
          <View style={styles.emergencyContainer}>
            {EMERGENCY_CONTACTS.map((contact) => (
              <TouchableOpacity key={contact.id} style={styles.emergencyCard} onPress={() => handleCallEmergency(contact.number)}>
                <View style={[styles.emergencyIcon, { backgroundColor: `${contact.color}18` }]}>
                  <Ionicons name={contact.icon} size={22} color={contact.color} />
                </View>
                <View style={styles.emergencyInfo}>
                  <Text style={styles.emergencyName}>{contact.name}</Text>
                  <Text style={styles.emergencyNameJp}>{contact.nameJp}</Text>
                  <Text style={[styles.emergencyNumber, { color: contact.color }]}>{contact.number}</Text>
                </View>
                <Ionicons name="call" size={18} color={contact.color} />
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.bottomPad} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.primary },
  header: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greeting: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginBottom: 4 },
  appName: { fontSize: 28, fontWeight: '800', color: Colors.white },
  subtitle: { marginTop: 4, fontSize: 13, color: 'rgba(255,255,255,0.82)', lineHeight: 18, maxWidth: 220 },
  headerButtons: { flexDirection: 'row', gap: 10 },
  headerIconBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.14)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -16,
    paddingTop: 18,
    paddingHorizontal: 16,
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
  alertTitle: { fontSize: 13, fontWeight: '800', color: Colors.textPrimary, marginBottom: 3 },
  alertDesc: { fontSize: 12, color: Colors.textSecondary, lineHeight: 17 },
  sectionTitle: { fontSize: 17, fontWeight: '800', color: Colors.textPrimary, marginTop: 12, marginBottom: 12 },
  recentRow: { gap: 10, paddingRight: 12, marginBottom: 4 },
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
  recentLabel: { fontSize: 11, fontWeight: '700', color: Colors.textMuted, marginBottom: 4 },
  recentTitle: { fontSize: 13, fontWeight: '800', color: Colors.textPrimary, lineHeight: 18 },
  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 8 },
  categoryCard: { width: '47%', borderRadius: 16, padding: 16, alignItems: 'center', backgroundColor: Colors.white },
  categoryIconBg: { width: 52, height: 52, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  categoryTitle: { fontSize: 14, fontWeight: '700', lineHeight: 20, textAlign: 'center' },
  firstStepsCard: {
    backgroundColor: Colors.accent,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: `${Colors.primary}30`,
  },
  firstStepsLeft: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, flex: 1 },
  firstStepsIconBg: { width: 40, height: 40, borderRadius: 12, backgroundColor: Colors.white, justifyContent: 'center', alignItems: 'center' },
  firstStepsText: { flex: 1 },
  firstStepsTitle: { fontSize: 14, fontWeight: '800', color: Colors.textPrimary, marginBottom: 3 },
  firstStepsDesc: { fontSize: 12, color: Colors.textSecondary, lineHeight: 17 },
  updatesContainer: { gap: 10, marginBottom: 4 },
  updateCard: { backgroundColor: Colors.white, borderRadius: 14, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12, borderWidth: 1, borderColor: Colors.border },
  updateIcon: { width: 42, height: 42, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  updateInfo: { flex: 1 },
  updateTitle: { fontSize: 13, fontWeight: '800', color: Colors.textPrimary, marginBottom: 3 },
  updateDesc: { fontSize: 12, color: Colors.textSecondary, lineHeight: 17 },
  familyGroupsWrap: { gap: 12 },
  familyGroupCard: { backgroundColor: Colors.white, borderRadius: 16, padding: 14, borderWidth: 1, borderColor: Colors.border },
  familyGroupTitle: { fontSize: 14, fontWeight: '800', color: Colors.textPrimary, marginBottom: 3 },
  familyGroupDesc: { fontSize: 12, color: Colors.textSecondary, lineHeight: 17, marginBottom: 10 },
  familyVisaCard: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10, borderTopWidth: 1, borderTopColor: Colors.border },
  familyVisaCardFirst: { borderTopWidth: 0, paddingTop: 0 },
  familyVisaIconBg: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  familyVisaInfo: { flex: 1 },
  familyVisaTitle: { fontSize: 13, fontWeight: '800', color: Colors.textPrimary, marginBottom: 3 },
  familyVisaDesc: { fontSize: 12, color: Colors.textSecondary, lineHeight: 17 },
  allGuidesCard: { backgroundColor: Colors.accent, borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginTop: 12, borderWidth: 1, borderColor: `${Colors.primary}30` },
  allGuidesLeft: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, flex: 1 },
  allGuidesIconBg: { width: 40, height: 40, borderRadius: 12, backgroundColor: Colors.white, justifyContent: 'center', alignItems: 'center' },
  allGuidesText: { flex: 1 },
  allGuidesTitle: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary, marginBottom: 3 },
  allGuidesDesc: { fontSize: 12, color: Colors.textSecondary, lineHeight: 17 },
  quickAiCard: { backgroundColor: Colors.white, borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12, marginBottom: 4, borderWidth: 1.5, borderColor: `${Colors.primary}30`, gap: 12 },
  quickAiLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  quickAiText: { flex: 1 },
  quickAiIconBg: { width: 44, height: 44, borderRadius: 12, backgroundColor: Colors.primary, justifyContent: 'center', alignItems: 'center' },
  quickAiTitle: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary },
  quickAiSub: { fontSize: 12, color: Colors.textSecondary, marginTop: 2, lineHeight: 17 },
  emergencyContainer: { gap: 10 },
  emergencyCard: { backgroundColor: Colors.white, borderRadius: 14, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12 },
  emergencyIcon: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  emergencyInfo: { flex: 1 },
  emergencyName: { fontSize: 13, fontWeight: '700', color: Colors.textPrimary },
  emergencyNameJp: { fontSize: 11, color: Colors.textMuted, marginTop: 1 },
  emergencyNumber: { fontSize: 15, fontWeight: '800', marginTop: 3 },
  bottomPad: { height: 24 },
});
