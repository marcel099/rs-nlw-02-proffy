import React from 'react';

import whatsappIcon from '@assets/images/icons/whatsapp.svg';

import { Teacher } from '@dtos/Teacher';
import api from '@services/api';

import './styles.css';

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
  const whatsappMessageURI = encodeURI(`Olá, eu gostaria de fazer uma aula de ${subject}`);

  function handleCreateConnection() {
    api.post('/connections', {
      user_id,
    });
  }

  return (
    <article className="teacher-item">
      <header>
        <img src={avatar_url} alt={first_name} />
        <div>
          <strong>{`${first_name} ${last_name}`}</strong>
          <span>{subject.name}</span>
        </div>
      </header>

      <p>
        { bio }
      </p>

      <footer>
        <p>
          Preço/hora
          <strong>R$ {lesson.cost}</strong>
        </p>
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
