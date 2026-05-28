import { Bot, User } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInLeft, FadeInRight } from 'react-native-reanimated';

import { colors } from '@/constants/colors';
import { hig } from '@/constants/hig';

type ChatBubbleProps = {
  text: string;
  isUser: boolean;
};

export function ChatBubble({ text, isUser }: ChatBubbleProps) {
  if (isUser) {
    return (
      <Animated.View
        entering={FadeInRight.duration(350).springify()}
        style={[styles.row, styles.rowUser]}>
        <View style={[styles.bubble, styles.bubbleUser]}>
          <Text style={[styles.text, styles.textUser]}>{text}</Text>
        </View>
        <View style={[styles.avatar, styles.avatarUser]}>
          <User size={16} color={colors.white} />
        </View>
      </Animated.View>
    );
  }

  return (
    <Animated.View
      entering={FadeInLeft.duration(350).springify()}
      style={[styles.row, styles.rowAssistant]}>
      <View style={styles.avatar}>
        <Bot size={16} color={colors.primary} />
      </View>
      <View style={[styles.bubble, styles.bubbleAssistant]}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: hig.spacing.sm,
    marginBottom: hig.spacing.md,
    maxWidth: '92%',
  },
  rowUser: {
    alignSelf: 'flex-end',
  },
  rowAssistant: {
    alignSelf: 'flex-start',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  avatarUser: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  bubble: {
    flexShrink: 1,
    maxWidth: '100%',
    paddingHorizontal: hig.spacing.md,
    paddingVertical: hig.spacing.sm + 2,
  },
  bubbleUser: {
    backgroundColor: colors.primary,
    borderTopRightRadius: hig.radius.sm,
    borderRadius: hig.radius.lg,
  },
  bubbleAssistant: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderBottomLeftRadius: hig.radius.sm,
    borderRadius: hig.radius.lg,
  },
  text: {
    fontSize: hig.typography.body,
    lineHeight: 24,
    color: colors.text,
  },
  textUser: {
    color: colors.white,
    fontWeight: '500',
  },
});
