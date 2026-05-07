import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
  Modal,
  Pressable,
  Alert,
  LayoutChangeEvent,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';

import { Colors } from '../constants/colors';
import { SAMPLE_STORIES } from '../constants/content/sampleStories';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Story, StoryProgress, Token, Paragraph } from '../types/story';
import { getStoryProgress, saveStoryProgress, isStoryBookmarked, addStoryBookmark, removeStoryBookmark, updateReadingPosition, addWordBookmark, markStoryCompleted, LOCAL_USER_ID } from '../utils/storyProgress';
import { stopJapaneseAudio, playJapaneseSequence } from '../utils/audio';
import { markStoryReadToday } from '../utils/storyStreak';
import AudioButton from '../components/AudioButton';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Props {
  navigation: NavigationProp;
  route: { params: { storyId: string } };
}

export default function StoryReadingScreen({ navigation, route }: Props) {
  const { storyId } = route.params;
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const [story, setStory] = useState<Story | null>(null);
  const [progress, setProgress] = useState<StoryProgress | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [selectedWord, setSelectedWord] = useState<Token | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [hasMarkedStoryReadToday, setHasMarkedStoryReadToday] = useState(false);
  const [revealedTranslations, setRevealedTranslations] = useState<Set<string>>(new Set());
  const [justSaved, setJustSaved] = useState(false);
  const [currentParagraphIdx, setCurrentParagraphIdx] = useState(0);
  const [resumeOffer, setResumeOffer] = useState<{ paragraphIdx: number } | null>(null);
  // Track last 5%-bucket written to AsyncStorage to avoid hammering on every scroll event
  const lastWrittenBucketRef = useRef<number>(-1);
  // Pixel y-offset of each paragraph inside the ScrollView, captured via onLayout.
  const paragraphLayoutsRef = useRef<Record<number, number>>({});
  const scrollViewRef = useRef<ScrollView>(null);
  const justSavedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const foundStory = SAMPLE_STORIES.find((s) => s.id === storyId);
    setStory(foundStory || null);
    setHasMarkedStoryReadToday(false);
    setRevealedTranslations(new Set());
    setCurrentParagraphIdx(0);
    setResumeOffer(null);
    paragraphLayoutsRef.current = {};
    lastWrittenBucketRef.current = -1;
  }, [storyId]);

  useEffect(() => {
    return () => {
      if (justSavedTimerRef.current) clearTimeout(justSavedTimerRef.current);
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        if (story) {
          let progressData = await getStoryProgress(story.id);

          // Initialize progress if doesn't exist
          if (!progressData) {
            progressData = {
              storyId: story.id,
              userId: LOCAL_USER_ID,
              currentParagraphIndex: 0,
              percentRead: 0,
              isCompleted: false,
              lastReadAt: new Date().toISOString(),
            };
            await saveStoryProgress(story.id, progressData);
          }

          setProgress(progressData);
          setCurrentParagraphIdx(progressData.currentParagraphIndex ?? 0);
          // Offer to resume only when there's something meaningful to resume to
          // (more than the first paragraph, less than fully read, not marked done).
          if (
            !progressData.isCompleted &&
            progressData.currentParagraphIndex > 0 &&
            progressData.percentRead < 95
          ) {
            setResumeOffer({ paragraphIdx: progressData.currentParagraphIndex });
          } else {
            setResumeOffer(null);
          }
          const bookmarked = await isStoryBookmarked(story.id);
          setIsBookmarked(bookmarked);
        }
      };
      loadData();

      return () => {
        void stopJapaneseAudio();
      };
    }, [story])
  );

  const handleResume = () => {
    if (!resumeOffer) return;
    const y = paragraphLayoutsRef.current[resumeOffer.paragraphIdx];
    if (typeof y === 'number') {
      scrollViewRef.current?.scrollTo({ y: Math.max(0, y - 12), animated: true });
    }
    setResumeOffer(null);
  };

  const handleParagraphLayout = (idx: number) => (event: LayoutChangeEvent) => {
    paragraphLayoutsRef.current[idx] = event.nativeEvent.layout.y;
  };

  const toggleTranslation = (paragraphId: string) => {
    setRevealedTranslations((prev) => {
      const next = new Set(prev);
      if (next.has(paragraphId)) {
        next.delete(paragraphId);
      } else {
        next.add(paragraphId);
      }
      return next;
    });
  };

  const handleWordPress = (word: Token) => {
    setSelectedWord(word);
    setModalVisible(true);
  };

  const handlePlayParagraphAudio = async (paragraphId: string) => {
    if (!story) return;
    const paragraph = story.paragraphs.find((p) => p.id === paragraphId);
    if (!paragraph) return;

    try {
      const sentences = paragraph.sentences || [];
      const lines = sentences.map((sent, idx) => ({ id: `${paragraphId}:${idx}`, text: sent.text }));
      const result = await playJapaneseSequence(lines, `story:${story.id}:${paragraphId}`);
      if (result?.ok === false && result.reason === 'missing-ja-voice') {
        Alert.alert('Thiết bị chưa có giọng Nhật', 'Máy này hiện chưa có voice tiếng Nhật. Hãy cài Japanese TTS voice trong cài đặt ngôn ngữ.');
      }
    } catch (error) {
      console.error('Error playing paragraph audio:', error);
    }
  };

  const handleSaveWord = async () => {
    if (!selectedWord) return;
    try {
      await addWordBookmark(selectedWord.word, selectedWord.reading, selectedWord.meaning, {
        jlptLevel: selectedWord.jlptLevel,
        pos: selectedWord.pos,
        sourceStoryId: story?.id,
        sourceStoryTitle: story?.title,
      });
      // Keep the modal open so the reader can keep referencing the entry; show
      // a transient inline confirmation instead of a blocking Alert.
      setJustSaved(true);
      if (justSavedTimerRef.current) clearTimeout(justSavedTimerRef.current);
      justSavedTimerRef.current = setTimeout(() => setJustSaved(false), 1500);
    } catch (error) {
      console.error('Error saving word:', error);
    }
  };

  const closeWordModal = () => {
    setModalVisible(false);
    setJustSaved(false);
    if (justSavedTimerRef.current) clearTimeout(justSavedTimerRef.current);
  };

  const handleBookmarkToggle = async () => {
    if (!story) return;
    try {
      if (isBookmarked) {
        await removeStoryBookmark(story.id);
      } else {
        await addStoryBookmark(story.id);
      }
      setIsBookmarked(!isBookmarked);
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    }
  };

  const handleCompleteStory = async () => {
    if (!story) return;
    try {
      await markStoryCompleted(story.id);
      Alert.alert('Xong!', `Bạn đã hoàn thành "${story.title}". Chúc mừng! 🎉`);
      navigation.goBack();
    } catch (error) {
      console.error('Error completing story:', error);
    }
  };

  const handleScroll = (event: any) => {
    if (!story) return;
    const contentHeight = event.nativeEvent.contentSize.height;
    const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;
    const scrollPosition = event.nativeEvent.contentOffset.y;
    const denom = contentHeight - scrollViewHeight;
    if (denom <= 0) return;

    // Find the deepest paragraph whose top is above (scrollY + 30% viewport).
    // That's the paragraph the reader is currently focused on, used for both
    // the progress bar and the saved resume position.
    const layouts = paragraphLayoutsRef.current;
    const total = story.paragraphs.length;
    const focusY = scrollPosition + scrollViewHeight * 0.3;
    let visibleIdx = 0;
    for (let i = 0; i < total; i += 1) {
      const y = layouts[i];
      if (typeof y === 'number' && y <= focusY) {
        visibleIdx = i;
      }
    }
    const atBottom = scrollPosition >= denom - 4;
    if (atBottom) visibleIdx = total - 1;
    if (visibleIdx !== currentParagraphIdx) setCurrentParagraphIdx(visibleIdx);

    // Percent reflects "how far through the story is the focused paragraph".
    // Index 0 maps to 0%; the last index (or scrolled-to-bottom) maps to 100%.
    const denomParagraphs = Math.max(1, total - 1);
    const paragraphPercent = atBottom
      ? 100
      : Math.min(100, Math.max(0, Math.round((visibleIdx / denomParagraphs) * 100)));

    // Write at most once per 5% bucket so AsyncStorage isn't hit on every scroll frame
    const bucket = Math.floor(paragraphPercent / 5);
    if (bucket !== lastWrittenBucketRef.current) {
      lastWrittenBucketRef.current = bucket;
      updateReadingPosition(story.id, visibleIdx, paragraphPercent).catch((error) => {
        console.error('Error updating reading position:', error);
      });
    }

    // Mark story as read today when user reaches 20%
    if (paragraphPercent >= 20 && !hasMarkedStoryReadToday) {
      setHasMarkedStoryReadToday(true);
      markStoryReadToday().catch((error) => {
        console.error('Error marking story read today:', error);
      });
    }
  };

  if (!story) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={24} color={Colors.white} />
          </TouchableOpacity>
          <Text style={styles.title}>Truyện không tìm thấy</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color={Colors.white} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.title}>{story.title}</Text>
          <Text style={styles.subtitle}>{story.level}</Text>
        </View>
        <TouchableOpacity onPress={handleBookmarkToggle} style={styles.bookmarkBtn}>
          <Ionicons
            name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
            size={24}
            color={Colors.white}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={[styles.content, isTablet && styles.contentTablet]}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* Resume offer — only when re-entering an in-progress story */}
        {resumeOffer ? (
          <TouchableOpacity style={styles.resumeBanner} onPress={handleResume}>
            <Ionicons name="play-skip-forward-outline" size={18} color={Colors.primary} />
            <Text style={styles.resumeBannerText}>
              Tiếp tục từ đoạn {resumeOffer.paragraphIdx + 1} / {story.paragraphs.length}
            </Text>
            <Ionicons name="chevron-forward" size={16} color={Colors.primary} />
          </TouchableOpacity>
        ) : null}

        {/* Progress Bar — driven by paragraph index for stable, content-aware progress */}
        {(() => {
          const total = story.paragraphs.length;
          const denomP = Math.max(1, total - 1);
          const displayPercent = Math.min(
            100,
            Math.max(0, Math.round((currentParagraphIdx / denomP) * 100))
          );
          return (
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${displayPercent}%` }]} />
              </View>
              <Text style={styles.progressText}>
                Đoạn {currentParagraphIdx + 1} / {total} • {displayPercent}%
              </Text>
            </View>
          );
        })()}

        {/* Story Content */}
        <View style={styles.contentSection}>
          {story.paragraphs.map((paragraph, idx) => {
            const isTranslationVisible = revealedTranslations.has(paragraph.id);
            return (
              <View
                key={paragraph.id}
                style={[styles.paragraph, idx === story.paragraphs.length - 1 && styles.paragraphLast]}
                onLayout={handleParagraphLayout(idx)}
              >
                {/* Paragraph header with audio */}
                <View style={styles.paragraphHeader}>
                  <AudioButton
                    audioId={`story:${story.id}:para:${paragraph.id}`}
                    text={paragraph.text}
                    size={18}
                  />
                </View>

                {/* Paragraph tokens */}
                <View style={styles.paragraphTextContainer}>
                  {paragraph.sentences?.map((sentence) => (
                    <View key={sentence.id} style={styles.sentenceContainer}>
                      <View style={styles.sentenceTokens}>
                        {sentence.tokens?.map((token) => {
                          const isParticle = token.pos === 'PARTICLE';
                          // Reading equals the word itself (kana-only tokens / particles) — render
                          // an empty spacer so the line still aligns with neighbouring furigana.
                          const showFurigana = !!token.reading && token.reading !== token.word;
                          return (
                            <TouchableOpacity
                              key={token.id}
                              onPress={() => handleWordPress(token)}
                              style={styles.tokenWrapper}
                            >
                              {showFurigana ? (
                                <Text style={styles.furigana}>{token.reading}</Text>
                              ) : (
                                <Text style={styles.furiganaSpacer}> </Text>
                              )}
                              <Text style={[styles.tokenText, isParticle && styles.tokenTextParticle]}>
                                {token.word}
                              </Text>
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    </View>
                  ))}
                </View>

                {/* Translation toggle — hidden by default to encourage reading first */}
                <TouchableOpacity
                  style={styles.translationToggle}
                  onPress={() => toggleTranslation(paragraph.id)}
                >
                  <Ionicons
                    name={isTranslationVisible ? 'eye-off-outline' : 'eye-outline'}
                    size={14}
                    color={Colors.primary}
                  />
                  <Text style={styles.translationToggleText}>
                    {isTranslationVisible ? 'Ẩn dịch' : 'Hiện dịch'}
                  </Text>
                </TouchableOpacity>
                {isTranslationVisible ? (
                  <Text style={styles.translationText}>{paragraph.translation}</Text>
                ) : null}
              </View>
            );
          })}
        </View>

        {/* Replay full story */}
        <TouchableOpacity
          style={styles.replayButton}
          onPress={async () => {
            if (!story) return;
            try {
              const lines = story.paragraphs.map((p, idx) => ({
                id: `${story.id}:para:${idx}`,
                text: p.text,
              }));
              await playJapaneseSequence(lines, `story:${story.id}:full`);
            } catch (error) {
              console.error('Error replaying story:', error);
            }
          }}
        >
          <Ionicons name="play-circle-outline" size={20} color={Colors.white} />
          <Text style={styles.replayButtonText}>Nghe lại cả truyện</Text>
        </TouchableOpacity>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[styles.actionButton, styles.actionButtonSecondary]}
            onPress={() => navigation.navigate('StoryVocabDashboard')}
          >
            <Ionicons name="bookmark-outline" size={18} color={Colors.primary} />
            <Text style={styles.actionButtonTextSecondary}>Các bookmark</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.actionButtonPrimary]}
            onPress={handleCompleteStory}
          >
            <Ionicons name="checkmark-circle-outline" size={18} color={Colors.white} />
            <Text style={styles.actionButtonTextPrimary}>Đã xong</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Word Definition Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeWordModal}
      >
        <Pressable style={styles.modalOverlay} onPress={closeWordModal}>
          <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Chi tiết từ</Text>
              <Pressable onPress={closeWordModal}>
                <Ionicons name="close" size={24} color={Colors.textPrimary} />
              </Pressable>
            </View>

            {selectedWord && (
              <View style={styles.modalBody}>
                <View style={styles.wordDisplayContainer}>
                  <Text style={styles.wordKanji}>{selectedWord.word}</Text>
                  <Text style={styles.wordReading}>{selectedWord.reading}</Text>
                </View>

                <View style={styles.audioButtonContainer}>
                  <AudioButton
                    audioId={`story:word:${selectedWord.id}`}
                    text={selectedWord.reading || selectedWord.word}
                    size={20}
                    backgroundColor={Colors.primary}
                    color={Colors.white}
                  />
                  <Text style={styles.audioButtonText}>Nghe phát âm</Text>
                </View>

                <View style={styles.meaningSection}>
                  <Text style={styles.meaningLabel}>Nghĩa</Text>
                  <Text style={styles.meaningText}>{selectedWord.meaning}</Text>
                </View>

                {selectedWord.pos && (
                  <View style={styles.posSection}>
                    <Text style={styles.posLabel}>Loại từ</Text>
                    <Text style={styles.posValue}>{selectedWord.pos}</Text>
                  </View>
                )}

                {selectedWord.examples && selectedWord.examples.length > 0 && (
                  <View style={styles.examplesSection}>
                    <Text style={styles.examplesLabel}>Ví dụ</Text>
                    {selectedWord.examples.map((example, index) => (
                      <Text key={index} style={styles.exampleText}>
                        • {example}
                      </Text>
                    ))}
                  </View>
                )}

                <TouchableOpacity
                  style={[styles.saveWordButton, justSaved && styles.saveWordButtonSaved]}
                  onPress={handleSaveWord}
                  disabled={justSaved}
                >
                  <Ionicons
                    name={justSaved ? 'checkmark-circle' : 'star-outline'}
                    size={18}
                    color={justSaved ? '#16A085' : Colors.primary}
                  />
                  <Text
                    style={[styles.saveWordButtonText, justSaved && styles.saveWordButtonTextSaved]}
                  >
                    {justSaved ? 'Đã lưu vào sổ tay' : 'Lưu từ này'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  backBtn: {
    paddingTop: 2,
  },
  bookmarkBtn: {
    paddingTop: 2,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.white,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 80,
  },
  contentTablet: {
    width: '100%',
    maxWidth: 800,
    alignSelf: 'center',
  },
  resumeBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.accent,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  resumeBannerText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    color: Colors.primary,
    fontFamily: 'BeVietnamPro_600SemiBold',
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressBar: {
    height: 6,
    backgroundColor: Colors.background,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: Colors.textMuted,
    fontWeight: '500',
  },
  contentSection: {
    marginBottom: 16,
  },
  paragraph: {
    marginBottom: 18,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  paragraphLast: {
    borderBottomWidth: 0,
    marginBottom: 12,
  },
  paragraphHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  paragraphTextContainer: {
    marginBottom: 4,
  },
  sentenceContainer: {
    marginBottom: 6,
  },
  sentenceTokens: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginBottom: 1,
    lineHeight: 24,
  },
  tokenWrapper: {
    marginRight: 3,
    marginBottom: 2,
  },
  furigana: {
    fontSize: 11,
    color: Colors.textMuted,
    textAlign: 'center',
    minWidth: 16,
    lineHeight: 14,
    marginBottom: 1,
  },
  furiganaSpacer: {
    fontSize: 11,
    lineHeight: 14,
    minWidth: 16,
    marginBottom: 1,
  },
  paragraphText: {
    fontSize: 16,
    lineHeight: 28,
    color: Colors.textPrimary,
    fontWeight: '500',
    marginBottom: 8,
  },
  tokenText: {
    fontSize: 15,
    color: Colors.primary,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 18,
  },
  tokenTextParticle: {
    color: Colors.textMuted,
    fontWeight: '400',
  },
  sentenceTranslation: {
    fontSize: 12,
    color: Colors.textMuted,
    fontStyle: 'italic',
    marginBottom: 4,
  },
  translationToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 4,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  translationToggleText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.primary,
    fontFamily: 'BeVietnamPro_600SemiBold',
  },
  translationText: {
    fontSize: 12,
    lineHeight: 16,
    color: Colors.textSecondary,
    fontStyle: 'italic',
    marginTop: 6,
  },
  replayButton: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
    marginBottom: 12,
  },
  replayButtonText: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: 14,
    fontFamily: 'BeVietnamPro_600SemiBold',
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  actionButtonPrimary: {
    backgroundColor: Colors.primary,
  },
  actionButtonSecondary: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  actionButtonTextPrimary: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: 14,
    fontFamily: 'BeVietnamPro_600SemiBold',
  },
  actionButtonTextSecondary: {
    color: Colors.primary,
    fontWeight: '600',
    fontSize: 14,
    fontFamily: 'BeVietnamPro_600SemiBold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 16,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textPrimary,
  },
  modalBody: {
    paddingVertical: 16,
  },
  wordDisplayContainer: {
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  wordKanji: {
    fontSize: 32,
    fontWeight: '800',
    color: Colors.primary,
    marginBottom: 4,
  },
  wordReading: {
    fontSize: 16,
    color: Colors.textMuted,
    fontStyle: 'italic',
  },
  audioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  audioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 0,
    gap: 8,
  },
  audioButtonText: {
    color: Colors.textPrimary,
    fontWeight: '600',
    fontSize: 14,
    fontFamily: 'BeVietnamPro_600SemiBold',
  },
  meaningSection: {
    marginBottom: 16,
  },
  meaningLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textMuted,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  meaningText: {
    fontSize: 15,
    color: Colors.textPrimary,
    lineHeight: 22,
  },
  posSection: {
    marginBottom: 16,
  },
  posLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textMuted,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  posValue: {
    fontSize: 14,
    color: Colors.textPrimary,
    backgroundColor: Colors.background,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  examplesSection: {
    marginBottom: 16,
  },
  examplesLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textMuted,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  exampleText: {
    fontSize: 13,
    color: Colors.textPrimary,
    lineHeight: 20,
    marginBottom: 6,
  },
  saveWordButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.primary,
    gap: 8,
    marginTop: 16,
    marginBottom: 20,
  },
  saveWordButtonSaved: {
    borderColor: '#16A085',
    backgroundColor: '#E9F8F4',
  },
  saveWordButtonText: {
    color: Colors.primary,
    fontWeight: '600',
    fontSize: 14,
    fontFamily: 'BeVietnamPro_600SemiBold',
  },
  saveWordButtonTextSaved: {
    color: '#16A085',
  },
});
