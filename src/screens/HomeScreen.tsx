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
    title: 'Tìm\nviệc làm',
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
    title: 'Thiết lập nhắc ngày quan trọng',
    description:
      'Thêm ngày hết hạn thẻ cư trú, bảo hiểm... để nhận thông báo trước khi đến hạn.',
    urgency: 'info',
    icon: 'calendar-outline',
    screen: 'ImportantDates',
  },
  {
    id: 'tip2',
    title: 'Bảo hiểm y tế cư dân là bắt buộc',
    description:
      'Người nước ngoài ở Nhật trên 3 tháng thường phải đăng ký bảo hiểm phù hợp. Nếu chưa có, hãy kiểm tra lại ngay.',
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
    title: 'Xe đạp: blue ticket từ 01/04/2026',
    description: 'Dùng điện thoại, vượt đèn đỏ hoặc không dừng ở biển stop có thể bị xử lý.',
    icon: 'bicycle',
    color: '#E67E22',
  },
  {
    id: 'my-number-health',
    guideId: 'health-insurance',
    title: 'Đi khám 2026 cần My Number hoặc 資格確認書',
    description: 'Kiểm tra giấy tờ bảo hiểm trước khi đến bệnh viện hoặc phòng khám.',
    icon: 'heart',
    color: '#27AE60',
  },
  {
    id: 'training-2027',
    guideId: 'ssw-training-worker-2027',
    title: '技能実習 đang chuẩn bị thay 育成就労',
    description: 'Giai đoạn 2026-2027 có nhiều cập nhật chuyển tiếp cần theo dõi.',
    icon: 'construct',
    color: '#9B59B6',
  },
];

const FAMILY_VISA_QUICK_LINKS = [
  {
    id: 'family-stay',
    title: 'Sống cùng gia đình ở Nhật',
    description: 'Đi thẳng tới bảo lãnh 家族滞在 và COE cho vợ/chồng hoặc con.',
    icon: 'people',
    color: '#2E86C1',
    guideId: 'family-stay-invitation',
  },
  {
    id: 'visit-relatives',
    title: 'Mời người thân sang thăm',
    description: 'Mở guide visa thăm thân ngắn hạn và hồ sơ người mời.',
    icon: 'airplane',
    color: '#E67E22',
    guideId: 'short-stay-relative-visit',
  },
  {
    id: 'tourism-evisa',
    title: 'Du lịch / eVISA',
    description: 'Phân biệt tourism, short stay và eVISA hiện hành.',
    icon: 'globe-outline',
    color: '#8E44AD',
    guideId: 'visa-highlights-2026',
  },
  {
    id: 'unsure-visa',
    title: 'Chưa biết mình thuộc diện nào',
    description: 'Xem tổng quan visa và định hướng trước khi chuẩn bị hồ sơ.',
    icon: 'help-circle-outline',
    color: '#5C6B8A',
    guideId: 'visa-status-overview',
  },
  {
    id: 'parents-elderly',
    title: 'Đưa cha mẹ sang Nhật',
    description: 'Giải thích rõ khi nào không thể ở dài hạn và các ngoại lệ rất hẹp.',
    icon: 'people-circle',
    color: '#6C7A99',
    guideId: 'parents-elderly-relatives',
  },
  {
    id: 'pregnancy-childbirth',
    title: 'Mang thai / sinh con ở Nhật',
    description: 'Tổng hợp thủ tục trước sinh, sau sinh, cư trú của em bé và trợ cấp chính.',
    icon: 'heart-circle',
    color: '#D35454',
    guideId: 'pregnancy-childbirth-postpartum',
  },
  {
    id: 'baby-born-in-japan',
    title: 'Con sinh ở Nhật',
    description: 'Quốc tịch, hộ chiếu, cư trú, My Number, bảo hiểm và các mốc đầu đời.',
    icon: 'happy',
    color: '#F39C12',
    guideId: 'baby-born-in-japan',
  },
  {
    id: 'postpartum-30-day-timeline',
    title: '30 ngày đầu sau sinh',
    description: 'Checklist có thể tick trực tiếp: giấy bệnh viện, city hall, trợ cấp và cư trú.',
    icon: 'time',
    color: '#C0397A',
    guideId: 'postpartum-30-day-timeline',
  },
  {
    id: 'nursery-kindergarten',
    title: 'Nhà trẻ / mẫu giáo',
    description: 'Hoikuen, youchien, taikuen, giấy tờ đi làm và thay đổi 2026.',
    icon: 'school',
    color: '#16A085',
    guideId: 'nursery-kindergarten-guide',
  },
  {
    id: 'divorce-custody',
    title: 'Ly hôn / nuôi con',
    description: 'Ly hôn, con ở với ai, đổi họ tên, visa và giấy tờ cư trú sau đó.',
    icon: 'document-attach',
    color: '#7F8C8D',
    guideId: 'divorce-custody-name-residence',
  },
  {
    id: 'renting-home',
    title: 'Thuê nhà / trả nhà',
    description: 'Tiền vào nhà, hủy hợp đồng,退去費, 原状回復 và lưu ý mua nhà.',
    icon: 'home',
    color: '#2980B9',
    guideId: 'renting-and-buying-home',
  },
  {
    id: 'tax-filing',
    title: 'Thuế / 年末調整 / 確定申告',
    description: 'Khi nào công ty làm giúp, khi nào phải tự khai và cách hiểu 扶養.',
    icon: 'receipt',
    color: '#8E44AD',
    guideId: 'tax-year-end-adjustment-filing',
  },
  {
    id: 'pension-refund',
    title: 'Nenkin / miễn giảm / hoàn tiền',
    description: '国民年金, 厚生年金, miễn giảm, du học sinh và 脱退一時金 khi về nước.',
    icon: 'card',
    color: '#2C3E50',
    guideId: 'pension-exemption-refund',
  },
  {
    id: 'banking-remittance',
    title: 'Ngân hàng / chuyển tiền',
    description: 'Mở tài khoản, chuyển tiền, AML và tránh bị khóa tài khoản.',
    icon: 'card-outline',
    color: '#1F618D',
    guideId: 'banking-remittance-anti-fraud',
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
    } else {
      navigation.navigate('MainTabs', { screen: tab });
    }
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
            <Text style={styles.subtitle}>Đồng hành cùng bạn tại Nhật Bản</Text>
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
                          Còn {alert.daysLeft} ngày nữa đến hạn. Nhấn để xem chi tiết.
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
          <View style={styles.familyVisaWrap}>
            {FAMILY_VISA_QUICK_LINKS.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.familyVisaCard}
                onPress={() => navigation.navigate('AdminDetail', { guideId: item.guideId })}
              >
                <View style={[styles.familyVisaIconBg, { backgroundColor: item.color + '18' }]}>
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

          <TouchableOpacity
            style={styles.quickAiCard}
            onPress={() => navigation.navigate('AIChat', { title: 'Trợ lý AI Việt-Nhật' })}
          >
            <View style={styles.quickAiLeft}>
              <View style={styles.quickAiIconBg}>
                <Ionicons name="sparkles" size={20} color={Colors.white} />
              </View>
              <View>
                <Text style={styles.quickAiTitle}>Hỏi trợ lý AI ngay</Text>
                <Text style={styles.quickAiSub}>Mọi câu hỏi về cuộc sống tại Nhật</Text>
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
    color: 'rgba(255,255,255,0.7)',
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
  familyVisaWrap: {
    gap: 10,
  },
  familyVisaCard: {
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
  familyVisaIconBg: {
    width: 42,
    height: 42,
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
  },
  quickAiLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
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
