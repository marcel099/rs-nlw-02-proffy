import React, { ButtonHTMLAttributes } from 'react';

import './styles.css';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

export function SubmitFormButton({ title, ...rest }: Props) {
  return (
    <button
      className="submit-form-button"
      {...rest}
    >
      { title }
    </button>
  )
}
