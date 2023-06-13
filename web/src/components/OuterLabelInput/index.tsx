import React, { InputHTMLAttributes } from 'react';

import './styles.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string,
  label: string,
}

export function OuterLabelInput({
  name, label, ...rest
}: InputProps) {
  return (
    <div className="input-block outer-label-input-block">
      <label htmlFor={name}>{label}</label>
      <input type="text" id={name} {...rest} />
    </div>
  );
}
