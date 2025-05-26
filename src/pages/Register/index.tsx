import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useNavigate } from "react-router-dom";
import styles from "@/pages/Register/style.module.css";

export const Register = () => {
  const navigate = useNavigate();

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Cadastrar</h1>
      <form className={styles.form}>
        <Input
          label="Nome"
          placeholder="Informe seu nome"
        />
        <Input
          label="Email"
          placeholder="Informe seu email"
        />
        <Input
          label="Senha"
          placeholder="Informe sua senha"
          isSecure={true}
        />
        <Input
          label="Confirmar Senha"
          placeholder="Confirme sua senha"
          isSecure={true}
        />
        <div className={styles.separator} />
        <Button
          variant="primary"
          value="Cadastrar"
        />
        <Button
          type="button"
          variant="secondary"
          value="Já tenho minha conta"
          onClick={() => navigate("/login")}
        />
      </form>
    </main>
  );
};
