import { useState, useEffect } from 'react';
import { FiPower } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { useAuth } from '@contexts/AuthContext';

import giveClassesIcon from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';
import studyIcon from '../../assets/images/icons/study.svg';
import landingImg from '../../assets/images/landing.svg';
import logoImg from '../../assets/images/logo.svg';
import api from '../../services/api';

import './styles.css';

export function Landing() {
  const { signOut, user } = useAuth();

  const [totalConnections, setTotalConnections] = useState(0);

  async function handleSignOut() {
    try {
      await signOut();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    api.get('/connections').then((response) => {
      const { total } = response.data;
      setTotalConnections(total);
    });
  }, []);

  return (
    <div id="page-landing">
      <div id="page-landing-content">
        <div className="upper-container">
          <div className="upper-content">
            <div className="user">
              {
                user?.avatar !== null ? (
                  <img
                    src={user?.avatar}
                    className="user-avatar"
                    alt="Sua foto de perfil"
                  />
                ) : (
                  <div className="no-user-avatar" />
                )
              }
              <Link to="/my-profile" className="user-name">
                {`${user?.firstName} ${user?.lastName}`}
              </Link>
            </div>
            <button type="button" className="sign-out-button" onClick={handleSignOut}>
              <FiPower color="#D4C2FF" />
            </button>
            <div className="logo-container">
              <img src={logoImg} alt="Logo Proffy" />
              <h2>Sua plataforma de estudos online.</h2>
            </div>

            <img
              src={landingImg}
              alt="Plataforma de estudos"
              className="hero-image"
            />
          </div>
        </div>

        <div className="down-container">
          <div className="down-content">
            <div className="welcome-container">
              <span className="welcome">Seja bem-vindo.</span>
              <br />
              <span className="do-next">O que deseja fazer?</span>
            </div>
            <span className="total-connections">
              Total de {totalConnections} conexões
              <br />
              já realizadas
              <img src={purpleHeartIcon} alt="Coração Roxo" />
            </span>

            <div className="buttons-container">
              <Link to="/study" className="study">
                <img src={studyIcon} alt="Estudar" />
                Estudar
              </Link>
              <Link to="/give-classes" className="give-classes">
                <img src={giveClassesIcon} alt="Dar aulas" />
                Dar aulas
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
