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
import { ADMIN_GUIDES } from '../constants/content';
import { RootStackParamList } from '../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ICON_MAP: Record<string, keyof typeof Ionicons.glyphMap> = {
  card: 'card',
  heart: 'heart',
  'id-card': 'id-card',
};

export default function AdminScreen() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Thủ tục hành chính</Text>
        <Text style={styles.headerSub}>Hướng dẫn từng bước cho người Việt tại Nhật</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.infoCard}>
          <Ionicons name="information-circle" size={20} color={Colors.primary} />
          <Text style={styles.infoText}>
            Tất cả hướng dẫn dựa trên quy định chính thức của Nhật Bản năm 2024. Hãy kiểm tra lại với cơ quan chức năng để đảm bảo thông tin mới nhất.
          </Text>
        </View>

        {ADMIN_GUIDES.map((guide) => (
          <TouchableOpacity
            key={guide.id}
            style={styles.guideCard}
            onPress={() => navigation.navigate('AdminDetail', { guideId: guide.id })}
          >
            <View style={[styles.guideIconBg, { backgroundColor: guide.color + '18' }]}>
              <Ionicons name={ICON_MAP[guide.icon] || 'document'} size={26} color={guide.color} />
            </View>
            <View style={styles.guideInfo}>
              <Text style={styles.guideTitleJp}>{guide.titleJp}</Text>
              <Text style={styles.guideTitle}>{guide.title}</Text>
              <Text style={styles.guideDesc} numberOfLines={2}>{guide.description}</Text>
              <View style={styles.stepsInfo}>
                <Ionicons name="list" size={13} color={Colors.textMuted} />
                <Text style={styles.stepsText}>{guide.steps.length} bước thực hiện</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
          </TouchableOpacity>
        ))}

        {/* Ask AI */}
        <TouchableOpacity
          style={styles.aiCard}
          onPress={() =>
            navigation.navigate('AIChat', {
              title: 'Hỏi về thủ tục hành chính',
              prefilledQuestion: 'Tôi cần hỏi về thủ tục hành chính tại Nhật Bản. ',
            })
          }
        >
          <Ionicons name="sparkles" size={22} color={Colors.white} />
          <View style={styles.aiTextContainer}>
            <Text style={styles.aiTitle}>Có câu hỏi khác?</Text>
            <Text style={styles.aiSub}>Hỏi trợ lý AI của chúng tôi ngay</Text>
          </View>
          <Ionicons name="arrow-forward" size={18} color={Colors.white} />
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
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  infoCard: {
    backgroundColor: Colors.accent,
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.primary + '30',
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  guideCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
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
  guideIconBg: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  guideInfo: {
    flex: 1,
  },
  guideTitleJp: {
    fontSize: 11,
    color: Colors.textMuted,
    marginBottom: 2,
  },
  guideTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  guideDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 17,
    marginBottom: 6,
  },
  stepsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  stepsText: {
    fontSize: 11,
    color: Colors.textMuted,
  },
  aiCard: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 4,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  aiTextContainer: {
    flex: 1,
  },
  aiTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.white,
  },
  aiSub: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 2,
  },
});
