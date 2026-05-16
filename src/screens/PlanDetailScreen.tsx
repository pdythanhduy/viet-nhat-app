// My Japan Plan — Phase 0 polish: persisted, timeline-styled plan output.
//
// Loads (or creates from wizard answers on first entry) the active plan via
// planStorage. Step ticks are now persisted across app restarts. Adds:
//   - animated header progress bar + N/M + percent
//   - per-group "x/y xong" counter
//   - vertical timeline line connecting steps in a group
//   - completion celebration when 100% done
//   - "Bắt đầu lại" button on completion (instead of just delete)
//
// Phase 0 still: NO expo-notifications, NO real Hỏi Cẩm Nang wire. Step
// snooze + "Hỏi thêm về bước này" land in the next commit.

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  Pressable,
  Animated,
  Easing,
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
  PlanGroup,
  PlanStep,
  SamplePlan,
} from '../constants/planFlows/lostResidenceCard.sample';
import {
  clearActivePlan,
  createPlanFromAnswers,
  loadActivePlan,
  SnoozedStep,
  snoozeStep,
  StoredPlan,
  toggleStepComplete,
} from '../utils/planStorage';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type PlanDetailRouteProp = RouteProp<RootStackParamList, 'PlanDetail'>;

export default function PlanDetailScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<PlanDetailRouteProp>();

  // Phase 0: only "lost-residence-card" has a sample plan + wizard.
  const samplePlan: SamplePlan | null = useMemo(() => {
    if (route.params.situationId === 'lost-residence-card') {
      return LOST_CARD_SAMPLE_PLAN;
    }
    return null;
  }, [route.params.situationId]);

  const [stored, setStored] = useState<StoredPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [glossaryOpen, setGlossaryOpen] = useState<PlanGlossaryChip | null>(null);
  const [snoozeTarget, setSnoozeTarget] = useState<PlanStep | null>(null);

  // Load existing plan from AsyncStorage, or create one from wizard answers
  // on first entry.
  useEffect(() => {
    let cancelled = false;
    if (!samplePlan) {
      setLoading(false);
      return;
    }
    (async () => {
      let plan = await loadActivePlan('lost-residence-card');
      if (!plan) {
        plan = await createPlanFromAnswers('lost-residence-card', route.params.answers ?? {});
      }
      if (!cancelled) {
        setStored(plan);
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [samplePlan, route.params.answers]);

  const handleToggleStep = useCallback(async (stepId: string) => {
    const next = await toggleStepComplete('lost-residence-card', stepId);
    if (next) setStored(next);
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
    // Pre-fill the chat with a plan-level question. HoiCamNangScreen reads
    // route.params.initialQuestion on mount and auto-fires it once.
    navigation.navigate('HoiCamNang', {
      initialQuestion: 'Tôi đang làm thủ tục cấp lại thẻ cư trú. Có lưu ý nào quan trọng không?',
    });
  }, [navigation]);

  const handleAskAboutStep = useCallback(
    (step: PlanStep) => {
      // Per-step contextual question. Phrase the step title as a follow-up.
      const question = `Tôi đang ở bước "${step.title}" trong lộ trình mất thẻ cư trú. Có lưu ý gì cụ thể không?`;
      navigation.navigate('HoiCamNang', { initialQuestion: question });
    },
    [navigation],
  );

  const handleApplySnooze = useCallback(
    async (step: PlanStep, choice: SnoozeChoice) => {
      const next = await snoozeStep('lost-residence-card', step.id, {
        remindAt: choice.remindAt.toISOString(),
        label: choice.label,
      });
      if (next) setStored(next);
      setSnoozeTarget(null);
    },
    [],
  );

  const handleClearSnooze = useCallback(async (stepId: string) => {
    const next = await snoozeStep('lost-residence-card', stepId, null);
    if (next) setStored(next);
  }, []);

  const handleResetPlan = useCallback(() => {
    Alert.alert(
      'Bắt đầu lại?',
      'Tích chọn của bạn sẽ bị xoá. Câu trả lời wizard vẫn được giữ.',
      [
        { text: 'Huỷ', style: 'cancel' },
        {
          text: 'Đồng ý',
          style: 'destructive',
          onPress: async () => {
            if (!stored) return;
            const fresh: StoredPlan = { ...stored, completedSteps: {} };
            setStored(fresh);
            // Write empty completed back; planStorage saveActivePlan via
            // toggleStepComplete-style call isn't appropriate here — we
            // recreate.
            await createPlanFromAnswers('lost-residence-card', stored.answers);
          },
        },
      ],
    );
  }, [stored]);

  const handleDeletePlan = useCallback(() => {
    Alert.alert(
      'Xoá lộ trình?',
      'Bạn sẽ mất hết tiến độ và câu trả lời wizard. Có chắc không?',
      [
        { text: 'Huỷ', style: 'cancel' },
        {
          text: 'Xoá',
          style: 'destructive',
          onPress: async () => {
            await clearActivePlan('lost-residence-card');
            navigation.popToTop();
          },
        },
      ],
    );
  }, [navigation]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.loadingBox}>
          <Text style={styles.loadingText}>Đang mở lộ trình…</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!samplePlan) {
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

  const totalSteps = samplePlan.groups.reduce((sum, g) => sum + g.steps.length, 0);
  const doneCount = samplePlan.groups.reduce(
    (sum, g) =>
      sum + g.steps.filter((s) => !!stored?.completedSteps[s.id]).length,
    0,
  );
  const progressPct = totalSteps === 0 ? 0 : doneCount / totalSteps;
  const isComplete = totalSteps > 0 && doneCount === totalSteps;

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
            <Text style={styles.headerTitle}>{samplePlan.title}</Text>
            <View style={styles.betaPill}>
              <Text style={styles.betaPillText}>BETA</Text>
            </View>
          </View>
          <Text style={styles.headerDesc}>{samplePlan.deadlineLabel}</Text>
          <ProgressBar fraction={progressPct} />
          <Text style={styles.headerProgress}>
            Đã làm {doneCount}/{totalSteps} ({Math.round(progressPct * 100)}%)
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {isComplete ? <CompletionBanner onReset={handleResetPlan} /> : null}

          {samplePlan.urgencyBanner ? (
            <View style={styles.urgencyBanner}>
              <Ionicons name="warning" size={16} color={Colors.danger} />
              <Text style={styles.urgencyText}>{samplePlan.urgencyBanner}</Text>
            </View>
          ) : null}

          {samplePlan.groups.map((group) => (
            <Group
              key={group.label}
              group={group}
              stored={stored}
              onToggle={handleToggleStep}
              onOpenGlossary={(g) => setGlossaryOpen(g)}
              onOpenSource={handleOpenSource}
              onCopyPhrase={handleCopyPhrase}
              onOpenSnooze={(step) => setSnoozeTarget(step)}
              onClearSnooze={handleClearSnooze}
              onAskAboutStep={handleAskAboutStep}
            />
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
              tư vấn 入管 / luật sư. Tiến độ tự lưu trên máy bạn, không gửi đi đâu.
            </Text>
          </View>
        </ScrollView>
      </View>

      <GlossaryModal entry={glossaryOpen} onClose={() => setGlossaryOpen(null)} />
      <SnoozeModal
        step={snoozeTarget}
        onClose={() => setSnoozeTarget(null)}
        onPick={handleApplySnooze}
      />
    </SafeAreaView>
  );
}

// ─── Subcomponents ─────────────────────────────────────────────────────

function ProgressBar({ fraction }: { fraction: number }) {
  // Animated fill 0..1.
  const widthAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: Math.max(0, Math.min(1, fraction)),
      duration: 350,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false,
    }).start();
  }, [fraction, widthAnim]);

  const widthInterpolated = widthAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.progressBarTrack}>
      <Animated.View style={[styles.progressBarFill, { width: widthInterpolated }]} />
    </View>
  );
}

