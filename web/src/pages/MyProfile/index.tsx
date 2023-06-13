import { FormEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import myProfileDesktopBackgroundImg from '@assets/images/my-profile-desktop-background.svg';
import myProfileMobileBackgroundImg from '@assets/images/my-profile-mobile-background.svg';

import { useAuth } from '@contexts/AuthContext';
import { ClassSchedule, NotSavedClassSchedule } from '@dtos/ClassSchedule';
import { Subject } from '@dtos/Subject';
import api from '@services/api';
import { isTokenExpiredError } from '@utils/errors';
import { fetchUserClasses } from '@utils/fetchers';

import { ClassScheduleForm } from '@components/ClassScheduleForm';
import { FormContainer } from '@components/FormContainer';
import { OuterLabelInput } from '@components/OuterLabelInput';
import { PageHeader } from '@components/PageHeader';
import { SubjectForm } from '@components/SubjectForm';
import { Textarea } from '@components/Textarea';
import { UserAvatar } from '@components/UserAvatar';

import './styles.css';

export function MyProfile() {
  const { fetchUser, user, isFetchingAuthData } = useAuth();
  const history = useHistory();

  const [userAvatarFile, setUserAvatarFile] = useState<File | null>(null);

  const [firstName, setFirstName] = useState(user?.firstName ?? '');
  const [lastName, setLastName] = useState(user?.lastName ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [whatsapp, setWhatsapp] = useState(user?.whatsapp ?? '');
  const [bio, setBio] = useState(user?.bio ?? '');

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [subjectId, setSubjectId] = useState(-1);
  const [cost, setCost] = useState('');

  const [classSchedules, setClassSchedules] = useState<ClassSchedule[]>([]);

  let myProfileDesktopImg: string;

  if (window.matchMedia('(min-width: 700px)').matches) {
    myProfileDesktopImg = myProfileDesktopBackgroundImg;
  } else {
    myProfileDesktopImg = myProfileMobileBackgroundImg;
  }

  function handleUserAvatarChange(file: File | null) {
    setUserAvatarFile(file);
  }

  async function handleEditUser(e: FormEvent) {
    e.preventDefault();

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

      if (userAvatarFile !== null) {
        const formData = new FormData();
        formData.append('avatar', userAvatarFile);

        await api.patch('/users/avatar', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      await fetchUser();

      history.push('/confirmation', {
        title: 'Cadastro salvo!',
        message: 'Tudo certo, seu cadastro está na nossa lista de professores.<br />Agora é só ficar de olho no seu WhatsApp.',
        buttonTitle: 'Acessar lista',
        nextUri: '/study',
      });
    } catch (error: unknown) {
      if (isTokenExpiredError(error)) {
        return;
      }

      toast.error('Erro ao salvar perfil');
    }
  }

  useEffect(() => {
    if (isFetchingAuthData === false) {
      fetchUserClasses()
        .then((data) => {
          setClassSchedules(data.classSchedules);
          setSubjectId(data.subjectId);
          setCost(data.cost);
        }).catch((error) => {
          if (isTokenExpiredError(error)) {
            return;
          }

          toast.error('Erro ao buscar dados das aulas do usuário');
        });
    }
  }, [isFetchingAuthData]);

  return (
    <div id="page-my-profile" className="page-container">
      <PageHeader
        title="Meu perfil"
        style={{
          backgroundImage: `url(${myProfileDesktopImg})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '90% 90%',
          maxWidth: '1100px',
          alignItems: 'center',
        }}
      >
        <UserAvatar
          avatar={user?.avatar ?? null}
          size="lg"
          containButton
          onUserAvatarButtonPress={handleUserAvatarChange}
        />
        <strong className="user-name">
          {`${user?.firstName} ${user?.lastName}`}
        </strong>
        <span className="user-subject-name">
          {subjects.find((subject) => subjectId === subject.id)?.name ?? 'Matéria não definida'}
        </span>
      </PageHeader>
      <FormContainer handleSubmit={handleEditUser}>
        <fieldset>
          <legend>Seus dados</legend>

          <div className="fields-section name-section">
            <OuterLabelInput
              name="first_name"
              label="Nome"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <OuterLabelInput
              name="last_name"
              label="Sobrenome"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="fields-section contact-section">
            <OuterLabelInput
              name="email"
              label="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <OuterLabelInput
              name="whatsapp"
              label="Whatsapp"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
            />
          </div>
          <Textarea
            name="bio"
            label="Biografia"
            description="(Máximo 300 caracteres)"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </fieldset>

        <SubjectForm
          subjects={subjects}
          setSubjects={setSubjects}
          subjectId={subjectId}
          setSubjectId={setSubjectId}
          cost={cost}
          setCost={setCost}
        />

        <ClassScheduleForm
          classSchedules={classSchedules}
          setClassSchedules={setClassSchedules}
        />
      </FormContainer>
    </div>
  );
}
