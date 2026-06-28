// JLPT Recovery — rich Day content: Vocabulary + Quiz (generic, engine-backed).
// All content is AI-generated (cached). Reached from the Day detail screen.
// Used for every level except N2, which keeps its own content screen.

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, RouteProp } from '@react-navigation/native';
import { setAudioModeAsync, useAudioPlayer } from 'expo-audio';
import { Colors } from '../constants/colors';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { getRecoveryCurriculumDay } from '../constants/jlptRecoveryCurriculum';
import {
  getRecoveryDayContent,
  type RecoveryContentSource,
} from '../services/jlptRecoveryContent';
import type {
  RecoveryDayContent,
  RecoveryExampleTag,
  RecoveryQuizItem,
  RecoveryVocabCard,
} from '../services/jlptRecoveryTypes';
import {
  isVbeeConfigured,
  synthesizeVbeeSpeech,
  getVbeeJapaneseVoiceCode,
} from '../services/vbeeTts';
import { getN2VocabSpeechText } from '../utils/n2SpeechText';

type Route = RouteProp<RootStackParamList, 'JlptRecoveryDayContent'>;

const TAG_LABEL: Record<RecoveryExampleTag, string> = { B: 'Business', D: 'Daily', N: 'News' };
const TAG_STYLE: Record<RecoveryExampleTag, { bg: string; color: string }> = {
  B: { bg: '#DBEAFE', color: '#1E40AF' },
  D: { bg: '#DCFCE7', color: '#166534' },
  N: { bg: '#FEF9C3', color: '#854D0E' },
};

const VbeeAudioText = {
  notConfiguredTitle: 'Chưa cấu hình Vbee',
  notConfiguredMessage:
    'Thêm EXPO_PUBLIC_VBEE_APP_ID và EXPO_PUBLIC_VBEE_API_KEY vào .env rồi khởi động lại Expo.',
  errorPrefix: 'Không đọc được bằng Vbee',
};

