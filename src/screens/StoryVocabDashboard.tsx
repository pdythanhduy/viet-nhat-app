import React, { useEffect, useState, useCallback } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
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
import { loadWordBookmarks, removeWordBookmark } from '../utils/storyProgress';
import AudioButton from '../components/AudioButton';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Props {
  navigation: NavigationProp;
}

export default function StoryVocabDashboard({ navigation }: Props) {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const [words, setWords] = useState<WordBookmark[]>([]);

  useFocusEffect(
    useCallback(() => {
      const loadWords = async () => {
        const bookmarks = await loadWordBookmarks();
        setWords(bookmarks.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      };
      loadWords();
    }, [])
  );

  const handleDeleteWord = async (id: string) => {
    Alert.alert('Xóa từ', 'Bạn chắc chắn muốn xóa từ này?', [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Xóa',
        style: 'destructive',
        onPress: async () => {
          await removeWordBookmark(id);
          const updated = words.filter((w) => w.id !== id);
          setWords(updated);
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color={Colors.white} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.title}>Từ đã lưu</Text>
          <Text style={styles.subtitle}>{words.length} từ</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.content, isTablet && styles.contentTablet]}
      >
        {words.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="bookmark-outline" size={48} color={Colors.textMuted} />
            <Text style={styles.emptyText}>Chưa lưu từ nào</Text>
            <Text style={styles.emptySubtext}>Nhấn nút "Lưu từ" khi đọc truyện để thêm từ vào đây</Text>
          </View>
        ) : (
          <View style={styles.wordsList}>
            {words.map((word) => (
              <View key={word.id} style={styles.wordItem}>
                <View style={styles.wordInfo}>
                  <View>
                    <Text style={styles.wordText}>
                      {word.word}
                      {word.reading && <Text style={styles.wordReading}> ({word.reading})</Text>}
                    </Text>
                    <Text style={styles.meaningText}>{word.meaning}</Text>
                  </View>
                </View>

                <View style={styles.wordActions}>
                  <AudioButton
                    audioId={`vocab:${word.id}`}
                    text={word.reading || word.word}
                    size={18}
                  />
                  <TouchableOpacity onPress={() => handleDeleteWord(word.id)} style={styles.deleteBtn}>
                    <Ionicons name="close-circle-outline" size={20} color={Colors.textMuted} />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
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
  },
  emptySubtext: {
    fontSize: 13,
    color: Colors.textMuted,
    textAlign: 'center',
    maxWidth: 280,
  },
  wordsList: {
    gap: 12,
  },
  wordItem: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wordInfo: {
    flex: 1,
    marginRight: 12,
  },
  wordText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  wordReading: {
    fontSize: 12,
    color: Colors.textMuted,
    fontStyle: 'italic',
  },
  meaningText: {
    fontSize: 13,
    color: Colors.textMuted,
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
