import React, { useState, InputHTMLAttributes } from 'react';
import { FiEye, FiEyeOff } from "react-icons/fi";

import './styles.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string,
  isPasswordField?: boolean,
}

export function InnerLabelInput({
  label, type = 'text', isPasswordField = false, ...rest
}: InputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [typeInput, setTypeInput] = useState(type);

  function toggleVisibility() {
    if (typeInput === 'password') {
      setIsPasswordVisible(false);
      setTypeInput('text');
    }
    else {
      setIsPasswordVisible(true);
      setTypeInput('password');
    }
  }

  return (
    <div
      className={
        `input-block
        inner-label-input-block
        ${rest?.value !== '' ? 'filled' : ''}`
      }
    >
      <label htmlFor={rest.name}>{label}</label>
      <input type={typeInput} id={rest.name} {...rest} />
      {
        isPasswordField && (
          <button
            type="button"
            className="toggle-visibility-button"
            onClick={toggleVisibility}
          >
            { 
              isPasswordVisible
              ? <FiEye color="#9C98A6" />
              : <FiEyeOff color="#9C98A6"/>
            }
          </button>
        )
      }
    </div>
  )
}
