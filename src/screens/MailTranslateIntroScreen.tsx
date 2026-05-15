// Phase 1 UI mock — Dịch Thư Nhật landing screen.
// NO consent flow, NO backend. Phase 2 will add consent screen per audit doc section 7.1.

import React from 'react';
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
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../constants/colors';
import type { RootStackParamList } from '../navigation/AppNavigator';

type Nav = NativeStackNavigationProp<RootStackParamList, 'MailTranslateIntro'>;

const BULLETS: { icon: keyof typeof Ionicons.glyphMap; text: string }[] = [
  { icon: 'scan', text: 'Chụp hoặc tải ảnh thư bằng tiếng Nhật' },
  { icon: 'language', text: 'AI nhận diện loại thư + dịch tóm tắt sang tiếng Việt' },
  { icon: 'checkbox', text: 'Gợi ý hành động cần làm và deadline (nếu có)' },
  { icon: 'shield-checkmark', text: 'Cảnh báo thư lừa đảo và link đến hướng dẫn liên quan' },
];

export default function MailTranslateIntroScreen() {
  const navigation = useNavigation<Nav>();

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <View style={styles.heroIconBg}>
            <Ionicons name="mail-open" size={40} color={Colors.primary} />
          </View>
          <Text style={styles.heroTitle}>Dịch Thư Nhật</Text>
          <Text style={styles.heroSubtitle}>
            Nhận thư tiếng Nhật mà không biết đó là gì? Để AI đọc giúp bạn — chỉ trong vài giây.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Tính năng làm gì</Text>
          {BULLETS.map((b, i) => (
            <View key={i} style={styles.bulletRow}>
              <View style={styles.bulletIconBg}>
                <Ionicons name={b.icon} size={18} color={Colors.primary} />
              </View>
              <Text style={styles.bulletText}>{b.text}</Text>
            </View>
          ))}
        </View>

        <View style={styles.phase1Box}>
          <Ionicons name="construct" size={16} color={Colors.warning} />
          <Text style={styles.phase1Text}>
            Đây là bản xem trước (Phase 1): chưa kết nối AI thật. Bạn sẽ thấy 3 ví dụ kết quả mẫu.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.startBtn}
          onPress={() => navigation.navigate('MailCapture')}
          activeOpacity={0.85}
        >
          <Ionicons name="camera" size={20} color={Colors.white} />
          <Text style={styles.startBtnText}>Bắt đầu</Text>
        </TouchableOpacity>

        <Text style={styles.disclaimer}>
          ⚠️ Đây là công cụ tham khảo, không thay thế tư vấn pháp lý / thuế / y tế. Trường hợp quan
          trọng luôn xác minh với cơ quan phát hành hoặc luật sư.
        </Text>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { flex: 1 },
  scrollContent: { padding: 16 },
  hero: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  heroIconBg: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '800',
    fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.textPrimary,
    marginBottom: 8,
    lineHeight: 32,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textPrimary,
    marginBottom: 14,
    lineHeight: 21,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  bulletIconBg: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bulletText: {
    flex: 1,
    fontSize: 13,
    color: Colors.textPrimary,
    lineHeight: 20,
  },
  phase1Box: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: Colors.warningLight,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.warning + '40',
  },
  phase1Text: {
    flex: 1,
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  startBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 15,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  startBtnText: {
    fontSize: 16,
    fontWeight: '800',
    fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.white,
    lineHeight: 24,
  },
  disclaimer: {
    fontSize: 11,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: 16,
    paddingHorizontal: 8,
    lineHeight: 17,
  },
});
