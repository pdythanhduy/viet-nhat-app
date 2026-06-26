// JLPT Recovery — level picker. Entry point (from the Lab) for the
// level-agnostic recovery engine. Levels with a wired-up curriculum are
// tappable; the rest show as "coming soon" until their curriculum is authored.
//
// N2 has its own dedicated, progress-synced course screen, so picking N2 opens
// that existing screen rather than a generic one.

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
  isJlptRecoveryLevelAvailable,
} from '../constants/jlptRecovery';
import type { JlptLevel } from '../services/jlptRecoveryTypes';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function JlptRecoveryLevelsScreen() {
  const navigation = useNavigation<Nav>();

  const openLevel = (level: JlptLevel) => {
    if (!isJlptRecoveryLevelAvailable(level)) return;
    // Only N2 is available today and it has its own course screen.
    if (level === 'N2') navigation.navigate('N2Recovery');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Ionicons name="school-outline" size={24} color={Colors.primary} />
        <Text style={styles.title}>JLPT Recovery</Text>
      </View>
      <Text style={styles.subtitle}>
        Chọn cấp độ để lấy lại năng lực: từ vựng + ngữ pháp + quiz, có tiến độ. Không luyện thi —
        học để dùng thật.
      </Text>

      {JLPT_RECOVERY_LEVELS.map((level) => {
        const config = getJlptRecoveryLevelConfig(level);
        const available = isJlptRecoveryLevelAvailable(level);
        return (
          <TouchableOpacity
            key={level}
            style={[styles.levelCard, !available && styles.levelCardLocked]}
            onPress={() => openLevel(level)}
            activeOpacity={available ? 0.85 : 1}
            disabled={!available}
          >
            <View style={[styles.levelBadge, !available && styles.levelBadgeLocked]}>
              <Text style={[styles.levelBadgeText, !available && styles.levelBadgeTextLocked]}>
                {level}
              </Text>
            </View>
            <View style={styles.levelInfo}>
              <Text style={styles.levelTitle} numberOfLines={1}>
                {config.title}
              </Text>
              <Text style={styles.levelSubtitle} numberOfLines={2}>
                {config.subtitle}
              </Text>
              <Text style={styles.levelMeta}>
                {available ? `${config.dayCount} ngày` : 'Sắp ra mắt'}
              </Text>
            </View>
            {available ? (
              <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
            ) : (
              <Ionicons name="lock-closed" size={18} color={Colors.textMuted} />
            )}
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
  levelCardLocked: { opacity: 0.6 },
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
  levelTitle: {
    fontSize: 16,
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textPrimary,
  },
  levelSubtitle: { fontSize: 12, color: Colors.textSecondary, lineHeight: 18, marginTop: 2 },
  levelMeta: { fontSize: 11, color: Colors.textMuted, marginTop: 4 },
});
