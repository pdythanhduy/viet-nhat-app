import React from 'react';
import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Colors } from '../constants/colors';
import { EMERGENCY_CONTACTS } from '../constants/content';
import { RootStackParamList } from '../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const EMERGENCY_SCENARIOS = [
  {
    id: 'danger-now',
    title: 'Đang có nguy hiểm ngay lúc này',
    description: 'Tai nạn, đe dọa, bị tấn công, cháy nổ, ngất, khó thở hoặc cần xe cứu thương.',
    color: Colors.danger,
    icon: 'warning-outline' as keyof typeof Ionicons.glyphMap,
    steps: [
      'Gọi 110 khi cần cảnh sát hoặc 119 khi cần cứu thương/cứu hỏa.',
      'Nói ngắn gọn địa điểm hiện tại, điều gì đang xảy ra và có ai bị thương không.',
      'Nếu không nói rõ được tiếng Nhật, mở điện thoại, đọc địa chỉ hoặc nhờ người xung quanh gọi giúp.',
    ],
  },
  {
    id: 'lost-documents',
    title: 'Mất giấy tờ quan trọng',
    description: 'Mất hộ chiếu, thẻ cư trú, ví hoặc giấy tờ liên quan cư trú.',
    color: '#E67E22',
    icon: 'id-card-outline' as keyof typeof Ionicons.glyphMap,
    steps: [
      'Ghi lại lần cuối bạn nhìn thấy giấy tờ và nơi có thể đã làm rơi.',
      'Báo cảnh sát càng sớm càng tốt để lấy giấy xác nhận mất đồ nếu cần.',
      'Sau đó vào mục thủ tục để rà lại hướng xử lý hộ chiếu, thẻ cư trú và hồ sơ thay thế.',
    ],
    action: { kind: 'tab' as const, tab: 'Admin' as const, label: 'Mở thủ tục hành chính' },
  },
  {
    id: 'labor-abuse',
    title: 'Bị nợ lương, giữ giấy tờ hoặc ép làm quá mức',
    description: 'Không nên xử lý một mình nếu công ty có dấu hiệu vi phạm rõ.',
    color: '#8E44AD',
    icon: 'briefcase-outline' as keyof typeof Ionicons.glyphMap,
    steps: [
      'Giữ lại bằng chứng: tin nhắn, bảng lương, lịch làm, hợp đồng hoặc ảnh chụp tài liệu.',
      'Không giao thêm giấy tờ gốc khi chưa hiểu rõ lý do.',
      'Mở ngay luồng hỗ trợ để xem cách đi tiếp và nơi cần liên hệ.',
    ],
    action: { kind: 'screen' as const, screen: 'LaborHelp' as const, label: 'Mở mục cần giúp gì' },
  },
  {
    id: 'medical-help',
    title: 'Cần đi khám hoặc cần hỗ trợ y tế gấp',
    description: 'Dùng khi chưa chắc nên gọi cấp cứu hay đi bệnh viện, hoặc cần chuẩn bị nhanh giấy tờ.',
    color: '#27AE60',
    icon: 'medkit-outline' as keyof typeof Ionicons.glyphMap,
    steps: [
      'Nếu có dấu hiệu nguy hiểm tính mạng, gọi 119 trước.',
      'Nếu chưa đến mức cấp cứu, chuẩn bị thẻ bảo hiểm, giấy tờ tùy thân và thông tin thuốc đang dùng.',
      'Có thể mở mục đời sống để xem lại luồng y tế, bảo hiểm và các lưu ý cần biết.',
    ],
    action: { kind: 'screen' as const, screen: 'DailyLife' as const, label: 'Mở đời sống hằng ngày' },
  },
];

