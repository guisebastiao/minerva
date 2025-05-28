import styles from "@/components/CreateAssessment/style.module.css";
import type { AssessmentSchema } from "@/schemas/AssessmentSchema";
import { createAssessment } from "@/hooks/useAssessment";
import { useEffect, useRef, useState } from "react";
import { Star, X } from "lucide-react";
import { Button } from "../Button";
import clsx from "clsx";

interface CreateAssessmentProps {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
  deckId: string;
}

export const CreateAssessment = ({
  isVisible,
  setIsVisible,
  deckId,
}: CreateAssessmentProps) => {
  const { mutate, isPending, isSuccess } = createAssessment();

  const modalRef = useRef<HTMLDivElement>(null);

  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number>(0);

  const totalStars = 5;

  const handleCloseModal = () => {
    setIsVisible(false);
  };

  const handleCreateAssessment = () => {
    const data: AssessmentSchema = {
      deckId,
      assessmentValue: selected,
    };

    if (selected <= 0) {
      return null;
    }

    mutate(data);
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
        <h1 className={styles.title}>Avaliar Coleção</h1>
        <p className={styles.description}>
          Escolha entre 1 a 5 estrelas para avaliar essa coleção
        </p>
        <button
          className={styles.close}
          onClick={handleCloseModal}
        >
          <X />
        </button>
      </header>
      <section className={styles.content}>
        {Array.from({ length: totalStars }, (_, index) => {
          const starIndex = index + 1;
          const isFilled = (hovered ?? selected) >= starIndex;
          return (
            <div
              key={starIndex}
              onMouseEnter={() => setHovered(starIndex)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setSelected(starIndex)}
              style={{
                cursor: "pointer",
                color: isFilled ? styles.filled : styles.notFilled,
              }}
              role="button"
              tabIndex={0}
            >
              {isFilled ? (
                <Star className={styles.starFill} />
              ) : (
                <Star className={styles.star} />
              )}
            </div>
          );
        })}
      </section>
      <footer className={styles.footer}>
        <Button
          value="Avaliar"
          variant="primary"
          onClick={handleCreateAssessment}
          isPending={isPending}
        />
      </footer>
    </main>
  );
};
