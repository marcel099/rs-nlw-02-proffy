import { FormEvent, ReactNode } from 'react';

import './styles.css';
import { FormFooter } from '@components/FormFooter';

interface FormContainerProps {
  children: ReactNode;
  handleSubmit: (e: FormEvent) => void;
  isSubmitting: boolean;
}

export function FormContainer({
  children, handleSubmit, isSubmitting,
}: FormContainerProps) {
  return (
    <main className="form-container">
      <form onSubmit={handleSubmit}>
        { children }
        <FormFooter isSubmitting={isSubmitting} />
      </form>
    </main>
  );
}
