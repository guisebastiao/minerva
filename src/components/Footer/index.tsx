import { Facebook, Instagram, Linkedin, Mail } from "lucide-react";
import styles from "@/components/Footer/style.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.boxPrimary}>
        <h4 className={styles.name}>Minerva</h4>
        <div className={styles.sociasMedias}>
          <a href="https://www.instagram.com/minervaflashcards/" target="_blank" rel="noopener noreferrer">
            <Instagram className={styles.iconLink} />
            </a>
          <a href="https://linktr.ee/minerva_flashcards" target="_blank" rel="noopener noreferrer">
            <Facebook className={styles.iconLink} />
            </a>
          <a href="https://linktr.ee/minerva_flashcards" target="_blank" rel="noopener noreferrer">
            <Mail className={styles.iconLink} />
            </a>
          <a href="https://linktr.ee/minerva_flashcards" target="_blank" rel="noopener noreferrer">
            <Linkedin className={styles.iconLink} />
          </a>
        </div>
      </div>
      <div className={styles.boxSecondary}>
        <p className={styles.copy}>
          &copy; 2025 MINERVA • TODOS OS DIREITOS RESERVADOS
        </p>
      </div>
    </footer>
  );
};
