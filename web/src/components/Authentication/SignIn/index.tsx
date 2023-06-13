import { FormEvent, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import purpleHeartIcon from '@assets/images/icons/purple-heart.svg';

import { useAuth } from '@contexts/AuthContext';
import { getServerErrorMessage } from '@utils/errors';

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
  const [isSending, setIsSending] = useState(false);

  const rememberMeCheckboxRef = useRef<HTMLInputElement>(null);

  async function handleSignIn(e: FormEvent) {
    try {
      e.preventDefault();

      setIsSending(true);

      const rememberMe = rememberMeCheckboxRef.current?.checked ?? false;

      await signIn({
        email,
        password,
        rememberMe,
      });
    } catch (error) {
      setIsSending(false);
      let message = getServerErrorMessage(error);

      if (message === null) {
        message = 'Não foi possível realizar login';
      }

      toast.error(message);
    }
  }

  return (
    <main id="sign-in-container">
      <header />
      <main>
        <header>
          <h1>Fazer login</h1>
          <button
            type="button"
            className="redirect-button"
            onClick={openSignUp}
          >
            Criar uma conta
          </button>
        </header>
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
            <button
              type="button"
              onClick={openForgottenPassword}
              className="redirect-button"
            >
              Esqueci minha senha
            </button>
          </div>

          <footer className="submit-button-container">
            <ConfirmationButton
              type="submit"
              title={isSending ? '...' : 'Entrar'}
              isFullWidth
              disabled={
                isSending
                  ? true
                  : !email || !password
              }
            />
          </footer>
        </form>
      </main>
      <footer>
        <div>
          <p>Não tem conta?</p>
          <button
            type="button"
            className="redirect-button"
            onClick={openSignUp}
          >
            Cadastre-se
          </button>
        </div>
        <p>
          <span>É de graça</span>
          <img src={purpleHeartIcon} alt="Coração Roxo" />
        </p>
      </footer>
    </main>
  );
}
