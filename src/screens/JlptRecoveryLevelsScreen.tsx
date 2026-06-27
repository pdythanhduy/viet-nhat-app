// JLPT Recovery — level picker (public entry). N5 is the free sample; N4–N1
// require the "Pro" unlock. N2 keeps its own dedicated, progress-synced screen.

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Colors } from '../constants/colors';
import type { RootStackParamList } from '../navigation/AppNavigator';
import {
  JLPT_RECOVERY_LEVELS,
  getJlptRecoveryLevelConfig,
  isJlptLevelFree,
} from '../constants/jlptRecovery';
import { hasRecoveryCurriculum } from '../constants/jlptRecoveryCurriculum';
import { useJlptEntitlement } from '../hooks/useJlptEntitlement';
import type { JlptLevel } from '../services/jlptRecoveryTypes';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function JlptRecoveryLevelsScreen() {
  const navigation = useNavigation<Nav>();
  const { isPro } = useJlptEntitlement();

  const openLevel = (level: JlptLevel) => {
    if (!hasRecoveryCurriculum(level)) return;
    const unlocked = isJlptLevelFree(level) || isPro;
    if (!unlocked) {
      navigation.navigate('JlptPaywall');
      return;
    }
    // N2 keeps its own dedicated, progress-synced course screen.
    if (level === 'N2') navigation.navigate('N2Recovery');
    else navigation.navigate('JlptRecovery', { level });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Ionicons name="school-outline" size={24} color={Colors.primary} />
        <Text style={styles.title}>JLPT Recovery</Text>
      </View>
      <Text style={styles.subtitle}>
        Chọn cấp độ để lấy lại năng lực: từ vựng + ngữ pháp + quiz, có tiến độ. N5 miễn phí; mở
        khóa N4–N1 bằng gói Pro (mua một lần).
      </Text>

      {JLPT_RECOVERY_LEVELS.map((level) => {
        const config = getJlptRecoveryLevelConfig(level);
        const free = isJlptLevelFree(level);
        const unlocked = free || isPro;
        return (
          <TouchableOpacity
            key={level}
            style={[styles.levelCard, !unlocked && styles.levelCardLocked]}
            onPress={() => openLevel(level)}
            activeOpacity={0.85}
          >
            <View style={[styles.levelBadge, !unlocked && styles.levelBadgeLocked]}>
              <Text style={[styles.levelBadgeText, !unlocked && styles.levelBadgeTextLocked]}>
                {level}
              </Text>
            </View>
            <View style={styles.levelInfo}>
              <View style={styles.levelTitleRow}>
                <Text style={styles.levelTitle} numberOfLines={1}>
                  {config.title}
                </Text>
                {free ? (
                  <View style={[styles.chip, styles.freeChip]}>
                    <Text style={[styles.chipText, styles.freeChipText]}>FREE</Text>
                  </View>
                ) : (
                  <View style={[styles.chip, styles.proChip]}>
                    <Text style={[styles.chipText, styles.proChipText]}>PRO</Text>
                  </View>
                )}
              </View>
              <Text style={styles.levelSubtitle} numberOfLines={2}>
                {config.subtitle}
              </Text>
              <Text style={styles.levelMeta}>{config.dayCount} ngày</Text>
            </View>
            <Ionicons
              name={unlocked ? 'chevron-forward' : 'lock-closed'}
              size={unlocked ? 20 : 18}
              color={Colors.textMuted}
            />
          </TouchableOpacity>
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
  subtitle: { fontSize: 13, color: Colors.textSecondary, lineHeight: 20, marginBottom: 16 },
  levelCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: Colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 14,
    marginBottom: 12,
  },
  levelCardLocked: { opacity: 0.65 },
  levelBadge: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelBadgeLocked: { backgroundColor: Colors.background },
  levelBadgeText: {
    fontSize: 18,
    fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.primary,
  },
  levelBadgeTextLocked: { color: Colors.textMuted },
  levelInfo: { flex: 1, minWidth: 0 },
  levelTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  levelTitle: {
    flexShrink: 1,
    fontSize: 16,
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textPrimary,
  },
  chip: { borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2 },
  chipText: { fontSize: 10, fontFamily: 'BeVietnamPro_700Bold', letterSpacing: 0.5 },
  freeChip: { backgroundColor: '#DCFCE7' },
  freeChipText: { color: '#166534' },
  proChip: { backgroundColor: '#FEF3C7' },
  proChipText: { color: '#92400E' },
  levelSubtitle: { fontSize: 12, color: Colors.textSecondary, lineHeight: 18, marginTop: 2 },
  levelMeta: { fontSize: 11, color: Colors.textMuted, marginTop: 4 },
});
