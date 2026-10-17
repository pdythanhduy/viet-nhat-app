// Home — primary header block (greeting + title + subtitle + two icon
// buttons). The decorative circles are plain Views so the header needs
// no native gradient module and ships over EAS Update.

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '../../constants/colors';

interface HomeHeaderProps {
  greeting: string;
  guideCount: number;
  onSearchPress: () => void;
  onSettingsPress: () => void;
}

export function HomeHeader({ greeting, guideCount, onSearchPress, onSettingsPress }: HomeHeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.decorBig} />
      <View style={styles.decorSmall} />
      <View style={styles.topRow}>
        <View style={styles.brandPill}>
          <Text style={styles.brandPillText}>VIỆT</Text>
          <Ionicons name="swap-horizontal" size={12} color={Colors.white} />
          <Text style={styles.brandPillText}>NHẬT</Text>
        </View>
        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={styles.headerIconBtn}
            onPress={onSearchPress}
            accessibilityRole="button"
            accessibilityLabel="Tìm kiếm"
          >
            <Ionicons name="search-outline" size={21} color={Colors.white} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerIconBtn}
            onPress={onSettingsPress}
            accessibilityRole="button"
            accessibilityLabel="Cài đặt"
          >
            <Ionicons name="settings-outline" size={21} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.greeting}>{greeting} 👋</Text>
      <Text style={styles.appName}>Sống ở Nhật dễ hơn,{'\n'}bằng tiếng Việt.</Text>
      <Text style={styles.subtitle}>
        Thủ tục, việc làm, tiếng Nhật và kết nối quê nhà — cho người Việt đang ở Nhật và sắp sang Nhật.
      </Text>

      <View style={styles.trustRow}>
        <View style={styles.trustItem}>
          <Ionicons name="library-outline" size={13} color="rgba(255,255,255,0.9)" />
          <Text style={styles.trustText}>{guideCount}+ hướng dẫn</Text>
        </View>
        <View style={styles.trustItem}>
          <Ionicons name="shield-checkmark-outline" size={13} color="rgba(255,255,255,0.9)" />
          <Text style={styles.trustText}>Có nguồn chính thức</Text>
        </View>
        <View style={styles.trustItem}>
          <Ionicons name="cloud-offline-outline" size={13} color="rgba(255,255,255,0.9)" />
          <Text style={styles.trustText}>Dùng offline</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 34,
    overflow: 'hidden',
  },
  decorBig: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: Colors.primaryLight,
    opacity: 0.55,
    top: -110,
    right: -80,
  },
  decorSmall: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: Colors.primaryDark,
    opacity: 0.35,
    bottom: -60,
    left: -40,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  brandPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 11,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.16)',
  },
  brandPillText: {
    fontSize: 11,
    fontWeight: '800',
    fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.white,
    letterSpacing: 1,
  },
  greeting: { fontSize: 14, color: 'rgba(255,255,255,0.85)', marginBottom: 6 },
  appName: {
    fontSize: 26,
    lineHeight: 34,
    fontWeight: '800',
    fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.white,
  },
  subtitle: { marginTop: 8, fontSize: 13, color: 'rgba(255,255,255,0.85)', lineHeight: 19, maxWidth: 340 },
  trustRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 14, marginTop: 14 },
  trustItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  trustText: {
    fontSize: 11,
    fontWeight: '600',
    fontFamily: 'BeVietnamPro_600SemiBold',
    color: 'rgba(255,255,255,0.9)',
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  headerIconBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.16)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
