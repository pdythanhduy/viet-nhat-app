// Dịch câu — simple public sentence translator (Azure Translator via
// azure-translate-proxy). Deliberately scoped to ONE sentence with a hard
// character cap, unlike the owner-only Furigana reader (Claude, full
// articles) — this is the free/near-zero-cost path for everyday users.

import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { Colors } from '../constants/colors';
import { isAzureTranslateConfigured, translateSentenceViaAzure, MAX_TRANSLATE_CHARS } from '../services/azureTranslate';

export default function SentenceTranslateScreen() {
  const [input, setInput] = useState('');
  const [translation, setTranslation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const configured = isAzureTranslateConfigured();

  const handleTranslate = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setLoading(true);
    setError(null);
    setTranslation('');
    try {
      const result = await translateSentenceViaAzure(trimmed);
      setTranslation(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không dịch được câu này.');
    } finally {
      setLoading(false);
    }
  };

  const copyTranslation = () => {
    if (!translation) return;
    Clipboard.setStringAsync(translation).catch(() => {});
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Dịch câu tiếng Nhật</Text>
        <Text style={styles.subtitle}>
          Nhập 1 câu tiếng Nhật (tối đa {MAX_TRANSLATE_CHARS} ký tự) để dịch sang tiếng Việt.
        </Text>

        {!configured ? (
          <View style={styles.noteCard}>
            <Text style={styles.vnText}>Chưa cấu hình kết nối. Vui lòng thử lại sau.</Text>
          </View>
        ) : (
          <>
            <View style={styles.card}>
              <TextInput
                style={styles.input}
                value={input}
                onChangeText={setInput}
                placeholder="Dán hoặc nhập một câu tiếng Nhật ở đây..."
                placeholderTextColor={Colors.textMuted}
                multiline
                maxLength={MAX_TRANSLATE_CHARS}
              />
              <Text style={styles.counter}>
                {input.length}/{MAX_TRANSLATE_CHARS}
              </Text>
              <TouchableOpacity
                style={[styles.button, (!input.trim() || loading) && styles.buttonDisabled]}
                onPress={handleTranslate}
                disabled={!input.trim() || loading}
              >
                {loading ? (
                  <ActivityIndicator color={Colors.white} size="small" />
                ) : (
                  <>
                    <Ionicons name="language-outline" size={16} color={Colors.white} />
                    <Text style={styles.buttonText}>Dịch</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>

            {error ? (
              <View style={styles.errorCard}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            {translation ? (
              <View style={styles.card}>
                <View style={styles.resultHeader}>
                  <Text style={styles.metaLabel}>Bản dịch</Text>
                  <TouchableOpacity onPress={copyTranslation}>
                    <Ionicons name="copy-outline" size={16} color={Colors.primary} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.resultText}>{translation}</Text>
              </View>
            ) : null}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 16, paddingBottom: 32 },
  title: { fontSize: 20, fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold', color: Colors.textPrimary },
  subtitle: { marginTop: 4, marginBottom: 16, fontSize: 13, color: Colors.textSecondary, lineHeight: 18 },
  card: { backgroundColor: Colors.card, borderRadius: 14, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: Colors.border },
  input: { minHeight: 100, fontSize: 15, color: Colors.textPrimary, textAlignVertical: 'top' },
  counter: { marginTop: 6, alignSelf: 'flex-end', fontSize: 11, color: Colors.textMuted },
  button: { marginTop: 12, flexDirection: 'row', gap: 6, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.primary, borderRadius: 10, paddingVertical: 10 },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { color: Colors.white, fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold', fontSize: 14 },
  resultHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  metaLabel: { fontSize: 11, fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold', color: Colors.primary },
  resultText: { fontSize: 15, lineHeight: 21, color: Colors.textPrimary },
  errorCard: { backgroundColor: Colors.dangerLight, borderRadius: 10, padding: 12, marginBottom: 12 },
  errorText: { color: Colors.danger, fontSize: 13, lineHeight: 18 },
  noteCard: { backgroundColor: Colors.warningLight, borderRadius: 10, padding: 12 },
  vnText: { fontSize: 13, lineHeight: 18, color: Colors.textSecondary },
});
