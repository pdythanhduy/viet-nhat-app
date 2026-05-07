import React, { useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '../constants/colors';
import { BJT_SCENARIO_LIBRARY } from '../constants/content/bjt';

export default function BJTScenariosScreen() {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const [expandedId, setExpandedId] = useState<string | null>(BJT_SCENARIO_LIBRARY[0]?.id ?? null);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <ScrollView style={styles.container} contentContainerStyle={[styles.content, isTablet && styles.contentTablet]}>
        <View style={styles.hero}>
          <Text style={styles.title}>Kho tình huống</Text>
          <Text style={styles.subtitle}>
            Hội thoại mẫu từ tài liệu BJT. Mỗi tình huống giữ nguyên ngữ cảnh, lượt hội thoại và mẹo xử lý để
            luyện phản xạ trong bối cảnh công việc.
          </Text>
        </View>

        {BJT_SCENARIO_LIBRARY.map((item) => {
          const expanded = expandedId === item.id;
          return (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              activeOpacity={0.9}
              onPress={() => setExpandedId((prev) => (prev === item.id ? null : item.id))}
            >
              <View style={styles.cardHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.level}>{item.level}</Text>
                  <Text style={styles.titleVi}>{item.titleVi}</Text>
                  <Text style={styles.titleJp}>{item.titleJp}</Text>
                </View>
                <Ionicons
                  name={expanded ? 'chevron-up-outline' : 'chevron-down-outline'}
                  size={18}
                  color={Colors.textMuted}
                />
              </View>
              <Text style={styles.situation}>{item.situation}</Text>

              {expanded ? (
                <View style={styles.body}>
                  {item.dialogue.map((line, index) => (
                    <View key={`${item.id}-${index}`} style={styles.line}>
                      <Text style={styles.speaker}>{line.speaker}</Text>
                      <Text style={styles.jp}>{line.jp}</Text>
                      <Text style={styles.vi}>{line.vi}</Text>
                    </View>
                  ))}

                  <View style={styles.tipBox}>
                    <Ionicons name="bulb-outline" size={16} color={Colors.primary} />
                    <Text style={styles.tipText}>{item.tips}</Text>
                  </View>
                </View>
              ) : null}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 16, paddingBottom: 108 },
  contentTablet: {
    width: '100%',
    maxWidth: 900,
    alignSelf: 'center',
  },
  hero: { marginBottom: 14 },
  title: { fontSize: 24, fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold', color: Colors.textPrimary },
  subtitle: { marginTop: 8, fontSize: 13, lineHeight: 20, color: Colors.textSecondary },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  level: { fontSize: 11, fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold', color: Colors.primary, textTransform: 'uppercase' },
  titleVi: { marginTop: 4, fontSize: 17, fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold', color: Colors.textPrimary },
  titleJp: { marginTop: 4, fontSize: 13, color: Colors.textSecondary },
  situation: { marginTop: 10, fontSize: 13, color: Colors.textSecondary, lineHeight: 19 },
  body: { marginTop: 12, borderTopWidth: 1, borderTopColor: Colors.border, paddingTop: 12 },
  line: { marginBottom: 12 },
  speaker: { fontSize: 11, fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold', color: Colors.textMuted, textTransform: 'uppercase', marginBottom: 4 },
  jp: { fontSize: 14, fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold', color: Colors.textPrimary, lineHeight: 20 },
  vi: { marginTop: 4, fontSize: 13, color: Colors.textSecondary, lineHeight: 19 },
  tipBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginTop: 4,
    padding: 12,
    borderRadius: 12,
    backgroundColor: Colors.accent,
  },
  tipText: { flex: 1, fontSize: 12, color: Colors.primaryDark, lineHeight: 18 },
});