function CompletionBanner({ onReset }: { onReset: () => void }) {
  return (
    <View style={styles.completionBanner}>
      <View style={styles.completionEmojiRow}>
        <Ionicons name="trophy" size={26} color="#27AE60" />
        <Text style={styles.completionTitle}>Bạn hoàn thành lộ trình!</Text>
      </View>
      <Text style={styles.completionDesc}>
        Tất cả bước đều xong. Nếu phát sinh thêm việc, bạn có thể bắt đầu lại lộ trình mới.
      </Text>
      <TouchableOpacity style={styles.completionBtn} onPress={onReset}>
        <Ionicons name="refresh" size={14} color={Colors.white} />
        <Text style={styles.completionBtnText}>Bắt đầu lại</Text>
      </TouchableOpacity>
    </View>
  );
}

interface GroupProps {
  group: PlanGroup;
  stored: StoredPlan | null;
  onToggle: (stepId: string) => void;
  onOpenGlossary: (g: PlanGlossaryChip) => void;
  onOpenSource: (guideId: string) => void;
  onCopyPhrase: (jp: string) => void;
  onOpenSnooze: (step: PlanStep) => void;
  onClearSnooze: (stepId: string) => void;
  onAskAboutStep: (step: PlanStep) => void;
}

function Group({
  group,
  stored,
  onToggle,
  onOpenGlossary,
  onOpenSource,
  onCopyPhrase,
  onOpenSnooze,
  onClearSnooze,
  onAskAboutStep,
}: GroupProps) {
  const done = group.steps.filter((s) => !!stored?.completedSteps[s.id]).length;
  const total = group.steps.length;
  const groupComplete = done === total && total > 0;

  return (
    <View style={styles.group}>
      <View style={styles.groupHeader}>
        <View
          style={[
            styles.groupIconBg,
            { backgroundColor: groupComplete ? '#27AE6022' : `${group.accent}18` },
          ]}
        >
          <Ionicons
            name={groupComplete ? 'checkmark' : group.icon}
            size={14}
            color={groupComplete ? '#27AE60' : group.accent}
          />
        </View>
        <Text style={[styles.groupLabel, { color: groupComplete ? '#27AE60' : group.accent }]}>
          {group.label}
        </Text>
        <View style={styles.groupCountPill}>
          <Text style={styles.groupCountText}>{done}/{total} xong</Text>
        </View>
      </View>

      <View style={styles.timelineWrap}>
        {group.steps.map((step, index) => (
          <TimelineStep
            key={step.id}
            step={step}
            accent={group.accent}
            done={!!stored?.completedSteps[step.id]}
            completedAt={stored?.completedSteps[step.id]}
            snooze={stored?.snoozedSteps?.[step.id] ?? null}
            isLast={index === group.steps.length - 1}
            indexInGroup={index + 1}
            onToggle={() => onToggle(step.id)}
            onOpenGlossary={onOpenGlossary}
            onOpenSource={onOpenSource}
            onCopyPhrase={onCopyPhrase}
            onOpenSnooze={() => onOpenSnooze(step)}
            onClearSnooze={() => onClearSnooze(step.id)}
            onAskAboutStep={() => onAskAboutStep(step)}
          />
        ))}
      </View>
    </View>
  );
}

