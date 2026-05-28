/** Formats ALL CAPS hospital strings into readable title case. */
export function formatHospitalName(hospital: string): string {
  return hospital
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
