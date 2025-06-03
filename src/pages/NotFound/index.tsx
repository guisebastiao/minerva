import styles from "@/pages/NotFound/style.module.css";
import not_fount_image from "@/assets/not-found.png";
import { Button } from "@/components/Button";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Página Não Encontrada!</h1>
      <img
        src={not_fount_image}
        alt="not-found-img"
        className={styles.img}
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