interface TimelineStepProps {
  step: PlanStep;
  accent: string;
  done: boolean;
  completedAt?: string;
  snooze: SnoozedStep | null;
  isLast: boolean;
  indexInGroup: number;
  onToggle: () => void;
  onOpenGlossary: (g: PlanGlossaryChip) => void;
  onOpenSource: (guideId: string) => void;
  onCopyPhrase: (jp: string) => void;
  onOpenSnooze: () => void;
  onClearSnooze: () => void;
  onAskAboutStep: () => void;
}

function TimelineStep({
  step,
  accent,
  done,
  completedAt,
  snooze,
  isLast,
  indexInGroup,
  onToggle,
  onOpenGlossary,
  onOpenSource,
  onCopyPhrase,
  onOpenSnooze,
  onClearSnooze,
  onAskAboutStep,
}: TimelineStepProps) {
  return (
    <View style={styles.timelineRow}>
      {/* Left column: marker + connector line. */}
      <View style={styles.timelineLeft}>
        {!isLast ? (
          <View style={[styles.timelineLine, { backgroundColor: done ? '#27AE60' : `${accent}40` }]} />
        ) : null}
        <TouchableOpacity
          style={[
            styles.timelineMarker,
            done ? styles.timelineMarkerDone : { borderColor: accent },
          ]}
          onPress={onToggle}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: done }}
        >
          {done ? (
            <Ionicons name="checkmark" size={14} color={Colors.white} />
          ) : (
            <Text style={[styles.timelineMarkerNum, { color: accent }]}>{indexInGroup}</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Right column: step content. */}
      <View style={[styles.stepCard, done && styles.stepCardDone]}>
        <Text style={[styles.stepTitle, done && styles.stepTitleDone]}>{step.title}</Text>

        {done && completedAt ? (
          <Text style={styles.completedTimestamp}>
            ✓ Đã làm {formatRelativeShort(completedAt)}
          </Text>
        ) : null}

        {!done && snooze ? (
          <TouchableOpacity
            style={styles.snoozePill}
            onPress={onClearSnooze}
            accessibilityRole="button"
            accessibilityLabel="Bỏ nhắc"
          >
            <Ionicons name="alarm" size={12} color="#E67E22" />
            <Text style={styles.snoozePillText}>Nhắc {snooze.label}</Text>
            <Ionicons name="close" size={12} color="#E67E22" />
          </TouchableOpacity>
        ) : null}

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

        {/* Per-step action row: snooze (if not done) + ask chatbot. */}
        {!done ? (
          <View style={styles.stepActionRow}>
            <TouchableOpacity
              style={styles.stepActionBtn}
              onPress={onOpenSnooze}
              accessibilityRole="button"
            >
              <Ionicons name="alarm-outline" size={12} color={Colors.textSecondary} />
              <Text style={styles.stepActionBtnText}>Nhắc tôi sau</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.stepActionBtn}
              onPress={onAskAboutStep}
              accessibilityRole="button"
            >
              <Ionicons name="sparkles-outline" size={12} color={Colors.primary} />
              <Text style={[styles.stepActionBtnText, { color: Colors.primary }]}>
                Hỏi thêm về bước này
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </View>
  );
}

