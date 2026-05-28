import type { Doctor } from '@/types/doctor';

export type DoctorDetailsParams = {
  doctor: string;
};

export function doctorToParams(doctor: Doctor): DoctorDetailsParams {
  return { doctor: JSON.stringify(doctor) };
}

export function doctorFromParams(doctorJson: string | string[] | undefined): Doctor | null {
  try {
    const value = Array.isArray(doctorJson) ? doctorJson[0] : doctorJson;
    if (!value) {
      return null;
    }
    return JSON.parse(value) as Doctor;
  } catch {
    return null;
  }
}
