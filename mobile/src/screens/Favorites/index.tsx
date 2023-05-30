import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import {
  View, ScrollView, StatusBar,
} from 'react-native';

import { Teacher } from '@dtos/Teacher';
import { loadFavoriteTeachers } from '@utils/loaders';

import { ScreenHeader } from '@components/ScreenHeader';
import { ScreenSubtitle } from '@components/ScreenSubtitle';
import { TeacherItem } from '@components/TeacherItem';

import { styles } from './styles';

export function Favorites() {
  const [favoriteTeachers, setFavoriteTeachers] = useState<Teacher[]>([]);

  async function loadFavorites() {
    const favoriteTeachersStorage = await loadFavoriteTeachers();

    setFavoriteTeachers(favoriteTeachersStorage);
  }

  const loadFavoritesCallback = useCallback(() => {
    loadFavorites();
  }, []);
  useFocusEffect(loadFavoritesCallback);

  useFocusEffect(() => {
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
        {favoriteTeachers.map((teacher) => (
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
