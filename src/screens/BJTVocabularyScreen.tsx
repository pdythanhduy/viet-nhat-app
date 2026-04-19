import React, { useMemo, useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import AudioButton from '../components/AudioButton';
import { Colors } from '../constants/colors';
import { BJT_DOCUMENT_VOCABULARY } from '../constants/content';
import { recordBjtVocabularyReview } from '../utils/bjtProgress';

export default function BJTVocabularyScreen() {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const [theme, setTheme] = useState('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const themes = useMemo(() => {
    const counts = new Map<string, number>();
    for (const item of BJT_DOCUMENT_VOCABULARY) {
      counts.set(item.theme, (counts.get(item.theme) ?? 0) + 1);
    }
    return [
      { id: 'all', label: `Tất cả (${BJT_DOCUMENT_VOCABULARY.length})` },
      ...Array.from(counts.entries()).map(([id, count]) => ({
        id,
        label: `${id} (${count})`,
      })),
    ];
  }, []);

  const items = useMemo(
    () =>
      theme === 'all'
        ? BJT_DOCUMENT_VOCABULARY
        : BJT_DOCUMENT_VOCABULARY.filter((item) => item.theme === theme),
    [theme]
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <ScrollView style={styles.container} contentContainerStyle={[styles.content, isTablet && styles.contentTablet]}>
        <View style={styles.header}>
          <Text style={styles.title}>Từ vựng BJT</Text>
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{items.length} từ</Text>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
          {themes.map((item) => {
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

        {items.map((item) => {
          const expanded = expandedId === item.id;
          return (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              activeOpacity={0.85}
              onPress={() => {
                setExpandedId((prev) => {
                  const next = prev === item.id ? null : item.id;
                  if (next === item.id) void recordBjtVocabularyReview(item.id);
                  return next;
                });
              }}
            >
              <View style={styles.cardRow}>
                <View style={styles.cardMain}>
                  <View style={styles.wordRow}>
                    <Text style={styles.word}>{item.jp}</Text>
                    <AudioButton audioId={`bjt-vocab:${item.id}`} text={item.jp} backgroundColor={Colors.card} />
                  </View>
                  {item.reading ? (
                    <Text style={styles.reading}>{item.reading}</Text>
                  ) : null}
                  <Text style={styles.meaning}>{item.vn}</Text>
                </View>
                <View style={styles.cardRight}>
                  <View style={styles.themeBadge}>
                    <Text style={styles.themeBadgeText}>{item.theme}</Text>
                  </View>
                  <Ionicons
                    name={expanded ? 'chevron-up' : 'chevron-down'}
                    size={14}
                    color={Colors.textMuted}
                    style={styles.chevron}
                  />
                </View>
              </View>

              {expanded && (item.exampleJp || item.exampleVn || item.note) ? (
                <View style={styles.exampleBox}>
                  {item.exampleJp ? (
                    <Text style={styles.exampleJp}>{item.exampleJp}</Text>
                  ) : null}
                  {item.exampleVn ? (
                    <Text style={styles.exampleVn}>{item.exampleVn}</Text>
                  ) : null}
                  {item.note ? (
                    <Text style={styles.note}>{item.note}</Text>
                  ) : null}
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
  content: { padding: 16, paddingBottom: 32 },
  contentTablet: {
    width: '100%',
    maxWidth: 900,
    alignSelf: 'center',
  },
  header: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 14 },
  title: { fontSize: 22, fontWeight: '800', color: Colors.textPrimary },
  countBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999, backgroundColor: Colors.accent },
  countText: { fontSize: 12, fontWeight: '700', color: Colors.primary },
  chips: { gap: 8, paddingBottom: 12, paddingRight: 12 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  chipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  chipText: { fontSize: 12, fontWeight: '700', color: Colors.textSecondary },
  chipTextActive: { color: Colors.white },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  cardMain: { flex: 1 },
  cardRight: { alignItems: 'flex-end', gap: 8 },
  wordRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  word: { fontSize: 20, fontWeight: '800', color: Colors.textPrimary },
  reading: { marginTop: 3, fontSize: 12, color: Colors.textSecondary },
  meaning: { marginTop: 6, fontSize: 14, fontWeight: '700', color: Colors.primary },
  themeBadge: {
    borderRadius: 999,
    backgroundColor: Colors.background,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  themeBadgeText: { fontSize: 10, fontWeight: '700', color: Colors.textMuted },
  chevron: { marginTop: 4 },
  exampleBox: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    gap: 4,
  },
  exampleJp: { fontSize: 13, fontWeight: '700', color: Colors.textPrimary, lineHeight: 20 },
  exampleVn: { fontSize: 12, color: Colors.textSecondary, lineHeight: 18 },
  note: {
    marginTop: 6,
    fontSize: 11,
    color: Colors.primaryDark,
    backgroundColor: Colors.accent,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
});
