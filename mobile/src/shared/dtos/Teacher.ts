import { ApiClassSchedule } from './ClassSchedule';

export interface Teacher {
  user_id: number;
  first_name: string;
  last_name: string;
  bio: string;
  avatar_url: string;
  whatsapp: string;
  lesson: {
    cost: number;
  };
  subject: {
    name: string;
  };
  class_schedules: ApiClassSchedule[];
}
