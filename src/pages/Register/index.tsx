import { useEffect } from "react";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useNavigate } from "react-router-dom";
import styles from "@/pages/Register/style.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { register } from "@/hooks/useAuth";
import {
  registerSchema,
  type RegisterSchemaType,
} from "@/schemas/RegisterSchema";

export const Register = () => {
  const navigate = useNavigate();

  const { mutate, isPending, isSuccess } = register();

  const registerForm = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    mode: "all",
  });

  const handleRegister = () => {
    mutate(registerForm.getValues());
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
    }
  }, [isSuccess]);

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Cadastrar</h1>
      <form
        className={styles.form}
        onSubmit={registerForm.handleSubmit(handleRegister)}
      >
        <Input
          label="Nome"
          defaultValue=""
          placeholder="Informe seu nome"
          fieldError={registerForm.formState.errors.name?.message}
          {...registerForm.register("name")}
        />
        <Input
          label="Email"
          defaultValue=""
          placeholder="Informe seu email"
          fieldError={registerForm.formState.errors.email?.message}
          {...registerForm.register("email")}
        />
        <Input
          label="Senha"
          defaultValue=""
          placeholder="Informe sua senha"
          isSecure={true}
          fieldError={registerForm.formState.errors.password?.message}
          {...registerForm.register("password")}
        />
        <Input
          label="Confirmar Senha"
          defaultValue=""
          placeholder="Confirme sua senha"
          isSecure={true}
          fieldError={registerForm.formState.errors.confirmPassword?.message}
          {...registerForm.register("confirmPassword")}
        />
        <div className={styles.separator} />
        <Button
          type="submit"
          variant="primary"
          value={isPending ? "Cadastrando" : "Cadastrar"}
          isPending={isPending}
        />
        <Button
          type="button"
          variant="secondary"
          value="Já tenho minha conta"
          disabled={isPending}
          onClick={() => navigate("/login")}
        />
      </form>
    </main>
  );
};
