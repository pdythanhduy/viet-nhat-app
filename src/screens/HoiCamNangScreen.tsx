// Hỏi Cẩm Nang — Phase 1 chat-style retrieval assistant.
//
// User types a free-text Vietnamese question; the screen runs the local
// retrieveChatAnswer() helper (no AI, no network) and renders the synthesized
// answer + source cards + glossary chips + counter phrases.
//
// The chat metaphor is intentional but lightweight: messages live in
// React state only, are not persisted, and the assistant never "remembers"
// previous turns. Each question is an independent retrieval against the
// existing searchIndex.

import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Clipboard from 'expo-clipboard';

import { Colors } from '../constants/colors';
import { RichInline } from '../components/RichText';
import { RootStackParamList } from '../navigation/AppNavigator';
import {
  retrieveChatAnswer,
  ChatRetrievalResult,
  SUGGESTED_QUESTIONS,
} from '../utils/chatRetrieval';
import { SearchResultItem } from '../utils/searchIndex';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type Turn =
  | { kind: 'user'; id: string; text: string }
  | { kind: 'assistant'; id: string; query: string; result: ChatRetrievalResult };

function getResultIcon(type: SearchResultItem['type']) {
  if (type === 'guide') return 'document-text-outline';
  if (type === 'daily-life') return 'sunny-outline';
  if (type === 'jobs') return 'briefcase-outline';
  if (type === 'japanese-dialogue') return 'chatbubbles-outline';
  if (type === 'japanese-word') return 'book-outline';
  return 'language-outline';
}

function getResultColor(type: SearchResultItem['type']) {
  if (type === 'guide') return Colors.primary;
  if (type === 'daily-life') return Colors.success;
  if (type === 'jobs') return '#8E44AD';
  if (type === 'japanese-dialogue') return '#E67E22';
  if (type === 'japanese-word') return '#16A085';
  return '#E74C3C';
}

