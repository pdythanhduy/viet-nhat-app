import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  Platform,
  FlatList,
  TextInput,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Colors } from '../constants/colors';
import type { IoniconName } from '../types/content';
import {
  ImportantDate,
  loadImportantDates,
  saveImportantDates,
  scheduleNotificationsForDate,
  deleteImportantDate,
  getDaysUntil,
  requestPermission,
  getNotificationPermissionStatus,
  type NotificationPermissionState,
} from '../utils/notifications';

const PRESETS: { label: string; icon: IoniconName; color: string }[] = [
  { label: 'Thẻ cư trú hết hạn', icon: 'card', color: '#185FA5' },
  { label: 'Bảo hiểm y tế', icon: 'heart', color: '#E74C3C' },
  { label: 'Bảo hiểm lao động', icon: 'shield-checkmark', color: '#27AE60' },
  { label: 'Hộ chiếu hết hạn', icon: 'id-card', color: '#9B59B6' },
  { label: 'Hợp đồng lao động', icon: 'document-text', color: '#F39C12' },
  { label: 'Lịch tiêm chủng con', icon: 'medkit', color: '#16A085' },
  { label: 'Thuế / 国保', icon: 'receipt', color: '#2C7A7B' },
  { label: 'Khác', icon: 'calendar', color: '#5C6B8A' },
];

const ITEM_H = 46;
const PADDING_ROWS = 2; // rows above/below center
const PICKER_H = ITEM_H * (PADDING_ROWS * 2 + 1);

function daysInMonth(month: number, year: number) {
  return new Date(year, month, 0).getDate();
}

function getDaysStatus(days: number) {
  if (days < 0) return { label: `Đã hết hạn ${Math.abs(days)} ngày trước`, color: Colors.danger, bg: Colors.dangerLight };
  if (days === 0) return { label: 'Hết hạn hôm nay!', color: Colors.danger, bg: Colors.dangerLight };
  if (days <= 7) return { label: `Còn ${days} ngày`, color: Colors.danger, bg: Colors.dangerLight };
  if (days <= 30) return { label: `Còn ${days} ngày`, color: Colors.warning, bg: Colors.warningLight };
  if (days <= 90) return { label: `Còn ${days} ngày`, color: '#D68910', bg: '#FEF9EC' };
  return { label: `Còn ${days} ngày`, color: Colors.success, bg: Colors.successLight };
}

