import { useEffect } from 'react';

import { Subject } from '@dtos/Subject';
import api from '@services/api';

import { OuterLabelInput } from '@components/OuterLabelInput';
import { Select } from '@components/Select';

import './styles.css';

interface SubjectFormProps {
  subjects: Subject[];
  setSubjects: (subjects: Subject[]) => void;
  subjectId: number;
  setSubjectId: (subjectId: number) => void;
  cost: string;
  setCost: (cost: string) => void;
}

export function SubjectForm({
  subjects, setSubjects, subjectId, setSubjectId, cost, setCost,
}: SubjectFormProps) {
  useEffect(() => {
    api.get('/subjects').then((response) => {
      setSubjects(response.data);
    });
  });

  return (
    <fieldset>
      <legend>Sobre a aula</legend>

      <div className="fields-section subject-section">
        <Select
          name="subject"
          label="Matéria"
          value={subjectId}
          placeholder="Selecione qual você quer ensinar"
          onChange={(e) => setSubjectId(Number(e.target.value))}
          options={subjects.map((subject) => ({
            value: String(subject.id),
            label: subject.name,
          }))}
        />
        <OuterLabelInput
          name="cost"
          label="Custo da sua hora por aula"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
        />
      </div>
    </fieldset>
  );
}
