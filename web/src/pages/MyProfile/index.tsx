import { FormEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import myProfileDesktopBackgroundImg from '@assets/images/my-profile-desktop-background.svg';
import myProfileMobileBackgroundImg from '@assets/images/my-profile-mobile-background.svg';

import { useAuth } from '@contexts/AuthContext';
import { ApiClassSchedule, ClassSchedule } from '@dtos/ClassSchedule';
import { Subject } from '@dtos/Subject';
import api from '@services/api';
import { parseFetchedToParsedClassSchedule } from '@utils/mappers';

import { FormContainer } from '@components/FormContainer';
import { OuterLabelInput } from '@components/OuterLabelInput';
import { PageHeader } from '@components/PageHeader';
import { Select } from '@components/Select';
import { Textarea } from '@components/Textarea';
import { UserAvatar } from '@components/UserAvatar';

import './styles.css';

export function MyProfile() {
  const { fetchUser, user } = useAuth();
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

  const initialNewClassScheduleIndex = -1;
  const [newClassScheduleIndex, setNewClassScheduleIndex] = useState(
    initialNewClassScheduleIndex
  );
  const initialClassSchedule = {
    id: initialNewClassScheduleIndex,
    week_day: -1,
    from: '',
    to: '',
  };

  let myProfileDesktopImg: string;

  if (window.matchMedia('(min-width: 700px)').matches) {
    myProfileDesktopImg = myProfileDesktopBackgroundImg;
  } else {
    myProfileDesktopImg = myProfileMobileBackgroundImg;
  }

  function addNewClassSchedule() {
    initialClassSchedule.id = newClassScheduleIndex;
    setClassSchedules([...classSchedules, initialClassSchedule]);
    setNewClassScheduleIndex(newClassScheduleIndex - 1);
  }

  function removeClassSchedule(id: number | null) {
    if (id === null) {
      return;
    }

    const newClassSchedules = [...classSchedules];
    const classScheduleIndex = newClassSchedules.findIndex(
      (classSchedule) => classSchedule.id === id
    );

    newClassSchedules.splice(classScheduleIndex, 1);

    if (newClassSchedules.length === 0) {
      newClassSchedules.push(initialClassSchedule);
    }

    setClassSchedules(newClassSchedules);
  }

  function setClassScheduleValue(
    position: number,
    field: string,
    value: string
  ) {
    const updatedClassSchedules = classSchedules.map((classSchedule, index) => {
      if (index === position) {
        return { ...classSchedule, [field]: value };
      }

      return classSchedule;
    });

    setClassSchedules(updatedClassSchedules);
  }

  function handleUserAvatarChange(file: File | null) {
    setUserAvatarFile(file);
  }

  async function handleEditUser(e: FormEvent) {
    e.preventDefault();

    try {
      const parsedClassSchedules = classSchedules.map((classSchedule) => {
        const parsedClassSchedule = { ...classSchedule };
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
    } catch (error) {
      toast.error('Erro ao salvar perfil');
    }
  }

  useEffect(() => {
    api.get('/subjects').then((response) => {
      setSubjects(response.data);
    });
  });

  useEffect(() => {
    api.get('/classes/me').then((response) => {
      const fetchedClassSchedules: ApiClassSchedule[] =
        response.data.class_schedules;

      const parsedClassSchedules = fetchedClassSchedules
        .map(parseFetchedToParsedClassSchedule);

      const newClassSchedules = parsedClassSchedules.length > 0
        ? parsedClassSchedules
        : [initialClassSchedule];

      setClassSchedules(newClassSchedules);
      setSubjectId(response.data.class.subject.id);
      setCost(response.data.class.cost);
    });
  }, []);

  return (
    <div id="page-my-profile" className="page-container">
      <PageHeader
        title="Meu perfil"
        contentSize="lg"
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

        <fieldset>
          <legend>Sobre a aula</legend>

          <div className="fields-section subject-section">
            <Select
              name="subject"
              label="Matéria"
              value={subjectId}
              placeholder="Selecione qual você quer ensinar"
              onChange={(e) => setSubjectId(Number(e.target.value))}
              options={subjects.map((subject) => ({
                value: String(subject.id),
                label: subject.name,
              }))}
            />
            <OuterLabelInput
              name="cost"
              label="Custo da sua hora por aula"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            />
          </div>
        </fieldset>

        <fieldset>
          <legend>
            Horários disponíveis
            <button
              type="button"
              onClick={addNewClassSchedule}
            >
              + Novo horário
            </button>
          </legend>

          { classSchedules.map((classSchedule, index) => (
            <div
              key={classSchedule.id}
              className="schedule-item"
            >
              <div
                className="fields-section schedule-section"
              >
                <Select
                  name="week_day"
                  label="Dia da semana"
                  value={
                    classSchedule.week_day !== -1
                      ? classSchedule.week_day
                      : ''
                  }
                  placeholder="Selecione o dia"
                  onChange={(e) => setClassScheduleValue(index, 'week_day', e.target.value)}
                  options={[
                    { value: '0', label: 'Domingo' },
                    { value: '1', label: 'Segunda-feira' },
                    { value: '2', label: 'Terça-feira' },
                    { value: '3', label: 'Quarta-feira' },
                    { value: '4', label: 'Quinta-feira' },
                    { value: '5', label: 'Sexta-feira' },
                    { value: '6', label: 'Sábado' },
                  ]}
                />
                <OuterLabelInput
                  name="from"
                  label="Das"
                  type="time"
                  value={classSchedule.from}
                  onChange={(e) => setClassScheduleValue(index, 'from', e.target.value)}
                />
                <OuterLabelInput
                  name="to"
                  label="Até"
                  type="time"
                  value={classSchedule.to}
                  onChange={(e) => setClassScheduleValue(index, 'to', e.target.value)}
                />
              </div>
              <button
                type="button"
                className="delete-class-schedule-button"
                onClick={() => removeClassSchedule(classSchedule.id)}
              >
                Excluir horário
              </button>
            </div>
          ))}
        </fieldset>
      </FormContainer>
    </div>
  );
}
