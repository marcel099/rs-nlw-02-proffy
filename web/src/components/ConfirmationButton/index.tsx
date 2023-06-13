import { ButtonHTMLAttributes } from 'react';

import './styles.css';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  isFullWidth?: boolean;
}

export function ConfirmationButton({
  title, isFullWidth = false, ...rest
}: Props) {
  return (
    <button
      type="button"
      className={`confirmation-button ${isFullWidth ? 'full-width' : ''}`}
      {...rest}
    >
      { title }
    </button>
  );
}
