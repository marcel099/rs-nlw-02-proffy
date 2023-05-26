import { useEffect, useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import rocketIcon from '@assets/images/icons/rocket.svg';

import { useAuth } from '@contexts/AuthContext';
import { ApiClassSchedule, ClassSchedule, NotSavedClassSchedule } from '@dtos/ClassSchedule';
import { Subject } from '@dtos/Subject';
import api from '@services/api';
import { createBlankClassSchedule } from '@utils/factories';
import { parseFetchedToParsedClassSchedule } from '@utils/mappers';

import { ClassScheduleForm } from '@components/ClassScheduleForm';
import { EncouragementMessage } from '@components/EncouragementMessage';
import { FormContainer } from '@components/FormContainer';
import { OuterLabelInput } from '@components/OuterLabelInput';
import { PageHeader } from '@components/PageHeader';
import { PageSubtitle } from '@components/PageSubtitle';
import { SubjectForm } from '@components/SubjectForm';
import { Textarea } from '@components/Textarea';
import { UserAvatar } from '@components/UserAvatar';

import './styles.css';

export function GiveClasses() {
  const { fetchUser, user } = useAuth();
  const history = useHistory();

  const firstName = user?.firstName ?? '';
  const lastName = user?.lastName ?? '';
  const avatar = user?.avatar ?? null;
  const [whatsapp, setWhatsapp] = useState(user?.whatsapp ?? '');
  const [bio, setBio] = useState(user?.bio ?? '');

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [subjectId, setSubjectId] = useState(-1);
  const [cost, setCost] = useState('');

  const [classSchedules, setClassSchedules] = useState<ClassSchedule[]>([]);

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
    api.get('/classes/me').then((response) => {
      const fetchedClassSchedules: ApiClassSchedule[] =
        response.data.class_schedules;

      const parsedClassSchedules = fetchedClassSchedules
        .map(parseFetchedToParsedClassSchedule);

      const newClassSchedules = parsedClassSchedules.length > 0
        ? parsedClassSchedules
        : [createBlankClassSchedule()];

      setClassSchedules(newClassSchedules);
      setSubjectId(response.data.class.subject.id);
      setCost(response.data.class.cost);
    });
  }, []);

  return (
    <div id="page-teacher-form" className="page-container">
      <PageHeader
        title="Dar aulas"
      >
        <PageSubtitle subtitle="Que incrível que você quer dar aulas." />
        <div className="page-description-container">
          <p className="page-description">O primeiro passo é preencher este formulário de inscrição</p>
          <div className="encouragement-message-container">
            <EncouragementMessage
              iconUrl={rocketIcon}
              iconAlt="Foguete"
            >
              Preparare-se!<br />Vai ser o máximo.
            </EncouragementMessage>
          </div>
        </div>
      </PageHeader>

      <FormContainer handleSubmit={handleEditUser}>
        <fieldset>
          <legend>Seus dados</legend>

          <div className="personal-data-section">
            <div className="main-personal-data">
              <UserAvatar
                avatar={avatar}
                size="md"
              />
              <p>{`${firstName} ${lastName}`}</p>
            </div>
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
