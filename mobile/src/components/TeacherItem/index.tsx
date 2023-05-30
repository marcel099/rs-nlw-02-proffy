import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import {
  View, Image, Text, Linking,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import heartOutlineIcon from '@assets/images/icons/heart-outline.png';
import unfavoriteIcon from '@assets/images/icons/unfavorite.png';
import whatsappIcon from '@assets/images/icons/whatsapp.png';

import { FAVORITE_TEACHERS } from '@configs/storage';
import { Teacher } from '@dtos/Teacher';
import api from '@services/api';
import { loadFavoriteTeachers } from '@utils/loaders';

import styles from './styles';

interface TeacherItemProps extends Teacher {
  favorited: boolean;
}

export function TeacherItem({
  user_id,
  first_name,
  last_name,
  avatar_url,
  bio,
  whatsapp,
  subject,
  lesson,
  class_schedules,
  favorited,
}: TeacherItemProps) {
  const [isFavoriteTeacher, setIsFavoriteTeacher] = useState(favorited);

  function handleLinkToWhatsapp() {
    api.post('connections', {
      user_id,
    });

    Linking.openURL(`whatsapp://send?phone=${whatsapp}`);
  }

  async function handleToggleFavorite() {
    const favoriteTeachers = await loadFavoriteTeachers();

    if (isFavoriteTeacher) {
      setIsFavoriteTeacher(false);

      const favoritedIndex = favoriteTeachers
        .map((teacher) => teacher.user_id)
        .find((teacherId: number) => teacherId === user_id);

      if (favoritedIndex !== undefined) {
        favoriteTeachers.splice(favoritedIndex, 1);
      }
    } else {
      setIsFavoriteTeacher(true);

      const newTeacher: Teacher = {
        user_id,
        avatar_url,
        first_name,
        last_name,
        subject,
        lesson,
        bio,
        whatsapp,
        class_schedules,
      };

      favoriteTeachers.push(newTeacher);
    }

    await AsyncStorage.setItem(
      FAVORITE_TEACHERS,
      JSON.stringify(favoriteTeachers)
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image
          style={styles.avatar}
          source={{ uri: avatar_url }}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{`${first_name} ${last_name}`}</Text>
          <Text style={styles.subject}>{subject.name}</Text>
        </View>
      </View>

      <Text style={styles.bio}>
        {bio}
      </Text>

      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/hora {'   '}
          <Text style={styles.priceValue}>R$ {lesson.cost}</Text>
        </Text>

        <View style={styles.buttonsContainer}>
          <RectButton
            onPress={handleToggleFavorite}
            style={[
              styles.favoriteButton,
              isFavoriteTeacher ? styles.favorited : {},
            ]}
          >
            { isFavoriteTeacher
              ? <Image source={unfavoriteIcon} />
              : <Image source={heartOutlineIcon} /> }
          </RectButton>

          <RectButton
            onPress={handleLinkToWhatsapp}
            style={styles.contactButton}
          >
            <Image source={whatsappIcon} />
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
}
