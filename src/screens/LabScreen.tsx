// Lab (Phòng thí nghiệm) — private owner-only screen.
//
// Reached via a hidden gesture in Settings (tap the version number 7×).
// Gated by Supabase Auth: until the owner signs in, the screen shows only
// a login form. Once signed in, it lists every feature flag with a toggle
// and syncs changes to Supabase so the owner's other devices pick them up.
//
// For everyone who isn't the owner this screen is inert: they don't know
// the gesture, and even if they reach it they can't sign in to the owner's
// account, so no flag ever changes for them.

import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { Session } from '@supabase/supabase-js';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { Colors } from '../constants/colors';
import { supabase, isSupabaseConfigured } from '../services/supabaseClient';
import {
  FEATURE_FLAGS,
  pullRemote,
  pushRemote,
  setFlagLocal,
} from '../services/featureFlags';
import { useFeatureFlags } from '../hooks/useFeatureFlags';

type SyncState = 'idle' | 'syncing' | 'synced' | 'error';

export default function LabScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const flags = useFeatureFlags();
  const [session, setSession] = useState<Session | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authMode, setAuthMode] = useState<'signIn' | 'signUp'>('signIn');
  const [authBusy, setAuthBusy] = useState(false);
  const [sync, setSync] = useState<SyncState>('idle');

  // Track auth session.
  useEffect(() => {
    if (!supabase) {
      setCheckingSession(false);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setCheckingSession(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  // Pull the owner's flags whenever a session becomes available.
  const doPull = useCallback(async () => {
    setSync('syncing');
    const result = await pullRemote();
    setSync(result ? 'synced' : 'idle');
  }, []);

  useEffect(() => {
    if (session) void doPull();
  }, [session, doPull]);

  const handleAuth = async () => {
    if (!supabase) return;
    const trimmed = email.trim();
    if (!trimmed || !password) {
      Alert.alert('Thiếu thông tin', 'Nhập email và mật khẩu.');
      return;
    }
    setAuthBusy(true);
    try {
      const { error } =
        authMode === 'signIn'
          ? await supabase.auth.signInWithPassword({ email: trimmed, password })
          : await supabase.auth.signUp({ email: trimmed, password });
      if (error) {
        Alert.alert('Không thành công', error.message);
      } else if (authMode === 'signUp') {
        Alert.alert(
          'Đã tạo tài khoản',
          'Nếu dự án Supabase bật xác nhận email, hãy kiểm tra hộp thư để xác nhận trước khi đăng nhập.'
        );
      }
      setPassword('');
    } finally {
      setAuthBusy(false);
    }
  };

  const handleSignOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
  };

  const handleToggle = async (key: (typeof FEATURE_FLAGS)[number]['key']) => {
    await setFlagLocal(key, !flags[key]);
    setSync('syncing');
    const result = await pushRemote();
    setSync(result.ok ? 'synced' : 'error');
    if (!result.ok && result.error && result.error !== 'not-signed-in') {
      Alert.alert('Chưa đồng bộ được', result.error);
    }
  };

  // --- Render branches ---------------------------------------------------

  if (!isSupabaseConfigured()) {
    return (
      <View style={styles.centerWrap}>
        <Ionicons name="cloud-offline-outline" size={40} color={Colors.textMuted} />
        <Text style={styles.centerTitle}>Chưa cấu hình Supabase</Text>
        <Text style={styles.centerText}>
          Đặt EXPO_PUBLIC_SUPABASE_URL và EXPO_PUBLIC_SUPABASE_ANON_KEY (hoặc các biến
          REMOTE_CONTENT tương ứng) rồi khởi động lại app để bật đồng bộ.
        </Text>
        <Text style={styles.centerSubText}>
          Các công tắc bên dưới vẫn hoạt động cục bộ trên máy này.
        </Text>
        <OpenToolButton onPress={() => navigation.navigate('Furigana')} />
        <FlagList flags={flags} onToggle={handleToggle} />
      </View>
    );
  }

  if (checkingSession) {
    return (
      <View style={styles.centerWrap}>
        <ActivityIndicator color={Colors.primary} />
      </View>
    );
  }

  if (!session) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.lockHeader}>
          <Ionicons name="lock-closed" size={28} color={Colors.primary} />
          <Text style={styles.title}>Phòng thí nghiệm</Text>
        </View>
        <Text style={styles.subtitle}>
          Khu vực riêng. Đăng nhập bằng tài khoản chủ sở hữu để tiếp tục.
        </Text>

        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={Colors.textMuted}
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Mật khẩu"
            placeholderTextColor={Colors.textMuted}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={[styles.primaryBtn, authBusy && styles.btnDisabled]}
            onPress={() => void handleAuth()}
            disabled={authBusy}
          >
            {authBusy ? (
              <ActivityIndicator color={Colors.white} />
            ) : (
              <Text style={styles.primaryBtnText}>
                {authMode === 'signIn' ? 'Đăng nhập' : 'Tạo tài khoản'}
              </Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setAuthMode((m) => (m === 'signIn' ? 'signUp' : 'signIn'))}
          >
            <Text style={styles.switchLink}>
              {authMode === 'signIn'
                ? 'Chưa có tài khoản? Tạo mới'
                : 'Đã có tài khoản? Đăng nhập'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.lockHeader}>
        <Ionicons name="flask" size={28} color={Colors.primary} />
        <Text style={styles.title}>Phòng thí nghiệm</Text>
      </View>

      <View style={styles.accountRow}>
        <View style={styles.accountLeft}>
          <Ionicons name="person-circle-outline" size={20} color={Colors.success} />
          <Text style={styles.accountEmail} numberOfLines={1}>
            {session.user.email}
          </Text>
        </View>
        <TouchableOpacity onPress={() => void handleSignOut()}>
          <Text style={styles.signOut}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.syncRow}>
        <SyncBadge state={sync} />
      </View>

      <OpenToolButton onPress={() => navigation.navigate('Furigana')} />
      <FlagList flags={flags} onToggle={handleToggle} />
    </ScrollView>
  );
}

