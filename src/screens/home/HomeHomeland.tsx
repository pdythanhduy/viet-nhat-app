// Home — "Góc quê nhà": Vietnam clock, today's lunar date, and the next
// Vietnamese occasion (Tết countdown always visible). Computed on-device
// from src/utils/vietCalendar; refreshes once a minute while mounted.

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '../../constants/colors';
import { getHomelandSnapshot } from '../../utils/vietCalendar';

interface HomeHomelandProps {
  onRemittancePress: () => void;
  onCommunityPress: () => void;
}

function useNow(intervalMs: number) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return now;
}

function daysLabel(daysLeft: number) {
  return daysLeft === 0 ? 'Hôm nay' : `Còn ${daysLeft} ngày`;
}

export function HomeHomeland({ onRemittancePress, onCommunityPress }: HomeHomelandProps) {
  const now = useNow(60 * 1000);
  const snapshot = getHomelandSnapshot(now);
  const next = snapshot.nextOccasion;

  return (
    <View style={styles.card}>
      <View style={styles.flagStripe} />
      <View style={styles.titleRow}>
        <Text style={styles.eyebrow}>GÓC QUÊ NHÀ</Text>
        <Text style={styles.lunarYear}>{snapshot.lunarYearLabel}</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Ionicons name="time-outline" size={16} color={Colors.vnRed} />
          <Text style={styles.statValue}>{snapshot.vietnamClock}</Text>
          <Text style={styles.statLabel}>Giờ Việt Nam</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.stat}>
          <Ionicons name="moon-outline" size={16} color={Colors.vnRed} />
          <Text style={styles.statValue} numberOfLines={1}>
            {snapshot.lunarDayLabel}
          </Text>
          <Text style={styles.statLabel} numberOfLines={1}>
            Âm lịch · {snapshot.lunarMonthLabel}
          </Text>
        </View>
      </View>

      <Text style={styles.callHint}>{snapshot.callHint}</Text>

      <View style={styles.occasionRow}>
        <View style={[styles.occasion, styles.occasionTet]}>
          <Text style={styles.occasionDays}>{daysLabel(snapshot.tetDaysLeft)}</Text>
          <Text style={styles.occasionName}>Tết {snapshot.tetYearLabel}</Text>
        </View>
        {next ? (
          <View style={styles.occasion}>
            <Text style={[styles.occasionDays, styles.occasionDaysMuted]}>{daysLabel(next.daysLeft)}</Text>
            <Text style={styles.occasionName} numberOfLines={2}>{next.name}</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.linkRow}>
        <TouchableOpacity style={styles.link} onPress={onRemittancePress} activeOpacity={0.75}>
          <Ionicons name="paper-plane-outline" size={14} color={Colors.vnRed} />
          <Text style={styles.linkText}>Gửi tiền về nhà</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.link} onPress={onCommunityPress} activeOpacity={0.75}>
          <Ionicons name="people-outline" size={14} color={Colors.vnRed} />
          <Text style={styles.linkText}>Cộng đồng người Việt</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#F3DCD9',
    padding: 16,
    paddingTop: 18,
    gap: 12,
    overflow: 'hidden',
  },
  flagStripe: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: Colors.vnRed,
  },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  eyebrow: {
    fontSize: 11,
    fontWeight: '800',
    fontFamily: 'BeVietnamPro_800ExtraBold',
    letterSpacing: 0.9,
    color: Colors.vnRed,
  },
  lunarYear: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.gold,
  },

  statsRow: { flexDirection: 'row', alignItems: 'stretch' },
  stat: { flex: 1, gap: 3 },
  divider: { width: 1, backgroundColor: Colors.border, marginHorizontal: 14 },
  statValue: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '800',
    fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.textPrimary,
  },
  statLabel: { fontSize: 11, color: Colors.textSecondary },

  callHint: {
    fontSize: 12,
    lineHeight: 17,
    color: Colors.textSecondary,
    marginTop: -4,
  },

  occasionRow: { flexDirection: 'row', gap: 8 },
  occasion: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    gap: 2,
  },
  occasionTet: { backgroundColor: '#FFF4E0' },
  occasionDays: {
    fontSize: 15,
    fontWeight: '800',
    fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.vnRed,
  },
  occasionDaysMuted: { color: Colors.textPrimary },
  occasionName: { fontSize: 12, lineHeight: 16, color: Colors.textSecondary },

  linkRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  link: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 2 },
  linkText: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.vnRed,
  },
});
