import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';

import { useAuth } from '@contexts/AuthContext';
import { ClassSchedule, NotSavedClassSchedule } from '@dtos/ClassSchedule';
import { Subject } from '@dtos/Subject';
import { AppStackScreenProp } from '@routes/app.stack.routes';
import api from '@services/api';
import { fetchSubjects, fetchUserClasses } from '@utils/fetchers';

import { ClassScheduleForm } from '@components/form/ClassScheduleForm';
import { FormContainer } from '@components/form/FormContainer';
import { FormFieldset } from '@components/form/FormFieldset';
import { OuterLabelInput } from '@components/form/OuterLabelInput';
import { SubjectForm } from '@components/form/SubjectForm';
import { TextArea } from '@components/form/TextArea';
import { ScreenHeader } from '@components/ScreenHeader';
import { ScreenSubtitle } from '@components/ScreenSubtitle';
import { UserAvatar } from '@components/UserAvatar';

import { styles } from './styles';

export function GiveClasses() {
  const { fetchUser, user } = useAuth();
  const navigation =
    useNavigation<AppStackScreenProp<'GiveClasses'>['navigation']>();

  const firstName = user?.firstName ?? '';
  const lastName = user?.lastName ?? '';
  const avatar = user?.avatar ?? null;
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
    fetchUserClasses()
      .then((data) => {
        setClassSchedules(data.classSchedules);
        setSubjectId(data.subjectId);
        setCost(data.cost);
        setIsFetchingUserClasses(false);
      })
      .catch(() => {
        Alert.alert('Erro ao buscar dados das aulas do usuário');
      });
  }, []);

  useEffect(() => {
    fetchSubjects()
      .then((data) => {
        setSubjects(data.subjects);
        setIsFetchingSubjects(false);
      })
      .catch(() => {
        Alert.alert('Erro ao buscar dados das matérias');
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
        whatsapp,
        bio,

        class: {
          cost,
          subject_id: subjectId,
        },

        class_schedules: parsedClassSchedules,
      };

      await api.put('/users/profile', data);

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
            <ScreenHeader title="Dar aulas" />
            <View style={styles.subheader}>
              <ScreenSubtitle
                subtitle={'Que incrível que você\nquer dar aulas.'}
              />
              <Text style={styles.screenDescription}>
                O primeiro passo é preencher este{'\n'}formulário de inscrição
              </Text>
            </View>
            <FormContainer
              handleFormSubmit={handleEditUser}
              submitButtonTitle="Salvar alterações"
            >
              <FormFieldset legend="Seus dados">
                <View style={styles.personalDataSection}>
                  <UserAvatar
                    avatar={avatar}
                    size="md"
                  />
                  <Text style={styles.userName}>
                    {`${firstName} ${lastName}`}
                  </Text>
                </View>
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
              <SubjectForm
                subjects={subjects}
                subjectId={subjectId}
                setSubjectId={setSubjectId}
                cost={cost}
                setCost={setCost}
                isFetchingSubjects={isFetchingSubjects}
                isFetchingUserClasses={isFetchingUserClasses}
              />
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
