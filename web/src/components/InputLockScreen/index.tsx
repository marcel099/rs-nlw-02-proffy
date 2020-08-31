import React, { useState, InputHTMLAttributes, useEffect } from 'react';

import { Eye, EyeOff } from 'react-feather';

import './styles.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string,
  label: string,
  isPasswordField?: boolean,
}

const InputLockScreen: React.FC<InputProps> = ({ name, label, type = 'text', isPasswordField = false, ...rest }) => {
  const [icon, setIcon] = useState(<Eye/>);
  const [typeInput, setTypeInput] = useState(type);

  const toggleVisibility = () => {
    if (typeInput === 'password') {
      setIcon(<EyeOff color="#8257E5"/>);
      setTypeInput('text');
    }
    else {
      setIcon(<Eye color="#9C98A6"/>);
      setTypeInput('password');
    }
  }

  return (
    <div className="input-block-lock-screen">
      <label htmlFor={name}>{label}</label>
      <input type={typeInput} id={name} {...rest} />
      { ( isPasswordField )
        ? <button type="button" className="toggle-visibility" onClick={toggleVisibility}>{ icon }</button>
        : null}
    </div>
  )
}

export default InputLockScreen;