function OpenToolButton({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.toolBtn} onPress={onPress} activeOpacity={0.85}>
      <Ionicons name="newspaper-outline" size={20} color={Colors.primary} />
      <View style={styles.toolText}>
        <Text style={styles.toolTitle}>Đọc báo tiếng Nhật (Furigana)</Text>
        <Text style={styles.toolDesc}>Dán văn bản, hiện hiragana trên kanji.</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color={Colors.textMuted} />
    </TouchableOpacity>
  );
}

function SyncBadge({ state }: { state: SyncState }) {
  const map: Record<SyncState, { icon: keyof typeof Ionicons.glyphMap; text: string; color: string }> = {
    idle: { icon: 'cloud-outline', text: 'Sẵn sàng đồng bộ', color: Colors.textMuted },
    syncing: { icon: 'sync-outline', text: 'Đang đồng bộ…', color: Colors.primary },
    synced: { icon: 'cloud-done-outline', text: 'Đã đồng bộ', color: Colors.success },
    error: { icon: 'warning-outline', text: 'Lỗi đồng bộ', color: Colors.warning },
  };
  const m = map[state];
  return (
    <View style={styles.syncBadge}>
      <Ionicons name={m.icon} size={16} color={m.color} />
      <Text style={[styles.syncText, { color: m.color }]}>{m.text}</Text>
    </View>
  );
}

function FlagList({
  flags,
  onToggle,
}: {
  flags: Record<string, boolean>;
  onToggle: (key: (typeof FEATURE_FLAGS)[number]['key']) => void;
}) {
  return (
    <View style={styles.flagSection}>
      <Text style={styles.flagSectionTitle}>Công tắc tính năng</Text>
      {FEATURE_FLAGS.map((f) => {
        const on = flags[f.key];
        return (
          <TouchableOpacity
            key={f.key}
            style={styles.flagRow}
            activeOpacity={0.8}
            onPress={() => onToggle(f.key)}
          >
            <View style={styles.flagText}>
              <Text style={styles.flagLabel}>{f.label}</Text>
              <Text style={styles.flagDesc}>{f.description}</Text>
            </View>
            <Ionicons
              name={on ? 'toggle' : 'toggle-outline'}
              size={34}
              color={on ? Colors.primary : Colors.textMuted}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 16, paddingBottom: 40 },
  centerWrap: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 10,
  },
  centerTitle: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textPrimary,
    marginTop: 4,
  },
  centerText: {
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  centerSubText: {
    fontSize: 12,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 12,
  },
  lockHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textPrimary,
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 12,
  },
  input: {
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: Colors.textPrimary,
    fontFamily: 'BeVietnamPro_400Regular',
  },
  primaryBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  btnDisabled: { opacity: 0.6 },
  primaryBtnText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
  },
  switchLink: {
    color: Colors.primary,
    fontSize: 13,
    textAlign: 'center',
    fontFamily: 'BeVietnamPro_600SemiBold',
  },
  accountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 12,
  },
  accountLeft: { flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 },
  accountEmail: { fontSize: 14, color: Colors.textPrimary, flex: 1 },
  signOut: {
    fontSize: 13,
    color: Colors.primary,
    fontFamily: 'BeVietnamPro_600SemiBold',
  },
  syncRow: { marginBottom: 12 },
  syncBadge: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  syncText: { fontSize: 12, fontFamily: 'BeVietnamPro_600SemiBold' },
  toolBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: Colors.accent,
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },
  toolText: { flex: 1 },
  toolTitle: {
    fontSize: 15,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textPrimary,
    marginBottom: 2,
    lineHeight: 22,
  },
  toolDesc: { fontSize: 12, color: Colors.textSecondary, lineHeight: 18 },
  flagSection: { marginTop: 4 },
  flagSectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  flagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 14,
    marginBottom: 10,
    gap: 12,
  },
  flagText: { flex: 1 },
  flagLabel: {
    fontSize: 15,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textPrimary,
    marginBottom: 4,
    lineHeight: 22,
  },
  flagDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
});
