// My Japan Plan — Phase 0 UI mock for the plan output screen.
//
// Renders a hardcoded sample plan from lostResidenceCard.sample.ts.
// Steps have:
//   - checkbox (local state only, NOT persisted)
//   - glossary chip (tap → modal with the JP term gloss)
//   - counter-phrase chip with copy
//   - "Xem chi tiết →" link that opens the real AdminDetail
// Footer "❓ Hỏi Cẩm Nang" button shows a toast in Phase 0; Phase 1 will
// pre-fill the chat with the situation context.
//
// Per docs/feature-my-japan-plan-assessment.md §4.4:
// Phase 0 = NO AsyncStorage, NO expo-notifications, NO real chat wire.

import React, { useCallback, useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Clipboard from 'expo-clipboard';

import { Colors } from '../constants/colors';
import { RootStackParamList } from '../navigation/AppNavigator';
import {
  LOST_CARD_SAMPLE_PLAN,
  PlanGlossaryChip,
  PlanStep,
  SamplePlan,
} from '../constants/planFlows/lostResidenceCard.sample';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type PlanDetailRouteProp = RouteProp<RootStackParamList, 'PlanDetail'>;

export default function PlanDetailScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<PlanDetailRouteProp>();

  const plan: SamplePlan | null = useMemo(() => {
    if (route.params.situationId === 'lost-residence-card') {
      return LOST_CARD_SAMPLE_PLAN;
    }
    return null;
  }, [route.params.situationId]);

  // Phase 0: in-memory step state only. Not persisted, resets on re-open.
  const [doneSteps, setDoneSteps] = useState<Record<string, boolean>>({});
  const [glossaryOpen, setGlossaryOpen] = useState<PlanGlossaryChip | null>(null);

  const handleToggleStep = useCallback((stepId: string) => {
    setDoneSteps((prev) => ({ ...prev, [stepId]: !prev[stepId] }));
  }, []);

  const handleOpenSource = useCallback(
    (guideId: string) => {
      navigation.navigate('AdminDetail', { guideId });
    },
    [navigation],
  );

  const handleCopyPhrase = useCallback(async (jp: string) => {
    try {
      await Clipboard.setStringAsync(jp);
    } catch {
      // Clipboard can fail on some emulators; ignore silently.
    }
    Alert.alert('Đã copy', jp);
  }, []);

  const handleAskChatbot = useCallback(() => {
    // Phase 0: no real wire yet. Phase 1 will pre-fill HoiCamNangScreen
    // with a situation-aware initial question.
    Alert.alert(
      'Hỏi Cẩm Nang',
      'Phase 1 sẽ mở Hỏi Cẩm Nang kèm câu hỏi tự động về tình huống của bạn.',
    );
  }, []);

  const handleDeletePlan = useCallback(() => {
    Alert.alert(
      'Xoá lộ trình?',
      'Phase 0 chỉ là dữ liệu mẫu — bấm Quay lại để thoát.',
      [
        { text: 'Quay lại', style: 'cancel' },
        {
          text: 'Thoát',
          style: 'destructive',
          onPress: () => navigation.popToTop(),
        },
      ],
    );
  }, [navigation]);

  if (!plan) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.notFoundBox}>
          <Ionicons name="alert-circle" size={36} color={Colors.warning} />
          <Text style={styles.notFoundTitle}>Chưa có dữ liệu mẫu cho tình huống này</Text>
          <TouchableOpacity
            style={styles.notFoundBtn}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.notFoundBtnText}>Quay lại</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const totalSteps = plan.groups.reduce((sum, g) => sum + g.steps.length, 0);
  const doneCount = plan.groups.reduce(
    (sum, g) => sum + g.steps.filter((s) => doneSteps[s.id]).length,
    0,
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          accessibilityLabel="Quay lại"
        >
          <Ionicons name="arrow-back" size={22} color={Colors.white} />
        </TouchableOpacity>
        <View style={styles.headerText}>
          <View style={styles.headerTitleRow}>
            <Ionicons name="map" size={18} color={Colors.white} />
            <Text style={styles.headerTitle}>{plan.title}</Text>
            <View style={styles.betaPill}>
              <Text style={styles.betaPillText}>BETA</Text>
            </View>
          </View>
          <Text style={styles.headerDesc}>{plan.deadlineLabel}</Text>
          <Text style={styles.headerProgress}>
            Đã làm {doneCount}/{totalSteps} việc
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {plan.urgencyBanner ? (
            <View style={styles.urgencyBanner}>
              <Ionicons name="warning" size={16} color={Colors.danger} />
              <Text style={styles.urgencyText}>{plan.urgencyBanner}</Text>
            </View>
          ) : null}

          {plan.groups.map((group) => (
            <View key={group.label} style={styles.group}>
              <View style={styles.groupHeader}>
                <View style={[styles.groupIconBg, { backgroundColor: `${group.accent}18` }]}>
                  <Ionicons name={group.icon} size={14} color={group.accent} />
                </View>
                <Text style={[styles.groupLabel, { color: group.accent }]}>{group.label}</Text>
              </View>

              {group.steps.map((step) => (
                <StepCard
                  key={step.id}
                  step={step}
                  done={!!doneSteps[step.id]}
                  onToggle={() => handleToggleStep(step.id)}
                  onOpenGlossary={(g) => setGlossaryOpen(g)}
                  onOpenSource={handleOpenSource}
                  onCopyPhrase={handleCopyPhrase}
                />
              ))}
            </View>
          ))}

          <View style={styles.footerActions}>
            <TouchableOpacity
              style={styles.askChatbotBtn}
              onPress={handleAskChatbot}
              accessibilityRole="button"
            >
              <Ionicons name="sparkles-outline" size={16} color={Colors.primary} />
              <Text style={styles.askChatbotText}>Có câu hỏi khác? Hỏi Cẩm Nang</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={handleDeletePlan}
              accessibilityRole="button"
            >
              <Ionicons name="trash-outline" size={14} color={Colors.danger} />
              <Text style={styles.deleteBtnText}>Xoá lộ trình này</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.disclaimerBox}>
            <Ionicons name="information-circle-outline" size={14} color={Colors.textMuted} />
            <Text style={styles.disclaimerText}>
              Lộ trình do app tạo từ bài hướng dẫn có sẵn — chỉ tham khảo, không thay
              tư vấn 入管 / luật sư. Phase 0: dữ liệu mẫu, tick việc không lưu lại sau khi
              tắt màn hình.
            </Text>
          </View>
        </ScrollView>
      </View>

      <GlossaryModal entry={glossaryOpen} onClose={() => setGlossaryOpen(null)} />
    </SafeAreaView>
  );
}

