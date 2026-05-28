import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/constants/colors';
import { hig } from '@/constants/hig';

const TAGLINE = 'Smart healthcare at your fingertips';

type AppHeaderProps = {
  title?: string;
  subtitle?: string;
};

export function AppHeader({ title = 'Healora', subtitle = TAGLINE }: AppHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>Healthcare</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: hig.spacing.lg,
    paddingTop: hig.spacing.sm,
    paddingBottom: hig.spacing.md,
    backgroundColor: colors.background,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primaryLight,
    paddingHorizontal: hig.spacing.sm,
    paddingVertical: hig.spacing.xs,
    borderRadius: hig.radius.sm,
    marginBottom: hig.spacing.sm,
  },
  badgeText: {
    fontSize: hig.typography.caption,
    fontWeight: '700',
    color: colors.primary,
    letterSpacing: 0.3,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: hig.typography.subheadline,
    color: colors.textMuted,
    marginTop: hig.spacing.xs,
    lineHeight: 22,
  },
});
