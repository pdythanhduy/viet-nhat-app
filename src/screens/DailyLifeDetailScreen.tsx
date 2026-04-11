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
import { Disclaimers } from '../constants/disclaimers';
import { DAILY_LIFE_CONTENT_META, DAILY_LIFE_TOPICS } from '../constants/content';
import { RootStackParamList } from '../navigation/AppNavigator';
import { formatLastUpdated, getSourceLabels } from '../utils/contentMetadata';
import type { DailyLifeSection } from '../types/content';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RouteType = RouteProp<RootStackParamList, 'DailyLifeDetail'>;

export default function DailyLifeDetailScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteType>();
  const [expandedSection, setExpandedSection] = useState<number | null>(0);

  const topic = DAILY_LIFE_TOPICS.find((t) => t.id === route.params.topicId);

  if (!topic) return null;

  React.useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: topic.title });
  }, [topic]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={[styles.topicHeader, { backgroundColor: topic.color }]}>
        <Text style={styles.topicJp}>{topic.titleJp}</Text>
        <Text style={styles.topicTitle}>{topic.title}</Text>
        <Text style={styles.topicDesc}>{topic.description}</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.metaBox}>
          <Ionicons name="information-circle-outline" size={16} color={Colors.primary} />
          <Text style={styles.metaText}>
            {Disclaimers.legal}
            {'\n'}Cập nhật: {formatLastUpdated(DAILY_LIFE_CONTENT_META.lastUpdated)}. Nguồn: {getSourceLabels(DAILY_LIFE_CONTENT_META)}.
          </Text>
        </View>

        {/* Sections */}
        {topic.sections && topic.sections.length > 0 ? (
          topic.sections.map((section: DailyLifeSection, index: number) => (
            <TouchableOpacity
              key={index}
              style={styles.sectionCard}
              onPress={() => setExpandedSection(expandedSection === index ? null : index)}
              activeOpacity={0.8}
            >
              <View style={styles.sectionHeader}>
                <View style={[styles.sectionNum, { backgroundColor: topic.color }]}>
                  <Text style={styles.sectionNumText}>{index + 1}</Text>
                </View>
                <Text style={styles.sectionTitle}>{section.title}</Text>
                <Ionicons
                  name={expandedSection === index ? 'chevron-up' : 'chevron-down'}
                  size={18}
                  color={Colors.textMuted}
                />
              </View>

              {expandedSection === index && (
                <View style={styles.sectionBody}>
                  {section.content ? (
                    <Text style={styles.sectionContent}>{section.content}</Text>
                  ) : null}

                  {section.items && section.items.length > 0 && (
                    <View style={styles.itemsList}>
                      {section.items.map((item: string, i: number) => (
                        <View key={i} style={styles.itemRow}>
                          <View style={[styles.itemBullet, { backgroundColor: topic.color }]} />
                          <Text style={styles.itemText}>{item}</Text>
                        </View>
                      ))}
                    </View>
                  )}

                  {section.tip ? (
                    <View style={[styles.tipBox, { backgroundColor: topic.color + '12', borderColor: topic.color + '30' }]}>
                      <Ionicons name="bulb" size={15} color={topic.color} />
                      <Text style={[styles.tipText, { color: topic.color }]}>{section.tip}</Text>
                    </View>
                  ) : null}
                </View>
              )}
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.noContentBox}>
            <Ionicons name="information-circle-outline" size={36} color={Colors.textMuted} />
            <Text style={styles.noContentText}>Nội dung đang được cập nhật</Text>
          </View>
        )}

        {/* Ask AI button */}
        <TouchableOpacity
          style={[styles.askAiButton, { backgroundColor: topic.color }]}
          onPress={() =>
            navigation.navigate('AIChat', {
              title: topic.title,
              prefilledQuestion: topic.prefilledQuestion,
            })
          }
        >
          <Ionicons name="sparkles" size={20} color={Colors.white} />
          <Text style={styles.askAiText}>Hỏi AI thêm về {topic.title}</Text>
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
  topicHeader: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 28,
  },
  topicJp: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.75)',
    marginBottom: 4,
  },
  topicTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.white,
    marginBottom: 6,
  },
  topicDesc: {
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
  metaBox: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor: Colors.accent,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.primary + '30',
  },
  metaText: {
    flex: 1,
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  sectionCard: {
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
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  sectionNum: {
    width: 30,
    height: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  sectionNumText: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.white,
  },
  sectionTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  sectionBody: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  sectionContent: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginTop: 12,
    marginBottom: 10,
  },
  itemsList: {
    gap: 8,
    marginBottom: 10,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  itemBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 6,
    flexShrink: 0,
  },
  itemText: {
    flex: 1,
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  tipBox: {
    flexDirection: 'row',
    gap: 8,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'flex-start',
    marginTop: 4,
  },
  tipText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '500',
  },
  noContentBox: {
    alignItems: 'center',
    paddingVertical: 40,
    gap: 8,
  },
  noContentText: {
    fontSize: 14,
    color: Colors.textMuted,
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
