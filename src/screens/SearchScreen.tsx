import React, { useMemo, useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Colors } from '../constants/colors';
import { RichInline } from '../components/RichText';
import { RootStackParamList } from '../navigation/AppNavigator';
import { SearchResultItem, searchAppContent, getFeaturedGuides } from '../utils/searchIndex';
import { logSearchPerformed } from '../utils/analytics';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type SearchRouteProp = RouteProp<RootStackParamList, 'Search'>;

// Empty-state suggestions. Each must return at least one hit from
// searchAppContent so the user sees real results immediately. Kept short
// (6 chips) so the empty state stays tidy on small phones; mixes
// Vietnamese, Japanese, and romaji to hint that all three work.
// MUST stay in sync with `SEARCH_SUGGESTIONS` in
// `src/utils/searchSuggestions.test.ts`, which guards every entry against
// the index drifting away from it.
const SEARCH_SUGGESTIONS: ReadonlyArray<string> = [
  'visa',
  'thẻ cư trú',
  'bảo hiểm',
  '住民税',
  'zairyu',
  'mất giấy tờ',
];

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

export default function SearchScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<SearchRouteProp>();
  // Pre-fill the input when the caller supplied an initial query (Home quick
  // actions do this for "gia hạn visa", "chuyển nhà", etc.). The user can
  // edit or clear it freely afterwards. We watch route.params.initialQuery
  // so a *second* navigation with a different query (e.g. user goes Home →
  // taps chip A → back → Home → taps chip B) actually updates the input —
  // useState's initializer only runs once and would leave the old query in
  // place when React Navigation reuses the screen instance.
  const [query, setQuery] = useState(route.params?.initialQuery ?? '');
  const initialQuery = route.params?.initialQuery;

  useEffect(() => {
    if (initialQuery !== undefined) {
      setQuery(initialQuery);
    }
  }, [initialQuery]);

  const results = useMemo(() => searchAppContent(query), [query]);

  useEffect(() => {
    if (query.trim().length > 2) {
      logSearchPerformed(query.trim(), results.length).catch(() => {});
    }
  }, [query, results.length]);

  // Phase 2B: memoize so the empty / no-results states don't recompute
  // the featured list on every keystroke that produced no hits.
  const featured = useMemo(() => getFeaturedGuides(6), []);

  const handleOpenResult = (item: SearchResultItem) => {
    if (item.type === 'guide') {
      navigation.navigate('AdminDetail', { guideId: item.id, source: 'search' });
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
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={Colors.white} />
        </TouchableOpacity>
        <View style={styles.headerText}>
          <Text style={styles.headerTitle}>Tìm kiếm toàn app</Text>
          <Text style={styles.headerDesc}>
            Tìm trong thủ tục, đời sống, việc làm và tiếng Nhật bằng tiếng Việt, không dấu, romaji hoặc từ khóa Nhật.
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color={Colors.textMuted} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            autoFocus
            placeholder="Ví dụ: bảo hiểm, zairyu, city hall, nợ lương..."
            placeholderTextColor={Colors.textMuted}
            style={styles.searchInput}
          />
          {query ? (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Ionicons name="close-circle" size={18} color={Colors.textMuted} />
            </TouchableOpacity>
          ) : null}
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {!query.trim() ? (
            <View>
              <View style={styles.emptyState}>
                <Ionicons name="search-circle-outline" size={56} color={Colors.textMuted} />
                <Text style={styles.emptyTitle}>Gõ thứ bạn đang cần</Text>
                <Text style={styles.emptyDesc}>
                  Bạn có thể tìm theo vấn đề, tên giấy tờ, tình huống, romaji hoặc một cụm tiếng Nhật.
                </Text>
                <Text style={styles.suggestionsLabel}>Gợi ý nhanh</Text>
                <View style={styles.suggestionsWrap}>
                  {SEARCH_SUGGESTIONS.map((suggestion) => (
                    <TouchableOpacity
                      key={suggestion}
                      style={styles.suggestionChip}
                      onPress={() => setQuery(suggestion)}
                      accessibilityRole="button"
                      accessibilityLabel={`Tìm ${suggestion}`}
                    >
                      <Ionicons name="search" size={12} color={Colors.primary} />
                      <Text style={styles.suggestionText}>{suggestion}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              <FeaturedAndEmergency
                featured={featured}
                onOpenGuide={(id) => navigation.navigate('AdminDetail', { guideId: id, source: 'featured' })}
                onOpenEmergency={() => navigation.navigate('EmergencyHub')}
              />
            </View>
          ) : results.length === 0 ? (
            <View>
              <View style={styles.emptyState}>
                <Ionicons name="file-tray-outline" size={48} color={Colors.textMuted} />
                <Text style={styles.emptyTitle}>Chưa có kết quả phù hợp</Text>
                <Text style={styles.emptyDesc}>
                  Hãy thử từ khóa ngắn hơn, bỏ bớt chi tiết hoặc dùng từ gần nghĩa hơn.
                </Text>
              </View>
              <FeaturedAndEmergency
                featured={featured}
                onOpenGuide={(id) => navigation.navigate('AdminDetail', { guideId: id, source: 'featured' })}
                onOpenEmergency={() => navigation.navigate('EmergencyHub')}
              />
            </View>
          ) : (
            <View style={styles.resultsWrap}>
              {results.map((item) => {
                const color = getResultColor(item.type);
                return (
                  <TouchableOpacity
                    key={`${item.type}-${item.id}`}
                    style={styles.resultCard}
                    onPress={() => handleOpenResult(item)}
                  >
                    <View style={[styles.resultIconBg, { backgroundColor: `${color}18` }]}>
                      <Ionicons name={getResultIcon(item.type)} size={18} color={color} />
                    </View>
                    <View style={styles.resultText}>
                      <RichInline text={item.subtitle} style={styles.resultSubtitle} />
                      <RichInline text={item.title} style={styles.resultTitle} />
                      <RichInline
                        text={item.snippet}
                        style={styles.resultSnippet}
                        numberOfLines={2}
                      />
                    </View>
                    <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
          <View style={{ height: 20 }} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

// Phase 2B: rendered below the empty / no-results states. Surfaces 6
// editorially-flagged guides + an emergency CTA so the user always has
// somewhere to go when their query failed. Memoized props keep the
// re-render cost negligible on every keystroke.
function FeaturedAndEmergency({
  featured,
  onOpenGuide,
  onOpenEmergency,
}: {
  featured: SearchResultItem[];
  onOpenGuide: (guideId: string) => void;
  onOpenEmergency: () => void;
}) {
  if (featured.length === 0) {
    return (
      <View style={styles.fallbackWrap}>
        <TouchableOpacity
          style={styles.emergencyCard}
          onPress={onOpenEmergency}
          accessibilityRole="button"
          accessibilityLabel="Mở trung tâm khẩn"
        >
          <View style={styles.emergencyIconBg}>
            <Ionicons name="alert-circle" size={20} color={Colors.danger} />
          </View>
          <View style={styles.emergencyText}>
            <Text style={styles.emergencyTitle}>Cần hỗ trợ gấp?</Text>
            <Text style={styles.emergencySnippet}>Số khẩn cấp, hotline tiếng Việt và quy trình xử lý.</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={styles.fallbackWrap}>
      <Text style={styles.fallbackLabel}>Hay được tìm</Text>
      {featured.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.fallbackCard}
          onPress={() => onOpenGuide(item.id)}
          accessibilityRole="button"
          accessibilityLabel={item.title}
        >
          <View style={styles.fallbackIconBg}>
            <Ionicons name="document-text-outline" size={16} color={Colors.primary} />
          </View>
          <View style={styles.fallbackText}>
            <Text style={styles.fallbackCardTitle} numberOfLines={1}>{item.title}</Text>
            <Text style={styles.fallbackCardSnippet} numberOfLines={1}>{item.snippet}</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={styles.emergencyCard}
        onPress={onOpenEmergency}
        accessibilityRole="button"
        accessibilityLabel="Mở trung tâm khẩn"
      >
        <View style={styles.emergencyIconBg}>
          <Ionicons name="alert-circle" size={20} color={Colors.danger} />
        </View>
        <View style={styles.emergencyText}>
          <Text style={styles.emergencyTitle}>Cần hỗ trợ gấp?</Text>
          <Text style={styles.emergencySnippet}>Số khẩn cấp, hotline tiếng Việt và quy trình xử lý.</Text>
        </View>
        <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
      </TouchableOpacity>
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
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.white,
    marginBottom: 6,
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
    marginTop: -10,
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.white,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 14,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.textPrimary,
    padding: 0,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    paddingHorizontal: 28,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 6,
  },
  emptyDesc: {
    fontSize: 13,
    lineHeight: 19,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  suggestionsLabel: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 11,
    fontWeight: '800',
    fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  suggestionsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
  },
  suggestionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  suggestionText: {
    fontSize: 12,
    color: Colors.textPrimary,
    fontWeight: '600',
    fontFamily: 'BeVietnamPro_600SemiBold',
  },
  resultsWrap: {
    gap: 10,
  },
  resultCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  resultIconBg: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultText: {
    flex: 1,
  },
  resultSubtitle: {
    fontSize: 11,
    fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textMuted,
    marginBottom: 3,
  },
  resultTitle: {
    fontSize: 13,
    fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  resultSnippet: {
    fontSize: 12,
    lineHeight: 17,
    color: Colors.textSecondary,
  },
  fallbackWrap: {
    paddingHorizontal: 4,
    paddingTop: 8,
    paddingBottom: 20,
    gap: 8,
  },
  fallbackLabel: {
    fontSize: 11,
    fontWeight: '800',
    fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  fallbackCard: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  fallbackIconBg: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: `${Colors.primary}18`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackText: { flex: 1 },
  fallbackCardTitle: {
    fontSize: 13,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  fallbackCardSnippet: {
    fontSize: 11,
    color: Colors.textSecondary,
  },
  emergencyCard: {
    marginTop: 6,
    backgroundColor: Colors.white,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: `${Colors.danger}40`,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  emergencyIconBg: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: `${Colors.danger}18`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emergencyText: { flex: 1 },
  emergencyTitle: {
    fontSize: 13,
    fontWeight: '800',
    fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  emergencySnippet: {
    fontSize: 11,
    color: Colors.textSecondary,
  },
});
