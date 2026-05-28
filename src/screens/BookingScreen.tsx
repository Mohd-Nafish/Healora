import { router, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { DateChip } from '@/components/DateChip';
import { FormField } from '@/components/FormField';
import { PrimaryButton } from '@/components/PrimaryButton';
import { ScreenHeader } from '@/components/ScreenHeader';
import { SuccessModal } from '@/components/SuccessModal';
import { TimeSlotChip } from '@/components/TimeSlotChip';
import { colors } from '@/constants/colors';
import { hig } from '@/constants/hig';
import { saveAppointment } from '@/services/appointmentStorage';
import type { Appointment } from '@/types/appointment';
import type { PatientDetails } from '@/types/booking';
import { doctorFromParams } from '@/types/navigation';
import {
  formatBookingDateLabel,
  getUpcomingBookingDates,
} from '@/utils/bookingDates';
import { getDoctorAvailableSlots } from '@/utils/doctorSlots';

export function BookingScreen() {
  const params = useLocalSearchParams<{ doctor: string }>();
  const doctor = doctorFromParams(params.doctor);

  const dateOptions = useMemo(() => getUpcomingBookingDates(), []);
  const availableSlots = useMemo(
    () => (doctor ? getDoctorAvailableSlots(doctor.availableSlots) : []),
    [doctor],
  );

  const [selectedDateKey, setSelectedDateKey] = useState(dateOptions[0]?.key ?? '');
  const [selectedSlot, setSelectedSlot] = useState(availableSlots[0] ?? '');
  const [patient, setPatient] = useState<PatientDetails>({
    fullName: '',
    age: '',
    problemDescription: '',
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [saving, setSaving] = useState(false);

  if (!doctor) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centered}>
          <Text style={styles.errorText}>Doctor information is missing.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const isFormValid =
    patient.fullName.trim().length > 0 &&
    patient.age.trim().length > 0 &&
    patient.problemDescription.trim().length > 0 &&
    selectedSlot.length > 0;

  const handleConfirm = async () => {
    if (!isFormValid || saving) {
      return;
    }

    setSaving(true);

    const appointment: Appointment = {
      id: `${Date.now()}-${doctor.id}`,
      doctor,
      patient: {
        fullName: patient.fullName.trim(),
        age: patient.age.trim(),
        problemDescription: patient.problemDescription.trim(),
      },
      dateKey: selectedDateKey,
      dateLabel: formatBookingDateLabel(selectedDateKey),
      slot: selectedSlot,
      fee: doctor.fee,
      createdAt: new Date().toISOString(),
    };

    await saveAppointment(appointment);
    setSaving(false);
    setShowSuccess(true);
  };

  const successMessage = `Appointment with ${doctor.name} on ${formatBookingDateLabel(selectedDateKey)} at ${selectedSlot}.`;

  const handleSuccessClose = () => {
    setShowSuccess(false);
    router.replace('/appointments');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.fixedHeader}>
        <ScreenHeader
          title="Book appointment"
          subtitle={`${doctor.name} · ${doctor.specialty}`}
        />
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select date</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}>
              {dateOptions.map((option) => (
                <DateChip
                  key={option.key}
                  dayLabel={option.dayLabel}
                  dateLabel={option.dateLabel}
                  monthLabel={option.monthLabel}
                  selected={selectedDateKey === option.key}
                  onPress={() => setSelectedDateKey(option.key)}
                />
              ))}
            </ScrollView>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Available time</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}>
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

          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Patient details</Text>
            <View style={styles.form}>
              <FormField
                label="Full name"
                value={patient.fullName}
                onChangeText={(fullName) =>
                  setPatient((current) => ({ ...current, fullName }))
                }
                placeholder="Enter your full name"
                autoCapitalize="words"
                returnKeyType="next"
              />
              <FormField
                label="Age"
                value={patient.age}
                onChangeText={(age) => setPatient((current) => ({ ...current, age }))}
                placeholder="Enter your age"
                keyboardType="number-pad"
                returnKeyType="next"
              />
              <FormField
                label="Problem description"
                value={patient.problemDescription}
                onChangeText={(problemDescription) =>
                  setPatient((current) => ({ ...current, problemDescription }))
                }
                placeholder="Describe your symptoms or concern"
                multiline
                numberOfLines={4}
                style={styles.textArea}
                textAlignVertical="top"
              />
            </View>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Consultation fee</Text>
            <Text style={styles.summaryFee}>${doctor.fee.toFixed(2)}</Text>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <PrimaryButton
            label={saving ? 'Saving...' : 'Confirm Appointment'}
            onPress={handleConfirm}
            disabled={!isFormValid || saving}
          />
        </View>
      </KeyboardAvoidingView>

      <SuccessModal
        visible={showSuccess}
        title="Appointment confirmed"
        message={successMessage}
        onClose={handleSuccessClose}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
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
  scrollContent: {
    paddingHorizontal: hig.spacing.lg,
    paddingTop: hig.spacing.lg,
    paddingBottom: hig.spacing.xl,
  },
  section: {
    marginBottom: hig.spacing.lg,
  },
  sectionCard: {
    marginBottom: hig.spacing.lg,
    backgroundColor: colors.white,
    borderRadius: hig.radius.lg,
    padding: hig.spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: {
    fontSize: hig.typography.headline,
    fontWeight: '700',
    color: colors.text,
    marginBottom: hig.spacing.md,
  },
  horizontalList: {
    paddingRight: hig.spacing.sm,
  },
  form: {
    gap: hig.spacing.md,
  },
  textArea: {
    minHeight: 120,
    paddingTop: hig.spacing.md,
  },
  summaryCard: {
    backgroundColor: colors.primaryLight,
    borderRadius: hig.radius.lg,
    padding: hig.spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: hig.typography.subheadline,
    color: colors.textMuted,
  },
  summaryFee: {
    fontSize: hig.typography.title3,
    fontWeight: '700',
    color: colors.primary,
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
