// Furigana reader — paste Japanese (e.g. a news article), tap render, and
// read it with hiragana shown above each kanji. Experimental; reached from
// the Lab, and from Home when the `furiganaReader` flag is on.

import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  NativeSyntheticEvent,
  NativeScrollEvent,
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
import {
  translateJapaneseSentencesToVietnamese,
  isTranslateConfigured,
  type VietnameseSentenceTranslation,
} from '../services/translate';
import { isVbeeConfigured, synthesizeVbeeSpeech } from '../services/vbeeTts';
import type { VbeeSpeechResult } from '../services/vbeeTts';
import {
  SmartWordExplanation,
  explainJapaneseSelection,
  getSentenceAtOffset,
  explainJapaneseSentenceForStudy,
  type SmartSentenceStudyExplanation,
} from '../services/smartTranslation';
import {
  clearFuriganaReaderSession,
  loadFuriganaReaderSession,
  saveFuriganaReaderSession,
} from '../services/furiganaSession';

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

const ReaderUiText = {
  title: '\u0110\u1ecdc b\u00e1o ti\u1ebfng Nh\u1eadt',
  subtitle:
    'D\u00e1n link ho\u1eb7c v\u0103n b\u1ea3n ti\u1ebfng Nh\u1eadt, xem furigana, tra t\u1eeb v\u00e0 nghe b\u1ea3n d\u1ecbch.',
  urlPlaceholder: 'D\u00e1n link b\u00e0i b\u00e1o (https://...)',
  fetchArticle: 'L\u1ea5y b\u00e0i',
  inputPlaceholder: 'D\u00e1n v\u0103n b\u1ea3n ti\u1ebfng Nh\u1eadt \u1edf \u0111\u00e2y...',
  paste: 'D\u00e1n',
  sample: 'C\u00e2u m\u1eabu',
  clear: 'X\u00f3a',
  render: 'Hi\u1ec3n th\u1ecb furigana',
  translate: 'D\u1ecbch sang ti\u1ebfng Vi\u1ec7t',
  translationLabel: 'B\u1ea3n d\u1ecbch t\u1eebng c\u00e2u',
  resultLabel: 'K\u1ebft qu\u1ea3',
  tokenUnit: 't\u1eeb',
  sentenceUnit: 'c\u00e2u',
  smartHint:
    'B\u1ea5m t\u1eeb \u0111\u1ec3 tra ngh\u0129a + d\u1ecbch c\u00e2u. C\u00f3 cache, b\u1ea5m l\u1ea1i kh\u00f4ng t\u1ed1n token.',
  yahooMissing:
    'Ch\u01b0a c\u00f3 Yahoo AppID. Th\u00eam EXPO_PUBLIC_YAHOO_APPID v\u00e0o .env r\u1ed3i kh\u1edfi \u0111\u1ed9ng l\u1ea1i app.',
  translateMissing:
    'Ph\u1ea7n d\u1ecbch c\u1ea7n Anthropic API key (EXPO_PUBLIC_ANTHROPIC_API_KEY). Furigana v\u1eabn d\u00f9ng \u0111\u01b0\u1ee3c b\u00ecnh th\u01b0\u1eddng.',
  translateErrorPrefix: 'Kh\u00f4ng d\u1ecbch \u0111\u01b0\u1ee3c',
  furiganaErrorPrefix: 'Kh\u00f4ng l\u1ea5y \u0111\u01b0\u1ee3c furigana',
  jumpTop: 'L\u00ean \u0111\u1ea7u b\u00e0i',
  jumpBottom: 'Xu\u1ed1ng cu\u1ed1i b\u00e0i',
};

type PreparedVbeeAudio = VbeeSpeechResult & { text: string };

function getTokenText(tokens: FuriganaToken[]): string {
  return tokens.map((token) => token.surface).join('');
}

function getTokenOffset(tokens: FuriganaToken[], index: number): number {
  return tokens.slice(0, index).reduce((sum, token) => sum + token.surface.length, 0);
}

function isLookupableToken(token: FuriganaToken): boolean {
  return token.surface.trim().length > 0 && /[A-Za-z0-9\u3040-\u30ff\u3400-\u9fff\uff66-\uff9f]/.test(token.surface);
}

function getTranslateErrorMessage(message: string): string {
  return message === 'not-configured'
    ? SmartUiText.notConfigured
    : `${ReaderUiText.translateErrorPrefix}: ${message}`;
}

