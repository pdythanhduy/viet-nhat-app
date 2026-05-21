// Home — "Tôi đang cần gì?" situation chips.
//
// Each card maps to a safe destination (Search query, dedicated screen,
// or the matching tab). The mapping itself stays in HomeScreen so the
// component remains a pure presenter; this file only owns the catalog of
// situations + the visual grid.

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '../../constants/colors';
import type { EventMap } from '../../utils/analytics';

export type QuickActionId =
  | 'newcomer'
  | 'visa-renewal'
  | 'moving'
  | 'official-mail'
  | 'tax-insurance'
  | 'lost-document'
  | 'emergency';

// Compile-time contract: QuickActionId must stay bidirectionally
// equal to the analytics event's action_id enum. Adding a quick
// action here without extending EventMap (or vice versa) makes the
// type below resolve to `false` and breaks tsc — protects against
// silent analytics drift when the situations catalog evolves.
//
// Uses the standard variance trick for type equality (rather than
// importing the union into analytics.ts, which would drag UI deps
// into the otherwise pure analytics module).
type _QuickActionIdMatchesAnalytics = (<T>() => T extends QuickActionId ? 1 : 2) extends (
  <T>() => T extends EventMap['home_quick_action_pressed']['action_id'] ? 1 : 2
)
  ? true
  : false;
// The constant must be assignable to `true`. If the unions drift the
// type resolves to `false` and this line fails.
const _quickActionIdContract: _QuickActionIdMatchesAnalytics = true;
void _quickActionIdContract;

export interface QuickAction {
  id: QuickActionId;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  bg: string;
}

export const QUICK_ACTIONS: ReadonlyArray<QuickAction> = [
  { id: 'newcomer',       title: 'Mới sang Nhật',         icon: 'compass-outline',       color: '#185FA5', bg: '#E5EFF8' },
  { id: 'visa-renewal',   title: 'Gia hạn visa',          icon: 'card-outline',          color: '#16A085', bg: '#E5F5F1' },
  { id: 'moving',         title: 'Chuyển nhà',            icon: 'home-outline',          color: '#D35400', bg: '#FBEDE0' },
  { id: 'official-mail',  title: 'Nhận thư từ cơ quan',   icon: 'mail-outline',          color: '#8E44AD', bg: '#F1E9F6' },
  { id: 'tax-insurance',  title: 'Thuế / bảo hiểm',       icon: 'receipt-outline',       color: '#2C7A7B', bg: '#E1EFEF' },
  { id: 'lost-document',  title: 'Mất giấy tờ',           icon: 'alert-circle-outline',  color: '#C0392B', bg: '#F9E5E2' },
  { id: 'emergency',      title: 'Khẩn cấp',              icon: 'medkit-outline',        color: '#E74C3C', bg: '#FDECEA' },
];

interface HomeQuickActionsProps {
  onActionPress: (action: QuickAction) => void;
}

export function HomeQuickActions({ onActionPress }: HomeQuickActionsProps) {
  return (
    <View style={styles.quickActionsSection}>
      <Text style={styles.quickActionsTitle}>Tôi đang cần gì?</Text>
      <Text style={styles.quickActionsHint}>
        Bấm vào tình huống đang gặp để vào đúng hướng dẫn.
      </Text>
      <View style={styles.quickActionsGrid}>
        {QUICK_ACTIONS.map((action) => (
          <TouchableOpacity
            key={action.id}
            style={styles.quickActionCard}
            onPress={() => onActionPress(action)}
            accessibilityRole="button"
            accessibilityLabel={action.title}
          >
            <View style={[styles.quickActionIconBg, { backgroundColor: action.bg }]}>
              <Ionicons name={action.icon} size={20} color={action.color} />
            </View>
            <Text style={styles.quickActionTitle}>{action.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  quickActionsSection: {
    marginBottom: 16,
  },
  quickActionsTitle: {
    fontSize: 17,
    fontWeight: '800',
    fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  quickActionsHint: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 17,
    marginBottom: 12,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  quickActionCard: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: Colors.white,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  quickActionIconBg: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionTitle: {
    flex: 1,
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textPrimary,
    lineHeight: 16,
  },
});
