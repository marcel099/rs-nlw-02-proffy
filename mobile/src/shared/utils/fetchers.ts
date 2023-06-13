import { ApiClassSchedule } from '@dtos/ClassSchedule';
import { ApiSubject, Subject } from '@dtos/Subject';
import api from '@services/api';
import { createBlankClassSchedule } from '@utils/factories';
import { parseFetchedToParsedClassSchedule } from '@utils/mappers';

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
    subjectId: String(response.data.class.subject.id),
    cost: response.data.class.cost,
  };
}

export async function fetchSubjects() {
  const response = await api.get('/subjects');

  const fetchedSubjects: ApiSubject[] = response.data;
  const parsedSubjects: Subject[] = fetchedSubjects.map((subject) => ({
    id: String(subject.id),
    name: subject.name,
  }));

  return { subjects: parsedSubjects };
}
