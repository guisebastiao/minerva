import {
  useEffect,
  useRef,
  forwardRef,
  type TextareaHTMLAttributes,
} from "react";
import styles from "@/components/TextArea/style.module.css";
import clsx from "clsx";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, ...rest }, ref) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleInput = () => {
      const textarea = textareaRef.current;

      if (textarea) {
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    };

    useEffect(() => {
      window.addEventListener("resize", handleInput);
      handleInput();

      return () => {
        window.removeEventListener("resize", handleInput);
      };
    }, []);

    return (
      <textarea
        ref={textareaRef}
        className={clsx(styles.textArea, className)}
        onInput={handleInput}
        rows={1}
        {...rest}
      />
    );
  }
);

TextArea.displayName = "TextArea";
