import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import {
  Image, View, ScrollView, StatusBar, Text,
} from 'react-native';

import heartEyesEmojiIcon from '@assets/images/icons/heart-eyes.png';

import { Teacher } from '@dtos/Teacher';
import { loadFavoriteTeachers } from '@utils/loaders';

import { EncouragementMessage } from '@components/EncouragementMessage';
import { ScreenHeader } from '@components/ScreenHeader';
import { TeacherItem } from '@components/TeacherItem';
import { DarkScreenSubtitle } from '@components/texts/DarkScreenSubtitle';

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

  function handleRemoveFavorite(user_id: number) {
    setFavoriteTeachers((previousFavorites) => {
      const updatedFavorites = [...previousFavorites];
      const favoritedIndex = updatedFavorites
        .findIndex((teacher) => teacher.user_id === user_id);
      if (favoritedIndex !== undefined) {
        updatedFavorites.splice(favoritedIndex, 1);
      }

      return updatedFavorites;
    });
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
        <DarkScreenSubtitle subtitle={'Meus proffys\nfavoritos'} />
        <EncouragementMessage
          Icon={<Image source={heartEyesEmojiIcon} />}
          message={
            `${favoriteTeachers.length} proffy${favoriteTeachers.length > 1 ? 's' : ''}`
          }
        />
      </View>
      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 24,
        }}
      >
        {favoriteTeachers.length === 0 ? (
          <Text style={styles.noFavoriteTeachersFoundMessage}>
            Nenhum proffy favorito encontrado.
          </Text>
        ) : (
          favoriteTeachers.map((teacher) => (
            <TeacherItem
              key={teacher.user_id}
              {...teacher}
              favorited
              onRemoveFavorite={handleRemoveFavorite}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}
