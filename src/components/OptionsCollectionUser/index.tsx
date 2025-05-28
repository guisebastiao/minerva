import styles from "@/components/OptionsCollectionUser/style.module.css";
import type { DeckDTO } from "@/services/types/DeckDTO";
import { useEffect, useRef, useState } from "react";
import { EllipsisVertical } from "lucide-react";
import clsx from "clsx";

interface OptionsCollectionUserProps {
  collection: DeckDTO;
}

export const OptionsCollectionUser = ({
  collection,
}: OptionsCollectionUserProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [alignRight, setAlignRight] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonOpenRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonOpenRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlePosition = () => {
    const el = dropdownRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect()!;

    if (rect.right + 30 > window.innerWidth) {
      setAlignRight(true);
    }

    if (window.innerWidth > 940) {
      setAlignRight(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      handlePosition();
      window.addEventListener("resize", handlePosition);
    }

    return () => window.removeEventListener("resize", handlePosition);
  }, [isOpen]);

  return (
    <div className={styles.options}>
      <button
        type="button"
        className={styles.buttonOptions}
        onClick={() => setIsOpen(!isOpen)}
        ref={buttonOpenRef}
      >
        <EllipsisVertical className={styles.icon} />
      </button>
      <div
        className={clsx(
          styles.dropdown,
          isOpen && styles.dropdownActive,
          alignRight && styles.dropdownRightAligned
        )}
        ref={dropdownRef}
      >
        <div className={styles.dropdownHeader}>
          <span className={styles.dropdownTitle}>Opções</span>
        </div>
        <div className={styles.dropdownContent}>
          {collection.belongsToAuthUser ? (
            <>
              <button
                type="button"
                className={styles.dropdownButton}
              >
                Editar
              </button>
              <button
                type="button"
                className={styles.dropdownButton}
              >
                Excluir
              </button>
            </>
          ) : (
            <button
              type="button"
              className={styles.dropdownButton}
            >
              Remover das minhas coleções
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
