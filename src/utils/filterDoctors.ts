import type { SpecialtyFilter } from '@/constants/specialties';
import type { Doctor } from '@/types/doctor';

export function filterDoctors(
  doctors: Doctor[],
  searchQuery: string,
  selectedSpecialty: SpecialtyFilter,
): Doctor[] {
  const query = searchQuery.trim().toLowerCase();

  return doctors.filter((doctor) => {
    const matchesSpecialty =
      selectedSpecialty === 'All' || doctor.specialty === selectedSpecialty;

    if (!matchesSpecialty) {
      return false;
    }

    if (!query) {
      return true;
    }

    return (
      doctor.name.toLowerCase().includes(query) ||
      doctor.specialty.toLowerCase().includes(query) ||
      doctor.hospital.toLowerCase().includes(query)
    );
  });
}
