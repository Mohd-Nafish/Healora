export type PatientDetails = {
  fullName: string;
  age: string;
  problemDescription: string;
};

export type BookingFormState = PatientDetails & {
  selectedSlot: string;
  selectedDateKey: string;
};
