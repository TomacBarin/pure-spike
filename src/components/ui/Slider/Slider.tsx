import React from "react";
import styles from "./Slider.module.css";

export interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  label?: string;
  min: number;
  max: number;
  step?: number;
  className?: string;
  disabled?: boolean;
  /** Value to reset to on Cmd/Ctrl + click */
  defaultValue?: number;
}

export const Slider: React.FC<SliderProps> = ({
  value,
  onChange,
  label,
  min,
  max,
  step = 0.1,
  className,
  disabled = false,
  defaultValue,
}) => {
  const id = React.useId();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    // Cmd (Mac) or Ctrl (Windows/Linux) + click → reset
    if ((e.metaKey || e.ctrlKey) && defaultValue !== undefined && !disabled) {
      e.preventDefault();
      onChange(defaultValue);
    }
  };

  return (
    <div className={`${styles.container} ${disabled ? styles.disabled : ''}`}>
      {label && (
        <div className={styles.labelRow}>
          <label htmlFor={id} className={styles.label}>
            {label}
          </label>
          <span className={styles.value}>{value}</span>
        </div>
      )}

      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        onClick={handleClick}
        disabled={disabled}
        className={`${styles.slider} ${className || ''}`}
        title={defaultValue !== undefined ? 'Cmd/Ctrl + click to reset' : undefined}
      />
    </div>
  );
};