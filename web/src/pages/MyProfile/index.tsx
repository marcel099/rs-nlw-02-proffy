import { useState } from 'react';

import myProfileDesktopBackgroundImg from '@assets/images/my-profile-desktop-background.svg';
import myProfileMobileBackgroundImg from '@assets/images/my-profile-mobile-background.svg';

import { useAuth } from '@contexts/AuthContext';

import { FormContainer } from '@components/FormContainer';
import { FormFooter } from '@components/FormFooter';
import { OuterLabelInput } from '@components/OuterLabelInput';
import { PageHeader } from '@components/PageHeader';
import { Select } from '@components/Select';
import { Textarea } from '@components/Textarea';
import { UserAvatar } from '@components/UserAvatar';

import './styles.css';

export function MyProfile() {
  const { user } = useAuth();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');

  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');

  const initialSchedule = { week_day: '', from: '', to: '' };
  const [scheduleItems, setScheduleItems] = useState([initialSchedule]);

  let myProfileDesktopImg: string;

  if (window.matchMedia('(min-width: 700px)').matches) {
    myProfileDesktopImg = myProfileDesktopBackgroundImg;
  } else {
    myProfileDesktopImg = myProfileMobileBackgroundImg;
  }

  function addNewScheduleItem() {
    setScheduleItems([...scheduleItems, initialSchedule]);
  }

  function setScheduleItemValue(
    position: number,
    field: string,
    value: string
  ) {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return { ...scheduleItem, [field]: value };
      }

      return scheduleItem;
    });

    setScheduleItems(updatedScheduleItems);
  }

  function handleUserAvatarChange() {
    console.log('');
  }

  function handleEditUser() {
    console.log('');
  }

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
          Geografia
          {/* {user?.subject_name} */}
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
              value={subject}
              placeholder="Selecione qual você quer ensinar"
              onChange={(e) => setSubject(e.target.value)}
              options={[
                { value: 'Matemática', label: 'Matemática' },
                { value: 'Português', label: 'Língua Portuguesa' },
                { value: 'Biologia', label: 'Biologia' },
                { value: 'Química', label: 'Química' },
                { value: 'Física', label: 'Física' },
                { value: 'Geografia', label: 'Geografia' },
                { value: 'História', label: 'História' },
                { value: 'Artes', label: 'Artes' },
                { value: 'Educação Física', label: 'Educação Física' },
              ]}
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
            <button type="button" onClick={addNewScheduleItem}>
              + Novo horário
            </button>
          </legend>

          { scheduleItems.map((scheduleItem, index) => (
            <div
              key={scheduleItem.week_day}
              className="schedule-item"
            >
              <div
                className="fields-section schedule-section"
              >
                <Select
                  name="week_day"
                  label="Dia da semana"
                  value={scheduleItem.week_day}
                  placeholder="Selecione o dia"
                  onChange={(e) => setScheduleItemValue(index, 'week_day', e.target.value)}
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
                  value={scheduleItem.from}
                  onChange={(e) => setScheduleItemValue(index, 'from', e.target.value)}
                />
                <OuterLabelInput
                  name="to"
                  label="Até"
                  type="time"
                  value={scheduleItem.to}
                  onChange={(e) => setScheduleItemValue(index, 'to', e.target.value)}
                />
              </div>
              <button
                type="button"
                className="delete-class-schedule-button"
              >
                Excluir horário
              </button>
            </div>
          ))}
        </fieldset>
        <FormFooter />
      </FormContainer>
    </div>
  );
}
