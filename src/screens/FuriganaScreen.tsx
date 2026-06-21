// Furigana reader — paste Japanese (e.g. a news article), tap render, and
// read it with hiragana shown above each kanji. Experimental; reached from
// the Lab, and from Home when the `furiganaReader` flag is on.

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Clipboard from 'expo-clipboard';
import { setAudioModeAsync, useAudioPlayer } from 'expo-audio';
import { Colors } from '../constants/colors';
import AudioButton from '../components/AudioButton';
import {
  FuriganaToken,
  fetchFurigana,
  isFuriganaConfigured,
} from '../services/furigana';
import { fetchArticleText } from '../services/articleReader';
import { translateToVietnamese, isTranslateConfigured } from '../services/translate';
import { isVbeeConfigured, synthesizeVbeeSpeech } from '../services/vbeeTts';
import {
  SmartWordExplanation,
  explainJapaneseSelection,
  getSentenceAtOffset,
} from '../services/smartTranslation';

const SAMPLE =
  '日本政府は来年から外国人労働者の受け入れを拡大する方針を発表しました。';

const VbeeUiText = {
  readJapanese: '\u0110\u1ecdc ti\u1ebfng Nh\u1eadt',
  readTranslation: '\u0110\u1ecdc b\u1ea3n d\u1ecbch',
  notConfigured:
    'Ch\u01b0a c\u1ea5u h\u00ecnh Vbee. Th\u00eam EXPO_PUBLIC_VBEE_APP_ID v\u00e0 EXPO_PUBLIC_VBEE_API_KEY v\u00e0o .env r\u1ed3i kh\u1edfi \u0111\u1ed9ng l\u1ea1i Expo.',
  emptyTranslation: 'B\u1ea3n d\u1ecbch \u0111ang tr\u1ed1ng n\u00ean ch\u01b0a th\u1ec3 \u0111\u1ecdc.',
  readErrorPrefix: 'Kh\u00f4ng \u0111\u1ecdc \u0111\u01b0\u1ee3c b\u1ea3n d\u1ecbch b\u1eb1ng Vbee',
  configHint: 'Vbee c\u1ea7n EXPO_PUBLIC_VBEE_APP_ID v\u00e0 EXPO_PUBLIC_VBEE_API_KEY trong .env.',
};

const SmartUiText = {
  translating: '\u0110ang d\u1ecbch...',
  lookupTitle: 'Tra t\u1eeb theo ng\u1eef c\u1ea3nh',
  selectedWord: 'T\u1eeb \u0111ang ch\u1ecdn',
  meaning: 'Ngh\u0129a',
  sentenceTranslation: 'D\u1ecbch c\u00e2u',
  note: 'Ghi ch\u00fa',
  notConfigured:
    'Ch\u01b0a c\u1ea5u h\u00ecnh Anthropic API key. Th\u00eam EXPO_PUBLIC_ANTHROPIC_API_KEY v\u00e0o .env r\u1ed3i kh\u1edfi \u0111\u1ed9ng l\u1ea1i app.',
  lookupErrorPrefix: 'Kh\u00f4ng tra \u0111\u01b0\u1ee3c t\u1eeb n\u00e0y',
};

function getTokenText(tokens: FuriganaToken[]): string {
  return tokens.map((token) => token.surface).join('');
}

function getTokenOffset(tokens: FuriganaToken[], index: number): number {
  return tokens.slice(0, index).reduce((sum, token) => sum + token.surface.length, 0);
}

function isLookupableToken(token: FuriganaToken): boolean {
  return token.surface.trim().length > 0 && /[A-Za-z0-9\u3040-\u30ff\u3400-\u9fff\uff66-\uff9f]/.test(token.surface);
}

