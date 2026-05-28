import { Bot } from 'lucide-react-native';
import { useCallback, useRef, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ChatBubble } from '@/components/ChatBubble';
import { ChatInput } from '@/components/ChatInput';
import { SuggestionChip } from '@/components/SuggestionChip';
import { SymptomResultCards } from '@/components/SymptomResultCard';
import { TypingIndicator } from '@/components/TypingIndicator';
import { colors } from '@/constants/colors';
import {
  SYMPTOM_SUGGESTIONS,
  suggestionToMessage,
  type SymptomSuggestion,
} from '@/constants/symptomSuggestions';
import { hig } from '@/constants/hig';
import { analyzeSymptoms } from '@/services/geminiService';
import type { ChatMessage } from '@/types/symptomCheck';
import { getFriendlyGeminiError } from '@/utils/geminiErrors';

function createMessageId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function SymptomCheckerScreen() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: 'Hello! I am your Healora AI Assistant. Tell me how you feel, or tap a quick suggestion below.',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const listRef = useRef<FlatList<ChatMessage>>(null);

  const scrollToEnd = useCallback(() => {
    setTimeout(() => {
      listRef.current?.scrollToEnd({ animated: true });
    }, 120);
  }, []);

  const sendSymptoms = useCallback(
    async (symptoms: string) => {
      const trimmed = symptoms.trim();
      if (!trimmed || isLoading) {
        return;
      }

      const userMessage: ChatMessage = {
        id: createMessageId(),
        role: 'user',
        text: trimmed,
      };

      const loadingMessage: ChatMessage = {
        id: createMessageId(),
        role: 'assistant',
        isLoading: true,
      };

      setMessages((current) => [...current, userMessage, loadingMessage]);
      setInput('');
      setIsLoading(true);
      scrollToEnd();

      try {
        const { result, usedOfflineFallback } = await analyzeSymptoms(trimmed);

        setMessages((current) =>
          current.map((message) =>
            message.isLoading
              ? {
                  ...message,
                  isLoading: false,
                  result,
                  offlineNotice: usedOfflineFallback
                    ? 'AI quota reached — showing general offline guidance.'
                    : undefined,
                }
              : message,
          ),
        );
      } catch (error) {
        const errorText = getFriendlyGeminiError(error);

        setMessages((current) =>
          current.map((message) =>
            message.isLoading ? { ...message, isLoading: false, error: errorText } : message,
          ),
        );
      } finally {
        setIsLoading(false);
        scrollToEnd();
      }
    },
    [isLoading, scrollToEnd],
  );

  const handleSend = useCallback(() => {
    sendSymptoms(input);
  }, [input, sendSymptoms]);

  const handleSuggestion = useCallback(
    (suggestion: SymptomSuggestion) => {
      const message = suggestionToMessage(suggestion);
      setInput(message);
      sendSymptoms(message);
    },
    [sendSymptoms],
  );

  const renderMessage = useCallback(({ item }: { item: ChatMessage }) => {
    if (item.role === 'user' && item.text) {
      return <ChatBubble text={item.text} isUser />;
    }

    if (item.isLoading) {
      return <TypingIndicator />;
    }

    if (item.error) {
      return (
        <Animated.View entering={FadeIn.duration(300)} style={styles.assistantBlock}>
          <View style={styles.errorCard}>
            <Text style={styles.errorText}>{item.error}</Text>
          </View>
        </Animated.View>
      );
    }

    if (item.result) {
      return (
        <View style={styles.assistantBlock}>
          {item.offlineNotice ? (
            <View style={styles.noticeCard}>
              <Text style={styles.noticeText}>{item.offlineNotice}</Text>
            </View>
          ) : null}
          <SymptomResultCards result={item.result} />
        </View>
      );
    }

    if (item.text) {
      return <ChatBubble text={item.text} isUser={false} />;
    }

    return null;
  }, []);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <Bot size={22} color={colors.primary} />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.title}>AI Assistant</Text>
          <Text style={styles.subtitle}>Symptom checker</Text>
        </View>
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 8 : 0}>
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.listContent}
          onContentSizeChange={scrollToEnd}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        />

        <View style={styles.bottomSection}>
          <Text style={styles.suggestionsLabel}>Quick suggestions</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.suggestionsRow}>
            {SYMPTOM_SUGGESTIONS.map((suggestion) => (
              <SuggestionChip
                key={suggestion}
                label={suggestion}
                onPress={() => handleSuggestion(suggestion)}
                disabled={isLoading}
              />
            ))}
          </ScrollView>

          <ChatInput
            value={input}
            onChangeText={setInput}
            onSend={handleSend}
            disabled={isLoading}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: hig.spacing.md,
    paddingHorizontal: hig.spacing.lg,
    paddingTop: hig.spacing.sm,
    paddingBottom: hig.spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  headerIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: hig.typography.title2,
    fontWeight: '700',
    color: colors.primary,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: hig.typography.footnote,
    color: colors.textMuted,
    marginTop: 2,
  },
  listContent: {
    paddingHorizontal: hig.spacing.lg,
    paddingTop: hig.spacing.lg,
    paddingBottom: hig.spacing.md,
    flexGrow: 1,
  },
  assistantBlock: {
    alignSelf: 'flex-start',
    width: '100%',
    maxWidth: '100%',
    marginBottom: hig.spacing.md,
    paddingLeft: 40,
  },
  errorCard: {
    backgroundColor: '#FEF2F2',
    borderRadius: hig.radius.lg,
    padding: hig.spacing.lg,
    borderWidth: 1,
    borderColor: '#FECACA',
    width: '100%',
  },
  errorText: {
    fontSize: hig.typography.subheadline,
    color: '#B91C1C',
    lineHeight: 22,
  },
  noticeCard: {
    backgroundColor: colors.primaryLight,
    borderRadius: hig.radius.md,
    padding: hig.spacing.md,
    marginBottom: hig.spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    width: '100%',
  },
  noticeText: {
    fontSize: hig.typography.footnote,
    color: colors.textMuted,
    lineHeight: 18,
  },
  bottomSection: {
    paddingHorizontal: hig.spacing.lg,
    paddingTop: hig.spacing.md,
    paddingBottom: hig.spacing.sm,
    gap: hig.spacing.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    backgroundColor: colors.white,
  },
  suggestionsLabel: {
    fontSize: hig.typography.caption,
    fontWeight: '700',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  suggestionsRow: {
    paddingVertical: hig.spacing.xs,
  },
});
