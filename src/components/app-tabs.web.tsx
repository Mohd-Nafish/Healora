import type { Href } from 'expo-router';
import {
  Tabs,
  TabList,
  TabTrigger,
  TabSlot,
  TabTriggerSlotProps,
} from 'expo-router/ui';
import { Bot, Calendar } from 'lucide-react-native';
import type { ReactNode } from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { ThemedText } from './themed-text';

import { colors } from '@/constants/colors';
import { hig } from '@/constants/hig';
import { BottomTabInset, Spacing } from '@/constants/theme';

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot style={{ height: '100%' }} />
      <TabList style={styles.tabList}>
        <TabTrigger name="home" href="/" asChild>
          <TabButton>Home</TabButton>
        </TabTrigger>
        <TabTrigger name="ai-assistant" href={'/ai-assistant' as Href} asChild>
          <TabButton icon={<Bot size={18} color={colors.primary} />}>
            AI
          </TabButton>
        </TabTrigger>
        <TabTrigger name="appointments" href={'/appointments' as Href} asChild>
          <TabButton icon={<Calendar size={18} color={colors.primary} />}>
            Bookings
          </TabButton>
        </TabTrigger>
      </TabList>
    </Tabs>
  );
}

function TabButton({
  children,
  icon,
  isFocused,
  ...props
}: TabTriggerSlotProps & { icon?: ReactNode }) {
  return (
    <Pressable
      {...props}
      style={({ pressed }) => [styles.tabButton, pressed && styles.pressed]}
      accessibilityRole="tab"
      accessibilityState={{ selected: isFocused }}>
      {icon}
      <ThemedText type="small" themeColor={isFocused ? 'text' : 'textSecondary'}>
        {children}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tabList: {
    position: 'absolute',
    bottom: BottomTabInset + Spacing.two,
    left: hig.spacing.sm,
    right: hig.spacing.sm,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: hig.spacing.xs,
  },
  tabButton: {
    minHeight: hig.minTouchTarget,
    flex: 1,
    maxWidth: 120,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: hig.spacing.xs,
    paddingHorizontal: hig.spacing.sm,
    paddingVertical: hig.spacing.sm,
    borderRadius: hig.radius.lg,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pressed: {
    opacity: 0.85,
  },
});
