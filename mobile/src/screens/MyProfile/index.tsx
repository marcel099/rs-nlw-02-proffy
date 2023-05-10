import { useEffect, useState } from 'react';
import {
  ImageBackground, StatusBar, Text, View,
} from 'react-native';

import myProfileBackground from '@assets/images/my-profile-background.png';

import { useAuth } from '@contexts/AuthContext';
// import { ApiClassSchedule, ClassSchedule } from '@dtos/ClassSchedule';
import { Subject } from '@dtos/Subject';
import api from '@services/api';

import { ScreenHeader } from '@components/ScreenHeader';
import { UserAvatar } from '@components/UserAvatar';

import { styles } from './styles';

export function MyProfile() {
  const { user } = useAuth();

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [subjectId, setSubjectId] = useState(-1);
  // const [cost, setCost] = useState('');

  // const [classSchedules, setClassSchedules] =
  //   useState<ClassSchedule[]>([]);

  useEffect(() => {
    api.get('/classes/me').then((response) => {
      // const fetchedClassSchedules: ApiClassSchedule[] =
      //   response.data.class_schedules;

      // const parsedClassSchedules = fetchedClassSchedules
      //   .map(parseFetchedToParsedClassSchedule);

      // const newClassSchedules = parsedClassSchedules.length > 0
      //   ? parsedClassSchedules
      //   : [initialClassSchedule];

      // setClassSchedules(newClassSchedules);
      setSubjectId(response.data.class.subject.id);
      // setCost(response.data.class.cost);
    });
  }, []);

  useEffect(() => {
    api.get('/subjects').then((response) => {
      setSubjects(response.data);
    });
  });

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#774DD6"
        translucent
      />
      <ScreenHeader title="Meu perfil" />
      <View style={styles.subheader}>
        <ImageBackground
          source={myProfileBackground}
          resizeMode="contain"
          style={styles.background}
        >
          <UserAvatar
            avatar={user?.avatar ?? null}
            size="lg"
            containButton
          />
          <Text style={styles.userName}>
            {`${user?.firstName} ${user?.lastName}`}
          </Text>
          <Text style={styles.userSubjectName}>
            {subjects.find((subject) => subjectId === subject.id)?.name ?? 'Matéria não definida'}
          </Text>
        </ImageBackground>
      </View>
    </View>
  );
}
