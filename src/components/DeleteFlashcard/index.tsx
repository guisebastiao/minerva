import styles from "@/components/RemoveCollection/style.module.css";
import type { UseFieldArrayRemove } from "react-hook-form";
import { deleteFlashcard } from "@/hooks/useFlashcard";
import { useEffect, useRef } from "react";
import { Button } from "../Button";
import { X } from "lucide-react";
import clsx from "clsx";

interface DeleteFlashcardProps {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
  flashcardId: string;
  remove: UseFieldArrayRemove;
  index: number;
}

export const DeleteFlashcard = ({
  isVisible,
  setIsVisible,
  flashcardId,
  remove,
  index,
}: DeleteFlashcardProps) => {
  const { mutate, isPending, isSuccess } = deleteFlashcard();

  const modalRef = useRef<HTMLDivElement>(null);

  const handleCloseModal = () => {
    setIsVisible(false);
  };

  const handleDeleteFlashcard = (flashcardId: string) => {
    mutate(flashcardId);
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      remove(index);
      setIsVisible(false);
    }
  }, [isPending, isSuccess]);

  return (
    <main
      ref={modalRef}
      className={clsx(styles.container, isVisible && styles.visible)}
    >
      <header className={styles.header}>
        <h1 className={styles.title}>Excluir Flashcard</h1>
        <p className={styles.description}>
          Você tem certeza que deseja excluir esse flashcard?
        </p>
        <button
          className={styles.close}
          onClick={handleCloseModal}
        >
          <X />
        </button>
      </header>
      <footer className={styles.footer}>
        <Button
          type="button"
          value="Cancelar"
          variant="secondary"
          disabled={isPending}
          onClick={handleCloseModal}
        />
        <Button
          type="button"
          value="Excluir Flashcard"
          variant="destrutive"
          onClick={() => handleDeleteFlashcard(flashcardId)}
          isPending={isPending}
        />
      </footer>
    </main>
  );
};
