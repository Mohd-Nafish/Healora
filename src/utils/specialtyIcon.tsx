import {
  Brain,
  Heart,
  Smile,
  Stethoscope,
  type LucideIcon,
} from 'lucide-react-native';

const SPECIALTY_ICONS: Record<string, LucideIcon> = {
  Cardiologist: Heart,
  Dentist: Smile,
  'General Physician': Stethoscope,
  Neurologist: Brain,
  Dermatologist: Stethoscope,
  Pediatrician: Heart,
  Orthopedic: Stethoscope,
  'ENT Specialist': Stethoscope,
  Psychiatrist: Brain,
  Gynecologist: Heart,
};

export function getSpecialtyIcon(specialty: string): LucideIcon {
  return SPECIALTY_ICONS[specialty] ?? Stethoscope;
}
