import React, { useEffect, useState, useCallback } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';

import { Colors } from '../constants/colors';
import { SAMPLE_STORIES } from '../constants/content/sampleStories';
import { JLPTLevel } from '../types/jlpt';
import { RootStackParamList } from '../navigation/AppNavigator';
import { getCompletionStats } from '../utils/storyProgress';
import { loadStoryStreak, StoryStreakData } from '../utils/storyStreak';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Props {
  navigation: NavigationProp;
}

export default function StoryHubScreen({ navigation }: Props) {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const [selectedLevel, setSelectedLevel] = useState<JLPTLevel>('N5');
  const [stats, setStats] = useState({ totalStories: 0, completedStories: 0, percentageComplete: 0, totalWordsLearned: 0 });
  const [streak, setStreak] = useState<StoryStreakData | null>(null);

  const levels: JLPTLevel[] = ['N5', 'N4', 'N3', 'N2'];

  // Reload stats and streak when screen is focused
  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        const newStats = await getCompletionStats();
        setStats(newStats);
        const streakData = await loadStoryStreak();
        setStreak(streakData);
      };
      loadData();
    }, [])
  );

  const filteredStories = SAMPLE_STORIES.filter((story) => story.level === selectedLevel);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color={Colors.white} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.title}>Đọc Truyện Tiếng Nhật</Text>
          <Text style={styles.subtitle}>Learn Japanese through stories</Text>
        </View>
        {streak && streak.currentStreak > 0 ? (
          <View style={styles.streakBadge}>
            <Text style={styles.streakNum}>{streak.currentStreak}</Text>
            <Text style={styles.streakLabel}>ngày</Text>
          </View>
        ) : null}
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={[styles.content, isTablet && styles.contentTablet]}>
        {/* Progress Card */}
        <View style={styles.statsCard}>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{stats.completedStories}</Text>
              <Text style={styles.statLabel}>Truyện xong</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{stats.totalWordsLearned}</Text>
              <Text style={styles.statLabel}>Từ học</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{stats.percentageComplete}%</Text>
              <Text style={styles.statLabel}>Tiến độ</Text>
            </View>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${stats.percentageComplete}%` }]} />
          </View>
        </View>

        {/* Level Selector */}
        <View style={styles.levelSection}>
          <Text style={styles.levelTitle}>Chọn mức độ</Text>
          <View style={styles.levelChips}>
            {levels.map((level) => {
              const count = SAMPLE_STORIES.filter((s) => s.level === level).length;
              const isActive = level === selectedLevel;
              return (
                <TouchableOpacity
                  key={level}
                  style={[styles.levelChip, isActive && styles.levelChipActive]}
                  onPress={() => setSelectedLevel(level)}
                >
                  <Text style={[styles.levelChipText, isActive && styles.levelChipTextActive]}>
                    {level} ({count})
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Stories List */}
        <View style={styles.storiesSection}>
          <Text style={styles.storiesTitle}>Danh sách truyện</Text>
          {filteredStories.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Ionicons name="book-outline" size={48} color={Colors.textMuted} />
              <Text style={styles.emptyText}>Chưa có truyện cho mức độ này</Text>
            </View>
          ) : (
            <View style={styles.storiesList}>
              {filteredStories.map((story) => (
                <TouchableOpacity
                  key={story.id}
                  style={styles.storyCard}
                  onPress={() => navigation.navigate('StoryReading', { storyId: story.id })}
                >
                  <View style={styles.storyContent}>
                    <View style={styles.storyHeader}>
                      <Text style={styles.storyTitle}>{story.title}</Text>
                      <View style={styles.levelBadge}>
                        <Text style={styles.levelBadgeText}>{story.level}</Text>
                      </View>
                    </View>
                    <Text style={styles.storyCategory}>{story.category}</Text>
                    <Text style={styles.storyDescription}>{story.description}</Text>
                    <View style={styles.storyMeta}>
                      <View style={styles.metaItem}>
                        <Ionicons name="document-text-outline" size={14} color={Colors.textMuted} />
                        <Text style={styles.metaText}>{story.wordCount} từ</Text>
                      </View>
                      <View style={styles.metaItem}>
                        <Ionicons name="time-outline" size={14} color={Colors.textMuted} />
                        <Text style={styles.metaText}>~{story.estimatedReadTime} phút</Text>
                      </View>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
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
    alignItems: 'flex-start',
  },
  backBtn: {
    paddingTop: 2,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.white,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 108,
  },
  contentTablet: {
    width: '100%',
    maxWidth: 900,
    alignSelf: 'center',
  },
  statsCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.border,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '800',
    fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: Colors.textMuted,
  },
  progressBar: {
    height: 6,
    backgroundColor: Colors.background,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 3,
  },
  levelSection: {
    marginBottom: 24,
  },
  levelTitle: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textPrimary,
    marginBottom: 10,
  },
  levelChips: {
    flexDirection: 'row',
    gap: 8,
  },
  levelChip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  levelChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  levelChipText: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.textPrimary,
  },
  levelChipTextActive: {
    color: Colors.white,
  },
  storiesSection: {
    marginBottom: 20,
  },
  storiesTitle: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  storiesList: {
    gap: 10,
  },
  storyCard: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  storyContent: {
    flex: 1,
  },
  storyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  storyTitle: {
    fontSize: 15,
    fontWeight: '600',
    fontFamily: 'BeVietnamPro_600SemiBold',
    color: Colors.textPrimary,
    flex: 1,
  },
  levelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    backgroundColor: Colors.accent,
  },
  levelBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.primary,
  },
  storyCategory: {
    fontSize: 12,
    color: Colors.textMuted,
    marginBottom: 4,
  },
  storyDescription: {
    fontSize: 12,
    color: Colors.textPrimary,
    lineHeight: 16,
    marginBottom: 8,
  },
  storyMeta: {
    flexDirection: 'row',
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 11,
    color: Colors.textMuted,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.textMuted,
    marginTop: 12,
  },
  streakBadge: {
    backgroundColor: Colors.accent,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  streakNum: {
    fontSize: 16,
    fontWeight: '800',
    fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.primary,
  },
  streakLabel: {
    fontSize: 10,
    color: Colors.textMuted,
    marginTop: 2,
  },
});
