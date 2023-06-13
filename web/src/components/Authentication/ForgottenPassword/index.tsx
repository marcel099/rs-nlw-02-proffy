import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '@services/api';
import { getServerErrorMessage } from '@utils/errors';

import { ConfirmationButton } from '@components/ConfirmationButton';
import { InnerLabelInput } from '@components/InnerLabelInput';

import './styles.css';

export function ForgottenPassword() {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [isSending, setIsSending] = useState(false);

  async function handleSend(e: FormEvent) {
    e.preventDefault();

    try {
      setIsSending(true);

      await api.post('/password/forgot', {
        email,
      });

      history.push('/confirmation', {
        title: 'Redefinição enviada',
        message: 'Boa, agora é só checar o e-mail que foi enviado para você<br />redefinir sua senha e aproveitar os estudos.',
        buttonTitle: 'Voltar ao login',
        nextUri: '/',
      });
    } catch (error) {
      setIsSending(false);

      let message = getServerErrorMessage(error);

      if (message === null) {
        message = 'Não foi possível enviar o e-mail de redefinição de senha.';
      }

      toast.error(message);
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
            title={isSending ? '...' : 'Enviar'}
            isFullWidth
            disabled={isSending ? true : !email}
          />
        </footer>
      </form>
    </main>
  );
}
