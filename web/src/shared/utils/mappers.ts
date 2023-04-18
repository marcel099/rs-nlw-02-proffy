import { ApiClassSchedule } from '@dtos/ClassSchedule';

import { fillTimeUnitLength } from './formatters';

export function parseFetchedToParsedClassSchedule(
  classSchedule: ApiClassSchedule
) {
  const fromHour = fillTimeUnitLength(
    Math.floor(classSchedule.from / 60)
  );
  const fromMinute = fillTimeUnitLength(
    classSchedule.from % 60
  );
  const toHour = fillTimeUnitLength(
    Math.floor(classSchedule.to / 60)
  );
  const toMinute = fillTimeUnitLength(
    classSchedule.to % 60
  );

  const from = `${fromHour}:${fromMinute}`;
  const to = `${toHour}:${toMinute}`;
  return {
    id: classSchedule.id,
    week_day: classSchedule.week_day,
    from,
    to,
  };
}
