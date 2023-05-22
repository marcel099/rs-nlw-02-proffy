import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  Alert,
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
import { ApiClassSchedule, ClassSchedule, NotSavedClassSchedule } from '@dtos/ClassSchedule';
import { ApiSubject, Subject } from '@dtos/Subject';
import { AppStackScreenProp } from '@routes/app.stack.routes';
import api from '@services/api';
import { createBlankClassSchedule } from '@utils/factories';
import { parseFetchedToParsedClassSchedule } from '@utils/mappers';

import { ClassScheduleForm } from '@components/ClassScheduleForm';
import { FormContainer } from '@components/form/FormContainer';
import { OuterLabelInput } from '@components/form/OuterLabelInput';
import { Select } from '@components/form/Select';
import { TextArea } from '@components/form/TextArea';
import { FormFieldset } from '@components/FormFieldset';
import { ScreenHeader } from '@components/ScreenHeader';
import { UserAvatar } from '@components/UserAvatar';

import { styles } from './styles';

export function MyProfile() {
  const { fetchUser, user } = useAuth();
  const navigation =
    useNavigation<AppStackScreenProp<'MyProfile'>['navigation']>();

  const [avatarUrl, setAvatarUrl] =
    useState<string | null>(user?.avatar ?? null);

  const [firstName, setFirstName] = useState(user?.firstName ?? '');
  const [lastName, setLastName] = useState(user?.lastName ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [whatsapp, setWhatsapp] = useState(user?.whatsapp ?? '');
  const [bio, setBio] = useState(user?.bio ?? '');

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [subjectId, setSubjectId] = useState<string | null>(null);
  const [cost, setCost] = useState(0);

  const [classSchedules, setClassSchedules] =
    useState<ClassSchedule[]>([]);

  const [isFetchingSubjects, setIsFetchingSubjects] = useState(true);
  const [isFetchingUserClasses, setIsFetchingUserClasses] = useState(true);

  useEffect(() => {
    api.get('/classes/me').then((response) => {
      const fetchedClassSchedules: ApiClassSchedule[] =
        response.data.class_schedules;

      const parsedClassSchedules = fetchedClassSchedules
        .map(parseFetchedToParsedClassSchedule);

      const newClassSchedules = parsedClassSchedules.length > 0
        ? parsedClassSchedules
        : [createBlankClassSchedule()];

      setClassSchedules(newClassSchedules);
      setSubjectId(String(response.data.class.subject.id));
      setCost(response.data.class.cost);
      setIsFetchingUserClasses(false);
    });
  }, []);

  useEffect(() => {
    api.get('/subjects').then((response) => {
      const fetchedSubjects: ApiSubject[] = response.data;
      const parsedSubjects: Subject[] = fetchedSubjects.map((subject) => ({
        id: String(subject.id),
        name: subject.name,
      }));

      setSubjects(parsedSubjects);
      setIsFetchingSubjects(false);
    });
  }, []);

  async function handleEditUser() {
    try {
      const parsedClassSchedules = classSchedules.map((classSchedule) => {
        const parsedClassSchedule: NotSavedClassSchedule =
          { ...classSchedule };

        if (parsedClassSchedule.id !== null && parsedClassSchedule.id < 0) {
          parsedClassSchedule.id = null;
        }

        return parsedClassSchedule;
      });

      const data = {
        first_name: firstName,
        last_name: lastName,
        email,
        whatsapp,
        bio,

        class: {
          cost,
          subject_id: subjectId,
        },

        class_schedules: parsedClassSchedules,
      };

      await api.put('/users/profile', data);

      if (avatarUrl !== user?.avatar && avatarUrl !== null) {
        const formData = new FormData();
        formData.append('avatar', {
          uri: avatarUrl,
          name: 'image.jpg',
          type: 'image/jpeg',
        } as any);

        await api.patch('/users/avatar', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      await fetchUser();

      navigation.navigate('Confirmation', {
        title: 'Cadastro\nsalvo!',
        description: 'Tudo certo, seu cadastro está\nna nossa lista de professores. Agora é\nsó ficar de olho no seu WhatsApp.',
        buttonTitle: 'Acessar lista',
        nextScreenName: 'Study',
      });
    } catch (error) {
      Alert.alert('Erro ao salvar perfil');
    }
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
                  avatar={avatarUrl ?? null}
                  size="lg"
                  containButton
                  onUserAvatarButtonPress={
                    (fileUri) => setAvatarUrl(fileUri)
                  }
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
              handleFormSubmit={handleEditUser}
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
                <TextArea
                  label="Bio"
                  value={bio}
                  onChangeText={setBio}
                  autoCapitalize="sentences"
                  description="(Máximo 300 caracteres)"
                />
              </FormFieldset>
              <FormFieldset
                legend="Sobre a aula"
              >
                {!isFetchingSubjects && !isFetchingUserClasses && (
                  <Select
                    label="Matéria"
                    options={subjects}
                    optionValue="id"
                    optionLabel="name"
                    selectedValue={subjectId}
                    onValueChange={(value: string) => setSubjectId(value)}
                    placeholder="Selecione qual ensinar"
                  />
                )}
                <OuterLabelInput
                  label="Custo da sua hora por aula"
                  value={String(cost)}
                  onChangeText={(value) => setCost(Number(value))}
                  placeholder="R$"
                  keyboardType="numeric"
                />
              </FormFieldset>
              <ClassScheduleForm
                classSchedules={classSchedules}
                setClassSchedules={setClassSchedules}
              />
            </FormContainer>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}
