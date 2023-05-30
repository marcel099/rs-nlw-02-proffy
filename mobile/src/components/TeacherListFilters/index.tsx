import { Feather } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
  Alert, Text, TouchableOpacity, View,
} from 'react-native';

import { Subject } from '@dtos/Subject';
import { fetchSubjects } from '@utils/fetchers';

import { Select } from '@components/form/Select';
import { TimeInput } from '@components/form/TimeInput';
import { TeacherListFiltersData } from '@screens/TeacherList';

import { styles } from './styles';

interface TeacherListFiltersProps {
  onfiltersUpdate: (data: TeacherListFiltersData) => void;
}

export function TeacherListFilters({
  onfiltersUpdate,
}: TeacherListFiltersProps) {
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  const [subjectId, setSubjectId] = useState<number | null>(null);
  const [weekDay, setWeekDay] = useState<number | null>(null);
  const [time, setTime] = useState<string | null>(null);

  const [isFetchingSubjects, setIsFetchingSubjects] = useState(true);
  const [subjects, setSubjects] = useState<Subject[]>([]);

  function handleToggleFiltersVisible() {
    setIsFiltersVisible(!isFiltersVisible);
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

        Alert.alert('Erro ao buscar dados das matérias');
      });
  }, []);

  useEffect(() => {
    const data = {
      subjectId,
      weekDay,
      time,
    };

    onfiltersUpdate(data);
  }, [subjectId, weekDay, time]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.filterButtonContainer}
        onPress={handleToggleFiltersVisible}
      >
        <Feather name="filter" size={24} color="#04D361" />
        <Text style={styles.filterMessage}>
          Filtrar por dia, hora e matéria
        </Text>
        <View style={styles.filterToggleStateIconContainer}>
          <Feather
            name={isFiltersVisible ? 'chevron-up' : 'chevron-down'}
            size={24}
            color="#A380F6"
          />
        </View>
      </TouchableOpacity>
      { isFiltersVisible && (
        <View style={styles.filtersContainer}>
          {!isFetchingSubjects && (
            <Select
              label="Matéria"
              options={subjects}
              optionValue="id"
              optionLabel="name"
              selectedValue={subjectId !== null ? String(subjectId) : ''}
              onValueChange={
                (value: string) => {
                  setSubjectId(value === '' ? null : Number(value));
                }
              }
              placeholder="Selecione qual ensinar"
            />
          )}
          <View style={styles.dateContainer}>
            <View style={styles.weekDayFieldBlock}>
              <Select
                label="Dia da semana"
                options={[
                  { value: '0', label: 'Domingo' },
                  { value: '1', label: 'Segunda-feira' },
                  { value: '2', label: 'Terça-feira' },
                  { value: '3', label: 'Quarta-feira' },
                  { value: '4', label: 'Quinta-feira' },
                  { value: '5', label: 'Sexta-feira' },
                  { value: '6', label: 'Sábado' },
                ]}
                optionValue="value"
                optionLabel="label"
                selectedValue={weekDay !== null ? String(weekDay) : ''}
                onValueChange={
                  (value: string) => {
                    setWeekDay(value === '' ? null : Number(value));
                  }
                }
                placeholder="Selecione"
              />
            </View>
            <View style={styles.timeFieldBlock}>
              <TimeInput
                label="Horário"
                value={time !== null ? String(time) : '00:00'}
                onChangeValue={
                  (value) => {
                    setTime(value === '00:00' ? null : value);
                  }
                }
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