export default function HoiCamNangScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [input, setInput] = useState('');
  const [turns, setTurns] = useState<Turn[]>([]);
  const scrollRef = useRef<ScrollView | null>(null);

  const hasMessages = turns.length > 0;

  const ask = useCallback((rawQuery: string) => {
    const query = rawQuery.trim();
    if (!query) return;
    const userTurn: Turn = {
      kind: 'user',
      id: `u-${Date.now()}`,
      text: query,
    };
    const assistantTurn: Turn = {
      kind: 'assistant',
      id: `a-${Date.now()}`,
      query,
      result: retrieveChatAnswer(query),
    };
    setTurns((prev) => [...prev, userTurn, assistantTurn]);
    setInput('');
    // Scroll after the next paint so the new assistant card is in frame.
    requestAnimationFrame(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    });
  }, []);

  const handleSubmit = useCallback(() => {
    ask(input);
  }, [ask, input]);

  const handleSuggested = useCallback(
    (question: string) => {
      ask(question);
    },
    [ask],
  );

  const handleOpenSource = useCallback(
    (item: SearchResultItem) => {
      if (item.type === 'guide') {
        navigation.navigate('AdminDetail', { guideId: item.id });
        return;
      }
      if (item.type === 'daily-life') {
        navigation.navigate('DailyLifeDetail', { topicId: item.id });
        return;
      }
      if (item.type === 'jobs') {
        if (item.id === 'jobs:labor-guide') {
          navigation.navigate('LaborGuide');
          return;
        }
        if (item.id === 'jobs:labor-help') {
          navigation.navigate('LaborHelp');
          return;
        }
        navigation.navigate('MainTabs', { screen: 'Jobs' });
        return;
      }
      navigation.navigate('MainTabs', {
        screen: 'Japanese',
        params: item.queryHint ? { initialSearch: item.queryHint } : undefined,
      });
    },
    [navigation],
  );

  const handleCopyPhrase = useCallback(async (jp: string) => {
    try {
      await Clipboard.setStringAsync(jp);
    } catch {
      // Clipboard can fail on some emulators; ignore silently.
    }
    Alert.alert('Đã copy', jp);
  }, []);

  const handleReset = useCallback(() => {
    setTurns([]);
    setInput('');
  }, []);

  const introCopy = useMemo(
    () => ({
      title: 'Hỏi Cẩm Nang',
      subtitle:
        'Trợ lý beta — gõ câu hỏi tự nhiên bằng tiếng Việt, app sẽ tìm bài hướng dẫn và câu cần nói tại quầy.',
    }),
    [],
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} accessibilityLabel="Quay lại">
          <Ionicons name="arrow-back" size={22} color={Colors.white} />
        </TouchableOpacity>
        <View style={styles.headerText}>
          <View style={styles.headerTitleRow}>
            <Ionicons name="sparkles-outline" size={18} color={Colors.white} />
            <Text style={styles.headerTitle}>{introCopy.title}</Text>
            <View style={styles.betaPill}>
              <Text style={styles.betaPillText}>BETA</Text>
            </View>
          </View>
          <Text style={styles.headerDesc}>{introCopy.subtitle}</Text>
        </View>
        {hasMessages ? (
          <TouchableOpacity onPress={handleReset} accessibilityLabel="Bắt đầu lại" style={styles.resetBtn}>
            <Ionicons name="refresh" size={18} color={Colors.white} />
          </TouchableOpacity>
        ) : null}
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        style={styles.content}
      >
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {!hasMessages ? (
            <View style={styles.emptyState}>
              <View style={styles.emptyIconBg}>
                <Ionicons name="chatbubble-ellipses-outline" size={28} color={Colors.primary} />
              </View>
              <Text style={styles.emptyTitle}>Chưa biết hỏi gì?</Text>
              <Text style={styles.emptyDesc}>
                Bạn có thể bắt đầu bằng một trong các câu hỏi gợi ý dưới đây — hoặc tự gõ câu hỏi của riêng bạn.
              </Text>
              <View style={styles.suggestionWrap}>
                {SUGGESTED_QUESTIONS.map((q) => (
                  <TouchableOpacity
                    key={q}
                    style={styles.suggestionChip}
                    onPress={() => handleSuggested(q)}
                    accessibilityRole="button"
                  >
                    <Ionicons name="help-circle-outline" size={14} color={Colors.primary} />
                    <Text style={styles.suggestionText}>{q}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ) : (
            turns.map((turn) =>
              turn.kind === 'user' ? (
                <View key={turn.id} style={styles.userBubble}>
                  <Text style={styles.userBubbleText}>{turn.text}</Text>
                </View>
              ) : (
                <AssistantTurn
                  key={turn.id}
                  result={turn.result}
                  onOpenSource={handleOpenSource}
                  onCopyPhrase={handleCopyPhrase}
                />
              ),
            )
          )}

          {hasMessages ? (
            <View style={styles.disclaimer}>
              <Ionicons name="information-circle-outline" size={14} color={Colors.textMuted} />
              <Text style={styles.disclaimerText}>
                Nội dung mang tính tham khảo, lấy từ bài có sẵn trong app. Không thay tư vấn pháp lý, y tế hay
                thông tin chính thức. Hãy kiểm tra trang chính phủ liên quan trước khi quyết định.
              </Text>
            </View>
          ) : null}
        </ScrollView>

        <View style={styles.inputBar}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Gõ câu hỏi…"
            placeholderTextColor={Colors.textMuted}
            style={styles.input}
            multiline
            onSubmitEditing={handleSubmit}
            blurOnSubmit
            returnKeyType="send"
          />
          <TouchableOpacity
            onPress={handleSubmit}
            style={[styles.sendBtn, !input.trim() && styles.sendBtnDisabled]}
            disabled={!input.trim()}
            accessibilityRole="button"
            accessibilityLabel="Gửi câu hỏi"
          >
            <Ionicons name="arrow-up" size={20} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

interface AssistantTurnProps {
  result: ChatRetrievalResult;
  onOpenSource: (item: SearchResultItem) => void;
  onCopyPhrase: (jp: string) => void;
}

function AssistantTurn({ result, onOpenSource, onCopyPhrase }: AssistantTurnProps) {
  const lowConfidence = result.confidence === 'low';
  return (
    <View style={styles.assistantBlock}>
      <View style={styles.assistantHeader}>
        <View style={styles.assistantAvatar}>
          <Ionicons name="sparkles" size={14} color={Colors.primary} />
        </View>
        <Text style={styles.assistantLabel}>Cẩm Nang</Text>
        {lowConfidence ? (
          <View style={styles.lowConfPill}>
            <Text style={styles.lowConfPillText}>Mình chưa chắc</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.assistantCard}>
        <Text style={styles.assistantAnswer}>{result.answer}</Text>

        {result.bullets.length > 0 ? (
          <View style={styles.bulletList}>
            {result.bullets.map((b, i) => (
              <View key={`${b.guideId}-${i}`} style={styles.bulletRow}>
                <View style={styles.bulletDot} />
                <View style={styles.bulletTextBlock}>
                  <Text style={styles.bulletText}>{b.text}</Text>
                  <Text style={styles.bulletSource}>Theo bài: {b.guideTitle}</Text>
                </View>
              </View>
            ))}
          </View>
        ) : null}

        {result.glossary.length > 0 ? (
          <View style={styles.glossaryBlock}>
            <View style={styles.glossaryHeader}>
              <Ionicons name="book-outline" size={14} color={Colors.primary} />
              <Text style={styles.glossaryTitle}>Từ cần biết</Text>
            </View>
            {result.glossary.map((g, i) => (
              <View key={`${g.guideId}-${g.term}-${i}`} style={styles.glossaryRow}>
                <View style={styles.glossaryTermRow}>
                  <Text style={styles.glossaryTerm}>{g.term}</Text>
                  {g.reading ? (
                    <Text style={styles.glossaryReading}>{g.reading}</Text>
                  ) : null}
                </View>
                <Text style={styles.glossaryMeaning}>{g.meaningVi}</Text>
                {g.noteVi ? (
                  <RichInline text={g.noteVi} style={styles.glossaryNote} />
                ) : null}
              </View>
            ))}
          </View>
        ) : null}

        {result.counterPhrases.length > 0 ? (
          <View style={styles.counterBlock}>
            <View style={styles.glossaryHeader}>
              <Ionicons name="chatbubbles-outline" size={14} color={Colors.primary} />
              <Text style={styles.glossaryTitle}>Câu có thể nói tại quầy</Text>
            </View>
            {result.counterPhrases.map((p, i) => (
              <View key={`${p.guideId}-${i}`} style={styles.counterRow}>
                <View style={styles.counterTopRow}>
                  <Text style={styles.counterJp}>{p.jp}</Text>
                  <TouchableOpacity
                    onPress={() => onCopyPhrase(p.jp)}
                    accessibilityLabel="Copy câu tiếng Nhật"
                    style={styles.copyBtn}
                  >
                    <Ionicons name="copy-outline" size={16} color={Colors.primary} />
                  </TouchableOpacity>
                </View>
                {p.romaji ? <Text style={styles.counterRomaji}>{p.romaji}</Text> : null}
                <Text style={styles.counterVn}>{p.vn}</Text>
              </View>
            ))}
          </View>
        ) : null}

        {result.sources.length > 0 ? (
          <View style={styles.sourcesBlock}>
            <Text style={styles.sourcesLabel}>Bài liên quan</Text>
            {result.sources.map((s) => {
              const color = getResultColor(s.type);
              return (
                <TouchableOpacity
                  key={`${s.type}-${s.id}`}
                  style={styles.sourceCard}
                  onPress={() => onOpenSource(s)}
                  accessibilityRole="button"
                >
                  <View style={[styles.sourceIconBg, { backgroundColor: `${color}18` }]}>
                    <Ionicons name={getResultIcon(s.type)} size={16} color={color} />
                  </View>
                  <View style={styles.sourceTextBlock}>
                    <RichInline text={s.title} style={styles.sourceTitle} />
                    <RichInline text={s.snippet} style={styles.sourceSnippet} numberOfLines={2} />
                  </View>
                  <Ionicons name="chevron-forward" size={14} color={Colors.textMuted} />
                </TouchableOpacity>
              );
            })}
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  header: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 20,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  backBtn: {
    paddingTop: 2,
  },
  resetBtn: {
    paddingTop: 2,
    paddingHorizontal: 4,
  },
  headerText: {
    flex: 1,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.white,
  },
  betaPill: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  betaPillText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
    letterSpacing: 0.5,
  },
  headerDesc: {
    fontSize: 13,
    lineHeight: 19,
    color: 'rgba(255,255,255,0.85)',
  },

  content: {
    flex: 1,
    backgroundColor: Colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },

  // Empty state with suggested chips.
  emptyState: {
    marginTop: 16,
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  emptyIconBg: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '800',
    fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  emptyDesc: {
    fontSize: 13,
    lineHeight: 19,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 18,
  },
  suggestionWrap: {
    width: '100%',
    gap: 10,
  },
  suggestionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 11,
  },
  suggestionText: {
    flex: 1,
    fontSize: 13,
    color: Colors.textPrimary,
    fontWeight: '600',
    fontFamily: 'BeVietnamPro_600SemiBold',
  },

  // User bubble.
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 16,
    borderBottomRightRadius: 4,
    marginBottom: 14,
    maxWidth: '85%',
  },
  userBubbleText: {
    color: Colors.white,
    fontSize: 14,
    lineHeight: 20,
  },

  // Assistant turn container + card.
  assistantBlock: {
    marginBottom: 18,
  },
  assistantHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  assistantAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  assistantLabel: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textSecondary,
  },
  lowConfPill: {
    backgroundColor: Colors.warningLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginLeft: 4,
  },
  lowConfPillText: {
    color: Colors.warning,
    fontSize: 10,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
  },
  assistantCard: {
    backgroundColor: Colors.card,
    borderRadius: 14,
    borderBottomLeftRadius: 4,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  assistantAnswer: {
    fontSize: 14,
    lineHeight: 21,
    color: Colors.textPrimary,
    marginBottom: 12,
  },

  bulletList: {
    gap: 10,
    marginBottom: 4,
  },
  bulletRow: {
    flexDirection: 'row',
    gap: 10,
  },
  bulletDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
    marginTop: 9,
  },
  bulletTextBlock: {
    flex: 1,
  },
  bulletText: {
    fontSize: 13,
    lineHeight: 20,
    color: Colors.textPrimary,
  },
  bulletSource: {
    marginTop: 3,
    fontSize: 11,
    color: Colors.textMuted,
    fontStyle: 'italic',
  },

  // Glossary chips.
  glossaryBlock: {
    marginTop: 14,
    backgroundColor: Colors.accent,
    borderRadius: 10,
    padding: 12,
  },
  glossaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  glossaryTitle: {
    fontSize: 12,
    fontWeight: '800',
    fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  glossaryRow: {
    marginBottom: 10,
  },
  glossaryTermRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  glossaryTerm: {
    fontSize: 15,
    fontWeight: '800',
    fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.textPrimary,
  },
  glossaryReading: {
    fontSize: 11,
    color: Colors.textMuted,
  },
  glossaryMeaning: {
    fontSize: 13,
    color: Colors.textPrimary,
    marginTop: 2,
  },
  glossaryNote: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 18,
    marginTop: 2,
  },

  // Counter phrases.
  counterBlock: {
    marginTop: 14,
    backgroundColor: Colors.tagBlue,
    borderRadius: 10,
    padding: 12,
  },
  counterRow: {
    marginBottom: 10,
  },
  counterTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  counterJp: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textPrimary,
  },
  copyBtn: {
    padding: 4,
  },
  counterRomaji: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 2,
  },
  counterVn: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 4,
    lineHeight: 18,
  },

  // Source cards row.
  sourcesBlock: {
    marginTop: 14,
  },
  sourcesLabel: {
    fontSize: 11,
    fontWeight: '800',
    fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    marginBottom: 8,
  },
  sourceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
    marginBottom: 8,
  },
  sourceIconBg: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sourceTextBlock: {
    flex: 1,
  },
  sourceTitle: {
    fontSize: 13,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textPrimary,
  },
  sourceSnippet: {
    marginTop: 2,
    fontSize: 11,
    color: Colors.textSecondary,
    lineHeight: 16,
  },

  // Disclaimer.
  disclaimer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 6,
    paddingHorizontal: 4,
  },
  disclaimerText: {
    flex: 1,
    fontSize: 11,
    lineHeight: 16,
    color: Colors.textMuted,
    fontStyle: 'italic',
  },

  // Input bar.
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: Colors.card,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    backgroundColor: Colors.background,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: Colors.textPrimary,
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnDisabled: {
    backgroundColor: Colors.textMuted,
  },
});
