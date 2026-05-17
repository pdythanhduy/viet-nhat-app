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

interface HomeAskCtaProps {
  onPress: () => void;
}

// Hỏi Cẩm Nang — experimental chat-style retrieval. Smaller card so it
// doesn't compete with the main Search CTA, marked BETA so users know
// expectations are low. Phase 1 is local-only retrieval — no network
// call, no AI. See docs/feature-rag-chatbot-assessment.md.
export function HomeAskCta({ onPress }: HomeAskCtaProps) {
  return (
    <TouchableOpacity
      style={styles.askCta}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="Mở Hỏi Cẩm Nang"
    >
      <View style={styles.askCtaIconBg}>
        <Ionicons name="sparkles-outline" size={16} color={Colors.primary} />
      </View>
      <View style={styles.askCtaText}>
        <View style={styles.askCtaTitleRow}>
          <Text style={styles.askCtaTitle}>Hỏi Cẩm Nang</Text>
          <View style={styles.askCtaBeta}>
            <Text style={styles.askCtaBetaText}>BETA</Text>
          </View>
        </View>
        <Text style={styles.askCtaSubtitle}>
          Hỏi tự nhiên bằng tiếng Việt — app sẽ gợi ý bài cần đọc.
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
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
  askCta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  askCtaIconBg: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  askCtaText: { flex: 1 },
  askCtaTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  askCtaTitle: {
    fontSize: 13,
    fontWeight: '800',
    fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.textPrimary,
  },
  askCtaBeta: {
    backgroundColor: Colors.accent,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  askCtaBetaText: {
    color: Colors.primary,
    fontSize: 9,
    fontWeight: '800',
    fontFamily: 'BeVietnamPro_800ExtraBold',
    letterSpacing: 0.4,
  },
  askCtaSubtitle: {
    fontSize: 11,
    color: Colors.textSecondary,
    lineHeight: 15,
  },
});
