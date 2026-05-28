import { Pressable, StyleSheet, Text } from 'react-native';

import { colors } from '@/constants/colors';
import { hig } from '@/constants/hig';

type SuggestionChipProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
};

export function SuggestionChip({ label, onPress, disabled = false }: SuggestionChipProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.chip,
        disabled && styles.chipDisabled,
        pressed && !disabled && styles.chipPressed,
      ]}
      accessibilityRole="button"
      accessibilityLabel={`Suggest symptom: ${label}`}>
      <Text style={[styles.label, disabled && styles.labelDisabled]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: hig.spacing.md,
    paddingVertical: hig.spacing.sm,
    borderRadius: 999,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: hig.spacing.sm,
  },
  chipPressed: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  chipDisabled: {
    opacity: 0.5,
  },
  label: {
    fontSize: hig.typography.subheadline,
    fontWeight: '600',
    color: colors.primary,
  },
  labelDisabled: {
    color: colors.textMuted,
  },
});
