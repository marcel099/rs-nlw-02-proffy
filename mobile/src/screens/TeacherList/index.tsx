import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator, Alert, View, ScrollView, StatusBar, Image, Text,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import nerdFaceEmojiIcon from '@assets/images/icons/nerd-face.png';

import { ApiTeacher, Teacher } from '@dtos/Teacher';
import api from '@services/api';
import { loadFavoriteTeachers } from '@utils/loaders';
import { parseFetchedToParsedClassSchedule } from '@utils/mappers';

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
  page: number;
}

interface ResponseTeacherList {
  data: ApiTeacher[];
  offset: number;
  total: number;
}

export function TeacherList() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [favoritesTeachersIds, setFavoriteTeachersIds] = useState<number[]>([]);
  const [isFetchingTeachers, setIsFetchingTeachers] = useState(true);

  const [teachersTotal, setTeachersTotal] = useState(0);
  const [teachersOffset, setTeachersOffset] = useState(0);
  const [teachersPage, setTeachersPage] = useState<number>(1);
  const teachersPerPage = 5;

  const isTeacherListEmpty = teachers.length === 0;
  const hasFetchedAllTeachers =
    (teachersOffset + teachersPerPage) >= teachersTotal;

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
    subjectId, weekDay, time, page,
  }: TeacherListFiltersData) {
    try {
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
      Alert.alert('Erro ao buscar dados da lista de aulas');
    } finally {
      setIsFetchingTeachers(false);
    }
  }

  function handleFetchNextPage() {
    setTeachersPage((previousPageNumber) => previousPageNumber + 1);
  }

  // console.log({
  //   showButton: teachersOffset + teachersPerPage < teachersTotal,
  //   teachersOffset,
  //   teachersTotal,
  // });

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
              `${teachersTotal} proffy${teachers.length > 1 ? 's' : ''}`
            }
          />
        </View>
        <TeacherListFilters
          onfiltersUpdate={fetchClasses}
          page={teachersPage}
          setPage={setTeachersPage}
        />
      </View>

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 24,
        }}
      >
        {isFetchingTeachers && teachersPage === 1 ? (
          <ActivityIndicator
            color="#9C98A6"
            size="large"
          />
        ) : isTeacherListEmpty ? (
          <Text style={styles.noTeachersFoundMessage}>
            Nenhum proffy encontrado{'\n'}com sua pesquisa.
          </Text>
        ) : (
          <>
            {teachers.map((teacher) => (
              <TeacherItem
                key={teacher.user_id}
                {...teacher}
                favorited={favoritesTeachersIds.includes(teacher.user_id)}
              />
            ))}
            {hasFetchedAllTeachers ? (
              <Text style={styles.endTeacherListMessage}>
                Estes são todos os resultados
              </Text>
            ) : (
              isFetchingTeachers === false ? (
                <RectButton
                  onPress={handleFetchNextPage}
                  style={styles.fetchNextPageButton}
                >
                  <Text style={styles.fetchNextPageButtonText}>
                    Carregar mais
                  </Text>
                </RectButton>
              ) : (
                <ActivityIndicator
                  color="#9C98A6"
                  size="small"
                />
              )
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
}
