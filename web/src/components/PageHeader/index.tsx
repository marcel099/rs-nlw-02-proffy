import { ReactNode, HTMLAttributes } from 'react';

import { PageHeaderTopBar } from '@components/PageHeaderTopBar';

import './styles.css';

interface PageHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  // motivationalIconSource?: string;
  // motivationalMessage?: string;
  // shortMotivationalMessage?: string;
  children: ReactNode;
}

export function PageHeader({
  title, children, ...rest
}: PageHeaderProps) {
  return (
    <header className="page-header">
      <PageHeaderTopBar title={title} />
      <div
        className="header-content"
        {...rest}
      >
        {children}
      </div>
    </header>
  );
}
