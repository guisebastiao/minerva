import { Button } from "@/components/Button";
import styles from "@/pages/NotFound/style.module.css";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Página Não Encontrada!</h1>
      <img
        src="/not-found.png"
        alt="not-found-img"
      />
      <p className={styles.paragraph}>
        Desculpe, não conseguimos encontrar o que você estava procurando. Que
        tal voltar para a página inicial?
      </p>
      <Button
        variant="primary"
        onClick={() => navigate("/")}
        value="Voltar para o início"
      />
    </main>
  );
};
