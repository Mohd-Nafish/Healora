import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';

import { colors } from '@/constants/colors';
import { cardShadow } from '@/constants/shadows';
import { hig } from '@/constants/hig';

function usePulsingDot(delayMs: number) {
  const opacity = useSharedValue(0.35);

  useEffect(() => {
    opacity.value = withDelay(
      delayMs,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 350 }),
          withTiming(0.35, { duration: 350 }),
        ),
        -1,
        false,
      ),
    );
  }, [delayMs, opacity]);

  return useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: 0.85 + opacity.value * 0.15 }],
  }));
}

export function AiLoadingIndicator() {
  const dotStyle1 = usePulsingDot(0);
  const dotStyle2 = usePulsingDot(120);
  const dotStyle3 = usePulsingDot(240);

  return (
    <View style={styles.card}>
      <ActivityIndicator size="small" color={colors.primary} />
      <Text style={styles.text}>Analyzing your symptoms...</Text>
      <View style={styles.dotsRow}>
        <Animated.View style={[styles.dot, dotStyle1]} />
        <Animated.View style={[styles.dot, dotStyle2]} />
        <Animated.View style={[styles.dot, dotStyle3]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: hig.radius.lg,
    padding: hig.spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    gap: hig.spacing.sm,
    width: '100%',
    ...cardShadow,
  },
  text: {
    fontSize: hig.typography.subheadline,
    fontWeight: '600',
    color: colors.text,
  },
  dotsRow: {
    flexDirection: 'row',
    gap: hig.spacing.sm,
    marginTop: hig.spacing.xs,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
});
