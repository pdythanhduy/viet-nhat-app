// My Japan Plan — entry screen.
//
// Phase 0 polish: shows the user's active plan (loaded from planStorage)
// with progress summary + Tiếp tục CTA. Below that, the situation picker
// lets the user start a new flow. If they pick the SAME flow as an existing
// active plan, we ask to replace.
//
// Only "Mất thẻ cư trú" has a real plan in Phase 0; the other two situations
// show "Sắp có". The active-plan card only renders if loadActivePlan returns
// non-null — Phase 1 will extend with multiple active plans across flows.

import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Colors } from '../constants/colors';
import { RootStackParamList } from '../navigation/AppNavigator';
import {
  LOST_CARD_SAMPLE_PLAN,
  PLAN_SITUATIONS,
  PlanSituation,
  PlanSituationId,
} from '../constants/planFlows/lostResidenceCard.sample';
import { loadActivePlan, StoredPlan } from '../utils/planStorage';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function MyJapanPlanScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [activePlan, setActivePlan] = useState<StoredPlan | null>(null);
  const [loading, setLoading] = useState(true);

  // Re-fetch every time the screen comes into focus so Tiếp tục updates
  // after the user ticks steps on PlanDetail and pops back.
  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      (async () => {
        const plan = await loadActivePlan('lost-residence-card');
        if (!cancelled) {
          setActivePlan(plan);
          setLoading(false);
        }
      })();
      return () => {
        cancelled = true;
      };
    }, []),
  );

  const handleContinue = useCallback(() => {
    if (!activePlan) return;
    navigation.navigate('PlanDetail', {
      situationId: activePlan.flowId,
      answers: activePlan.answers,
    });
  }, [activePlan, navigation]);

  const handlePick = useCallback(
    (situation: PlanSituation) => {
      if (!situation.available) return;
      if (activePlan && activePlan.flowId === situation.id) {
        Alert.alert(
          'Đã có lộ trình đang chạy',
          'Bạn đang có lộ trình "' +
            situation.title +
            '" với tiến độ đã lưu. Bắt đầu lại sẽ tạo wizard mới và ghi đè câu trả lời cũ. Tiến độ tích sẽ KHÔNG bị xoá ở bước này — chỉ ghi đè khi bạn hoàn tất wizard.',
          [
            { text: 'Quay lại', style: 'cancel' },
            {
              text: 'Tiếp tục lộ trình cũ',
              onPress: handleContinue,
            },
            {
              text: 'Bắt đầu wizard mới',
              style: 'destructive',
              onPress: () => navigation.navigate('PlanWizard', { situationId: situation.id }),
            },
          ],
        );
        return;
      }
      navigation.navigate('PlanWizard', { situationId: situation.id });
    },
    [activePlan, navigation, handleContinue],
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
            <Ionicons name="map-outline" size={18} color={Colors.white} />
            <Text style={styles.headerTitle}>Lộ trình cá nhân</Text>
            <View style={styles.betaPill}>
              <Text style={styles.betaPillText}>BETA</Text>
            </View>
          </View>
          <Text style={styles.headerDesc}>
            Chọn tình huống bạn đang gặp — app sẽ tạo lộ trình từng bước cho bạn.
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {loading ? (
            <Text style={styles.loadingText}>Đang tải lộ trình…</Text>
          ) : activePlan ? (
            <ActivePlanCard plan={activePlan} onContinue={handleContinue} />
          ) : (
            <View style={styles.emptyBox}>
              <Ionicons name="map" size={28} color={Colors.primary} />
              <Text style={styles.emptyTitle}>Chưa có lộ trình đang chạy</Text>
              <Text style={styles.emptyDesc}>
                Chọn một tình huống bên dưới để bắt đầu lộ trình đầu tiên.
              </Text>
            </View>
          )}

          <Text style={styles.sectionLabel}>
            {activePlan ? 'Bắt đầu lộ trình khác' : 'Tạo lộ trình mới'}
          </Text>

          {PLAN_SITUATIONS.map((situation) => {
            const disabled = !situation.available;
            return (
              <TouchableOpacity
                key={situation.id}
                style={[styles.situationCard, disabled && styles.situationCardDisabled]}
                onPress={() => handlePick(situation)}
                disabled={disabled}
                accessibilityRole="button"
                accessibilityLabel={situation.title}
              >
                <View
                  style={[
                    styles.situationIconBg,
                    { backgroundColor: `${situation.iconColor}18` },
                  ]}
                >
                  <Ionicons name={situation.icon} size={20} color={situation.iconColor} />
                </View>
                <View style={styles.situationText}>
                  <View style={styles.situationTitleRow}>
                    <Text style={styles.situationTitle}>{situation.title}</Text>
                    {disabled ? (
                      <View style={styles.comingSoonPill}>
                        <Text style={styles.comingSoonText}>Sắp có</Text>
                      </View>
                    ) : situation.estimatedDays ? (
                      <Text style={styles.estimatedDays}>{situation.estimatedDays}</Text>
                    ) : null}
                  </View>
                  <Text style={styles.situationDesc}>{situation.description}</Text>
                </View>
                {!disabled ? (
                  <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
                ) : null}
              </TouchableOpacity>
            );
          })}

          <View style={styles.disclaimerBox}>
            <Ionicons name="information-circle-outline" size={14} color={Colors.textMuted} />
            <Text style={styles.disclaimerText}>
              Lộ trình do app tạo từ bài hướng dẫn có sẵn — chỉ tham khảo, không thay
              tư vấn 入管 / luật sư. Tiến độ tự lưu trên máy bạn, không gửi đi đâu.
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

// ─── Active plan card ──────────────────────────────────────────────────

function ActivePlanCard({
  plan,
  onContinue,
}: {
  plan: StoredPlan;
  onContinue: () => void;
}) {
  // Phase 0 has hardcoded sample groups for the one flow — derive progress
  // from there. Phase 1 will store group structure inside the plan itself
  // so we don't depend on the sample.
  if (plan.flowId !== 'lost-residence-card') return null;

  const totalSteps = LOST_CARD_SAMPLE_PLAN.groups.reduce(
    (sum, g) => sum + g.steps.length,
    0,
  );
  const doneCount = LOST_CARD_SAMPLE_PLAN.groups.reduce(
    (sum, g) =>
      sum + g.steps.filter((s) => !!plan.completedSteps[s.id]).length,
    0,
  );
  const percent = totalSteps === 0 ? 0 : Math.round((doneCount / totalSteps) * 100);
  const isComplete = totalSteps > 0 && doneCount === totalSteps;

  return (
    <TouchableOpacity
      style={styles.activePlanCard}
      onPress={onContinue}
      accessibilityRole="button"
    >
      <View style={styles.activePlanHeader}>
        <View style={styles.activePlanIconBg}>
          <Ionicons name="map" size={18} color={Colors.primary} />
        </View>
        <View style={styles.activePlanTextBlock}>
          <Text style={styles.activePlanLabel}>ĐANG CHẠY</Text>
          <Text style={styles.activePlanTitle}>{LOST_CARD_SAMPLE_PLAN.title}</Text>
        </View>
        {isComplete ? (
          <View style={styles.activePlanCompletePill}>
            <Ionicons name="trophy" size={12} color="#27AE60" />
            <Text style={styles.activePlanCompleteText}>Xong!</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.activePlanProgressBar}>
        <View
          style={[
            styles.activePlanProgressFill,
            { width: `${percent}%`, backgroundColor: isComplete ? '#27AE60' : Colors.primary },
          ]}
        />
      </View>
      <View style={styles.activePlanProgressRow}>
        <Text style={styles.activePlanProgressText}>
          {doneCount}/{totalSteps} việc · {percent}%
        </Text>
        <View style={styles.activePlanContinueRow}>
          <Text style={styles.activePlanContinueText}>
            {isComplete ? 'Xem lại' : 'Tiếp tục'}
          </Text>
          <Ionicons name="chevron-forward" size={14} color={Colors.primary} />
        </View>
      </View>
    </TouchableOpacity>
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
    fontSize: 22,
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
  content: {
    flex: 1,
    backgroundColor: Colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },
  loadingText: {
    fontSize: 13,
    color: Colors.textMuted,
    textAlign: 'center',
    paddingVertical: 20,
  },
  emptyBox: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    gap: 6,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  emptyTitle: {
    fontSize: 14,
    fontWeight: '800',
    fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.textPrimary,
    marginTop: 6,
  },
  emptyDesc: {
    fontSize: 12,
    lineHeight: 17,
    color: Colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 12,
  },
  activePlanCard: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 14,
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  activePlanHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  activePlanIconBg: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activePlanTextBlock: { flex: 1 },
  activePlanLabel: {
    fontSize: 10,
    fontWeight: '800',
    fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.primary,
    letterSpacing: 0.6,
    marginBottom: 2,
  },
  activePlanTitle: {
    fontSize: 15,
    fontWeight: '800',
    fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.textPrimary,
  },
  activePlanCompletePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#E8F8EE',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  activePlanCompleteText: {
    fontSize: 11,
    fontWeight: '800',
    fontFamily: 'BeVietnamPro_800ExtraBold',
    color: '#1E8449',
  },
  activePlanProgressBar: {
    height: 6,
    backgroundColor: Colors.border,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  activePlanProgressFill: {
    height: '100%',
    borderRadius: 3,
  },
  activePlanProgressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  activePlanProgressText: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
  },
  activePlanContinueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  activePlanContinueText: {
    fontSize: 13,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.primary,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 8,
  },
  situationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  situationCardDisabled: {
    opacity: 0.6,
  },
  situationIconBg: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  situationText: { flex: 1 },
  situationTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  situationTitle: {
    fontSize: 14,
    fontWeight: '800',
    fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.textPrimary,
  },
  comingSoonPill: {
    backgroundColor: Colors.border,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  comingSoonText: {
    color: Colors.textSecondary,
    fontSize: 9,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
  },
  estimatedDays: {
    fontSize: 10,
    color: Colors.textMuted,
    fontWeight: '600',
    fontFamily: 'BeVietnamPro_600SemiBold',
  },
  situationDesc: {
    fontSize: 12,
    lineHeight: 17,
    color: Colors.textSecondary,
  },
  disclaimerBox: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 16,
    paddingHorizontal: 4,
  },
  disclaimerText: {
    flex: 1,
    fontSize: 11,
    color: Colors.textMuted,
    lineHeight: 15,
  },
});
