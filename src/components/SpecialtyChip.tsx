import { Pressable, StyleSheet, Text } from 'react-native';

import { colors } from '@/constants/colors';
import { cardShadow } from '@/constants/shadows';
import { hig } from '@/constants/hig';

type SpecialtyChipProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

export function SpecialtyChip({ label, selected, onPress }: SpecialtyChipProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.chip, selected && styles.chipSelected]}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={`Filter by ${label}`}>
      <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: hig.spacing.md,
    minHeight: hig.minTouchTarget - 4,
    justifyContent: 'center',
    borderRadius: 999,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: hig.spacing.sm,
    ...cardShadow,
  },
  chipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  label: {
    fontSize: hig.typography.subheadline,
    fontWeight: '600',
    color: colors.text,
  },
  labelSelected: {
    color: colors.white,
  },
});
