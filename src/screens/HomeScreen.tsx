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
import { EMERGENCY_CONTACTS } from '../constants/content';
import { ImportantDate } from '../utils/notifications';
import { RootStackParamList, TabParamList } from '../navigation/AppNavigator';

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
  {
    id: 'admin',
    title: 'Thủ tục\nhành chính',
    icon: 'document-text',
    color: Colors.primary,
    bg: Colors.accent,
    tab: 'Admin',
  },
  {
    id: 'daily',
    title: 'Cuộc sống\nhằng ngày',
    icon: 'sunny',
    color: '#27AE60',
    bg: Colors.successLight,
    tab: 'DailyLife',
  },
  {
    id: 'jobs',
    title: 'Việc làm\nvà quyền lợi',
    icon: 'briefcase',
    color: '#9B59B6',
    bg: '#F3EBF9',
    tab: 'Jobs',
  },
  {
    id: 'japanese',
    title: 'Tiếng\nNhật',
    icon: 'language',
    color: '#E74C3C',
    bg: '#FDECEA',
    tab: 'Japanese',
  },
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
    description:
      'Thêm ngày hết hạn thẻ cư trú, bảo hiểm hoặc giấy tờ để nhận nhắc trước khi quá hạn.',
    urgency: 'info',
    icon: 'calendar-outline',
    screen: 'ImportantDates',
  },
  {
    id: 'tip2',
    title: 'Kiểm tra bảo hiểm y tế',
    description:
      'Người ở Nhật trên 3 tháng thường phải tham gia loại bảo hiểm phù hợp. Nếu chưa rõ, nên kiểm tra lại ngay.',
    urgency: 'medium',
    icon: 'heart-outline',
    screen: 'Admin',
  },
];

const LAW_UPDATES: {
  id: string;
  guideId: string;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}[] = [
  {
    id: 'bike-2026',
    guideId: 'bicycle-rules-2026',
    title: 'Luật xe đạp 2026',
    description:
      'Cần nắm rõ phần blue ticket, dùng điện thoại khi lái và các hành vi dễ bị xử phạt.',
    icon: 'bicycle',
    color: '#E67E22',
  },
  {
    id: 'my-number-health',
    guideId: 'health-insurance',
    title: 'Đi khám và giấy bảo hiểm',
    description:
      'Kiểm tra thẻ bảo hiểm hoặc My Number liên kết bảo hiểm trước khi đi bệnh viện, phòng khám.',
    icon: 'heart',
    color: '#27AE60',
  },
  {
    id: 'training-2027',
    guideId: 'ssw-training-worker-2027',
    title: 'Đổi hệ thống lao động 2026-2027',
    description:
      'Phần 特定技能 và 育成就労 đang có nhiều cập nhật cần theo dõi đúng thời điểm.',
    icon: 'construct',
    color: '#9B59B6',
  },
];

