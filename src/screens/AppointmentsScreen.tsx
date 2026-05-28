import { useFocusEffect } from 'expo-router';
import { Calendar } from 'lucide-react-native';
import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppointmentCard } from '@/components/AppointmentCard';
import { colors } from '@/constants/colors';
import { hig } from '@/constants/hig';
import { getAppointments } from '@/services/appointmentStorage';
import type { Appointment } from '@/types/appointment';

export function AppointmentsScreen() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  const loadAppointments = useCallback(async () => {
    setLoading(true);
    const data = await getAppointments();
    setAppointments(data);
    setLoading(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadAppointments();
    }, [loadAppointments]),
  );

  const renderItem = useCallback(
    ({ item }: { item: Appointment }) => <AppointmentCard appointment={item} />,
    [],
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.fixedHeader}>
        <Text style={styles.title}>My Appointments</Text>
        <Text style={styles.subtitle}>Your booked doctors and visit details</Text>
      </View>

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : appointments.length === 0 ? (
        <View style={styles.centered}>
          <View style={styles.emptyIcon}>
            <Calendar size={40} color={colors.primary} />
          </View>
          <Text style={styles.emptyTitle}>No appointments yet</Text>
          <Text style={styles.emptyMessage}>
            Book a doctor from the Home tab to see your appointments here.
          </Text>
        </View>
      ) : (
        <FlatList
          data={appointments}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  fixedHeader: {
    paddingHorizontal: hig.spacing.lg,
    paddingTop: hig.spacing.sm,
    paddingBottom: hig.spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: hig.typography.title2,
    fontWeight: '700',
    color: colors.primary,
  },
  subtitle: {
    fontSize: hig.typography.subheadline,
    color: colors.textMuted,
    marginTop: hig.spacing.xs,
  },
  listContent: {
    padding: hig.spacing.lg,
    paddingBottom: hig.spacing.xxl,
  },
  separator: {
    height: hig.spacing.md,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: hig.spacing.xl,
  },
  emptyIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hig.spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  emptyTitle: {
    fontSize: hig.typography.title3,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
  },
  emptyMessage: {
    fontSize: hig.typography.subheadline,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: hig.spacing.sm,
    lineHeight: 22,
    maxWidth: 280,
  },
});
