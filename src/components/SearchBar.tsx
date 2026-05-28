import { Search } from 'lucide-react-native';
import { StyleSheet, TextInput, View } from 'react-native';

import { colors } from '@/constants/colors';
import { cardShadow } from '@/constants/shadows';
import { hig } from '@/constants/hig';

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
};

export function SearchBar({
  value,
  onChangeText,
  placeholder = 'Search doctors, specialty, hospital...',
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <Search size={20} color={colors.textMuted} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        autoCapitalize="none"
        autoCorrect={false}
        accessibilityLabel="Search doctors"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    borderRadius: hig.radius.lg,
    paddingHorizontal: hig.spacing.md,
    minHeight: hig.minTouchTarget,
    gap: hig.spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    ...cardShadow,
  },
  input: {
    flex: 1,
    fontSize: hig.typography.body,
    color: colors.text,
  },
});
