import React, { SelectHTMLAttributes } from 'react';

import './styles.css';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string,
  label: string,
  placeholder?: string,
  options: Array<{
    value: string,
    label: string,
  }>,
}

export function Select({
  name,
  label,
  placeholder,
  options,
  ...rest
}: SelectProps) {
  return (
    <div className="select-block">
      <label htmlFor={name}>{label}</label>
      <select id={name} value="" {...rest}>
        <option value="" disabled hidden>
          { placeholder || 'Selecione' }
        </option>
        {
          options.map(({ value, label: optionLabel }) => (
            <option value={value} key={value}>{optionLabel}</option>
          ))
        }
      </select>
    </div>
  );
}
