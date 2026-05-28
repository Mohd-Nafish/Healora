const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export type BookingDateOption = {
  key: string;
  date: Date;
  dayLabel: string;
  dateLabel: string;
  monthLabel: string;
};

export function getUpcomingBookingDates(count = 7): BookingDateOption[] {
  const options: BookingDateOption[] = [];

  for (let index = 0; index < count; index += 1) {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + index);

    options.push({
      key: date.toISOString().split('T')[0],
      date,
      dayLabel: index === 0 ? 'Today' : DAY_NAMES[date.getDay()],
      dateLabel: String(date.getDate()),
      monthLabel: MONTH_NAMES[date.getMonth()],
    });
  }

  return options;
}

export function formatBookingDateLabel(dateKey: string): string {
  const date = new Date(dateKey);
  return date.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}
