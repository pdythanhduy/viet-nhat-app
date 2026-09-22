// Home — the one card that dominates the screen.
//
// Everything else on Home is deliberately quieter than this. The variant
// is picked by urgency: a deadline the user actually has beats a guide
// they left unfinished, which beats asking them what they need.

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '../../constants/colors';
import type { QuickAction } from './HomeQuickActions';

export type HomeHeroProps =
  | {
      variant: 'deadline';
      label: string;
      daysLeft: number;
      ctaLabel: string;
      onPress: () => void;
    }
  | {
      variant: 'suggestion';
      title: string;
      description: string;
      ctaLabel: string;
      onPress: () => void;
    }
  | {
      variant: 'continue';
      title: string;
      metaChips: string[];
      checked: number;
      total: number;
      ctaLabel: string;
      onPress: () => void;
    }
  | {
      variant: 'situations';
      actions: ReadonlyArray<QuickAction>;
      onActionPress: (action: QuickAction) => void;
    };

function Eyebrow({ icon, text, color }: { icon: keyof typeof Ionicons.glyphMap; text: string; color: string }) {
  return (
    <View style={styles.eyebrow}>
      <Ionicons name={icon} size={15} color={color} />
      <Text style={[styles.eyebrowText, { color }]}>{text}</Text>
    </View>
  );
}

function MetaRow({ chips }: { chips: string[] }) {
  if (chips.length === 0) return null;
  return (
    <View style={styles.metaRow}>
      {chips.map((chip, index) => (
        <React.Fragment key={chip}>
          {index > 0 ? <Text style={styles.metaDot}>·</Text> : null}
          <Text style={styles.metaText}>{chip}</Text>
        </React.Fragment>
      ))}
    </View>
  );
}

function PrimaryCta({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.cta} onPress={onPress} activeOpacity={0.85} accessibilityRole="button">
      <Text style={styles.ctaText}>{label}</Text>
      <Ionicons name="arrow-forward" size={17} color={Colors.white} />
    </TouchableOpacity>
  );
}

export function HomeHero(props: HomeHeroProps) {
  if (props.variant === 'deadline') {
    return (
      <View style={[styles.card, styles.cardUrgent]}>
        <Eyebrow icon="warning-outline" text="CẦN LÀM SỚM" color={Colors.danger} />
        <Text style={styles.title}>{props.label}</Text>
        <Text style={styles.subtitle}>
          Còn {props.daysLeft} ngày nữa đến hạn. Chuẩn bị sớm để không bị dồn vào phút cuối.
        </Text>
        <PrimaryCta label={props.ctaLabel} onPress={props.onPress} />
      </View>
    );
  }

  if (props.variant === 'suggestion') {
    return (
      <View style={[styles.card, styles.cardProgress]}>
        <Eyebrow icon="sparkles-outline" text="GỢI Ý CHO BẠN" color={Colors.primary} />
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.subtitle}>{props.description}</Text>
        <PrimaryCta label={props.ctaLabel} onPress={props.onPress} />
      </View>
    );
  }

  if (props.variant === 'continue') {
    const ratio = props.total > 0 ? props.checked / props.total : 0;
    return (
      <View style={[styles.card, styles.cardProgress]}>
        <Eyebrow icon="play-circle-outline" text="ĐANG LÀM DỞ" color={Colors.primary} />
        <Text style={styles.title}>{props.title}</Text>
        <MetaRow chips={props.metaChips} />
        <View style={styles.progressRow}>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${Math.round(ratio * 100)}%` }]} />
          </View>
          <Text style={styles.progressText}>
            {props.checked}/{props.total}
          </Text>
        </View>
        <PrimaryCta label={props.ctaLabel} onPress={props.onPress} />
      </View>
    );
  }

  return (
    <View style={[styles.card, styles.cardProgress]}>
      <Eyebrow icon="compass-outline" text="BẮT ĐẦU" color={Colors.primary} />
      <Text style={styles.title}>Bạn đang cần gì?</Text>
      <Text style={styles.subtitle}>
        Chọn tình huống đang gặp — app đưa thẳng bạn tới hướng dẫn đúng, không phải tự dò.
      </Text>
      <View style={styles.chipWrap}>
        {props.actions.map((action) => (
          <TouchableOpacity
            key={action.id}
            style={[styles.chip, { backgroundColor: action.bg }]}
            onPress={() => props.onActionPress(action)}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel={action.title}
          >
            <Ionicons name={action.icon} size={16} color={action.color} />
            <Text style={[styles.chipText, { color: action.color }]}>{action.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 18,
    borderLeftWidth: 5,
    padding: 20,
    gap: 14,
    shadowColor: '#1A1A2E',
    shadowOpacity: 0.07,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  cardUrgent: { borderLeftColor: Colors.danger },
  cardProgress: { borderLeftColor: Colors.primary },

  eyebrow: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  eyebrowText: {
    fontSize: 11,
    fontWeight: '800',
    fontFamily: 'BeVietnamPro_800ExtraBold',
    letterSpacing: 0.9,
  },

  title: {
    fontSize: 23,
    lineHeight: 30,
    fontWeight: '800',
    fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.textPrimary,
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 19,
    color: Colors.textSecondary,
    marginTop: -6,
  },

  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.border,
  },
  metaText: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'BeVietnamPro_600SemiBold',
    color: Colors.textSecondary,
  },
  metaDot: { fontSize: 12, color: Colors.textMuted },

  progressRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  progressTrack: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.border,
    overflow: 'hidden',
  },
  progressFill: { height: 6, backgroundColor: Colors.primary },
  progressText: {
    fontSize: 11,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textSecondary,
  },

  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.primary,
    borderRadius: 13,
    paddingVertical: 15,
  },
  ctaText: {
    fontSize: 15,
    fontWeight: '800',
    fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.white,
  },

  chipWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    borderRadius: 11,
    paddingVertical: 11,
    paddingHorizontal: 13,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
  },
});
