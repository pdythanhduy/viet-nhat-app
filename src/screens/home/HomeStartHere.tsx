// Phase UX1 — "Bắt đầu ở đâu?" beginner-friendly entry shortcuts.
//
// Renders 5 lightweight chips that route a fresh user (or a returning
// user under cognitive load) to the most-asked-about topics:
//   Mới sang Nhật / Visa / Thuế / Khẩn cấp / Đi làm
//
// Hidden when the user already has progress signal (in-progress guides,
// bookmarks, recently-viewed) so it doesn't compete with active context.
// This is the discovery surface for the COLD-START state.

import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { logEmergencyCtaOpened, logHomeStartHerePressed } from '../../utils/analytics';

type Shortcut = {
  id: 'newcomer' | 'visa' | 'tax' | 'emergency' | 'jobs';
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
};

const SHORTCUTS: ReadonlyArray<Shortcut> = [
  { id: 'newcomer',  label: 'Mới sang Nhật',  icon: 'rocket-outline',     color: '#1F8A70' },
  { id: 'visa',      label: 'Visa',           icon: 'card-outline',       color: '#185FA5' },
  { id: 'tax',       label: 'Thuế',           icon: 'cash-outline',       color: '#D35400' },
  { id: 'emergency', label: 'Khẩn cấp',       icon: 'alert-circle-outline', color: '#C0392B' },
  { id: 'jobs',      label: 'Đi làm',         icon: 'briefcase-outline',  color: '#8E44AD' },
];

interface HomeStartHereProps {
  onShortcutPress: (id: Shortcut['id']) => void;
}

export function HomeStartHere({ onShortcutPress }: HomeStartHereProps) {
  const handlePress = (id: Shortcut['id']) => {
    void logHomeStartHerePressed(id);

    if (id === 'emergency') {
      void logEmergencyCtaOpened('home_start_here');
    }

    onShortcutPress(id);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {SHORTCUTS.map((s) => (
        <TouchableOpacity
          key={s.id}
          style={styles.chip}
          onPress={() => handlePress(s.id)}
          accessibilityRole="button"
          accessibilityLabel={s.label}
        >
          <View style={[styles.iconBg, { backgroundColor: `${s.color}18` }]}>
            <Ionicons name={s.icon} size={20} color={s.color} />
          </View>
          <Text style={styles.label} numberOfLines={1}>{s.label}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    gap: 8,
    paddingRight: 8,
  },
  chip: {
    minWidth: 96,
    backgroundColor: Colors.white,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    gap: 6,
  },
  iconBg: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textPrimary,
  },
});
