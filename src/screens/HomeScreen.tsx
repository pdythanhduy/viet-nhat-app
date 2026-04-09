import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../constants/colors';
import { ALERTS, EMERGENCY_CONTACTS } from '../constants/content';
import { RootStackParamList } from '../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const CATEGORIES = [
  {
    id: 'admin',
    title: 'Thủ tục\nhành chính',
    icon: 'document-text' as const,
    color: Colors.primary,
    bg: Colors.accent,
    tab: 'Admin' as const,
  },
  {
    id: 'daily',
    title: 'Cuộc sống\nhàng ngày',
    icon: 'sunny' as const,
    color: '#27AE60',
    bg: Colors.successLight,
    tab: 'DailyLife' as const,
  },
  {
    id: 'jobs',
    title: 'Tìm\nviệc làm',
    icon: 'briefcase' as const,
    color: '#9B59B6',
    bg: '#F3EBF9',
    tab: 'Jobs' as const,
  },
  {
    id: 'japanese',
    title: 'Tiếng\nNhật',
    icon: 'language' as const,
    color: '#E74C3C',
    bg: '#FDECEA',
    tab: 'Japanese' as const,
  },
];

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Chào buổi sáng';
  if (hour < 18) return 'Chào buổi chiều';
  return 'Chào buổi tối';
}

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();

  const handleCategoryPress = (tab: string | null) => {
    if (!tab) return;
    if (tab === 'DailyLife') {
      navigation.navigate('DailyLife');
    } else {
      (navigation as any).navigate('MainTabs', { screen: tab });
    }
  };

  const handleCallEmergency = (number: string) => {
    const tel = number.split('/')[0].trim().replace(/\s/g, '');
    Linking.openURL(`tel:${tel}`);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{getGreeting()} 👋</Text>
            <Text style={styles.appName}>Viet Nhật</Text>
            <Text style={styles.subtitle}>Đồng hành cùng bạn tại Nhật Bản</Text>
          </View>
          <TouchableOpacity
            style={styles.aiButton}
            onPress={() => navigation.navigate('AIChat', { title: 'Trợ lý AI' })}
          >
            <Ionicons name="chatbubble-ellipses" size={22} color={Colors.white} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {/* Alert Cards */}
          {ALERTS.map((alert) => (
            <TouchableOpacity
              key={alert.id}
              style={[
                styles.alertCard,
                alert.urgency === 'high' ? styles.alertHigh : styles.alertMedium,
              ]}
              onPress={() => (navigation as any).navigate('MainTabs', { screen: alert.actionScreen })}
            >
              <View style={styles.alertLeft}>
                <Ionicons
                  name={alert.urgency === 'high' ? 'warning' : 'information-circle'}
                  size={22}
                  color={alert.urgency === 'high' ? Colors.danger : Colors.warning}
                />
                <View style={styles.alertTextContainer}>
                  <Text style={styles.alertTitle}>{alert.title}</Text>
                  <Text style={styles.alertDesc}>{alert.description}</Text>
                </View>
              </View>
              <View style={styles.alertAction}>
                {alert.daysLeft && (
                  <View style={[styles.daysBadge, { backgroundColor: Colors.dangerLight }]}>
                    <Text style={[styles.daysText, { color: Colors.danger }]}>{alert.daysLeft} ngày</Text>
                  </View>
                )}
                <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
              </View>
            </TouchableOpacity>
          ))}

          {/* Section Title */}
          <Text style={styles.sectionTitle}>Danh mục</Text>

          {/* Category Cards */}
          <View style={styles.categoryGrid}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={[styles.categoryCard, { backgroundColor: cat.bg }]}
                onPress={() => handleCategoryPress(cat.tab)}
              >
                <View style={[styles.categoryIconBg, { backgroundColor: cat.color + '22' }]}>
                  <Ionicons name={cat.icon} size={28} color={cat.color} />
                </View>
                <Text style={[styles.categoryTitle, { color: cat.color }]}>{cat.title}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Quick AI Access */}
          <TouchableOpacity
            style={styles.quickAiCard}
            onPress={() => navigation.navigate('AIChat', { title: 'Trợ lý AI Viet Nhật' })}
          >
            <View style={styles.quickAiLeft}>
              <View style={styles.quickAiIconBg}>
                <Ionicons name="sparkles" size={20} color={Colors.white} />
              </View>
              <View>
                <Text style={styles.quickAiTitle}>Hỏi trợ lý AI ngay</Text>
                <Text style={styles.quickAiSub}>Mọi câu hỏi về cuộc sống tại Nhật</Text>
              </View>
            </View>
            <Ionicons name="arrow-forward-circle" size={28} color={Colors.primary} />
          </TouchableOpacity>

          {/* Emergency Contacts */}
          <Text style={styles.sectionTitle}>Liên hệ khẩn cấp</Text>
          <View style={styles.emergencyContainer}>
            {EMERGENCY_CONTACTS.map((contact) => (
              <TouchableOpacity
                key={contact.id}
                style={styles.emergencyCard}
                onPress={() => handleCallEmergency(contact.number)}
              >
                <View style={[styles.emergencyIcon, { backgroundColor: contact.color + '18' }]}>
                  <Ionicons name={contact.icon as any} size={20} color={contact.color} />
                </View>
                <View style={styles.emergencyInfo}>
                  <Text style={styles.emergencyName}>{contact.name}</Text>
                  <Text style={styles.emergencyNameJp}>{contact.nameJp}</Text>
                  <Text style={[styles.emergencyNumber, { color: contact.color }]}>{contact.number}</Text>
                </View>
                <Ionicons name="call-outline" size={18} color={contact.color} />
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.bottomPad} />
        </View>
      </ScrollView>
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
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greeting: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 2,
  },
  appName: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.white,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },
  aiButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  content: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    paddingHorizontal: 16,
    minHeight: 600,
  },
  alertCard: {
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderWidth: 1,
  },
  alertHigh: {
    backgroundColor: Colors.dangerLight,
    borderColor: '#F5B7B1',
  },
  alertMedium: {
    backgroundColor: Colors.warningLight,
    borderColor: '#FAD7A0',
  },
  alertLeft: {
    flexDirection: 'row',
    flex: 1,
    gap: 10,
  },
  alertTextContainer: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 3,
  },
  alertDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 17,
  },
  alertAction: {
    alignItems: 'flex-end',
    gap: 6,
    marginLeft: 8,
  },
  daysBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  daysText: {
    fontSize: 11,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginTop: 16,
    marginBottom: 12,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 4,
  },
  categoryCard: {
    width: '47%',
    borderRadius: 16,
    padding: 16,
    alignItems: 'flex-start',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  categoryIconBg: {
    width: 52,
    height: 52,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },
  quickAiCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    marginBottom: 4,
    borderWidth: 1.5,
    borderColor: Colors.primary + '30',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  quickAiLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  quickAiIconBg: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickAiTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  quickAiSub: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  emergencyContainer: {
    gap: 10,
  },
  emergencyCard: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  emergencyIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emergencyInfo: {
    flex: 1,
  },
  emergencyName: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  emergencyNameJp: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 1,
  },
  emergencyNumber: {
    fontSize: 15,
    fontWeight: '800',
    marginTop: 3,
  },
  bottomPad: {
    height: 24,
  },
});
