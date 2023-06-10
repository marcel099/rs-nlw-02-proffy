import { ApiClassSchedule } from '@dtos/ClassSchedule';
import { Subject } from '@dtos/Subject';
import api from '@services/api';

import { createBlankClassSchedule } from './factories';
import { parseFetchedToParsedClassSchedule } from './mappers';

export async function fetchUserClasses() {
  const response = await api.get('/classes/me');

  const fetchedClassSchedules: ApiClassSchedule[] =
    response.data.class_schedules;

  const parsedClassSchedules = fetchedClassSchedules
    .map(parseFetchedToParsedClassSchedule);

  const newClassSchedules = parsedClassSchedules.length > 0
    ? parsedClassSchedules
    : [createBlankClassSchedule()];

  return {
    classSchedules: newClassSchedules,
    subjectId: response.data.class.subject.id,
    cost: response.data.class.cost,
  };
}

export async function fetchSubjects() {
  const response = await api.get('/subjects');

  const fetchedSubjects: Subject[] = response.data;

  return { subjects: fetchedSubjects };
}
