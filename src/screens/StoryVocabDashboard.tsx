import React, { useMemo, useState, useCallback } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';

import { Colors } from '../constants/colors';
import { RootStackParamList } from '../navigation/AppNavigator';
import { WordBookmark } from '../types/story';
import { JLPTLevel } from '../types/jlpt';
import { loadWordBookmarks, removeWordBookmark } from '../utils/storyProgress';
import AudioButton from '../components/AudioButton';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Props {
  navigation: NavigationProp;
}

// Stable JLPT order. Words saved before metadata existed land in 'unknown'.
const LEVEL_ORDER: (JLPTLevel | 'unknown')[] = ['N5', 'N4', 'N3', 'N2', 'N1', 'unknown'];
const LEVEL_LABELS: Record<JLPTLevel | 'unknown', string> = {
  N5: 'JLPT N5',
  N4: 'JLPT N4',
  N3: 'JLPT N3',
  N2: 'JLPT N2',
  N1: 'JLPT N1',
  unknown: 'Chưa rõ JLPT',
};

function normalize(s: string) {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();
}

export default function StoryVocabDashboard({ navigation }: Props) {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const [words, setWords] = useState<WordBookmark[]>([]);
  const [query, setQuery] = useState('');

  useFocusEffect(
    useCallback(() => {
      const loadWords = async () => {
        const bookmarks = await loadWordBookmarks();
        setWords(
          bookmarks.sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        );
      };
      loadWords();
    }, [])
  );

  const handleDeleteWord = (id: string) => {
    Alert.alert('Xóa từ', 'Bạn chắc chắn muốn xóa từ này?', [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Xóa',
        style: 'destructive',
        onPress: async () => {
          await removeWordBookmark(id);
          setWords((prev) => prev.filter((w) => w.id !== id));
        },
      },
    ]);
  };

  const filteredWords = useMemo(() => {
    if (!query.trim()) return words;
    const nq = normalize(query);
    return words.filter((w) => {
      return (
        w.word.includes(query) ||
        normalize(w.reading).includes(nq) ||
        normalize(w.meaning).includes(nq) ||
        (w.sourceStoryTitle ? w.sourceStoryTitle.includes(query) : false)
      );
    });
  }, [words, query]);

  const grouped = useMemo(() => {
    const buckets: Record<JLPTLevel | 'unknown', WordBookmark[]> = {
      N5: [], N4: [], N3: [], N2: [], N1: [], unknown: [],
    };
    filteredWords.forEach((w) => {
      const key = (w.jlptLevel ?? 'unknown') as JLPTLevel | 'unknown';
      buckets[key].push(w);
    });
    return LEVEL_ORDER
      .map((level) => ({ level, words: buckets[level] }))
      .filter((g) => g.words.length > 0);
  }, [filteredWords]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color={Colors.white} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.title}>Từ đã lưu</Text>
          <Text style={styles.subtitle}>{words.length} từ • Sổ tay từ vựng</Text>
        </View>
      </View>

      {words.length > 0 ? (
        <View style={styles.searchBar}>
          <Ionicons name="search" size={16} color={Colors.textMuted} />
          <TextInput
            style={styles.searchInput}
            value={query}
            onChangeText={setQuery}
            placeholder="Tìm từ, nghĩa, hay tên truyện..."
            placeholderTextColor={Colors.textMuted}
            returnKeyType="search"
          />
          {query.length > 0 ? (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Ionicons name="close-circle" size={16} color={Colors.textMuted} />
            </TouchableOpacity>
          ) : null}
        </View>
      ) : null}

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.content, isTablet && styles.contentTablet]}
        keyboardShouldPersistTaps="handled"
      >
        {words.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="bookmark-outline" size={48} color={Colors.textMuted} />
            <Text style={styles.emptyText}>Chưa lưu từ nào</Text>
            <Text style={styles.emptySubtext}>
              Khi đọc truyện, chạm vào một từ rồi nhấn "Lưu từ này" để thêm vào sổ tay.
            </Text>
            <TouchableOpacity
              style={styles.emptyCta}
              onPress={() => navigation.navigate('StoryHub')}
            >
              <Ionicons name="book-outline" size={16} color={Colors.white} />
              <Text style={styles.emptyCtaText}>Bắt đầu đọc truyện</Text>
            </TouchableOpacity>
          </View>
        ) : filteredWords.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="search" size={36} color={Colors.textMuted} />
            <Text style={styles.emptyText}>Không tìm thấy từ nào</Text>
            <Text style={styles.emptySubtext}>Thử từ khác hoặc xoá ô tìm kiếm.</Text>
          </View>
        ) : (
          grouped.map((group) => (
            <View key={group.level} style={styles.groupSection}>
              <View style={styles.groupHeader}>
                <Text style={styles.groupTitle}>{LEVEL_LABELS[group.level]}</Text>
                <Text style={styles.groupCount}>{group.words.length} từ</Text>
              </View>

              <View style={styles.wordsList}>
                {group.words.map((word) => (
                  <View key={word.id} style={styles.wordItem}>
                    <View style={styles.wordInfo}>
                      <View style={styles.wordRow}>
                        <Text style={styles.wordText}>{word.word}</Text>
                        {word.reading && word.reading !== word.word ? (
                          <Text style={styles.wordReading}>{word.reading}</Text>
                        ) : null}
                        {word.pos ? (
                          <View style={styles.posChip}>
                            <Text style={styles.posChipText}>{word.pos}</Text>
                          </View>
                        ) : null}
                      </View>
                      <Text style={styles.meaningText}>{word.meaning}</Text>
                      {word.sourceStoryTitle ? (
                        <View style={styles.sourceRow}>
                          <Ionicons
                            name="book-outline"
                            size={11}
                            color={Colors.textMuted}
                          />
                          <Text style={styles.sourceText} numberOfLines={1}>
                            {word.sourceStoryTitle}
                          </Text>
                        </View>
                      ) : null}
                    </View>

                    <View style={styles.wordActions}>
                      <AudioButton
                        audioId={`vocab:${word.id}`}
                        text={word.reading || word.word}
                        size={18}
                      />
                      <TouchableOpacity
                        onPress={() => handleDeleteWord(word.id)}
                        style={styles.deleteBtn}
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                      >
                        <Ionicons
                          name="close-circle-outline"
                          size={20}
                          color={Colors.textMuted}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          ))
        )}
      </ScrollView>
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.white,
    marginHorizontal: 16,
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.textPrimary,
    paddingVertical: 0,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  contentTablet: {
    width: '100%',
    maxWidth: 800,
    alignSelf: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginTop: 16,
    marginBottom: 8,
    fontFamily: 'BeVietnamPro_600SemiBold',
  },
  emptySubtext: {
    fontSize: 13,
    color: Colors.textMuted,
    textAlign: 'center',
    maxWidth: 280,
    lineHeight: 18,
    marginBottom: 18,
  },
  emptyCta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
  },
  emptyCtaText: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
  },
  groupSection: {
    marginBottom: 20,
  },
  groupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  groupTitle: {
    fontSize: 13,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textPrimary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  groupCount: {
    fontSize: 11,
    color: Colors.textMuted,
  },
  wordsList: {
    gap: 10,
  },
  wordItem: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  wordInfo: {
    flex: 1,
  },
  wordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 4,
  },
  wordText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.primary,
    fontFamily: 'BeVietnamPro_700Bold',
  },
  wordReading: {
    fontSize: 12,
    color: Colors.textMuted,
    fontStyle: 'italic',
  },
  posChip: {
    backgroundColor: Colors.background,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  posChipText: {
    fontSize: 9,
    fontWeight: '700',
    color: Colors.textMuted,
    letterSpacing: 0.3,
  },
  meaningText: {
    fontSize: 13,
    color: Colors.textPrimary,
    marginBottom: 4,
    lineHeight: 18,
  },
  sourceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  sourceText: {
    fontSize: 11,
    color: Colors.textMuted,
    flex: 1,
  },
  wordActions: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  deleteBtn: {
    padding: 4,
  },
});
