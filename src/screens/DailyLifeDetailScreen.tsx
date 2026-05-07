import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  useWindowDimensions,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../constants/colors';
import { Disclaimers } from '../constants/disclaimers';
import { DAILY_LIFE_CONTENT_META, DAILY_LIFE_TOPICS } from '../constants/content/dailyLife';
import { RootStackParamList } from '../navigation/AppNavigator';
import { formatLastUpdated, getSourceLabels } from '../utils/contentMetadata';
import { recordRecentDailyLifeTopic } from '../utils/dailyLifeRecentTopics';
import { isBookmarked, toggleBookmark } from '../utils/bookmarks';
import { logBookmarkToggled } from '../utils/analytics';
import type { DailyLifeSection } from '../types/content';
import RichText, { RichInline } from '../components/RichText';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RouteType = RouteProp<RootStackParamList, 'DailyLifeDetail'>;

export default function DailyLifeDetailScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteType>();
  const insets = useSafeAreaInsets();
  const { width: windowWidth } = useWindowDimensions();
  const imageWidth = windowWidth - 64;
  const [expandedSection, setExpandedSection] = useState<number | null>(0);
  const [bookmarked, setBookmarked] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const topic = DAILY_LIFE_TOPICS.find((item) => item.id === route.params.topicId);
  if (!topic) return null;

  React.useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: topic.title });
  }, [navigation, topic]);

  React.useEffect(() => {
    recordRecentDailyLifeTopic(topic.id).catch(() => undefined);
  }, [topic.id]);

  React.useEffect(() => {
    isBookmarked(topic.id, 'daily-life').then(setBookmarked).catch(() => undefined);
  }, [topic.id]);

  const formatSectionForCopy = (section: DailyLifeSection) => {
    const parts: string[] = [section.title];

    if (section.content) {
      parts.push(section.content);
    }

    if (section.items?.length) {
      parts.push(...section.items.map((item) => `- ${item}`));
    }

    if (section.tip) {
      parts.push(`Mẹo đáng nhớ: ${section.tip}`);
    }

    return parts.join('\n');
  };

  const copyTopicSummary = () => {
    const parts: string[] = [
      `${topic.title} (${topic.titleJp})`,
      topic.description,
    ];

    if (topic.sections?.length) {
      parts.push(...topic.sections.map((section) => `\n${formatSectionForCopy(section)}`));
    }

    Clipboard.setStringAsync(parts.join('\n')).catch(() => {});
    Alert.alert('Đã copy', 'Đã copy toàn bộ nội dung tóm tắt của mục này.');
  };

  const copySection = (section: DailyLifeSection) => {
    Clipboard.setStringAsync(`${topic.title}\n${formatSectionForCopy(section)}`).catch(() => {});
    Alert.alert('Đã copy', `Đã copy mục "${section.title}".`);
  };

  const handleToggleBookmark = async () => {
    try {
      const next = await toggleBookmark({
        type: 'daily-life',
        id: topic.id,
        title: topic.title,
        titleJp: topic.titleJp,
        description: topic.description,
        color: topic.color,
        savedAt: '',
      });
      setBookmarked(next);
      logBookmarkToggled('daily-life', topic.id, next).catch(() => {});
      Alert.alert(next ? 'Đã lưu' : 'Đã bỏ lưu', next ? 'Đã thêm mục này vào danh sách lưu.' : 'Đã xóa mục này khỏi danh sách lưu.');
    } catch {
      Alert.alert('Lỗi', 'Không thể cập nhật danh sách lưu lúc này.');
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={[styles.topicHeader, { backgroundColor: topic.color }]}>
        <View style={styles.headerTopRow}>
          <View style={styles.headerTextWrap}>
            <Text style={styles.topicJp}>{topic.titleJp}</Text>
            <Text style={styles.topicTitle}>{topic.title}</Text>
            <Text style={styles.topicDesc}>{topic.description}</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.bookmarkBtn} onPress={copyTopicSummary}>
              <Ionicons name="copy-outline" size={21} color={Colors.white} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.bookmarkBtn} onPress={handleToggleBookmark}>
              <Ionicons
                name={bookmarked ? 'bookmark' : 'bookmark-outline'}
                size={22}
                color={Colors.white}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.metaBox}>
          <Ionicons name="information-circle-outline" size={16} color={Colors.primary} />
          <Text style={styles.metaText}>
            {Disclaimers.legal}
            {'\n'}
            Cập nhật: {formatLastUpdated(DAILY_LIFE_CONTENT_META.lastUpdated)}. Nguồn:{' '}
            {getSourceLabels(DAILY_LIFE_CONTENT_META)}.
          </Text>
        </View>

        {topic.sections?.length ? (
          topic.sections.map((section: DailyLifeSection, index: number) => (
            <TouchableOpacity
              key={`${topic.id}-${index}`}
              style={styles.sectionCard}
              onPress={() => setExpandedSection(expandedSection === index ? null : index)}
              activeOpacity={0.85}
            >
              <View style={styles.sectionHeader}>
                <View style={styles.sectionHeaderLeft}>
                  <View style={[styles.sectionNum, { backgroundColor: topic.color }]}>
                    <Text style={styles.sectionNumText}>{index + 1}</Text>
                  </View>
                  <Text style={styles.sectionTitle}>{section.title}</Text>
                </View>
                <View style={styles.sectionHeaderActions}>
                  <TouchableOpacity
                    style={styles.sectionCopyBtn}
                    onPress={() => copySection(section)}
                    hitSlop={8}
                  >
                    <Ionicons name="copy-outline" size={16} color={Colors.textMuted} />
                  </TouchableOpacity>
                  <Ionicons
                    name={expandedSection === index ? 'chevron-up' : 'chevron-down'}
                    size={18}
                    color={Colors.textMuted}
                  />
                </View>
              </View>

              {expandedSection === index ? (
                <View style={styles.sectionBody}>
                  {section.content ? (
                    <RichText
                      text={section.content}
                      textStyle={styles.sectionContent}
                      containerStyle={styles.sectionContentContainer}
                      accentColor={topic.color}
                    />
                  ) : null}

                  {section.items?.length ? (
                    <View style={styles.itemsList}>
                      {section.items.map((item, itemIndex) => (
                        <View key={`${topic.id}-${index}-${itemIndex}`} style={styles.itemRow}>
                          <View style={[styles.itemBullet, { backgroundColor: topic.color }]} />
                          <RichInline text={item} style={styles.itemText} />
                        </View>
                      ))}
                    </View>
                  ) : null}

                  {section.image && !imageErrors[index] && (
                    <View style={styles.sectionImageWrap}>
                      <Image
                        source={section.image}
                        style={[styles.sectionImage, { width: imageWidth }]}
                        resizeMode="cover"
                        onError={() => setImageErrors((prev) => ({ ...prev, [index]: true }))}
                      />
                      {section.imageCaption ? (
                        <Text style={styles.sectionImageCaption}>{section.imageCaption}</Text>
                      ) : null}
                    </View>
                  )}

                  {section.tip ? (
                    <View
                      style={[
                        styles.tipBox,
                        {
                          backgroundColor: `${topic.color}12`,
                          borderColor: `${topic.color}30`,
                        },
                      ]}
                    >
                      <Ionicons name="bulb" size={15} color={topic.color} />
                      <Text style={[styles.tipText, { color: topic.color }]}>{section.tip}</Text>
                    </View>
                  ) : null}
                </View>
              ) : null}
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.noContentBox}>
            <Ionicons name="information-circle-outline" size={36} color={Colors.textMuted} />
            <Text style={styles.noContentText}>Nội dung đang được cập nhật.</Text>
          </View>
        )}

        <View style={{ height: 32 + Math.max(insets.bottom, 12) }} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  topicHeader: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 28 },
  headerTopRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  headerTextWrap: { flex: 1 },
  headerActions: { gap: 10 },
  bookmarkBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.16)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
  },
  topicJp: { fontSize: 13, color: 'rgba(255,255,255,0.78)', marginBottom: 4 },
  topicTitle: { fontSize: 22, fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold', color: Colors.white, marginBottom: 6 },
  topicDesc: { fontSize: 13, color: 'rgba(255,255,255,0.9)', lineHeight: 19 },
  content: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -16,
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  metaBox: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor: Colors.accent,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: `${Colors.primary}30`,
  },
  metaText: { flex: 1, fontSize: 12, color: Colors.textSecondary, lineHeight: 18 },
  sectionCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginBottom: 10,
    overflow: 'hidden',
  },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 12 },
  sectionHeaderLeft: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 12 },
  sectionHeaderActions: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  sectionNum: {
    width: 30,
    height: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  sectionNumText: { fontSize: 13, fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold', color: Colors.white },
  sectionTitle: { flex: 1, fontSize: 14, fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold', color: Colors.textPrimary },
  sectionCopyBtn: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },
  sectionBody: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  sectionContentContainer: { marginTop: 12, marginBottom: 10 },
  sectionContent: { fontSize: 13, color: Colors.textSecondary, lineHeight: 20 },
  itemsList: { gap: 8, marginBottom: 10 },
  itemRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  itemBullet: { width: 6, height: 6, borderRadius: 3, marginTop: 6, flexShrink: 0 },
  itemText: { flex: 1, fontSize: 13, color: Colors.textSecondary, lineHeight: 20 },
  tipBox: {
    flexDirection: 'row',
    gap: 8,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'flex-start',
    marginTop: 4,
  },
  tipText: { flex: 1, fontSize: 12, lineHeight: 18, fontWeight: '500' },
  sectionImageWrap: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 12,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
  },
  sectionImage: {
    height: 180,
  },
  sectionImageCaption: {
    fontSize: 11,
    color: Colors.textMuted,
    textAlign: 'center',
    paddingVertical: 6,
    paddingHorizontal: 8,
    fontStyle: 'italic',
    backgroundColor: '#f8f8f8',
  },
  noContentBox: { alignItems: 'center', paddingVertical: 40, gap: 8 },
  noContentText: { fontSize: 14, color: Colors.textMuted },
});
