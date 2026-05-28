import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

import { colors } from '@/constants/colors';
import { hig } from '@/constants/hig';

type FormFieldProps = TextInputProps & {
  label: string;
};

export function FormField({ label, style, ...inputProps }: FormFieldProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, style]}
        placeholderTextColor={colors.textMuted}
        accessibilityLabel={label}
        {...inputProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: hig.spacing.sm,
  },
  label: {
    fontSize: hig.typography.subheadline,
    fontWeight: '600',
    color: colors.text,
  },
  input: {
    minHeight: hig.minTouchTarget,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: hig.radius.md,
    paddingHorizontal: hig.spacing.md,
    paddingVertical: hig.spacing.sm,
    fontSize: hig.typography.body,
    color: colors.text,
    backgroundColor: colors.white,
  },
});
