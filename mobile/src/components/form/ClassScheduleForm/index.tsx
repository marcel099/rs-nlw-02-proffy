import { Dispatch, SetStateAction } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import { ClassSchedule } from '@dtos/ClassSchedule';
import { createBlankClassSchedule } from '@utils/factories';
import { weekDays } from '@utils/staticData';

import { FormFieldset } from '@components/form/FormFieldset';
import { Select } from '@components/form/Select';
import { TimeInput } from '@components/form/TimeInput';

import { styles } from './styles';

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
    <FormFieldset
      legend="Horários disponíveis"
      headerAsideContent={(
        <RectButton onPress={addNewClassSchedule}>
          <Text style={styles.addNewClassScheduleText}>+ Novo</Text>
        </RectButton>
      )}
    >
      { classSchedules.map((classSchedule) => (
        <View
          key={classSchedule.id}
          style={styles.container}
        >
          <View>
            <Select
              label="Dia da semana"
              selectedValue={
                classSchedule.week_day !== -1
                  ? String(classSchedule.week_day)
                  : ''
              }
              options={weekDays}
              optionValue="value"
              optionLabel="label"
              onValueChange={
                (value: string) => setClassScheduleValue(classSchedule.id, 'week_day', value)
              }
              placeholder="Selecione o dia"
            />
            <View style={styles.intervalSection}>
              <TimeInput
                label="Das"
                value={classSchedule.from}
                onChangeValue={
                  (value) => setClassScheduleValue(classSchedule.id, 'from', value)
                }
              />
              <View style={{ width: 16 }} />
              <TimeInput
                label="Até"
                value={classSchedule.to}
                onChangeValue={
                  (value) => setClassScheduleValue(classSchedule.id, 'to', value)
                }
              />
            </View>
          </View>
          <View style={styles.deleteClassScheduleButtonContainer}>
            <View style={styles.deleteClassScheduleButtonLine} />
            <TouchableOpacity
              style={styles.deleteClassScheduleButton}
              onPress={() => removeClassSchedule(classSchedule.id)}
            >
              <Text style={styles.deleteClassScheduleButtonText}>
                Excluir horário
              </Text>
            </TouchableOpacity>
            <View style={styles.deleteClassScheduleButtonLine} />
          </View>
        </View>
      ))}
    </FormFieldset>
  );
}
