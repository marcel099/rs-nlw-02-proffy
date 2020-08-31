import React from 'react';

import LockScreen from '../../components/LockScreen';
import Input from '../../components/Input';
import ButtonLockScreen from '../../components/ButtonLockScreen';

import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';

import './styles.css';
import { Link } from 'react-router-dom';
import InputLockScreen from '../../components/InputLockScreen';

function Login() {
  return (
    <main id="login-wrapper">
      <LockScreen />
      <section>
        <header>
            <strong>Fazer login</strong>
            <Link to="/register">Criar uma conta</Link>
        </header>
        <form>          
          <fieldset>
            <InputLockScreen
              name="email"
              label="e-mail"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
            />

            <InputLockScreen
              name="password"
              label="Senha"
              type="password"
              autoCapitalize="none"
              autoComplete="off"
              // iconEye={true}
            />
          </fieldset>
          
          <article>
            <div className="checkbox-block">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me"><span>Lembrar-me</span></label>
            </div>
            <Link to="/forgot-password">
              Esqueci minha senha
            </Link>
          </article>

          <ButtonLockScreen disabled={true}>
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