export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  hospital: string;
  rating: number;
  experience: number;
  image: string;
  fee: number;
  about?: string;
  availableSlots: string;
}
