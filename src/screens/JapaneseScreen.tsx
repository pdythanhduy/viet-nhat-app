import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../constants/colors';
import { JAPANESE_WORDS, ESSENTIAL_PHRASES } from '../constants/content';
import { RootStackParamList } from '../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const CATEGORY_ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  'Chào hỏi': 'hand-left',
  'Tại nơi làm việc': 'briefcase',
  'Khẩn cấp': 'warning',
  'Hàng ngày': 'sunny',
};

const CATEGORY_COLORS: Record<string, string> = {
  'Chào hỏi': '#185FA5',
  'Tại nơi làm việc': '#9B59B6',
  'Khẩn cấp': '#E74C3C',
  'Hàng ngày': '#F39C12',
};

export default function JapaneseScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [wordIndex, setWordIndex] = useState(0);
  const [showRomaji, setShowRomaji] = useState(true);
  const [expandedCategory, setExpandedCategory] = useState<string | null>('Chào hỏi');

  const currentWord = JAPANESE_WORDS[wordIndex];

  const nextWord = () => setWordIndex((prev) => (prev + 1) % JAPANESE_WORDS.length);
  const prevWord = () => setWordIndex((prev) => (prev - 1 + JAPANESE_WORDS.length) % JAPANESE_WORDS.length);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tiếng Nhật</Text>
        <Text style={styles.headerSub}>Học từ vựng và cụm từ thực dụng</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Word of the Day */}
        <View style={styles.wordCard}>
          <View style={styles.wordHeader}>
            <View style={styles.wotdBadge}>
              <Ionicons name="star" size={12} color="#F39C12" />
              <Text style={styles.wotdText}>Từ của ngày hôm nay</Text>
            </View>
            <View style={styles.wordNav}>
              <TouchableOpacity onPress={prevWord} style={styles.navBtn}>
                <Ionicons name="chevron-back" size={18} color={Colors.primary} />
              </TouchableOpacity>
              <Text style={styles.wordCount}>{wordIndex + 1}/{JAPANESE_WORDS.length}</Text>
              <TouchableOpacity onPress={nextWord} style={styles.navBtn}>
                <Ionicons name="chevron-forward" size={18} color={Colors.primary} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.wordMain}>
            <Text style={styles.wordJp}>{currentWord.word}</Text>
            <Text style={styles.wordReading}>{currentWord.reading}</Text>
            {showRomaji && (
              <Text style={styles.wordRomaji}>{currentWord.romaji}</Text>
            )}
            <View style={styles.meaningBadge}>
              <Text style={styles.wordMeaning}>{currentWord.meaning}</Text>
            </View>
          </View>

          <View style={styles.exampleBox}>
            <Text style={styles.exampleLabel}>Ví dụ:</Text>
            <Text style={styles.exampleJp}>{currentWord.example}</Text>
            {showRomaji && (
              <Text style={styles.exampleRomaji}>{currentWord.exampleRomaji}</Text>
            )}
            <Text style={styles.exampleVn}>{currentWord.exampleMeaning}</Text>
          </View>

          <View style={styles.wordActions}>
            <TouchableOpacity
              style={styles.romajiToggle}
              onPress={() => setShowRomaji(!showRomaji)}
            >
              <Ionicons
                name={showRomaji ? 'eye-off-outline' : 'eye-outline'}
                size={15}
                color={Colors.primary}
              />
              <Text style={styles.romajiToggleText}>
                {showRomaji ? 'Ẩn phiên âm' : 'Hiện phiên âm'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.learnMoreBtn}
              onPress={() =>
                navigation.navigate('AIChat', {
                  title: `Học từ: ${currentWord.word}`,
                  prefilledQuestion: `Giải thích chi tiết về từ "${currentWord.word}" (${currentWord.reading}) trong tiếng Nhật. Bao gồm: cách dùng, các câu ví dụ khác, từ liên quan, và những lưu ý khi sử dụng từ này trong cuộc sống tại Nhật.`,
                })
              }
            >
              <Ionicons name="sparkles" size={14} color={Colors.white} />
              <Text style={styles.learnMoreText}>Học thêm với AI</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Essential Phrases */}
        <Text style={styles.sectionTitle}>Cụm từ thiết yếu</Text>

        {ESSENTIAL_PHRASES.map((category) => (
          <View key={category.category} style={styles.categoryCard}>
            <TouchableOpacity
              style={styles.categoryHeader}
              onPress={() =>
                setExpandedCategory(
                  expandedCategory === category.category ? null : category.category
                )
              }
            >
              <View style={styles.categoryLeft}>
                <View
                  style={[
                    styles.categoryIcon,
                    { backgroundColor: (CATEGORY_COLORS[category.category] || Colors.primary) + '18' },
                  ]}
                >
                  <Ionicons
                    name={CATEGORY_ICONS[category.category] || 'chatbubble'}
                    size={18}
                    color={CATEGORY_COLORS[category.category] || Colors.primary}
                  />
                </View>
                <Text style={styles.categoryTitle}>{category.category}</Text>
                <View style={styles.countBadge}>
                  <Text style={styles.countText}>{category.phrases.length}</Text>
                </View>
              </View>
              <Ionicons
                name={expandedCategory === category.category ? 'chevron-up' : 'chevron-down'}
                size={18}
                color={Colors.textMuted}
              />
            </TouchableOpacity>

            {expandedCategory === category.category && (
              <View style={styles.phrasesList}>
                {category.phrases.map((phrase, i) => (
                  <View
                    key={i}
                    style={[
                      styles.phraseItem,
                      i < category.phrases.length - 1 && styles.phraseBorder,
                    ]}
                  >
                    <Text style={styles.phraseJp}>{phrase.jp}</Text>
                    <Text style={styles.phraseRomaji}>{phrase.romaji}</Text>
                    <Text style={styles.phraseVn}>{phrase.vn}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}

        {/* Learn More with AI */}
        <TouchableOpacity
          style={styles.aiCard}
          onPress={() =>
            navigation.navigate('AIChat', {
              title: 'Học tiếng Nhật với AI',
              prefilledQuestion:
                'Tôi là người Việt Nam đang sinh sống tại Nhật. Hãy giúp tôi học tiếng Nhật theo cách thực dụng nhất. Tôi muốn bắt đầu với những mẫu câu cần thiết cho: đi làm, mua sắm, và giao tiếp hàng ngày. Hãy giải thích bằng tiếng Việt và có ví dụ cụ thể.',
            })
          }
        >
          <View style={styles.aiLeft}>
            <View style={styles.aiIconBg}>
              <Ionicons name="sparkles" size={22} color={Colors.white} />
            </View>
            <View>
              <Text style={styles.aiTitle}>Học tiếng Nhật với AI</Text>
              <Text style={styles.aiSub}>Luyện tập theo tình huống thực tế</Text>
            </View>
          </View>
          <Ionicons name="arrow-forward-circle" size={28} color={Colors.primary} />
        </TouchableOpacity>

        {/* JLPT Info */}
        <View style={styles.jlptCard}>
          <Text style={styles.jlptTitle}>Cấp độ JLPT</Text>
          {[
            { level: 'N5', desc: 'Cơ bản - Hiểu câu đơn giản', color: '#27AE60' },
            { level: 'N4', desc: 'Sơ cấp - Giao tiếp hàng ngày', color: '#2980B9' },
            { level: 'N3', desc: 'Trung cấp - Hiểu văn phong thông thường', color: '#8E44AD' },
            { level: 'N2', desc: 'Cao cấp - Làm việc được bằng tiếng Nhật', color: '#D35400' },
            { level: 'N1', desc: 'Thành thạo - Hiểu mọi tình huống', color: '#C0392B' },
          ].map((item) => (
            <View key={item.level} style={styles.jlptRow}>
              <View style={[styles.jlptBadge, { backgroundColor: item.color }]}>
                <Text style={styles.jlptLevel}>{item.level}</Text>
              </View>
              <Text style={styles.jlptDesc}>{item.desc}</Text>
            </View>
          ))}
        </View>

        <View style={{ height: 24 }} />
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
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.white,
  },
  headerSub: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 4,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -16,
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  wordCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 18,
    marginBottom: 8,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 5,
    borderWidth: 1,
    borderColor: Colors.primary + '20',
  },
  wordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  wotdBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#FEF9EC',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FAD7A0',
  },
  wotdText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#D68910',
  },
  wordNav: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  navBtn: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wordCount: {
    fontSize: 12,
    color: Colors.textMuted,
    fontWeight: '600',
    minWidth: 30,
    textAlign: 'center',
  },
  wordMain: {
    alignItems: 'center',
    marginBottom: 16,
  },
  wordJp: {
    fontSize: 44,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  wordReading: {
    fontSize: 18,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  wordRomaji: {
    fontSize: 14,
    color: Colors.textMuted,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  meaningBadge: {
    backgroundColor: Colors.accent,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  wordMeaning: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.primary,
  },
  exampleBox: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary,
  },
  exampleLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  exampleJp: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  exampleRomaji: {
    fontSize: 12,
    color: Colors.textMuted,
    fontStyle: 'italic',
    marginBottom: 4,
  },
  exampleVn: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  wordActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  romajiToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 10,
    backgroundColor: Colors.accent,
  },
  romajiToggleText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.primary,
  },
  learnMoreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
  },
  learnMoreText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.white,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginTop: 16,
    marginBottom: 12,
  },
  categoryCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginBottom: 10,
    overflow: 'hidden',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
  },
  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  categoryIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  countBadge: {
    backgroundColor: Colors.accent,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  countText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primary,
  },
  phrasesList: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingHorizontal: 14,
  },
  phraseItem: {
    paddingVertical: 12,
  },
  phraseBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  phraseJp: {
    fontSize: 16,
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
  aiCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: Colors.primary + '30',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  aiLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  aiIconBg: {
    width: 46,
    height: 46,
    borderRadius: 13,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  aiTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  aiSub: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  jlptCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 8,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  jlptTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  jlptRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  jlptBadge: {
    width: 40,
    height: 26,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  jlptLevel: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.white,
  },
  jlptDesc: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
});
