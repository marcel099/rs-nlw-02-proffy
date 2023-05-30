import { Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import {
  View, Text, TextInput, ScrollView, StatusBar,
} from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';

import { Teacher } from '@dtos/Teacher';
import api from '@services/api';
import { loadFavoriteTeachers } from '@utils/loaders';

import { ScreenHeader } from '@components/ScreenHeader';
import { ScreenSubtitle } from '@components/ScreenSubtitle';
import { TeacherItem } from '@components/TeacherItem';

import { styles } from './styles';

export function TeacherList() {
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [favoritesTeachersIds, setFavoriteTeachersIds] = useState<number[]>([]);

  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  async function loadFavorites() {
    const favoriteTeachersStorage = await loadFavoriteTeachers();

    const favoriteTeachersIds = favoriteTeachersStorage.map(
      (teacher) => teacher.id
    );

    setFavoriteTeachersIds(favoriteTeachersIds);
  }

  const loadFavoritesCallback = useCallback(() => {
    loadFavorites();
  }, []);
  useFocusEffect(loadFavoritesCallback);

  function handleToggleFiltersVisible() {
    setIsFiltersVisible(!isFiltersVisible);
  }

  async function handleFiltersSubmit() {
    const response = await api.get('/classes', {
      params: {
        subject,
        week_day,
        time,
      },
    });

    setIsFiltersVisible(false);
    setTeachers(response.data);
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
        <ScreenSubtitle subtitle={'Proffys\ndisponíveis'} />
        <BorderlessButton onPress={handleToggleFiltersVisible}>
          <Feather name="filter" size={20} color="#fff" />
        </BorderlessButton>
        { isFiltersVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput
              style={styles.input}
              value={subject}
              onChangeText={(text) => setSubject(text)}
              placeholder="Qual a matéria?"
              placeholderTextColor="#c1b2cc"

            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <TextInput
                  style={styles.input}
                  value={week_day}
                  onChangeText={(text) => setWeekDay(text)}
                  placeholder="Qual o dia?"
                  placeholderTextColor="#c1b2cc"
                />
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  style={styles.input}
                  value={time}
                  onChangeText={(text) => setTime(text)}
                  placeholder="Qual horário?"
                  placeholderTextColor="#c1b2cc"
                />
              </View>
            </View>

            <RectButton
              onPress={handleFiltersSubmit}
              style={styles.submitButton}
            >
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
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
            key={teacher.id}
            {...teacher}
            favorited={favoritesTeachersIds.includes(teacher.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}
