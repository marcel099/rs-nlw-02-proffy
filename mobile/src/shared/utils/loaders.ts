import AsyncStorage from '@react-native-async-storage/async-storage';

import { FAVORITE_TEACHERS } from '@configs/storage';
import { Teacher } from '@dtos/Teacher';

export async function loadFavoriteTeachers() {
  const response = await AsyncStorage.getItem(FAVORITE_TEACHERS);

  if (response !== null) {
    const favoriteTeachersStorage: Teacher[] = JSON.parse(response);

    return favoriteTeachersStorage;
  }

  return [];
}
