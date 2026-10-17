// A curated "Hành trình" — an ordered reading list of existing guides
// for one stage of life between Việt Nam and Nhật. Opened from the Home
// journey rail.

import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Colors } from '../constants/colors';
import { ADMIN_GUIDES } from '../constants/content/adminGuides';
import { getGuideCollection } from '../constants/guideCollections';
import { RootStackParamList } from '../navigation/AppNavigator';

// Guide descriptions carry **bold** for RichText; this list shows plain text.
function stripBold(value: string): string {
  return value.replace(/\*\*([^*]+)\*\*/g, '$1');
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type CollectionRoute = RouteProp<RootStackParamList, 'GuideCollection'>;

export default function GuideCollectionScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { params } = useRoute<CollectionRoute>();
  const collection = getGuideCollection(params.collectionId);

  const guides = useMemo(
    () =>
      (collection?.guideIds ?? [])
        .map((id) => ADMIN_GUIDES.find((guide) => guide.id === id))
        .filter((guide): guide is (typeof ADMIN_GUIDES)[number] => Boolean(guide)),
    [collection]
  );

  if (!collection) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: Colors.background }]}>
        <Text style={styles.missing}>Không tìm thấy hành trình này.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: collection.color }]} edges={['top']}>
      <View style={[styles.header, { backgroundColor: collection.color }]}>
        <View style={styles.decorBig} />
        <View style={styles.decorSmall} />
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          accessibilityRole="button"
          accessibilityLabel="Quay lại"
        >
          <Ionicons name="arrow-back" size={22} color={Colors.white} />
        </TouchableOpacity>
        <View style={styles.headerIcon}>
          <Ionicons name={collection.icon} size={26} color={Colors.white} />
        </View>
        <Text style={styles.headerEyebrow}>HÀNH TRÌNH · {collection.audience.toUpperCase()}</Text>
        <Text style={styles.headerTitle}>{collection.title}</Text>
        <Text style={styles.headerDesc}>{collection.description}</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentInner} showsVerticalScrollIndicator={false}>
        {collection.checklistScreen ? (
          <TouchableOpacity
            style={[styles.checklistCta, { backgroundColor: collection.bg }]}
            onPress={() => navigation.navigate(collection.checklistScreen!)}
            activeOpacity={0.85}
          >
            <Ionicons name="checkmark-done-outline" size={20} color={collection.color} />
            <Text style={[styles.checklistCtaText, { color: collection.color }]}>
              Mở checklist theo hồ sơ của bạn
            </Text>
            <Ionicons name="chevron-forward" size={18} color={collection.color} />
          </TouchableOpacity>
        ) : null}

        <Text style={styles.sectionLabel}>{guides.length} BÀI · ĐỌC THEO THỨ TỰ</Text>

        {guides.map((guide, index) => (
          <TouchableOpacity
            key={guide.id}
            style={styles.row}
            onPress={() => navigation.navigate('AdminDetail', { guideId: guide.id })}
            activeOpacity={0.85}
          >
            <View style={styles.timeline}>
              <View style={[styles.stepDot, { backgroundColor: collection.color }]}>
                <Text style={styles.stepNumber}>{index + 1}</Text>
              </View>
              {index < guides.length - 1 ? <View style={[styles.stepLine, { backgroundColor: collection.bg }]} /> : null}
            </View>
            <View style={styles.card}>
              <View style={[styles.cardIcon, { backgroundColor: `${guide.color}1A` }]}>
                <Ionicons name={guide.icon} size={18} color={guide.color} />
              </View>
              <View style={styles.cardBody}>
                <Text style={styles.cardTitle} numberOfLines={2}>{guide.title}</Text>
                <Text style={styles.cardDesc} numberOfLines={2}>{stripBold(guide.description)}</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles.bottomPad} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  missing: { padding: 24, fontSize: 14, color: Colors.textSecondary },

  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 34,
    overflow: 'hidden',
  },
  decorBig: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(255,255,255,0.08)',
    top: -80,
    right: -60,
  },
  decorSmall: {
    position: 'absolute',
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: 'rgba(255,255,255,0.07)',
    bottom: -40,
    right: 70,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: 'rgba(255,255,255,0.16)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  headerEyebrow: {
    fontSize: 11,
    fontWeight: '800',
    fontFamily: 'BeVietnamPro_800ExtraBold',
    letterSpacing: 0.9,
    color: 'rgba(255,255,255,0.8)',
  },
  headerTitle: {
    marginTop: 4,
    fontSize: 26,
    lineHeight: 33,
    fontWeight: '800',
    fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.white,
  },
  headerDesc: {
    marginTop: 8,
    fontSize: 13,
    lineHeight: 20,
    color: 'rgba(255,255,255,0.88)',
  },

  content: {
    flex: 1,
    backgroundColor: Colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -18,
  },
  contentInner: { padding: 16, paddingTop: 20 },

  checklistCta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 14,
    padding: 14,
    marginBottom: 18,
  },
  checklistCtaText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
  },

  sectionLabel: {
    fontSize: 12,
    fontWeight: '800',
    fontFamily: 'BeVietnamPro_800ExtraBold',
    color: '#44506B',
    letterSpacing: 0.3,
    marginBottom: 12,
  },

  row: { flexDirection: 'row', gap: 12 },
  timeline: { width: 28, alignItems: 'center' },
  stepDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  stepNumber: {
    fontSize: 12,
    fontWeight: '800',
    fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.white,
  },
  stepLine: { flex: 1, width: 3, borderRadius: 2, marginTop: 4 },

  card: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: Colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 14,
    marginBottom: 10,
  },
  cardIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBody: { flex: 1, gap: 3 },
  cardTitle: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textPrimary,
  },
  cardDesc: { fontSize: 12, lineHeight: 17, color: Colors.textSecondary },

  bottomPad: { height: 32 },
});
