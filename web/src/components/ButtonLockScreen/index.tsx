import React, { ButtonHTMLAttributes } from 'react';

import './styles.css';

interface ButtonLockScreen extends ButtonHTMLAttributes<HTMLButtonElement>{
};

const ButtonLockScreen: React.FC<ButtonLockScreen> = ({ children }) => {
  return (
    <button type="submit">
      {children}
    </button>
  )
}

export default ButtonLockScreen;