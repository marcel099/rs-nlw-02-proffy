import { ClassSchedule } from '@dtos/ClassSchedule';

export function createBlankClassSchedule(): ClassSchedule {
  return {
    id: -Math.ceil(Math.random() * 10000),
    week_day: -1,
    from: '',
    to: '',
  };
}
