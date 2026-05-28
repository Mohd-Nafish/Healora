import { Pressable, StyleSheet, Text } from 'react-native';

import { colors } from '@/constants/colors';
import { hig } from '@/constants/hig';

type DateChipProps = {
  dayLabel: string;
  dateLabel: string;
  monthLabel: string;
  selected: boolean;
  onPress: () => void;
};

export function DateChip({
  dayLabel,
  dateLabel,
  monthLabel,
  selected,
  onPress,
}: DateChipProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.chip, selected && styles.chipSelected]}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={`${dayLabel}, ${monthLabel} ${dateLabel}`}>
      <Text style={[styles.day, selected && styles.textSelected]}>{dayLabel}</Text>
      <Text style={[styles.date, selected && styles.textSelected]}>{dateLabel}</Text>
      <Text style={[styles.month, selected && styles.textSelected]}>{monthLabel}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    minWidth: 72,
    minHeight: hig.minTouchTarget + 28,
    paddingVertical: hig.spacing.sm,
    paddingHorizontal: hig.spacing.md,
    borderRadius: hig.radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: hig.spacing.sm,
  },
  chipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  day: {
    fontSize: hig.typography.caption,
    fontWeight: '600',
    color: colors.textMuted,
  },
  date: {
    fontSize: hig.typography.title3,
    fontWeight: '700',
    color: colors.text,
    marginVertical: 2,
  },
  month: {
    fontSize: hig.typography.caption,
    color: colors.textMuted,
  },
  textSelected: {
    color: colors.white,
  },
});
