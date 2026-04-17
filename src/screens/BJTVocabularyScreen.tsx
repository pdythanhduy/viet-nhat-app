import React, { useMemo, useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import AudioButton from '../components/AudioButton';
import { Colors } from '../constants/colors';
import { BJT_VOCABULARY } from '../constants/content';
import { recordBjtVocabularyReview } from '../utils/bjtProgress';

const THEMES = [
  { id: 'all', label: 'Tất cả' },
  { id: 'email', label: 'Email' },
  { id: 'meeting', label: 'Meeting' },
  { id: 'workflow', label: 'Workflow' },
  { id: 'reporting', label: 'Reporting' },
  { id: 'sales', label: 'Sales' },
  { id: 'coordination', label: 'Coordination' },
] as const;

type ThemeId = (typeof THEMES)[number]['id'];

export default function BJTVocabularyScreen() {
  const [theme, setTheme] = useState<ThemeId>('all');
  const [expandedId, setExpandedId] = useState<string | null>(BJT_VOCABULARY[0]?.id ?? null);

  const items = useMemo(
    () => (theme === 'all' ? BJT_VOCABULARY : BJT_VOCABULARY.filter((item) => item.theme === theme)),
    [theme]
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.title}>BJT Business Vocabulary</Text>
          <Text style={styles.subtitle}>
            Bộ từ vựng tự biên soạn theo ngữ cảnh business Japanese thường gặp trong hướng luyện BJT.
          </Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
          {THEMES.map((item) => {
            const active = item.id === theme;
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.chip, active && styles.chipActive]}
                onPress={() => setTheme(item.id)}
              >
                <Text style={[styles.chipText, active && styles.chipTextActive]}>{item.label}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.noteCard}>
          <Ionicons name="information-circle-outline" size={18} color={Colors.primary} />
          <Text style={styles.noteText}>
            Nội dung này không sao chép đề chính thức. Mục tiêu là học đúng kiểu từ vựng, ngữ cảnh và hành động thường gặp trong BJT.
          </Text>
        </View>

        {items.map((item) => {
          const expanded = expandedId === item.id;
          return (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              activeOpacity={0.9}
              onPress={() => {
                setExpandedId((prev) => {
                  const nextExpanded = prev === item.id ? null : item.id;
                  if (nextExpanded === item.id) {
                    void recordBjtVocabularyReview(item.id);
                  }
                  return nextExpanded;
                });
              }}
            >
              <View style={styles.cardTop}>
                <View style={styles.cardTopLeft}>
                  <View style={styles.inline}>
                    <Text style={styles.word}>{item.jp}</Text>
                    <AudioButton audioId={`bjt-vocab:${item.id}`} text={item.jp} backgroundColor={Colors.background} />
                  </View>
                  <Text style={styles.reading}>{item.reading}</Text>
                  <Text style={styles.romaji}>{item.romaji}</Text>
                  <Text style={styles.meaning}>{item.vn}</Text>
                </View>
                <View style={styles.themeBadge}>
                  <Text style={styles.themeBadgeText}>{item.theme}</Text>
                </View>
              </View>

              {expanded ? (
                <View style={styles.exampleBox}>
                  <Text style={styles.exampleJp}>{item.exampleJp}</Text>
                  <Text style={styles.exampleRomaji}>{item.exampleRomaji}</Text>
                  <Text style={styles.exampleVn}>{item.exampleVn}</Text>
                  {item.note ? <Text style={styles.exampleNote}>{item.note}</Text> : null}
                </View>
              ) : null}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 16, paddingBottom: 28 },
  hero: { marginBottom: 14 },
  title: { fontSize: 24, fontWeight: '800', color: Colors.textPrimary },
  subtitle: { marginTop: 8, fontSize: 13, lineHeight: 19, color: Colors.textSecondary },
  chips: { gap: 8, paddingBottom: 8, paddingRight: 12 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  chipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  chipText: { fontSize: 12, fontWeight: '700', color: Colors.textPrimary },
  chipTextActive: { color: Colors.white },
  noteCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: Colors.accent,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },
  noteText: { flex: 1, fontSize: 12, lineHeight: 18, color: Colors.primaryDark },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardTop: { flexDirection: 'row', gap: 12, justifyContent: 'space-between' },
  cardTopLeft: { flex: 1 },
  inline: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  word: { fontSize: 22, fontWeight: '800', color: Colors.textPrimary },
  reading: { marginTop: 4, fontSize: 12, color: Colors.textSecondary },
  romaji: { marginTop: 2, fontSize: 12, color: Colors.textMuted, fontStyle: 'italic' },
  meaning: { marginTop: 8, fontSize: 14, fontWeight: '700', color: Colors.primary },
  themeBadge: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    backgroundColor: Colors.background,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  themeBadgeText: { fontSize: 11, fontWeight: '700', color: Colors.textSecondary },
  exampleBox: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  exampleJp: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary },
  exampleRomaji: { marginTop: 4, fontSize: 12, fontStyle: 'italic', color: Colors.textSecondary },
  exampleVn: { marginTop: 6, fontSize: 12, lineHeight: 18, color: Colors.textSecondary },
  exampleNote: {
    marginTop: 8,
    fontSize: 12,
    lineHeight: 18,
    color: Colors.primaryDark,
    backgroundColor: Colors.accent,
    borderRadius: 10,
    padding: 10,
  },
});
