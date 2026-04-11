import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../constants/colors';
import { DAILY_LIFE_TOPICS } from '../constants/content';
import { RootStackParamList } from '../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ICON_MAP: Record<string, keyof typeof Ionicons.glyphMap> = {
  home: 'home',
  trash: 'trash',
  train: 'train',
  basket: 'basket',
  cash: 'cash',
  medical: 'medical',
  receipt: 'receipt',
  flash: 'flash',
  warning: 'warning',
  mail: 'mail',
};

export default function DailyLifeScreen() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Cuộc sống hàng ngày</Text>
        <Text style={styles.headerSub}>Mọi thứ bạn cần biết để sống tốt ở Nhật</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionNote}>
          Nhấn vào chủ đề để xem thông tin chi tiết. Cuối mỗi chủ đề có nút hỏi AI nếu bạn cần tư vấn thêm.
        </Text>

        {DAILY_LIFE_TOPICS.map((topic) => (
          <TouchableOpacity
            key={topic.id}
            style={styles.topicCard}
            onPress={() =>
              navigation.navigate('DailyLifeDetail', { topicId: topic.id })
            }
          >
            <View style={[styles.topicIcon, { backgroundColor: topic.color + '18' }]}>
              <Ionicons name={ICON_MAP[topic.icon] || 'help-circle'} size={26} color={topic.color} />
            </View>
            <View style={styles.topicInfo}>
              <Text style={styles.topicJp}>{topic.titleJp}</Text>
              <Text style={styles.topicTitle}>{topic.title}</Text>
              <Text style={styles.topicDesc} numberOfLines={2}>{topic.description}</Text>
            </View>
            <View style={[styles.aiChip, { backgroundColor: topic.color + '18' }]}>
              <Ionicons name="chevron-forward" size={12} color={topic.color} />
              <Text style={[styles.aiChipText, { color: topic.color }]}>Xem</Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* General AI Question */}
        <TouchableOpacity
          style={styles.generalAiCard}
          onPress={() =>
            navigation.navigate('AIChat', {
              title: 'Cuộc sống tại Nhật',
              prefilledQuestion: '',
            })
          }
        >
          <Ionicons name="chatbubbles" size={24} color={Colors.primary} />
          <View style={styles.generalAiText}>
            <Text style={styles.generalAiTitle}>Có câu hỏi khác về cuộc sống?</Text>
            <Text style={styles.generalAiSub}>Nhập câu hỏi tự do cho AI của bạn</Text>
          </View>
          <Ionicons name="arrow-forward-circle" size={26} color={Colors.primary} />
        </TouchableOpacity>

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
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.white,
  },
  headerSub: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 4,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -16,
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  sectionNote: {
    fontSize: 12,
    color: Colors.textMuted,
    backgroundColor: Colors.accent,
    padding: 10,
    borderRadius: 10,
    marginBottom: 14,
    lineHeight: 17,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  topicCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 10,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  topicIcon: {
    width: 54,
    height: 54,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topicInfo: {
    flex: 1,
  },
  topicJp: {
    fontSize: 11,
    color: Colors.textMuted,
    marginBottom: 2,
  },
  topicTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 3,
  },
  topicDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 17,
  },
  aiChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 10,
  },
  aiChipText: {
    fontSize: 11,
    fontWeight: '700',
  },
  generalAiCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 4,
    borderWidth: 1.5,
    borderColor: Colors.primary + '30',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  generalAiText: {
    flex: 1,
  },
  generalAiTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  generalAiSub: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
});
