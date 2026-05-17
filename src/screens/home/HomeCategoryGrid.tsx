// Home — "Duyệt theo chủ đề" category grid (the four big topic tiles).
// Section title stays in HomeScreen so that the existing section-title
// style remains shared with the rest of the screen; this component only
// owns the grid itself.

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '../../constants/colors';
import { CATEGORIES, type CategoryTarget } from '../homeScreenContent';

interface HomeCategoryGridProps {
  onCategoryPress: (tab: CategoryTarget) => void;
}

export function HomeCategoryGrid({ onCategoryPress }: HomeCategoryGridProps) {
  return (
    <View style={styles.categoryGrid}>
      {CATEGORIES.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={styles.categoryCard}
          onPress={() => onCategoryPress(category.tab)}
        >
          <View style={[styles.categoryIconBg, { backgroundColor: category.bg }]}>
            <Ionicons name={category.icon} size={24} color={category.color} />
          </View>
          <Text style={[styles.categoryTitle, { color: category.color }]}>
            {category.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 8 },
  categoryCard: {
    width: '47%',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  categoryIconBg: {
    width: 52,
    height: 52,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
    lineHeight: 20,
    textAlign: 'center',
  },
});
