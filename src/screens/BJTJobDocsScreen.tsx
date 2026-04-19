import React from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '../constants/colors';
import { BJT_CV_TEMPLATES } from '../constants/content';

export default function BJTJobDocsScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.title}>Hồ sơ xin việc</Text>
          <Text style={styles.subtitle}>
            Mẫu CV tiếng Nhật từ tài liệu BJT, tách riêng thành Rirekisho và Shokumukeirekisho để xem cấu trúc và lưu ý.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>{BJT_CV_TEMPLATES.rirekisho.title}</Text>
          <Text style={styles.body}>{BJT_CV_TEMPLATES.rirekisho.description}</Text>
          <Text style={styles.blockTitle}>Các trường cần có</Text>
          {BJT_CV_TEMPLATES.rirekisho.fields?.map((field) => (
            <View key={field.field_jp} style={styles.itemBlock}>
              <Text style={styles.itemTitle}>{field.field_jp} | {field.field_vi}</Text>
              <Text style={styles.body}>{field.note}</Text>
            </View>
          ))}
          <View style={styles.tipBox}>
            <Text style={styles.tipText}>{BJT_CV_TEMPLATES.rirekisho.tips}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>{BJT_CV_TEMPLATES.shokumukeirekisho.title}</Text>
          <Text style={styles.body}>{BJT_CV_TEMPLATES.shokumukeirekisho.description}</Text>
          <Text style={styles.blockTitle}>Các phần chính</Text>
          {BJT_CV_TEMPLATES.shokumukeirekisho.sections?.map((section) => (
            <View key={section.section_jp} style={styles.itemBlock}>
              <Text style={styles.itemTitle}>{section.section_jp} | {section.section_vi}</Text>
              <Text style={styles.body}>{section.note}</Text>
            </View>
          ))}
          <View style={styles.tipBox}>
            <Text style={styles.tipText}>{BJT_CV_TEMPLATES.shokumukeirekisho.tips}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 16, paddingBottom: 108 },
  hero: { marginBottom: 14 },
  title: { fontSize: 24, fontWeight: '800', color: Colors.textPrimary },
  subtitle: { marginTop: 8, fontSize: 13, lineHeight: 20, color: Colors.textSecondary },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardTitle: { fontSize: 18, fontWeight: '800', color: Colors.textPrimary },
  blockTitle: { marginTop: 12, marginBottom: 8, fontSize: 11, fontWeight: '800', color: Colors.textMuted, textTransform: 'uppercase' },
  itemBlock: { marginBottom: 10 },
  itemTitle: { fontSize: 13, fontWeight: '700', color: Colors.textPrimary, lineHeight: 19, marginBottom: 4 },
  body: { fontSize: 13, color: Colors.textSecondary, lineHeight: 19 },
  tipBox: {
    marginTop: 8,
    padding: 12,
    borderRadius: 12,
    backgroundColor: Colors.accent,
  },
  tipText: { fontSize: 12, color: Colors.primaryDark, lineHeight: 18 },
});
