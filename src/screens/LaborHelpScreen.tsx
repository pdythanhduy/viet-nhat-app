import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
  Clipboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../constants/colors';
import { JOBS_CONTENT_META, LABOR_HELP_SCENARIOS } from '../constants/content';
import { RootStackParamList } from '../navigation/AppNavigator';
import { formatLastUpdated } from '../utils/contentMetadata';
import {
  clearLaborHelpProgress,
  loadLaborHelpProgress,
  toggleLaborHelpEvidenceItem,
} from '../utils/laborHelpProgress';
import { markLaborResourceViewed } from '../utils/laborResources';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

function openUrl(url: string) {
  Linking.openURL(url).catch(() =>
    Alert.alert('Không thể mở link', 'Vui lòng kiểm tra kết nối mạng rồi thử lại.')
  );
}

function copyScenarioBlock(
  title: string,
  description: string,
  doNow: string[],
  collectEvidence: string[],
  contact: string[]
) {
  const content = [
    title,
    description,
    '',
    'Làm ngay:',
    ...doNow.map((item) => `- ${item}`),
    '',
    'Cần giữ bằng chứng gì:',
    ...collectEvidence.map((item) => `- ${item}`),
    '',
    'Liên hệ:',
    ...contact.map((item) => `- ${item}`),
  ].join('\n');

  Clipboard.setString(content);
  Alert.alert('Đã sao chép', `Đã copy hướng dẫn "${title}".`);
}

