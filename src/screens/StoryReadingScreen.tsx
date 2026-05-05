import React, { useEffect, useState, useCallback } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
  Modal,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';

import { Colors } from '../constants/colors';
import { SAMPLE_STORIES } from '../constants/content/sampleStories';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Story, Token, Paragraph } from '../types/story';
import { getStoryProgress, saveStoryProgress, isStoryBookmarked, addStoryBookmark, removeStoryBookmark, updateReadingPosition } from '../utils/storyProgress';

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
  const [progress, setProgress] = useState<any>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [selectedWord, setSelectedWord] = useState<Token | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const foundStory = SAMPLE_STORIES.find((s) => s.id === storyId);
    setStory(foundStory || null);
  }, [storyId]);

  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        if (story) {
          const progressData = await getStoryProgress(story.id);
          setProgress(progressData);
          const bookmarked = await isStoryBookmarked(story.id);
          setIsBookmarked(bookmarked);
        }
      };
      loadData();
    }, [story])
  );

  const handleWordPress = (word: Token) => {
    setSelectedWord(word);
    setModalVisible(true);
  };

  const handleAudioPress = async (word: string, reading: string) => {
    // TTS implementation to be added in future phase
    // For now, just provide visual feedback
    console.log('Audio for:', reading || word);
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

  const handleScroll = (event: any) => {
    if (!story) return;
    const contentHeight = event.nativeEvent.contentSize.height;
    const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;
    const scrollPosition = event.nativeEvent.contentOffset.y;
    const percentRead = Math.round((scrollPosition / (contentHeight - scrollViewHeight)) * 100);

    updateReadingPosition(story.id, 0, Math.min(percentRead, 100)).catch((error) => {
      console.error('Error updating reading position:', error);
    });
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
        style={styles.scrollView}
        contentContainerStyle={[styles.content, isTablet && styles.contentTablet]}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress?.percentRead || 0}%` }]} />
          </View>
          <Text style={styles.progressText}>{progress?.percentRead || 0}% đọc</Text>
        </View>

        {/* Story Content */}
        <View style={styles.contentSection}>
          {story.paragraphs.map((paragraph) => (
            <View key={paragraph.id} style={styles.paragraph}>
              <Text style={styles.paragraphText}>{paragraph.text}</Text>
              <Text style={styles.translationText}>{paragraph.translation}</Text>
            </View>
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={[styles.actionButton, styles.actionButtonSecondary]}>
            <Ionicons name="bookmark-outline" size={18} color={Colors.primary} />
            <Text style={styles.actionButtonTextSecondary}>Các bookmark</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.actionButtonPrimary]}>
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
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Chi tiết từ</Text>
              <Pressable onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color={Colors.textPrimary} />
              </Pressable>
            </View>

            {selectedWord && (
              <View style={styles.modalBody}>
                <View style={styles.wordDisplayContainer}>
                  <Text style={styles.wordKanji}>{selectedWord.word}</Text>
                  <Text style={styles.wordReading}>{selectedWord.reading}</Text>
                </View>

                <TouchableOpacity
                  style={styles.audioButton}
                  onPress={() => handleAudioPress(selectedWord.word, selectedWord.reading)}
                >
                  <Ionicons name="volume-high" size={20} color={Colors.white} />
                  <Text style={styles.audioButtonText}>Nghe phát âm</Text>
                </TouchableOpacity>

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

                <TouchableOpacity style={styles.saveWordButton}>
                  <Ionicons name="star-outline" size={18} color={Colors.primary} />
                  <Text style={styles.saveWordButtonText}>Lưu từ này</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
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
    marginBottom: 20,
  },
  paragraph: {
    marginBottom: 24,
  },
  paragraphText: {
    fontSize: 16,
    lineHeight: 28,
    color: Colors.textPrimary,
    fontWeight: '500',
    marginBottom: 8,
  },
  translationText: {
    fontSize: 13,
    lineHeight: 20,
    color: Colors.textMuted,
    fontStyle: 'italic',
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
  audioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
    gap: 8,
  },
  audioButtonText: {
    color: Colors.white,
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
  saveWordButtonText: {
    color: Colors.primary,
    fontWeight: '600',
    fontSize: 14,
    fontFamily: 'BeVietnamPro_600SemiBold',
  },
});
