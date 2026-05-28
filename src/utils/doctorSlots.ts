const CLINIC_HOURS = ['09:00 AM', '10:00 AM', '11:30 AM', '02:00 PM', '04:30 PM'];

/** Turns API slot data into a short list of selectable times for booking. */
export function getDoctorAvailableSlots(availableSlots: string | string[]): string[] {
  if (Array.isArray(availableSlots)) {
    return availableSlots;
  }

  if (availableSlots.includes(',')) {
    return availableSlots.split(',').map((slot) => slot.trim());
  }

  const index = CLINIC_HOURS.indexOf(availableSlots);
  if (index === -1) {
    return [availableSlots, ...CLINIC_HOURS.slice(0, 3)];
  }

  const start = Math.max(0, index - 1);
  return CLINIC_HOURS.slice(start, start + 4);
}
