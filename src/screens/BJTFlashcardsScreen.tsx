import React, { useEffect, useMemo, useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { Colors } from '../constants/colors';
import { BJT_FLASHCARD_SETS } from '../constants/content/bjt';
import { RootStackParamList } from '../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type FlashcardLevel = 'all' | (typeof BJT_FLASHCARD_SETS)[number]['level'];

type StudyRoute =
  | 'BJTVocabulary'
  | 'BJTKeigo'
  | 'BJTLanguageAssets'
  | 'BJTBusinessToolkit'
  | 'BJTScenarios';

function getStudyRoute(setId: string): { route: StudyRoute; label: string; note: string } {
  if (setId === 'fc03' || setId === 'fc04') {
    return {
      route: 'BJTKeigo',
      label: 'Mở tham khảo Keigo',
      note: 'Bộ này trùng với bảng sonkeigo và kenjougo đã có sẵn trong tài liệu gốc.',
    };
  }

  if (setId === 'fc10' || setId === 'fc11' || setId === 'fc12') {
    return {
      route: 'BJTLanguageAssets',
      label: 'Mở ngữ liệu',
      note: 'Bộ này đã được bao phủ bởi ngữ pháp và kanji từ bộ ultimate.',
    };
  }

  if (setId === 'fc05') {
    return {
      route: 'BJTBusinessToolkit',
      label: 'Mở công cụ kinh doanh',
      note: 'Bộ này gần với email mẫu và manners, không cần tạo card ảo ngoài nguồn gốc.',
    };
  }

  if (setId === 'fc13') {
    return {
      route: 'BJTScenarios',
      label: 'Mở kho tình huống',
      note: 'Bộ mẫu câu business này nên học cùng tình huống để dùng ngữ cảnh thực tế.',
    };
  }

  return {
    route: 'BJTVocabulary',
    label: 'Mở gói từ vựng',
    note: 'Bộ set hiện mới có metadata trong file ultimate, vì vậy app điều hướng sang ngân hàng từ vựng gốc thay vì tự sinh flashcard.',
  };
}

export default function BJTFlashcardsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [level, setLevel] = useState<FlashcardLevel>('all');
  const [activeId, setActiveId] = useState(BJT_FLASHCARD_SETS[0]?.set_id ?? '');

  const levels = useMemo(
    () => ['all', ...Array.from(new Set(BJT_FLASHCARD_SETS.map((item) => item.level)))] as FlashcardLevel[],
    []
  );

  const sets = useMemo(
    () => (level === 'all' ? BJT_FLASHCARD_SETS : BJT_FLASHCARD_SETS.filter((item) => item.level === level)),
    [level]
  );

  useEffect(() => {
    if (!sets.some((item) => item.set_id === activeId)) {
      setActiveId(sets[0]?.set_id ?? '');
    }
  }, [activeId, sets]);

  const activeSet = sets.find((item) => item.set_id === activeId) ?? sets[0] ?? null;
  const plan = activeSet ? getStudyRoute(activeSet.set_id) : null;
  const totalCards = sets.reduce((sum, item) => sum + item.card_count, 0);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.title}>Bộ flashcard</Text>
          <Text style={styles.subtitle}>
            Bộ ultimate có 15 set flashcard ở mức metadata. App giữ đúng danh mục này và dẫn sang nguồn học thật trong app, không tự tạo thêm card ngoài tài liệu.
          </Text>
        </View>

        <View style={styles.summaryCard}>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Bộ</Text>
            <Text style={styles.metricValue}>{sets.length}</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Thẻ dự kiến</Text>
            <Text style={styles.metricValue}>{totalCards}</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Đang chọn</Text>
            <Text style={styles.metricValueSmall}>{level === 'all' ? 'Tất cả' : level}</Text>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
          {levels.map((item) => {
            const active = item === level;
            const count = item === 'all' ? BJT_FLASHCARD_SETS.length : BJT_FLASHCARD_SETS.filter((entry) => entry.level === item).length;
            return (
              <TouchableOpacity
                key={item}
                style={[styles.chip, active && styles.chipActive]}
                onPress={() => setLevel(item)}
              >
                <Text style={[styles.chipText, active && styles.chipTextActive]}>
                  {item === 'all' ? 'Tất cả' : item} ({count})
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.noteCard}>
          <Ionicons name="information-circle-outline" size={18} color={Colors.primary} />
          <Text style={styles.noteText}>
            Metadata flashcard trong file ultimate chỉ mô tả bộ, level và số lượng thẻ. Màn này dùng metadata đó để chia lộ trình học và điều hướng sang nguồn nội dung gốc đã có sẵn.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Danh sách bộ</Text>
        <View style={styles.grid}>
          {sets.map((item) => {
            const active = item.set_id === activeSet?.set_id;
            return (
              <TouchableOpacity
                key={item.set_id}
                style={[styles.card, active && styles.cardActive]}
                onPress={() => setActiveId(item.set_id)}
              >
                <Text style={styles.level}>{item.level}</Text>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.count}>{item.card_count} thẻ</Text>
                <Text style={styles.bodyText}>{item.description}</Text>
                <Text style={styles.meta}>{item.set_id}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {activeSet && plan ? (
          <View style={styles.detailCard}>
            <Text style={styles.sectionTitle}>Lộ trình học</Text>
            <View style={styles.rowBetween}>
              <View style={styles.flex}>
                <Text style={styles.detailTitle}>{activeSet.name}</Text>
                <Text style={styles.detailMeta}>
                  {activeSet.level} • {activeSet.card_count} thẻ • {activeSet.set_id}
                </Text>
              </View>
              <Ionicons name="layers-outline" size={20} color={Colors.primary} />
            </View>
            <Text style={styles.detailDescription}>{activeSet.description}</Text>

            <View style={styles.studyBox}>
              <Text style={styles.studyLabel}>Nguồn học được map</Text>
              <Text style={styles.studyTitle}>{plan.label}</Text>
              <Text style={styles.studyText}>{plan.note}</Text>
            </View>

            <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate(plan.route)}>
              <Ionicons name="arrow-forward-circle-outline" size={18} color={Colors.white} />
              <Text style={styles.primaryButtonText}>{plan.label}</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 16, paddingBottom: 108 },
  hero: { marginBottom: 14 },
  title: { fontSize: 24, fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold', color: Colors.textPrimary },
  subtitle: { marginTop: 8, fontSize: 13, lineHeight: 20, color: Colors.textSecondary },
  summaryCard: { flexDirection: 'row', gap: 10, marginBottom: 12 },
  metricCard: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  metricLabel: { fontSize: 11, fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold', color: Colors.textSecondary, marginBottom: 6 },
  metricValue: { fontSize: 24, fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold', color: Colors.textPrimary },
  metricValueSmall: { fontSize: 18, fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold', color: Colors.textPrimary },
  chips: { gap: 8, paddingBottom: 8, paddingRight: 12 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.card,
  },
  chipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  chipText: { fontSize: 12, fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold', color: Colors.textPrimary },
  chipTextActive: { color: Colors.white },
  noteCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: Colors.accent,
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
  },
  noteText: { flex: 1, fontSize: 12, lineHeight: 18, color: Colors.primaryDark },
  sectionTitle: { marginBottom: 10, fontSize: 16, fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold', color: Colors.textPrimary },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  card: {
    width: '47%',
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardActive: { borderColor: Colors.primary, backgroundColor: Colors.accent },
  level: { fontSize: 11, fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold', color: Colors.primary, textTransform: 'uppercase' },
  cardTitle: { marginTop: 8, fontSize: 16, fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold', color: Colors.textPrimary },
  count: { marginTop: 6, fontSize: 20, fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold', color: Colors.primaryDark },
  bodyText: { marginTop: 8, fontSize: 12, lineHeight: 18, color: Colors.textSecondary },
  meta: { marginTop: 10, fontSize: 11, fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold', color: Colors.textMuted, textTransform: 'uppercase' },
  detailCard: {
    marginTop: 16,
    backgroundColor: Colors.card,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  flex: { flex: 1 },
  detailTitle: { fontSize: 18, fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold', color: Colors.textPrimary },
  detailMeta: { marginTop: 4, fontSize: 12, color: Colors.textSecondary },
  detailDescription: { marginTop: 10, fontSize: 13, lineHeight: 19, color: Colors.textPrimary },
  studyBox: {
    marginTop: 14,
    borderRadius: 14,
    backgroundColor: Colors.background,
    padding: 14,
  },
  studyLabel: { fontSize: 11, fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold', color: Colors.textMuted, textTransform: 'uppercase' },
  studyTitle: { marginTop: 6, fontSize: 14, fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold', color: Colors.textPrimary },
  studyText: { marginTop: 6, fontSize: 12, lineHeight: 18, color: Colors.textSecondary },
  primaryButton: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 14,
    paddingVertical: 14,
    backgroundColor: Colors.primary,
  },
  primaryButtonText: { color: Colors.white, fontSize: 14, fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold' },
});
