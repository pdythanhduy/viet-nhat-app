// Home — "Cho người mới sang Nhật" onboarding cards. Renders the list
// of ONBOARDING_GUIDES underneath the section title (title stays in
// HomeScreen). Each card opens the matching admin guide.

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '../../constants/colors';
import { ONBOARDING_GUIDES } from '../homeScreenContent';

interface HomeOnboardingGuidesProps {
  onGuidePress: (guideId: string) => void;
}

export function HomeOnboardingGuides({ onGuidePress }: HomeOnboardingGuidesProps) {
  return (
    <>
      {ONBOARDING_GUIDES.map((guide) => (
        <TouchableOpacity
          key={guide.guideId}
          style={styles.firstStepsCard}
          onPress={() => onGuidePress(guide.guideId)}
        >
          <View style={styles.firstStepsLeft}>
            <View style={styles.firstStepsIconBg}>
              <Ionicons name={guide.icon} size={20} color={Colors.primary} />
            </View>
            <View style={styles.firstStepsText}>
              <Text style={styles.firstStepsTitle}>{guide.title}</Text>
              <Text style={styles.firstStepsDesc}>{guide.description}</Text>
            </View>
          </View>
          <Ionicons name="arrow-forward-circle" size={26} color={Colors.primary} />
        </TouchableOpacity>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  firstStepsCard: {
    backgroundColor: Colors.accent,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: `${Colors.primary}30`,
  },
  firstStepsLeft: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, flex: 1 },
  firstStepsIconBg: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  firstStepsText: { flex: 1 },
  firstStepsTitle: {
    fontSize: 14,
    fontWeight: '800',
    fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.textPrimary,
    marginBottom: 3,
  },
  firstStepsDesc: { fontSize: 12, color: Colors.textSecondary, lineHeight: 17 },
});
