import styles from "@/components/DeleteAssessment/style.module.css";
import { deleteAssessment } from "@/hooks/useAssessment";
import { useEffect, useRef } from "react";
import { Button } from "../Button";
import { X } from "lucide-react";
import clsx from "clsx";

interface DeleteAssessmentProps {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
  deckId: string;
}

export const DeleteAssessment = ({
  isVisible,
  setIsVisible,
  deckId,
}: DeleteAssessmentProps) => {
  const { mutate, isPending, isSuccess } = deleteAssessment();

  const modalRef = useRef<HTMLDivElement>(null);

  const handleCloseModal = () => {
    setIsVisible(false);
  };

  const handleDeleteAssessment = (id: string) => {
    mutate(id);
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      setIsVisible(false);
    }
  }, [isPending, isSuccess]);

  return (
    <main
      ref={modalRef}
      className={clsx(styles.container, isVisible && styles.visible)}
    >
      <header className={styles.header}>
        <h1 className={styles.title}>Excluir Avaliação</h1>
        <p className={styles.description}>Você deseja excluir sua avaliação?</p>
        <button
          className={styles.close}
          onClick={handleCloseModal}
        >
          <X />
        </button>
      </header>
      <footer className={styles.footer}>
        <Button
          value="Cancelar"
          variant="secondary"
          onClick={handleCloseModal}
          disabled={isPending}
        />
        <Button
          value="Excluir"
          variant="destrutive"
          onClick={() => handleDeleteAssessment(deckId)}
          isPending={isPending}
        />
      </footer>
    </main>
  );
};
