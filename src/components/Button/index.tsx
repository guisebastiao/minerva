import { type ButtonHTMLAttributes } from "react";
import styles from "@/components/Button/style.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export const Button = ({ value, ...rest }: ButtonProps) => {
  return (
    <button
      className={styles.button}
      {...rest}
    >
      {value}
    </button>
  );
};