export default function JlptRecoveryDayContentScreen() {
  const route = useRoute<Route>();
  const { level, day } = route.params;
  const info = getRecoveryCurriculumDay(level, day);

  const source: RecoveryContentSource = {
    level,
    day,
    getDayInfo: (d) => {
      const c = getRecoveryCurriculumDay(level, d);
      return c ? { theme: c.theme, vocabTopic: c.vocabTopic, kind: c.kind } : undefined;
    },
  };

  const [content, setContent] = useState<RecoveryDayContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [vbeeError, setVbeeError] = useState<string | null>(null);
  const [vbeeLoadingId, setVbeeLoadingId] = useState<string | null>(null);
  const vbeeConfigured = isVbeeConfigured();
  const vbeePlayer = useAudioPlayer(null, { updateInterval: 1000 });

  useEffect(() => {
    void setAudioModeAsync({
      playsInSilentMode: true,
      interruptionMode: 'duckOthers',
    }).catch(() => undefined);
  }, []);

  // Content is pre-generated (bundled N5 / Supabase N4–N1). Load it automatically.
  useEffect(() => {
    let active = true;
    setContent(null);
    setError(null);
    setLoading(true);
    (async () => {
      try {
        const c = await getRecoveryDayContent(source);
        if (active) setContent(c);
      } catch (e) {
        if (!active) return;
        const msg = e instanceof Error ? e.message : String(e);
        setError(
          msg === 'no-content'
            ? 'Nội dung ngày này chưa sẵn sàng. Vui lòng kiểm tra kết nối mạng và thử lại.'
            : `Không tải được nội dung: ${msg}`
        );
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level, day]);

  const handleReadWithVbee = async (audioId: string, text: string) => {
    const speechText = getN2VocabSpeechText(text);
    if (!speechText) return;
    if (!vbeeConfigured) {
      Alert.alert(VbeeAudioText.notConfiguredTitle, VbeeAudioText.notConfiguredMessage);
      return;
    }

    setVbeeError(null);
    setVbeeLoadingId(audioId);
    try {
      const result = await synthesizeVbeeSpeech(speechText, {
        voiceCode: getVbeeJapaneseVoiceCode(),
      });
      vbeePlayer.replace({ uri: result.audioUrl });
      vbeePlayer.play();
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setVbeeError(
        msg === 'not-configured'
          ? VbeeAudioText.notConfiguredMessage
          : `${VbeeAudioText.errorPrefix}: ${msg}`
      );
    } finally {
      setVbeeLoadingId((current) => (current === audioId ? null : current));
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.cover}>
        <Text style={styles.coverDay}>
          {level} · DAY {day}
        </Text>
        <Text style={styles.coverTheme}>{info?.theme ?? ''}</Text>
        <Text style={styles.coverSub}>Từ vựng + Quiz</Text>
      </View>

      {vbeeError && (
        <View style={styles.errBox}>
          <Ionicons name="alert-circle-outline" size={16} color={Colors.warning} />
          <Text style={styles.errText}>{vbeeError}</Text>
        </View>
      )}

      {!content ? (
        <View style={styles.genWrap}>
          {loading ? (
            <>
              <ActivityIndicator color={Colors.primary} />
              <Text style={styles.genLoadingText}>Đang tải từ vựng + quiz…</Text>
            </>
          ) : (
            error && (
              <View style={styles.errBox}>
                <Ionicons name="alert-circle-outline" size={16} color={Colors.warning} />
                <Text style={styles.errText}>{error}</Text>
              </View>
            )
          )}
        </View>
      ) : (
        <>
          {content.review?.length ? (
            <>
              <Text style={styles.sectionTitle}>MỤC 1 — REVIEW</Text>
              <View style={styles.reviewCard}>
                {content.review.map((item, index) => (
                  <View
                    key={`${item.term}:${index}`}
                    style={[
                      styles.reviewRow,
                      index === content.review!.length - 1 && styles.reviewRowLast,
                    ]}
                  >
                    <Text style={styles.reviewTerm}>{item.term}</Text>
                    <Text style={styles.reviewNote}>{item.note}</Text>
                  </View>
                ))}
              </View>
            </>
          ) : null}

          <Text style={styles.sectionTitle}>MỤC 2 — TỪ VỰNG ({content.vocab.length} từ)</Text>
          <Text style={styles.sectionNote}>［n］= accent ｜ ★ = tần suất ｜ B/D/N = ngữ cảnh ví dụ</Text>
          {content.vocab.map((v) => (
            <VocabCard
              key={v.id}
              level={level}
              day={day}
              card={v}
              loadingAudioId={vbeeLoadingId}
              onRead={handleReadWithVbee}
            />
          ))}

          {content.quiz.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>QUIZ — {content.quiz.length} câu</Text>
              <Text style={styles.sectionNote}>Bấm vào đáp án để kiểm tra.</Text>
              {content.quiz.map((q, i) => (
                <QuizCard key={i} index={i} item={q} />
              ))}
            </>
          )}

          <Text style={styles.footNote}>Đã lưu để mở lại nhanh, không cần mạng.</Text>
        </>
      )}
    </ScrollView>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <Text style={styles.row}>
      <Text style={styles.rowLab}>{label} </Text>
      {value}
    </Text>
  );
}

function VocabCard({
  level,
  day,
  card,
  loadingAudioId,
  onRead,
}: {
  level: string;
  day: number;
  card: RecoveryVocabCard;
  loadingAudioId: string | null;
  onRead: (audioId: string, text: string) => void;
}) {
  const wordAudioId = `jlptc:${level}:${day}:${card.id}`;
  return (
    <View style={styles.card}>
      <View style={styles.cardHeadRow}>
        <Text style={styles.cardHead}>
          {card.jp} <Text style={styles.cardAcc}>{card.acc}</Text>
        </Text>
        <VbeeAudioButton
          audioId={wordAudioId}
          text={getN2VocabSpeechText(card.jp)}
          loadingAudioId={loadingAudioId}
          size={14}
          onRead={onRead}
        />
      </View>
      {!!card.meta && <Text style={styles.cardMeta}>{card.meta}</Text>}
      <Row label="Nghĩa:" value={card.mean} />
      <Row label="Sắc thái:" value={card.nu} />
      {(card.syn !== '—' || card.ant !== '—') && (
        <Text style={styles.row}>
          <Text style={styles.rowLab}>Đồng: </Text>
          {card.syn}
          <Text style={styles.rowLab}>　Trái: </Text>
          {card.ant}
        </Text>
      )}
      <Row label="Collocations:" value={card.col} />
      <Row label="Dùng:" value={card.use} />
      {!!card.mis && (
        <View style={styles.misBox}>
          <Text style={styles.misText}>
            <Text style={styles.rowLab}>⚠ Lỗi người Việt: </Text>
            {card.mis}
          </Text>
        </View>
      )}
      {!!card.note && (
        <View style={styles.noteBox}>
          <Text style={styles.noteText}>
            <Text style={styles.rowLab}>Native note: </Text>
            {card.note}
          </Text>
        </View>
      )}
      {card.ex.length > 0 && (
        <View style={styles.exWrap}>
          {card.ex.map(([tag, sentence], i) => (
            <View key={i} style={styles.exRow}>
              <View style={[styles.tag, { backgroundColor: TAG_STYLE[tag].bg }]}>
                <Text style={[styles.tagText, { color: TAG_STYLE[tag].color }]}>
                  {TAG_LABEL[tag]}
                </Text>
              </View>
              <Text style={styles.exJp}>{sentence}</Text>
              <VbeeAudioButton
                audioId={`jlptc:${level}:${day}:${card.id}:ex${i}`}
                text={sentence}
                loadingAudioId={loadingAudioId}
                size={13}
                onRead={onRead}
              />
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

function VbeeAudioButton({
  audioId,
  text,
  loadingAudioId,
  size,
  onRead,
}: {
  audioId: string;
  text: string | null;
  loadingAudioId: string | null;
  size: number;
  onRead: (audioId: string, text: string) => void;
}) {
  if (!text) return null;
  const loading = loadingAudioId === audioId;
  return (
    <TouchableOpacity
      style={styles.audioBtn}
      onPress={() => onRead(audioId, text)}
      disabled={loading}
      activeOpacity={0.85}
      accessibilityRole="button"
      accessibilityLabel="Đọc bằng Vbee"
    >
      {loading ? (
        <ActivityIndicator size="small" color={Colors.primary} />
      ) : (
        <Ionicons name="volume-high" size={size} color={Colors.primary} />
      )}
    </TouchableOpacity>
  );
}

function QuizCard({ index, item }: { index: number; item: RecoveryQuizItem }) {
  const [picked, setPicked] = useState<number | null>(null);
  return (
    <View style={styles.quiz}>
      <Text style={styles.quizQ}>
        {index + 1}. {item.q}
      </Text>
      {item.o.map((op, j) => {
        const revealed = picked !== null;
        const isCorrect = j === item.a;
        const isPicked = j === picked;
        const optStyle = [
          styles.quizOpt,
          revealed && isCorrect && styles.quizOptCorrect,
          revealed && isPicked && !isCorrect && styles.quizOptWrong,
        ];
        return (
          <TouchableOpacity
            key={j}
            style={optStyle}
            onPress={() => setPicked(picked === null ? j : picked)}
            activeOpacity={0.8}
          >
            <Text style={styles.quizOptText}>
              {'ABCD'[j]}. {op}
            </Text>
            {revealed && isCorrect && (
              <Ionicons name="checkmark-circle" size={16} color="#166534" />
            )}
            {revealed && isPicked && !isCorrect && (
              <Ionicons name="close-circle" size={16} color="#B91C1C" />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 16, paddingBottom: 48 },
  cover: {
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 3,
    borderBottomColor: Colors.primary,
    marginBottom: 18,
  },
  coverDay: { fontSize: 13, fontFamily: 'BeVietnamPro_700Bold', color: Colors.primary, letterSpacing: 1 },
  coverTheme: {
    fontSize: 22,
    fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.textPrimary,
    marginTop: 4,
    textAlign: 'center',
  },
  coverSub: { fontSize: 12, color: Colors.textMuted, marginTop: 4 },
  genWrap: { alignItems: 'center', gap: 10, paddingVertical: 30 },
  genBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  btnDisabled: { opacity: 0.5 },
  genBtnText: { color: Colors.white, fontSize: 15, fontFamily: 'BeVietnamPro_700Bold' },
  genHint: { fontSize: 12, color: Colors.textMuted, lineHeight: 18, textAlign: 'center', paddingHorizontal: 8 },
  genLoadingText: { fontSize: 13, color: Colors.textSecondary, textAlign: 'center', paddingHorizontal: 16, lineHeight: 20 },
  sectionTitle: {
    fontSize: 15,
    fontFamily: 'BeVietnamPro_800ExtraBold',
    color: '#3730A3',
    backgroundColor: '#EEF2FF',
    borderLeftWidth: 5,
    borderLeftColor: Colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 22,
    marginBottom: 8,
  },
  sectionNote: { fontSize: 12, color: Colors.textMuted, marginBottom: 12 },
  reviewCard: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    backgroundColor: Colors.card,
    marginBottom: 12,
    overflow: 'hidden',
  },
  reviewRow: {
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 9,
    paddingHorizontal: 11,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  reviewRowLast: { borderBottomWidth: 0 },
  reviewTerm: {
    width: '34%',
    fontSize: 13,
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.primary,
    lineHeight: 19,
  },
  reviewNote: {
    flex: 1,
    fontSize: 13,
    color: Colors.textPrimary,
    lineHeight: 19,
  },
  card: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    backgroundColor: Colors.card,
  },
  cardHeadRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  cardHead: { flex: 1, fontSize: 16, fontFamily: 'BeVietnamPro_800ExtraBold', color: Colors.textPrimary, lineHeight: 24 },
  cardAcc: { color: Colors.primary, fontFamily: 'BeVietnamPro_700Bold' },
  cardMeta: { fontSize: 12, color: Colors.textMuted, marginTop: 2, marginBottom: 6 },
  audioBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.accent,
  },
  row: { fontSize: 13.5, color: Colors.textPrimary, lineHeight: 21, marginTop: 3 },
  rowLab: { fontFamily: 'BeVietnamPro_700Bold', color: '#475569' },
  misBox: { backgroundColor: '#FEF2F2', borderLeftWidth: 3, borderLeftColor: '#F87171', padding: 7, borderRadius: 5, marginTop: 6 },
  misText: { fontSize: 13, color: '#7F1D1D', lineHeight: 19 },
  noteBox: { backgroundColor: '#F0FDF4', borderLeftWidth: 3, borderLeftColor: '#4ADE80', padding: 7, borderRadius: 5, marginTop: 6 },
  noteText: { fontSize: 13, color: '#14532D', lineHeight: 19 },
  exWrap: { backgroundColor: Colors.background, borderRadius: 6, padding: 8, marginTop: 8, gap: 6 },
  exRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  tag: { borderRadius: 4, paddingHorizontal: 6, paddingVertical: 1 },
  tagText: { fontSize: 10, fontFamily: 'BeVietnamPro_700Bold' },
  exJp: { flex: 1, fontSize: 14, color: Colors.textPrimary, lineHeight: 21 },
  quiz: { borderWidth: 1, borderColor: Colors.border, borderRadius: 9, padding: 12, marginBottom: 10, backgroundColor: Colors.card },
  quizQ: { fontSize: 14, fontFamily: 'BeVietnamPro_700Bold', color: Colors.textPrimary, marginBottom: 8, lineHeight: 21 },
  quizOpt: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: Colors.border,
    marginTop: 5,
  },
  quizOptCorrect: { backgroundColor: '#DCFCE7', borderColor: '#86EFAC' },
  quizOptWrong: { backgroundColor: '#FEE2E2', borderColor: '#FCA5A5' },
  quizOptText: { flex: 1, fontSize: 13.5, color: Colors.textPrimary, lineHeight: 20 },
  footNote: { fontSize: 11, color: Colors.textMuted, textAlign: 'center', marginTop: 16 },
  errBox: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, backgroundColor: '#FEF2F2', borderRadius: 10, padding: 12, marginTop: 8 },
  errText: { flex: 1, fontSize: 13, color: '#B91C1C', lineHeight: 19 },
});
