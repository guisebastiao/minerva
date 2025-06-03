import { resetPasswordSchema } from "@/schemas/ResetPasswordSchema";
import styles from "@/pages/ResetPassword/style.module.css";
import { resetPassword } from "@/hooks/useResetPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

export const ResetPassword = () => {
  const { mutate, isPending, isSuccess } = resetPassword();

  const navigate = useNavigate();

  const resetPasswordForm = useForm({
    resolver: zodResolver(resetPasswordSchema),
    mode: "all",
  });

  const handleForgotPassword = () => {
    mutate(resetPasswordForm.getValues());
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      navigate("/login");
    }
  }, [isSuccess, isPending]);

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Nova Senha</h1>
      <form
        className={styles.form}
        onSubmit={resetPasswordForm.handleSubmit(handleForgotPassword)}
      >
        <div className={styles.inputs}>
          <Input
            label="Nova Senha"
            isSecure={true}
            placeholder="Informe sua nova senha"
            fieldError={resetPasswordForm.formState.errors.newPassword?.message}
            {...resetPasswordForm.register("newPassword")}
          />
          <Input
            label="Confirmar Senha"
            isSecure={true}
            placeholder="Confirme sua nova senha"
            fieldError={
              resetPasswordForm.formState.errors.confirmPassword?.message
            }
            {...resetPasswordForm.register("confirmPassword")}
          />
        </div>
        <Button
          type="submit"
          value="Salvar"
          variant="primary"
          className={styles.button}
          isPending={isPending}
        />
      </form>
    </main>
  );
};
