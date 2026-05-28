import type { PatientDetails } from '@/types/booking';
import type { Doctor } from '@/types/doctor';

export type Appointment = {
  id: string;
  doctor: Doctor;
  patient: PatientDetails;
  dateKey: string;
  dateLabel: string;
  slot: string;
  fee: number;
  createdAt: string;
};