const FAMILY_VISA_GROUPS = [
  {
    id: 'visa-entry',
    title: 'Visa và mời người thân',
    description: 'Đi thẳng vào đúng loại hồ sơ trước khi chuẩn bị giấy tờ.',
    items: [
      {
        id: 'family-stay',
        title: 'Sống cùng gia đình ở Nhật',
        description: 'Bảo lãnh vợ/chồng/con, COE và điều kiện sống dài hạn.',
        icon: 'people',
        color: '#2E86C1',
        guideId: 'family-stay-invitation',
      },
      {
        id: 'visit-relatives',
        title: 'Mời người thân sang thăm',
        description: 'Visa thăm thân ngắn hạn, người mời và người tự chi trả khác nhau thế nào.',
        icon: 'airplane',
        color: '#E67E22',
        guideId: 'short-stay-relative-visit',
      },
      {
        id: 'visa-highlights',
        title: 'Các diện visa đáng chú ý 2026',
        description: 'J-Find, Digital Nomad, Start-up, eVISA và cách phân biệt nhanh.',
        icon: 'globe-outline',
        color: '#8E44AD',
        guideId: 'visa-highlights-2026',
      },
    ],
  },
  {
    id: 'family-life',
    title: 'Gia đình và con nhỏ',
    description: 'Các mốc thực tế sau khi đã sống ở Nhật cùng gia đình.',
    items: [
      {
        id: 'pregnancy-childbirth',
        title: 'Mang thai và sinh con ở Nhật',
        description: 'Mốc trước sinh, sau sinh, trợ cấp và giấy tờ chính phải làm.',
        icon: 'heart-circle',
        color: '#D35454',
        guideId: 'pregnancy-childbirth-postpartum',
      },
      {
        id: 'baby-born-in-japan',
        title: 'Con sinh ở Nhật',
        description: 'Quốc tịch, hộ chiếu, cư trú, My Number và bảo hiểm của em bé.',
        icon: 'happy',
        color: '#F39C12',
        guideId: 'baby-born-in-japan',
      },
      {
        id: 'parents-elderly',
        title: 'Cha mẹ và người thân lớn tuổi',
        description: 'Hiểu đúng giới hạn bảo lãnh dài hạn và các ngoại lệ rất hẹp.',
        icon: 'people-circle',
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
  icon: string;
  color: string;
}

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [activeAlerts, setActiveAlerts] = useState<ActiveAlert[]>([]);

  useFocusEffect(
    useCallback(() => {
      const loadAlerts = async () => {
        try {
          const raw = await AsyncStorage.getItem(StorageKeys.importantDates);
          if (!raw) {
            setActiveAlerts([]);
            return;
          }

          const dates: ImportantDate[] = JSON.parse(raw);
          const today = new Date();
          today.setHours(0, 0, 0, 0);

          const upcoming = dates
            .map((item) => {
              const target = new Date(item.date);
              target.setHours(0, 0, 0, 0);
              const daysLeft = Math.ceil((target.getTime() - today.getTime()) / 86400000);
              return {
                id: item.id,
                label: item.label,
                daysLeft,
                icon: item.icon,
                color: item.color,
              };
            })
            .filter((item) => item.daysLeft > 0 && item.daysLeft <= 90)
            .sort((a, b) => a.daysLeft - b.daysLeft);

          setActiveAlerts(upcoming);
        } catch {
          setActiveAlerts([]);
        }
      };

      loadAlerts();
    }, [])
  );

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
            <Text style={styles.subtitle}>Đồng hành cùng bạn trong đời sống ở Nhật</Text>
          </View>
          <View style={styles.headerButtons}>
            <TouchableOpacity
              style={styles.headerIconBtn}
              onPress={() => navigation.navigate('Saved')}
            >
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
            ? activeAlerts.map((alert) => {
                const isUrgent = alert.daysLeft <= 30;
                const badgeBg = isUrgent ? Colors.dangerLight : Colors.warningLight;
                const badgeText = isUrgent ? Colors.danger : '#B7770D';

                return (
                  <TouchableOpacity
                    key={alert.id}
                    style={[styles.alertCard, isUrgent ? styles.alertHigh : styles.alertMedium]}
                    onPress={() => navigation.navigate('ImportantDates')}
                  >
                    <View style={styles.alertLeft}>
                      <Ionicons
                        name={isUrgent ? 'warning' : 'alarm-outline'}
                        size={22}
                        color={isUrgent ? Colors.danger : Colors.warning}
                      />
                      <View style={styles.alertTextContainer}>
                        <Text style={styles.alertTitle}>{alert.label}</Text>
                        <Text style={styles.alertDesc}>
                          Còn {alert.daysLeft} ngày nữa đến hạn. Nhấn để mở danh sách ngày quan
                          trọng.
                        </Text>
                      </View>
                    </View>
                    <View style={styles.alertAction}>
                      <View style={[styles.daysBadge, { backgroundColor: badgeBg }]}>
                        <Text style={[styles.daysText, { color: badgeText }]}>
                          {alert.daysLeft} ngày
                        </Text>
                      </View>
                      <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
                    </View>
                  </TouchableOpacity>
                );
              })
            : GENERIC_TIPS.map((tip) => (
                <TouchableOpacity
                  key={tip.id}
                  style={[
                    styles.alertCard,
                    tip.urgency === 'medium' ? styles.alertMedium : styles.alertInfo,
                  ]}
                  onPress={() => {
                    if (tip.screen === 'Admin') {
                      navigation.navigate('MainTabs', { screen: 'Admin' });
                    } else {
                      navigation.navigate(tip.screen);
                    }
                  }}
                >
                  <View style={styles.alertLeft}>
                    <Ionicons
                      name={tip.icon}
                      size={22}
                      color={tip.urgency === 'medium' ? Colors.warning : Colors.primary}
                    />
                    <View style={styles.alertTextContainer}>
                      <Text style={styles.alertTitle}>{tip.title}</Text>
                      <Text style={styles.alertDesc}>{tip.description}</Text>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
                </TouchableOpacity>
              ))}

          <Text style={styles.sectionTitle}>Danh mục</Text>
          <View style={styles.categoryGrid}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={[styles.categoryCard, { backgroundColor: cat.bg }]}
                onPress={() => handleCategoryPress(cat.tab)}
              >
                <View style={[styles.categoryIconBg, { backgroundColor: cat.color + '22' }]}>
                  <Ionicons name={cat.icon} size={28} color={cat.color} />
                </View>
                <Text style={[styles.categoryTitle, { color: cat.color }]}>{cat.title}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Cập nhật quan trọng</Text>
          <View style={styles.updatesContainer}>
            {LAW_UPDATES.map((update) => (
              <TouchableOpacity
                key={update.id}
                style={styles.updateCard}
                onPress={() => navigation.navigate('AdminDetail', { guideId: update.guideId })}
              >
                <View style={[styles.updateIcon, { backgroundColor: update.color + '18' }]}>
                  <Ionicons name={update.icon} size={20} color={update.color} />
                </View>
                <View style={styles.updateInfo}>
                  <Text style={styles.updateTitle}>{update.title}</Text>
                  <Text style={styles.updateDesc}>{update.description}</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Gia đình / visa</Text>
          <Text style={styles.sectionSub}>
            Mình rút phần này còn các lối vào chính. Các guide sâu hơn vẫn nằm trong tab Thủ tục.
          </Text>
          <View style={styles.familyGroupsWrap}>
            {FAMILY_VISA_GROUPS.map((group) => (
              <View key={group.id} style={styles.familyGroupCard}>
                <Text style={styles.familyGroupTitle}>{group.title}</Text>
                <Text style={styles.familyGroupDesc}>{group.description}</Text>

                {group.items.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.familyVisaCard}
                    onPress={() => navigation.navigate('AdminDetail', { guideId: item.guideId })}
                  >
                    <View
                      style={[styles.familyVisaIconBg, { backgroundColor: item.color + '18' }]}
                    >
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

          <TouchableOpacity
            style={styles.allGuidesCard}
            onPress={() => navigation.navigate('MainTabs', { screen: 'Admin' })}
          >
            <View style={styles.allGuidesLeft}>
              <View style={styles.allGuidesIconBg}>
                <Ionicons name="grid-outline" size={18} color={Colors.primary} />
              </View>
              <View style={styles.allGuidesText}>
                <Text style={styles.allGuidesTitle}>Xem toàn bộ thủ tục</Text>
                <Text style={styles.allGuidesDesc}>
                  Bao gồm cha mẹ lớn tuổi, ly hôn, nhà trẻ, timeline sau sinh, thuế, nenkin và
                  các guide khác.
                </Text>
              </View>
            </View>
            <Ionicons name="arrow-forward-circle" size={26} color={Colors.primary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickAiCard}
            onPress={() => navigation.navigate('AIChat', { title: 'Trợ lý AI Việt-Nhật' })}
          >
            <View style={styles.quickAiLeft}>
              <View style={styles.quickAiIconBg}>
                <Ionicons name="sparkles" size={20} color={Colors.white} />
              </View>
              <View style={styles.quickAiText}>
                <Text style={styles.quickAiTitle}>Hỏi AI ngay</Text>
                <Text style={styles.quickAiSub}>
                  Dùng khi bạn có câu hỏi cụ thể theo tình huống của riêng mình.
                </Text>
              </View>
            </View>
            <Ionicons name="arrow-forward-circle" size={28} color={Colors.primary} />
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Liên hệ khẩn cấp</Text>
          <View style={styles.emergencyContainer}>
            {EMERGENCY_CONTACTS.map((contact) => (
              <TouchableOpacity
                key={contact.id}
                style={styles.emergencyCard}
                onPress={() => handleCallEmergency(contact.number)}
              >
                <View style={[styles.emergencyIcon, { backgroundColor: contact.color + '18' }]}>
                  <Ionicons name={contact.icon} size={20} color={contact.color} />
                </View>
                <View style={styles.emergencyInfo}>
                  <Text style={styles.emergencyName}>{contact.name}</Text>
                  <Text style={styles.emergencyNameJp}>{contact.nameJp}</Text>
                  <Text style={[styles.emergencyNumber, { color: contact.color }]}>
                    {contact.number}
                  </Text>
                </View>
                <Ionicons name="call-outline" size={18} color={contact.color} />
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
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  header: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greeting: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 2,
  },
  appName: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.white,
  },
  subtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.74)',
    marginTop: 2,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  headerIconBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    paddingHorizontal: 16,
    minHeight: 600,
  },
  alertCard: {
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderWidth: 1,
  },
  alertHigh: {
    backgroundColor: Colors.dangerLight,
    borderColor: '#F5B7B1',
  },
  alertMedium: {
    backgroundColor: Colors.warningLight,
    borderColor: '#FAD7A0',
  },
  alertInfo: {
    backgroundColor: Colors.accent,
    borderColor: Colors.primary + '30',
  },
  alertLeft: {
    flexDirection: 'row',
    flex: 1,
    gap: 10,
  },
  alertTextContainer: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 3,
  },
  alertDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 17,
  },
  alertAction: {
    alignItems: 'flex-end',
    gap: 6,
    marginLeft: 8,
  },
  daysBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  daysText: {
    fontSize: 11,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginTop: 16,
    marginBottom: 10,
  },
  sectionSub: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 18,
    marginTop: -2,
    marginBottom: 12,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 4,
  },
  categoryCard: {
    width: '47%',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  categoryIconBg: {
    width: 52,
    height: 52,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
    textAlign: 'center',
  },
  updatesContainer: {
    gap: 10,
    marginBottom: 4,
  },
  updateCard: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  updateIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  updateInfo: {
    flex: 1,
  },
  updateTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 3,
  },
  updateDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 17,
  },
  familyGroupsWrap: {
    gap: 12,
  },
  familyGroupCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  familyGroupTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 3,
  },
  familyGroupDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 17,
    marginBottom: 10,
  },
  familyVisaCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  familyVisaIconBg: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  familyVisaInfo: {
    flex: 1,
  },
  familyVisaTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 3,
  },
  familyVisaDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 17,
  },
  allGuidesCard: {
    backgroundColor: Colors.accent,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 12,
    borderWidth: 1,
    borderColor: Colors.primary + '30',
  },
  allGuidesLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    flex: 1,
  },
  allGuidesIconBg: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  allGuidesText: {
    flex: 1,
  },
  allGuidesTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 3,
  },
  allGuidesDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 17,
  },
  quickAiCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    marginBottom: 4,
    borderWidth: 1.5,
    borderColor: Colors.primary + '30',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    gap: 12,
  },
  quickAiLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  quickAiText: {
    flex: 1,
  },
  quickAiIconBg: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickAiTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  quickAiSub: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
    lineHeight: 17,
  },
  emergencyContainer: {
    gap: 10,
  },
  emergencyCard: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  emergencyIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emergencyInfo: {
    flex: 1,
  },
  emergencyName: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  emergencyNameJp: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 1,
  },
  emergencyNumber: {
    fontSize: 15,
    fontWeight: '800',
    marginTop: 3,
  },
  bottomPad: {
    height: 24,
  },
});
