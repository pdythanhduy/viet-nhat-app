import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Linking,
  Alert,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../constants/colors';

const ADMIN_EMAIL = 'thanhduy8vn@gmail.com';

const FEEDBACK_TYPES: {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}[] = [
  { id: 'bug', label: 'Lỗi / Bug', icon: 'bug', color: '#E74C3C' },
  { id: 'content', label: 'Nội dung sai', icon: 'alert-circle', color: '#E67E22' },
  { id: 'feature', label: 'Góp ý tính năng', icon: 'bulb', color: '#2980B9' },
  { id: 'other', label: 'Khác', icon: 'chatbubble-ellipses', color: '#8E44AD' },
];

const STAR_LABELS = ['', 'Rất tệ', 'Không tốt', 'Bình thường', 'Tốt', 'Rất tốt'];

export default function FeedbackScreen() {
  const navigation = useNavigation();
  const [stars, setStars] = useState(0);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const canSubmit = stars > 0 && selectedType !== null;

  const handleSubmit = () => {
    if (!canSubmit) {
      Alert.alert('Thiếu thông tin', 'Vui lòng chọn số sao và loại phản hồi trước khi gửi.');
      return;
    }

    const typeLabel = FEEDBACK_TYPES.find((t) => t.id === selectedType)?.label ?? selectedType;
    const starEmoji = '⭐'.repeat(stars);
    const subject = `[Viet-Nhat] Phản hồi: ${typeLabel} - ${stars}/5 sao`;
    const body = [
      `Đánh giá tổng thể: ${starEmoji} (${stars}/5 - ${STAR_LABELS[stars]})`,
      `Loại phản hồi: ${typeLabel}`,
      '',
      'Nội dung chi tiết:',
      text.trim() || '(người dùng không để lại chi tiết)',
      '',
      '---',
      'Gửi từ ứng dụng Viet-Nhat',
    ].join('\n');

    const mailto = `mailto:${ADMIN_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    Linking.canOpenURL(mailto)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(mailto).then(() => setSubmitted(true));
        }

        Alert.alert(
          'Không tìm thấy app email',
          `Vui lòng gửi phản hồi trực tiếp đến:\n${ADMIN_EMAIL}`,
          [{ text: 'OK' }]
        );
      })
      .catch(() => {
        Alert.alert('Lỗi', `Không thể mở app email. Vui lòng liên hệ ${ADMIN_EMAIL}`);
      });
  };

  if (submitted) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
        <View style={styles.thankYouContainer}>
          <View style={styles.thankYouIconBg}>
            <Ionicons name="heart" size={52} color={Colors.primary} />
          </View>
          <Text style={styles.thankYouTitle}>Cảm ơn bạn</Text>
          <Text style={styles.thankYouDesc}>
            Phản hồi của bạn giúp chúng tôi cải thiện ứng dụng mỗi ngày. Chúng tôi sẽ đọc và cân
            nhắc kỹ từng góp ý.
          </Text>
          <TouchableOpacity style={styles.doneBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.doneBtnText}>Quay lại</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.introBox}>
          <View style={styles.introIconBg}>
            <Ionicons name="chatbubble-ellipses" size={28} color={Colors.primary} />
          </View>
          <View style={styles.introTexts}>
            <Text style={styles.introTitle}>Góp ý cho chúng tôi</Text>
            <Text style={styles.introDesc}>
              Mỗi phản hồi đều được đọc và cân nhắc cải thiện. Cảm ơn bạn.
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Đánh giá tổng thể</Text>
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((n) => (
              <TouchableOpacity key={n} onPress={() => setStars(n)} activeOpacity={0.7}>
                <Ionicons
                  name={n <= stars ? 'star' : 'star-outline'}
                  size={40}
                  color={n <= stars ? '#F39C12' : Colors.border}
                />
              </TouchableOpacity>
            ))}
          </View>
          {stars > 0 && <Text style={styles.starLabel}>{STAR_LABELS[stars]}</Text>}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Loại phản hồi</Text>
          <View style={styles.typeGrid}>
            {FEEDBACK_TYPES.map((type) => {
              const isSelected = selectedType === type.id;
              return (
                <TouchableOpacity
                  key={type.id}
                  style={[
                    styles.typeChip,
                    isSelected
                      ? { backgroundColor: type.color, borderColor: type.color }
                      : { backgroundColor: Colors.background, borderColor: Colors.border },
                  ]}
                  onPress={() => setSelectedType(type.id)}
                  activeOpacity={0.8}
                >
                  <Ionicons
                    name={type.icon}
                    size={18}
                    color={isSelected ? Colors.white : type.color}
                  />
                  <Text
                    style={[
                      styles.typeChipText,
                      { color: isSelected ? Colors.white : Colors.textPrimary },
                    ]}
                  >
                    {type.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Nội dung chi tiết <Text style={styles.optional}>(tùy chọn)</Text>
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder="Mô tả vấn đề, góp ý hoặc câu hỏi của bạn..."
            placeholderTextColor={Colors.textMuted}
            multiline
            numberOfLines={5}
            value={text}
            onChangeText={setText}
            textAlignVertical="top"
          />
          <Text style={styles.charCount}>{text.length} ký tự</Text>
        </View>

        <TouchableOpacity
          style={[styles.submitBtn, !canSubmit && styles.submitBtnDisabled]}
          onPress={handleSubmit}
          activeOpacity={0.85}
        >
          <Ionicons name="send" size={18} color={Colors.white} />
          <Text style={styles.submitBtnText}>Gửi phản hồi</Text>
        </TouchableOpacity>

        {!canSubmit && (
          <Text style={styles.requiredHint}>Vui lòng chọn số sao và loại phản hồi</Text>
        )}

        <View style={styles.privacyBox}>
          <Ionicons name="lock-closed-outline" size={14} color={Colors.textMuted} />
          <Text style={styles.privacyText}>
            Phản hồi được gửi qua email đến người phát triển. Ứng dụng không tự thu thập dữ liệu
            cá nhân từ form này ngoài nội dung bạn chủ động gửi.
          </Text>
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { flex: 1 },
  scrollContent: { padding: 16 },
  introBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: Colors.accent,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.primary + '25',
  },
  introIconBg: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: Colors.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
  },
  introTexts: { flex: 1 },
  introTitle: { fontSize: 15, fontWeight: '800', color: Colors.primary, marginBottom: 3 },
  introDesc: { fontSize: 12, color: Colors.textSecondary, lineHeight: 18 },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTitle: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary, marginBottom: 14 },
  starsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 8,
  },
  starLabel: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '700',
    color: '#F39C12',
  },
  typeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  typeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1.5,
  },
  typeChipText: { fontSize: 13, fontWeight: '700' },
  textInput: {
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: 14,
    fontSize: 14,
    color: Colors.textPrimary,
    lineHeight: 21,
    minHeight: 110,
    backgroundColor: Colors.background,
  },
  charCount: {
    textAlign: 'right',
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 6,
  },
  optional: { fontWeight: '400', color: Colors.textMuted },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 15,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  submitBtnDisabled: { opacity: 0.45 },
  submitBtnText: { fontSize: 16, fontWeight: '800', color: Colors.white },
  requiredHint: {
    textAlign: 'center',
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 10,
  },
  privacyBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginTop: 16,
    paddingHorizontal: 4,
  },
  privacyText: {
    flex: 1,
    fontSize: 11,
    color: Colors.textMuted,
    lineHeight: 17,
  },
  thankYouContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    gap: 14,
  },
  thankYouIconBg: {
    width: 96,
    height: 96,
    borderRadius: 28,
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  thankYouTitle: { fontSize: 26, fontWeight: '800', color: Colors.textPrimary },
  thankYouDesc: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  doneBtn: {
    marginTop: 8,
    backgroundColor: Colors.primary,
    paddingHorizontal: 48,
    paddingVertical: 14,
    borderRadius: 14,
  },
  doneBtnText: { fontSize: 15, fontWeight: '700', color: Colors.white },
});
