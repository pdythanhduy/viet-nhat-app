// Home — primary header block (greeting + title + subtitle + two icon
// buttons). Extracted from HomeScreen to keep the screen file scannable;
// rendered output is byte-for-byte identical to the original inline JSX.

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '../../constants/colors';

interface HomeHeaderProps {
  greeting: string;
  onSearchPress: () => void;
  onSettingsPress: () => void;
}

export function HomeHeader({ greeting, onSearchPress, onSettingsPress }: HomeHeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.headerTextBlock}>
        <Text style={styles.greeting}>{greeting}</Text>
        <Text style={styles.appName}>Bạn đang cần làm thủ tục gì ở Nhật?</Text>
        <Text style={styles.subtitle}>
          Tra thủ tục, deadline và câu tiếng Nhật cần dùng — bằng tiếng Việt.
        </Text>
      </View>
      <View style={styles.headerButtons}>
        <TouchableOpacity style={styles.headerIconBtn} onPress={onSearchPress}>
          <Ionicons name="search-outline" size={22} color={Colors.white} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerIconBtn} onPress={onSettingsPress}>
          <Ionicons name="settings-outline" size={22} color={Colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerTextBlock: {
    flex: 1,
    paddingRight: 12,
  },
  greeting: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginBottom: 4 },
  appName: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '800',
    fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.white,
  },
  subtitle: { marginTop: 6, fontSize: 13, color: 'rgba(255,255,255,0.82)', lineHeight: 18 },
  headerButtons: {
    flexDirection: 'row',
    gap: 10,
    flexShrink: 0,
    alignItems: 'center',
    marginTop: 2,
  },
  headerIconBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.14)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
