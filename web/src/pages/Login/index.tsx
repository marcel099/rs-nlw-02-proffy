import React, { useState, FormEvent } from 'react';

import LockScreen from '../../components/LockScreen';
import Input from '../../components/Input';
import ButtonLockScreen from '../../components/ButtonLockScreen';

import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';

import './styles.css';
import { Link } from 'react-router-dom';
import InputLockScreen from '../../components/InputLockScreen';

function Login() {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ disabled, setDisabled ] = useState(true);

  function handleForm(e: React.FormEvent<HTMLInputElement> ) {
    const id = e.currentTarget.getAttribute('id'),
      value = e.currentTarget.value

    switch(id) {
      case 'email':
        // console.log('setEmail')
        setEmail(value);
        break;
      case 'password':
        // console.log('setPassword')
        setPassword(value);
        break;
    }
    // console.log('[valor]', value)

    // console.log('setDisabled')
    // console.log('[email]', email)
    // console.log('[password]', password)
    // console.log('[email password]', !!password && !!email)
    if (!!email && !!password)
      setDisabled(false)
    else
      setDisabled(true)

    // console.log('')
  }

  function handleLogin() {
    console.log('submit de login')
  }

  return (
    <main id="login-wrapper">
      <LockScreen />
      <section>
        <div></div>
        <form onSubmit={handleLogin}>
          <header>
            <h1>Fazer login</h1>
            <Link to="/register">Criar uma conta</Link>
          </header>
          <fieldset>
            <InputLockScreen
              id="email"
              name="email"
              label="E-mail"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              value={email}
              onChange={ handleForm }
            />

            <InputLockScreen
              id="password"
              name="password"
              label="Senha"
              type="password"
              autoCapitalize="none"
              autoComplete="off"
              isPasswordField={true}
              value={password}
              onChange={ handleForm }
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

          <ButtonLockScreen disabled={disabled}>
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