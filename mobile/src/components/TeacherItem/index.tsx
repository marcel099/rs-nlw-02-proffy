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

export function TeacherItem({
  id, user_id, avatar, name, subject, bio, cost, whatsapp, favorited,
}: Teacher) {
  const [isFavorite, setIsFavorite] = useState(favorited);

  function handleLinkToWhatsapp() {
    api.post('connections', {
      user_id,
    });

    Linking.openURL(`whatsapp://send?phone=${whatsapp}`);
  }

  async function handleToggleFavorite() {
    const favoriteTeachers = await loadFavoriteTeachers();

    if (isFavorite) {
      setIsFavorite(false);

      const favoritedIndex = favoriteTeachers
        .map((teacher) => teacher.id)
        .find((teacherId: number) => teacherId === user_id);

      if (favoritedIndex !== undefined) {
        favoriteTeachers.splice(favoritedIndex, 1);
      }
    } else {
      setIsFavorite(true);

      favoriteTeachers.push({
        id,
        user_id,
        avatar,
        name,
        subject,
        bio,
        cost,
        whatsapp,
        favorited,
      });
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
          source={{ uri: avatar }}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.subject}>{subject}</Text>
        </View>
      </View>

      <Text style={styles.bio}>
        {bio}
      </Text>

      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/hora {'   '}
          <Text style={styles.priceValue}>R$ {cost}</Text>
        </Text>

        <View style={styles.buttonsContainer}>
          <RectButton
            onPress={handleToggleFavorite}
            style={[
              styles.favoriteButton,
              isFavorite ? styles.favorited : {},
            ]}
          >
            { isFavorite
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
