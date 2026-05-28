export const SPECIALTY_FILTERS = [
  'All',
  'Cardiologist',
  'Dentist',
  'Neurologist',
  'Dermatologist',
  'Pediatrician',
  'Orthopedic',
] as const;

export type SpecialtyFilter = (typeof SPECIALTY_FILTERS)[number];
