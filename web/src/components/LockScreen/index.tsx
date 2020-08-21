import React from 'react';

import lockScreenImg from '../../assets/images/Background.svg';
import logoImg from '../../assets/images/logo.svg';

import './styles.css';

const LockScreen = () => {
  return (
    <article id="lock-screen" style={{backgroundImage: `url(${lockScreenImg})`}}>
      {/* <img src={lockScreenImg} alt="Plano de fundo" /> */}
      <div>
        <img src={logoImg} alt="Logo Proffy" />
        <h2>Sua plataforma de<br/> estudos online</h2>
      </div>
    </article>
  )
}

export default LockScreen;
