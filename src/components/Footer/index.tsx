import { Facebook, Instagram, Linkedin, Mail } from "lucide-react";
import styles from "@/components/Footer/style.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.boxPrimary}>
        <h4 className={styles.name}>Minerva</h4>
        <p className={styles.location}>Tubarão - Santa Cararina</p>
        <div className={styles.sociasMedias}>
          <Instagram className={styles.iconLink} />
          <Facebook className={styles.iconLink} />
          <Mail className={styles.iconLink} />
          <Linkedin className={styles.iconLink} />
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
