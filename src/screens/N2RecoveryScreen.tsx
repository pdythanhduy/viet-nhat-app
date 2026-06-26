// N2 Recovery — course home: progress dashboard + Phase/Day browser.
// Private (reached from the Lab). Stage 1: browse + mark days done (synced).

import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../constants/colors';
import type { RootStackParamList } from '../navigation/AppNavigator';
import {
  N2_PHASES,
  N2_TOTAL_DAYS,
  N2Day,
  getN2DaysOfPhase,
} from '../constants/n2RecoveryCurriculum';
import { useN2Progress } from '../hooks/useN2Progress';
import { getCurrentDay, pullRemote } from '../services/n2Progress';

type Nav = NativeStackNavigationProp<RootStackParamList>;

function kindBadge(kind: N2Day['kind']): { label: string; color: string; bg: string } | null {
  if (kind === 'review') return { label: 'Ôn tập', color: '#92400E', bg: '#FEF3C7' };
  if (kind === 'test') return { label: 'Kiểm tra', color: '#B91C1C', bg: '#FEE2E2' };
  return null;
}

export default function N2RecoveryScreen() {
  const navigation = useNavigation<Nav>();
  const progress = useN2Progress();
  const doneSet = useMemo(() => new Set(progress.completedDays), [progress.completedDays]);

  const currentDay = getCurrentDay();
  const completed = progress.completedDays.length;
  const percent = Math.round((completed / N2_TOTAL_DAYS) * 100);

  // Expand the phase that contains the current day by default.
  const currentPhase = N2_PHASES.find((p) => currentDay >= p.dayFrom && currentDay <= p.dayTo);
  const [expanded, setExpanded] = useState<number | null>(currentPhase?.id ?? 1);

  // Pull the owner's synced progress on mount (no-op if not signed in).
  useEffect(() => {
    void pullRemote();
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Ionicons name="school-outline" size={24} color={Colors.primary} />
        <Text style={styles.title}>JLPT Recovery N2 — 100 ngày</Text>
      </View>
      <Text style={styles.subtitle}>
        Lấy lại N2 + giao tiếp + business. Không luyện thi — học 読む・聞く・話す・書く.
      </Text>

      {/* Dashboard */}
      <View style={styles.dashboard}>
        <View style={styles.dashRow}>
          <View style={styles.dashItem}>
            <Text style={styles.dashNumber}>{currentDay}</Text>
            <Text style={styles.dashLabel}>Ngày hiện tại</Text>
          </View>
          <View style={styles.dashDivider} />
          <View style={styles.dashItem}>
            <Text style={styles.dashNumber}>
              {completed}
              <Text style={styles.dashNumberSmall}>/{N2_TOTAL_DAYS}</Text>
            </Text>
            <Text style={styles.dashLabel}>Đã hoàn thành</Text>
          </View>
          <View style={styles.dashDivider} />
          <View style={styles.dashItem}>
            <Text style={styles.dashNumber}>{percent}%</Text>
            <Text style={styles.dashLabel}>Tiến độ</Text>
          </View>
        </View>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${percent}%` }]} />
        </View>
        <TouchableOpacity
          style={styles.continueBtn}
          onPress={() => navigation.navigate('N2DayDetail', { day: currentDay })}
          activeOpacity={0.85}
        >
          <Ionicons name="play" size={16} color={Colors.white} />
          <Text style={styles.continueBtnText}>Học tiếp Day {currentDay}</Text>
        </TouchableOpacity>
      </View>

      {/* Phase accordion */}
      {N2_PHASES.map((phase) => {
        const days = getN2DaysOfPhase(phase.id);
        const doneInPhase = days.filter((x) => doneSet.has(x.day)).length;
        const isOpen = expanded === phase.id;
        return (
          <View key={phase.id} style={styles.phaseCard}>
            <TouchableOpacity
              style={styles.phaseHeader}
              onPress={() => setExpanded(isOpen ? null : phase.id)}
              activeOpacity={0.8}
            >
              <View style={styles.phaseHeaderLeft}>
                <Text style={styles.phaseJp}>{phase.jp}</Text>
                <Text style={styles.phaseVi}>{phase.vi}</Text>
                <Text style={styles.phaseMeta}>
                  Day {phase.dayFrom}–{phase.dayTo} · {doneInPhase}/{days.length} xong
                </Text>
              </View>
              <Ionicons
                name={isOpen ? 'chevron-up' : 'chevron-down'}
                size={20}
                color={Colors.textMuted}
              />
            </TouchableOpacity>

            {isOpen && (
              <View style={styles.dayList}>
                {days.map((dy) => {
                  const badge = kindBadge(dy.kind);
                  const done = doneSet.has(dy.day);
                  return (
                    <TouchableOpacity
                      key={dy.day}
                      style={styles.dayRow}
                      onPress={() => navigation.navigate('N2DayDetail', { day: dy.day })}
                      activeOpacity={0.7}
                    >
                      <View style={[styles.dayNumBox, done && styles.dayNumBoxDone]}>
                        {done ? (
                          <Ionicons name="checkmark" size={16} color={Colors.white} />
                        ) : (
                          <Text style={styles.dayNum}>{dy.day}</Text>
                        )}
                      </View>
                      <View style={styles.dayInfo}>
                        <Text style={styles.dayTheme} numberOfLines={1}>
                          {dy.theme}
                        </Text>
                        <Text style={styles.dayVocab} numberOfLines={1}>
                          {dy.vocabTopic}
                        </Text>
                      </View>
                      {badge && (
                        <View style={[styles.badge, { backgroundColor: badge.bg }]}>
                          <Text style={[styles.badgeText, { color: badge.color }]}>
                            {badge.label}
                          </Text>
                        </View>
                      )}
                      <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 16, paddingBottom: 40 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  title: {
    fontSize: 21,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textPrimary,
  },
  subtitle: { fontSize: 13, color: Colors.textSecondary, lineHeight: 20, marginBottom: 14 },
  dashboard: {
    backgroundColor: Colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 16,
    marginBottom: 16,
  },
  dashRow: { flexDirection: 'row', alignItems: 'center' },
  dashItem: { flex: 1, alignItems: 'center' },
  dashDivider: { width: 1, height: 36, backgroundColor: Colors.border },
  dashNumber: {
    fontSize: 24,
    fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.primary,
  },
  dashNumberSmall: { fontSize: 14, color: Colors.textMuted },
  dashLabel: { fontSize: 11, color: Colors.textSecondary, marginTop: 2 },
  progressTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.border,
    marginTop: 14,
    overflow: 'hidden',
  },
  progressFill: { height: 8, borderRadius: 4, backgroundColor: Colors.primary },
  continueBtn: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingVertical: 12,
    marginTop: 14,
  },
  continueBtnText: {
    color: Colors.white,
    fontSize: 14,
    fontFamily: 'BeVietnamPro_700Bold',
  },
  phaseCard: {
    backgroundColor: Colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 12,
    overflow: 'hidden',
  },
  phaseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
  },
  phaseHeaderLeft: { flex: 1 },
  phaseJp: {
    fontSize: 16,
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textPrimary,
  },
  phaseVi: { fontSize: 12, color: Colors.primary, marginTop: 1 },
  phaseMeta: { fontSize: 11, color: Colors.textMuted, marginTop: 3 },
  dayList: { borderTopWidth: 1, borderTopColor: Colors.border },
  dayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderTopWidth: 1,
    borderTopColor: Colors.background,
  },
  dayNumBox: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayNumBoxDone: { backgroundColor: Colors.success, borderColor: Colors.success },
  dayNum: { fontSize: 13, fontFamily: 'BeVietnamPro_700Bold', color: Colors.textSecondary },
  dayInfo: { flex: 1, minWidth: 0 },
  dayTheme: { fontSize: 14, color: Colors.textPrimary, fontFamily: 'BeVietnamPro_600SemiBold' },
  dayVocab: { fontSize: 11, color: Colors.textMuted, marginTop: 1 },
  badge: { borderRadius: 6, paddingHorizontal: 7, paddingVertical: 3 },
  badgeText: { fontSize: 10, fontFamily: 'BeVietnamPro_700Bold' },
});
