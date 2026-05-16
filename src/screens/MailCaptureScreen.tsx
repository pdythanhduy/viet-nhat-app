// Phase 1 UI mock — capture screen.
// No real camera/library picker. User picks 1 of 3 sample mails which simulates an upload.
// Phase 2 will replace sample picker with expo-camera + expo-image-picker.

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
import { MAIL_SAMPLES } from '../constants/aiMailSamples';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { track } from '../utils/analytics';

type Nav = NativeStackNavigationProp<RootStackParamList, 'MailCapture'>;

export default function MailCaptureScreen() {
  const navigation = useNavigation<Nav>();

  const handlePickSample = (sampleId: string) => {
    track('mail_image_uploaded');
    navigation.navigate('MailProcessing', { sampleId });
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.cameraPlaceholder}>
          <Ionicons name="camera-outline" size={56} color={Colors.textMuted} />
          <Text style={styles.cameraPlaceholderText}>
            Khu vực camera (Phase 2)
          </Text>
        </View>

        <View style={styles.disabledRow}>
          <TouchableOpacity style={[styles.actionBtn, styles.actionBtnDisabled]} disabled>
            <Ionicons name="camera" size={20} color={Colors.textMuted} />
            <Text style={styles.actionBtnTextDisabled}>Chụp ảnh</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, styles.actionBtnDisabled]} disabled>
            <Ionicons name="images" size={20} color={Colors.textMuted} />
            <Text style={styles.actionBtnTextDisabled}>Chọn từ thư viện</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>HOẶC THỬ VỚI ẢNH MẪU</Text>
          <View style={styles.dividerLine} />
        </View>

        <Text style={styles.sectionDesc}>
          Chọn một ví dụ thư Nhật để xem cách AI sẽ phân tích kết quả.
        </Text>

        {MAIL_SAMPLES.map((sample) => (
          <TouchableOpacity
            key={sample.id}
            style={styles.sampleCard}
            onPress={() => handlePickSample(sample.id)}
            activeOpacity={0.85}
          >
            <View style={[styles.sampleIconBg, { backgroundColor: sample.iconColor + '20' }]}>
              <Ionicons name={sample.iconName} size={26} color={sample.iconColor} />
            </View>
            <View style={styles.sampleTexts}>
              <Text style={styles.sampleTitle}>{sample.documentTypeVi}</Text>
              <Text style={styles.sampleDesc} numberOfLines={2}>
                {sample.summaryVi}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
          </TouchableOpacity>
        ))}

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { flex: 1 },
  scrollContent: { padding: 16 },
  cameraPlaceholder: {
    height: 200,
    borderRadius: 16,
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.border,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 14,
  },
  cameraPlaceholderText: {
    fontSize: 13,
    color: Colors.textMuted,
    fontWeight: '600',
    fontFamily: 'BeVietnamPro_600SemiBold',
  },
  disabledRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 24,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1.5,
  },
  actionBtnDisabled: {
    backgroundColor: Colors.background,
    borderColor: Colors.border,
  },
  actionBtnTextDisabled: {
    fontSize: 13,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textMuted,
    lineHeight: 20,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  dividerText: {
    fontSize: 11,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textMuted,
    letterSpacing: 0.5,
  },
  sectionDesc: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 12,
    lineHeight: 20,
  },
  sampleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  sampleIconBg: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sampleTexts: { flex: 1 },
  sampleTitle: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textPrimary,
    marginBottom: 3,
    lineHeight: 21,
  },
  sampleDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
});
