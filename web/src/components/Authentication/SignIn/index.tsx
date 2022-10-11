import React, { FormEvent, useRef, useState } from 'react';

import { InnerLabelInput } from '../../InnerLabelInput';
import { ConfirmationButton } from '../ConfirmationButton';

import { useAuth } from '../../../contexts/AuthContext';
import purpleHeartIcon from '../../../assets/images/icons/purple-heart.svg';

import './styles.css';

interface SignInProps {
  openSignUp: () => void;
  openForgottenPassword: () => void;
}

export function SignIn({
  openSignUp, openForgottenPassword
}: SignInProps) {
  const { signIn } = useAuth();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const rememberMeCheckboxRef = useRef<HTMLInputElement>(null);

  async function handleSignIn(e: FormEvent) {
    try {
      e.preventDefault();

      const rememberMe = rememberMeCheckboxRef.current?.checked ?? false;

      signIn({
        email,
        password,
        rememberMe,
      });
    } catch (error) {
      console.error(error);
      window.alert('Não foi possível realizar login');
    }
  }

  return (
    <>
      <header></header>
      <main>
        <h1>Fazer login</h1>
        <form onSubmit={handleSignIn}>
          <InnerLabelInput
            name="email"
            label="E-mail"
            autoComplete="email"
            autoCapitalize="off"
            value={email}
            onChange={ (e) => setEmail(e.target.value) }
          />
          <InnerLabelInput
            name="password"
            label="Senha"
            type="password"
            autoComplete="current-password"
            autoCapitalize="off"
            isPasswordField
            value={password}
            onChange={ (e) => setPassword(e.target.value) }
          />

          <div className="sign-in-form-options">
            <fieldset>
              <input
                type="checkbox"
                id="remember-me"
                name="remember-me"
                ref={rememberMeCheckboxRef}
              />
              <label htmlFor="remember-me">Lembrar-me</label>
            </fieldset>
            <a onClick={openForgottenPassword}>Esqueci minha senha</a>
          </div>

          <footer className="submit-button-container">
            <ConfirmationButton
              type="submit"
              title="Entrar"
              isFullWidth
            />
          </footer>
        </form>
      </main>
      <footer className="sign-in-footer-content">
        <div>
          <p>Não tem conta?</p>
          <a onClick={openSignUp}>Cadastre-se</a>
        </div>
        <p></p>
        <p>
          <span>É de graça</span> <img src={purpleHeartIcon} alt="Coração Roxo"/>
        </p>
      </footer>
    </>
  )
}
