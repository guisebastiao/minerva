import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useNavigate } from "react-router-dom";
import styles from "@/pages/Login/style.module.css";

export const Login = () => {
  const navigate = useNavigate();

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Entrar</h1>
      <form className={styles.form}>
        <Input
          label="Email"
          placeholder="Informe seu email"
        />
        <Input
          label="Senha"
          placeholder="Informe sua senha"
          isSecure={true}
        />
        <div className={styles.separator} />
        <Button
          variant="primary"
          value="Entrar"
        />
        <Button
          type="button"
          variant="secondary"
          value="Ainda não tenho minha conta"
          onClick={() => navigate("/register")}
        />
      </form>
    </main>
  );
};
