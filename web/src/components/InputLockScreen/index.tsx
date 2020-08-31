import React, { InputHTMLAttributes } from 'react';

import { Eye, EyeOff, Check } from 'react-feather';

import './styles.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string,
  label: string,
  iconEye?: boolean,
  iconEyeOff?: boolean,
  check?: boolean,
}

const InputLockScreen: React.FC<InputProps> = ({ name, label, iconEye, iconEyeOff, ...rest }) => {
  return (
    <div className="input-block-lock-screen">
      <label htmlFor={name}>{label}</label>
      <input type="text" id={name} {...rest} />
      { iconEye ? <span className="icon-eye"><Eye /></span> : ''}        {/* Mal-feito. Essa reusabilidade do input estraga qualquer ícone. */}
      { iconEyeOff ? <span className="icon-eye-off"><EyeOff /></span> : ''}
    </div>
  )
}

export default InputLockScreen;