// ------- Drum-roll column picker -------
function ColumnPicker({
  items,
  selectedIndex,
  onSelect,
  width,
  color = Colors.primary,
}: {
  items: string[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  width: number;
  color?: string;
}) {
  const listRef = useRef<FlatList>(null);

  // Pad top and bottom so selected item sits at center
  const padded = [...Array(PADDING_ROWS).fill(''), ...items, ...Array(PADDING_ROWS).fill('')];

  const scrollTo = (idx: number, animated = true) => {
    // contentOffset = idx * ITEM_H puts items[idx] at center
    listRef.current?.scrollToOffset({ offset: idx * ITEM_H, animated });
  };

  useEffect(() => {
    // Initial scroll without animation after render
    const timer = setTimeout(() => scrollTo(selectedIndex, false), 50);
    return () => clearTimeout(timer);
  }, []);

  // When selectedIndex changes from outside (e.g. month changed → day clamped)
  useEffect(() => {
    scrollTo(selectedIndex, true);
  }, [selectedIndex]);

  return (
    <View style={{ width, height: PICKER_H, overflow: 'hidden' }}>
      <FlatList
        ref={listRef}
        data={padded}
        keyExtractor={(_, i) => i.toString()}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_H}
        decelerationRate="fast"
        getItemLayout={(_, index) => ({ length: ITEM_H, offset: ITEM_H * index, index })}
        onMomentumScrollEnd={(e) => {
          const raw = Math.round(e.nativeEvent.contentOffset.y / ITEM_H);
          const clamped = Math.max(0, Math.min(raw, items.length - 1));
          onSelect(clamped);
        }}
        renderItem={({ item, index }) => {
          const realIdx = index - PADDING_ROWS;
          const isSelected = realIdx === selectedIndex;
          const isEmpty = item === '';
          return (
            <TouchableOpacity
              activeOpacity={isEmpty ? 1 : 0.7}
              style={{ height: ITEM_H, justifyContent: 'center', alignItems: 'center' }}
              onPress={() => {
                if (realIdx >= 0 && realIdx < items.length) {
                  onSelect(realIdx);
                  scrollTo(realIdx);
                }
              }}
            >
              <Text
                style={{
                  fontSize: isSelected ? 22 : 17,
                  fontWeight: isSelected ? '800' : '400',
                  color: isSelected ? color : Colors.textMuted,
                  opacity: isEmpty ? 0 : 1,
                }}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
      {/* Selection highlight border */}
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          top: ITEM_H * PADDING_ROWS,
          left: 6,
          right: 6,
          height: ITEM_H,
          borderTopWidth: 1.5,
          borderBottomWidth: 1.5,
          borderColor: color + '80',
          borderRadius: 6,
        }}
      />
    </View>
  );
}

// ------- Main screen -------
export default function ImportantDatesScreen() {
  const navigation = useNavigation();
  const [dates, setDates] = useState<ImportantDate[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState(PRESETS[0]);
  const [customLabel, setCustomLabel] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [permissionState, setPermissionState] =
    useState<NotificationPermissionState>('undetermined');

  const today = new Date();
  const currentYear = today.getFullYear();

  const years = Array.from({ length: 10 }, (_, i) => String(currentYear + i));
  const months = ['01','02','03','04','05','06','07','08','09','10','11','12'];

  const [selYear, setSelYear] = useState(0);
  const [selMonth, setSelMonth] = useState(today.getMonth());
  const [selDay, setSelDay] = useState(today.getDate() - 1);

  const numDays = daysInMonth(selMonth + 1, currentYear + selYear);
  const days = Array.from({ length: numDays }, (_, i) => String(i + 1).padStart(2, '0'));

  // Clamp day if month/year changes and days < selDay
  const clampedDay = Math.min(selDay, numDays - 1);

  const handleMonthChange = (idx: number) => {
    setSelMonth(idx);
    const nd = daysInMonth(idx + 1, currentYear + selYear);
    if (selDay >= nd) setSelDay(nd - 1);
  };

  const handleYearChange = (idx: number) => {
    setSelYear(idx);
    const nd = daysInMonth(selMonth + 1, currentYear + idx);
    if (selDay >= nd) setSelDay(nd - 1);
  };

  useFocusEffect(
    useCallback(() => {
      loadImportantDates().then(setDates);
      getNotificationPermissionStatus().then(setPermissionState);
    }, [])
  );

  const openAdd = () => {
    setEditingId(null);
    setSelectedPreset(PRESETS[0]);
    setCustomLabel('');
    setSelYear(0);
    setSelMonth(today.getMonth());
    setSelDay(today.getDate() - 1);
    setShowModal(true);
  };

  const openEdit = (item: ImportantDate) => {
    const matchedPreset =
      PRESETS.find((p) => p.label === item.label) ??
      PRESETS.find((p) => p.label === 'Khác')!;
    setSelectedPreset(matchedPreset);
    setCustomLabel(matchedPreset.label === 'Khác' ? item.label : '');

    const [y, m, d] = item.date.split('-');
    const yearIdx = Math.max(
      0,
      Math.min(parseInt(y, 10) - currentYear, years.length - 1)
    );
    const monthIdx = Math.max(0, Math.min(parseInt(m, 10) - 1, 11));
    const dayIdx = Math.max(0, parseInt(d, 10) - 1);
    setSelYear(yearIdx);
    setSelMonth(monthIdx);
    setSelDay(dayIdx);

    setEditingId(item.id);
    setShowModal(true);
  };

  const openSystemSettings = () => {
    Linking.openSettings().catch(() => {
      Alert.alert(
        'Không mở được Cài đặt',
        'Vui lòng vào Cài đặt điện thoại → Thông báo → bật quyền cho ứng dụng này.'
      );
    });
  };

  const handleSave = async () => {
    const day = days[clampedDay] ?? '01';
    const month = months[selMonth];
    const year = years[selYear];
    const isoDate = `${year}-${month}-${day}`;

    const label =
      selectedPreset.label === 'Khác'
        ? customLabel.trim() || 'Nhắc nhở'
        : selectedPreset.label;

    const dateItem: ImportantDate = {
      id: editingId ?? Date.now().toString(),
      label,
      date: isoDate,
      icon: selectedPreset.icon,
      color: selectedPreset.color,
    };

    const permitted = await requestPermission();
    const nextStatus = await getNotificationPermissionStatus();
    setPermissionState(nextStatus);
    if (!permitted) {
      Alert.alert(
        'Chưa có quyền thông báo',
        'Nhắc nhở vẫn được lưu nhưng app sẽ không gửi thông báo. Bạn có thể bật quyền trong Cài đặt điện thoại bất kỳ lúc nào.',
        [{ text: 'OK' }]
      );
    }

    await scheduleNotificationsForDate(dateItem);
    const updated = editingId
      ? dates.map((d) => (d.id === editingId ? dateItem : d))
      : [...dates, dateItem];
    await saveImportantDates(updated);
    setDates(updated);
    setEditingId(null);
    setShowModal(false);
  };

  const handleDelete = (id: string, label: string) => {
    Alert.alert(`Xóa "${label}"?`, 'Các thông báo nhắc nhở cũng sẽ bị hủy.', [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Xóa', style: 'destructive',
        onPress: async () => {
          await deleteImportantDate(id);
          setDates((prev) => prev.filter((d) => d.id !== id));
        },
      },
    ]);
  };

  const formatDate = (iso: string) => {
    const [y, m, d] = iso.split('-');
    return `${d}/${m}/${y}`;
  };

  const previewDate = `${days[clampedDay] ?? '01'}/${months[selMonth]}/${years[selYear]}`;
  const accentColor = selectedPreset.color;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ngày quan trọng</Text>
        <TouchableOpacity onPress={openAdd} style={styles.addBtn}>
          <Ionicons name="add" size={26} color={Colors.white} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.infoBox}>
          <Ionicons name="notifications" size={16} color={Colors.primary} />
          <Text style={styles.infoText}>
            Bạn sẽ nhận thông báo trước{' '}
            <Text style={styles.bold}>90, 30, 7 và 1 ngày</Text> trước mỗi ngày quan trọng.
          </Text>
        </View>

        {permissionState === 'denied' ? (
          <View style={styles.permissionBanner}>
            <Ionicons name="notifications-off" size={18} color={Colors.danger} />
            <View style={{ flex: 1 }}>
              <Text style={styles.permissionTitle}>App chưa có quyền thông báo</Text>
              <Text style={styles.permissionDesc}>
                Nhắc nhở vẫn lưu, nhưng sẽ không có thông báo. Hãy bật quyền trong Cài đặt.
              </Text>
            </View>
            <TouchableOpacity style={styles.permissionAction} onPress={openSystemSettings}>
              <Text style={styles.permissionActionText}>Mở Cài đặt</Text>
            </TouchableOpacity>
          </View>
        ) : null}

        <View style={styles.safetyBox}>
          <Ionicons name="information-circle-outline" size={14} color={Colors.textMuted} />
          <Text style={styles.safetyText}>
            Đây là nhắc nhở cá nhân — không thay cơ quan chính thức. Hãy tự kiểm tra
            giấy tờ gốc trước hạn.
          </Text>
        </View>

        {dates.length === 0 ? (
          <View style={styles.emptyBox}>
            <Ionicons name="calendar-outline" size={52} color={Colors.textMuted} />
            <Text style={styles.emptyTitle}>Chưa có ngày nào</Text>
            <Text style={styles.emptyDesc}>Nhấn nút + để thêm ngày hết hạn visa, bảo hiểm, v.v.</Text>
            <TouchableOpacity style={styles.emptyAddBtn} onPress={openAdd}>
              <Ionicons name="add-circle" size={18} color={Colors.white} />
              <Text style={styles.emptyAddText}>Thêm ngày quan trọng</Text>
            </TouchableOpacity>
          </View>
        ) : (
          dates.map((item) => {
            const days2 = getDaysUntil(item.date);
            const status = getDaysStatus(days2);
            return (
              <View key={item.id} style={styles.dateCard}>
                <TouchableOpacity
                  onPress={() => openEdit(item)}
                  style={styles.dateCardBody}
                  accessibilityRole="button"
                  accessibilityLabel={`Sửa nhắc nhở ${item.label}`}
                >
                  <View style={[styles.iconBg, { backgroundColor: item.color + '18' }]}>
                    <Ionicons name={item.icon} size={24} color={item.color} />
                  </View>
                  <View style={styles.dateInfo}>
                    <Text style={styles.dateLabel}>{item.label}</Text>
                    <Text style={styles.dateValue}>{formatDate(item.date)}</Text>
                    <View style={[styles.statusBadge, { backgroundColor: status.bg }]}>
                      <Text style={[styles.statusText, { color: status.color }]}>{status.label}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDelete(item.id, item.label)}
                  style={styles.deleteBtn}
                  accessibilityLabel={`Xóa nhắc nhở ${item.label}`}
                >
                  <Ionicons name="trash-outline" size={18} color={Colors.textMuted} />
                </TouchableOpacity>
              </View>
            );
          })
        )}
        <View style={{ height: 32 }} />
      </ScrollView>

      {/* Modal thêm/sửa ngày */}
      <Modal visible={showModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHandle} />

            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {editingId ? 'Sửa nhắc nhở' : 'Thêm ngày quan trọng'}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setEditingId(null);
                  setShowModal(false);
                }}
              >
                <Ionicons name="close" size={22} color={Colors.textSecondary} />
              </TouchableOpacity>
            </View>

            {/* Loại nhắc nhở */}
            <Text style={styles.fieldLabel}>Loại nhắc nhở</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.presetsScroll}>
              {PRESETS.map((p) => {
                const active = selectedPreset.label === p.label;
                return (
                  <TouchableOpacity
                    key={p.label}
                    style={[styles.presetChip, active && { backgroundColor: p.color, borderColor: p.color }]}
                    onPress={() => setSelectedPreset(p)}
                  >
                    <Ionicons name={p.icon} size={14} color={active ? Colors.white : Colors.textSecondary} />
                    <Text style={[styles.presetText, active && { color: Colors.white }]}>{p.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {selectedPreset.label === 'Khác' && (
              <>
                <Text style={styles.fieldLabel}>Tên nhắc nhở</Text>
                <TextInput
                  style={styles.textInput}
                  value={customLabel}
                  onChangeText={setCustomLabel}
                  placeholder="VD: Gia hạn hợp đồng thuê nhà"
                  placeholderTextColor={Colors.textMuted}
                />
              </>
            )}

            {/* Date picker */}
            <Text style={styles.fieldLabel}>Chọn ngày</Text>
            <View style={[styles.pickerContainer, { borderColor: accentColor + '30' }]}>
              <View style={styles.pickerRow}>
                <View style={styles.pickerCol}>
                  <Text style={styles.pickerColLabel}>Ngày</Text>
                  <ColumnPicker
                    items={days}
                    selectedIndex={clampedDay}
                    onSelect={setSelDay}
                    width={72}
                    color={accentColor}
                  />
                </View>

                <Text style={styles.pickerSep}>/</Text>

                <View style={styles.pickerCol}>
                  <Text style={styles.pickerColLabel}>Tháng</Text>
                  <ColumnPicker
                    items={months}
                    selectedIndex={selMonth}
                    onSelect={handleMonthChange}
                    width={72}
                    color={accentColor}
                  />
                </View>

                <Text style={styles.pickerSep}>/</Text>

                <View style={styles.pickerCol}>
                  <Text style={styles.pickerColLabel}>Năm</Text>
                  <ColumnPicker
                    items={years}
                    selectedIndex={selYear}
                    onSelect={handleYearChange}
                    width={96}
                    color={accentColor}
                  />
                </View>
              </View>

              {/* Preview */}
              <View style={[styles.previewRow, { backgroundColor: accentColor + '12' }]}>
                <Ionicons name="calendar" size={15} color={accentColor} />
                <Text style={[styles.previewDate, { color: accentColor }]}>{previewDate}</Text>
              </View>
            </View>

            <TouchableOpacity style={[styles.saveBtn, { backgroundColor: accentColor }]} onPress={handleSave}>
              <Ionicons name="checkmark-circle" size={20} color={Colors.white} />
              <Text style={styles.saveBtnText}>
                {editingId ? 'Cập nhật nhắc nhở' : 'Xác nhận & bật nhắc nhở'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  backBtn: { padding: 2 },
  headerTitle: { flex: 1, fontSize: 18, fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold', color: Colors.white, marginLeft: 12 },
  addBtn: { padding: 4 },
  content: { padding: 16 },
  infoBox: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor: Colors.accent,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.primary + '30',
  },
  infoText: { flex: 1, fontSize: 13, color: Colors.textSecondary, lineHeight: 19 },
  bold: { fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold', color: Colors.primary },
  permissionBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    marginBottom: 12,
    backgroundColor: Colors.dangerLight,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.danger + '50',
  },
  permissionTitle: {
    fontSize: 13,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.danger,
    marginBottom: 2,
  },
  permissionDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 17,
  },
  permissionAction: {
    backgroundColor: Colors.danger,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  permissionActionText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
  },
  safetyBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 12,
  },
  safetyText: {
    flex: 1,
    fontSize: 11,
    lineHeight: 16,
    color: Colors.textMuted,
  },
  emptyBox: { alignItems: 'center', paddingVertical: 48, gap: 10 },
  emptyTitle: { fontSize: 17, fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold', color: Colors.textSecondary },
  emptyDesc: { fontSize: 13, color: Colors.textMuted, textAlign: 'center', paddingHorizontal: 24 },
  emptyAddBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginTop: 8,
  },
  emptyAddText: { color: Colors.white, fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold', fontSize: 14 },
  dateCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 12,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  dateCardBody: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 14 },
  iconBg: { width: 50, height: 50, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  dateInfo: { flex: 1 },
  dateLabel: { fontSize: 14, fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold', color: Colors.textPrimary, marginBottom: 2 },
  dateValue: { fontSize: 13, color: Colors.textSecondary, marginBottom: 6 },
  statusBadge: { alignSelf: 'flex-start', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  statusText: { fontSize: 12, fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold' },
  deleteBtn: { padding: 8 },
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: Colors.border,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: { fontSize: 17, fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold', color: Colors.textPrimary },
  fieldLabel: { fontSize: 13, fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold', color: Colors.textSecondary, marginBottom: 8 },
  presetsScroll: { marginBottom: 16 },
  presetChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 7,
    marginRight: 8,
    backgroundColor: Colors.white,
  },
  presetText: { fontSize: 13, fontWeight: '600', fontFamily: 'BeVietnamPro_600SemiBold', color: Colors.textSecondary },
  textInput: {
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: Colors.textPrimary,
    marginBottom: 12,
    backgroundColor: Colors.background,
  },
  // Picker
  pickerContainer: {
    borderRadius: 16,
    borderWidth: 1.5,
    overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: Colors.background,
  },
  pickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingTop: 8,
    gap: 0,
  },
  pickerCol: { alignItems: 'center' },
  pickerColLabel: {
    fontSize: 11,
    fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textMuted,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  pickerSep: {
    fontSize: 24,
    fontWeight: '300',
    color: Colors.textMuted,
    marginTop: 16,
    paddingHorizontal: 2,
  },
  previewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    margin: 10,
    marginTop: 4,
    padding: 10,
    borderRadius: 10,
  },
  previewDate: { fontSize: 15, fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold' },
  saveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 14,
    paddingVertical: 15,
  },
  saveBtnText: { color: Colors.white, fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold', fontSize: 15 },
});
