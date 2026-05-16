// My Japan Plan — Phase 0 UI mock.
//
// Entry screen: empty active-plan list + "Tạo lộ trình mới" CTA + situation
// picker. Only "Mất thẻ cư trú" is interactive; the other two show
// "Sắp có" so the user sees the roadmap.
//
// Phase 0 = no AsyncStorage, no real plan state. Active plan list is always
// empty in this PR. Phase 1 wires the real store.
//
// See docs/feature-my-japan-plan-assessment.md §4.1 and §5 Phase 0.

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Colors } from '../constants/colors';
import { RootStackParamList } from '../navigation/AppNavigator';
import { PLAN_SITUATIONS, PlanSituation } from '../constants/planFlows/lostResidenceCard.sample';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function MyJapanPlanScreen() {
  const navigation = useNavigation<NavigationProp>();

  const handlePick = (situation: PlanSituation) => {
    if (!situation.available) return;
    navigation.navigate('PlanWizard', { situationId: situation.id });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          accessibilityLabel="Quay lại"
        >
          <Ionicons name="arrow-back" size={22} color={Colors.white} />
        </TouchableOpacity>
        <View style={styles.headerText}>
          <View style={styles.headerTitleRow}>
            <Ionicons name="map-outline" size={18} color={Colors.white} />
            <Text style={styles.headerTitle}>Lộ trình cá nhân</Text>
            <View style={styles.betaPill}>
              <Text style={styles.betaPillText}>BETA</Text>
            </View>
          </View>
          <Text style={styles.headerDesc}>
            Chọn tình huống bạn đang gặp — app sẽ tạo lộ trình từng bước cho bạn.
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.emptyBox}>
            <Ionicons name="map" size={28} color={Colors.primary} />
            <Text style={styles.emptyTitle}>Chưa có lộ trình đang chạy</Text>
            <Text style={styles.emptyDesc}>
              Chọn một tình huống bên dưới để bắt đầu lộ trình đầu tiên.
            </Text>
          </View>

          <Text style={styles.sectionLabel}>Tạo lộ trình mới</Text>

          {PLAN_SITUATIONS.map((situation) => {
            const disabled = !situation.available;
            return (
              <TouchableOpacity
                key={situation.id}
                style={[styles.situationCard, disabled && styles.situationCardDisabled]}
                onPress={() => handlePick(situation)}
                disabled={disabled}
                accessibilityRole="button"
                accessibilityLabel={situation.title}
              >
                <View
                  style={[
                    styles.situationIconBg,
                    { backgroundColor: `${situation.iconColor}18` },
                  ]}
                >
                  <Ionicons name={situation.icon} size={20} color={situation.iconColor} />
                </View>
                <View style={styles.situationText}>
                  <View style={styles.situationTitleRow}>
                    <Text style={styles.situationTitle}>{situation.title}</Text>
                    {disabled ? (
                      <View style={styles.comingSoonPill}>
                        <Text style={styles.comingSoonText}>Sắp có</Text>
                      </View>
                    ) : situation.estimatedDays ? (
                      <Text style={styles.estimatedDays}>{situation.estimatedDays}</Text>
                    ) : null}
                  </View>
                  <Text style={styles.situationDesc}>{situation.description}</Text>
                </View>
                {!disabled ? (
                  <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
                ) : null}
              </TouchableOpacity>
            );
          })}

          <View style={styles.disclaimerBox}>
            <Ionicons name="information-circle-outline" size={14} color={Colors.textMuted} />
            <Text style={styles.disclaimerText}>
              Lộ trình do app tạo từ bài hướng dẫn có sẵn — chỉ tham khảo, không thay
              tư vấn 入管 / luật sư. Đây là bản thử nghiệm (Phase 0), dữ liệu mẫu.
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  header: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 20,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  backBtn: { paddingTop: 2 },
  headerText: { flex: 1 },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.white,
  },
  betaPill: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  betaPillText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
    letterSpacing: 0.5,
  },
  headerDesc: {
    fontSize: 13,
    lineHeight: 19,
    color: 'rgba(255,255,255,0.85)',
  },
  content: {
    flex: 1,
    backgroundColor: Colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },
  emptyBox: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    gap: 6,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  emptyTitle: {
    fontSize: 14,
    fontWeight: '800',
    fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.textPrimary,
    marginTop: 6,
  },
  emptyDesc: {
    fontSize: 12,
    lineHeight: 17,
    color: Colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 12,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 8,
  },
  situationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  situationCardDisabled: {
    opacity: 0.6,
  },
  situationIconBg: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  situationText: { flex: 1 },
  situationTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  situationTitle: {
    fontSize: 14,
    fontWeight: '800',
    fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.textPrimary,
  },
  comingSoonPill: {
    backgroundColor: Colors.border,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  comingSoonText: {
    color: Colors.textSecondary,
    fontSize: 9,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
  },
  estimatedDays: {
    fontSize: 10,
    color: Colors.textMuted,
    fontWeight: '600',
    fontFamily: 'BeVietnamPro_600SemiBold',
  },
  situationDesc: {
    fontSize: 12,
    lineHeight: 17,
    color: Colors.textSecondary,
  },
  disclaimerBox: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 16,
    paddingHorizontal: 4,
  },
  disclaimerText: {
    flex: 1,
    fontSize: 11,
    color: Colors.textMuted,
    lineHeight: 15,
  },
});
