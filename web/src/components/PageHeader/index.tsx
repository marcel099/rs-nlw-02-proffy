import { ReactNode, HTMLAttributes } from 'react';

import { PageHeaderTopBar } from '@components/PageHeaderTopBar';

import './styles.css';

interface PageHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  // motivationalIconSource?: string;
  // motivationalMessage?: string;
  // shortMotivationalMessage?: string;
  contentSize: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export function PageHeader({
  title, children, contentSize, ...rest
}: PageHeaderProps) {
  return (
    <header className="page-header">
      <PageHeaderTopBar title={title} />
      <div
        className={
          // eslint-disable-next-line no-nested-ternary
          `header-content ${contentSize === 'sm' ? 'small' : contentSize === 'md' ? 'medium' : 'large'}`
        }
        {...rest}
      >
        {children}
      </div>
    </header>
  );
}
