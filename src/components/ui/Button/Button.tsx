import React from "react";
import styles from "./Button.module.css"

export interface ButtonProps {
    variant?: "primary" | "secondary" | "ghost";
    size?: "sm" | "md" | "lg";
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    children: React.ReactNode;
    className?: string;
}

export const Button: React.FC<ButtonProps> = ({
    variant = "primary", 
    size = "md", 
    disabled = false,
    type = "button",
    onClick, 
    children,
    className,
}) => {
    const buttonClassNames = [
        styles.button,
        styles[variant],
        styles[size],
        className,
    ]
    .filter(Boolean)
    .join(' ');

    return (
        <button
        type={type}
        className={buttonClassNames}
        onClick={onClick}
        disabled={disabled}
        aria-disabled={disabled}
        >
            {children}
            </button>
    );
};