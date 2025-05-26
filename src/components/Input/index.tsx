import { useState, type InputHTMLAttributes } from "react";
import styles from "@/components/Input/style.module.css";
import { Eye, EyeOff } from "lucide-react";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  isSecure?: boolean;
}

export const Input = ({ label, isSecure = false, ...rest }: InputProps) => {
  const [isFocused, setFocused] = useState(false);
  const [isVisible, setVisible] = useState(false);

  return (
    <label
      className={styles.content}
      htmlFor={label}
    >
      <span className={styles.label}>{label}</span>
      <div className={clsx(styles.separator, isFocused && styles.focused)}>
        <input
          className={styles.input}
          type={isSecure ? (isVisible ? "text" : "password") : rest.type}
          id={label}
          name={label}
          autoComplete="off"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...rest}
        />
        {isSecure && (
          <button
            type="button"
            onClick={() => setVisible(!isVisible)}
            className={styles.button}
          >
            {isVisible ? (
              <EyeOff className={styles.icon} />
            ) : (
              <Eye className={styles.icon} />
            )}
          </button>
        )}
      </div>
    </label>
  );
};