export default function FuriganaScreen() {
  const [input, setInput] = useState('');
  const [tokens, setTokens] = useState<FuriganaToken[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [url, setUrl] = useState('');
  const [fetchingArticle, setFetchingArticle] = useState(false);

  const [translation, setTranslation] = useState<string | null>(null);
  const [translating, setTranslating] = useState(false);
  const [translateError, setTranslateError] = useState<string | null>(null);
  const [vbeeLoading, setVbeeLoading] = useState(false);
  const [vbeeError, setVbeeError] = useState<string | null>(null);
  const [selectedTokenIndex, setSelectedTokenIndex] = useState<number | null>(null);
  const [wordExplanation, setWordExplanation] = useState<SmartWordExplanation | null>(null);
  const [wordLookupLoading, setWordLookupLoading] = useState(false);
  const [wordLookupError, setWordLookupError] = useState<string | null>(null);

  const configured = isFuriganaConfigured();
  const translateConfigured = isTranslateConfigured();
  const vbeeConfigured = isVbeeConfigured();
  const vbeePlayer = useAudioPlayer(null, { updateInterval: 1000 });
  const insets = useSafeAreaInsets();
  const lookupOpen = selectedTokenIndex !== null;

  useEffect(() => {
    void setAudioModeAsync({
      playsInSilentMode: true,
      interruptionMode: 'duckOthers',
    }).catch(() => undefined);
  }, []);

  const resetSmartState = () => {
    setSelectedTokenIndex(null);
    setWordExplanation(null);
    setWordLookupLoading(false);
    setWordLookupError(null);
  };

  const handleInputChange = (text: string) => {
    setInput(text);
    setTokens(null);
    setError(null);
    setTranslation(null);
    setTranslateError(null);
    setVbeeError(null);
    resetSmartState();
  };

  const handlePaste = async () => {
    const text = await Clipboard.getStringAsync();
    if (text) handleInputChange(text);
  };

  const handleFetchArticle = async () => {
    setError(null);
    setFetchingArticle(true);
    try {
      const text = await fetchArticleText(url);
      handleInputChange(text);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setFetchingArticle(false);
    }
  };

  const handleTranslate = async () => {
    setTranslateError(null);
    setVbeeError(null);
    setTranslation(null);
    setTranslating(true);
    try {
      const result = await translateToVietnamese(input);
      setTranslation(result);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setTranslateError(
        msg === 'not-configured'
          ? 'Chưa cấu hình Anthropic API key. Thêm EXPO_PUBLIC_ANTHROPIC_API_KEY vào .env rồi khởi động lại app.'
          : `Không dịch được: ${msg}`
      );
    } finally {
      setTranslating(false);
    }
  };

  const handleReadTranslation = async () => {
    if (!translation?.trim()) return;
    setVbeeError(null);
    setVbeeLoading(true);
    try {
      const result = await synthesizeVbeeSpeech(translation);
      vbeePlayer.replace({ uri: result.audioUrl });
      vbeePlayer.play();
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setVbeeError(
        msg === 'not-configured'
          ? VbeeUiText.notConfigured
          : msg === 'empty-text'
          ? VbeeUiText.emptyTranslation
          : `${VbeeUiText.readErrorPrefix}: ${msg}`
      );
    } finally {
      setVbeeLoading(false);
    }
  };

  const handleTokenLookup = async (token: FuriganaToken, index: number) => {
    if (!tokens || !isLookupableToken(token)) return;

    const articleText = getTokenText(tokens);
    const offset = getTokenOffset(tokens, index);
    setSelectedTokenIndex(index);
    setWordExplanation(null);
    setWordLookupError(null);
    setWordLookupLoading(true);
    try {
      const result = await explainJapaneseSelection({
        surface: token.surface,
        reading: token.reading,
        sentence: getSentenceAtOffset(articleText, offset),
      });
      setWordExplanation(result);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setWordLookupError(
        msg === 'not-configured'
          ? SmartUiText.notConfigured
          : `${SmartUiText.lookupErrorPrefix}: ${msg}`
      );
    } finally {
      setWordLookupLoading(false);
    }
  };

  const handleRender = async () => {
    setError(null);
    setTokens(null);
    resetSmartState();
    setLoading(true);
    try {
      const result = await fetchFurigana(input);
      setTokens(result);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(
        msg === 'not-configured'
          ? 'Chưa cấu hình Yahoo AppID. Thêm EXPO_PUBLIC_YAHOO_APPID vào .env rồi khởi động lại app.'
          : `Không lấy được furigana: ${msg}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.screen}>
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, lookupOpen && styles.contentLookupOpen]}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.header}>
        <Ionicons name="newspaper-outline" size={24} color={Colors.primary} />
        <Text style={styles.title}>Đọc báo tiếng Nhật</Text>
      </View>
      <Text style={styles.subtitle}>
        Dán link bài báo hoặc dán đoạn tiếng Nhật, rồi xem hiragana trên kanji và dịch
        sang tiếng Việt.
      </Text>

      <View style={styles.urlRow}>
        <TextInput
          style={styles.urlInput}
          placeholder="Dán link bài báo (https://…)"
          placeholderTextColor={Colors.textMuted}
          autoCapitalize="none"
          keyboardType="url"
          value={url}
          onChangeText={setUrl}
        />
        <TouchableOpacity
          style={[styles.urlBtn, (fetchingArticle || !url.trim()) && styles.btnDisabled]}
          onPress={() => void handleFetchArticle()}
          disabled={fetchingArticle || !url.trim()}
        >
          {fetchingArticle ? (
            <ActivityIndicator color={Colors.white} size="small" />
          ) : (
            <Text style={styles.urlBtnText}>Lấy bài</Text>
          )}
        </TouchableOpacity>
      </View>

      {!configured && (
        <View style={styles.warnBox}>
          <Ionicons name="warning-outline" size={16} color={Colors.warning} />
          <Text style={styles.warnText}>
            Chưa có Yahoo AppID — công cụ chưa gọi được API. Thêm
            EXPO_PUBLIC_YAHOO_APPID vào .env rồi mở lại app.
          </Text>
        </View>
      )}

      <TextInput
        style={styles.input}
        placeholder="Dán văn bản tiếng Nhật ở đây…"
        placeholderTextColor={Colors.textMuted}
        multiline
        value={input}
        onChangeText={handleInputChange}
        textAlignVertical="top"
      />

      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.secondaryBtn} onPress={() => void handlePaste()}>
          <Ionicons name="clipboard-outline" size={16} color={Colors.primary} />
          <Text style={styles.secondaryBtnText}>Dán</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={() => handleInputChange(SAMPLE)}
        >
          <Ionicons name="sparkles-outline" size={16} color={Colors.primary} />
          <Text style={styles.secondaryBtnText}>Câu mẫu</Text>
        </TouchableOpacity>
        {input.trim().length > 0 && (
          <AudioButton
            audioId="furigana:input"
            text={input}
            size={15}
            label={VbeeUiText.readJapanese}
          />
        )}
        {input.length > 0 && (
          <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={() => {
              handleInputChange('');
            }}
          >
            <Ionicons name="close-circle-outline" size={16} color={Colors.textMuted} />
            <Text style={[styles.secondaryBtnText, { color: Colors.textMuted }]}>Xóa</Text>
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity
        style={[styles.primaryBtn, (loading || !input.trim()) && styles.btnDisabled]}
        onPress={() => void handleRender()}
        disabled={loading || !input.trim()}
      >
        {loading ? (
          <ActivityIndicator color={Colors.white} />
        ) : (
          <Text style={styles.primaryBtnText}>Hiển thị furigana</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.translateBtn, (translating || !input.trim()) && styles.btnDisabled]}
        onPress={() => void handleTranslate()}
        disabled={translating || !input.trim()}
      >
        {translating ? (
          <ActivityIndicator color={Colors.primary} />
        ) : (
          <Text style={styles.translateBtnText}>Dịch sang tiếng Việt</Text>
        )}
      </TouchableOpacity>

      {!translateConfigured && (
        <Text style={styles.hintText}>
          Phần dịch cần Anthropic API key (EXPO_PUBLIC_ANTHROPIC_API_KEY). Furigana vẫn
          dùng được bình thường.
        </Text>
      )}

      {translateError && (
        <View style={styles.errorBox}>
          <Ionicons name="alert-circle-outline" size={16} color={Colors.warning} />
          <Text style={styles.errorText}>{translateError}</Text>
        </View>
      )}

      {translation && (
        <View style={styles.translationBox}>
          <Text style={styles.resultLabel}>Bản dịch tiếng Việt</Text>
          <Text style={styles.translationText}>{translation}</Text>
          <View style={styles.translationActions}>
            <TouchableOpacity
              style={[styles.vbeeBtn, vbeeLoading && styles.btnDisabled]}
              onPress={() => void handleReadTranslation()}
              disabled={vbeeLoading}
            >
              {vbeeLoading ? (
                <ActivityIndicator color={Colors.primary} size="small" />
              ) : (
                <>
                  <Ionicons name="volume-high-outline" size={15} color={Colors.primary} />
                  <Text style={styles.vbeeBtnText}>{VbeeUiText.readTranslation}</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
          {!vbeeConfigured && (
            <Text style={styles.vbeeHint}>{VbeeUiText.configHint}</Text>
          )}
        </View>
      )}

      {vbeeError && (
        <View style={styles.errorBox}>
          <Ionicons name="alert-circle-outline" size={16} color={Colors.warning} />
          <Text style={styles.errorText}>{vbeeError}</Text>
        </View>
      )}

      {error && (
        <View style={styles.errorBox}>
          <Ionicons name="alert-circle-outline" size={16} color={Colors.warning} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {tokens && tokens.length > 0 && (
        <View style={styles.resultBox}>
          <Text style={styles.resultLabel}>Kết quả</Text>
          <Text style={styles.smartHint}>
            Bấm vào từ để tra nghĩa và dịch câu. Kết quả được lưu cache, bấm lại không tốn token.
          </Text>
          <RubyText
            tokens={tokens}
            selectedTokenIndex={selectedTokenIndex}
            onTokenPress={(token, index) => void handleTokenLookup(token, index)}
          />
        </View>
      )}
    </ScrollView>

      {lookupOpen && (
        <WordLookupSheet
          loading={wordLookupLoading}
          explanation={wordExplanation}
          error={wordLookupError}
          bottomInset={insets.bottom}
          onClose={resetSmartState}
        />
      )}
    </View>
  );
}

function WordLookupSheet({
  loading,
  explanation,
  error,
  bottomInset,
  onClose,
}: {
  loading: boolean;
  explanation: SmartWordExplanation | null;
  error: string | null;
  bottomInset: number;
  onClose: () => void;
}) {
  return (
    <View style={[styles.sheet, { paddingBottom: 14 + bottomInset }]}>
      <View style={styles.sheetHandle} />
      <View style={styles.sheetHeader}>
        <View style={styles.sheetTitleRow}>
          <Ionicons name="book-outline" size={16} color={Colors.primary} />
          <Text style={styles.sheetTitle}>{SmartUiText.lookupTitle}</Text>
        </View>
        <TouchableOpacity
          onPress={onClose}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="close" size={22} color={Colors.textMuted} />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.sheetBody}
        contentContainerStyle={styles.sheetBodyContent}
        showsVerticalScrollIndicator
      >
        {loading ? (
          <View style={styles.lookupLoadingRow}>
            <ActivityIndicator color={Colors.primary} size="small" />
            <Text style={styles.lookupLoadingText}>{SmartUiText.translating}</Text>
          </View>
        ) : error ? (
          <Text style={styles.smartErrorText}>{error}</Text>
        ) : explanation ? (
          <>
            <View style={styles.sheetWordRow}>
              <Text style={styles.lookupWord}>
                {explanation.surface}
                {explanation.reading ? ` (${explanation.reading})` : ''}
              </Text>
              <AudioButton
                audioId={`furigana:word:${explanation.surface}`}
                text={explanation.surface}
                size={15}
              />
            </View>
            <Text style={styles.lookupMetaLabel}>{SmartUiText.meaning}</Text>
            <Text style={styles.lookupText}>{explanation.meaning}</Text>
            <Text style={styles.lookupMetaLabel}>{SmartUiText.sentenceTranslation}</Text>
            <Text style={styles.lookupText}>{explanation.sentenceTranslation}</Text>
            {explanation.note ? (
              <>
                <Text style={styles.lookupMetaLabel}>{SmartUiText.note}</Text>
                <Text style={styles.lookupText}>{explanation.note}</Text>
              </>
            ) : null}
          </>
        ) : null}
      </ScrollView>
    </View>
  );
}

function RubyText({
  tokens,
  selectedTokenIndex,
  onTokenPress,
}: {
  tokens: FuriganaToken[];
  selectedTokenIndex: number | null;
  onTokenPress: (token: FuriganaToken, index: number) => void;
}) {
  return (
    <View style={styles.rubyWrap}>
      {tokens.map((t, i) => {
        // Force a line break so the rendered text keeps the original layout.
        if (t.surface === '\n' || t.surface.includes('\n')) {
          return <View key={i} style={styles.lineBreak} />;
        }
        const lookupable = isLookupableToken(t);
        const tokenStyle = [
          styles.rubyToken,
          lookupable && styles.rubyTokenTouchable,
          selectedTokenIndex === i && styles.rubyTokenSelected,
        ];
        if (lookupable) {
          return (
            <TouchableOpacity key={i} style={tokenStyle} onPress={() => onTokenPress(t, i)}>
              <Text style={styles.rubyReading} numberOfLines={1}>
                {t.reading ?? ' '}
              </Text>
              <Text style={styles.rubySurface}>{t.surface}</Text>
            </TouchableOpacity>
          );
        }
        return (
          <View key={i} style={tokenStyle}>
            <Text style={styles.rubyReading} numberOfLines={1}>
              {t.reading ?? ' '}
            </Text>
            <Text style={styles.rubySurface}>{t.surface}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 16, paddingBottom: 48 },
  // Extra room so the last lines can scroll above the floating lookup sheet.
  contentLookupOpen: { paddingBottom: 340 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  title: {
    fontSize: 22,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textPrimary,
  },
  subtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: 14,
  },
  warnBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: '#FEF3C7',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
  },
  warnText: { flex: 1, fontSize: 12, color: '#92400E', lineHeight: 18 },
  input: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: Colors.textPrimary,
    minHeight: 120,
    fontFamily: 'BeVietnamPro_400Regular',
  },
  actionRow: { flexDirection: 'row', gap: 8, marginTop: 10, flexWrap: 'wrap' },
  secondaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: Colors.accent,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  secondaryBtnText: {
    fontSize: 13,
    color: Colors.primary,
    fontFamily: 'BeVietnamPro_600SemiBold',
  },
  primaryBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 12,
  },
  btnDisabled: { opacity: 0.5 },
  primaryBtnText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
  },
  urlRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  urlInput: {
    flex: 1,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: Colors.textPrimary,
    fontFamily: 'BeVietnamPro_400Regular',
  },
  urlBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 72,
  },
  urlBtnText: {
    color: Colors.white,
    fontSize: 14,
    fontFamily: 'BeVietnamPro_700Bold',
  },
  translateBtn: {
    backgroundColor: Colors.accent,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  translateBtnText: {
    color: Colors.primary,
    fontSize: 15,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
  },
  hintText: {
    fontSize: 12,
    color: Colors.textMuted,
    lineHeight: 18,
    marginTop: 8,
  },
  translationBox: {
    backgroundColor: '#EEF7F1',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#CDEAD9',
    padding: 14,
    marginTop: 16,
  },
  translationText: {
    fontSize: 15,
    lineHeight: 23,
    color: Colors.textPrimary,
  },
  translationActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  vbeeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: '#CDEAD9',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minHeight: 36,
  },
  vbeeBtnText: {
    color: Colors.primary,
    fontSize: 13,
    fontFamily: 'BeVietnamPro_700Bold',
  },
  vbeeHint: {
    fontSize: 12,
    color: Colors.textMuted,
    lineHeight: 18,
    marginTop: 8,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: '#FEF2F2',
    borderRadius: 10,
    padding: 12,
    marginTop: 14,
  },
  errorText: { flex: 1, fontSize: 13, color: '#B91C1C', lineHeight: 19 },
  resultBox: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 14,
    marginTop: 16,
  },
  resultLabel: {
    fontSize: 12,
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  smartHint: {
    fontSize: 12,
    color: Colors.textMuted,
    lineHeight: 18,
    marginBottom: 10,
  },
  smartErrorText: {
    color: '#B91C1C',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 10,
  },
  wordLookupBox: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    padding: 12,
    marginTop: 14,
  },
  wordLookupTitle: {
    fontSize: 13,
    color: Colors.primary,
    fontFamily: 'BeVietnamPro_700Bold',
    marginBottom: 8,
  },
  lookupLoadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  lookupLoadingText: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  lookupMetaLabel: {
    fontSize: 11,
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 8,
    marginBottom: 3,
    fontFamily: 'BeVietnamPro_700Bold',
  },
  lookupWord: {
    fontSize: 18,
    lineHeight: 25,
    color: Colors.textPrimary,
    fontFamily: 'BeVietnamPro_700Bold',
  },
  lookupText: {
    fontSize: 14,
    lineHeight: 21,
    color: Colors.textPrimary,
  },
  rubyWrap: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-end' },
  rubyToken: { alignItems: 'center', marginBottom: 6 },
  rubyTokenTouchable: {
    borderRadius: 6,
    paddingHorizontal: 2,
  },
  rubyTokenSelected: {
    backgroundColor: '#E0F2FE',
  },
  rubyReading: {
    fontSize: 10,
    lineHeight: 13,
    color: Colors.primary,
  },
  rubySurface: {
    fontSize: 19,
    lineHeight: 26,
    color: Colors.textPrimary,
  },
  lineBreak: { width: '100%', height: 0 },
  // Floating word-lookup sheet pinned to the bottom of the screen.
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    maxHeight: '58%',
    backgroundColor: Colors.card,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    borderTopWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 16,
    paddingTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 16,
  },
  sheetHandle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.border,
    marginBottom: 8,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  sheetTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  sheetTitle: {
    fontSize: 15,
    color: Colors.primary,
    fontFamily: 'BeVietnamPro_700Bold',
  },
  sheetBody: { flexGrow: 0 },
  sheetBodyContent: { paddingBottom: 6 },
  sheetWordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 2,
  },
});
