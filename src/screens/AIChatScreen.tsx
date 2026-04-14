import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '../constants/colors';
import { Disclaimers } from '../constants/disclaimers';
import { StorageKeys } from '../constants/storageKeys';
import { RootStackParamList } from '../navigation/AppNavigator';
import { CLAUDE_MODEL } from '../constants/api';
import { loadClaudeApiKey } from '../utils/apiKeyStorage';
import { buildUserProfileSummary, loadUserProfile } from '../utils/userProfile';
import type { UserProfile } from '../types/profile';

type RouteType = RouteProp<RootStackParamList, 'AIChat'>;

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';
/** Number of most-recent messages sent to the API per request. Keeps cost bounded. */
const MAX_HISTORY_MESSAGES = 14;

const BASE_SYSTEM_PROMPT = `Bạn là trợ lý AI của ứng dụng "Viet-Nhat" - ứng dụng hỗ trợ người Việt Nam sinh sống tại Nhật Bản.

Nhiệm vụ của bạn:
- Trả lời hoàn toàn bằng tiếng Việt, trừ khi người dùng yêu cầu ngôn ngữ khác.
- Cung cấp thông tin rõ ràng, thực tế và dễ áp dụng trong đời sống tại Nhật.
- Giải thích thủ tục hành chính, visa, bảo hiểm, lao động và các tình huống thường gặp.
- Khi dùng từ tiếng Nhật, nên kèm cách đọc hoặc nghĩa tiếng Việt nếu điều đó giúp người dùng dễ hiểu hơn.
- Giữ câu trả lời gọn, đúng trọng tâm, không nói lan man.

Lĩnh vực bạn hỗ trợ tốt:
- Visa, thẻ cư trú, gia hạn và đổi tư cách lưu trú
- Bảo hiểm, nenkin, thuế, ngân hàng, chuyển tiền
- Lao động, hợp đồng, quyền lợi người đi làm
- Cuộc sống hằng ngày, nhà ở, rác, giao thông, thủ tục địa phương
- Tiếng Nhật cơ bản và cách dùng trong tình huống thực tế

Luôn ưu tiên tính thực tế và cảnh báo người dùng khi nội dung cần kiểm tra lại bằng nguồn chính thức.`;

function buildSystemPrompt(profile: UserProfile | null): string {
  const today = new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const dateLine = `Ngày hôm nay: ${today}.`;
  const base = `${BASE_SYSTEM_PROMPT}\n\n${dateLine}`;
  if (!profile) return base;
  const summary = buildUserProfileSummary(profile);
  return `${base}\n\nThông tin người dùng: ${summary}`;
}

const STORAGE_KEY = StorageKeys.aiChatHistory;
/** Legacy storage key used before v1 versioning. Kept for one-time migration. */
const STORAGE_KEY_LEGACY = StorageKeys.aiChatHistoryLegacy;

