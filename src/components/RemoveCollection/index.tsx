import styles from "@/components/RemoveCollection/style.module.css";
import { removeCollection } from "@/hooks/useCollection";
import { useEffect, useRef } from "react";
import { Button } from "../Button";
import { X } from "lucide-react";
import clsx from "clsx";

interface RemoveCollectionProps {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
  deckId: string;
}

export const RemoveCollection = ({
  isVisible,
  setIsVisible,
  deckId,
}: RemoveCollectionProps) => {
  const { mutate, isPending, isSuccess } = removeCollection();

  const modalRef = useRef<HTMLDivElement>(null);

  const handleCloseModal = () => {
    setIsVisible(false);
  };

  const handleRemoveCollection = (deckId: string) => {
    mutate(deckId);
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
        <h1 className={styles.title}>Remover Coleção</h1>
        <p className={styles.description}>
          Você tem certeza que deseja remover essa coleção?
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
          value="Cancelar"
          variant="secondary"
          disabled={isPending}
          onClick={handleCloseModal}
        />
        <Button
          value="Remover Coleção"
          variant="destrutive"
          onClick={() => handleRemoveCollection(deckId)}
          isPending={isPending}
        />
      </footer>
    </main>
  );
};
