import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View, ScrollView, StatusBar, Text,
} from 'react-native';

import { ScreenHeader } from '@components/ScreenHeader';
import { ScreenSubtitle } from '@components/ScreenSubtitle';
import TeacherItem, { TeacherItemProps } from '@components/TeacherItem';

import { styles } from './styles';

export function Favorites() {
  const [favorites, setFavorites] = useState([]);

  function loadFavorites() {
    AsyncStorage.getItem('favorites').then((response) => {
      if (response) {
        const favoritedTeachers = JSON.parse(response);

        setFavorites(favoritedTeachers);
      }
    });
  }

  useFocusEffect(() => { // Reexecuta a cada vez que entrar em foco
    loadFavorites();
  });

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#774DD6"
        translucent
      />
      <ScreenHeader title="Estudar" />
      <View style={styles.subheader}>
        <ScreenSubtitle subtitle={'Meus proffys\nfavoritos'} />
      </View>

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 24,
        }}
      >
        {favorites.map((teacher: TeacherItemProps) => (
          <TeacherItem
            key={teacher.id}
            {...teacher}
            favorited
          />
        ))}
      </ScrollView>
    </View>
  );
}
