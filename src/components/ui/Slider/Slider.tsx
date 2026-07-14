import React from "react";
import styles from "./Slider.module.css"

export interface SliderProps {
    value: number;
    onChange: (value: number) => void;
    label?: string;
    min: number;
    max: number;
    step?: number;
    className?: string;
}

export const Slider: React.FC<SliderProps> = ({
    value,
    onChange,
    label,
    min,
    max,
    step = 0.1,
    className,
}) => {
    const id = React.useId();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(Number(e.target.value));
    };

    return (
        <div className={styles.container}>
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
                className={`${styles.slider} ${className || ""}`}
            />
        </div>
    );
};