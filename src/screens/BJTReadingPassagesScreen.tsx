import React, { useEffect, useMemo, useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '../constants/colors';
import { BJT_READING_PASSAGES } from '../constants/content';

type PassageLevel = 'all' | (typeof BJT_READING_PASSAGES)[number]['lv'];

export default function BJTReadingPassagesScreen() {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const isTablet = width >= 900;

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
  const allAnswersRevealed = !!activePassage && revealedCount === activePassage.questions.length;
  const bottomContentPadding = 96 + Math.max(insets.bottom, 12);

  const toggleAllAnswers = () => {
    if (!activePassage) return;
    if (allAnswersRevealed) {
      setRevealedAnswers({});
      return;
    }

    const next: Record<string, boolean> = {};
    activePassage.questions.forEach((_, idx) => {
      next[`${activePassage.id}-${idx}`] = true;
    });
    setRevealedAnswers(next);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={[styles.content, { paddingBottom: bottomContentPadding }]}
      >
        <View style={styles.hero}>
          <Text style={styles.title}>BJT Reading Passages</Text>
          <Text style={styles.subtitle}>
            Chon level, chon bai doc, roi lam cau hoi ngay ben duoi. Man hinh duoc toi uu de thao tac nhanh tren dien
            thoai va tablet.
          </Text>
        </View>

        <View style={styles.summaryCard}>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>So bai</Text>
            <Text style={styles.metricValue}>{passages.length}</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>So cau hoi</Text>
            <Text style={styles.metricValue}>{passages.reduce((sum, item) => sum + item.questions.length, 0)}</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Level</Text>
            <Text style={styles.metricValueSmall}>{level === 'all' ? 'Tat ca' : level}</Text>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
          {levels.map((item) => {
            const active = item === level;
            const count =
              item === 'all' ? BJT_READING_PASSAGES.length : BJT_READING_PASSAGES.filter((entry) => entry.lv === item).length;
            return (
              <TouchableOpacity key={item} style={[styles.chip, active && styles.chipActive]} onPress={() => setLevel(item)}>
                <Text style={[styles.chipText, active && styles.chipTextActive]}>
                  {item === 'all' ? 'Tat ca' : item} ({count})
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.section}>
          <View style={styles.rowBetween}>
            <Text style={styles.sectionTitle}>Danh sach bai doc</Text>
            <Text style={styles.listHint}>Vuot ngang de chon nhanh</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.passageRail}>
            {passages.map((item) => {
              const active = item.id === activePassage?.id;
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.railCard, active && styles.railCardActive]}
                  onPress={() => {
                    setActiveId(item.id);
                    setRevealedAnswers({});
                  }}
                >
                  <View style={styles.rowBetween}>
                    <Text style={styles.levelBadge}>{item.lv}</Text>
                    <Text style={styles.meta}>{item.id}</Text>
                  </View>
                  <Text numberOfLines={2} style={styles.listTitle}>
                    {item.title}
                  </Text>
                  <Text style={styles.listMeta}>{item.questions.length} cau hoi</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {activePassage ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Noi dung bai doc</Text>
            <View style={[styles.card, isTablet && styles.cardTablet]}>
              <View style={styles.rowBetween}>
                <Text style={styles.levelBadge}>{activePassage.lv}</Text>
                <Text style={styles.meta}>{activePassage.id}</Text>
              </View>
              <Text style={styles.cardTitle}>{activePassage.title}</Text>

              <View style={styles.noteCard}>
                <Ionicons name="eye-outline" size={16} color={Colors.primary} />
                <Text style={styles.noteText}>
                  Da mo {revealedCount}/{activePassage.questions.length} dap an.
                </Text>
              </View>

              <Text style={styles.blockTitle}>Tom tat tieng Viet</Text>
              <Text style={styles.bodyText}>{activePassage.passage_vi}</Text>

              <Text style={styles.blockTitle}>Doan van tieng Nhat</Text>
              <Text style={styles.jpText}>{activePassage.passage_jp}</Text>
            </View>

            <View style={styles.rowBetween}>
              <Text style={styles.sectionTitle}>Cau hoi</Text>
              <TouchableOpacity style={[styles.answerButton, allAnswersRevealed && styles.answerButtonActive]} onPress={toggleAllAnswers}>
                <Text style={[styles.answerButtonText, allAnswersRevealed && styles.answerButtonTextActive]}>
                  {allAnswersRevealed ? 'An tat ca' : 'Mo tat ca'}
                </Text>
              </TouchableOpacity>
            </View>

            {activePassage.questions.map((question, index) => {
              const answerKey = `${activePassage.id}-${index}`;
              const revealed = revealedAnswers[answerKey] ?? false;

              return (
                <View key={answerKey} style={[styles.questionCard, revealed && styles.questionCardRevealed]}>
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
                        {revealed ? 'An dap an' : 'Mo dap an'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.jpText}>{question.q}</Text>
                  {revealed ? (
                    <View style={styles.answerBox}>
                      <Text style={styles.answerLabel}>Dap an goi y</Text>
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
  content: { padding: 16, paddingBottom: 108 },
  hero: { marginBottom: 14 },
  title: { fontSize: 24, fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold', color: Colors.textPrimary },
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
  metricLabel: { fontSize: 11, fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold', color: Colors.textSecondary, marginBottom: 6 },
  metricValue: { fontSize: 24, fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold', color: Colors.textPrimary },
  metricValueSmall: { fontSize: 18, fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold', color: Colors.textPrimary },
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
  chipText: { fontSize: 12, fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold', color: Colors.textPrimary },
  chipTextActive: { color: Colors.white },
  section: { marginTop: 12 },
  sectionTitle: { marginBottom: 10, fontSize: 16, fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold', color: Colors.textPrimary },
  listHint: { fontSize: 11, fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold', color: Colors.textMuted },
  passageRail: { gap: 10, paddingRight: 12 },
  railCard: {
    width: 260,
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  railCardActive: { borderColor: Colors.primary, backgroundColor: Colors.accent },
  rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  levelBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: Colors.accent,
    color: Colors.primary,
    fontSize: 11,
    fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold',
  },
  meta: { fontSize: 11, fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold', color: Colors.textMuted, textTransform: 'uppercase' },
  listTitle: { marginTop: 8, fontSize: 15, fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold', color: Colors.textPrimary },
  listMeta: { marginTop: 6, fontSize: 12, color: Colors.textSecondary },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardTablet: {
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  cardTitle: { marginTop: 8, fontSize: 18, fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold', color: Colors.textPrimary },
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
  blockTitle: { marginTop: 14, marginBottom: 6, fontSize: 11, fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold', color: Colors.textMuted, textTransform: 'uppercase' },
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
  questionCardRevealed: {
    borderColor: Colors.primary,
    backgroundColor: Colors.accent,
  },
  questionLabel: { fontSize: 12, fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold', color: Colors.primary },
  answerButton: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: Colors.card,
  },
  answerButtonActive: { backgroundColor: Colors.primary },
  answerButtonText: { fontSize: 11, fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold', color: Colors.primary },
  answerButtonTextActive: { color: Colors.white },
  answerBox: {
    marginTop: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: Colors.background,
  },
  answerLabel: { marginBottom: 4, fontSize: 11, fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold', color: Colors.primaryDark, textTransform: 'uppercase' },
  answerText: { fontSize: 13, lineHeight: 19, color: Colors.textPrimary },
});
