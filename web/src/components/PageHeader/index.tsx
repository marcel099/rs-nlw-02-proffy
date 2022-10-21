import { ReactNode } from 'react';

import { PageHeaderTopBar } from '@components/PageHeaderTopBar';

import './styles.css';

interface PageHeaderProps {
  title: string;
  // motivationalIconSource?: string;
  // motivationalMessage?: string;
  // shortMotivationalMessage?: string;
  children: ReactNode;
}

export function PageHeader({ title, children }: PageHeaderProps) {
  return (
    <header className="page-header">
      <PageHeaderTopBar title={title} />
      <div className="header-content">
        {children}
      </div>
    </header>
  );
}