interface StepCardProps {
  step: PlanStep;
  done: boolean;
  onToggle: () => void;
  onOpenGlossary: (g: PlanGlossaryChip) => void;
  onOpenSource: (guideId: string) => void;
  onCopyPhrase: (jp: string) => void;
}

function StepCard({
  step,
  done,
  onToggle,
  onOpenGlossary,
  onOpenSource,
  onCopyPhrase,
}: StepCardProps) {
  return (
    <View style={[styles.stepCard, done && styles.stepCardDone]}>
      <View style={styles.stepTopRow}>
        <TouchableOpacity
          style={[styles.checkbox, done && styles.checkboxDone]}
          onPress={onToggle}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: done }}
        >
          {done ? <Ionicons name="checkmark" size={14} color={Colors.white} /> : null}
        </TouchableOpacity>
        <Text style={[styles.stepTitle, done && styles.stepTitleDone]}>{step.title}</Text>
      </View>

      {step.detail ? <Text style={styles.stepDetail}>{step.detail}</Text> : null}

      {step.glossary ? (
        <TouchableOpacity
          style={styles.glossaryChip}
          onPress={() => onOpenGlossary(step.glossary!)}
          accessibilityRole="button"
        >
          <Ionicons name="book-outline" size={12} color={Colors.primary} />
          <Text style={styles.glossaryChipTerm}>{step.glossary.term}</Text>
          {step.glossary.reading ? (
            <Text style={styles.glossaryChipReading}>{step.glossary.reading}</Text>
          ) : null}
          <Text style={styles.glossaryChipMeaning}>· {step.glossary.meaningVi}</Text>
        </TouchableOpacity>
      ) : null}

      {step.counterPhrase ? (
        <View style={styles.counterChip}>
          <View style={styles.counterTopRow}>
            <View style={styles.counterTextBlock}>
              <Text style={styles.counterJp}>{step.counterPhrase.jp}</Text>
              {step.counterPhrase.romaji ? (
                <Text style={styles.counterRomaji}>{step.counterPhrase.romaji}</Text>
              ) : null}
              <Text style={styles.counterVn}>{step.counterPhrase.vn}</Text>
            </View>
            <TouchableOpacity
              onPress={() => onCopyPhrase(step.counterPhrase!.jp)}
              accessibilityLabel="Copy câu tiếng Nhật"
              style={styles.copyBtn}
            >
              <Ionicons name="copy-outline" size={16} color={Colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
      ) : null}

      {step.sourceGuideId && step.sourceGuideLabel ? (
        <TouchableOpacity
          style={styles.sourceLink}
          onPress={() => onOpenSource(step.sourceGuideId!)}
          accessibilityRole="link"
        >
          <Ionicons name="document-text-outline" size={12} color={Colors.primary} />
          <Text style={styles.sourceLinkText}>Xem chi tiết: {step.sourceGuideLabel}</Text>
          <Ionicons name="chevron-forward" size={12} color={Colors.primary} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

function GlossaryModal({
  entry,
  onClose,
}: {
  entry: PlanGlossaryChip | null;
  onClose: () => void;
}) {
  return (
    <Modal
      visible={!!entry}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalBackdrop} onPress={onClose}>
        <Pressable style={styles.modalCard}>
          {entry ? (
            <>
              <View style={styles.modalHeader}>
                <Ionicons name="book" size={18} color={Colors.primary} />
                <Text style={styles.modalTitle}>Từ cần biết</Text>
              </View>
              <Text style={styles.modalTerm}>{entry.term}</Text>
              {entry.reading ? <Text style={styles.modalReading}>{entry.reading}</Text> : null}
              <Text style={styles.modalMeaning}>{entry.meaningVi}</Text>
              <TouchableOpacity style={styles.modalCloseBtn} onPress={onClose}>
                <Text style={styles.modalCloseBtnText}>Đóng</Text>
              </TouchableOpacity>
            </>
          ) : null}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  header: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 20,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  backBtn: { paddingTop: 2 },
  headerText: { flex: 1 },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.white,
  },
  betaPill: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  betaPillText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
    letterSpacing: 0.5,
  },
  headerDesc: {
    fontSize: 13,
    lineHeight: 19,
    color: 'rgba(255,255,255,0.85)',
  },
  headerProgress: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 4,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
  },
  content: {
    flex: 1,
    backgroundColor: Colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  urgencyBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FDECEA',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.danger,
  },
  urgencyText: {
    flex: 1,
    fontSize: 13,
    color: Colors.danger,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
    lineHeight: 18,
  },
  group: {
    marginBottom: 16,
  },
  groupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  groupIconBg: {
    width: 24,
    height: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupLabel: {
    fontSize: 13,
    fontWeight: '800',
    fontFamily: 'BeVietnamPro_800ExtraBold',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  stepCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  stepCardDone: {
    backgroundColor: '#F7FBF7',
  },
  stepTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 4,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    marginTop: 1,
  },
  checkboxDone: {
    backgroundColor: Colors.success,
    borderColor: Colors.success,
  },
  stepTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textPrimary,
    lineHeight: 20,
  },
  stepTitleDone: {
    color: Colors.textMuted,
    textDecorationLine: 'line-through',
  },
  stepDetail: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 17,
    marginLeft: 32,
    marginTop: 4,
    marginBottom: 8,
  },
  glossaryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 4,
    backgroundColor: Colors.accent,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginLeft: 32,
    marginBottom: 6,
  },
  glossaryChipTerm: {
    fontSize: 12,
    fontWeight: '800',
    fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.primary,
  },
  glossaryChipReading: {
    fontSize: 11,
    color: Colors.primary,
  },
  glossaryChipMeaning: {
    fontSize: 11,
    color: Colors.textSecondary,
    flexShrink: 1,
  },
  counterChip: {
    backgroundColor: Colors.accent,
    borderRadius: 10,
    padding: 10,
    marginLeft: 32,
    marginBottom: 6,
  },
  counterTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  counterTextBlock: { flex: 1 },
  counterJp: {
    fontSize: 13,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  counterRomaji: {
    fontSize: 11,
    color: Colors.textMuted,
    marginBottom: 2,
  },
  counterVn: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  copyBtn: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  sourceLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginLeft: 32,
    marginTop: 4,
  },
  sourceLinkText: {
    flex: 1,
    fontSize: 11,
    color: Colors.primary,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
  },
  footerActions: {
    marginTop: 12,
    gap: 8,
  },
  askChatbotBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.accent,
    borderRadius: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  askChatbotText: {
    fontSize: 13,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.primary,
  },
  deleteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
  },
  deleteBtnText: {
    fontSize: 12,
    color: Colors.danger,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
  },
  disclaimerBox: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 8,
    paddingHorizontal: 4,
  },
  disclaimerText: {
    flex: 1,
    fontSize: 11,
    color: Colors.textMuted,
    lineHeight: 15,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  modalCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    width: '100%',
    maxWidth: 360,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 13,
    fontWeight: '800',
    fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  modalTerm: {
    fontSize: 24,
    fontWeight: '800',
    fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  modalReading: {
    fontSize: 13,
    color: Colors.textMuted,
    marginBottom: 12,
  },
  modalMeaning: {
    fontSize: 14,
    color: Colors.textPrimary,
    lineHeight: 20,
    marginBottom: 16,
  },
  modalCloseBtn: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  modalCloseBtnText: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
  },
  notFoundBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 12,
    backgroundColor: Colors.background,
  },
  notFoundTitle: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  notFoundBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  notFoundBtnText: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
  },
});
