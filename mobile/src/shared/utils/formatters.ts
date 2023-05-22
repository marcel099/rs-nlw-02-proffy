import { format } from 'date-fns';

export const fillTimeUnitLength =
  (timeUnit: number) => String(timeUnit).padStart(2, '0');

export const formatDateToLocaleTime =
  (date: Date) => format(date, 'HH:mm');
