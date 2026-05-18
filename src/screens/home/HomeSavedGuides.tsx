// Phase R1 — guide-only "Đã lưu" row. Distinct from the existing
// "Đã lưu gần đây" (mixed type) and pinned-bookmarks sections — those
// stay as-is for backward compat. This row surfaces ONLY admin guides
// the user has saved, in newest-first order, hidden when empty.
//
// Reuses the existing bookmarks_v1 AsyncStorage. No new storage util,
// no parallel data model. The caller (HomeScreen) filters the loaded
// bookmark list to guide-type entries before passing them in.

import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { ADMIN_GUIDES } from '../../constants/content/adminGuides';
import type { Bookmark } from '../../utils/bookmarks';

interface HomeSavedGuidesProps {
  bookmarks: Bookmark[];
  onGuidePress: (guideId: string) => void;
  limit?: number;
}

export function HomeSavedGuides({ bookmarks, onGuidePress, limit = 6 }: HomeSavedGuidesProps) {
  const guides = React.useMemo(() => {
    return bookmarks
      .filter((b) => b.type === 'guide')
      .slice(0, limit)
      .map((b) => ADMIN_GUIDES.find((g) => g.id === b.id))
      .filter((g): g is NonNullable<typeof g> => g !== undefined);
  }, [bookmarks, limit]);

  if (guides.length === 0) return null;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {guides.map((guide) => (
        <TouchableOpacity
          key={guide.id}
          style={styles.card}
          onPress={() => onGuidePress(guide.id)}
          accessibilityRole="button"
          accessibilityLabel={`Mở guide đã lưu: ${guide.title}`}
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
