import React from 'react';
import styles from './Select.module.css';

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface SelectProps {
  value: string | number;
  onChange: (value: string | number) => void;
  label?: string;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  label,
  options,
  placeholder = 'Choose...',
  disabled = false,
  className,
}) => {
  const id = React.useId();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    const parsed = isNaN(Number(newValue)) ? newValue : Number(newValue);
    onChange(parsed);
  };

  return (
    <div className={styles.container}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}

      <select
        id={id}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className={`${styles.select} ${className || ''}`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};