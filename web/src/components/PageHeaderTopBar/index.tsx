import { Link } from 'react-router-dom';

import backIcon from '@assets/images/icons/back.svg';
import logoImg from '@assets/images/logo.svg';

import './styles.css';

interface PageHeaderTopBarProps {
  title: string;
}

export function PageHeaderTopBar({ title }: PageHeaderTopBarProps) {
  return (
    <div className="top-bar-container">
      <div className="top-bar-content">
        <Link to="/landing">
          <img src={backIcon} alt="Voltar" />
        </Link>
        <h1 className="page-title">{title}</h1>
        <img src={logoImg} alt="Logo Proffy" />
      </div>
    </div>
  );
}
