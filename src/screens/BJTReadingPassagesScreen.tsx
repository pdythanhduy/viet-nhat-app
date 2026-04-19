import React, { useEffect, useMemo, useState } from 'react';
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

import { Colors } from '../constants/colors';
import { BJT_READING_PASSAGES } from '../constants/content';

type PassageLevel = 'all' | (typeof BJT_READING_PASSAGES)[number]['lv'];

export default function BJTReadingPassagesScreen() {
  const [level, setLevel] = useState<PassageLevel>('all');
  const [activeId, setActiveId] = useState(BJT_READING_PASSAGES[0]?.id ?? '');
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});

  const levels = useMemo(
    () => ['all', ...Array.from(new Set(BJT_READING_PASSAGES.map((item) => item.lv)))] as PassageLevel[],
    []
  );

  const passages = useMemo(
    () => (level === 'all' ? BJT_READING_PASSAGES : BJT_READING_PASSAGES.filter((item) => item.lv === level)),
    [level]
  );

  useEffect(() => {
    if (!passages.some((item) => item.id === activeId)) {
      setActiveId(passages[0]?.id ?? '');
      setRevealedAnswers({});
    }
  }, [activeId, passages]);

  const activePassage = passages.find((item) => item.id === activeId) ?? passages[0] ?? null;
  const revealedCount = activePassage
    ? activePassage.questions.filter((_, index) => revealedAnswers[`${activePassage.id}-${index}`]).length
    : 0;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.title}>Bài đọc dài</Text>
          <Text style={styles.subtitle}>
            10 bài đọc dài từ bộ ultimate. App giữ nguyên bài đọc và đáp án gốc, chỉ thêm bộ lọc level và flow review từng câu hỏi.
          </Text>
        </View>

        <View style={styles.summaryCard}>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Bài đọc</Text>
            <Text style={styles.metricValue}>{passages.length}</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Câu hỏi</Text>
            <Text style={styles.metricValue}>{passages.reduce((sum, item) => sum + item.questions.length, 0)}</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Đang chọn</Text>
            <Text style={styles.metricValueSmall}>{level === 'all' ? 'Tất cả' : level}</Text>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
          {levels.map((item) => {
            const active = item === level;
            const count = item === 'all' ? BJT_READING_PASSAGES.length : BJT_READING_PASSAGES.filter((entry) => entry.lv === item).length;
            return (
              <TouchableOpacity
                key={item}
                style={[styles.chip, active && styles.chipActive]}
                onPress={() => setLevel(item)}
              >
                <Text style={[styles.chipText, active && styles.chipTextActive]}>
                  {item === 'all' ? 'Tất cả' : item} ({count})
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Danh sách bài đọc</Text>
          {passages.map((item) => {
            const active = item.id === activePassage?.id;
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.listCard, active && styles.listCardActive]}
                onPress={() => {
                  setActiveId(item.id);
                  setRevealedAnswers({});
                }}
              >
                <View style={styles.rowBetween}>
                  <Text style={styles.levelBadge}>{item.lv}</Text>
                  <Text style={styles.meta}>{item.id}</Text>
                </View>
                <Text style={styles.listTitle}>{item.title}</Text>
                <Text style={styles.listMeta}>{item.questions.length} câu hỏi</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {activePassage ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Bài đọc đang chọn</Text>
            <View style={styles.card}>
              <View style={styles.rowBetween}>
                <Text style={styles.levelBadge}>{activePassage.lv}</Text>
                <Text style={styles.meta}>{activePassage.id}</Text>
              </View>
              <Text style={styles.cardTitle}>{activePassage.title}</Text>

              <View style={styles.noteCard}>
                <Ionicons name="eye-outline" size={16} color={Colors.primary} />
                <Text style={styles.noteText}>
                  Đã mở {revealedCount}/{activePassage.questions.length} đáp án. Dùng màn này để đọc văn bản trước, tự trả lời, rồi mới mở đáp án gốc.
                </Text>
              </View>

              <Text style={styles.blockTitle}>Tóm tắt tiếng Việt</Text>
              <Text style={styles.bodyText}>{activePassage.passage_vi}</Text>

              <Text style={styles.blockTitle}>Đoạn đọc tiếng Nhật</Text>
              <Text style={styles.jpText}>{activePassage.passage_jp}</Text>
            </View>

            <Text style={styles.sectionTitle}>Câu hỏi</Text>
            {activePassage.questions.map((question, index) => {
              const answerKey = `${activePassage.id}-${index}`;
              const revealed = revealedAnswers[answerKey] ?? false;

              return (
                <View key={answerKey} style={styles.questionCard}>
                  <View style={styles.rowBetween}>
                    <Text style={styles.questionLabel}>Q{index + 1}</Text>
                    <TouchableOpacity
                      style={[styles.answerButton, revealed && styles.answerButtonActive]}
                      onPress={() =>
                        setRevealedAnswers((prev) => ({
                          ...prev,
                          [answerKey]: !revealed,
                        }))
                      }
                    >
                      <Text style={[styles.answerButtonText, revealed && styles.answerButtonTextActive]}>
                        {revealed ? 'Ẩn đáp án' : 'Mở đáp án'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.jpText}>{question.q}</Text>
                  {revealed ? (
                    <View style={styles.answerBox}>
                      <Text style={styles.answerLabel}>Đáp án gốc</Text>
                      <Text style={styles.answerText}>{question.a}</Text>
                    </View>
                  ) : null}
                </View>
              );
            })}
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 16, paddingBottom: 28 },
  hero: { marginBottom: 14 },
  title: { fontSize: 24, fontWeight: '800', color: Colors.textPrimary },
  subtitle: { marginTop: 8, fontSize: 13, lineHeight: 20, color: Colors.textSecondary },
  summaryCard: { flexDirection: 'row', gap: 10, marginBottom: 12 },
  metricCard: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  metricLabel: { fontSize: 11, fontWeight: '700', color: Colors.textSecondary, marginBottom: 6 },
  metricValue: { fontSize: 24, fontWeight: '800', color: Colors.textPrimary },
  metricValueSmall: { fontSize: 18, fontWeight: '800', color: Colors.textPrimary },
  chips: { gap: 8, paddingBottom: 8, paddingRight: 12 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.card,
  },
  chipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  chipText: { fontSize: 12, fontWeight: '700', color: Colors.textPrimary },
  chipTextActive: { color: Colors.white },
  section: { marginTop: 10 },
  sectionTitle: { marginBottom: 10, fontSize: 16, fontWeight: '800', color: Colors.textPrimary },
  listCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  listCardActive: { borderColor: Colors.primary, backgroundColor: Colors.accent },
  rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  levelBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: Colors.accent,
    color: Colors.primary,
    fontSize: 11,
    fontWeight: '800',
  },
  meta: { fontSize: 11, fontWeight: '700', color: Colors.textMuted, textTransform: 'uppercase' },
  listTitle: { marginTop: 8, fontSize: 15, fontWeight: '800', color: Colors.textPrimary },
  listMeta: { marginTop: 6, fontSize: 12, color: Colors.textSecondary },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardTitle: { marginTop: 8, fontSize: 18, fontWeight: '800', color: Colors.textPrimary },
  noteCard: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    padding: 12,
    borderRadius: 12,
    backgroundColor: Colors.accent,
  },
  noteText: { flex: 1, fontSize: 12, lineHeight: 18, color: Colors.primaryDark },
  blockTitle: { marginTop: 14, marginBottom: 6, fontSize: 11, fontWeight: '800', color: Colors.textMuted, textTransform: 'uppercase' },
  bodyText: { fontSize: 13, lineHeight: 19, color: Colors.textSecondary },
  jpText: { fontSize: 13, lineHeight: 20, color: Colors.textPrimary },
  questionCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  questionLabel: { fontSize: 12, fontWeight: '800', color: Colors.primary },
  answerButton: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: Colors.card,
  },
  answerButtonActive: { backgroundColor: Colors.primary },
  answerButtonText: { fontSize: 11, fontWeight: '700', color: Colors.primary },
  answerButtonTextActive: { color: Colors.white },
  answerBox: {
    marginTop: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: Colors.background,
  },
  answerLabel: { marginBottom: 4, fontSize: 11, fontWeight: '800', color: Colors.primaryDark, textTransform: 'uppercase' },
  answerText: { fontSize: 13, lineHeight: 19, color: Colors.textPrimary },
});
