// Home — "Bạn đang ở chặng nào?" horizontal rail of curated journeys.
//
// Speaks to the whole path between Việt Nam and Nhật, not only to people
// already settled in Japan: still in VN and preparing, just arrived,
// bringing family, staying connected with home, going back for good.

import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '../../constants/colors';
import { GUIDE_COLLECTIONS, type GuideCollection } from '../../constants/guideCollections';

interface HomeJourneyRailProps {
  onPress: (collection: GuideCollection) => void;
}

export function HomeJourneyRail({ onPress }: HomeJourneyRailProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.rail}
      // Bleed to the screen edge so the rail reads as swipeable.
      style={styles.bleed}
    >
      {GUIDE_COLLECTIONS.map((collection) => (
        <TouchableOpacity
          key={collection.id}
          style={[styles.card, { backgroundColor: collection.bg }]}
          onPress={() => onPress(collection)}
          activeOpacity={0.85}
          accessibilityRole="button"
          accessibilityLabel={`${collection.title} — ${collection.audience}`}
        >
          <View style={[styles.iconBg, { backgroundColor: collection.color }]}>
            <Ionicons name={collection.icon} size={20} color={Colors.white} />
          </View>
          <Text style={[styles.audience, { color: collection.color }]} numberOfLines={1}>
            {collection.audience}
          </Text>
          <Text style={styles.title} numberOfLines={2}>{collection.title}</Text>
          <View style={styles.footer}>
            <Text style={[styles.count, { color: collection.color }]}>{collection.guideIds.length} bài</Text>
            <Ionicons name="arrow-forward" size={14} color={collection.color} />
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bleed: { marginHorizontal: -16 },
  rail: { gap: 10, paddingHorizontal: 16 },
  card: {
    width: 148,
    borderRadius: 18,
    padding: 14,
    gap: 4,
  },
  iconBg: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  audience: {
    fontSize: 11,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
  },
  title: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '800',
    fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.textPrimary,
    minHeight: 40,
  },
  footer: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6 },
  count: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
  },
});
