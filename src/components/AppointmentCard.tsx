import { Image } from 'expo-image';
import { Calendar, Clock, Stethoscope, User } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/constants/colors';
import { cardShadow } from '@/constants/shadows';
import { hig } from '@/constants/hig';
import type { Appointment } from '@/types/appointment';

type AppointmentCardProps = {
  appointment: Appointment;
};

export function AppointmentCard({ appointment }: AppointmentCardProps) {
  const { doctor, patient, dateLabel, slot, fee } = appointment;

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <Image source={{ uri: doctor.image }} style={styles.avatar} contentFit="cover" />
        <View style={styles.doctorInfo}>
          <Text style={styles.doctorName}>{doctor.name}</Text>
          <View style={styles.specialtyRow}>
            <Stethoscope size={14} color={colors.primary} />
            <Text style={styles.specialty}>{doctor.specialty}</Text>
          </View>
          <Text style={styles.hospital} numberOfLines={2}>
            {doctor.hospital}
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.detailRow}>
        <Calendar size={16} color={colors.textMuted} />
        <Text style={styles.detailText}>{dateLabel}</Text>
      </View>
      <View style={styles.detailRow}>
        <Clock size={16} color={colors.textMuted} />
        <Text style={styles.detailText}>{slot}</Text>
      </View>
      <View style={styles.detailRow}>
        <User size={16} color={colors.textMuted} />
        <Text style={styles.detailText}>
          {patient.fullName} · Age {patient.age}
        </Text>
      </View>

      <Text style={styles.problem} numberOfLines={3}>
        {patient.problemDescription}
      </Text>

      <View style={styles.feeRow}>
        <Text style={styles.feeLabel}>Consultation fee</Text>
        <Text style={styles.fee}>${fee.toFixed(2)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: hig.radius.lg,
    padding: hig.spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    ...cardShadow,
  },
  topRow: {
    flexDirection: 'row',
    gap: hig.spacing.md,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: hig.radius.md,
    backgroundColor: colors.primaryLight,
  },
  doctorInfo: {
    flex: 1,
    gap: hig.spacing.xs,
  },
  doctorName: {
    fontSize: hig.typography.headline,
    fontWeight: '700',
    color: colors.text,
  },
  specialtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: hig.spacing.xs,
  },
  specialty: {
    fontSize: hig.typography.subheadline,
    fontWeight: '600',
    color: colors.primary,
  },
  hospital: {
    fontSize: hig.typography.footnote,
    lineHeight: 18,
    color: colors.textMuted,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
    marginVertical: hig.spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: hig.spacing.sm,
    marginBottom: hig.spacing.sm,
  },
  detailText: {
    fontSize: hig.typography.subheadline,
    color: colors.text,
    flex: 1,
  },
  problem: {
    fontSize: hig.typography.footnote,
    lineHeight: 20,
    color: colors.textMuted,
    marginTop: hig.spacing.xs,
    marginBottom: hig.spacing.md,
  },
  feeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: hig.spacing.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  feeLabel: {
    fontSize: hig.typography.caption,
    color: colors.textMuted,
  },
  fee: {
    fontSize: hig.typography.callout,
    fontWeight: '700',
    color: colors.primary,
  },
});
