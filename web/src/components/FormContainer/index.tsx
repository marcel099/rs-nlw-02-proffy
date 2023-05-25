import { FormEvent, ReactNode } from 'react';

import './styles.css';
import { FormFooter } from '@components/FormFooter';

interface FormContainerProps {
  children: ReactNode;
  handleSubmit: (e: FormEvent) => void;
}

export function FormContainer({ children, handleSubmit }: FormContainerProps) {
  return (
    <main className="form-container">
      <form onSubmit={handleSubmit}>
        { children }
        <FormFooter />
      </form>
    </main>
  );
}
