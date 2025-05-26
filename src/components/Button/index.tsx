import { type ButtonHTMLAttributes } from "react";
import styles from "@/components/Button/style.module.css";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  variant: "primary" | "secondary" | "destrutive";
}

export const Button = ({ value, variant, ...rest }: ButtonProps) => {
  return (
    <button
      className={clsx(
        styles.button,
        variant === "secondary" && styles.secondary,
        variant === "destrutive" && styles.destrutive
      )}
      {...rest}
    >
      {value}
    </button>
  );
};
