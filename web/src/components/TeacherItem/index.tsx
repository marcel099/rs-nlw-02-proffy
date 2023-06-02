import whatsappIcon from '@assets/images/icons/whatsapp.svg';

import { Teacher } from '@dtos/Teacher';
import api from '@services/api';
import { formatNumberToCurrency } from '@utils/formatters';
import { parseWeekDayValueToName } from '@utils/mappers';

import './styles.css';
import { UserAvatar } from '@components/UserAvatar';

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
}: Teacher) {
  const whatsappMessageURI = encodeURI(`Olá, eu gostaria de fazer uma aula de ${subject.name}`);

  function handleCreateConnection() {
    api.post('/connections', {
      user_id,
    });
  }

  return (
    <article className="teacher-item">
      <header>
        <UserAvatar
          avatar={avatar_url}
          size="md"
        />
        <div className="profile-info">
          <strong>{`${first_name} ${last_name}`}</strong>
          <span>{subject.name}</span>
        </div>
      </header>

      <p className="bio">
        { bio }
      </p>
      <main className="class-schedules-container">
        <header className="class-schedule-header">
          <p>Dia</p>
          <p>Horário</p>
        </header>
        {[1, 2, 3, 4, 5].map((value) => {
          const class_schedule = class_schedules.find(
            (item) => item.week_day === value
          );

          return (
            <div
              className={
                `
                  class-schedule-item
                  ${!class_schedule && 'nonexistent-class-schedule-item'}
                `
              }
              key={value}
            >
              <p className="class-schedule-info-header">Dia</p>
              <p className="class-schedule-info">
                {parseWeekDayValueToName(value)}
              </p>
              <p className="class-schedule-info-header">Horário</p>
              <p className="class-schedule-info">
                {class_schedule?.from ?? ''} - {class_schedule?.to ?? ''}
              </p>
            </div>
          );
        })}
      </main>

      <footer>
        <div>
          <p>Preço/hora</p>
          <strong>{formatNumberToCurrency(lesson.cost)}</strong>
        </div>
        <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleCreateConnection}
          href={`https://wa.me/${whatsapp}?text=${whatsappMessageURI}`}
        >
          <img src={whatsappIcon} alt="Whatsapp" />
          Entrar em contato
        </a>
      </footer>
    </article>
  );
}
