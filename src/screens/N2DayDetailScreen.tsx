// N2 Recovery — single Day detail. Shows the day's theme, vocab topic and
// grammar patterns from the curriculum, with a "mark done" toggle (synced).
// Stage 1: static plan only; generated lesson content comes later.

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../constants/colors';
import AudioButton from '../components/AudioButton';
import type { RootStackParamList } from '../navigation/AppNavigator';
import {
  N2_TOTAL_DAYS,
  getN2Day,
  getN2Phase,
} from '../constants/n2RecoveryCurriculum';
import { useN2Progress } from '../hooks/useN2Progress';
import { isDayDone, pushRemote, toggleDay } from '../services/n2Progress';
import { N2Lesson, generateN2Lesson } from '../services/n2Lesson';

type Nav = NativeStackNavigationProp<RootStackParamList>;
type Route = RouteProp<RootStackParamList, 'N2DayDetail'>;

export default function N2DayDetailScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const day = route.params.day;

  // Re-render when progress changes.
  useN2Progress();
  const done = isDayDone(day);

  const [lesson, setLesson] = useState<N2Lesson | null>(null);
  const [lessonLoading, setLessonLoading] = useState(false);
  const [lessonError, setLessonError] = useState<string | null>(null);

  // Lessons are pre-generated (Supabase). Load automatically for normal days.
  useEffect(() => {
    let active = true;
    setLesson(null);
    setLessonError(null);
    const current = getN2Day(day);
    if (!current || current.kind !== 'normal') return;
    setLessonLoading(true);
    (async () => {
      try {
        const l = await generateN2Lesson(day);
        if (active) setLesson(l);
      } catch (e) {
        if (!active) return;
        const msg = e instanceof Error ? e.message : String(e);
        if (msg !== 'no-content') setLessonError(`Không tải được bài học: ${msg}`);
      } finally {
        if (active) setLessonLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [day]);

  const info = getN2Day(day);
  const phase = info ? getN2Phase(info.phase) : undefined;

  if (!info) {
    return (
      <View style={styles.centerWrap}>
        <Text style={styles.notFound}>Không tìm thấy Day {day}.</Text>
      </View>
    );
  }

  const handleToggle = async () => {
    await toggleDay(day);
    void pushRemote();
  };

  const showLessonUi = info.kind === 'normal';

  const kindLabel =
    info.kind === 'review' ? 'Ngày ôn tập' : info.kind === 'test' ? 'Ngày kiểm tra' : null;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.dayBadge}>DAY {info.day} / {N2_TOTAL_DAYS}</Text>
      <Text style={styles.theme}>{info.theme}</Text>
      {phase && (
        <Text style={styles.phaseLine}>
          {phase.jp} · {phase.vi}
        </Text>
      )}
      {kindLabel && (
        <View style={styles.kindPill}>
          <Ionicons
            name={info.kind === 'test' ? 'ribbon-outline' : 'refresh-outline'}
            size={14}
            color={Colors.primary}
          />
          <Text style={styles.kindPillText}>{kindLabel}</Text>
        </View>
      )}

      {info.vocabTopic !== '—' && (
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Chủ đề từ vựng (50 từ)</Text>
          <Text style={styles.cardBody}>{info.vocabTopic}</Text>
        </View>
      )}

      {info.kind === 'normal' && (
        <TouchableOpacity
          style={styles.contentBtn}
          onPress={() => navigation.navigate('N2DayContent', { day })}
          activeOpacity={0.85}
        >
          <Ionicons name="library-outline" size={18} color={Colors.white} />
          <View style={styles.contentBtnText}>
            <Text style={styles.contentBtnTitle}>Mở Từ vựng + Quiz</Text>
            <Text style={styles.contentBtnSub}>50 từ đầy đủ sắc thái · 20 câu trắc nghiệm</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={Colors.white} />
        </TouchableOpacity>
      )}

      <View style={styles.card}>
        <Text style={styles.cardLabel}>
          {info.kind === 'normal' ? 'Ngữ pháp trọng tâm (5 mẫu)' : 'Nội dung'}
        </Text>
        {info.grammar.map((g, i) => (
          <View key={i} style={styles.grammarRow}>
            <View style={styles.grammarDot} />
            <Text style={styles.grammarText}>{g}</Text>
          </View>
        ))}
      </View>

      {showLessonUi && (
        <View style={styles.lessonSection}>
          <Text style={styles.lessonSectionTitle}>Bài học chi tiết</Text>

          {lesson ? (
            lesson.grammar.map((item, gi) => (
              <View key={gi} style={styles.lessonCard}>
                <Text style={styles.lessonPattern}>{item.pattern}</Text>
                {!!item.meaning && (
                  <>
                    <Text style={styles.lessonMeta}>Nghĩa</Text>
                    <Text style={styles.lessonBody}>{item.meaning}</Text>
                  </>
                )}
                {!!item.usage && (
                  <>
                    <Text style={styles.lessonMeta}>Cách dùng</Text>
                    <Text style={styles.lessonBody}>{item.usage}</Text>
                  </>
                )}
                {item.examples.map((ex, ei) => (
                  <View key={ei} style={styles.exampleBox}>
                    <View style={styles.exampleJpRow}>
                      <Text style={styles.exampleJp}>{ex.jp}</Text>
                      <AudioButton
                        audioId={`n2:${day}:${gi}:${ei}`}
                        text={ex.jp}
                        size={14}
                      />
                    </View>
                    <Text style={styles.exampleVn}>{ex.vn}</Text>
                  </View>
                ))}
              </View>
            ))
          ) : (
            lessonLoading && (
              <View style={styles.lessonLoadingWrap}>
                <ActivityIndicator color={Colors.primary} />
                <Text style={styles.genHint}>Đang tải bài học…</Text>
              </View>
            )
          )}

          {lessonError && (
            <View style={styles.errBox}>
              <Ionicons name="alert-circle-outline" size={16} color={Colors.warning} />
              <Text style={styles.errText}>{lessonError}</Text>
            </View>
          )}
        </View>
      )}

      <TouchableOpacity
        style={[styles.doneBtn, done && styles.doneBtnActive]}
        onPress={() => void handleToggle()}
        activeOpacity={0.85}
      >
        <Ionicons
          name={done ? 'checkmark-circle' : 'ellipse-outline'}
          size={20}
          color={done ? Colors.white : Colors.primary}
        />
        <Text style={[styles.doneBtnText, done && styles.doneBtnTextActive]}>
          {done ? 'Đã học xong' : 'Đánh dấu đã học'}
        </Text>
      </TouchableOpacity>

      <View style={styles.navRow}>
        <TouchableOpacity
          style={[styles.navBtn, day <= 1 && styles.navBtnDisabled]}
          disabled={day <= 1}
          onPress={() => navigation.setParams({ day: day - 1 } as never)}
        >
          <Ionicons name="arrow-back" size={16} color={Colors.primary} />
          <Text style={styles.navBtnText}>Day {day - 1}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navBtn, day >= N2_TOTAL_DAYS && styles.navBtnDisabled]}
          disabled={day >= N2_TOTAL_DAYS}
          onPress={() => navigation.setParams({ day: day + 1 } as never)}
        >
          <Text style={styles.navBtnText}>Day {day + 1}</Text>
          <Ionicons name="arrow-forward" size={16} color={Colors.primary} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 16, paddingBottom: 40 },
  centerWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  notFound: { fontSize: 14, color: Colors.textSecondary },
  dayBadge: {
    fontSize: 12,
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.primary,
    letterSpacing: 1,
  },
  theme: {
    fontSize: 24,
    fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.textPrimary,
    marginTop: 4,
    lineHeight: 32,
  },
  phaseLine: { fontSize: 13, color: Colors.textSecondary, marginTop: 4 },
  kindPill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 5,
    backgroundColor: Colors.accent,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
  },
  kindPillText: { fontSize: 12, color: Colors.primary, fontFamily: 'BeVietnamPro_600SemiBold' },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 14,
    marginTop: 16,
  },
  cardLabel: {
    fontSize: 12,
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  cardBody: { fontSize: 15, color: Colors.textPrimary, lineHeight: 22 },
  contentBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginTop: 16,
  },
  contentBtnText: { flex: 1 },
  contentBtnTitle: { color: Colors.white, fontSize: 15, fontFamily: 'BeVietnamPro_700Bold' },
  contentBtnSub: { color: '#E0E7FF', fontSize: 12, marginTop: 2 },
  grammarRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 8 },
  grammarDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    marginTop: 8,
  },
  grammarText: { flex: 1, fontSize: 17, color: Colors.textPrimary, lineHeight: 26 },
  noteBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: Colors.background,
    borderRadius: 10,
    padding: 12,
    marginTop: 16,
  },
  noteText: { flex: 1, fontSize: 12, color: Colors.textMuted, lineHeight: 18 },
  doneBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.accent,
    borderRadius: 12,
    paddingVertical: 15,
    marginTop: 20,
  },
  doneBtnActive: { backgroundColor: Colors.success },
  doneBtnText: { fontSize: 15, fontFamily: 'BeVietnamPro_700Bold', color: Colors.primary },
  doneBtnTextActive: { color: Colors.white },
  navRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 },
  navBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, padding: 8 },
  navBtnDisabled: { opacity: 0.35 },
  navBtnText: { fontSize: 14, color: Colors.primary, fontFamily: 'BeVietnamPro_600SemiBold' },
  lessonSection: { marginTop: 20 },
  lessonSectionTitle: {
    fontSize: 12,
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  lessonLoadingWrap: { alignItems: 'center', gap: 8, paddingVertical: 16 },
  genHint: { fontSize: 12, color: Colors.textMuted, lineHeight: 18, marginTop: 8 },
  lessonCard: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 14,
    marginBottom: 12,
  },
  lessonPattern: {
    fontSize: 19,
    fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.primary,
    marginBottom: 6,
    lineHeight: 27,
  },
  lessonMeta: {
    fontSize: 11,
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 8,
    marginBottom: 2,
    fontFamily: 'BeVietnamPro_700Bold',
  },
  lessonBody: { fontSize: 14, color: Colors.textPrimary, lineHeight: 21 },
  exampleBox: {
    backgroundColor: Colors.background,
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
  exampleJpRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  exampleJp: { flex: 1, fontSize: 16, color: Colors.textPrimary, lineHeight: 24 },
  exampleVn: { fontSize: 13, color: Colors.textSecondary, lineHeight: 20, marginTop: 4 },
  errBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: '#FEF2F2',
    borderRadius: 10,
    padding: 12,
    marginTop: 12,
  },
  errText: { flex: 1, fontSize: 13, color: '#B91C1C', lineHeight: 19 },
});
