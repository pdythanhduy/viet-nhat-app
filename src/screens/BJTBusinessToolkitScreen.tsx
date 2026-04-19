import React, { useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '../constants/colors';
import { BJT_BUSINESS_MANNERS, BJT_EMAIL_TEMPLATES } from '../constants/content';

type TabId = 'email' | 'manners';

export default function BJTBusinessToolkitScreen() {
  const [tab, setTab] = useState<TabId>('email');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.title}>Công cụ kinh doanh</Text>
          <Text style={styles.subtitle}>
            Tài nguyên mẫu từ sách BJT: email dùng trong công việc và các quy tắc tác phong để tránh lỗi cơ bản.
          </Text>
        </View>

        <View style={styles.tabRow}>
          <TouchableOpacity
            style={[styles.tabButton, tab === 'email' && styles.tabButtonActive]}
            onPress={() => setTab('email')}
          >
            <Text style={[styles.tabText, tab === 'email' && styles.tabTextActive]}>Mẫu email</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, tab === 'manners' && styles.tabButtonActive]}
            onPress={() => setTab('manners')}
          >
            <Text style={[styles.tabText, tab === 'manners' && styles.tabTextActive]}>Tác phong công sở</Text>
          </TouchableOpacity>
        </View>

        {tab === 'email'
          ? BJT_EMAIL_TEMPLATES.map((item) => (
              <View key={item.id} style={styles.card}>
                <Text style={styles.level}>{item.level}</Text>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSubtitle}>{item.titleJp}</Text>
                <View style={styles.templateBox}>
                  <Text style={styles.templateText}>{item.templateJp}</Text>
                </View>
                <Text style={styles.blockTitle}>Cụm từ chính</Text>
                {item.keyPhrases.map((phrase) => (
                  <View key={phrase} style={styles.bulletRow}>
                    <View style={styles.bullet} />
                    <Text style={styles.bulletText}>{phrase}</Text>
                  </View>
                ))}
              </View>
            ))
          : BJT_BUSINESS_MANNERS.map((item) => (
              <View key={item.id} style={styles.card}>
                <Text style={styles.level}>{item.category}</Text>
                <Text style={styles.cardTitle}>{item.categoryVi}</Text>
                <Text style={styles.bodyText}>{item.description}</Text>
                <Text style={styles.blockTitle}>Lỗi thường gặp</Text>
                {item.mistakes.map((mistake) => (
                  <View key={mistake} style={styles.bulletRow}>
                    <View style={[styles.bullet, { backgroundColor: Colors.warning }]} />
                    <Text style={styles.bulletText}>{mistake}</Text>
                  </View>
                ))}
              </View>
            ))}
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
  tabRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
  },
  tabButtonActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  tabText: { fontSize: 12, fontWeight: '800', color: Colors.textPrimary },
  tabTextActive: { color: Colors.white },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  level: { fontSize: 11, fontWeight: '800', color: Colors.primary, textTransform: 'uppercase' },
  cardTitle: { marginTop: 6, fontSize: 18, fontWeight: '800', color: Colors.textPrimary },
  cardSubtitle: { marginTop: 4, fontSize: 13, color: Colors.textSecondary },
  templateBox: {
    marginTop: 12,
    borderRadius: 12,
    backgroundColor: Colors.background,
    padding: 12,
  },
  templateText: { fontSize: 13, color: Colors.textPrimary, lineHeight: 20 },
  blockTitle: { marginTop: 12, marginBottom: 8, fontSize: 11, fontWeight: '800', color: Colors.textMuted, textTransform: 'uppercase' },
  bulletRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginBottom: 7 },
  bullet: { width: 6, height: 6, borderRadius: 3, marginTop: 6, backgroundColor: Colors.primary },
  bulletText: { flex: 1, fontSize: 13, color: Colors.textSecondary, lineHeight: 19 },
  bodyText: { marginTop: 10, fontSize: 13, color: Colors.textSecondary, lineHeight: 19 },
});
