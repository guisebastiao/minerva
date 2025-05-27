import { forwardRef, useState, type InputHTMLAttributes } from "react";
import styles from "@/components/Input/style.module.css";
import { Eye, EyeOff } from "lucide-react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  isSecure?: boolean;
  fieldError?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, isSecure = false, fieldError, ...rest }, ref) => {
    const [isVisible, setVisible] = useState(false);

    return (
      <label
        className={styles.content}
        htmlFor={label}
      >
        <span className={styles.label}>{label}</span>
        <div className={styles.separator}>
          <input
            className={styles.input}
            type={isSecure ? (isVisible ? "text" : "password") : rest.type}
            id={label}
            name={label}
            autoComplete="off"
            ref={ref}
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
        {fieldError && (
          <span className={styles.errorMessage}>{fieldError}</span>
        )}
      </label>
    );
  }
);

Input.displayName = "Input";