export default function AIChatScreen() {
  const route = useRoute<RouteType>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState(route.params?.prefilledQuestion || '');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const inputRef = useRef<TextInput>(null);
  /**
   * Set to true immediately before setMessages() is called during history restore.
   * The saveHistory effect consumes and clears it, preventing a redundant write-back
   * of data that was just read from storage.
   */
  const skipNextSaveRef = useRef(false);

  useEffect(() => {
    loadHistory();
    loadApiKey();
    loadUserProfile().then(setUserProfile).catch(() => undefined);
  }, []);

  const loadApiKey = async () => {
    try {
      const key = await loadClaudeApiKey();
      if (key) setApiKey(key);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    // Consume the skip flag set during history restore; clear it so subsequent
    // user-driven changes proceed to save normally.
    if (skipNextSaveRef.current) {
      skipNextSaveRef.current = false;
      return;
    }
    if (messages.length > 0) {
      saveHistory();
    }
  }, [messages]);

  const loadHistory = async () => {
    try {
      // Try the current versioned key first; fall back to the legacy key for migration.
      let raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (!raw) {
        raw = await AsyncStorage.getItem(STORAGE_KEY_LEGACY);
        if (raw) {
          // Migrate: write under the new key and delete the old one.
          await AsyncStorage.setItem(STORAGE_KEY, raw);
          await AsyncStorage.removeItem(STORAGE_KEY_LEGACY);
        }
      }
      if (raw) {
        const parsed = JSON.parse(raw);
        const restored: Message[] = parsed.map((m: any) => ({
          ...m,
          timestamp: new Date(m.timestamp),
        }));
        const slice = restored.slice(-40);
        if (slice.length > 0) {
          // Set the flag before setState so the effect sees it when it fires
          // after the re-render triggered by this setState call.
          skipNextSaveRef.current = true;
          setMessages(slice);
        }
      }
    } catch {
      // ignore
    }
  };

  const saveHistory = async () => {
    try {
      const toSave = messages.slice(-40);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch {
      // ignore
    }
  };

  const clearHistory = () => {
    Alert.alert('Xóa lịch sử', 'Bạn có chắc muốn xóa toàn bộ lịch sử trò chuyện không?', [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Xóa',
        style: 'destructive',
        onPress: async () => {
          setMessages([]);
          await AsyncStorage.removeItem(STORAGE_KEY);
          await AsyncStorage.removeItem(STORAGE_KEY_LEGACY);
        },
      },
    ]);
  };

  const sendMessage = useCallback(async () => {
    const text = inputText.trim();
    if (!text || isLoading) return;

    if (!apiKey) {
      Alert.alert(
        'Chưa cấu hình API',
        'Vui lòng vào tab Cài đặt để nhập Claude API key trước khi dùng tính năng AI.',
        [{ text: 'OK' }]
      );
      return;
    }

    const userMessage: Message = {
      id: Math.random().toString(36).slice(2),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);

    try {
      // Only send the most recent MAX_HISTORY_MESSAGES to keep token usage bounded.
      const recentMessages = messages.slice(-(MAX_HISTORY_MESSAGES - 1));
      const conversationHistory = [...recentMessages, userMessage].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const response = await fetch(CLAUDE_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: CLAUDE_MODEL,
          max_tokens: 1024,
          system: buildSystemPrompt(userProfile),
          messages: conversationHistory,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `Lỗi ${response.status}`);
      }

      const data = await response.json();
      const assistantContent =
        data.content?.[0]?.text || 'Xin lỗi, tôi không thể trả lời lúc này.';

      const assistantMessage: Message = {
        id: Math.random().toString(36).slice(2),
        role: 'assistant',
        content: assistantContent,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error: any) {
      const errorMessage: Message = {
        id: Math.random().toString(36).slice(2),
        role: 'assistant',
        content: `Xin lỗi, đã có lỗi xảy ra: ${
          error.message || 'Không thể kết nối đến AI'
        }. Vui lòng kiểm tra mạng và thử lại.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [inputText, isLoading, messages, apiKey, userProfile]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  };

  const QUICK_PROMPTS = [
    'Tôi cần gia hạn thẻ cư trú, làm thế nào?',
    'Cách phân loại rác ở Nhật như thế nào?',
    'Mức lương tối thiểu ở Tokyo hiện là bao nhiêu?',
    'Làm sao để mở tài khoản ngân hàng?',
  ];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      {messages.length > 0 && (
        <TouchableOpacity style={styles.clearBtn} onPress={clearHistory}>
          <Ionicons name="trash-outline" size={16} color={Colors.textMuted} />
          <Text style={styles.clearText}>Xóa lịch sử</Text>
        </TouchableOpacity>
      )}

      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesList}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: false })}
      >
        {messages.length === 0 && (
          <View style={styles.welcome}>
            <View style={styles.welcomeIcon}>
              <Ionicons name="sparkles" size={32} color={Colors.white} />
            </View>
            <Text style={styles.welcomeTitle}>Xin chào! Tôi là trợ lý AI Viet-Nhat</Text>
            <Text style={styles.welcomeSubtitle}>
              Tôi có thể giúp bạn về thủ tục hành chính, việc làm, bảo hiểm, cuộc sống hằng ngày
              và tiếng Nhật thực tế tại Nhật Bản.
            </Text>

            {!apiKey && (
              <View style={styles.noKeyBanner}>
                <Ionicons name="key-outline" size={18} color="#92400E" />
                <View style={styles.noKeyBannerText}>
                  <Text style={styles.noKeyBannerTitle}>Cần cấu hình API key</Text>
                  <Text style={styles.noKeyBannerDesc}>
                    Vào tab <Text style={{ fontWeight: '700' }}>Cài đặt</Text> → "Trợ lý AI" để nhập Claude API key trước khi dùng tính năng này.
                  </Text>
                </View>
              </View>
            )}

            <View style={styles.aiDisclaimerBox}>
              <Ionicons name="information-circle-outline" size={15} color={Colors.textSecondary} />
              <Text style={styles.aiDisclaimerText}>{Disclaimers.ai}</Text>
            </View>

            <Text style={styles.quickPromptsTitle}>Câu hỏi gợi ý:</Text>
            {QUICK_PROMPTS.map((prompt, i) => (
              <TouchableOpacity key={i} style={styles.quickPrompt} onPress={() => setInputText(prompt)}>
                <Text style={styles.quickPromptText}>{prompt}</Text>
                <Ionicons name="arrow-up-circle" size={18} color={Colors.primary} />
              </TouchableOpacity>
            ))}
          </View>
        )}

        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageWrapper,
              message.role === 'user' ? styles.userWrapper : styles.assistantWrapper,
            ]}
          >
            {message.role === 'assistant' && (
              <View style={styles.avatar}>
                <Ionicons name="sparkles" size={14} color={Colors.white} />
              </View>
            )}
            <View
              style={[
                styles.messageBubble,
                message.role === 'user' ? styles.userBubble : styles.assistantBubble,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  message.role === 'user' ? styles.userText : styles.assistantText,
                ]}
              >
                {message.content}
              </Text>
              <Text
                style={[
                  styles.timestamp,
                  message.role === 'user' ? styles.userTimestamp : styles.assistantTimestamp,
                ]}
              >
                {formatTime(message.timestamp)}
              </Text>
            </View>
          </View>
        ))}

        {isLoading && (
          <View style={[styles.messageWrapper, styles.assistantWrapper]}>
            <View style={styles.avatar}>
              <Ionicons name="sparkles" size={14} color={Colors.white} />
            </View>
            <View style={[styles.messageBubble, styles.assistantBubble, styles.typingBubble]}>
              <View style={styles.typingDots}>
                <TypingDot delay={0} />
                <TypingDot delay={200} />
                <TypingDot delay={400} />
              </View>
            </View>
          </View>
        )}

        <View style={{ height: 8 }} />
      </ScrollView>

      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <TextInput
            ref={inputRef}
            style={styles.input}
            placeholder="Nhập câu hỏi của bạn..."
            placeholderTextColor={Colors.textMuted}
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={2000}
            onSubmitEditing={sendMessage}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              (!inputText.trim() || isLoading) && styles.sendButtonDisabled,
            ]}
            onPress={sendMessage}
            disabled={!inputText.trim() || isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color={Colors.white} />
            ) : (
              <Ionicons name="send" size={18} color={Colors.white} />
            )}
          </TouchableOpacity>
        </View>
        <Text style={styles.disclaimer}>{Disclaimers.ai}</Text>
      </View>
    </KeyboardAvoidingView>
  );
}

function TypingDot({ delay }: { delay: number }) {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 400,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [delay, opacity]);

  return <Animated.View style={[styles.typingDot, { opacity }]} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  clearBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 4,
  },
  clearText: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  welcome: {
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  welcomeIcon: {
    width: 72,
    height: 72,
    borderRadius: 22,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  welcomeTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 19,
    marginBottom: 16,
  },
  noKeyBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: '#FEF3C7',
    borderWidth: 1,
    borderColor: '#F59E0B',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    width: '100%',
  },
  noKeyBannerText: {
    flex: 1,
  },
  noKeyBannerTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#92400E',
    marginBottom: 2,
  },
  noKeyBannerDesc: {
    fontSize: 12,
    color: '#92400E',
    lineHeight: 17,
  },
  aiDisclaimerBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    backgroundColor: Colors.background,
    borderRadius: 10,
    padding: 10,
    marginBottom: 16,
    width: '100%',
  },
  aiDisclaimerText: {
    flex: 1,
    fontSize: 11,
    color: Colors.textSecondary,
    lineHeight: 16,
  },
  quickPromptsTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textSecondary,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  quickPrompt: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  quickPromptText: {
    flex: 1,
    fontSize: 13,
    color: Colors.textPrimary,
    marginRight: 8,
  },
  messageWrapper: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-end',
    gap: 8,
  },
  userWrapper: {
    justifyContent: 'flex-end',
  },
  assistantWrapper: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
    flexShrink: 0,
  },
  messageBubble: {
    maxWidth: '78%',
    borderRadius: 18,
    padding: 12,
  },
  userBubble: {
    backgroundColor: Colors.primary,
    borderBottomRightRadius: 4,
  },
  assistantBubble: {
    backgroundColor: Colors.white,
    borderBottomLeftRadius: 4,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  typingBubble: {
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 21,
  },
  userText: {
    color: Colors.white,
  },
  assistantText: {
    color: Colors.textPrimary,
  },
  timestamp: {
    fontSize: 10,
    marginTop: 4,
  },
  userTimestamp: {
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'right',
  },
  assistantTimestamp: {
    color: Colors.textMuted,
  },
  typingDots: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.textMuted,
  },
  inputContainer: {
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: Platform.OS === 'ios' ? 28 : 12,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    color: Colors.textPrimary,
    maxHeight: 120,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  sendButtonDisabled: {
    backgroundColor: Colors.textMuted,
    shadowOpacity: 0,
    elevation: 0,
  },
  disclaimer: {
    fontSize: 10,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: 6,
  },
});
