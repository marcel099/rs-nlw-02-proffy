import React from 'react';

import LockScreen from '../../components/LockScreen';
import Input from '../../components/Input';
import ButtonLockScreen from '../../components/ButtonLockScreen';

import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';

import './styles.css';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <main id="login-wrapper">
      <LockScreen />
      <section>
        <form>
          <legend>Fazer login</legend>

          <Input
            name="email"
            label="e-mail"
            type="email"
          />

          <Input
            name="password"
            label="Senha"
            type="password"
          />

          <article>
            <div className="input-block">
              <label htmlFor="remember-me">Lembrar-me</label>
              <input type="checkbox" id="remember-me" />
            </div>
            <Link to="/forgot-password">
              Esqueci minha senha
            </Link>
          </article>

          <ButtonLockScreen>
            Entrar
          </ButtonLockScreen>
        </form>

        <article>
          <div>
            <p>Não tem conta?</p>
            <Link to="/register">Cadastre-se</Link>
          </div>
          <div>
            <p>É de graça</p>
            <img src={purpleHeartIcon} alt="Coração Roxo"/>
          </div>
        </article>
      </section>
    </main>
  );
}

export default Login;