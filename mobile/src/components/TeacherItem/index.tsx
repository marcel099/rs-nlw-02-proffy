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
import { formatNumberToCurrency } from '@utils/formatters';
import { loadFavoriteTeachers } from '@utils/loaders';
import { parseWeekDayValueToName } from '@utils/mappers';

import { styles } from './styles';

interface TeacherItemProps extends Teacher {
  favorited: boolean;
  onRemoveFavorite?: (user_id: number) => void;
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
  onRemoveFavorite,
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
        .findIndex((teacher) => teacher.user_id === user_id);

      if (favoritedIndex !== undefined) {
        favoriteTeachers.splice(favoritedIndex, 1);
      }

      if (onRemoveFavorite !== undefined) {
        onRemoveFavorite(user_id);
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

      <View style={styles.classSchedulesContainer}>
        <View style={styles.classScheduleHeader}>
          <Text style={styles.classScheduleInfoHeader}>Dia</Text>
          <Text style={styles.classScheduleInfoHeader}>Horário</Text>
        </View>
        {[1, 2, 3, 4, 5].map((value) => {
          const filteredClassSchedules = class_schedules.filter(
            (item) => item.week_day === value
          );

          const noClassOnWeekDay = filteredClassSchedules.length === 0;

          return (
            <View
              key={value}
              style={[
                styles.classSchedule,
                noClassOnWeekDay && styles.nonexistentClassSchedule,
              ]}
            >
              <Text style={styles.classScheduleInfo}>
                {parseWeekDayValueToName(value)}
              </Text>
              {noClassOnWeekDay ? (
                <Text style={styles.classScheduleInfo}>-</Text>
              ) : (
                <View>
                  {filteredClassSchedules.map((classSchedule) => (
                    <Text
                      key={classSchedule.id}
                      style={styles.classScheduleInfo}
                    >
                      {classSchedule?.from ?? ''} - {classSchedule?.to ?? ''}
                    </Text>
                  ))}
                </View>
              )}
            </View>
          );
        })}
      </View>

      <View style={styles.footer}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceMessage}>
            Preço da minha hora:
          </Text>
          <Text style={styles.priceValue}>
            {formatNumberToCurrency(lesson.cost)}
          </Text>
        </View>

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
