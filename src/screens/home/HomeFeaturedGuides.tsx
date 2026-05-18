// Phase 2B: Home — "Hay được dùng" featured guides row. Renders the
// editorially-flagged (`priority: 'high'`) admin guides as compact cards
// so users hit the high-impact guides without typing a query. The list
// is memoized one level up (HomeScreen) so this component re-renders
// only when the input slice changes, not on every Home re-render.

import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { ADMIN_GUIDES } from '../../constants/content/adminGuides';
import { getFeaturedGuides } from '../../utils/searchIndex';

interface HomeFeaturedGuidesProps {
  onGuidePress: (guideId: string) => void;
  limit?: number;
}

export function HomeFeaturedGuides({ onGuidePress, limit = 6 }: HomeFeaturedGuidesProps) {
  // Resolve SearchResultItem ids back to AdminGuide objects so we can
  // render with the per-guide icon + color. Lookup is O(limit × N) but
  // N ≈ 130 and limit ≤ 6, so it's effectively constant.
  const featured = React.useMemo(() => {
    const ids = getFeaturedGuides(limit).map((g) => g.id);
    return ids
      .map((id) => ADMIN_GUIDES.find((g) => g.id === id))
      .filter((g): g is NonNullable<typeof g> => g !== undefined);
  }, [limit]);

  if (featured.length === 0) return null;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {featured.map((guide) => (
        <TouchableOpacity
          key={guide.id}
          style={styles.card}
          onPress={() => onGuidePress(guide.id)}
          accessibilityRole="button"
          accessibilityLabel={guide.title}
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
