import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

// import api from '@services/api';

import { ConfirmationButton } from '@components/ConfirmationButton';
import { InnerLabelInput } from '@components/InnerLabelInput';

import './styles.css';

export function ForgottenPassword() {
  const history = useHistory();

  const [email, setEmail] = useState('');

  async function handleSend(e: FormEvent) {
    e.preventDefault();

    try {
      // await api.post('/reset-password', {
      //   email,
      // });

      history.push('/confirmation', {
        title: 'Redefinição enviada',
        message: 'Boa, agora é só checar o e-mail que foi enviado para você<br />redefinir sua senha e aproveitar os estudos.',
        buttonTitle: 'Voltar ao login',
        nextUri: '/',
      });
    } catch (error) {
      toast.error('Não foi possível enviar o e-mail de redefinição de senha.');
    }
  }

  return (
    <main id="forgotten-password-container">
      <h1>Eita, esqueceu<br />sua senha?</h1>
      <p>Não esquenta, vamos dar um jeito nisso.</p>

      <form onSubmit={handleSend}>
        <InnerLabelInput
          name="email"
          label="E-mail"
          autoComplete="email"
          autoCapitalize="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <footer className="submit-button-container">
          <ConfirmationButton
            type="submit"
            title="Enviar"
            isFullWidth
          />
        </footer>
      </form>
    </main>
  );
}
