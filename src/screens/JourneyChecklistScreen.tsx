import React, { useCallback, useMemo, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Colors } from '../constants/colors';
import type { JourneyChecklistItem } from '../types/journey';
import { RootStackParamList } from '../navigation/AppNavigator';
import {
  buildJourneyChecklistPlan,
  getJourneyChecklistCounts,
  loadJourneyChecklistProgress,
  toggleJourneyChecklistItem,
} from '../utils/journeyChecklist';
import { loadUserProfile } from '../utils/userProfile';
import type { UserProfile } from '../types/profile';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function JourneyChecklistScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [checkedIds, setCheckedIds] = useState<string[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadUserProfile().then(setProfile);
      loadJourneyChecklistProgress().then(setCheckedIds);
    }, [])
  );

  const plan = useMemo(() => buildJourneyChecklistPlan(profile), [profile]);
  const counts = useMemo(() => getJourneyChecklistCounts(plan, checkedIds), [checkedIds, plan]);
  const progressPct = counts.total === 0 ? 0 : Math.round((counts.checked / counts.total) * 100);

  const handleToggle = async (itemId: string) => {
    setCheckedIds(await toggleJourneyChecklistItem(itemId));
  };

  const handleOpenItem = (item: JourneyChecklistItem) => {
    if (!item.action) return;

    if (item.action.kind === 'guide') {
      navigation.navigate('AdminDetail', { guideId: item.action.guideId });
      return;
    }

    if (item.action.kind === 'tab') {
      navigation.navigate('MainTabs', { screen: item.action.tab });
      return;
    }

    navigation.navigate(item.action.screen);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={[styles.header, { backgroundColor: plan.color }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={Colors.white} />
        </TouchableOpacity>
        <View style={styles.headerText}>
          <Text style={styles.headerLabel}>Checklist hành trình</Text>
          <Text style={styles.headerTitle}>{plan.title}</Text>
          <Text style={styles.headerDesc}>{plan.subtitle}</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.progressCard}>
          <View style={styles.progressTop}>
            <View style={[styles.progressIconBg, { backgroundColor: `${plan.color}18` }]}>
              <Ionicons name={plan.icon} size={20} color={plan.color} />
            </View>
            <View style={styles.progressText}>
              <Text style={styles.progressTitle}>Tiến độ hiện tại</Text>
              <Text style={styles.progressDesc}>
                Đã xong {counts.checked}/{counts.total} việc. Cứ đánh dấu khi bạn hoàn tất hoặc đã tự xử lý bên ngoài app.
              </Text>
            </View>
            <Text style={[styles.progressPct, { color: plan.color }]}>{progressPct}%</Text>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progressPct}%`, backgroundColor: plan.color }]} />
          </View>
        </View>

        {plan.sections.map((section) => (
          <View key={section.id} style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.sectionDesc}>{section.description}</Text>

            {section.items.map((item, index) => {
              const checked = checkedIds.includes(item.id);
              return (
                <View
                  key={item.id}
                  style={[styles.itemCard, index < section.items.length - 1 && styles.itemCardBorder]}
                >
                  <TouchableOpacity style={styles.itemMain} onPress={() => void handleToggle(item.id)}>
                    <View
                      style={[
                        styles.checkCircle,
                        checked && { backgroundColor: plan.color, borderColor: plan.color },
                      ]}
                    >
                      {checked ? <Ionicons name="checkmark" size={16} color={Colors.white} /> : null}
                    </View>
                    <View style={styles.itemText}>
                      <Text style={[styles.itemTitle, checked && styles.itemTitleChecked]}>{item.label}</Text>
                      <Text style={styles.itemDesc}>{item.description}</Text>
                    </View>
                  </TouchableOpacity>

                  {item.action ? (
                    <TouchableOpacity style={styles.actionBtn} onPress={() => handleOpenItem(item)}>
                      <Text style={[styles.actionBtnText, { color: plan.color }]}>
                        {item.actionLabel ?? 'Mở liên quan'}
                      </Text>
                      <Ionicons name="arrow-forward" size={15} color={plan.color} />
                    </TouchableOpacity>
                  ) : null}
                </View>
              );
            })}
          </View>
        ))}

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 22,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  backBtn: {
    paddingTop: 2,
  },
  headerText: {
    flex: 1,
  },
  headerLabel: {
    fontSize: 12,
    fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold',
    color: 'rgba(255,255,255,0.82)',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.white,
    marginBottom: 6,
  },
  headerDesc: {
    fontSize: 13,
    lineHeight: 19,
    color: 'rgba(255,255,255,0.9)',
  },
  content: {
    flex: 1,
    marginTop: -10,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: Colors.background,
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  progressCard: {
    backgroundColor: Colors.white,
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  progressTop: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  progressIconBg: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    flex: 1,
  },
  progressTitle: {
    fontSize: 14,
    fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.textPrimary,
    marginBottom: 3,
  },
  progressDesc: {
    fontSize: 12,
    lineHeight: 17,
    color: Colors.textSecondary,
  },
  progressPct: {
    fontSize: 20,
    fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold',
  },
  progressTrack: {
    height: 8,
    borderRadius: 999,
    backgroundColor: Colors.background,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
  },
  sectionCard: {
    backgroundColor: Colors.white,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  sectionDesc: {
    fontSize: 12,
    lineHeight: 18,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  itemCard: {
    paddingVertical: 12,
  },
  itemCardBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  itemMain: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  checkCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  itemText: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 13,
    fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  itemTitleChecked: {
    textDecorationLine: 'line-through',
    color: Colors.textSecondary,
  },
  itemDesc: {
    fontSize: 12,
    lineHeight: 18,
    color: Colors.textSecondary,
  },
  actionBtn: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 10,
    marginLeft: 38,
    backgroundColor: Colors.background,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  actionBtnText: {
    fontSize: 12,
    fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold',
  },
});
