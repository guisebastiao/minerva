import { loginSchema, type LoginSchemaType } from "@/schemas/LoginSchema";
import { useContextAuth } from "@/context/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "@/pages/Login/style.module.css";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useForm } from "react-hook-form";
import { login } from "@/hooks/useAuth";
import { useEffect } from "react";

export const Login = () => {
  const navigate = useNavigate();

  const { login: loginSession } = useContextAuth();

  const { mutate, isPending, isSuccess, data: response } = login();

  const loginForm = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    mode: "all",
  });

  const handleLogin = () => {
    mutate(loginForm.getValues());
  };

  useEffect(() => {
    if (isSuccess) {
      const authDTO = response.data!;
      loginSession(authDTO);
    }
  }, [isSuccess]);

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Entrar</h1>
      <form
        className={styles.form}
        onSubmit={loginForm.handleSubmit(handleLogin)}
      >
        <Input
          label="Email"
          defaultValue=""
          placeholder="Informe seu email"
          fieldError={loginForm.formState.errors.email?.message}
          {...loginForm.register("email")}
        />

        <Input
          label="Senha"
          defaultValue=""
          isSecure={true}
          placeholder="Informe sua senha"
          fieldError={loginForm.formState.errors.password?.message}
          {...loginForm.register("password")}
        />
        <div className={styles.separator} />
        <Button
          type="submit"
          variant="primary"
          value={isPending ? "Entrando" : "Entrar"}
          isPending={isPending}
        />
        <Button
          type="button"
          variant="secondary"
          value="Ainda não tenho minha conta"
          disabled={isPending}
          onClick={() => navigate("/register")}
        />
        <div className={styles.separator} />
        <button
          type="button"
          className={styles.forgotPassword}
          disabled={isPending}
        >
          Esqueci minha senha
        </button>
      </form>
    </main>
  );
};
