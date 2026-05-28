import { AlertCircle, Shield, Stethoscope } from 'lucide-react-native';
import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

import { colors } from '@/constants/colors';
import { cardShadow } from '@/constants/shadows';
import { hig } from '@/constants/hig';
import type { SymptomCheckResult } from '@/types/symptomCheck';

type InfoCardProps = {
  title: string;
  icon: ReactNode;
  accentColor: string;
  children: ReactNode;
  delay: number;
};

function InfoCard({ title, icon, accentColor, children, delay }: InfoCardProps) {
  return (
    <Animated.View entering={FadeInUp.duration(400).delay(delay).springify()} style={styles.card}>
      <View style={styles.header}>
        <View style={[styles.iconWrap, { backgroundColor: accentColor }]}>
          {icon}
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.body}>{children}</View>
    </Animated.View>
  );
}

type SymptomResultCardsProps = {
  result: SymptomCheckResult;
};

export function SymptomResultCards({ result }: SymptomResultCardsProps) {
  return (
    <View style={styles.stack}>
      <InfoCard
        title="Possible Causes"
        accentColor="#EFF6FF"
        delay={0}
        icon={<AlertCircle size={20} color={colors.primary} />}>
        {result.possibleCauses.map((cause, index) => (
          <Text key={`cause-${index}`} style={styles.bullet}>
            • {cause}
          </Text>
        ))}
      </InfoCard>

      <InfoCard
        title="Recommended Specialist"
        accentColor="#ECFDF5"
        delay={80}
        icon={<Stethoscope size={20} color="#059669" />}>
        <Text style={styles.specialist}>{result.recommendedSpecialist}</Text>
      </InfoCard>

      <InfoCard
        title="Basic Precautions"
        accentColor="#FFF7ED"
        delay={160}
        icon={<Shield size={20} color="#EA580C" />}>
        {result.basicPrecautions.map((tip, index) => (
          <Text key={`tip-${index}`} style={styles.bullet}>
            • {tip}
          </Text>
        ))}
      </InfoCard>
    </View>
  );
}

const styles = StyleSheet.create({
  stack: {
    width: '100%',
    gap: hig.spacing.md,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: hig.radius.lg,
    padding: hig.spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    ...cardShadow,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: hig.spacing.md,
    marginBottom: hig.spacing.md,
    paddingBottom: hig.spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: hig.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    fontSize: hig.typography.headline,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: -0.2,
  },
  body: {
    gap: hig.spacing.sm,
  },
  bullet: {
    fontSize: hig.typography.subheadline,
    lineHeight: 24,
    color: colors.textMuted,
  },
  specialist: {
    fontSize: hig.typography.title3,
    fontWeight: '700',
    color: colors.primary,
    lineHeight: 28,
  },
});
