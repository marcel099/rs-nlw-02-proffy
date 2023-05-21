export interface ApiClassSchedule {
  id: number;
  week_day: number;
  from: number;
  to: number;
}

export interface ClassSchedule {
  id: number;
  week_day: number;
  from: string;
  to: string;
}
