import { Subject } from '@dtos/Subject';
import api from '@services/api';

export async function fetchSubjects() {
  const response = await api.get('/subjects');

  const fetchedSubjects: Subject[] = response.data;

  return { subjects: fetchedSubjects };
}
