import { SearchX } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/constants/colors';
import { cardShadow } from '@/constants/shadows';
import { hig } from '@/constants/hig';

type EmptyStateProps = {
  title?: string;
  message?: string;
};

export function EmptyState({
  title = 'No doctors found',
  message = 'Try a different search or specialty filter.',
}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <SearchX size={40} color={colors.primary} strokeWidth={1.75} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hig.spacing.xxl,
    paddingHorizontal: hig.spacing.xl,
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hig.spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    ...cardShadow,
  },
  title: {
    fontSize: hig.typography.title3,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
  },
  message: {
    fontSize: hig.typography.subheadline,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: hig.spacing.sm,
    lineHeight: 22,
    maxWidth: 280,
  },
});
