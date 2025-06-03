import styles from "@/components/RemoveCollection/style.module.css";
import { useContextAuth } from "@/context/AuthContext";
import { deleteAccount } from "@/hooks/useUser";
import { useEffect, useRef } from "react";
import { Button } from "../Button";
import { X } from "lucide-react";
import clsx from "clsx";

interface DeleteAccountProps {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
}

export const DeleteAccount = ({
  isVisible,
  setIsVisible,
}: DeleteAccountProps) => {
  const { logout } = useContextAuth();

  const { mutate, isPending, isSuccess } = deleteAccount();

  const modalRef = useRef<HTMLDivElement>(null);

  const handleCloseModal = () => {
    setIsVisible(false);
  };

  const handleDeleteAccount = () => {
    mutate();
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      setIsVisible(false);
      logout();
    }
  }, [isPending, isSuccess]);

  return (
    <main
      ref={modalRef}
      className={clsx(styles.container, isVisible && styles.visible)}
    >
      <header className={styles.header}>
        <h1 className={styles.title}>Excluir Minha Conta</h1>
        <p className={styles.description}>
          Você tem certeza que deseja excluir sua conta? Todos seus dados serão
          apagados.
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
          value="Excluir"
          variant="destrutive"
          onClick={handleDeleteAccount}
          isPending={isPending}
        />
      </footer>
    </main>
  );
};
