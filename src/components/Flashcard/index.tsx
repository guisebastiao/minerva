import styles from "@/components/Flashcard/style.module.css";
import { TextArea } from "../TextArea";

const Flashcard = () => {
  return (
    <aside className={styles.container}>
      <div className={styles.question}>
        <h3 className={styles.title}>Pergunta</h3>
        <TextArea
          placeholder="Faça a pergunta para sua coleção"
          maxLength={300}
        />
      </div>
      <div className={styles.answer}>
        <h3 className={styles.title}>Resposta</h3>
        <TextArea
          placeholder="Faça a resposta da pergunta"
          maxLength={300}
        />
      </div>
    </aside>
  );
};

export default Flashcard;
