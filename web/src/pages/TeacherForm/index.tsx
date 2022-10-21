import { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import warningIcon from '@assets/images/icons/warning.svg';

import api from '@services/api';

import { ConfirmationButton } from '@components/ConfirmationButton';
import { OuterLabelInput } from '@components/OuterLabelInput';
import { PageHeader } from '@components/PageHeader';
import { PageSubtitle } from '@components/PageSubtitle';
import Select from '@components/Select';
import Textarea from '@components/Textarea';

import './styles.css';

export function TeacherForm() {
  const history = useHistory();

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');

  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');

  const initialSchedule = { week_day: '', from: '', to: '' };
  const [scheduleItems, setScheduleItems] = useState([initialSchedule]);

  function addNewScheduleItem() {
    setScheduleItems([...scheduleItems, initialSchedule]);
  }

  function setScheduleItemValue(
    position: number, field: string, value: string
  ) {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return { ...scheduleItem, [field]: value };
      }

      return scheduleItem;
    });

    setScheduleItems(updatedScheduleItems);
  }

  function handleCreateClass(e: FormEvent) {
    e.preventDefault();

    api.post('/classes', {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost: Number(cost),
      schedule: scheduleItems,
    }).then(() => {
      alert('Cadastro realizado com sucesso');

      history.push('/');
    }).catch((response) => {
      alert('Erro no cadastro');
      console.log(response);
    });
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Dar aulas"
      >
        <PageSubtitle subtitle="Que incrível que você quer dar aulas." />
        <p className="page-description">O primeiro passo é preencher este formulário de inscrição</p>
      </PageHeader>

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>

            <OuterLabelInput
              name="name"
              label="Nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <OuterLabelInput
              name="avatar"
              label="Avatar"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
            <OuterLabelInput
              name="whatsapp"
              label="WhatsApp"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
            />
            <Textarea
              name="bio"
              label="Biografia"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>

            <Select
              name="subject"
              label="Matéria"
              value={subject}
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
              label="Custo da hora por aula"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button type="button" onClick={addNewScheduleItem}>
                + Novo horário
              </button>
            </legend>

            { scheduleItems.map((scheduleItem, index) => (
              <div key={scheduleItem.week_day} className="schedule-item">
                <Select
                  name="week_day"
                  label="Dia da semana"
                  value={scheduleItem.week_day}
                  onChange={(e) => setScheduleItemValue(
                    index, 'week_day', e.target.value
                  )}
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
                  onChange={(e) => setScheduleItemValue(
                    index, 'from', e.target.value
                  )}
                />
                <OuterLabelInput
                  name="to"
                  label="Até"
                  type="time"
                  value={scheduleItem.to}
                  onChange={(e) => setScheduleItemValue(
                    index, 'to', e.target.value
                  )}
                />
              </div>
            ))}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante: <br />
              Preencha todos os dados
            </p>
            <ConfirmationButton
              type="submit"
              title="Salvar cadastro"
            />
          </footer>
        </form>
      </main>
    </div>
  );
}
