import styles from "@/components/FilterSearch/style.module.css";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ListFilter, Check } from "lucide-react";
import clsx from "clsx";

export const FilterSearch = () => {
  const [search, setSearch] = useSearchParams();
  const order = search.get("order");

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

  const setOrder = (order: string) => {
    setIsOpen(false);

    if (order === "") {
      setSearch((params) => {
        params.delete("order");
        return params;
      });

      return;
    }

    setSearch((params) => {
      params.set("order", order);
      return params;
    });
  };

  return (
    <div className={styles.filter}>
      <button
        type="button"
        className={styles.buttonFilter}
        onClick={() => setIsOpen(!isOpen)}
        ref={buttonOpenRef}
      >
        <ListFilter className={styles.icon} />
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
          <span className={styles.dropdownTitle}>Ordenar por</span>
        </div>
        <div className={styles.dropdownContent}>
          <button
            type="button"
            className={styles.dropdownButton}
            onClick={() => setOrder("")}
          >
            {!order && <Check className={styles.icon} />}
            Padrão
          </button>
          <button
            type="button"
            className={styles.dropdownButton}
            onClick={() => setOrder("date")}
          >
            {order === "date" && <Check className={styles.icon} />}
            Criação
          </button>
          <button
            type="button"
            className={styles.dropdownButton}
            onClick={() => setOrder("assessment")}
          >
            {order === "assessment" && <Check className={styles.icon} />}
            Avaliação
          </button>
        </div>
      </div>
    </div>
  );
};
