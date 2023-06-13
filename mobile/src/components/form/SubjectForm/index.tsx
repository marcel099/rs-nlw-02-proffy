import { Subject } from '@dtos/Subject';

import { FormFieldset } from '@components/form/FormFieldset';
import { OuterLabelInput } from '@components/form/OuterLabelInput';
import { Select } from '@components/form/Select';

interface SubjectFormProps {
  subjects: Subject[];
  subjectId: string | null;
  setSubjectId: (subjectId: string) => void;
  cost: number;
  setCost: (cost: number) => void;
  isFetchingSubjects: boolean;
  isFetchingUserClasses: boolean;
}

export function SubjectForm({
  subjects,
  subjectId,
  setSubjectId,
  cost,
  setCost,
  isFetchingSubjects,
  isFetchingUserClasses,
}: SubjectFormProps) {
  return (
    <FormFieldset
      legend="Sobre a aula"
    >
      {!isFetchingSubjects && !isFetchingUserClasses && (
        <Select
          label="Matéria"
          options={subjects}
          optionValue="id"
          optionLabel="name"
          selectedValue={subjectId}
          onValueChange={(value: string) => setSubjectId(value)}
          placeholder="Selecione qual ensinar"
        />
      )}
      <OuterLabelInput
        label="Custo da sua hora por aula"
        value={String(cost)}
        onChangeText={(value) => setCost(Number(value))}
        placeholder="R$"
        keyboardType="numeric"
      />
    </FormFieldset>
  );
}
