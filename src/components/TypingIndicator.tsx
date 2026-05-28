import { Bot } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';

import { colors } from '@/constants/colors';
import { hig } from '@/constants/hig';

function useBounceDot(delayMs: number) {
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withDelay(
      delayMs,
      withRepeat(
        withSequence(
          withTiming(-5, { duration: 280 }),
          withTiming(0, { duration: 280 }),
        ),
        -1,
        false,
      ),
    );
  }, [delayMs, translateY]);

  return useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));
}

export function TypingIndicator() {
  const dot1 = useBounceDot(0);
  const dot2 = useBounceDot(100);
  const dot3 = useBounceDot(200);

  return (
    <Animated.View entering={FadeIn.duration(300)} style={styles.row}>
      <View style={styles.avatar}>
        <Bot size={16} color={colors.primary} />
      </View>
      <View style={styles.bubble}>
        <Text style={styles.label}>AI is typing</Text>
        <View style={styles.dotsRow}>
          <Animated.View style={[styles.dot, dot1]} />
          <Animated.View style={[styles.dot, dot2]} />
          <Animated.View style={[styles.dot, dot3]} />
        </View>
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
    maxWidth: '88%',
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
  bubble: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: hig.radius.lg,
    borderBottomLeftRadius: hig.spacing.xs,
    paddingHorizontal: hig.spacing.md,
    paddingVertical: hig.spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    gap: hig.spacing.xs,
  },
  label: {
    fontSize: hig.typography.caption,
    fontWeight: '600',
    color: colors.textMuted,
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    height: 20,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: colors.primary,
  },
});