// ─── Snooze modal ──────────────────────────────────────────────────────

interface SnoozeChoice {
  id: string;
  label: string;
  remindAt: Date;
}

function buildSnoozeChoices(now = new Date()): SnoozeChoice[] {
  const oneHour = new Date(now.getTime() + 60 * 60 * 1000);
  const fourHours = new Date(now.getTime() + 4 * 60 * 60 * 1000);
  const tomorrow8 = new Date(now);
  tomorrow8.setDate(now.getDate() + 1);
  tomorrow8.setHours(8, 0, 0, 0);
  return [
    { id: '1h', label: '1 giờ nữa', remindAt: oneHour },
    { id: '4h', label: '4 giờ nữa', remindAt: fourHours },
    { id: 'tomorrow-8', label: 'Sáng mai 8:00', remindAt: tomorrow8 },
  ];
}

function SnoozeModal({
  step,
  onClose,
  onPick,
}: {
  step: PlanStep | null;
  onClose: () => void;
  onPick: (step: PlanStep, choice: SnoozeChoice) => void;
}) {
  const choices = useMemo(() => buildSnoozeChoices(), []);
  return (
    <Modal
      visible={!!step}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalBackdrop} onPress={onClose}>
        <Pressable style={styles.modalCard}>
          {step ? (
            <>
              <View style={styles.modalHeader}>
                <Ionicons name="alarm" size={18} color="#E67E22" />
                <Text style={styles.modalTitle}>Nhắc tôi sau</Text>
              </View>
              <Text style={styles.snoozeStepTitle}>{step.title}</Text>
              <Text style={styles.snoozeNote}>
                Phase 0: chỉ lưu mốc — chưa thực sự bật thông báo. Phase 1 sẽ gửi nhắc nhở qua
                expo-notifications.
              </Text>
              <View style={styles.snoozeChoiceList}>
                {choices.map((choice) => (
                  <TouchableOpacity
                    key={choice.id}
                    style={styles.snoozeChoiceBtn}
                    onPress={() => onPick(step, choice)}
                  >
                    <Ionicons name="time-outline" size={14} color={Colors.primary} />
                    <Text style={styles.snoozeChoiceText}>{choice.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <TouchableOpacity style={styles.modalCloseBtn} onPress={onClose}>
                <Text style={styles.modalCloseBtnText}>Huỷ</Text>
              </TouchableOpacity>
            </>
          ) : null}
        </Pressable>
      </Pressable>
    </Modal>
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

// ─── Helpers ───────────────────────────────────────────────────────────

function formatRelativeShort(iso: string): string {
  try {
    const completed = new Date(iso);
    const now = new Date();
    const diffMin = Math.round((now.getTime() - completed.getTime()) / 60000);
    if (diffMin < 1) return 'vừa xong';
    if (diffMin < 60) return `${diffMin} phút trước`;
    const diffHr = Math.round(diffMin / 60);
    if (diffHr < 24) return `${diffHr} giờ trước`;
    const diffDay = Math.round(diffHr / 24);
    if (diffDay === 1) return 'hôm qua';
    if (diffDay < 7) return `${diffDay} ngày trước`;
    return completed.toLocaleDateString('vi-VN');
  } catch {
    return 'gần đây';
  }
}

// ─── Styles ────────────────────────────────────────────────────────────

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
    marginBottom: 10,
  },
  progressBarTrack: {
    height: 5,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Colors.white,
    borderRadius: 3,
  },
  headerProgress: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 6,
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
  loadingBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  loadingText: {
    fontSize: 14,
    color: Colors.white,
  },
  completionBanner: {
    backgroundColor: '#E8F8EE',
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#27AE6044',
  },
  completionEmojiRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  completionTitle: {
    fontSize: 15,
    fontWeight: '800',
    fontFamily: 'BeVietnamPro_800ExtraBold',
    color: '#1E8449',
  },
  completionDesc: {
    fontSize: 12,
    lineHeight: 17,
    color: Colors.textSecondary,
    marginBottom: 10,
  },
  completionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    backgroundColor: '#27AE60',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  completionBtnText: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.white,
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
    marginBottom: 20,
  },
  groupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  groupIconBg: {
    width: 24,
    height: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupLabel: {
    flex: 1,
    fontSize: 13,
    fontWeight: '800',
    fontFamily: 'BeVietnamPro_800ExtraBold',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  groupCountPill: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  groupCountText: {
    fontSize: 11,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textSecondary,
  },
  timelineWrap: {
    // no extra padding — each row has its own left column
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginBottom: 12,
  },
  timelineLeft: {
    width: 28,
    alignItems: 'center',
    position: 'relative',
  },
  timelineLine: {
    position: 'absolute',
    top: 14,
    bottom: -12,
    left: 13,
    width: 2,
    borderRadius: 1,
  },
  timelineMarker: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
  },
  timelineMarkerDone: {
    backgroundColor: '#27AE60',
    borderColor: '#27AE60',
  },
  timelineMarkerNum: {
    fontSize: 12,
    fontWeight: '800',
    fontFamily: 'BeVietnamPro_800ExtraBold',
  },
  stepCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 12,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  stepCardDone: {
    backgroundColor: '#F7FBF7',
    borderColor: '#27AE6022',
  },
  stepTitle: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textPrimary,
    lineHeight: 20,
    marginBottom: 4,
  },
  stepTitleDone: {
    color: Colors.textMuted,
    textDecorationLine: 'line-through',
  },
  completedTimestamp: {
    fontSize: 11,
    color: '#27AE60',
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
    marginBottom: 4,
  },
  stepDetail: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 17,
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
    marginTop: 4,
  },
  sourceLinkText: {
    flex: 1,
    fontSize: 11,
    color: Colors.primary,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
  },
  snoozePill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 4,
    backgroundColor: '#FEF5E9',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#E67E2244',
  },
  snoozePillText: {
    fontSize: 11,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
    color: '#B6601C',
  },
  stepActionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  stepActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  stepActionBtnText: {
    fontSize: 11,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textSecondary,
  },
  snoozeStepTitle: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  snoozeNote: {
    fontSize: 11,
    color: Colors.textMuted,
    lineHeight: 16,
    marginBottom: 12,
  },
  snoozeChoiceList: {
    gap: 8,
    marginBottom: 12,
  },
  snoozeChoiceBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.background,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  snoozeChoiceText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textPrimary,
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
