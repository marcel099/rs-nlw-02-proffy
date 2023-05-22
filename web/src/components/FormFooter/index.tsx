import warningIcon from '@assets/images/icons/warning.svg';

import { ConfirmationButton } from '@components/ConfirmationButton';

import './styles.css';

export function FormFooter() {
  return (
    <footer className="form-footer">
      <div>
        <img src={warningIcon} alt="Aviso importante" />
        <p>
          <span>Importante!</span> <br />
          Preencha todos os dados corretamente.
        </p>
      </div>
      <ConfirmationButton
        type="submit"
        title="Salvar cadastro"
      />
    </footer>
  );
}
