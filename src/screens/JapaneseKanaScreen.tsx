import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import AudioButton from '../components/AudioButton';
import { Colors } from '../constants/colors';
import { HIRAGANA_ROWS, KATAKANA_ROWS } from '../constants/content/kana';
import { RootStackParamList } from '../navigation/AppNavigator';
import { stopJapaneseAudio } from '../utils/audio';

type KanaMode = 'hiragana' | 'katakana';
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function JapaneseKanaScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [mode, setMode] = useState<KanaMode>('hiragana');
  const rows = mode === 'hiragana' ? HIRAGANA_ROWS : KATAKANA_ROWS;
  const accentColor = mode === 'hiragana' ? Colors.primary : '#E67E22';

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        void stopJapaneseAudio();
      };
    }, [])
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={[styles.header, { backgroundColor: accentColor }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={Colors.white} />
        </TouchableOpacity>
        <View style={styles.headerText}>
          <Text style={styles.headerTitle}>Bảng chữ tiếng Nhật</Text>
          <Text style={styles.headerDesc}>
            Học nền tảng Hiragana và Katakana theo từng hàng âm để dễ nhớ, dễ tra lại trước khi học từ vựng.
          </Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.switchRow}>
          <TouchableOpacity
            style={[styles.switchBtn, mode === 'hiragana' && { backgroundColor: Colors.primary, borderColor: Colors.primary }]}
            onPress={() => setMode('hiragana')}
          >
            <Text style={[styles.switchText, mode === 'hiragana' && styles.switchTextActive]}>Hiragana</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.switchBtn, mode === 'katakana' && { backgroundColor: '#E67E22', borderColor: '#E67E22' }]}
            onPress={() => setMode('katakana')}
          >
            <Text style={[styles.switchText, mode === 'katakana' && styles.switchTextActive]}>Katakana</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.noteBox}>
          <Ionicons name="information-circle-outline" size={16} color={accentColor} />
          <Text style={styles.noteText}>
            Hiragana dùng rất nhiều trong từ thuần Nhật và ngữ pháp. Katakana thường gặp ở từ mượn, tên riêng nước ngoài, menu và sản phẩm.
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.quizButton, { backgroundColor: accentColor }]}
          onPress={() => navigation.navigate('JapaneseKanaQuiz', { mode })}
        >
          <View style={styles.quizButtonText}>
            <Text style={styles.quizButtonTitle}>Làm quiz {mode === 'hiragana' ? 'Hiragana' : 'Katakana'}</Text>
            <Text style={styles.quizButtonDesc}>Kiểm tra phản xạ đọc kana ngay sau khi học từng hàng âm.</Text>
          </View>
          <Ionicons name="arrow-forward" size={18} color={Colors.white} />
        </TouchableOpacity>

        {rows.map((row) => (
          <View key={`${mode}-${row.label}`} style={styles.rowCard}>
            <Text style={styles.rowTitle}>{row.label}</Text>
            <View style={styles.kanaGrid}>
              {row.entries.map((entry) => (
                <View key={`${mode}-${entry.kana}`} style={styles.kanaCard}>
                  <AudioButton
                    audioId={`kana:${mode}:${entry.kana}`}
                    text={entry.kana}
                    backgroundColor={Colors.white}
                    size={14}
                  />
                  <Text style={styles.kana}>{entry.kana}</Text>
                  <Text style={styles.romaji}>{entry.romaji}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}

        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>Cách dùng hiệu quả</Text>
          <Text style={styles.tipText}>1. Học theo từng hàng âm thay vì nhìn cả bảng một lúc.</Text>
          <Text style={styles.tipText}>2. Đọc romaji một vài lần rồi cố nhìn kana trực tiếp.</Text>
          <Text style={styles.tipText}>3. Sau đó quay lại phần từ vựng và quiz để gắn chữ với tình huống thật.</Text>
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 22,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  backBtn: { paddingTop: 2 },
  headerText: { flex: 1 },
  headerTitle: { fontSize: 22, fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold', color: Colors.white, marginBottom: 6 },
  headerDesc: { fontSize: 13, lineHeight: 19, color: 'rgba(255,255,255,0.88)' },
  content: {
    flex: 1,
    marginTop: -10,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: Colors.background,
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  switchRow: { flexDirection: 'row', gap: 10, marginBottom: 12 },
  switchBtn: {
    flex: 1,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
  },
  switchText: { fontSize: 14, fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold', color: Colors.textPrimary },
  switchTextActive: { color: Colors.white },
  noteBox: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 12,
  },
  noteText: { flex: 1, fontSize: 12, lineHeight: 18, color: Colors.textSecondary },
  quizButton: {
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quizButtonText: { flex: 1, paddingRight: 12 },
  quizButtonTitle: { fontSize: 15, fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold', color: Colors.white, marginBottom: 4 },
  quizButtonDesc: { fontSize: 12, lineHeight: 17, color: 'rgba(255,255,255,0.88)' },
  rowCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 10,
  },
  rowTitle: { fontSize: 14, fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold', color: Colors.textPrimary, marginBottom: 10 },
  kanaGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  kanaCard: {
    minWidth: 62,
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: Colors.background,
    alignItems: 'center',
  },
  kana: { fontSize: 26, fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold', color: Colors.textPrimary, marginBottom: 4 },
  romaji: { fontSize: 12, color: Colors.textSecondary, fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold' },
  tipCard: {
    backgroundColor: Colors.accent,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: `${Colors.primary}25`,
    marginTop: 4,
  },
  tipTitle: { fontSize: 14, fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold', color: Colors.textPrimary, marginBottom: 8 },
  tipText: { fontSize: 12, lineHeight: 18, color: Colors.textSecondary, marginBottom: 6 },
});
