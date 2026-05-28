import AsyncStorage from '@react-native-async-storage/async-storage';

import type { Appointment } from '@/types/appointment';

const STORAGE_KEY = 'healora_appointments';

export async function getAppointments(): Promise<Appointment[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as Appointment[];
    return parsed.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  } catch {
    return [];
  }
}

export async function saveAppointment(appointment: Appointment): Promise<void> {
  const existing = await getAppointments();
  const updated = [appointment, ...existing];
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}