export default function EmergencyHubScreen() {
  const navigation = useNavigation<NavigationProp>();

  const handleCall = (number: string) => {
    const tel = number.split('/')[0].trim().replace(/\s/g, '');
    Linking.openURL(`tel:${tel}`).catch(() =>
      Alert.alert('Không thể gọi', 'Vui lòng thử lại hoặc gọi trực tiếp từ ứng dụng điện thoại.')
    );
  };

  const handleAction = (action: NonNullable<(typeof EMERGENCY_SCENARIOS)[number]['action']>) => {
    if (action.kind === 'tab') {
      navigation.navigate('MainTabs', { screen: action.tab });
      return;
    }

    navigation.navigate(action.screen);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={Colors.white} />
        </TouchableOpacity>
        <View style={styles.headerText}>
          <Text style={styles.headerLabel}>Khẩn cấp</Text>
          <Text style={styles.headerTitle}>Đi thẳng vào việc cần làm</Text>
          <Text style={styles.headerDesc}>
            Dùng màn này khi bạn cần phản ứng nhanh, gọi đúng nơi và không muốn mất thời gian tìm lại nội dung.
          </Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.alertBox}>
          <Ionicons name="warning-outline" size={18} color={Colors.danger} />
          <Text style={styles.alertText}>
            Nếu có nguy cơ với tính mạng hoặc an toàn ngay lúc này, hãy gọi 110 hoặc 119 trước. App chỉ hỗ trợ định hướng nhanh.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Tình huống khẩn thường gặp</Text>
        <View style={styles.scenarioWrap}>
          {EMERGENCY_SCENARIOS.map((scenario) => (
            <View key={scenario.id} style={styles.scenarioCard}>
              <View style={styles.scenarioTop}>
                <View style={[styles.scenarioIcon, { backgroundColor: `${scenario.color}18` }]}>
                  <Ionicons name={scenario.icon} size={20} color={scenario.color} />
                </View>
                <View style={styles.scenarioText}>
                  <Text style={styles.scenarioTitle}>{scenario.title}</Text>
                  <Text style={styles.scenarioDesc}>{scenario.description}</Text>
                </View>
              </View>

              {scenario.steps.map((step) => (
                <View key={step} style={styles.stepRow}>
                  <View style={[styles.stepDot, { backgroundColor: scenario.color }]} />
                  <Text style={styles.stepText}>{step}</Text>
                </View>
              ))}

              {scenario.action ? (
                <TouchableOpacity style={styles.scenarioAction} onPress={() => handleAction(scenario.action)}>
                  <Text style={[styles.scenarioActionText, { color: scenario.color }]}>{scenario.action.label}</Text>
                  <Ionicons name="arrow-forward" size={15} color={scenario.color} />
                </TouchableOpacity>
              ) : null}
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Gọi nhanh</Text>
        <View style={styles.contactsWrap}>
          {EMERGENCY_CONTACTS.map((contact) => (
            <TouchableOpacity key={contact.id} style={styles.contactCard} onPress={() => handleCall(contact.number)}>
              <View style={[styles.contactIcon, { backgroundColor: `${contact.color}18` }]}>
                <Ionicons name={contact.icon} size={20} color={contact.color} />
              </View>
              <View style={styles.contactText}>
                <Text style={styles.contactTitle}>{contact.name}</Text>
                <Text style={styles.contactJp}>{contact.nameJp}</Text>
                <Text style={[styles.contactNumber, { color: contact.color }]}>{contact.number}</Text>
              </View>
              <Ionicons name="call" size={18} color={contact.color} />
            </TouchableOpacity>
          ))}
        </View>

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
    backgroundColor: Colors.primaryDark,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 22,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  backBtn: {
    paddingTop: 2,
  },
  headerText: {
    flex: 1,
  },
  headerLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.78)',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.white,
    marginBottom: 6,
  },
  headerDesc: {
    fontSize: 13,
    lineHeight: 19,
    color: 'rgba(255,255,255,0.9)',
  },
  content: {
    flex: 1,
    marginTop: -10,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: Colors.background,
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  alertBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    padding: 14,
    borderRadius: 16,
    backgroundColor: Colors.dangerLight,
    borderWidth: 1,
    borderColor: '#f2c8c2',
    marginBottom: 14,
  },
  alertText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
    color: Colors.textPrimary,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 10,
  },
  scenarioWrap: {
    gap: 12,
    marginBottom: 14,
  },
  scenarioCard: {
    backgroundColor: Colors.white,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  scenarioTop: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 10,
  },
  scenarioIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scenarioText: {
    flex: 1,
  },
  scenarioTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  scenarioDesc: {
    fontSize: 12,
    lineHeight: 18,
    color: Colors.textSecondary,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginTop: 10,
  },
  stepDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginTop: 6,
  },
  stepText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
    color: Colors.textSecondary,
  },
  scenarioAction: {
    marginTop: 12,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 999,
    backgroundColor: Colors.background,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  scenarioActionText: {
    fontSize: 12,
    fontWeight: '700',
  },
  contactsWrap: {
    gap: 10,
  },
  contactCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  contactIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactText: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  contactJp: {
    fontSize: 11,
    color: Colors.textMuted,
    marginBottom: 4,
  },
  contactNumber: {
    fontSize: 14,
    fontWeight: '800',
  },
});
