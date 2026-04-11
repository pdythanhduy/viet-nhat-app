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
import { loadClaudeApiKey } from '../utils/apiKeyStorage';

type RouteType = RouteProp<RootStackParamList, 'AIChat'>;

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';
const SYSTEM_PROMPT = `Bạn là trợ lý AI của ứng dụng "Việt-Nhật" - ứng dụng hỗ trợ người Việt Nam sinh sống tại Nhật Bản.

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

const STORAGE_KEY = StorageKeys.aiChatHistory;

export default function AIChatScreen() {
  const route = useRoute<RouteType>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState(route.params?.prefilledQuestion || '');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    loadHistory();
    loadApiKey();
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
    if (messages.length > 0) {
      saveHistory();
    }
  }, [messages]);

  const loadHistory = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const restored = parsed.map((m: any) => ({
          ...m,
          timestamp: new Date(m.timestamp),
        }));
        setMessages(restored.slice(-40));
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
      id: Date.now().toString(),
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
      const conversationHistory = [...messages, userMessage].map((m) => ({
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
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1024,
          system: SYSTEM_PROMPT,
          messages: conversationHistory,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `Lỗi ${response.status}`);
      }

      const data = await response.json();
      const assistantContent = data.content?.[0]?.text || 'Xin lỗi, tôi không thể trả lời lúc này.';

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: assistantContent,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error: any) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Xin lỗi, đã có lỗi xảy ra: ${error.message || 'Không thể kết nối đến AI'}. Vui lòng kiểm tra mạng và thử lại.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [inputText, isLoading, messages, apiKey]);

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
            <Text style={styles.welcomeTitle}>Xin chào! Tôi là trợ lý AI Việt-Nhật</Text>
            <Text style={styles.welcomeSubtitle}>
              Tôi có thể giúp bạn về thủ tục hành chính, việc làm, bảo hiểm, cuộc sống
              hằng ngày và tiếng Nhật thực tế tại Nhật Bản.
            </Text>
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
    marginBottom: 20,
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
