import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';
import api from '../../services/api';

export interface TeacherItemProps {
  id: number,
  user_id: string,
  name: string,
  subject: string,
  bio: string,
  avatar: string,
  cost: number,
  whatsapp: string,
}

const TeacherItem: React.FC<TeacherItemProps> = ({ user_id, avatar, name, subject, bio, cost, whatsapp }) => {
  const whatsappMessageURI = encodeURI(`Olá, eu gostaria de fazer uma aula de ${subject}`);

  function handleCreateConnection() {
    api.post('/connections', {
      user_id,
    })
  }

  return (
    <article className="teacher-item">
      <header>
        <img src={avatar} alt={name}/>
        <div>
          <strong>{name}</strong>
          <span>{subject}</span>
        </div>
      </header>

      <p>
       {bio}
      </p>

      <footer>
        <p>
          Preço/hora
          <strong>R$ {cost}</strong>
        </p>
        <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleCreateConnection}
          href={`https://wa.me/${whatsapp}?text=${whatsappMessageURI}`}
        >
          <img src={whatsappIcon} alt="Whatsapp"/>
          Entrar em contato
        </a>
      </footer>
    </article>
  )
}

export default TeacherItem;