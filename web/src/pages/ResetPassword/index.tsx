import { FormEvent, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '@services/api';
import { getServerErrorMessage } from '@utils/errors';

import { ConfirmationButton } from '@components/ConfirmationButton';
import { InnerLabelInput } from '@components/InnerLabelInput';
import { NonAuthenticatedPageContainer } from '@components/NonAuthenticatedPageContainer';

import './styles.css';

function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

function ResetPasswordContent() {
  const history = useHistory();
  const query = useQuery();

  const [password, setPassword] = useState('');
  const [isSending, setIsSending] = useState(false);

  async function handleSend(e: FormEvent) {
    e.preventDefault();

    try {
      setIsSending(true);

      const token = query.get('token');

      if (token === null) {
        throw new Error();
      }

      await api.post('/password/reset', {
        password,
      }, {
        params: {
          token,
        },
      });

      history.push('/confirmation', {
        title: 'Senha redefinida',
        message: 'Boa, agora é só entrar com sua nova senha<br />e aproveitar os estudos.',
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
    <main id="reset-password-container">
      <h1>Redefina sua senha</h1>
      <p>Você está quase lá.</p>

      <form onSubmit={handleSend}>
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
            title={isSending ? '...' : 'Alterar senha'}
            isFullWidth
            disabled={isSending ? true : !password}
          />
        </footer>
      </form>
    </main>
  );
}

function LeftContentContainer() {
  return (
    <ResetPasswordContent />
  );
}

export function ResetPassword() {
  return (
    <div
      id="reset-password-page"
      className="non-authenticated-page-container"
    >
      <NonAuthenticatedPageContainer
        currentBannerSide="right"
        isBannerExpanded={false}
        LeftContentContainer={(
          <LeftContentContainer />
        )}
      />
    </div>
  );
}
