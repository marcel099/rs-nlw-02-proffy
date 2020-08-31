import React, { ButtonHTMLAttributes } from 'react';

import './styles.css';

interface ButtonLockScreen extends ButtonHTMLAttributes<HTMLButtonElement>{
};

const ButtonLockScreen: React.FC<ButtonLockScreen> = ({ children, disabled = false }) => {
  return (
    <button className="button-lock-screen" type="submit" disabled={disabled}>
      {children}
    </button>
  )
}

export default ButtonLockScreen;