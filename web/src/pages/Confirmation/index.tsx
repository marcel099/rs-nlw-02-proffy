import { useHistory, useLocation } from 'react-router-dom';

import successCheckIconSvg from '@assets/images/icons/success-check-icon.svg';
import successBackgroundSvg from '@assets/images/success-background.svg';

import { ConfirmationButton } from '@components/ConfirmationButton';

import './styles.css';

interface Props {
  title: string;
  message: string;
  buttonTitle: string;
  nextUri: string;
}

export function Confirmation() {
  const history = useHistory();
  const {
    state: {
      title, message, buttonTitle, nextUri,
    },
  } = useLocation<Props>();

  function handleConfirmationButtonClick() {
    history.push(nextUri);
  }

  return (
    <div
      id="confirmation-page-container"
      style={{ backgroundImage: `url(${successBackgroundSvg})` }}
    >
      <img
        src={successCheckIconSvg}
        alt="ìcone que transmite uma mensagem de que o processo ocorreu com sucesso"
      />
      <h1>{title}</h1>
      {/* eslint-disable-next-line react/no-danger */}
      <p dangerouslySetInnerHTML={{ __html: message }} />
      <ConfirmationButton
        title={buttonTitle}
        onClick={handleConfirmationButtonClick}
      />
    </div>
  );
}
