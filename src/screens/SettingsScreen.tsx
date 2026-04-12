import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../constants/colors';
import { deleteClaudeApiKey, loadClaudeApiKey, saveClaudeApiKey } from '../utils/apiKeyStorage';
import { loadImportantDates } from '../utils/notifications';
import { RootStackParamList } from '../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function SettingsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [dateCount, setDateCount] = useState(0);
  const [apiKey, setApiKey] = useState('');
  const [savedKey, setSavedKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadApiKey();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadImportantDates().then((dates) => setDateCount(dates.length));
    }, [])
  );

  const loadApiKey = async () => {
    try {
      const key = await loadClaudeApiKey();
      if (key) {
        setSavedKey(key);
        setApiKey(key);
      }
    } catch {
      // ignore local read errors
    }
  };

  const saveApiKey = async () => {
    const trimmed = apiKey.trim();

    if (!trimmed) {
      Alert.alert('Lỗi', 'Vui lòng nhập API key trước khi lưu.');
      return;
    }

    if (!trimmed.startsWith('sk-ant-')) {
      Alert.alert(
        'API key không hợp lệ',
        'Claude API key phải bắt đầu bằng "sk-ant-". Vui lòng kiểm tra lại.'
      );
      return;
    }

    setIsSaving(true);
    try {
      await saveClaudeApiKey(trimmed);
      setSavedKey(trimmed);
      Alert.alert('Thành công', 'Đã lưu API key. Bạn có thể dùng AI Chat ngay bây giờ.');
    } catch {
      Alert.alert('Lỗi', 'Không thể lưu API key. Thử lại sau.');
    } finally {
      setIsSaving(false);
    }
  };

  const deleteApiKey = () => {
    Alert.alert(
      'Xóa API key',
      'Bạn có chắc muốn xóa API key không? Tính năng AI Chat sẽ ngừng hoạt động.',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: async () => {
            await deleteClaudeApiKey();
            setSavedKey('');
            setApiKey('');
          },
        },
      ]
    );
  };

  const maskedKey = savedKey
    ? `${savedKey.slice(0, 10)}****************${savedKey.slice(-4)}`
    : '';
  const hasKey = !!savedKey;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.pageHeader}>
        <Ionicons name="settings" size={28} color={Colors.primary} />
        <Text style={styles.pageTitle}>Cài đặt</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Trợ lý AI (Claude API)</Text>
        <Text style={styles.sectionDesc}>
          Để dùng tính năng AI Chat, bạn cần nhập API key từ Anthropic. Key được lưu trên thiết
          bị của bạn, không gửi về máy chủ riêng của app.
        </Text>

        <View style={[styles.statusBadge, hasKey ? styles.statusOk : styles.statusMissing]}>
          <Ionicons
            name={hasKey ? 'checkmark-circle' : 'alert-circle'}
            size={16}
            color={hasKey ? Colors.success : Colors.warning}
          />
          <Text style={[styles.statusText, hasKey ? styles.statusTextOk : styles.statusTextMissing]}>
            {hasKey ? `Đã cấu hình: ${maskedKey}` : 'Chưa có API key'}
          </Text>
        </View>

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={apiKey}
            onChangeText={setApiKey}
            placeholder="sk-ant-api03-..."
            placeholderTextColor={Colors.textMuted}
            secureTextEntry={!showKey}
            autoCapitalize="none"
            autoCorrect={false}
            spellCheck={false}
          />
          <TouchableOpacity style={styles.eyeBtn} onPress={() => setShowKey((value) => !value)}>
            <Ionicons
              name={showKey ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={Colors.textSecondary}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.saveBtn, isSaving && styles.saveBtnDisabled]}
          onPress={saveApiKey}
          disabled={isSaving}
        >
          <Ionicons name="save-outline" size={18} color={Colors.white} />
          <Text style={styles.saveBtnText}>{isSaving ? 'Đang lưu...' : 'Lưu API key'}</Text>
        </TouchableOpacity>

        {hasKey ? (
          <TouchableOpacity style={styles.deleteBtn} onPress={deleteApiKey}>
            <Ionicons name="trash-outline" size={16} color={Colors.danger} />
            <Text style={styles.deleteBtnText}>Xóa API key</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      <TouchableOpacity
        style={styles.section}
        onPress={() => navigation.navigate('ImportantDates')}
        activeOpacity={0.8}
      >
        <View style={styles.rowBetween}>
          <View style={styles.rowLeft}>
            <View style={styles.notifIcon}>
              <Ionicons name="notifications" size={20} color={Colors.primary} />
            </View>
            <View>
              <Text style={styles.sectionTitle}>Ngày quan trọng và nhắc nhở</Text>
              <Text style={styles.sectionDesc}>
                {dateCount === 0
                  ? 'Chưa có ngày nào được thêm'
                  : `${dateCount} ngày đang được theo dõi`}
              </Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
        </View>
      </TouchableOpacity>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cách lấy API key</Text>
        <View style={styles.step}>
          <View style={styles.stepNum}>
            <Text style={styles.stepNumText}>1</Text>
          </View>
          <Text style={styles.stepText}>
            Truy cập <Text style={styles.link}>console.anthropic.com</Text> trên trình duyệt
          </Text>
        </View>
        <View style={styles.step}>
          <View style={styles.stepNum}>
            <Text style={styles.stepNumText}>2</Text>
          </View>
          <Text style={styles.stepText}>Đăng ký tài khoản hoặc đăng nhập</Text>
        </View>
        <View style={styles.step}>
          <View style={styles.stepNum}>
            <Text style={styles.stepNumText}>3</Text>
          </View>
          <Text style={styles.stepText}>
            Vào mục <Text style={styles.bold}>API Keys</Text> và nhấn{' '}
            <Text style={styles.bold}>Create Key</Text>
          </Text>
        </View>
        <View style={styles.step}>
          <View style={styles.stepNum}>
            <Text style={styles.stepNumText}>4</Text>
          </View>
          <Text style={styles.stepText}>Copy key và dán vào ô bên trên</Text>
        </View>
        <View style={styles.noteBox}>
          <Ionicons name="information-circle-outline" size={16} color={Colors.primary} />
          <Text style={styles.noteText}>
            Hãy kiểm tra chính sách và mức giá hiện hành trực tiếp trên Anthropic trước khi dùng.
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.section}
        onPress={() => navigation.navigate('Feedback')}
        activeOpacity={0.8}
      >
        <View style={styles.rowBetween}>
          <View style={styles.rowLeft}>
            <View style={[styles.notifIcon, { backgroundColor: '#EBF5FB' }]}>
              <Ionicons name="chatbubble-ellipses" size={20} color="#2980B9" />
            </View>
            <View>
              <Text style={styles.sectionTitle}>Góp ý và phản hồi</Text>
              <Text style={styles.sectionDesc}>
                Báo lỗi, đề xuất tính năng hoặc liên hệ hỗ trợ
              </Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
        </View>
      </TouchableOpacity>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Thông tin ứng dụng</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Phiên bản</Text>
          <Text style={styles.infoValue}>1.0.0</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Nền tảng</Text>
          <Text style={styles.infoValue}>{Platform.OS === 'ios' ? 'iOS' : 'Android'}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  pageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
    marginTop: 8,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  section: {
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  sectionDesc: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: 14,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 14,
  },
  statusOk: {
    backgroundColor: Colors.successLight,
  },
  statusMissing: {
    backgroundColor: Colors.warningLight,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  statusTextOk: {
    color: Colors.success,
  },
  statusTextMissing: {
    color: Colors.warning,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: 10,
    backgroundColor: Colors.background,
    marginBottom: 12,
    paddingRight: 4,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 14,
    color: Colors.textPrimary,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  eyeBtn: {
    padding: 10,
  },
  saveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingVertical: 13,
    marginBottom: 10,
  },
  saveBtnDisabled: {
    opacity: 0.6,
  },
  saveBtnText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 15,
  },
  deleteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
  },
  deleteBtnText: {
    color: Colors.danger,
    fontSize: 14,
    fontWeight: '600',
  },
  step: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 10,
  },
  stepNum: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  stepNumText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  stepText: {
    flex: 1,
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  link: {
    color: Colors.primary,
    fontWeight: '600',
  },
  bold: {
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  noteBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: Colors.accent,
    borderRadius: 8,
    padding: 10,
    marginTop: 4,
  },
  noteText: {
    flex: 1,
    fontSize: 13,
    color: Colors.primary,
    lineHeight: 18,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  notifIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  infoLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
});
