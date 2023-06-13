import { TextareaHTMLAttributes } from 'react';

import './styles.css';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string,
  label: string,
  description?: string
}

export function Textarea({
  name, label, description, ...rest
}: TextareaProps) {
  return (
    <div className="textarea-block">
      <label htmlFor={name}>{label}</label>
      {description && <span>{description}</span>}
      <textarea id={name} {...rest} />
    </div>
  );
}
