// My Japan Plan — Phase 0 UI mock for the 4-question wizard.
//
// Phase 0: shape only. Every answer just moves to the next question;
// the final answer hands off to PlanDetailScreen which renders a
// hardcoded sample plan (no real branch logic yet). Phase 1 will
// route the answers through buildLostCardPlan() and render the real
// plan output.
//
// See docs/feature-my-japan-plan-assessment.md §4.2 and §4.3 for the
// real wizard / branch design.

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Colors } from '../constants/colors';
import { RootStackParamList } from '../navigation/AppNavigator';
import {
  LOST_CARD_WIZARD,
  WizardOption,
  WizardQuestion,
} from '../constants/planFlows/lostResidenceCard.sample';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type PlanWizardRouteProp = RouteProp<RootStackParamList, 'PlanWizard'>;

export default function PlanWizardScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<PlanWizardRouteProp>();

  // Phase 0 only handles the "lost-residence-card" flow — fail gracefully
  // for the other situation IDs which aren't interactive yet.
  if (route.params.situationId !== 'lost-residence-card') {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <UnsupportedFlow onBack={() => navigation.goBack()} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <WizardFlow
        questions={LOST_CARD_WIZARD}
        onBack={() => navigation.goBack()}
        onFinish={(answers) => {
          navigation.replace('PlanDetail', {
            situationId: route.params.situationId,
            answers,
          });
        }}
      />
    </SafeAreaView>
  );
}

interface WizardFlowProps {
  questions: WizardQuestion[];
  onBack: () => void;
  onFinish: (answers: Record<string, string>) => void;
}

function WizardFlow({ questions, onBack, onFinish }: WizardFlowProps) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const current = questions[index];
  const isLast = index === questions.length - 1;

  const handlePick = (option: WizardOption) => {
    const nextAnswers = { ...answers, [current.id]: option.id };
    setAnswers(nextAnswers);

    if (isLast) {
      onFinish(nextAnswers);
      return;
    }
    setIndex(index + 1);
  };

  const handleBack = () => {
    if (index === 0) {
      onBack();
      return;
    }
    setIndex(index - 1);
  };

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={handleBack}
          accessibilityLabel="Quay lại"
        >
          <Ionicons name="arrow-back" size={22} color={Colors.white} />
        </TouchableOpacity>
        <View style={styles.headerText}>
          <Text style={styles.headerLabel}>
            Câu {current.step}/{current.total} · Mất thẻ cư trú
          </Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${(current.step / current.total) * 100}%` },
              ]}
            />
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.prompt}>{current.prompt}</Text>

          <View style={styles.optionsWrap}>
            {current.options.map((option) => {
              const selected = answers[current.id] === option.id;
              return (
                <TouchableOpacity
                  key={option.id}
                  style={[styles.optionCard, selected && styles.optionCardSelected]}
                  onPress={() => handlePick(option)}
                  accessibilityRole="button"
                  accessibilityLabel={option.label}
                >
                  <View style={styles.optionTextBlock}>
                    <Text style={styles.optionLabel}>{option.label}</Text>
                    {option.hint ? <Text style={styles.optionHint}>{option.hint}</Text> : null}
                  </View>
                  <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.helperText}>
            Bạn có thể quay lại để đổi đáp án. Phase 0: lộ trình hiển thị là dữ liệu mẫu —
            chưa cá nhân hóa theo đáp án thực tế.
          </Text>
        </ScrollView>
      </View>
    </>
  );
}

function UnsupportedFlow({ onBack }: { onBack: () => void }) {
  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack} accessibilityLabel="Quay lại">
          <Ionicons name="arrow-back" size={22} color={Colors.white} />
        </TouchableOpacity>
        <View style={styles.headerText}>
          <Text style={styles.headerTitle}>Sắp có</Text>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.unsupportedBox}>
          <Ionicons name="hourglass-outline" size={36} color={Colors.textMuted} />
          <Text style={styles.unsupportedTitle}>Tình huống này chưa có lộ trình</Text>
          <Text style={styles.unsupportedDesc}>
            Phase 0 chỉ có lộ trình "Mất thẻ cư trú". Các tình huống khác sẽ ra ở Phase 2.
          </Text>
          <TouchableOpacity style={styles.unsupportedBtn} onPress={onBack}>
            <Text style={styles.unsupportedBtnText}>Quay lại</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
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
  headerLabel: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 13,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.white,
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.white,
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
    paddingBottom: 32,
  },
  prompt: {
    fontSize: 18,
    fontWeight: '800',
    fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.textPrimary,
    lineHeight: 25,
    marginTop: 8,
    marginBottom: 20,
  },
  optionsWrap: {
    gap: 10,
    marginBottom: 16,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  optionCardSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.accent,
  },
  optionTextBlock: { flex: 1 },
  optionLabel: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  optionHint: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 17,
  },
  helperText: {
    fontSize: 11,
    color: Colors.textMuted,
    lineHeight: 15,
    marginTop: 8,
    paddingHorizontal: 4,
  },
  unsupportedBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    gap: 12,
  },
  unsupportedTitle: {
    fontSize: 16,
    fontWeight: '800',
    fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.textPrimary,
    marginTop: 8,
  },
  unsupportedDesc: {
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 19,
  },
  unsupportedBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 8,
  },
  unsupportedBtnText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
  },
});
