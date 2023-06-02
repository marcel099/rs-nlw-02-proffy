import { useState } from 'react';
import { toast } from 'react-toastify';

import nerdFaceIcon from '@assets/images/icons/nerd-face.svg';

import { ApiTeacher, Teacher } from '@dtos/Teacher';
import api from '@services/api';
import { parseFetchedToParsedClassSchedule } from '@utils/mappers';

import { EncouragementMessage } from '@components/EncouragementMessage';
import { PageHeader } from '@components/PageHeader';
import { PageSubtitle } from '@components/PageSubtitle';
import { StudyFilters } from '@components/StudyFilters';
import { TeacherItem } from '@components/TeacherItem';

import './styles.css';

export interface StudyFiltersData {
  subjectId: number | null;
  weekDay: number | null;
  time: string | null;
  page: number;
}

interface ResponseTeacherList {
  data: ApiTeacher[];
  offset: number;
  total: number;
}

export function Study() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [isFetchingTeachers, setIsFetchingTeachers] = useState(true);

  const [teachersTotal, setTeachersTotal] = useState(0);
  const [teachersOffset, setTeachersOffset] = useState(0);
  const [teachersPage, setTeachersPage] = useState(1);
  const teachersPerPage = 5;

  const isTeacherListEmpty = teachers.length === 0;
  const hasFetchedAllTeachers =
    (teachersOffset + teachersPerPage) >= teachersTotal;

  async function fetchClasses({
    subjectId, weekDay, time, page,
  }: StudyFiltersData) {
    try {
      if (isFetchingTeachers) {
        return;
      }

      setIsFetchingTeachers(true);

      const params = {
        subject_id: subjectId,
        week_day: weekDay,
        time,
        page,
      };

      const response = await api.get('/classes', {
        params,
      });

      const {
        data: fetchedTeachers,
        offset,
        total,
      } = response.data as ResponseTeacherList;

      const parsedTeachers = fetchedTeachers.map((teacher) => {
        const parsedClassSchedules = teacher.class_schedules
          .map(parseFetchedToParsedClassSchedule);

        return {
          ...teacher,
          class_schedules: parsedClassSchedules,
        };
      });

      setTeachersTotal(total);
      setTeachersOffset(offset);

      setTeachers((previousTeachers) => {
        if (page > 1) {
          return [...previousTeachers, ...parsedTeachers];
        }

        return parsedTeachers;
      });
    } catch {
      toast.error('Erro ao buscar dados da lista de aulas');
    } finally {
      setIsFetchingTeachers(false);
    }
  }

  function handleFetchNextPage() {
    setTeachersPage((previousPageNumber) => previousPageNumber + 1);
  }

  return (
    <div id="page-study" className="page-container">
      <PageHeader
        title="Estudar"
      >
        <div className="page-description-container">
          <PageSubtitle subtitle="Estes são os proffys disponíveis." />
          <div className="encouragement-message-container">
            <EncouragementMessage
              iconUrl={nerdFaceIcon}
              iconAlt="Foguete"
            >
              Nós temos<br />{teachersTotal} proffys.
            </EncouragementMessage>
          </div>
        </div>
        <StudyFilters
          onfiltersUpdate={fetchClasses}
          page={teachersPage}
          setPage={setTeachersPage}
        />
      </PageHeader>

      <main>
        {isTeacherListEmpty ? (
          <p className="warning-message no-teachers-found-message">
            Nenhum proffy encontrado<br />com sua pesquisa.
          </p>
        ) : (
          <>
            {teachers.map((teacher) => (
              <TeacherItem key={teacher.user_id} {...teacher} />
            ))}
            {hasFetchedAllTeachers ? (
              <p className="warning-message end-teacher-list-message">
                Estes são todos os resultados
              </p>
            ) : (
              <div className="fetch-next-page-button-container">
                <button
                  type="button"
                  className="fetch-next-page-button"
                  onClick={handleFetchNextPage}
                  disabled={isFetchingTeachers}
                >
                  Carregar mais
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
