import { Pressable, StyleSheet, Text } from 'react-native';

import { colors } from '@/constants/colors';
import { hig } from '@/constants/hig';

type TimeSlotChipProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

export function TimeSlotChip({ label, selected, onPress }: TimeSlotChipProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.chip, selected && styles.chipSelected]}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={`Time slot ${label}`}>
      <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    minHeight: hig.minTouchTarget,
    paddingHorizontal: hig.spacing.md,
    paddingVertical: hig.spacing.sm,
    borderRadius: hig.radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    marginRight: hig.spacing.sm,
    justifyContent: 'center',
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
