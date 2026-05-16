// Phase 1 UI mock — processing screen.
// Uses setTimeout to simulate AI latency, then navigates to Result.
// Phase 2 will replace timer with real POST /api/mail/analyze + polling/streaming.

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../constants/colors';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { track } from '../utils/analytics';

type Nav = NativeStackNavigationProp<RootStackParamList, 'MailProcessing'>;
type Rt = RouteProp<RootStackParamList, 'MailProcessing'>;

const STEPS = [
  { icon: 'scan' as const, label: 'Đang nhận diện thư...' },
  { icon: 'document-text' as const, label: 'Đang đọc nội dung tiếng Nhật...' },
  { icon: 'sparkles' as const, label: 'Đang tóm tắt sang tiếng Việt...' },
];

const STEP_INTERVAL_MS = 800;
const TOTAL_DELAY_MS = STEP_INTERVAL_MS * STEPS.length;

export default function MailProcessingScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Rt>();
  const { sampleId } = route.params;
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
    }, STEP_INTERVAL_MS);

    const finishTimer = setTimeout(() => {
      track('mail_translated');
      navigation.replace('MailResult', { sampleId });
    }, TOTAL_DELAY_MS);

    return () => {
      clearInterval(stepTimer);
      clearTimeout(finishTimer);
    };
  }, [navigation, sampleId]);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <View style={styles.body}>
        <View style={styles.iconBg}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>

        <Text style={styles.title}>Đang phân tích thư của bạn</Text>

        <View style={styles.steps}>
          {STEPS.map((step, i) => {
            const isDone = i < stepIndex;
            const isActive = i === stepIndex;
            return (
              <View key={i} style={styles.stepRow}>
                <View
                  style={[
                    styles.stepIconBg,
                    isDone && styles.stepIconBgDone,
                    isActive && styles.stepIconBgActive,
                  ]}
                >
                  <Ionicons
                    name={isDone ? 'checkmark' : step.icon}
                    size={16}
                    color={isDone ? Colors.white : isActive ? Colors.primary : Colors.textMuted}
                  />
                </View>
                <Text
                  style={[
                    styles.stepLabel,
                    (isActive || isDone) && styles.stepLabelActive,
                  ]}
                >
                  {step.label}
                </Text>
              </View>
            );
          })}
        </View>

        <Text style={styles.note}>Phase 1 — đây là kết quả mẫu, không gọi AI thật.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  iconBg: {
    width: 96,
    height: 96,
    borderRadius: 28,
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.textPrimary,
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 26,
  },
  steps: {
    width: '100%',
    gap: 12,
    marginBottom: 32,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stepIconBg: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: Colors.background,
    borderWidth: 1.5,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepIconBgActive: {
    backgroundColor: Colors.accent,
    borderColor: Colors.primary,
  },
  stepIconBgDone: {
    backgroundColor: Colors.success,
    borderColor: Colors.success,
  },
  stepLabel: {
    flex: 1,
    fontSize: 13,
    color: Colors.textMuted,
    lineHeight: 20,
  },
  stepLabelActive: {
    color: Colors.textPrimary,
    fontWeight: '600',
    fontFamily: 'BeVietnamPro_600SemiBold',
  },
  note: {
    fontSize: 11,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 17,
  },
});
