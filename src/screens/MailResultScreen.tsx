// Phase 1 UI mock — result screen.
// Reads from MAIL_SAMPLES instead of API response. Disclaimer block matches
// audit doc section 7.2 wording.

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
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../constants/colors';
import {
  getMailSampleById,
  type MailPriority,
  type MailWarning,
  type MailWarningSeverity,
} from '../constants/aiMailSamples';
import type { RootStackParamList } from '../navigation/AppNavigator';

type Nav = NativeStackNavigationProp<RootStackParamList, 'MailResult'>;
type Rt = RouteProp<RootStackParamList, 'MailResult'>;

const SEVERITY_STYLE: Record<
  MailWarningSeverity,
  { bg: string; border: string; icon: keyof typeof Ionicons.glyphMap; iconColor: string }
> = {
  info: {
    bg: Colors.accent,
    border: Colors.primary + '40',
    icon: 'information-circle',
    iconColor: Colors.primary,
  },
  warning: {
    bg: Colors.warningLight,
    border: Colors.warning + '40',
    icon: 'alert-circle',
    iconColor: Colors.warning,
  },
  danger: {
    bg: Colors.dangerLight,
    border: Colors.danger + '40',
    icon: 'warning',
    iconColor: Colors.danger,
  },
};

const PRIORITY_STYLE: Record<
  MailPriority,
  { bg: string; color: string; icon: keyof typeof Ionicons.glyphMap; labelVi: string }
> = {
  urgent: {
    bg: Colors.dangerLight,
    color: Colors.danger,
    icon: 'flash',
    labelVi: 'KHẨN CẤP',
  },
  important: {
    bg: Colors.warningLight,
    color: Colors.warning,
    icon: 'alert-circle',
    labelVi: 'QUAN TRỌNG',
  },
  normal: {
    bg: Colors.accent,
    color: Colors.primary,
    icon: 'mail',
    labelVi: 'BÌNH THƯỜNG',
  },
  info: {
    bg: Colors.successLight,
    color: Colors.success,
    icon: 'information-circle',
    labelVi: 'THÔNG TIN',
  },
};

