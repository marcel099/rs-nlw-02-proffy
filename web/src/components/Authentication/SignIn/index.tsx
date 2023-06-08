import { FormEvent, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import purpleHeartIcon from '@assets/images/icons/purple-heart.svg';

import { useAuth } from '@contexts/AuthContext';

import { ConfirmationButton } from '@components/ConfirmationButton';
import { InnerLabelInput } from '@components/InnerLabelInput';

import './styles.css';

interface SignInProps {
  openSignUp: () => void;
  openForgottenPassword: () => void;
}

export function SignIn({ openSignUp, openForgottenPassword }: SignInProps) {
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    } catch {
      toast.error('Não foi possível realizar login');
    }
  }

  return (
    <>
      <header />
      <main>
        <h1>Fazer login</h1>
        <form onSubmit={handleSignIn}>
          <InnerLabelInput
            name="email"
            label="E-mail"
            autoComplete="email"
            autoCapitalize="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InnerLabelInput
            name="password"
            label="Senha"
            type="password"
            autoComplete="current-password"
            autoCapitalize="off"
            isPasswordField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="sign-in-form-options">
            <fieldset>
              <input
                type="checkbox"
                id="remember-me"
                name="remember-me"
                ref={rememberMeCheckboxRef}
              />
              {/* eslint-disable-next-line max-len */}
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="remember-me">Lembrar-me</label>
            </fieldset>
            <button type="button" onClick={openForgottenPassword}>
              Esqueci minha senha
            </button>
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
          <button type="button" onClick={openSignUp}>
            Cadastre-se
          </button>
        </div>
        <p>
          <span>É de graça</span>
          <img src={purpleHeartIcon} alt="Coração Roxo" />
        </p>
      </footer>
    </>
  );
}
