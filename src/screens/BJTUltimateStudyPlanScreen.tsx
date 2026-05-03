import React from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '../constants/colors';
import { BJT_ULTIMATE_STUDY_PLAN } from '../constants/content';

const ORDERED_KEYS: Array<keyof (typeof BJT_ULTIMATE_STUDY_PLAN)['weeks'][number]> = [
  'vocab',
  'keigo',
  'grammar',
  'scenario',
  'reading',
  'email',
  'manners',
  'mock',
  'tips',
];

const LABELS: Record<string, string> = {
  vocab: 'Từ vựng',
  keigo: 'Keigo',
  grammar: 'Ngữ pháp',
  scenario: 'Tình huống',
  reading: 'Đọc hiểu',
  email: 'Email',
  manners: 'Lễ nghi',
  mock: 'Mock',
  tips: 'Mẹo',
};

export default function BJTUltimateStudyPlanScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.title}>Kế hoạch 12 tuần</Text>
          <Text style={styles.subtitle}>{BJT_ULTIMATE_STUDY_PLAN.title}</Text>
        </View>

        {BJT_ULTIMATE_STUDY_PLAN.weeks.map((week) => (
          <View key={week.week} style={styles.card}>
            <View style={styles.row}>
              <View style={styles.weekBadge}>
                <Text style={styles.weekBadgeText}>{week.week}</Text>
              </View>
              <View style={styles.flex}>
                <Text style={styles.cardTitle}>Tuần {week.week}</Text>
                <Text style={styles.bodyText}>{week.focus}</Text>
              </View>
            </View>

            {ORDERED_KEYS.map((key) =>
              week[key] ? (
                <View key={`${week.week}-${key}`} style={styles.itemRow}>
                  <Text style={styles.itemLabel}>{LABELS[key]}</Text>
                  <Text style={styles.itemValue}>{week[key]}</Text>
                </View>
              ) : null
            )}
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
  title: { fontSize: 24, fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold', color: Colors.textPrimary },
  subtitle: { marginTop: 8, fontSize: 13, lineHeight: 20, color: Colors.textSecondary },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  weekBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekBadgeText: { color: Colors.white, fontSize: 14, fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold' },
  flex: { flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold', color: Colors.textPrimary, marginBottom: 4 },
  bodyText: { fontSize: 13, lineHeight: 19, color: Colors.textSecondary },
  itemRow: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  itemLabel: { fontSize: 11, fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold', color: Colors.textMuted, textTransform: 'uppercase', marginBottom: 4 },
  itemValue: { fontSize: 13, lineHeight: 19, color: Colors.textPrimary },
});
