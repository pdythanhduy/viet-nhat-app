import React, { useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../constants/colors';
import {
  CONTRACT_REVIEW_CHECKLIST,
  JOBS_CONTENT_META,
  LABOR_RISK_SIGNS,
  LABOR_SUPPORT_PHRASES,
} from '../constants/content';
import { RootStackParamList } from '../navigation/AppNavigator';
import { formatLastUpdated } from '../utils/contentMetadata';
import { markLaborResourceViewed } from '../utils/laborResources';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

function openUrl(url: string) {
  Linking.openURL(url).catch(() =>
    Alert.alert('Không thể mở link', 'Vui lòng kiểm tra kết nối mạng rồi thử lại.')
  );
}

function copyPhrase(jp: string, romaji: string, vn: string) {
  Clipboard.setStringAsync(`${jp}\n${romaji}\n${vn}`).catch(() => {});
  Alert.alert('Đã sao chép', 'Đã copy mẫu câu vào clipboard.');
}

function copyText(title: string, lines: string[]) {
  Clipboard.setStringAsync([title, ...lines].join('\n')).catch(() => {});
  Alert.alert('Đã sao chép', `Đã copy "${title}".`);
}

export default function LaborGuideScreen() {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();

  useFocusEffect(
    useCallback(() => {
      void markLaborResourceViewed('labor-guide');
    }, [])
  );

  const copyRiskSigns = () => {
    copyText(
      'Dấu hiệu công ty rủi ro',
      LABOR_RISK_SIGNS.map(
        (item) =>
          `- ${item.title} [${
            item.severity === 'high' ? 'Rủi ro cao' : 'Cần cảnh giác'
          }]\n${item.description}`
      )
    );
  };

  const copyContractChecklist = () => {
    copyText(
      'Checklist đọc hợp đồng trước khi ký',
      CONTRACT_REVIEW_CHECKLIST.map(
        (item) => `- ${item.label}\nVì sao quan trọng: ${item.whyItMatters}`
      )
    );
  };

  const copyAllLaborPhrases = () => {
    copyText(
      'Câu tiếng Nhật nên dùng',
      LABOR_SUPPORT_PHRASES.flatMap((item) => [
        item.jp,
        item.romaji,
        item.vn,
        `Dùng khi: ${item.useCase}`,
        '',
      ])
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerJp}>労働ガイド</Text>
        <Text style={styles.headerTitle}>Cẩm nang lao động</Text>
        <Text style={styles.headerDesc}>
          Các dấu hiệu rủi ro, checklist đọc hợp đồng và câu tiếng Nhật nên dùng để tự bảo vệ
          mình khi đi làm tại Nhật.
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.metaCard}>
          <Ionicons name="shield-checkmark-outline" size={18} color={Colors.primary} />
          <Text style={styles.metaText}>
            Xác minh nội dung: {formatLastUpdated(JOBS_CONTENT_META.lastUpdated)}. Khi có tranh
            chấp thực tế, hãy đối chiếu lại nguồn chính thức của MHLW hoặc nơi tư vấn lao động.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Dấu hiệu công ty rủi ro</Text>
        <TouchableOpacity style={styles.copyBlockButton} onPress={copyRiskSigns}>
          <Ionicons name="copy-outline" size={15} color={Colors.primary} />
          <Text style={styles.copyBlockText}>Copy block này</Text>
        </TouchableOpacity>
        <View style={styles.card}>
          {LABOR_RISK_SIGNS.map((item, index) => (
            <View
              key={item.title}
              style={[styles.row, index < LABOR_RISK_SIGNS.length - 1 && styles.rowBorder]}
            >
              <View
                style={[
                  styles.badge,
                  item.severity === 'high' ? styles.badgeHigh : styles.badgeMedium,
                ]}
              >
                <Text
                  style={[
                    styles.badgeText,
                    item.severity === 'high' ? styles.badgeTextHigh : styles.badgeTextMedium,
                  ]}
                >
                  {item.severity === 'high' ? 'Rủi ro cao' : 'Cần cảnh giác'}
                </Text>
              </View>
              <View style={styles.textBlock}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemDesc}>{item.description}</Text>
              </View>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Checklist đọc hợp đồng trước khi ký</Text>
        <TouchableOpacity style={styles.copyBlockButton} onPress={copyContractChecklist}>
          <Ionicons name="copy-outline" size={15} color={Colors.primary} />
          <Text style={styles.copyBlockText}>Copy checklist</Text>
        </TouchableOpacity>
        <View style={styles.card}>
          {CONTRACT_REVIEW_CHECKLIST.map((item, index) => (
            <View
              key={item.label}
              style={[styles.row, index < CONTRACT_REVIEW_CHECKLIST.length - 1 && styles.rowBorder]}
            >
              <View style={styles.iconWrap}>
                <Ionicons name="checkmark-circle-outline" size={18} color={Colors.primary} />
              </View>
              <View style={styles.textBlock}>
                <Text style={styles.itemTitle}>{item.label}</Text>
                <Text style={styles.itemDesc}>{item.whyItMatters}</Text>
              </View>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Câu tiếng Nhật nên dùng</Text>
        <TouchableOpacity style={styles.copyBlockButton} onPress={copyAllLaborPhrases}>
          <Ionicons name="copy-outline" size={15} color={Colors.primary} />
          <Text style={styles.copyBlockText}>Copy toàn bộ câu mẫu</Text>
        </TouchableOpacity>
        <View style={styles.card}>
          {LABOR_SUPPORT_PHRASES.map((item, index) => (
            <View
              key={item.jp}
              style={[styles.phraseRow, index < LABOR_SUPPORT_PHRASES.length - 1 && styles.rowBorder]}
            >
              <View style={styles.textBlock}>
                <Text style={styles.jpLine}>{item.jp}</Text>
                <Text style={styles.romajiLine}>{item.romaji}</Text>
                <Text style={styles.vnLine}>{item.vn}</Text>
                <Text style={styles.useCaseLine}>{item.useCase}</Text>
              </View>
              <TouchableOpacity
                style={styles.copyButton}
                onPress={() => copyPhrase(item.jp, item.romaji, item.vn)}
              >
                <Ionicons name="copy-outline" size={16} color={Colors.primary} />
                <Text style={styles.copyButtonText}>Copy</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={styles.linkCard}
          onPress={() => openUrl('https://www.check-roudou.mhlw.go.jp/')}
        >
          <Ionicons name="document-text-outline" size={18} color={Colors.primary} />
          <View style={styles.linkTextBlock}>
            <Text style={styles.linkTitle}>Mở nguồn pháp lý chính thức</Text>
            <Text style={styles.linkSub}>check-roudou.mhlw.go.jp</Text>
          </View>
          <Ionicons name="open-outline" size={16} color={Colors.textMuted} />
        </TouchableOpacity>

        <View style={{ height: 32 + Math.max(insets.bottom, 12) }} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 28,
  },
  headerJp: { fontSize: 13, color: 'rgba(255,255,255,0.75)', marginBottom: 4 },
  headerTitle: { fontSize: 22, fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold', color: Colors.white, marginBottom: 6 },
  headerDesc: { fontSize: 13, color: 'rgba(255,255,255,0.85)', lineHeight: 19 },
  content: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -16,
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  metaCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: Colors.accent,
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.primary + '30',
  },
  metaText: { flex: 1, fontSize: 12, color: Colors.textSecondary, lineHeight: 18 },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textPrimary,
    marginBottom: 12,
    marginTop: 4,
  },
  copyBlockButton: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.accent,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
  },
  copyBlockText: { fontSize: 12, fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold', color: Colors.primary },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, padding: 14 },
  phraseRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, padding: 14 },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: Colors.border },
  badge: { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4, marginTop: 1 },
  badgeHigh: { backgroundColor: Colors.dangerLight },
  badgeMedium: { backgroundColor: Colors.warningLight },
  badgeText: { fontSize: 10, fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold' },
  badgeTextHigh: { color: Colors.danger },
  badgeTextMedium: { color: Colors.warning },
  iconWrap: { width: 18, alignItems: 'center', marginTop: 1 },
  textBlock: { flex: 1 },
  itemTitle: { fontSize: 13, fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold', color: Colors.textPrimary, marginBottom: 4 },
  itemDesc: { fontSize: 12, color: Colors.textSecondary, lineHeight: 18 },
  jpLine: { fontSize: 13, fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold', color: Colors.textPrimary, marginBottom: 4 },
  romajiLine: { fontSize: 11, color: Colors.textMuted, marginBottom: 4, lineHeight: 16 },
  vnLine: { fontSize: 12, color: Colors.textSecondary, lineHeight: 18, marginBottom: 4 },
  useCaseLine: { fontSize: 11, color: Colors.primary, lineHeight: 16 },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: Colors.accent,
  },
  copyButtonText: { fontSize: 12, fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold', color: Colors.primary },
  linkCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.primary + '30',
  },
  linkTextBlock: { flex: 1 },
  linkTitle: { fontSize: 13, fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold', color: Colors.primary },
  linkSub: { fontSize: 11, color: Colors.textMuted, marginTop: 2 },
});