function formatDeadline(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1)
    .toString()
    .padStart(2, '0')}/${d.getFullYear()}`;
}

function formatYen(amount: number): string {
  return `¥${amount.toLocaleString('en-US')}`;
}

export default function MailResultScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Rt>();
  const sample = getMailSampleById(route.params.sampleId);

  if (!sample) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <View style={styles.notFound}>
          <Ionicons name="alert-circle" size={48} color={Colors.danger} />
          <Text style={styles.notFoundText}>Không tìm thấy mẫu thư.</Text>
          <TouchableOpacity
            style={styles.retryBtn}
            onPress={() => navigation.navigate('MailCapture')}
          >
            <Text style={styles.retryBtnText}>Thử lại</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const confidencePct = Math.round(sample.aiConfidenceScore * 100);
  const isLowConfidence = sample.aiConfidenceScore < 0.5;

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.typeCard}>
          <View style={[styles.typeIconBg, { backgroundColor: sample.iconColor + '20' }]}>
            <Ionicons name={sample.iconName} size={28} color={sample.iconColor} />
          </View>
          <View style={styles.typeTexts}>
            <Text style={styles.typeLabel}>LOẠI THƯ</Text>
            <Text style={styles.typeValue}>{sample.documentTypeVi}</Text>
          </View>
        </View>

        <PriorityBadge priority={sample.priority} />

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Tóm tắt</Text>
          <Text style={styles.cardBody}>{sample.summaryVi}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Bạn cần làm gì</Text>
          <Text style={styles.cardBody}>{sample.requiredActionVi}</Text>
        </View>

        {(sample.deadline || sample.amountYen !== null) && (
          <View style={styles.metaRow}>
            {sample.deadline && (
              <View style={styles.metaCard}>
                <Ionicons name="calendar" size={18} color={Colors.danger} />
                <Text style={styles.metaLabel}>Hạn chót</Text>
                <Text style={styles.metaValue}>{formatDeadline(sample.deadline)}</Text>
              </View>
            )}
            {sample.amountYen !== null && (
              <View style={styles.metaCard}>
                <Ionicons name="cash" size={18} color={Colors.success} />
                <Text style={styles.metaLabel}>Số tiền</Text>
                <Text style={styles.metaValue}>{formatYen(sample.amountYen)}</Text>
              </View>
            )}
          </View>
        )}

        {sample.warnings.length > 0 && (
          <View style={styles.warningsGroup}>
            {sample.warnings.map((w, i) => (
              <WarningBox key={i} warning={w} />
            ))}
          </View>
        )}

        {sample.keyVocabulary.length > 0 && (
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Từ vựng Nhật quan trọng</Text>
            {sample.keyVocabulary.map((v, i) => (
              <View
                key={v.jp + i}
                style={[
                  styles.vocabRow,
                  i === sample.keyVocabulary.length - 1 && styles.vocabRowLast,
                ]}
              >
                <View style={styles.vocabJpCol}>
                  <Text style={styles.vocabJp}>{v.jp}</Text>
                  <Text style={styles.vocabReading}>{v.reading}</Text>
                </View>
                <Text style={styles.vocabVi}>{v.vi}</Text>
              </View>
            ))}
          </View>
        )}

        {sample.relatedGuideId && (
          <TouchableOpacity
            style={styles.relatedCard}
            onPress={() =>
              navigation.navigate('AdminDetail', { guideId: sample.relatedGuideId! })
            }
            activeOpacity={0.85}
          >
            <View style={styles.relatedIconBg}>
              <Ionicons name="book" size={20} color={Colors.primary} />
            </View>
            <View style={styles.relatedTexts}>
              <Text style={styles.relatedLabel}>HƯỚNG DẪN LIÊN QUAN</Text>
              <Text style={styles.relatedValue}>Xem cẩm nang chi tiết trong app</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
          </TouchableOpacity>
        )}

        <View style={styles.confidenceBox}>
          <Ionicons
            name={isLowConfidence ? 'alert' : 'checkmark-circle'}
            size={14}
            color={isLowConfidence ? Colors.warning : Colors.success}
          />
          <Text style={styles.confidenceText}>
            Độ tin cậy AI: {confidencePct}%
            {isLowConfidence && ' — kết quả có thể không chính xác, nên xác minh lại'}
          </Text>
        </View>

        <View style={styles.disclaimerBox}>
          <Text style={styles.disclaimerTitle}>⚠️ Đây là kết quả AI tham khảo</Text>
          <Text style={styles.disclaimerText}>
            KHÔNG phải tư vấn pháp lý / thuế / y tế cá nhân. AI có thể đọc nhầm chữ Nhật khó hoặc
            bỏ sót chi tiết. Cho thư quan trọng (入管, thuế, ngân hàng, 督促状), luôn xác minh với
            cơ quan phát hành hoặc luật sư trước khi hành động.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.tryAgainBtn}
          onPress={() => navigation.navigate('MailCapture')}
          activeOpacity={0.85}
        >
          <Ionicons name="refresh" size={18} color={Colors.primary} />
          <Text style={styles.tryAgainBtnText}>Thử thư khác</Text>
        </TouchableOpacity>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function WarningBox({ warning }: { warning: MailWarning }) {
  const s = SEVERITY_STYLE[warning.severity];
  return (
    <View style={[styles.warningBox, { backgroundColor: s.bg, borderColor: s.border }]}>
      <Ionicons name={s.icon} size={18} color={s.iconColor} />
      <Text style={styles.warningText}>{warning.messageVi}</Text>
    </View>
  );
}

function PriorityBadge({ priority }: { priority: MailPriority }) {
  const p = PRIORITY_STYLE[priority];
  return (
    <View style={[styles.priorityBadge, { backgroundColor: p.bg, borderColor: p.color + '40' }]}>
      <Ionicons name={p.icon} size={16} color={p.color} />
      <Text style={styles.priorityLabel}>Mức độ:</Text>
      <Text style={[styles.priorityValue, { color: p.color }]}>{p.labelVi}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { flex: 1 },
  scrollContent: { padding: 16 },
  typeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
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
  typeIconBg: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeTexts: { flex: 1 },
  typeLabel: {
    fontSize: 10,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textMuted,
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  typeValue: {
    fontSize: 15,
    fontWeight: '800',
    fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.textPrimary,
    lineHeight: 22,
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
  cardLabel: {
    fontSize: 11,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textMuted,
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  cardBody: {
    fontSize: 14,
    color: Colors.textPrimary,
    lineHeight: 22,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
  },
  metaCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 12,
    alignItems: 'flex-start',
    gap: 4,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  metaLabel: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 4,
  },
  metaValue: {
    fontSize: 14,
    fontWeight: '800',
    fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.textPrimary,
    lineHeight: 21,
  },
  priorityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 14,
  },
  priorityLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '600',
    fontFamily: 'BeVietnamPro_600SemiBold',
  },
  priorityValue: {
    fontSize: 13,
    fontWeight: '800',
    fontFamily: 'BeVietnamPro_800ExtraBold',
    letterSpacing: 0.5,
    lineHeight: 20,
  },
  vocabRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  vocabRowLast: {
    borderBottomWidth: 0,
  },
  vocabJpCol: {
    minWidth: 110,
  },
  vocabJp: {
    fontSize: 16,
    fontWeight: '800',
    fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.textPrimary,
    lineHeight: 22,
  },
  vocabReading: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 1,
  },
  vocabVi: {
    flex: 1,
    fontSize: 13,
    color: Colors.textPrimary,
    lineHeight: 20,
  },
  warningsGroup: {
    gap: 8,
    marginBottom: 14,
  },
  warningBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  warningText: {
    flex: 1,
    fontSize: 13,
    color: Colors.textPrimary,
    lineHeight: 20,
  },
  relatedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: Colors.accent,
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: Colors.primary + '25',
  },
  relatedIconBg: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  relatedTexts: { flex: 1 },
  relatedLabel: {
    fontSize: 10,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.primary,
    letterSpacing: 0.5,
    marginBottom: 3,
  },
  relatedValue: {
    fontSize: 13,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textPrimary,
    lineHeight: 20,
  },
  confidenceBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
    paddingHorizontal: 4,
  },
  confidenceText: {
    flex: 1,
    fontSize: 11,
    color: Colors.textMuted,
    lineHeight: 17,
  },
  disclaimerBox: {
    backgroundColor: Colors.warningLight,
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: Colors.warning + '40',
  },
  disclaimerTitle: {
    fontSize: 12,
    fontWeight: '800',
    fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.textPrimary,
    marginBottom: 6,
    lineHeight: 18,
  },
  disclaimerText: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  tryAgainBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
  },
  tryAgainBtnText: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.primary,
    lineHeight: 21,
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    padding: 32,
  },
  notFoundText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  retryBtn: {
    marginTop: 8,
    backgroundColor: Colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 12,
  },
  retryBtnText: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.white,
  },
});
