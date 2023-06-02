import {
  useState, FormEvent, useEffect, useMemo,
} from 'react';
import { toast } from 'react-toastify';

import { Subject } from '@dtos/Subject';
import { fetchSubjects } from '@utils/fetchers';
import { weekDays } from '@utils/staticData';

import { OuterLabelInput } from '@components/OuterLabelInput';
import { Select } from '@components/Select';
import { StudyFiltersData } from '@pages/Study';

import './styles.css';

interface StudyFiltersProps {
  onfiltersUpdate: (data: StudyFiltersData) => void;
  page: number;
  setPage: (value: number) => void;
}

export function StudyFilters({
  onfiltersUpdate, setPage, page,
}: StudyFiltersProps) {
  const [subjectId, setSubjectId] = useState<number | null>(null);
  const [weekDay, setWeekDay] = useState<number | null>(null);
  const [time, setTime] = useState<string | null>(null);

  const [isFetchingSubjects, setIsFetchingSubjects] = useState(true);
  const [subjects, setSubjects] = useState<Subject[]>([]);

  function handleSearchTeachers(e: FormEvent) {
    e.preventDefault();
  }

  function getFiltersData() {
    return {
      subjectId,
      weekDay,
      time,
    };
  }

  useEffect(() => {
    fetchSubjects()
      .then((data) => {
        setSubjects(data.subjects);
        setIsFetchingSubjects(false);
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          return;
        }

        toast.error('Erro ao buscar dados das matérias');
      });
  }, []);

  useEffect(() => {
    if (page > 1) {
      setPage(1);
    }

    onfiltersUpdate({
      ...getFiltersData(),
      page: 1,
    });
  }, [subjectId, weekDay, time]);

  useEffect(() => {
    onfiltersUpdate({
      ...getFiltersData(),
      page,
    });
  }, [page]);

  const parsedSubjects = useMemo(() => subjects.map((subject) => ({
    label: subject.name,
    value: String(subject.id),
  })), [subjects]);

  return (
    <form id="study-form" onSubmit={handleSearchTeachers}>
      {isFetchingSubjects === false && (
        <Select
          name="subject"
          label="Matéria"
          value={subjectId !== null ? String(subjectId) : ''}
          onChange={
            (e) => {
              const { value } = e.target;
              setSubjectId(value === '' ? null : Number(value));
            }
          }
          options={parsedSubjects}
        />
      )}
      <Select
        name="week_day"
        label="Dia da semana"
        value={weekDay !== null ? String(weekDay) : ''}
        onChange={
          (e) => {
            const { value } = e.target;
            setWeekDay(value === '' ? null : Number(value));
          }
        }
        options={weekDays}
      />
      <OuterLabelInput
        name="time"
        label="Hora"
        type="time"
        value={time !== null ? String(time) : '00:00'}
        onChange={
          (e) => setTime(e.target.value)
        }
      />
    </form>
  );
}
