import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View, Text, TextInput, ScrollView, StatusBar,
} from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';

import api from '@services/api';

import { ScreenHeader } from '@components/ScreenHeader';
import { ScreenSubtitle } from '@components/ScreenSubtitle';
import TeacherItem, { TeacherItemProps } from '@components/TeacherItem';

import { styles } from './styles';

export function TeacherList() {
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  const [teachers, setTeachers] = useState([]);
  const [favoritesIds, setFavoritesids] = useState<number[]>([]);

  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  function loadFavorites() {
    AsyncStorage.getItem('favorites').then((response) => {
      if (response) {
        const favoritedTeachers = JSON.parse(response);
        const favoritedTeachersIds = favoritedTeachers.map(
          (teacher: TeacherItemProps) => teacher.id
        );

        setFavoritesids(favoritedTeachersIds);
      }
    });
  }

  useFocusEffect(() => { // Reexecuta a cada vez que entrar em foco
    loadFavorites();
  });

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
        {teachers.map((teacher: TeacherItemProps) => (
          <TeacherItem
            key={teacher.id}
            {...teacher}
            favorited={favoritesIds.includes(teacher.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}
