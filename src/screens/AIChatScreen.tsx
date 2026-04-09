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
import { RootStackParamList } from '../navigation/AppNavigator';

type RouteType = RouteProp<RootStackParamList, 'AIChat'>;

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';
const SYSTEM_PROMPT = `Bạn là trợ lý AI của ứng dụng "Viet Nhật" - ứng dụng hỗ trợ người Việt Nam sinh sống tại Nhật Bản.

Nhiệm vụ của bạn:
- Trả lời HOÀN TOÀN bằng tiếng Việt (trừ khi được yêu cầu cụ thể)
- Cung cấp thông tin chính xác, thực tế về cuộc sống tại Nhật Bản
- Giải thích rõ ràng các thủ tục hành chính, pháp lý
- Chia sẻ mẹo và kinh nghiệm hữu ích cho người Việt tại Nhật
- Khi dùng từ tiếng Nhật, luôn kèm theo phiên âm và nghĩa tiếng Việt
- Thân thiện, nhiệt tình, như một người bạn đã sống lâu ở Nhật

Lĩnh vực bạn thành thạo:
- Thủ tục visa, thẻ cư trú, gia hạn tư cách lưu trú
- Bảo hiểm y tế, bảo hiểm lao động, hưu trí
- Tìm việc làm, quyền lợi người lao động tại Nhật
- Thuê nhà, phân loại rác, giao thông công cộng
- Ngân hàng, chuyển tiền về Việt Nam
- Tiếng Nhật cơ bản và thực dụng
- Văn hóa, phong tục tập quán Nhật Bản

Luôn trả lời ngắn gọn, súc tích nhưng đầy đủ thông tin. Ưu tiên thực tế, tránh lý thuyết lan man.`;

const STORAGE_KEY = 'ai_chat_history';

export default function AIChatScreen() {
  const route = useRoute<RouteType>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState(route.params?.prefilledQuestion || '');
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const inputRef = useRef<TextInput>(null);

  const apiKey = process.env.EXPO_PUBLIC_CLAUDE_API_KEY;

  useEffect(() => {
    loadHistory();
  }, []);

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
    Alert.alert(
      'Xóa lịch sử',
      'Bạn có chắc muốn xóa toàn bộ lịch sử trò chuyện không?',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: async () => {
            setMessages([]);
            await AsyncStorage.removeItem(STORAGE_KEY);
          },
        },
      ]
    );
  };

  const sendMessage = useCallback(async () => {
    const text = inputText.trim();
    if (!text || isLoading) return;

    if (!apiKey || apiKey === 'your_claude_api_key_here') {
      Alert.alert(
        'Chưa cấu hình API',
        'Vui lòng thêm EXPO_PUBLIC_CLAUDE_API_KEY vào file .env để sử dụng tính năng AI.',
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
        content: `Xin lỗi, đã có lỗi xảy ra: ${error.message || 'Không thể kết nối đến AI'}. Vui lòng kiểm tra kết nối mạng và thử lại.`,
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
    'Mức lương tối thiểu ở Tokyo là bao nhiêu?',
    'Làm sao để mở tài khoản ngân hàng?',
  ];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      {/* Clear button in header area */}
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
        {/* Welcome Message */}
        {messages.length === 0 && (
          <View style={styles.welcome}>
            <View style={styles.welcomeIcon}>
              <Ionicons name="sparkles" size={32} color={Colors.white} />
            </View>
            <Text style={styles.welcomeTitle}>Xin chào! Tôi là trợ lý AI Viet Nhật</Text>
            <Text style={styles.welcomeSubtitle}>
              Tôi có thể giúp bạn về mọi vấn đề liên quan đến cuộc sống tại Nhật Bản — từ thủ tục hành chính, tìm việc, đến tiếng Nhật hàng ngày.
            </Text>
            <Text style={styles.quickPromptsTitle}>Câu hỏi gợi ý:</Text>
            {QUICK_PROMPTS.map((prompt, i) => (
              <TouchableOpacity
                key={i}
                style={styles.quickPrompt}
                onPress={() => setInputText(prompt)}
              >
                <Text style={styles.quickPromptText}>{prompt}</Text>
                <Ionicons name="arrow-up-circle" size={18} color={Colors.primary} />
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Messages */}
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

        {/* Typing Indicator */}
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

      {/* Input */}
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
        <Text style={styles.disclaimer}>
          AI có thể mắc lỗi. Hãy kiểm tra thông tin quan trọng từ nguồn chính thức.
        </Text>
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
