import React from "react";
import styles from "./Input.module.css";

export interface InputProps {
    type?: "text" | "number" | "email" | "password" | "search";
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
    type = "text",
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
    const inputClassNames = [
        styles.input,
        error && styles.error,
        className,
    ].filter(Boolean).join(" ");

    const id = React.useId();

    return (
        <div className={styles.container}>
            {label && (
                <label htmlFor={id} className={styles.label}>
                    {label}
                </label>
            )}

            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                className={inputClassNames}
                min={min}
                max={max}
                step={step}
                aria-invalid={!!error}
            />

            {error && <span className={styles.errorMessage}>{error}</span>}
        </div>
    );
};