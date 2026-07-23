import React from "react";
import styles from "./Card.module.css";

export interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  padding?: "sm" | "md" | "lg";
  titleAs?: "h2" | "h3" | "h4";
  titleId?: string;
}

export const Card: React.FC<CardProps> = ({
  title,
  children,
  className,
  padding = "md",
  titleAs: TitleTag = "h3",
  titleId,
}) => {
  return (
    <div className={`${styles.card} ${styles[padding]} ${className || ""}`}>
      {title && (
        <TitleTag id={titleId} className={styles.title}>
          {title}
        </TitleTag>
      )}
      <div className={styles.content}>{children}</div>
    </div>
  );
};