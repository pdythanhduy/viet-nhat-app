import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../constants/colors';
import { loadBookmarks, saveBookmarks, Bookmark } from '../utils/bookmarks';
import { RootStackParamList } from '../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function SavedScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadBookmarks().then(setBookmarks);
    }, [])
  );

  const removeBookmark = (id: string, type: string) => {
    Alert.alert('Xóa khỏi danh sách lưu?', undefined, [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Xóa',
        style: 'destructive',
        onPress: async () => {
          const updated = bookmarks.filter((b) => !(b.id === id && b.type === type));
          await saveBookmarks(updated);
          setBookmarks(updated);
        },
      },
    ]);
  };

  const clearAll = () => {
    Alert.alert('Xóa tất cả?', 'Toàn bộ mục đã lưu sẽ bị xóa.', [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Xóa hết',
        style: 'destructive',
        onPress: async () => {
          await saveBookmarks([]);
          setBookmarks([]);
        },
      },
    ]);
  };

  const guides = bookmarks.filter((b) => b.type === 'guide');
  const phrases = bookmarks.filter((b) => b.type === 'phrase');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Đã lưu</Text>
        {bookmarks.length > 0 && (
          <TouchableOpacity onPress={clearAll}>
            <Text style={styles.clearBtn}>Xóa hết</Text>
          </TouchableOpacity>
        )}
      </View>

      {bookmarks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="bookmark-outline" size={56} color={Colors.textMuted} />
          <Text style={styles.emptyTitle}>Chưa có mục nào được lưu</Text>
          <Text style={styles.emptyDesc}>
            Nhấn icon{' '}
            <Ionicons name="bookmark-outline" size={14} color={Colors.textSecondary} />{' '}
            trong màn hình thủ tục hoặc tiếng Nhật để lưu lại
          </Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          {/* Guides */}
          {guides.length > 0 && (
            <>
              <View style={styles.sectionHeader}>
                <Ionicons name="document-text" size={16} color={Colors.primary} />
                <Text style={styles.sectionTitle}>Thủ tục hành chính ({guides.length})</Text>
              </View>
              {guides.map((b) => {
                if (b.type !== 'guide') return null;
                return (
                  <TouchableOpacity
                    key={b.id}
                    style={styles.guideCard}
                    onPress={() => navigation.navigate('AdminDetail', { guideId: b.id })}
                  >
                    <View style={[styles.guideColorBar, { backgroundColor: b.color }]} />
                    <View style={styles.guideInfo}>
                      <Text style={styles.guideTitleJp}>{b.titleJp}</Text>
                      <Text style={styles.guideTitle}>{b.title}</Text>
                      <Text style={styles.guideDesc} numberOfLines={2}>{b.description}</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.removeBtn}
                      onPress={() => removeBookmark(b.id, b.type)}
                    >
                      <Ionicons name="bookmark" size={20} color={b.color} />
                    </TouchableOpacity>
                  </TouchableOpacity>
                );
              })}
            </>
          )}

          {/* Phrases */}
          {phrases.length > 0 && (
            <>
              <View style={styles.sectionHeader}>
                <Ionicons name="language" size={16} color={Colors.primary} />
                <Text style={styles.sectionTitle}>Cụm từ tiếng Nhật ({phrases.length})</Text>
              </View>
              {phrases.map((b) => {
                if (b.type !== 'phrase') return null;
                return (
                  <View key={b.id} style={styles.phraseCard}>
                    <View style={styles.phraseCatBadge}>
                      <Text style={styles.phraseCatText}>{b.category}</Text>
                    </View>
                    <View style={styles.phraseBody}>
                      <Text style={styles.phraseJp}>{b.jp}</Text>
                      <Text style={styles.phraseRomaji}>{b.romaji}</Text>
                      <Text style={styles.phraseVn}>{b.vn}</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.removeBtn}
                      onPress={() => removeBookmark(b.id, b.type)}
                    >
                      <Ionicons name="bookmark" size={20} color={Colors.primary} />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </>
          )}

          <View style={{ height: 32 }} />
        </ScrollView>
      )}
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  backBtn: {
    padding: 2,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: Colors.white,
  },
  clearBtn: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    gap: 12,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  emptyDesc: {
    fontSize: 13,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 20,
  },
  content: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  guideCard: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    overflow: 'hidden',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  guideColorBar: {
    width: 5,
    alignSelf: 'stretch',
  },
  guideInfo: {
    flex: 1,
    padding: 14,
  },
  guideTitleJp: {
    fontSize: 11,
    color: Colors.textMuted,
    marginBottom: 2,
  },
  guideTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  guideDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 17,
  },
  removeBtn: {
    padding: 14,
  },
  phraseCard: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  phraseCatBadge: {
    position: 'absolute',
    top: 10,
    left: 14,
    backgroundColor: Colors.accent,
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  phraseCatText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.primary,
  },
  phraseBody: {
    flex: 1,
    marginTop: 22,
  },
  phraseJp: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  phraseRomaji: {
    fontSize: 12,
    color: Colors.textMuted,
    fontStyle: 'italic',
    marginBottom: 2,
  },
  phraseVn: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
});
