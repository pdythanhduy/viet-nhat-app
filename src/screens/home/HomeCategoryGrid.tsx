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
          activeOpacity={0.85}
          accessibilityRole="button"
          accessibilityLabel={category.title.replace('\n', ' ')}
        >
          <View style={[styles.categoryIconBg, { backgroundColor: category.bg }]}>
            <Ionicons name={category.icon} size={22} color={category.color} />
          </View>
          <Text style={styles.categoryTitle}>{category.title}</Text>
          <View style={[styles.categoryArrow, { backgroundColor: category.bg }]}>
            <Ionicons name="arrow-forward" size={13} color={category.color} />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 8 },
  categoryCard: {
    flexGrow: 1,
    flexBasis: '46%',
    borderRadius: 18,
    padding: 14,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    minHeight: 124,
  },
  categoryIconBg: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: '800',
    fontFamily: 'BeVietnamPro_800ExtraBold',
    lineHeight: 20,
    color: Colors.textPrimary,
  },
  categoryArrow: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
