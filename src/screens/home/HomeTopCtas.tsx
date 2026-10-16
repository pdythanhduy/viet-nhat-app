// Home — the two top CTAs above the situation chips. Kept in one file
// because they are visually adjacent and have nearly identical shape
// (icon + label + chevron). Both extracted from HomeScreen to keep the
// screen file scannable; rendered output unchanged.

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '../../constants/colors';

interface HomeSearchCtaProps {
  onPress: () => void;
}

export function HomeSearchCta({ onPress }: HomeSearchCtaProps) {
  return (
    <TouchableOpacity
      style={styles.searchCta}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="Tìm nhanh thủ tục"
    >
      <View style={styles.searchCtaIconBg}>
        <Ionicons name="search-outline" size={20} color={Colors.primary} />
      </View>
      <View style={styles.searchCtaText}>
        <Text style={styles.searchCtaTitle}>Tìm nhanh thủ tục</Text>
        <Text style={styles.searchCtaPlaceholder}>
          Visa, chuyển nhà, My Number, thuế...
        </Text>
        <Text style={styles.searchCtaHint}>
          Gõ từ khóa hoặc chọn tình huống bên dưới.
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color={Colors.textMuted} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  searchCta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchCtaIconBg: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchCtaText: { flex: 1 },
  searchCtaTitle: {
    fontSize: 15,
    fontWeight: '800',
    fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.textPrimary,
    marginBottom: 3,
  },
  searchCtaPlaceholder: {
    fontSize: 12,
    color: Colors.textMuted,
    marginBottom: 3,
  },
  searchCtaHint: {
    fontSize: 11,
    color: Colors.textMuted,
    lineHeight: 15,
  },
});
