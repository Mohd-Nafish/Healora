import type { Doctor } from '@/types/doctor';

export function getDoctorAbout(doctor: Doctor): string {
  if (doctor.about) {
    return doctor.about;
  }

  const years =
    doctor.experience === 1 ? '1 year' : `${doctor.experience} years`;

  return `Dr. ${doctor.name} is a trusted ${doctor.specialty} with ${years} of clinical experience at ${doctor.hospital}. Known for attentive care and clear communication, they help patients understand their health and treatment options.`;
}
