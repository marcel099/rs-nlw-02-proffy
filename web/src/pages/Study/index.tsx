import { useState, FormEvent } from 'react';

import api from '@services/api';
import { weekDays } from '@utils/staticData';

import { OuterLabelInput } from '@components/OuterLabelInput';
import { PageHeader } from '@components/PageHeader';
import { PageSubtitle } from '@components/PageSubtitle';
import { Select } from '@components/Select';
import TeacherItem, { TeacherItemProps } from '@components/TeacherItem';

import './styles.css';

export function Study() {
  const [teachers, setTeachers] = useState([]);

  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  async function handleSearchTeachers(e: FormEvent) {
    e.preventDefault();

    const response = await api.get('/classes', {
      params: {
        subject,
        week_day,
        time,
      },
    });

    setTeachers(response.data);
  }

  return (
    <div id="page-teacher-list" className="page-container">
      <PageHeader
        title="Estudar"
      >
        <PageSubtitle subtitle="Estes são os proffys disponíveis." />
        <form id="search-teachers" onSubmit={handleSearchTeachers}>
          <Select
            name="subject"
            label="Matéria"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            options={[
              { value: 'Matemática', label: 'Matemática' },
              { value: 'Português', label: 'Língua Portuguesa' },
              { value: 'Biologia', label: 'Biologia' },
              { value: 'Química', label: 'Química' },
              { value: 'Física', label: 'Física' },
              { value: 'Geografia', label: 'Geografia' },
              { value: 'História', label: 'História' },
              { value: 'Artes', label: 'Artes' },
              { value: 'Educação Física', label: 'Educação Física' },
            ]}
          />
          <Select
            name="week_day"
            label="Dia da semana"
            value={week_day}
            onChange={(e) => setWeekDay(e.target.value)}
            options={weekDays}
          />
          <OuterLabelInput
            name="time"
            label="Hora"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          <button type="submit">
            Buscar
          </button>
        </form>
      </PageHeader>

      <main>
        {teachers.map((teacher: TeacherItemProps) => (
          <TeacherItem key={teacher.id} {...teacher} />
        ))}
      </main>
    </div>
  );
}
