import { Pressable, StyleSheet, Text } from 'react-native';

import { colors } from '@/constants/colors';
import { hig } from '@/constants/hig';

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
};

export function PrimaryButton({ label, onPress, disabled = false }: PrimaryButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        disabled && styles.buttonDisabled,
        pressed && !disabled && styles.buttonPressed,
      ]}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}>
      <Text style={[styles.label, disabled && styles.labelDisabled]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: hig.radius.md,
    minHeight: hig.minTouchTarget,
    paddingVertical: hig.spacing.md,
    paddingHorizontal: hig.spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPressed: {
    opacity: 0.88,
  },
  buttonDisabled: {
    backgroundColor: colors.border,
  },
  label: {
    color: colors.white,
    fontSize: hig.typography.headline,
    fontWeight: '600',
  },
  labelDisabled: {
    color: colors.textMuted,
  },
});
