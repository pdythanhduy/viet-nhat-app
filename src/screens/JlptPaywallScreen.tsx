// JLPT Pro paywall — one-time unlock for N4 · N3 · N2 · N1 (N5 stays free).
//
// Phase 5: UI shell. The buy/restore actions go through services/jlptPurchase,
// which Phase 4 implements with RevenueCat. Until then they show a coming-soon
// notice. On a successful purchase we optimistically flip the local Pro flag;
// the server entitlement (RLS) remains the real gate.

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Colors } from '../constants/colors';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { setJlptProLocal } from '../services/jlptEntitlement';
import {
  getJlptProPrice,
  isJlptPurchaseConfigured,
  purchaseJlptPro,
  restoreJlptPurchases,
} from '../services/jlptPurchase';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const BENEFITS = [
  'Mở khóa toàn bộ N4 · N3 · N2 · N1',
  'Hàng nghìn từ vựng đầy đủ sắc thái, lỗi người Việt hay mắc',
  'Ngữ pháp giải thích + ví dụ, quiz từng ngày',
  'Mua một lần — học trọn đời, không thuê bao',
  'N5 luôn miễn phí để dùng thử',
];

const COMING_SOON_TITLE = 'Sắp ra mắt';
const COMING_SOON_MSG = 'Tính năng thanh toán đang được hoàn thiện. Cảm ơn bạn đã quan tâm!';

export default function JlptPaywallScreen() {
  const navigation = useNavigation<Nav>();
  const [busy, setBusy] = useState<'buy' | 'restore' | null>(null);
  const [price, setPrice] = useState<string | null>(null);
  const configured = isJlptPurchaseConfigured();

  useEffect(() => {
    if (!configured) return;
    let alive = true;
    void getJlptProPrice().then((p) => {
      if (alive) setPrice(p);
    });
    return () => {
      alive = false;
    };
  }, [configured]);

  const handleBuy = async () => {
    if (!configured) {
      Alert.alert(COMING_SOON_TITLE, COMING_SOON_MSG);
      return;
    }
    setBusy('buy');
    try {
      const result = await purchaseJlptPro();
      if (result.ok) {
        setJlptProLocal(true);
        Alert.alert('Đã mở khóa', 'Cảm ơn bạn! N4–N1 đã được mở khóa.');
        navigation.goBack();
      } else if (result.reason !== 'cancelled') {
        Alert.alert('Chưa mua được', 'Vui lòng thử lại sau.');
      }
    } finally {
      setBusy(null);
    }
  };

  const handleRestore = async () => {
    if (!configured) {
      Alert.alert(COMING_SOON_TITLE, COMING_SOON_MSG);
      return;
    }
    setBusy('restore');
    try {
      const result = await restoreJlptPurchases();
      if (result.ok) {
        setJlptProLocal(true);
        Alert.alert('Đã khôi phục', 'Gói Pro của bạn đã được khôi phục.');
        navigation.goBack();
      } else {
        Alert.alert('Không tìm thấy', 'Không có giao dịch nào để khôi phục.');
      }
    } finally {
      setBusy(null);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <View style={styles.heroBadge}>
          <Ionicons name="sparkles" size={26} color={Colors.white} />
        </View>
        <Text style={styles.title}>JLPT Pro</Text>
        <Text style={styles.subtitle}>Mở khóa toàn bộ lộ trình N4 · N3 · N2 · N1</Text>
      </View>

      <View style={styles.card}>
        {BENEFITS.map((b) => (
          <View key={b} style={styles.benefitRow}>
            <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
            <Text style={styles.benefitText}>{b}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.buyBtn, busy === 'buy' && styles.btnBusy]}
        onPress={() => void handleBuy()}
        disabled={busy !== null}
        activeOpacity={0.85}
      >
        {busy === 'buy' ? (
          <ActivityIndicator color={Colors.white} />
        ) : (
          <>
            <Ionicons name="lock-open" size={18} color={Colors.white} />
            <Text style={styles.buyBtnText}>
              {price ? `Mở khóa Pro — ${price}` : 'Mở khóa Pro — mua một lần'}
            </Text>
          </>
        )}
      </TouchableOpacity>

      {price ? (
        <Text style={styles.priceNote}>Thanh toán một lần · không thuê bao</Text>
      ) : null}

      <TouchableOpacity
        style={styles.restoreBtn}
        onPress={() => void handleRestore()}
        disabled={busy !== null}
      >
        <Text style={styles.restoreText}>
          {busy === 'restore' ? 'Đang khôi phục…' : 'Khôi phục mua hàng'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.footNote}>
        Thanh toán an toàn qua {Platform.OS === 'android' ? 'Google Play' : 'App Store'}. N5 luôn miễn phí.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 16, paddingBottom: 40 },
  hero: { alignItems: 'center', paddingVertical: 18 },
  heroBadge: {
    width: 64,
    height: 64,
    borderRadius: 18,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 26,
    fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.textPrimary,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 20,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 16,
    gap: 12,
    marginTop: 12,
    marginBottom: 20,
  },
  benefitRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  benefitText: { flex: 1, fontSize: 14, color: Colors.textPrimary, lineHeight: 21 },
  buyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
  },
  btnBusy: { opacity: 0.7 },
  buyBtnText: { color: Colors.white, fontSize: 16, fontFamily: 'BeVietnamPro_700Bold' },
  priceNote: {
    fontSize: 12,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: 8,
  },
  restoreBtn: { alignItems: 'center', paddingVertical: 14 },
  restoreText: { fontSize: 14, color: Colors.primary, fontFamily: 'BeVietnamPro_600SemiBold' },
  footNote: {
    fontSize: 12,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 4,
  },
});
