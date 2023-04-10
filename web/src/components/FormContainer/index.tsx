import { FormEvent, ReactNode } from 'react';
import './styles.css';

interface FormContainerProps {
  children: ReactNode;
  handleSubmit: (e: FormEvent) => void;
}

export function FormContainer({ children, handleSubmit }: FormContainerProps) {
  return (
    <main className="form-container">
      <form onSubmit={handleSubmit}>
        { children }
      </form>
    </main>
  );
}
