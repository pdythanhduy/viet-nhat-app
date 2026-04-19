import React, { useMemo, useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '../constants/colors';
import { BJT_KEIGO_COMMON_MISTAKES, BJT_KEIGO_ENTRIES, BJT_KEIGO_INTRO } from '../constants/content';

const FILTERS = [
  { id: 'all', label: 'Tất cả' },
  { id: 'sonkeigo', label: 'Sonkeigo' },
  { id: 'kenjougo', label: 'Kenjougo' },
] as const;

type FilterId = (typeof FILTERS)[number]['id'];
type KeigoCommonMistake =
  | string
  | {
      mistake?: string;
      correct?: string;
      rule?: string;
    };

export default function BJTKeigoScreen() {
  const [filter, setFilter] = useState<FilterId>('all');

  const commonMistakes = useMemo(
    () =>
      (BJT_KEIGO_COMMON_MISTAKES as KeigoCommonMistake[]).map((item, index) => {
        if (typeof item === 'string') {
          return {
            id: `mistake-${index}`,
            mistake: item,
            correct: '',
            rule: '',
          };
        }

        return {
          id: `mistake-${index}`,
          mistake: item.mistake ?? '',
          correct: item.correct ?? '',
          rule: item.rule ?? '',
        };
      }),
    []
  );

  const items = useMemo(
    () =>
      filter === 'all'
        ? BJT_KEIGO_ENTRIES
        : BJT_KEIGO_ENTRIES.filter((item) => item.category === filter),
    [filter]
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.title}>Keigo theo tài liệu BJT</Text>
          <Text style={styles.subtitle}>{BJT_KEIGO_INTRO}</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
          {FILTERS.map((item) => {
            const active = item.id === filter;
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.chip, active && styles.chipActive]}
                onPress={() => setFilter(item.id)}
              >
                <Text style={[styles.chipText, active && styles.chipTextActive]}>{item.label}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {commonMistakes.length > 0 ? (
          <View style={styles.warningCard}>
            <Text style={styles.warningTitle}>Lỗi Keigo thường gặp</Text>
            {commonMistakes.map((item) => (
              <View key={item.id} style={styles.warningItem}>
                <Text style={styles.warningText}>Sai: {item.mistake}</Text>
                {item.correct ? <Text style={styles.warningText}>Đúng: {item.correct}</Text> : null}
                {item.rule ? <Text style={styles.warningText}>Quy tắc: {item.rule}</Text> : null}
              </View>
            ))}
          </View>
        ) : null}

        {items.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.rowBetween}>
              <Text style={styles.level}>{item.level}</Text>
              <Text style={styles.category}>{item.category}</Text>
            </View>
            <Text style={styles.sectionLabel}>Dạng thường</Text>
            <Text style={styles.jp}>{item.plain}</Text>
            <Text style={styles.meta}>
              {item.plainReading} | {item.plainMeaning}
            </Text>

            <Text style={styles.sectionLabel}>Dạng Keigo</Text>
            <Text style={styles.jpStrong}>{item.keigo}</Text>
            <Text style={styles.meta}>
              {item.keigoReading} | {item.keigoMeaning}
            </Text>

            <View style={styles.exampleBox}>
              <Text style={styles.exampleJp}>{item.exampleJp}</Text>
              <Text style={styles.exampleVi}>{item.exampleVi}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 16, paddingBottom: 108 },
  hero: { marginBottom: 14 },
  title: { fontSize: 24, fontWeight: '800', color: Colors.textPrimary },
  subtitle: { marginTop: 8, fontSize: 13, lineHeight: 20, color: Colors.textSecondary },
  chips: { gap: 8, paddingBottom: 10, paddingRight: 12 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  chipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  chipText: { fontSize: 12, fontWeight: '700', color: Colors.textPrimary },
  chipTextActive: { color: Colors.white },
  warningCard: {
    marginBottom: 12,
    padding: 14,
    borderRadius: 14,
    backgroundColor: Colors.warningLight,
    borderWidth: 1,
    borderColor: Colors.warning + '40',
  },
  warningTitle: { fontSize: 13, fontWeight: '800', color: Colors.textPrimary, marginBottom: 8 },
  warningItem: {
    marginBottom: 8,
  },
  warningText: { fontSize: 12, lineHeight: 18, color: Colors.textSecondary, marginBottom: 4 },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, marginBottom: 10 },
  level: { fontSize: 11, fontWeight: '800', color: Colors.primary, textTransform: 'uppercase' },
  category: { fontSize: 11, fontWeight: '700', color: Colors.textMuted, textTransform: 'uppercase' },
  sectionLabel: { marginTop: 4, marginBottom: 4, fontSize: 11, fontWeight: '800', color: Colors.textMuted, textTransform: 'uppercase' },
  jp: { fontSize: 18, fontWeight: '700', color: Colors.textPrimary },
  jpStrong: { fontSize: 19, fontWeight: '800', color: Colors.primaryDark },
  meta: { marginTop: 4, fontSize: 13, color: Colors.textSecondary, lineHeight: 19 },
  exampleBox: {
    marginTop: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: Colors.accent,
  },
  exampleJp: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary, lineHeight: 20 },
  exampleVi: { marginTop: 6, fontSize: 13, color: Colors.textSecondary, lineHeight: 19 },
});
