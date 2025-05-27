import { type ButtonHTMLAttributes } from "react";
import styles from "@/components/Button/style.module.css";
import { Loading } from "@/components/Loading";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  isPending?: boolean;
  className?: string;
  variant: "primary" | "secondary" | "destrutive";
}

export const Button = ({
  value,
  variant,
  isPending = false,
  className,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        styles.button,
        variant === "secondary" && styles.secondary,
        variant === "destrutive" && styles.destrutive,
        isPending && styles.loading,
        className
      )}
      {...rest}
    >
      {isPending && <Loading />}
      {value}
    </button>
  );
};
