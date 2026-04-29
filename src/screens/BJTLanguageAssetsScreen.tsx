import React, { useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '../constants/colors';
import {
  BJT_ABBREVIATIONS,
  BJT_ABBREVIATIONS_TITLE,
  BJT_GRAMMAR_DESCRIPTION,
  BJT_GRAMMAR_ITEMS,
  BJT_KANJI_DESCRIPTION,
  BJT_KANJI_ITEMS,
} from '../constants/content';

type TabId = 'kanji' | 'grammar' | 'abbreviations';

export default function BJTLanguageAssetsScreen() {
  const [tab, setTab] = useState<TabId>('kanji');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.title}>Ngữ liệu</Text>
          <Text style={styles.subtitle}>
            Bộ tham chiếu ngôn ngữ lấy từ tài liệu BJT gồm Kanji công sở, ngữ pháp N2–N1 và các ký hiệu viết tắt thường gặp.
          </Text>
        </View>

        <View style={styles.tabRow}>
          {(
            [
              { id: 'kanji', label: 'Kanji' },
              { id: 'grammar', label: 'Ngữ pháp' },
              { id: 'abbreviations', label: 'Viết tắt' },
            ] as { id: TabId; label: string }[]
          ).map((item) => {
            const active = item.id === tab;
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.tabButton, active && styles.tabButtonActive]}
                onPress={() => setTab(item.id)}
              >
                <Text style={[styles.tabText, active && styles.tabTextActive]}>{item.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {tab === 'kanji' ? (
          <>
            <Text style={styles.sectionHint}>{BJT_KANJI_DESCRIPTION}</Text>
            {BJT_KANJI_ITEMS.map((item) => (
              <View key={`${item.kanji}-${item.on}`} style={styles.card}>
                <View style={styles.kanjiHeader}>
                  <Text style={styles.kanji}>{item.kanji}</Text>
                  <Text style={styles.meaning}>{item.vi}</Text>
                </View>
                <Text style={styles.meta}>ON: {item.on || '-'} | KUN: {item.kun || '-'}</Text>
                <Text style={styles.blockTitle}>Từ thường gặp</Text>
                {item.words.map((word) => (
                  <Text key={word} style={styles.bulletText}>- {word}</Text>
                ))}
              </View>
            ))}
          </>
        ) : null}

        {tab === 'grammar' ? (
          <>
            <Text style={styles.sectionHint}>{BJT_GRAMMAR_DESCRIPTION}</Text>
            {BJT_GRAMMAR_ITEMS.map((item) => (
              <View key={item.id} style={styles.card}>
                <View style={styles.rowBetween}>
                  <Text style={styles.pattern}>{item.pattern}</Text>
                  <Text style={styles.level}>{item.level}</Text>
                </View>
                <Text style={styles.meta}>{item.reading} | {item.vi}</Text>
                <Text style={styles.blockTitle}>Cách dùng</Text>
                <Text style={styles.body}>{item.usage}</Text>
                <Text style={styles.blockTitle}>Ví dụ</Text>
                <Text style={styles.jp}>{item.ex_jp}</Text>
                <Text style={styles.body}>{item.ex_vi}</Text>
              </View>
            ))}
          </>
        ) : null}

        {tab === 'abbreviations' ? (
          <>
            <Text style={styles.sectionHint}>{BJT_ABBREVIATIONS_TITLE}</Text>
            {BJT_ABBREVIATIONS.map((item) => (
              <View key={`${item.symbol}-${item.reading}`} style={styles.card}>
                <View style={styles.rowBetween}>
                  <Text style={styles.pattern}>{item.symbol}</Text>
                  <Text style={styles.level}>{item.reading}</Text>
                </View>
                <Text style={styles.body}>{item.vi}</Text>
                <Text style={styles.blockTitle}>Cách dùng</Text>
                <Text style={styles.body}>{item.usage}</Text>
                <Text style={styles.blockTitle}>Ví dụ</Text>
                <Text style={styles.jp}>{item.example}</Text>
              </View>
            ))}
          </>
        ) : null}
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
  tabRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
  },
  tabButtonActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  tabText: { fontSize: 12, fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold', color: Colors.textPrimary, textTransform: 'capitalize' },
  tabTextActive: { color: Colors.white },
  sectionHint: { marginBottom: 10, fontSize: 13, lineHeight: 19, color: Colors.textSecondary },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  kanjiHeader: { flexDirection: 'row', alignItems: 'flex-end', gap: 12, marginBottom: 6 },
  kanji: { fontSize: 34, fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold', color: Colors.textPrimary },
  meaning: { fontSize: 14, fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold', color: Colors.primary },
  meta: { fontSize: 12, color: Colors.textSecondary, lineHeight: 18 },
  blockTitle: { marginTop: 10, marginBottom: 6, fontSize: 11, fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold', color: Colors.textMuted, textTransform: 'uppercase' },
  bulletText: { fontSize: 13, color: Colors.textSecondary, lineHeight: 19, marginBottom: 4 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 },
  pattern: { fontSize: 18, fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold', color: Colors.textPrimary },
  level: { fontSize: 11, fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold', color: Colors.primary, textTransform: 'uppercase' },
  body: { fontSize: 13, color: Colors.textSecondary, lineHeight: 19 },
  jp: { fontSize: 13, color: Colors.textPrimary, lineHeight: 20, fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold' },
});
