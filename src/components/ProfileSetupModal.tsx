import React, { useEffect, useMemo, useState } from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '../constants/colors';
import type { UserHousehold, UserLifeStage, UserProfile, UserVisaStatus } from '../types/profile';
import {
  HOUSEHOLD_LABELS,
  LIFE_STAGE_LABELS,
  VISA_STATUS_LABELS,
} from '../utils/userProfile';

const VISA_OPTIONS: Array<{ id: UserVisaStatus; icon: keyof typeof Ionicons.glyphMap; color: string }> = [
  { id: 'student', icon: 'school-outline', color: '#2980B9' },
  { id: 'tokutei', icon: 'construct-outline', color: '#8E44AD' },
  { id: 'engineer', icon: 'briefcase-outline', color: '#27AE60' },
  { id: 'trainee', icon: 'build-outline', color: '#E67E22' },
  { id: 'family', icon: 'people-outline', color: '#D35454' },
  { id: 'other', icon: 'layers-outline', color: '#5C6B8A' },
];

const LIFE_STAGE_OPTIONS: Array<{ id: UserLifeStage; icon: keyof typeof Ionicons.glyphMap; color: string }> = [
  { id: 'new-arrival', icon: 'rocket-outline', color: '#185FA5' },
  { id: 'settling-in', icon: 'home-outline', color: '#27AE60' },
  { id: 'changing-jobs', icon: 'swap-horizontal-outline', color: '#E67E22' },
  { id: 'family-life', icon: 'heart-outline', color: '#D35454' },
];

const HOUSEHOLD_OPTIONS: Array<{ id: UserHousehold; icon: keyof typeof Ionicons.glyphMap }> = [
  { id: 'alone', icon: 'person-outline' },
  { id: 'with-family', icon: 'people-outline' },
];

interface ProfileSetupModalProps {
  visible: boolean;
  initialProfile: UserProfile | null;
  onClose: () => void;
  onSave: (input: {
    visaStatus: UserVisaStatus;
    lifeStage: UserLifeStage;
    household: UserHousehold;
    prefecture: string;
  }) => void | Promise<void>;
}

