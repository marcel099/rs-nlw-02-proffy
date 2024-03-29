import { Dispatch, SetStateAction } from 'react';

import { ClassSchedule } from '@dtos/ClassSchedule';
import { createBlankClassSchedule } from '@utils/factories';
import { weekDays } from '@utils/staticData';

import { OuterLabelInput } from '@components/OuterLabelInput';
import { Select } from '@components/Select';

import './styles.css';

interface ClassScheduleFormProps {
  classSchedules: ClassSchedule[];
  setClassSchedules: Dispatch<SetStateAction<ClassSchedule[]>>;
}

export function ClassScheduleForm({
  classSchedules,
  setClassSchedules,
}: ClassScheduleFormProps) {
  function addNewClassSchedule() {
    setClassSchedules([...classSchedules, createBlankClassSchedule()]);
  }

  function removeClassSchedule(id: number) {
    const updatedClassSchedules = [...classSchedules];
    const classScheduleIndex = updatedClassSchedules.findIndex(
      (classSchedule) => classSchedule.id === id
    );

    updatedClassSchedules.splice(classScheduleIndex, 1);

    if (updatedClassSchedules.length === 0) {
      updatedClassSchedules.push(createBlankClassSchedule());
    }

    setClassSchedules(updatedClassSchedules);
  }

  function setClassScheduleValue(
    id: number,
    field: 'week_day' | 'from' | 'to',
    value: string
  ) {
    setClassSchedules((previousClassSchedules) => {
      const updatedClassSchedules = previousClassSchedules
        .map((classSchedule) => {
          if (classSchedule.id === id) {
            return { ...classSchedule, [field]: value };
          }

          return classSchedule;
        });

      return updatedClassSchedules;
    });
  }

  return (
    <fieldset>
      <legend>
        Horários disponíveis
        <button
          type="button"
          onClick={addNewClassSchedule}
        >
          + Novo horário
        </button>
      </legend>

      { classSchedules.map((classSchedule) => (
        <div
          key={classSchedule.id}
          className="schedule-item"
        >
          <div
            className="fields-section schedule-section"
          >
            <Select
              name="week_day"
              label="Dia da semana"
              value={
                    classSchedule.week_day !== -1
                      ? classSchedule.week_day
                      : ''
                  }
              placeholder="Selecione o dia"
              onChange={(e) => setClassScheduleValue(
                classSchedule.id,
                'week_day',
                e.target.value
              )}
              options={weekDays}
            />
            <div className="interval-section">
              <OuterLabelInput
                name="from"
                label="Das"
                type="time"
                value={classSchedule.from}
                onChange={(e) => setClassScheduleValue(
                  classSchedule.id,
                  'from',
                  e.target.value
                )}
              />
              <OuterLabelInput
                name="to"
                label="Até"
                type="time"
                value={classSchedule.to}
                onChange={(e) => setClassScheduleValue(
                  classSchedule.id,
                  'to',
                  e.target.value
                )}
              />
            </div>
          </div>
          <button
            type="button"
            className="delete-class-schedule-button"
            onClick={() => removeClassSchedule(classSchedule.id)}
          >
            Excluir horário
          </button>
        </div>
      ))}
    </fieldset>
  );
}
