import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import {
  Alert, View, ScrollView, StatusBar, Image,
} from 'react-native';

import nerdFaceEmojiIcon from '@assets/images/icons/nerd-face.png';

import { Teacher } from '@dtos/Teacher';
import api from '@services/api';
import { loadFavoriteTeachers } from '@utils/loaders';

import { EncouragementMessage } from '@components/EncouragementMessage';
import { ScreenHeader } from '@components/ScreenHeader';
import { ScreenSubtitle } from '@components/ScreenSubtitle';
import { TeacherItem } from '@components/TeacherItem';
import { TeacherListFilters } from '@components/TeacherListFilters';

import { styles } from './styles';

export interface TeacherListFiltersData {
  subjectId: number | null;
  weekDay: number | null;
  time: string | null;
}

interface ResponseTeacherList {
  data: Teacher[];
  offset: number;
  total: number;
}

export function TeacherList() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [teachersTotal, setTeachersTotal] = useState(0);
  const [teachersOffset, setTeachersOffset] = useState(0);
  const [favoritesTeachersIds, setFavoriteTeachersIds] = useState<number[]>([]);

  async function loadFavorites() {
    const favoriteTeachersStorage = await loadFavoriteTeachers();

    const favoriteTeachersIds = favoriteTeachersStorage.map(
      (teacher) => teacher.user_id
    );

    setFavoriteTeachersIds(favoriteTeachersIds);
  }

  const loadFavoritesCallback = useCallback(() => {
    loadFavorites();
  }, []);
  useFocusEffect(loadFavoritesCallback);

  async function fetchClasses({
    subjectId, weekDay, time,
  }: TeacherListFiltersData) {
    try {
      const params = {
        subject_id: subjectId,
        week_day: weekDay,
        time,
        page: 1,
      };

      const response = await api.get('/classes', {
        params,
      });

      const {
        data,
        offset,
        total,
      } = response.data as ResponseTeacherList;

      setTeachersTotal(offset);
      setTeachersOffset(total);

      setTeachers(data);
    } catch {
      Alert.alert('Erro ao buscar dados da lista de aulas');
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#774DD6"
        translucent
      />
      <ScreenHeader title="Estudar" />
      <View style={styles.subheader}>
        <View style={styles.screenDescriptionContainer}>
          <ScreenSubtitle subtitle={'Proffys\ndisponíveis'} />
          <EncouragementMessage
            Icon={<Image source={nerdFaceEmojiIcon} />}
            message={
              `${teachers.length} proffy${teachers.length > 1 ? 's' : ''}`
            }
          />
        </View>
        <TeacherListFilters
          onfiltersUpdate={fetchClasses}
        />
      </View>

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{ // é melhor pra aplicar estilos
          paddingHorizontal: 16,
          paddingBottom: 24,
        }}
      >
        {teachers.map((teacher) => (
          <TeacherItem
            key={teacher.user_id}
            {...teacher}
            favorited={favoritesTeachersIds.includes(teacher.user_id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}
