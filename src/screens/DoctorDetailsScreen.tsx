import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { Building2, Clock, Star } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PrimaryButton } from '@/components/PrimaryButton';
import { ScreenHeader } from '@/components/ScreenHeader';
import { TimeSlotChip } from '@/components/TimeSlotChip';
import { colors } from '@/constants/colors';
import { getDoctorAbout } from '@/constants/doctorDetails';
import { cardShadow } from '@/constants/shadows';
import { hig } from '@/constants/hig';
import { doctorFromParams, doctorToParams } from '@/types/navigation';
import { getDoctorAvailableSlots } from '@/utils/doctorSlots';

export function DoctorDetailsScreen() {
  const params = useLocalSearchParams<{ doctor: string }>();
  const doctor = doctorFromParams(params.doctor);

  const availableSlots = useMemo(
    () => (doctor ? getDoctorAvailableSlots(doctor.availableSlots) : []),
    [doctor],
  );
  const [selectedSlot, setSelectedSlot] = useState(availableSlots[0] ?? '');

  if (!doctor) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centered}>
          <Text style={styles.errorText}>Doctor details not found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const experienceLabel =
    doctor.experience === 1 ? '1 year' : `${doctor.experience} years`;

  const openBooking = () => {
    router.push({
      pathname: '/booking',
      params: doctorToParams(doctor),
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.fixedHeader}>
        <ScreenHeader title="Doctor profile" />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.heroCard}>
          <Image
            source={{ uri: doctor.image }}
            style={styles.heroImage}
            contentFit="cover"
            accessibilityLabel={`Photo of ${doctor.name}`}
          />
          <Text style={styles.name}>{doctor.name}</Text>
          <Text style={styles.specialty}>{doctor.specialty}</Text>

          <View style={styles.hospitalRow}>
            <Building2 size={16} color={colors.textMuted} />
            <Text style={styles.hospital}>{doctor.hospital}</Text>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Star size={18} color={colors.star} fill={colors.star} />
              <Text style={styles.statValue}>{doctor.rating.toFixed(1)}</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
            <View style={styles.statCard}>
              <Clock size={18} color={colors.primary} />
              <Text style={styles.statValue}>{experienceLabel}</Text>
              <Text style={styles.statLabel}>Experience</Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.aboutText}>{getDoctorAbout(doctor)}</Text>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Consultation fee</Text>
          <Text style={styles.fee}>${doctor.fee.toFixed(2)}</Text>
          <Text style={styles.feeNote}>Per visit · Insurance may apply</Text>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Available time</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.slotsRow}>
            {availableSlots.map((slot) => (
              <TimeSlotChip
                key={slot}
                label={slot}
                selected={selectedSlot === slot}
                onPress={() => setSelectedSlot(slot)}
              />
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton label="Book Appointment" onPress={openBooking} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  fixedHeader: {
    backgroundColor: colors.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
    paddingHorizontal: hig.spacing.lg,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: hig.spacing.lg,
    paddingTop: hig.spacing.lg,
    paddingBottom: hig.spacing.xl,
  },
  heroCard: {
    backgroundColor: colors.white,
    borderRadius: hig.radius.xl,
    padding: hig.spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: hig.spacing.sm,
    ...cardShadow,
  },
  heroImage: {
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: colors.primaryLight,
    marginBottom: hig.spacing.md,
    borderWidth: 3,
    borderColor: colors.primaryLight,
  },
  name: {
    fontSize: hig.typography.largeTitle,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
  },
  specialty: {
    fontSize: hig.typography.callout,
    fontWeight: '600',
    color: colors.primary,
    marginTop: hig.spacing.xs,
  },
  hospitalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: hig.spacing.xs,
    marginTop: hig.spacing.sm,
    paddingHorizontal: hig.spacing.sm,
  },
  hospital: {
    flex: 1,
    fontSize: hig.typography.footnote,
    color: colors.textMuted,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    gap: hig.spacing.md,
    marginTop: hig.spacing.lg,
    width: '100%',
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.primaryLight,
    borderRadius: hig.radius.lg,
    padding: hig.spacing.md,
    alignItems: 'center',
    gap: hig.spacing.xs,
  },
  statValue: {
    fontSize: hig.typography.callout,
    fontWeight: '700',
    color: colors.text,
  },
  statLabel: {
    fontSize: hig.typography.caption,
    color: colors.textMuted,
  },
  sectionCard: {
    backgroundColor: colors.white,
    borderRadius: hig.radius.lg,
    padding: hig.spacing.lg,
    marginTop: hig.spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: {
    fontSize: hig.typography.headline,
    fontWeight: '700',
    color: colors.text,
    marginBottom: hig.spacing.sm,
  },
  aboutText: {
    fontSize: hig.typography.subheadline,
    lineHeight: 22,
    color: colors.textMuted,
  },
  fee: {
    fontSize: hig.typography.largeTitle,
    fontWeight: '700',
    color: colors.primary,
  },
  feeNote: {
    fontSize: hig.typography.footnote,
    color: colors.textMuted,
    marginTop: hig.spacing.xs,
  },
  slotsRow: {
    paddingRight: hig.spacing.sm,
  },
  footer: {
    paddingHorizontal: hig.spacing.lg,
    paddingTop: hig.spacing.md,
    paddingBottom: hig.spacing.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    backgroundColor: colors.white,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: hig.spacing.xl,
  },
  errorText: {
    fontSize: hig.typography.body,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
