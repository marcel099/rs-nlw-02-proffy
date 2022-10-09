import React, { ButtonHTMLAttributes } from 'react';

import './styles.css';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  isFullWidth?: boolean;
}

export function ConfirmationButton({ title, isFullWidth = false, ...rest }: Props) {
  return (
    <button
      className={`confirmation-button ${isFullWidth ? 'full-width' : ''}`}
      {...rest}
    >
      { title }
    </button>
  )
}