function getFuriganaErrorMessage(message: string): string {
  // fetchFurigana no longer throws 'not-configured' (it falls back to plain
  // text without readings), so this only handles unexpected failures.
  return `${ReaderUiText.furiganaErrorPrefix}: ${message}`;
}

function getVbeeReadErrorMessage(message: string): string {
  return message === 'not-configured'
    ? VbeeUiText.notConfigured
    : message === 'empty-text'
    ? VbeeUiText.emptyTranslation
    : `${VbeeUiText.readErrorPrefix}: ${message}`;
}

export default function FuriganaScreen() {
  const [input, setInput] = useState('');
  const [tokens, setTokens] = useState<FuriganaToken[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [url, setUrl] = useState('');
  const [fetchingArticle, setFetchingArticle] = useState(false);

  const [translationLines, setTranslationLines] = useState<VietnameseSentenceTranslation[] | null>(
    null
  );
  const [showVietnameseTranslation, setShowVietnameseTranslation] = useState(true);
  const [translating, setTranslating] = useState(false);
  const [translateError, setTranslateError] = useState<string | null>(null);
  const [vbeeLoading, setVbeeLoading] = useState(false);
  const [vbeePreparing, setVbeePreparing] = useState(false);
  const [vbeeError, setVbeeError] = useState<string | null>(null);
  const [vbeeAudio, setVbeeAudio] = useState<PreparedVbeeAudio | null>(null);
  const [selectedTokenIndex, setSelectedTokenIndex] = useState<number | null>(null);
  const [wordExplanation, setWordExplanation] = useState<SmartWordExplanation | null>(null);
  const [wordLookupLoading, setWordLookupLoading] = useState(false);
  const [wordLookupError, setWordLookupError] = useState<string | null>(null);
  const [expandedStudyIndex, setExpandedStudyIndex] = useState<number | null>(null);
  const [studyLoadingIndex, setStudyLoadingIndex] = useState<number | null>(null);
  const [studyExplanationByIndex, setStudyExplanationByIndex] = useState<
    Record<number, SmartSentenceStudyExplanation | undefined>
  >({});
  const [studyErrorByIndex, setStudyErrorByIndex] = useState<Record<number, string | undefined>>({});

  const configured = isFuriganaConfigured();
  const translateConfigured = isTranslateConfigured();
  const vbeeConfigured = isVbeeConfigured();
  const vbeePlayer = useAudioPlayer(null, { updateInterval: 1000 });
  const insets = useSafeAreaInsets();
  const lookupOpen = selectedTokenIndex !== null;
  const selectedToken =
    tokens && selectedTokenIndex !== null ? tokens[selectedTokenIndex] : null;

  const scrollRef = useRef<ScrollView>(null);
  const vbeePrepareToken = useRef(0);
  const [scrollY, setScrollY] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [sessionHydrating, setSessionHydrating] = useState(true);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setScrollY(e.nativeEvent.contentOffset.y);
  };

  const scrollToTop = () => scrollRef.current?.scrollTo({ y: 0, animated: true });
  const scrollToBottom = () => scrollRef.current?.scrollToEnd({ animated: true });

  // Show the jump buttons only when there's a rendered article worth scrolling,
  // and hide them while the lookup sheet covers the bottom of the screen.
  const distanceToBottom = contentHeight - scrollY - viewportHeight;
  const showScrollFabs = !!tokens && tokens.length > 0 && !lookupOpen;
  const [showJumpTopFab, setShowJumpTopFab] = useState(false);
  const [showJumpBottomFab, setShowJumpBottomFab] = useState(false);

  useEffect(() => {
    if (!showScrollFabs) {
      setShowJumpTopFab(false);
      setShowJumpBottomFab(false);
      return;
    }

    setShowJumpTopFab((prev) => (prev ? scrollY > 220 : scrollY > 320));
    setShowJumpBottomFab((prev) => (prev ? distanceToBottom > 220 : distanceToBottom > 320));
  }, [distanceToBottom, scrollY, showScrollFabs]);

  useEffect(() => {
    void setAudioModeAsync({
      playsInSilentMode: true,
      interruptionMode: 'duckOthers',
    }).catch(() => undefined);
  }, []);

  useEffect(() => {
    let alive = true;
    void (async () => {
      const session = await loadFuriganaReaderSession();
      if (!alive) return;
      if (session) {
        setInput(session.input);
        setTokens(session.tokens.length > 0 ? session.tokens : null);
        setTranslationLines(session.translationLines.length > 0 ? session.translationLines : null);
      }
      setSessionHydrating(false);
    })();

    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (sessionHydrating) return;
    if (!input.trim()) {
      void clearFuriganaReaderSession();
      return;
    }

    // Debounce so typing doesn't write to AsyncStorage on every keystroke.
    const timer = setTimeout(() => {
      void saveFuriganaReaderSession({
        input,
        tokens: tokens ?? [],
        translationLines: translationLines ?? [],
        savedAt: Date.now(),
      });
    }, 600);

    return () => clearTimeout(timer);
  }, [input, sessionHydrating, tokens, translationLines]);

  const resetSmartState = () => {
    setSelectedTokenIndex(null);
    setWordExplanation(null);
    setWordLookupLoading(false);
    setWordLookupError(null);
  };

  const resetVbeeAudio = () => {
    vbeePrepareToken.current += 1;
    setVbeeAudio(null);
    setVbeePreparing(false);
    setVbeeLoading(false);
    setVbeeError(null);
  };

  const handleInputChange = (text: string) => {
    setInput(text);
    setTokens(null);
    setError(null);
    setTranslationLines(null);
    setShowVietnameseTranslation(true);
    setTranslateError(null);
    resetVbeeAudio();
    resetSmartState();
    setExpandedStudyIndex(null);
    setStudyLoadingIndex(null);
    setStudyExplanationByIndex({});
    setStudyErrorByIndex({});
    setVbeeError(null);
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

  const playPreparedVbeeAudio = () => {
    void vbeePlayer
      .seekTo(0)
      .catch(() => undefined)
      .finally(() => vbeePlayer.play());
  };

  const prepareVbeeTranslationAudio = async (
    text: string,
    { showError = false }: { showError?: boolean } = {}
  ): Promise<PreparedVbeeAudio | null> => {
    const normalized = text.trim();
    if (!normalized) {
      throw new Error('empty-text');
    }
    if (vbeeAudio?.text === normalized) {
      return vbeeAudio;
    }

    const token = ++vbeePrepareToken.current;
    setVbeePreparing(true);
    try {
      const result = await synthesizeVbeeSpeech(normalized);
      if (token !== vbeePrepareToken.current) return null;

      const prepared = { ...result, text: normalized };
      setVbeeAudio(prepared);
      vbeePlayer.replace({ uri: result.audioUrl });
      return prepared;
    } catch (e) {
      if (token === vbeePrepareToken.current && showError) {
        const msg = e instanceof Error ? e.message : String(e);
        setVbeeError(getVbeeReadErrorMessage(msg));
      }
      throw e;
    } finally {
      if (token === vbeePrepareToken.current) {
        setVbeePreparing(false);
      }
    }
  };

  const handleTranslate = async () => {
    setTranslateError(null);
    resetVbeeAudio();
    setTranslationLines(null);
    setShowVietnameseTranslation(true);
    setExpandedStudyIndex(null);
    setStudyLoadingIndex(null);
    setStudyExplanationByIndex({});
    setStudyErrorByIndex({});
    setTranslating(true);
    try {
      const result = await translateJapaneseSentencesToVietnamese(input);
      setTranslationLines(result);
      if (vbeeConfigured) {
        const translatedText = result.map((line) => line.translation).join('\n').trim();
        if (translatedText) {
          void prepareVbeeTranslationAudio(translatedText).catch(() => undefined);
        }
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setTranslateError(getTranslateErrorMessage(msg));
    } finally {
      setTranslating(false);
    }
  };

  const handleReadTranslation = async () => {
    const audioText = translationLines?.map((line) => line.translation).join('\n').trim();
    if (!audioText) return;
    if (vbeeAudio?.text === audioText) {
      playPreparedVbeeAudio();
      return;
    }

    setVbeeError(null);
    setVbeeLoading(true);
    try {
      const result = await prepareVbeeTranslationAudio(audioText, { showError: true });
      if (result) {
        playPreparedVbeeAudio();
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setVbeeError(getVbeeReadErrorMessage(msg));
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

  const handleStudySentence = async (index: number) => {
    const line = translationLines?.[index];
    if (!line) return;
    setStudyErrorByIndex((prev) => ({ ...prev, [index]: undefined }));
    setExpandedStudyIndex(index);
    if (studyExplanationByIndex[index]) return;

    setStudyLoadingIndex(index);
    try {
      const result = await explainJapaneseSentenceForStudy(line);
      setStudyExplanationByIndex((prev) => ({ ...prev, [index]: result }));
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setStudyErrorByIndex((prev) => ({
        ...prev,
        [index]:
          msg === 'not-configured'
            ? SmartUiText.notConfigured
            : `${SmartUiText.lookupErrorPrefix}: ${msg}`,
      }));
    } finally {
      setStudyLoadingIndex((prev) => (prev === index ? null : prev));
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
      setError(getFuriganaErrorMessage(msg));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.screen}>
    <ScrollView
      ref={scrollRef}
      style={styles.container}
      contentContainerStyle={[styles.content, lookupOpen && styles.contentLookupOpen]}
      keyboardShouldPersistTaps="handled"
      onScroll={handleScroll}
      scrollEventThrottle={32}
      onLayout={(e) => setViewportHeight(e.nativeEvent.layout.height)}
      onContentSizeChange={(_w, h) => setContentHeight(h)}
    >
      <View style={styles.header}>
        <Ionicons name="newspaper-outline" size={21} color={Colors.primary} />
        <Text style={styles.title}>{ReaderUiText.title}</Text>
      </View>
      {!tokens && <Text style={styles.subtitle}>{ReaderUiText.subtitle}</Text>}

      <View style={styles.urlRow}>
        <TextInput
          style={styles.urlInput}
          placeholder={ReaderUiText.urlPlaceholder}
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
            <Text style={styles.urlBtnText}>{ReaderUiText.fetchArticle}</Text>
          )}
        </TouchableOpacity>
      </View>

      {!configured && (
        <View style={styles.warnBox}>
          <Ionicons name="warning-outline" size={16} color={Colors.warning} />
          <Text style={styles.warnText}>{ReaderUiText.yahooMissing}</Text>
        </View>
      )}

      <TextInput
        style={[styles.input, tokens && styles.inputCompact]}
        placeholder={ReaderUiText.inputPlaceholder}
        placeholderTextColor={Colors.textMuted}
        multiline
        value={input}
        onChangeText={handleInputChange}
        textAlignVertical="top"
      />

      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.secondaryBtn} onPress={() => void handlePaste()}>
          <Ionicons name="clipboard-outline" size={16} color={Colors.primary} />
          <Text style={styles.secondaryBtnText}>{ReaderUiText.paste}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={() => handleInputChange(SAMPLE)}
        >
          <Ionicons name="sparkles-outline" size={16} color={Colors.primary} />
          <Text style={styles.secondaryBtnText}>{ReaderUiText.sample}</Text>
        </TouchableOpacity>
        {input.length > 0 && (
          <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={() => {
              handleInputChange('');
            }}
          >
            <Ionicons name="close-circle-outline" size={16} color={Colors.textMuted} />
            <Text style={[styles.secondaryBtnText, { color: Colors.textMuted }]}>
              {ReaderUiText.clear}
            </Text>
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
          <>
            <Ionicons name="sparkles" size={16} color={Colors.white} />
            <Text style={styles.primaryBtnText}>{ReaderUiText.render}</Text>
          </>
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
          <>
            <Ionicons name="language" size={16} color={Colors.primary} />
            <Text style={styles.translateBtnText}>{ReaderUiText.translate}</Text>
          </>
        )}
      </TouchableOpacity>

      {!translateConfigured && (
        <Text style={styles.hintText}>{ReaderUiText.translateMissing}</Text>
      )}

      {translateError && (
        <View style={styles.errorBox}>
          <Ionicons name="alert-circle-outline" size={16} color={Colors.warning} />
          <Text style={styles.errorText}>{translateError}</Text>
        </View>
      )}

      {translationLines && translationLines.length > 0 && (
        <View style={styles.translationBox}>
          <View style={styles.translationHeaderRow}>
            <View style={styles.resultHeaderRow}>
              <Text style={[styles.resultLabel, styles.resultLabelInline]}>
                {ReaderUiText.translationLabel}
              </Text>
              <Text style={styles.resultMeta}>
                {translationLines.length} {ReaderUiText.sentenceUnit}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.toggleBtn}
              onPress={() => setShowVietnameseTranslation((prev) => !prev)}
            >
              <Ionicons
                name={showVietnameseTranslation ? 'eye-off-outline' : 'eye-outline'}
                size={15}
                color={Colors.primary}
              />
              <Text style={styles.toggleBtnText}>
                {showVietnameseTranslation ? 'Ẩn tiếng Việt' : 'Hiện tiếng Việt'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.translationActions}>
            <TouchableOpacity
              style={[styles.vbeeBtn, (vbeeLoading || vbeePreparing) && styles.btnDisabled]}
              onPress={() => void handleReadTranslation()}
              disabled={vbeeLoading || vbeePreparing}
            >
              {vbeeLoading || vbeePreparing ? (
                <ActivityIndicator color={Colors.primary} size="small" />
              ) : (
                <>
                  <Ionicons name="volume-high-outline" size={15} color={Colors.primary} />
                  <Text style={styles.vbeeBtnText}>{VbeeUiText.readTranslation}</Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.translationList}>
            {translationLines.map((line, index) => {
              const explanation = studyExplanationByIndex[index] ?? null;
              const studyError = studyErrorByIndex[index] ?? null;
              const isExpanded = expandedStudyIndex === index;
              const isLoading = studyLoadingIndex === index;
              return (
                <View key={`${line.source}-${index}`} style={styles.translationCard}>
                  <Text style={styles.translationSentenceSource}>{line.source}</Text>
                  {showVietnameseTranslation ? (
                    <Text style={styles.translationSentenceTarget}>{line.translation}</Text>
                  ) : (
                    <View style={styles.translationHiddenRow}>
                      <Text style={styles.translationHiddenText}>Bản dịch đang ẩn</Text>
                    </View>
                  )}
                  <View style={styles.translationCardActions}>
                    <TouchableOpacity
                      style={[
                        styles.studyBtn,
                        (isLoading || isExpanded) && styles.studyBtnActive,
                      ]}
                      onPress={() => void handleStudySentence(index)}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <ActivityIndicator color={Colors.primary} size="small" />
                      ) : (
                        <>
                          <Ionicons name="school-outline" size={15} color={Colors.primary} />
                          <Text style={styles.studyBtnText}>Giải thích</Text>
                        </>
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.minorBtn}
                      onPress={() =>
                        setExpandedStudyIndex((prev) => (prev === index ? null : index))
                      }
                    >
                      <Ionicons
                        name={isExpanded ? 'chevron-up-outline' : 'chevron-down-outline'}
                        size={15}
                        color={Colors.textSecondary}
                      />
                      <Text style={styles.minorBtnText}>
                        {isExpanded ? 'Thu gọn' : 'Mở rộng'}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {isExpanded && (
                    <SentenceStudyCard
                      explanation={explanation}
                      loading={isLoading}
                      error={studyError}
                    />
                  )}
                </View>
              );
            })}
          </View>

          {!vbeeConfigured && <Text style={styles.vbeeHint}>{VbeeUiText.configHint}</Text>}
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
          <View style={styles.resultHeaderRow}>
            <Text style={[styles.resultLabel, styles.resultLabelInline]}>{ReaderUiText.resultLabel}</Text>
            <Text style={styles.resultMeta}>
              {tokens.filter(isLookupableToken).length} {ReaderUiText.tokenUnit}
            </Text>
          </View>
          <Text style={styles.smartHint}>{ReaderUiText.smartHint}</Text>
          <RubyText
            tokens={tokens}
            selectedTokenIndex={selectedTokenIndex}
            onTokenPress={(token, index) => void handleTokenLookup(token, index)}
          />
        </View>
      )}

      {input.trim().length > 0 && (
        <View style={styles.readRow}>
          <AudioButton
            audioId="furigana:input"
            text={input}
            size={15}
            label={VbeeUiText.readJapanese}
          />
        </View>
      )}
    </ScrollView>

      {(showJumpTopFab || showJumpBottomFab) && (
        <View style={[styles.fabColumn, { bottom: 20 + insets.bottom }]}>
          {showJumpTopFab && (
            <TouchableOpacity
              style={styles.fab}
              onPress={scrollToTop}
              activeOpacity={0.85}
              accessibilityLabel={ReaderUiText.jumpTop}
            >
              <Ionicons name="arrow-up" size={20} color={Colors.white} />
            </TouchableOpacity>
          )}
          {showJumpBottomFab && (
            <TouchableOpacity
              style={styles.fab}
              onPress={scrollToBottom}
              activeOpacity={0.85}
              accessibilityLabel={ReaderUiText.jumpBottom}
            >
              <Ionicons name="arrow-down" size={20} color={Colors.white} />
            </TouchableOpacity>
          )}
        </View>
      )}

      {lookupOpen && (
        <WordLookupSheet
          surface={selectedToken?.surface ?? wordExplanation?.surface ?? null}
          reading={selectedToken?.reading ?? wordExplanation?.reading ?? null}
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
  surface,
  reading,
  loading,
  explanation,
  error,
  bottomInset,
  onClose,
}: {
  surface: string | null;
  reading: string | null;
  loading: boolean;
  explanation: SmartWordExplanation | null;
  error: string | null;
  bottomInset: number;
  onClose: () => void;
}) {
  // Prefer the explanation's own surface/reading once it arrives, else the
  // tapped token — so the word shows immediately while the meaning loads.
  const word = explanation?.surface ?? surface;
  const wordReading = explanation?.reading ?? reading;

  return (
    <View style={[styles.sheet, { paddingBottom: 10 + bottomInset }]}>
      <View style={styles.sheetHandle} />
      <View style={styles.sheetHeader}>
        <View style={styles.sheetTitleRow}>
          <Ionicons name="book-outline" size={15} color={Colors.primary} />
          <Text style={styles.sheetTitle}>{SmartUiText.lookupTitle}</Text>
        </View>
        <TouchableOpacity
          onPress={onClose}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="close" size={20} color={Colors.textMuted} />
        </TouchableOpacity>
      </View>

      {/* Word is shown right away (even while the meaning is still loading). */}
      {word ? (
        <View style={styles.sheetWordRow}>
          <Text style={styles.lookupWord}>
            {word}
            {wordReading ? ` (${wordReading})` : ''}
          </Text>
          <AudioButton audioId={`furigana:word:${word}`} text={word} size={15} />
        </View>
      ) : null}

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

function SentenceStudyCard({
  explanation,
  loading,
  error,
}: {
  explanation: SmartSentenceStudyExplanation | null;
  loading: boolean;
  error: string | null;
}) {
  return (
    <View style={styles.studyPanel}>
      <View style={styles.studyPanelHeader}>
        <Ionicons name="bulb-outline" size={15} color={Colors.primary} />
        <Text style={styles.studyPanelTitle}>Giải thích học nhanh</Text>
      </View>

      {loading ? (
        <View style={styles.lookupLoadingRow}>
          <ActivityIndicator color={Colors.primary} size="small" />
          <Text style={styles.lookupLoadingText}>Đang tạo giải thích...</Text>
        </View>
      ) : error ? (
        <Text style={styles.smartErrorText}>{error}</Text>
      ) : explanation ? (
        <View style={styles.studySections}>
          <View style={styles.studySummaryBox}>
            <Text style={styles.studySummaryText}>{explanation.summary}</Text>
          </View>

          <View style={styles.studySection}>
            <Text style={styles.studySectionLabel}>Ngữ pháp</Text>
            <Text style={styles.studySectionText}>{explanation.grammarNote}</Text>
          </View>

          {explanation.learningTip ? (
            <View style={styles.studySection}>
              <Text style={styles.studySectionLabel}>Mẹo học</Text>
              <Text style={styles.studySectionText}>{explanation.learningTip}</Text>
            </View>
          ) : null}

          {explanation.vocabulary.length > 0 ? (
            <View style={styles.studySection}>
              <Text style={styles.studySectionLabel}>Từ khóa</Text>
              <View style={styles.vocabWrap}>
                {explanation.vocabulary.map((item, index) => (
                  <View key={`${item.surface}-${index}`} style={styles.vocabChip}>
                    <Text style={styles.vocabChipWord}>
                      {item.surface}
                      {item.reading ? ` (${item.reading})` : ''}
                    </Text>
                    <Text style={styles.vocabChipMeaning}>{item.meaning}</Text>
                  </View>
                ))}
              </View>
            </View>
          ) : null}
        </View>
      ) : (
        <Text style={styles.studyEmptyText}>Chưa có nội dung giải thích.</Text>
      )}
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
  content: { padding: 12, paddingBottom: 36 },
  // Extra room so the last lines can scroll above the floating lookup sheet.
  contentLookupOpen: { paddingBottom: 280 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 7, marginBottom: 6 },
  title: {
    fontSize: 19,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textPrimary,
  },
  subtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 17,
    marginBottom: 10,
  },
  warnBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: '#FEF3C7',
    borderRadius: 10,
    padding: 9,
    marginBottom: 10,
  },
  warnText: { flex: 1, fontSize: 11, color: '#92400E', lineHeight: 16 },
  input: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    padding: 11,
    fontSize: 14,
    color: Colors.textPrimary,
    minHeight: 96,
    fontFamily: 'BeVietnamPro_400Regular',
  },
  inputCompact: {
    minHeight: 54,
    maxHeight: 72,
  },
  actionRow: { flexDirection: 'row', gap: 7, marginTop: 8, flexWrap: 'wrap' },
  secondaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: Colors.accent,
    borderRadius: 8,
    paddingVertical: 7,
    paddingHorizontal: 10,
  },
  secondaryBtnText: {
    fontSize: 12,
    color: Colors.primary,
    fontFamily: 'BeVietnamPro_600SemiBold',
  },
  primaryBtn: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor: Colors.primary,
    borderRadius: 9,
    paddingVertical: 11,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  btnDisabled: { opacity: 0.5 },
  primaryBtnText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
  },
  urlRow: { flexDirection: 'row', gap: 7, marginBottom: 10 },
  urlInput: {
    flex: 1,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 9,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 13,
    color: Colors.textPrimary,
    fontFamily: 'BeVietnamPro_400Regular',
  },
  urlBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 9,
    paddingHorizontal: 13,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 64,
  },
  urlBtnText: {
    color: Colors.white,
    fontSize: 13,
    fontFamily: 'BeVietnamPro_700Bold',
  },
  translateBtn: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor: Colors.accent,
    borderRadius: 9,
    paddingVertical: 11,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  translateBtnText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
  },
  hintText: {
    fontSize: 11,
    color: Colors.textMuted,
    lineHeight: 16,
    marginTop: 7,
  },
  translationBox: {
    backgroundColor: Colors.card,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 12,
    marginTop: 12,
  },
  translationHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 8,
  },
  toggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: Colors.accent,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  toggleBtnText: {
    color: Colors.primary,
    fontSize: 12,
    fontFamily: 'BeVietnamPro_700Bold',
  },
  translationActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  translationList: {
    marginTop: 10,
    gap: 10,
  },
  translationCard: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  translationSentenceSource: {
    fontSize: 16,
    lineHeight: 25,
    color: Colors.textPrimary,
    fontFamily: 'BeVietnamPro_700Bold',
  },
  translationSentenceTarget: {
    fontSize: 14,
    lineHeight: 22,
    color: '#334155',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#EEF2F6',
  },
  translationHiddenRow: {
    marginTop: 6,
    backgroundColor: '#E0F2FE',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },
  translationHiddenText: {
    fontSize: 12,
    color: Colors.primary,
    fontFamily: 'BeVietnamPro_600SemiBold',
  },
  translationCardActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
    flexWrap: 'wrap',
  },
  studyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: '#CDEAD9',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 7,
    minHeight: 34,
  },
  studyBtnActive: {
    borderColor: Colors.primary,
    backgroundColor: '#EFF6FF',
  },
  studyBtnText: {
    color: Colors.primary,
    fontSize: 12,
    fontFamily: 'BeVietnamPro_700Bold',
  },
  minorBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  minorBtnText: {
    color: Colors.textSecondary,
    fontSize: 12,
    fontFamily: 'BeVietnamPro_600SemiBold',
  },
  studyPanel: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#FAFAFE',
    borderWidth: 1,
    borderColor: '#E7E5F4',
    borderRadius: 12,
  },
  studyPanelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  studyPanelTitle: {
    fontSize: 13,
    color: Colors.primary,
    fontFamily: 'BeVietnamPro_700Bold',
  },
  studySections: {
    gap: 12,
  },
  studySummaryBox: {
    backgroundColor: '#E0F2FE',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  studySummaryText: {
    fontSize: 14,
    lineHeight: 21,
    color: '#0C4A6E',
    fontFamily: 'BeVietnamPro_600SemiBold',
  },
  studySection: {
    gap: 5,
  },
  studySectionLabel: {
    fontSize: 11,
    color: Colors.primary,
    letterSpacing: 0.3,
    fontFamily: 'BeVietnamPro_700Bold',
  },
  studySectionText: {
    fontSize: 13,
    lineHeight: 19,
    color: Colors.textPrimary,
  },
  studySectionTextMuted: {
    fontSize: 13,
    lineHeight: 19,
    color: Colors.textSecondary,
  },
  vocabWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7,
  },
  vocabChip: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: '#DDD6FE',
    borderRadius: 9,
    paddingHorizontal: 10,
    paddingVertical: 8,
    maxWidth: '100%',
  },
  vocabChipWord: {
    fontSize: 13,
    color: Colors.primary,
    fontFamily: 'BeVietnamPro_700Bold',
  },
  vocabChipMeaning: {
    fontSize: 12,
    lineHeight: 17,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  studyEmptyText: {
    fontSize: 12,
    lineHeight: 17,
    color: Colors.textMuted,
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
    paddingHorizontal: 10,
    paddingVertical: 7,
    minHeight: 34,
  },
  vbeeBtnText: {
    color: Colors.primary,
    fontSize: 12,
    fontFamily: 'BeVietnamPro_700Bold',
  },
  vbeeHint: {
    fontSize: 11,
    color: Colors.textMuted,
    lineHeight: 16,
    marginTop: 7,
  },
  readRow: {
    marginTop: 12,
    alignItems: 'flex-start',
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: '#FEF2F2',
    borderRadius: 9,
    padding: 10,
    marginTop: 11,
  },
  errorText: { flex: 1, fontSize: 12, color: '#B91C1C', lineHeight: 17 },
  resultBox: {
    backgroundColor: Colors.card,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 12,
    marginTop: 12,
  },
  resultLabel: {
    fontSize: 11,
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
    marginBottom: 8,
  },
  resultHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 6,
  },
  resultMeta: {
    fontSize: 11,
    color: Colors.textMuted,
    fontFamily: 'BeVietnamPro_600SemiBold',
  },
  resultLabelInline: { marginBottom: 0 },
  smartHint: {
    fontSize: 11,
    color: Colors.textMuted,
    lineHeight: 16,
    marginBottom: 8,
  },
  smartErrorText: {
    color: '#B91C1C',
    fontSize: 12,
    lineHeight: 17,
    marginTop: 8,
  },
  wordLookupBox: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 9,
    padding: 10,
    marginTop: 11,
  },
  wordLookupTitle: {
    fontSize: 12,
    color: Colors.primary,
    fontFamily: 'BeVietnamPro_700Bold',
    marginBottom: 6,
  },
  lookupLoadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  lookupLoadingText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  lookupMetaLabel: {
    fontSize: 11,
    color: Colors.primary,
    letterSpacing: 0.3,
    marginTop: 10,
    marginBottom: 3,
    fontFamily: 'BeVietnamPro_700Bold',
  },
  lookupWord: {
    fontSize: 18,
    lineHeight: 25,
    color: Colors.textPrimary,
    fontFamily: 'BeVietnamPro_800ExtraBold',
  },
  lookupText: {
    fontSize: 14,
    lineHeight: 21,
    color: '#334155',
  },
  rubyWrap: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-end' },
  rubyToken: { alignItems: 'center', marginBottom: 4 },
  rubyTokenTouchable: {
    borderRadius: 5,
    paddingHorizontal: 2,
  },
  rubyTokenSelected: {
    backgroundColor: '#E0F2FE',
  },
  rubyReading: {
    fontSize: 9,
    lineHeight: 11,
    color: Colors.primary,
  },
  rubySurface: {
    fontSize: 17,
    lineHeight: 23,
    color: Colors.textPrimary,
  },
  lineBreak: { width: '100%', height: 0 },
  // Floating word-lookup sheet pinned to the bottom of the screen.
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    maxHeight: '50%',
    backgroundColor: Colors.card,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    borderTopWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 12,
    paddingTop: 7,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 16,
  },
  sheetHandle: {
    alignSelf: 'center',
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.border,
    marginBottom: 6,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  sheetTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  sheetTitle: {
    fontSize: 13,
    color: Colors.primary,
    fontFamily: 'BeVietnamPro_700Bold',
  },
  sheetBody: { flexGrow: 0 },
  sheetBodyContent: { paddingBottom: 4 },
  sheetWordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 0,
  },
  fabColumn: {
    position: 'absolute',
    right: 12,
    gap: 8,
    alignItems: 'center',
  },
  fab: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
  },
});
