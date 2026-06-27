// JLPT Recovery — single Day detail (generic, engine-backed). Shows the day's
// theme, vocab topic and grammar patterns from the curriculum, a "mark done"
// toggle, and an on-demand AI grammar lesson. Used for every level except N2.

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
  getRecoveryCurriculum,
  getRecoveryCurriculumDay,
  getRecoveryCurriculumPhase,
} from '../constants/jlptRecoveryCurriculum';
import { useJlptRecoveryProgress } from '../hooks/useJlptRecoveryProgress';
import { isDayDone, toggleDay } from '../services/jlptRecoveryProgress';
import {
  getRecoveryLesson,
  hasCachedRecoveryLesson,
  isRecoveryLessonConfigured,
} from '../services/jlptRecoveryLesson';
import type { RecoveryLesson } from '../services/jlptRecoveryTypes';

type Nav = NativeStackNavigationProp<RootStackParamList>;
type Route = RouteProp<RootStackParamList, 'JlptRecoveryDayDetail'>;

export default function JlptRecoveryDayDetailScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { level, day } = route.params;

  const totalDays = getRecoveryCurriculum(level)?.days.length ?? 0;

  // Re-render when progress changes.
  useJlptRecoveryProgress(level);
  const done = isDayDone(level, day);

  const [lesson, setLesson] = useState<RecoveryLesson | null>(null);
  const [lessonLoading, setLessonLoading] = useState(false);
  const [lessonError, setLessonError] = useState<string | null>(null);
  const lessonConfigured = isRecoveryLessonConfigured();

  const info = getRecoveryCurriculumDay(level, day);
  const phase = info ? getRecoveryCurriculumPhase(level, info.phase) : undefined;

  // Reset when switching days; auto-load a cached lesson without an API call.
  useEffect(() => {
    let active = true;
    setLesson(null);
    setLessonError(null);
    const current = getRecoveryCurriculumDay(level, day);
    if (!current || current.kind !== 'normal') return;
    const source = { level, day, theme: current.theme, patterns: current.grammar };
    (async () => {
      if (await hasCachedRecoveryLesson(source)) {
        try {
          const l = await getRecoveryLesson(source);
          if (active) setLesson(l);
        } catch {
          // cached load failed — user can tap generate
        }
      }
    })();
    return () => {
      active = false;
    };
  }, [level, day]);

  if (!info) {
    return (
      <View style={styles.centerWrap}>
        <Text style={styles.notFound}>Không tìm thấy Day {day}.</Text>
      </View>
    );
  }

  const handleToggle = async () => {
    await toggleDay(level, day);
  };

  const handleGenerate = async () => {
    setLessonError(null);
    setLessonLoading(true);
    try {
      setLesson(
        await getRecoveryLesson({ level, day, theme: info.theme, patterns: info.grammar })
      );
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setLessonError(
        msg === 'not-configured'
          ? 'Chưa cấu hình Anthropic API key (EXPO_PUBLIC_ANTHROPIC_API_KEY).'
          : `Không tạo được bài học: ${msg}`
      );
    } finally {
      setLessonLoading(false);
    }
  };

  const showLessonUi = info.kind === 'normal';
  const kindLabel =
    info.kind === 'review' ? 'Ngày ôn tập' : info.kind === 'test' ? 'Ngày kiểm tra' : null;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.dayBadge}>
        {level} · DAY {info.day} / {totalDays}
      </Text>
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
          <Text style={styles.cardLabel}>Chủ đề từ vựng</Text>
          <Text style={styles.cardBody}>{info.vocabTopic}</Text>
        </View>
      )}

      {info.kind === 'normal' && (
        <TouchableOpacity
          style={styles.contentBtn}
          onPress={() => navigation.navigate('JlptRecoveryDayContent', { level, day })}
          activeOpacity={0.85}
        >
          <Ionicons name="library-outline" size={18} color={Colors.white} />
          <View style={styles.contentBtnText}>
            <Text style={styles.contentBtnTitle}>Mở Từ vựng + Quiz</Text>
            <Text style={styles.contentBtnSub}>Từ vựng đầy đủ sắc thái · quiz trắc nghiệm</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={Colors.white} />
        </TouchableOpacity>
      )}

      <View style={styles.card}>
        <Text style={styles.cardLabel}>
          {info.kind === 'normal' ? 'Ngữ pháp trọng tâm' : 'Nội dung'}
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
                        audioId={`jlpt:${level}:${day}:${gi}:${ei}`}
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
            <>
              <TouchableOpacity
                style={[styles.genBtn, (lessonLoading || !lessonConfigured) && styles.genBtnDisabled]}
                onPress={() => void handleGenerate()}
                disabled={lessonLoading || !lessonConfigured}
                activeOpacity={0.85}
              >
                {lessonLoading ? (
                  <ActivityIndicator color={Colors.white} />
                ) : (
                  <>
                    <Ionicons name="sparkles" size={16} color={Colors.white} />
                    <Text style={styles.genBtnText}>Tạo bài học chi tiết (AI)</Text>
                  </>
                )}
              </TouchableOpacity>
              <Text style={styles.genHint}>
                {lessonConfigured
                  ? 'Claude giải thích các mẫu ngữ pháp + ví dụ. Lưu cache, mở lại không tốn token.'
                  : 'Cần Anthropic API key (EXPO_PUBLIC_ANTHROPIC_API_KEY) để tạo bài học.'}
              </Text>
            </>
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
          style={[styles.navBtn, day >= totalDays && styles.navBtnDisabled]}
          disabled={day >= totalDays}
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
  genBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
  },
  genBtnDisabled: { opacity: 0.5 },
  genBtnText: { color: Colors.white, fontSize: 15, fontFamily: 'BeVietnamPro_700Bold' },
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
