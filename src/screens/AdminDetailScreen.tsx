import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../constants/colors';
import { ADMIN_GUIDES } from '../constants/content';
import { RootStackParamList } from '../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RouteType = RouteProp<RootStackParamList, 'AdminDetail'>;

export default function AdminDetailScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteType>();
  const [expandedStep, setExpandedStep] = useState<number | null>(0);

  const guide = ADMIN_GUIDES.find((g) => g.id === route.params.guideId);

  if (!guide) return null;

  React.useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: guide.title });
  }, [guide]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Guide Header */}
      <View style={[styles.guideHeader, { backgroundColor: guide.color }]}>
        <Text style={styles.guideJp}>{guide.titleJp}</Text>
        <Text style={styles.guideTitle}>{guide.title}</Text>
        <Text style={styles.guideDesc}>{guide.description}</Text>
      </View>

      <View style={styles.content}>
        {/* Progress indicator */}
        <View style={styles.progressContainer}>
          {guide.steps.map((step, index) => (
            <React.Fragment key={step.step}>
              <View
                style={[
                  styles.progressDot,
                  { backgroundColor: guide.color },
                ]}
              >
                <Text style={styles.progressNum}>{step.step}</Text>
              </View>
              {index < guide.steps.length - 1 && (
                <View style={[styles.progressLine, { backgroundColor: guide.color + '40' }]} />
              )}
            </React.Fragment>
          ))}
        </View>

        {/* Steps */}
        {guide.steps.map((step, index) => (
          <TouchableOpacity
            key={step.step}
            style={styles.stepCard}
            onPress={() => setExpandedStep(expandedStep === index ? null : index)}
            activeOpacity={0.8}
          >
            <View style={styles.stepHeader}>
              <View style={[styles.stepNum, { backgroundColor: guide.color }]}>
                <Text style={styles.stepNumText}>{step.step}</Text>
              </View>
              <Text style={styles.stepTitle}>{step.title}</Text>
              <Ionicons
                name={expandedStep === index ? 'chevron-up' : 'chevron-down'}
                size={18}
                color={Colors.textMuted}
              />
            </View>

            {expandedStep === index && (
              <View style={styles.stepBody}>
                <Text style={styles.stepDesc}>{step.description}</Text>

                {step.documents.length > 0 && (
                  <View style={styles.docsSection}>
                    <View style={styles.docsSectionTitle}>
                      <Ionicons name="documents" size={15} color={guide.color} />
                      <Text style={[styles.docsTitleText, { color: guide.color }]}>
                        Giấy tờ cần chuẩn bị
                      </Text>
                    </View>
                    {step.documents.map((doc, i) => (
                      <View key={i} style={styles.docItem}>
                        <View style={[styles.docBullet, { backgroundColor: guide.color }]} />
                        <Text style={styles.docText}>{doc}</Text>
                      </View>
                    ))}
                  </View>
                )}

                {step.tip && (
                  <View style={[styles.tipBox, { backgroundColor: guide.color + '12', borderColor: guide.color + '30' }]}>
                    <Ionicons name="bulb" size={15} color={guide.color} />
                    <Text style={[styles.tipText, { color: guide.color === Colors.primary ? Colors.primaryDark : guide.color }]}>
                      {step.tip}
                    </Text>
                  </View>
                )}
              </View>
            )}
          </TouchableOpacity>
        ))}

        {/* Ask AI about this guide */}
        <TouchableOpacity
          style={[styles.askAiButton, { backgroundColor: guide.color }]}
          onPress={() =>
            navigation.navigate('AIChat', {
              title: guide.title,
              prefilledQuestion: `Tôi cần được tư vấn chi tiết hơn về quy trình "${guide.title}" (${guide.titleJp}) ở Nhật Bản. `,
            })
          }
        >
          <Ionicons name="sparkles" size={20} color={Colors.white} />
          <Text style={styles.askAiText}>Hỏi AI về {guide.title}</Text>
        </TouchableOpacity>

        <View style={{ height: 32 }} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  guideHeader: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 28,
  },
  guideJp: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.75)',
    marginBottom: 4,
  },
  guideTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.white,
    marginBottom: 6,
  },
  guideDesc: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 19,
  },
  content: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -16,
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  progressDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressNum: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.white,
  },
  progressLine: {
    flex: 1,
    height: 2,
    marginHorizontal: 4,
  },
  stepCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginBottom: 10,
    overflow: 'hidden',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  stepNum: {
    width: 30,
    height: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumText: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.white,
  },
  stepTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  stepBody: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  stepDesc: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginTop: 12,
    marginBottom: 12,
  },
  docsSection: {
    backgroundColor: Colors.background,
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  docsSectionTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  docsTitleText: {
    fontSize: 12,
    fontWeight: '700',
  },
  docItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 5,
  },
  docBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 5,
    flexShrink: 0,
  },
  docText: {
    flex: 1,
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  tipBox: {
    flexDirection: 'row',
    gap: 8,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'flex-start',
  },
  tipText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '500',
  },
  askAiButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    padding: 16,
    borderRadius: 16,
    marginTop: 8,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 5,
  },
  askAiText: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.white,
  },
});