export default function ProfileSetupModal({
  visible,
  initialProfile,
  onClose,
  onSave,
}: ProfileSetupModalProps) {
  const [visaStatus, setVisaStatus] = useState<UserVisaStatus>('student');
  const [lifeStage, setLifeStage] = useState<UserLifeStage>('new-arrival');
  const [household, setHousehold] = useState<UserHousehold>('alone');
  const [prefecture, setPrefecture] = useState('');

  useEffect(() => {
    if (!visible) return;

    setVisaStatus(initialProfile?.visaStatus ?? 'student');
    setLifeStage(initialProfile?.lifeStage ?? 'new-arrival');
    setHousehold(initialProfile?.household ?? 'alone');
    setPrefecture(initialProfile?.prefecture ?? '');
  }, [initialProfile, visible]);

  const selectedVisaColor = useMemo(
    () => VISA_OPTIONS.find((option) => option.id === visaStatus)?.color ?? Colors.primary,
    [visaStatus]
  );

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.handle} />
          <View style={styles.header}>
            <View style={styles.headerText}>
              <Text style={styles.title}>Cá nhân hóa ứng dụng</Text>
              <Text style={styles.subtitle}>
                Chúng tôi chỉ dùng hồ sơ này để ưu tiên nội dung và lộ trình phù hợp trên thiết bị của bạn.
              </Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={20} color={Colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.sectionLabel}>1. Bạn đang ở diện nào?</Text>
            <View style={styles.optionGrid}>
              {VISA_OPTIONS.map((option) => {
                const selected = option.id === visaStatus;
                return (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      styles.optionCard,
                      selected && {
                        borderColor: option.color,
                        backgroundColor: `${option.color}12`,
                      },
                    ]}
                    onPress={() => setVisaStatus(option.id)}
                  >
                    <View style={[styles.optionIconBg, { backgroundColor: `${option.color}18` }]}>
                      <Ionicons name={option.icon} size={18} color={option.color} />
                    </View>
                    <Text style={styles.optionTitle}>{VISA_STATUS_LABELS[option.id]}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text style={styles.sectionLabel}>2. Việc gì đang đúng với bạn nhất?</Text>
            <View style={styles.optionList}>
              {LIFE_STAGE_OPTIONS.map((option) => {
                const selected = option.id === lifeStage;
                return (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      styles.listOption,
                      selected && {
                        borderColor: option.color,
                        backgroundColor: `${option.color}12`,
                      },
                    ]}
                    onPress={() => setLifeStage(option.id)}
                  >
                    <View style={[styles.optionIconBg, { backgroundColor: `${option.color}18` }]}>
                      <Ionicons name={option.icon} size={18} color={option.color} />
                    </View>
                    <Text style={styles.listOptionText}>{LIFE_STAGE_LABELS[option.id]}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text style={styles.sectionLabel}>3. Hiện bạn đang sống thế nào?</Text>
            <View style={styles.householdRow}>
              {HOUSEHOLD_OPTIONS.map((option) => {
                const selected = option.id === household;
                return (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      styles.householdOption,
                      selected && {
                        borderColor: selectedVisaColor,
                        backgroundColor: `${selectedVisaColor}12`,
                      },
                    ]}
                    onPress={() => setHousehold(option.id)}
                  >
                    <Ionicons
                      name={option.icon}
                      size={18}
                      color={selected ? selectedVisaColor : Colors.textSecondary}
                    />
                    <Text style={styles.householdText}>{HOUSEHOLD_LABELS[option.id]}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text style={styles.sectionLabel}>4. Bạn đang ở tỉnh/thành nào? (tùy chọn)</Text>
            <TextInput
              value={prefecture}
              onChangeText={setPrefecture}
              placeholder="Ví dụ: Tokyo, Osaka, Aichi..."
              placeholderTextColor={Colors.textMuted}
              style={styles.input}
            />

            <View style={styles.noteBox}>
              <Ionicons name="shield-checkmark-outline" size={16} color={Colors.primary} />
              <Text style={styles.noteText}>
                Hồ sơ này không gửi về máy chủ riêng của app. Bạn có thể sửa lại bất cứ lúc nào trong Cài đặt.
              </Text>
            </View>
          </ScrollView>

          <TouchableOpacity
            style={[styles.saveBtn, { backgroundColor: selectedVisaColor }]}
            onPress={() => onSave({ visaStatus, lifeStage, household, prefecture })}
          >
            <Ionicons name="checkmark-circle-outline" size={18} color={Colors.white} />
            <Text style={styles.saveBtnText}>Lưu hồ sơ cá nhân hóa</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15,23,42,0.4)',
    justifyContent: 'flex-end',
  },
  sheet: {
    maxHeight: '92%',
    backgroundColor: Colors.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
  },
  handle: {
    width: 44,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    backgroundColor: Colors.border,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 18,
  },
  headerText: {
    flex: 1,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 19,
    color: Colors.textSecondary,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 10,
    marginTop: 8,
  },
  optionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 8,
  },
  optionCard: {
    width: '47%',
    borderRadius: 16,
    padding: 14,
    backgroundColor: Colors.background,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  optionIconBg: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  optionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textPrimary,
    lineHeight: 18,
  },
  optionList: {
    gap: 10,
  },
  listOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 14,
    padding: 12,
    backgroundColor: Colors.background,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  listOptionText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  householdRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 8,
  },
  householdOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 14,
    paddingVertical: 13,
    backgroundColor: Colors.background,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  householdText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  input: {
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: Colors.background,
    fontSize: 14,
    color: Colors.textPrimary,
    marginBottom: 14,
  },
  noteBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: Colors.accent,
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: `${Colors.primary}22`,
  },
  noteText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
    color: Colors.textSecondary,
  },
  saveBtn: {
    borderRadius: 16,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 12,
  },
  saveBtnText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '800',
  },
});
