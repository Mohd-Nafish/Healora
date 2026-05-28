import { Send } from 'lucide-react-native';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { colors } from '@/constants/colors';
import { cardShadow } from '@/constants/shadows';
import { hig } from '@/constants/hig';

type ChatInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  disabled?: boolean;
};

export function ChatInput({ value, onChangeText, onSend, disabled = false }: ChatInputProps) {
  const canSend = value.trim().length > 0 && !disabled;

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder="Describe your symptoms..."
        placeholderTextColor={colors.textMuted}
        multiline
        maxLength={500}
        editable={!disabled}
        accessibilityLabel="Symptom description"
      />
      <Pressable
        onPress={onSend}
        disabled={!canSend}
        style={[styles.sendButton, !canSend && styles.sendButtonDisabled]}
        accessibilityRole="button"
        accessibilityLabel="Send symptoms">
        <Send size={20} color={canSend ? colors.white : colors.textMuted} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: hig.spacing.sm,
    backgroundColor: colors.white,
    borderRadius: hig.radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: hig.spacing.sm,
    ...cardShadow,
  },
  input: {
    flex: 1,
    fontSize: hig.typography.body,
    color: colors.text,
    maxHeight: 120,
    minHeight: hig.minTouchTarget - 8,
    paddingHorizontal: hig.spacing.sm,
    paddingVertical: hig.spacing.sm,
    lineHeight: 22,
  },
  sendButton: {
    width: hig.minTouchTarget,
    height: hig.minTouchTarget,
    borderRadius: hig.radius.lg,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: colors.border,
  },
});
