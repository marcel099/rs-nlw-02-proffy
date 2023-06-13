import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '@services/api';
import { getServerErrorMessage } from '@utils/errors';

import { ConfirmationButton } from '@components/ConfirmationButton';
import { InnerLabelInput } from '@components/InnerLabelInput';

import './styles.css';

export function SignUp() {
  const history = useHistory();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isSaving, setIsSaving] = useState(false);

  async function handleCreateUser(e: FormEvent) {
    e.preventDefault();

    try {
      setIsSaving(true);

      await api.post('/users', {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      });

      history.push('/confirmation', {
        title: 'Cadastro concluído',
        message: 'Agora você faz parte da plataforma Proffy.<br />Tenha uma ótima experiência.',
        buttonTitle: 'Fazer login',
        nextUri: '/',
      });
    } catch (error) {
      setIsSaving(false);

      let message = getServerErrorMessage(error);

      if (message === null) {
        message = 'Não foi possível fazer o cadastro.';
      }
      toast.error(message);
    }
  }

  return (
    <main id="sign-up-container">
      <h1>Cadastro</h1>
      <p>Preencha os dados abaixo<br />para começar</p>

      <form onSubmit={handleCreateUser}>
        <InnerLabelInput
          name="name"
          label="Nome"
          autoComplete="given-name"
          autoCapitalize="words"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <InnerLabelInput
          name="last-name"
          label="Sobrenome"
          autoComplete="family-name"
          autoCapitalize="words"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
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
          autoComplete="new-password"
          autoCapitalize="off"
          isPasswordField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <footer className="submit-button-container">
          <ConfirmationButton
            type="submit"
            title={isSaving ? '...' : 'Concluir cadastro'}
            isFullWidth
            disabled={
              isSaving
                ? true
                : !firstName || !lastName || !email || !password
            }
          />
        </footer>
      </form>
    </main>
  );
}
