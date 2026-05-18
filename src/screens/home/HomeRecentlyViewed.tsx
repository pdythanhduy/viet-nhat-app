// Home — "Đã xem gần đây" retention surface. Renders the last up-to-5
// admin guides the user opened, newest first. Hidden when the list is
// empty (no nag/empty state). Loads from AsyncStorage on focus via the
// caller — this component is presentational only.

import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { ADMIN_GUIDES } from '../../constants/content/adminGuides';
import type { RecentlyViewedGuide } from '../../utils/recentlyViewedGuides';

interface HomeRecentlyViewedProps {
  entries: RecentlyViewedGuide[];
  onGuidePress: (guideId: string) => void;
}

export function HomeRecentlyViewed({ entries, onGuidePress }: HomeRecentlyViewedProps) {
  // Resolve stored ids back to AdminGuide objects so we can render per-guide
  // icon + color. Filter out ids that no longer exist (e.g., a guide was
  // renamed or removed in an app update) — the dead entry stays in storage
  // but is silently skipped so the row never crashes.
  const resolved = React.useMemo(() => {
    return entries
      .map((e) => ADMIN_GUIDES.find((g) => g.id === e.guideId))
      .filter((g): g is NonNullable<typeof g> => g !== undefined);
  }, [entries]);

  if (resolved.length === 0) return null;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {resolved.map((guide) => (
        <TouchableOpacity
          key={guide.id}
          style={styles.card}
          onPress={() => onGuidePress(guide.id)}
          accessibilityRole="button"
          accessibilityLabel={`Mở lại ${guide.title}`}
        >
          <View style={[styles.iconBg, { backgroundColor: `${guide.color}18` }]}>
            <Ionicons name={guide.icon} size={20} color={guide.color} />
          </View>
          <Text style={styles.title} numberOfLines={2}>{guide.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    gap: 10,
    paddingRight: 8,
  },
  card: {
    width: 140,
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 8,
  },
  iconBg: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textPrimary,
    minHeight: 32,
  },
});
