import { forgotPasswordSchema } from "@/schemas/ForgotPasswordSchema";
import { createResetPassword } from "@/hooks/useResetPassword";
import styles from "@/pages/ForgotPassword/style.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useForm } from "react-hook-form";

export const ForgotPassword = () => {
  const { mutate, isPending } = createResetPassword();
  const navigate = useNavigate();

  const forgotForm = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "all",
  });

  const handleForgotPassword = () => {
    mutate(forgotForm.getValues());
  };

  return (
    <main className={styles.container}>
      <section className={styles.content}>
        <h1 className={styles.title}>Recuperar Senha</h1>
        <form
          className={styles.form}
          onSubmit={forgotForm.handleSubmit(handleForgotPassword)}
        >
          <Input
            label="Email"
            placeholder="Informe seu email"
            fieldError={forgotForm.formState.errors.email?.message}
            {...forgotForm.register("email")}
            className={styles.input}
          />
          <div className={styles.buttons}>
            <Button
              type="submit"
              value="Enviar"
              variant="primary"
              className={styles.button}
              isPending={isPending}
            />
            <Button
              type="button"
              value="Voltar"
              variant="secondary"
              className={styles.button}
              disabled={isPending}
              onClick={() => navigate("/login")}
            />
          </div>
        </form>
      </section>
    </main>
  );
};
