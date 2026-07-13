import React from 'react';
import styles from './Input.module.css';

export interface InputProps {
  type?: 'text' | 'number' | 'email' | 'password' | 'search';
  value: string | number;
  onChange: (value: string | number) => void;     
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  className?: string;
  min?: number;
  max?: number;
  step?: number;
}

export const Input: React.FC<InputProps> = ({
  type = 'text',
  value,
  onChange,
  label,
  placeholder,
  disabled = false,
  error,
  className,
  min,
  max,
  step,
}) => {
  const id = React.useId();
  const [internalValue, setInternalValue] = React.useState(value.toString());
  const [inputError, setInputError] = React.useState<string>('');   

  React.useEffect(() => {
    setInternalValue(value.toString());
    setInputError('');
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (type === 'number') {
      
      if (/^-?\d*\.?\d*$/.test(newValue) || newValue === '') {
        setInternalValue(newValue);
        setInputError('');
      
        const num = parseFloat(newValue);
        if (!isNaN(num)) {
          onChange(num);
        }
      } else {
        setInputError('Numeric input only (digits and decimal point)');
      }
    } else {
      setInternalValue(newValue);
      onChange(newValue);
    }
  };

  const handleBlur = () => {
    if (type === 'number') {
      let num = parseFloat(internalValue);
      if (isNaN(num)) num = min !== undefined ? min : 0;

      if (min !== undefined) num = Math.max(min, num);
      if (max !== undefined) num = Math.min(max, num);

      onChange(num);
      setInternalValue(num.toFixed(2));
      setInputError('');
    }
  };

  return (
    <div className={styles.container}>
      {label && <label htmlFor={id} className={styles.label}>{label}</label>}
      
      <input
        id={id}
        type="text"                    
        inputMode="decimal"
        value={internalValue}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={`${styles.input} ${(error || inputError) ? styles.error : ''}`}
      />
      
      {(error || inputError) && (
        <span className={styles.errorMessage}>
          {error || inputError}
        </span>
      )}
    </div>
  );
};