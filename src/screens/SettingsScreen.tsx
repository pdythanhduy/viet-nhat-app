import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../constants/colors';
import ProfileSetupModal from '../components/ProfileSetupModal';
import { getJapaneseVoiceSupport } from '../utils/audio';
import {
  JapaneseAudioPreferences,
  loadJapaneseAudioPreferences,
  saveJapaneseAudioPreferences,
} from '../utils/audioPreferences';
import {
  cancelJapaneseStudyReminder,
  cancelWordOfDayReminder,
  loadImportantDates,
  scheduleJapaneseStudyReminder,
  scheduleWordOfDayReminder,
} from '../utils/notifications';
import { getCurrentDailyReminderContent } from '../utils/dailyReminderSync';
import { RootStackParamList } from '../navigation/AppNavigator';
import type { UserProfile } from '../types/profile';
import { buildUserProfileSummary, loadUserProfile, saveUserProfile } from '../utils/userProfile';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function SettingsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [dateCount, setDateCount] = useState(0);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [audioPrefs, setAudioPrefs] = useState<JapaneseAudioPreferences>({
    speechRate: 'normal',
    autoPlayDialogue: false,
    autoPlayFlashcard: false,
    studyReminderEnabled: false,
    wordReminderEnabled: false,
  });
  const [hasJapaneseVoice, setHasJapaneseVoice] = useState<boolean | null>(null);
  // Hidden owner gesture: tap the version number 7× to open the private Lab.
  const [versionTaps, setVersionTaps] = useState(0);

  const handleVersionTap = () => {
    setVersionTaps((prev) => {
      const next = prev + 1;
      if (next >= 7) {
        navigation.navigate('Lab');
        return 0;
      }
      return next;
    });
  };

  useEffect(() => {
    loadUserProfile().then(setUserProfile);
    loadJapaneseAudioPreferences().then(setAudioPrefs);
    getJapaneseVoiceSupport().then((support) => setHasJapaneseVoice(support.supported));
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadImportantDates().then((dates) => setDateCount(dates.length));
      loadUserProfile().then(setUserProfile);
      loadJapaneseAudioPreferences().then(setAudioPrefs);
      getJapaneseVoiceSupport().then((support) => setHasJapaneseVoice(support.supported));
    }, [])
  );

  const handleSaveProfile = async (input: {
    visaStatus: UserProfile['visaStatus'];
    lifeStage: UserProfile['lifeStage'];
    household: UserProfile['household'];
    prefecture: string;
  }) => {
    const saved = await saveUserProfile(input, userProfile);
    setUserProfile(saved);
    setShowProfileModal(false);
  };

  const handleChangeSpeechRate = async (speechRate: JapaneseAudioPreferences['speechRate']) => {
    const next = await saveJapaneseAudioPreferences({ ...audioPrefs, speechRate });
    setAudioPrefs(next);
  };

  const handleToggleAutoPlayDialogue = async () => {
    const next = await saveJapaneseAudioPreferences({
      ...audioPrefs,
      autoPlayDialogue: !audioPrefs.autoPlayDialogue,
    });
    setAudioPrefs(next);
  };

  const handleToggleAutoPlayFlashcard = async () => {
    const next = await saveJapaneseAudioPreferences({
      ...audioPrefs,
      autoPlayFlashcard: !audioPrefs.autoPlayFlashcard,
    });
    setAudioPrefs(next);
  };

  const handleToggleStudyReminder = async () => {
    const nextEnabled = !audioPrefs.studyReminderEnabled;
    if (!nextEnabled) {
      const next = await saveJapaneseAudioPreferences({
        ...audioPrefs,
        studyReminderEnabled: false,
      });
      setAudioPrefs(next);
      await cancelJapaneseStudyReminder();
      return;
    }

    try {
      const content = await getCurrentDailyReminderContent();
      await scheduleJapaneseStudyReminder({ title: content.studyTitle, body: content.studyBody });
      const next = await saveJapaneseAudioPreferences({
        ...audioPrefs,
        studyReminderEnabled: true,
      });
      setAudioPrefs(next);
    } catch {
      Alert.alert(
        'Chưa bật được nhắc học',
        'Ứng dụng chưa có quyền gửi thông báo. Hãy cấp quyền notifications rồi thử lại.'
      );
    }
  };

  const handleToggleWordReminder = async () => {
    const nextEnabled = !audioPrefs.wordReminderEnabled;
    if (!nextEnabled) {
      const next = await saveJapaneseAudioPreferences({
        ...audioPrefs,
        wordReminderEnabled: false,
      });
      setAudioPrefs(next);
      await cancelWordOfDayReminder();
      return;
    }

    try {
      const content = await getCurrentDailyReminderContent();
      await scheduleWordOfDayReminder({ title: content.wordTitle, body: content.wordBody });
      const next = await saveJapaneseAudioPreferences({
        ...audioPrefs,
        wordReminderEnabled: true,
      });
      setAudioPrefs(next);
    } catch {
      Alert.alert(
        'Chưa bật được nhắc từ mới',
        'Ứng dụng chưa có quyền gửi thông báo. Hãy cấp quyền notifications rồi thử lại.'
      );
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.pageHeader}>
        <Ionicons name="settings" size={28} color={Colors.primary} />
        <Text style={styles.pageTitle}>Cài đặt</Text>
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

      <TouchableOpacity style={styles.section} onPress={() => setShowProfileModal(true)} activeOpacity={0.8}>
        <View style={styles.rowBetween}>
          <View style={styles.rowLeft}>
            <View style={[styles.notifIcon, { backgroundColor: '#EEF7F1' }]}>
              <Ionicons name="person-circle-outline" size={20} color={Colors.success} />
            </View>
            <View style={styles.profileSectionText}>
              <Text style={styles.sectionTitle}>Hồ sơ cá nhân hóa</Text>
              <Text style={styles.sectionDesc}>
                {userProfile
                  ? buildUserProfileSummary(userProfile)
                  : 'Chưa thiết lập. Hồ sơ này giúp Trang chủ ưu tiên đúng nội dung cho bạn.'}
              </Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
        </View>
      </TouchableOpacity>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Audio tiếng Nhật</Text>
        <Text style={styles.sectionDesc}>
          Điều chỉnh tốc độ phát âm và chọn có tự phát toàn bộ hội thoại khi mở ra hay không.
        </Text>

        <View style={styles.rateRow}>
          {[
            { id: 'slow' as const, label: 'Chậm' },
            { id: 'normal' as const, label: 'Vừa' },
            { id: 'fast' as const, label: 'Nhanh' },
          ].map((option) => {
            const active = audioPrefs.speechRate === option.id;
            return (
              <TouchableOpacity
                key={option.id}
                style={[styles.rateChip, active && styles.rateChipActive]}
                onPress={() => void handleChangeSpeechRate(option.id)}
              >
                <Text style={[styles.rateChipText, active && styles.rateChipTextActive]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity style={styles.audioToggleRow} onPress={() => void handleToggleAutoPlayDialogue()}>
          <View style={styles.audioToggleLeft}>
            <View style={[styles.notifIcon, { backgroundColor: '#EEF5FF' }]}>
              <Ionicons name="play-circle-outline" size={20} color={Colors.primary} />
            </View>
            <View style={styles.profileSectionText}>
              <Text style={styles.sectionTitle}>Tự phát hội thoại</Text>
              <Text style={styles.sectionDesc}>
                {audioPrefs.autoPlayDialogue
                  ? 'Đang bật. Khi mở hội thoại có thể phát liên tục từng dòng.'
                  : 'Đang tắt. Chỉ phát khi bạn bấm nút loa hoặc phát toàn bộ.'}
              </Text>
            </View>
          </View>
          <Ionicons
            name={audioPrefs.autoPlayDialogue ? 'toggle' : 'toggle-outline'}
            size={34}
            color={audioPrefs.autoPlayDialogue ? Colors.primary : Colors.textMuted}
          />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.audioToggleRow, { marginTop: 14 }]} onPress={() => void handleToggleAutoPlayFlashcard()}>
          <View style={styles.audioToggleLeft}>
            <View style={[styles.notifIcon, { backgroundColor: '#F5F0FF' }]}>
              <Ionicons name="albums-outline" size={20} color="#8E44AD" />
            </View>
            <View style={styles.profileSectionText}>
              <Text style={styles.sectionTitle}>Tự phát flashcard khi lật</Text>
              <Text style={styles.sectionDesc}>
                {audioPrefs.autoPlayFlashcard
                  ? 'Đang bật. Khi lật thẻ ở chế độ luyện tập, app sẽ tự phát lại câu tiếng Nhật.'
                  : 'Đang tắt. Flashcard chỉ phát khi bạn bấm nút loa.'}
              </Text>
            </View>
          </View>
          <Ionicons
            name={audioPrefs.autoPlayFlashcard ? 'toggle' : 'toggle-outline'}
            size={34}
            color={audioPrefs.autoPlayFlashcard ? '#8E44AD' : Colors.textMuted}
          />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.audioToggleRow, { marginTop: 14 }]} onPress={() => void handleToggleStudyReminder()}>
          <View style={styles.audioToggleLeft}>
            <View style={[styles.notifIcon, { backgroundColor: '#FEF3C7' }]}>
              <Ionicons name="notifications-outline" size={20} color="#D97706" />
            </View>
            <View style={styles.profileSectionText}>
              <Text style={styles.sectionTitle}>Nhắc luyện tiếng Nhật mỗi ngày</Text>
              <Text style={styles.sectionDesc}>
                {audioPrefs.studyReminderEnabled
                  ? 'Đang bật. App sẽ nhắc lúc 20:00 mỗi ngày nếu bạn chưa luyện tập.'
                  : 'Đang tắt. Bật để nhận thông báo lúc 20:00 hàng ngày.'}
              </Text>
            </View>
          </View>
          <Ionicons
            name={audioPrefs.studyReminderEnabled ? 'toggle' : 'toggle-outline'}
            size={34}
            color={audioPrefs.studyReminderEnabled ? '#D97706' : Colors.textMuted}
          />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.audioToggleRow, { marginTop: 14 }]} onPress={() => void handleToggleWordReminder()}>
          <View style={styles.audioToggleLeft}>
            <View style={[styles.notifIcon, { backgroundColor: '#ECFDF5' }]}>
              <Ionicons name="sunny-outline" size={20} color="#059669" />
            </View>
            <View style={styles.profileSectionText}>
              <Text style={styles.sectionTitle}>Từ của ngày — nhắc 8:00 sáng</Text>
              <Text style={styles.sectionDesc}>
                {audioPrefs.wordReminderEnabled
                  ? 'Đang bật. App sẽ nhắc lúc 8:00 mỗi sáng để học từ mới tiếng Nhật.'
                  : 'Đang tắt. Bật để nhận thông báo sáng sớm với từ tiếng Nhật mới mỗi ngày.'}
              </Text>
            </View>
          </View>
          <Ionicons
            name={audioPrefs.wordReminderEnabled ? 'toggle' : 'toggle-outline'}
            size={34}
            color={audioPrefs.wordReminderEnabled ? '#059669' : Colors.textMuted}
          />
        </TouchableOpacity>

        <View style={styles.noteBox}>
          <Ionicons
            name={hasJapaneseVoice === false ? 'warning-outline' : 'volume-high-outline'}
            size={16}
            color={hasJapaneseVoice === false ? Colors.warning : Colors.primary}
          />
          <Text style={styles.noteText}>
            {hasJapaneseVoice === false
              ? 'Thiết bị hiện chưa có voice tiếng Nhật. Bạn cần cài thêm Japanese TTS voice trong phần ngôn ngữ hoặc giọng nói của máy để nút loa phát âm hoạt động.'
              : Platform.OS === 'ios'
                ? 'Nếu bạn dùng iPhone và để máy ở silent mode, phát âm có thể bị im tùy thiết bị. Hãy thử bật tiếng chuông khi kiểm tra audio.'
                : 'Audio phát âm hiện dùng giọng TTS trên thiết bị. Chất lượng giọng sẽ phụ thuộc máy và voice engine đang cài.'}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.section}
        onPress={() => navigation.navigate('Feedback')}
        activeOpacity={0.8}
      >
        <View style={styles.rowBetween}>
          <View style={styles.rowLeftTop}>
            <View style={[styles.notifIcon, { backgroundColor: '#EBF5FB' }]}>
              <Ionicons name="chatbubble-ellipses" size={20} color="#2980B9" />
            </View>
            <View style={styles.feedbackTextWrap}>
              <Text style={styles.sectionTitle}>Góp ý và phản hồi</Text>
              <Text style={styles.feedbackDesc}>Báo lỗi · Đề xuất tính năng · Liên hệ hỗ trợ</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
        </View>
      </TouchableOpacity>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Thông tin ứng dụng</Text>
        <TouchableOpacity
          style={styles.infoRow}
          activeOpacity={1}
          onPress={handleVersionTap}
        >
          <Text style={styles.infoLabel}>Phiên bản</Text>
          <Text style={styles.infoValue}>1.2.0</Text>
        </TouchableOpacity>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Nền tảng</Text>
          <Text style={styles.infoValue}>{Platform.OS === 'ios' ? 'iOS' : 'Android'}</Text>
        </View>
        <TouchableOpacity
          style={styles.infoRow}
          onPress={() =>
            Linking.openURL('https://sites.google.com/view/camnangvietnhat-privacy/home').catch(
              () => undefined
            )
          }
        >
          <Text style={styles.infoLabel}>Chính sách quyền riêng tư</Text>
          <Text style={[styles.infoValue, styles.infoLink]}>Xem →</Text>
        </TouchableOpacity>
      </View>

      <ProfileSetupModal
        visible={showProfileModal}
        initialProfile={userProfile}
        onClose={() => setShowProfileModal(false)}
        onSave={handleSaveProfile}
      />
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
    fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textPrimary,
    lineHeight: 32,
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
    fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textPrimary,
    marginBottom: 8,
    lineHeight: 24,
  },
  sectionDesc: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: 14,
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
  rowLeftTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    flex: 1,
  },
  feedbackTextWrap: {
    flex: 1,
    minWidth: 0,
  },
  feedbackDesc: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: 0,
  },
  profileSectionText: {
    flex: 1,
  },
  rateRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  rateChip: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  rateChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  rateChipText: {
    fontSize: 13,
    fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textPrimary,
    lineHeight: 20,
  },
  rateChipTextActive: {
    color: Colors.white,
  },
  audioToggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  audioToggleLeft: {
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
    fontWeight: '600', fontFamily: 'BeVietnamPro_600SemiBold',
    color: Colors.textPrimary,
  },
  infoLink: {
    color: Colors.primary,
    fontWeight: '600', fontFamily: 'BeVietnamPro_600SemiBold',
  },
});
