import { useEffect, useState } from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';

import myProfileBackground from '@assets/images/my-profile-background.png';

import { useAuth } from '@contexts/AuthContext';
// import { ApiClassSchedule, ClassSchedule } from '@dtos/ClassSchedule';
import { Subject } from '@dtos/Subject';
import api from '@services/api';

import { FormContainer } from '@components/form/FormContainer';
import { OuterLabelInput } from '@components/form/OuterLabelInput';
import { Select } from '@components/form/Select';
import { FormFieldset } from '@components/FormFieldset';
import { ScreenHeader } from '@components/ScreenHeader';
import { UserAvatar } from '@components/UserAvatar';

import { styles } from './styles';

export function MyProfile() {
  const { user } = useAuth();
  const [firstName, setFirstName] = useState(user?.firstName ?? '');
  const [lastName, setLastName] = useState(user?.lastName ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [subjectId, setSubjectId] = useState(-1);
  const [cost, setCost] = useState('');

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
      setCost(response.data.class.cost);
    });
  }, []);

  useEffect(() => {
    api.get('/subjects').then((response) => {
      setSubjects(response.data);
    });
  }, []);

  function handleEditProfile() {
    console.log('handleEditProfile');
  }

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#774DD6"
        translucent
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
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
            <FormContainer
              handleFormSubmit={handleEditProfile}
              submitButtonTitle="Salvar alterações"
            >
              <FormFieldset
                legend="Seus dados"
              >
                <OuterLabelInput
                  label="Nome"
                  value={firstName}
                  onChangeText={setFirstName}
                  placeholder="Nome"
                  autoCapitalize="words"
                />
                <OuterLabelInput
                  label="Sobrenome"
                  value={lastName}
                  onChangeText={setLastName}
                  placeholder="Sobrenome"
                  autoCapitalize="words"
                />
                <OuterLabelInput
                  label="E-mail"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
                <OuterLabelInput
                  label="Whatsapp"
                  value={whatsapp}
                  onChangeText={setWhatsapp}
                  placeholder="(  ) _ ____-____"
                  keyboardType="numeric"
                />
              </FormFieldset>
              <FormFieldset
                legend="Sobre a aula"
              >
                <Select
                  label="Matéria"
                  options={subjects}
                  optionValue="id"
                  optionLabel="name"
                  onValueChange={(value: number) => setSubjectId(value)}
                  placeholder="Selecione qual ensinar"
                />
                <OuterLabelInput
                  label="Custo da sua hora por aula"
                  value={cost}
                  onChangeText={setCost}
                  placeholder="R$"
                  keyboardType="numeric"
                />
              </FormFieldset>
            </FormContainer>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}
