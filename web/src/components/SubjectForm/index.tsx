import { useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';

import { Subject } from '@dtos/Subject';
import { isTokenExpiredError } from '@utils/errors';
import { fetchSubjects } from '@utils/fetchers';

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
    fetchSubjects()
      .then((data) => {
        setSubjects(data.subjects);
      })
      .catch((error) => {
        if (isTokenExpiredError(error)) {
          return;
        }

        toast.error('Erro ao buscar dados das matérias');
      });
  });

  const parsedSubjects = useMemo(() => subjects.map((subject) => ({
    label: subject.name,
    value: String(subject.id),
  })), [subjects]);

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
          options={parsedSubjects}
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