export default function LaborHelpScreen() {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const [progressMap, setProgressMap] = useState<Record<string, Set<string>>>({});

  useFocusEffect(
    React.useCallback(() => {
      void markLaborResourceViewed('labor-help');
    }, [])
  );

  useEffect(() => {
    Promise.all(
      LABOR_HELP_SCENARIOS.map(async (scenario) => [
        scenario.id,
        new Set(await loadLaborHelpProgress(scenario.id)),
      ] as const)
    ).then((entries) => {
      setProgressMap(Object.fromEntries(entries));
    });
  }, []);

  const toggleEvidence = async (scenarioId: string, item: string) => {
    const next = await toggleLaborHelpEvidenceItem(scenarioId, item);
    setProgressMap((prev) => ({ ...prev, [scenarioId]: new Set(next) }));
  };

  const clearScenario = async (scenarioId: string) => {
    await clearLaborHelpProgress(scenarioId);
    setProgressMap((prev) => ({ ...prev, [scenarioId]: new Set() }));
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerJp}>相談・トラブル対応</Text>
        <Text style={styles.headerTitle}>Khiếu nại / cần giúp gì</Text>
        <Text style={styles.headerDesc}>
          Hướng dẫn thực dụng khi bị nợ lương, ép làm quá giờ, giữ giấy tờ hoặc bị cản trở nghỉ
          việc.
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.metaCard}>
          <Ionicons name="shield-checkmark-outline" size={18} color={Colors.primary} />
          <Text style={styles.metaText}>
            Xác minh nội dung: {formatLastUpdated(JOBS_CONTENT_META.lastUpdated)}. Khi có vụ việc
            thực tế, hãy giữ bằng chứng càng sớm càng tốt và đối chiếu lại nguồn chính thức.
          </Text>
        </View>

        {LABOR_HELP_SCENARIOS.map((scenario) => {
          const checked = progressMap[scenario.id] ?? new Set<string>();
          const total = scenario.collectEvidence.length;
          const done = scenario.collectEvidence.filter((item) => checked.has(item)).length;

          return (
            <View key={scenario.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <View
                  style={[
                    styles.urgencyBadge,
                    scenario.urgency === 'high' ? styles.urgencyHigh : styles.urgencyMedium,
                  ]}
                >
                  <Text
                    style={[
                      styles.urgencyText,
                      scenario.urgency === 'high'
                        ? styles.urgencyTextHigh
                        : styles.urgencyTextMedium,
                    ]}
                  >
                    {scenario.urgency === 'high' ? 'Ưu tiên cao' : 'Nên xử lý sớm'}
                  </Text>
                </View>
                <Text style={styles.cardTitle}>{scenario.title}</Text>
              </View>

              <Text style={styles.cardDesc}>{scenario.description}</Text>

              <TouchableOpacity
                style={styles.copyScenarioButton}
                onPress={() =>
                  copyScenarioBlock(
                    scenario.title,
                    scenario.description,
                    scenario.doNow,
                    scenario.collectEvidence,
                    scenario.contact
                  )
                }
              >
                <Ionicons name="copy-outline" size={15} color={Colors.primary} />
                <Text style={styles.copyScenarioText}>Copy tình huống này</Text>
              </TouchableOpacity>

              <Section title="Làm ngay">
                {scenario.doNow.map((item) => (
                  <BulletRow key={item} text={item} color={Colors.primary} />
                ))}
              </Section>

              <Section title={`Cần giữ bằng chứng gì (${done}/${total})`}>
                {done > 0 ? (
                  <TouchableOpacity
                    onPress={() => clearScenario(scenario.id)}
                    style={styles.resetButton}
                  >
                    <Text style={styles.resetButtonText}>Đặt lại checklist</Text>
                  </TouchableOpacity>
                ) : null}
                {scenario.collectEvidence.map((item) => {
                  const isChecked = checked.has(item);
                  return (
                    <TouchableOpacity
                      key={item}
                      style={styles.evidenceRow}
                      onPress={() => toggleEvidence(scenario.id, item)}
                      activeOpacity={0.8}
                    >
                      <View
                        style={[
                          styles.checkCircle,
                          isChecked && {
                            backgroundColor: Colors.primary,
                            borderColor: Colors.primary,
                          },
                        ]}
                      >
                        {isChecked ? (
                          <Ionicons name="checkmark" size={14} color={Colors.white} />
                        ) : null}
                      </View>
                      <Text style={[styles.evidenceText, isChecked && styles.evidenceTextDone]}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </Section>

              <Section title="Liên hệ">
                {scenario.contact.map((item) => (
                  <BulletRow key={item} text={item} color={Colors.success} />
                ))}
              </Section>
            </View>
          );
        })}

        <TouchableOpacity
          style={styles.linkCard}
          onPress={() => openUrl('https://www.check-roudou.mhlw.go.jp/soudan/foreigner_vnm.html')}
        >
          <Ionicons name="call-outline" size={18} color={Colors.primary} />
          <View style={styles.linkTextBlock}>
            <Text style={styles.linkTitle}>Mở hotline tiếng Việt chính thức</Text>
            <Text style={styles.linkSub}>0570-001-706 - xem khung giờ trên trang chính thức</Text>
          </View>
          <Ionicons name="open-outline" size={16} color={Colors.textMuted} />
        </TouchableOpacity>

        <View style={{ height: 32 + Math.max(insets.bottom, 12) }} />
      </View>
    </ScrollView>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function BulletRow({ text, color }: { text: string; color: string }) {
  return (
    <View style={styles.bulletRow}>
      <View style={[styles.bullet, { backgroundColor: color }]} />
      <Text style={styles.bulletText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 28,
  },
  headerJp: { fontSize: 13, color: 'rgba(255,255,255,0.75)', marginBottom: 4 },
  headerTitle: { fontSize: 22, fontWeight: '800', color: Colors.white, marginBottom: 6 },
  headerDesc: { fontSize: 13, color: 'rgba(255,255,255,0.85)', lineHeight: 19 },
  content: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -16,
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  metaCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: Colors.accent,
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.primary + '30',
  },
  metaText: { flex: 1, fontSize: 12, color: Colors.textSecondary, lineHeight: 18 },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: { marginBottom: 8 },
  urgencyBadge: {
    alignSelf: 'flex-start',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 8,
  },
  urgencyHigh: { backgroundColor: Colors.dangerLight },
  urgencyMedium: { backgroundColor: Colors.warningLight },
  urgencyText: { fontSize: 10, fontWeight: '800' },
  urgencyTextHigh: { color: Colors.danger },
  urgencyTextMedium: { color: Colors.warning },
  cardTitle: { fontSize: 15, fontWeight: '800', color: Colors.textPrimary },
  cardDesc: { fontSize: 13, color: Colors.textSecondary, lineHeight: 19, marginBottom: 10 },
  copyScenarioButton: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.accent,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 4,
  },
  copyScenarioText: { fontSize: 12, fontWeight: '700', color: Colors.primary },
  section: { marginTop: 8 },
  sectionTitle: { fontSize: 12, fontWeight: '800', color: Colors.textPrimary, marginBottom: 8 },
  bulletRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 7 },
  bullet: { width: 6, height: 6, borderRadius: 3, marginTop: 6, flexShrink: 0 },
  bulletText: { flex: 1, fontSize: 13, color: Colors.textSecondary, lineHeight: 19 },
  resetButton: {
    alignSelf: 'flex-start',
    borderRadius: 8,
    backgroundColor: Colors.accent,
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginBottom: 8,
  },
  resetButtonText: { fontSize: 12, fontWeight: '700', color: Colors.primary },
  evidenceRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 8 },
  checkCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
    flexShrink: 0,
  },
  evidenceText: { flex: 1, fontSize: 13, color: Colors.textSecondary, lineHeight: 19 },
  evidenceTextDone: {
    color: Colors.textPrimary,
    textDecorationLine: 'line-through',
  },
  linkCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.primary + '30',
  },
  linkTextBlock: { flex: 1 },
  linkTitle: { fontSize: 13, fontWeight: '700', color: Colors.primary },
  linkSub: { fontSize: 11, color: Colors.textMuted, marginTop: 2 },
  aiButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    padding: 16,
    borderRadius: 16,
    marginTop: 4,
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  aiText: { fontSize: 15, fontWeight: '700', color: Colors.white },
});
