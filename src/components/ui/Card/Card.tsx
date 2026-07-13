import React from 'react';
import styles from './Card.module.css';

export interface CardProps {
  
  title?: string;
  
  children: React.ReactNode;
  
  className?: string;
  
  padding?: 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  title,
  children,
  className,
  padding = 'md',
}) => {
  return (
    <div className={`${styles.card} ${styles[padding]} ${className || ''}`}>
      {title && <div className={styles.title}>{title}</div>}
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};