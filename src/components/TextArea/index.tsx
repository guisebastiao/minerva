import styles from "@/components/TextArea/style.module.css";
import clsx from "clsx";
import {
  useEffect,
  useRef,
  forwardRef,
  type TextareaHTMLAttributes,
  useImperativeHandle,
} from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, ...rest }, ref) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useImperativeHandle(ref, () => textareaRef.current!, []);

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
