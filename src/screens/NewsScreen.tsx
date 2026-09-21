// News tab — Vietnamese headlines (Dân trí, 24h, VnExpress) and Japanese
// headlines (Yahoo!ニュース). Vietnamese items open on the publisher's site;
// Japanese items open in the Furigana reader with hiragana over the kanji.

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  Linking,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../constants/colors';
import type { RootStackParamList } from '../navigation/AppNavigator';
import {
  NEWS_FEEDS,
  fetchFeed,
  formatTimeAgo,
  type NewsItem,
  type NewsLang,
} from '../services/newsFeeds';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const CACHE_TTL_MS = 5 * 60 * 1000;

interface FeedState {
  items: NewsItem[];
  fetchedAt: number;
}

export default function NewsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [lang, setLang] = useState<NewsLang>('vi');
  const [feedId, setFeedId] = useState<string>('dantri');
  const [cache, setCache] = useState<Record<string, FeedState>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const feeds = useMemo(() => NEWS_FEEDS.filter((f) => f.lang === lang), [lang]);
  const feed = NEWS_FEEDS.find((f) => f.id === feedId) ?? feeds[0];
  const current = cache[feed.id];

  const load = useCallback(
    async (force: boolean) => {
      const hit = cache[feed.id];
      if (!force && hit && Date.now() - hit.fetchedAt < CACHE_TTL_MS) return;
      setLoading(true);
      setError(null);
      try {
        const items = await fetchFeed(feed);
        setCache((prev) => ({ ...prev, [feed.id]: { items, fetchedAt: Date.now() } }));
      } catch {
        setError('Không tải được tin. Kiểm tra mạng rồi kéo xuống để thử lại.');
      } finally {
        setLoading(false);
      }
    },
    [cache, feed]
  );

  useEffect(() => {
    void load(false);
    // Reload only when the selected feed changes; `load` closes over the cache.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feed.id]);

  const switchLang = (next: NewsLang) => {
    if (next === lang) return;
    setLang(next);
    setFeedId(NEWS_FEEDS.find((f) => f.lang === next)!.id);
  };

  const openItem = (item: NewsItem) => {
    if (lang === 'ja') {
      navigation.navigate('Furigana', { url: item.link, autoStart: true });
    } else {
      void Linking.openURL(item.link).catch(() => undefined);
    }
  };

  const renderItem = ({ item }: { item: NewsItem }) => (
    <TouchableOpacity style={styles.card} onPress={() => openItem(item)} activeOpacity={0.85}>
      {item.imageUrl ? (
        <Image source={{ uri: item.imageUrl }} style={styles.thumb} resizeMode="cover" />
      ) : null}
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle} numberOfLines={3}>
          {item.title}
        </Text>
        {item.summary && lang === 'vi' ? (
          <Text style={styles.cardSummary} numberOfLines={2}>
            {item.summary}
          </Text>
        ) : null}
        <Text style={styles.cardMeta}>
          {item.source}
          {item.publishedAt ? ` · ${formatTimeAgo(item.publishedAt)}` : ''}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.screen}>
      <View style={styles.langRow}>
        {(['vi', 'ja'] as const).map((l) => (
          <TouchableOpacity
            key={l}
            style={[styles.langBtn, lang === l && styles.langBtnActive]}
            onPress={() => switchLang(l)}
          >
            <Text style={[styles.langText, lang === l && styles.langTextActive]}>
              {l === 'vi' ? 'Tiếng Việt' : '日本語 + hiragana'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipRow}
        >
          {feeds.map((f) => (
            <TouchableOpacity
              key={f.id}
              style={[styles.chip, f.id === feed.id && styles.chipActive]}
              onPress={() => setFeedId(f.id)}
            >
              <Text style={[styles.chipText, f.id === feed.id && styles.chipTextActive]}>
                {f.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {lang === 'ja' && (
        <Text style={styles.hint}>
          Bấm vào một tin để đọc với hiragana trên chữ kanji.
        </Text>
      )}

      {loading && !current ? (
        <View style={styles.center}>
          <ActivityIndicator color={Colors.primary} />
        </View>
      ) : error && !current ? (
        <View style={styles.center}>
          <Ionicons name="cloud-offline-outline" size={36} color={Colors.textMuted} />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryBtn} onPress={() => void load(true)}>
            <Text style={styles.retryText}>Thử lại</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={current?.items ?? []}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={() => void load(true)} />
          }
          ListFooterComponent={
            <Text style={styles.footer}>
              Tiêu đề và link thuộc về các trang báo. Bài đầy đủ hiển thị tại nguồn.
            </Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  langRow: {
    flexDirection: 'row',
    margin: 12,
    marginBottom: 8,
    backgroundColor: Colors.accent,
    borderRadius: 12,
    padding: 3,
  },
  langBtn: { flex: 1, paddingVertical: 9, borderRadius: 10, alignItems: 'center' },
  langBtnActive: { backgroundColor: Colors.primary },
  langText: { fontSize: 14, fontWeight: '600', color: Colors.textSecondary },
  langTextActive: { color: Colors.white },
  chipRow: { paddingHorizontal: 12, paddingBottom: 8, gap: 8 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 16,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  chipActive: { backgroundColor: Colors.tagBlue, borderColor: Colors.primary },
  chipText: { fontSize: 13, color: Colors.textSecondary, fontWeight: '500' },
  chipTextActive: { color: Colors.primary, fontWeight: '700' },
  hint: { fontSize: 12, color: Colors.textSecondary, paddingHorizontal: 14, paddingBottom: 6 },
  list: { padding: 12, paddingTop: 4, gap: 10 },
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  thumb: { width: 104, backgroundColor: Colors.accent },
  cardBody: { flex: 1, padding: 12 },
  cardTitle: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary, lineHeight: 21 },
  cardSummary: { fontSize: 13, color: Colors.textSecondary, marginTop: 4, lineHeight: 18 },
  cardMeta: { fontSize: 12, color: Colors.textMuted, marginTop: 6 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 10 },
  errorText: { fontSize: 14, color: Colors.textSecondary, textAlign: 'center' },
  retryBtn: {
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 10,
    backgroundColor: Colors.primary,
  },
  retryText: { color: Colors.white, fontWeight: '600' },
  footer: {
    fontSize: 11,
    color: Colors.textMuted,
    textAlign: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
});
