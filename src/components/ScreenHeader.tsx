import { router } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/constants/colors';
import { hig } from '@/constants/hig';

type ScreenHeaderProps = {
  title: string;
  subtitle?: string;
};

export function ScreenHeader({ title, subtitle }: ScreenHeaderProps) {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => router.back()}
        style={styles.backButton}
        accessibilityRole="button"
        accessibilityLabel="Go back">
        <ArrowLeft size={22} color={colors.primary} />
        <Text style={styles.backLabel}>Back</Text>
      </Pressable>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: hig.spacing.sm,
    gap: hig.spacing.xs,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: hig.spacing.xs,
    minHeight: hig.minTouchTarget,
    alignSelf: 'flex-start',
    paddingRight: hig.spacing.md,
  },
  backLabel: {
    fontSize: hig.typography.callout,
    fontWeight: '600',
    color: colors.primary,
  },
  title: {
    fontSize: hig.typography.title2,
    fontWeight: '700',
    color: colors.text,
    marginTop: hig.spacing.xs,
  },
  subtitle: {
    fontSize: hig.typography.subheadline,
    color: colors.textMuted,
    lineHeight: 20,
  },
});
