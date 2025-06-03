import { updatePasswordSchema } from "@/schemas/UpdatePasswordSchema";
import { updateNameSchema } from "@/schemas/UpdateNameSchema";
import { updateName, updatePassword } from "@/hooks/useUser";
import { useContextAuth } from "@/context/AuthContext";
import styles from "@/pages/Setting/style.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useForm } from "react-hook-form";
import { LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { DeleteAccount } from "@/components/DeleteAccount";

export const Setting = () => {
  const { user, renameUser, logout } = useContextAuth();

  const [isVisible, setIsVisible] = useState(false);

  const { isPending: pendingUpdateName, mutate: mutateUpdateName } =
    updateName();
  const {
    isPending: pendingUpdatePassword,
    mutate: mutateUpdatePassword,
    isSuccess,
  } = updatePassword();

  const updateNameForm = useForm({
    resolver: zodResolver(updateNameSchema),
    mode: "all",
    defaultValues: {
      name: user?.name!,
    },
  });

  const updatePasswordForm = useForm({
    resolver: zodResolver(updatePasswordSchema),
    mode: "all",
  });

  const handleRenameUser = () => {
    const name = updateNameForm.getValues("name");

    if (name === user?.name) {
      return;
    }

    renameUser(name);
    mutateUpdateName({ name });
  };

  const handleUpdatePassword = () => {
    mutateUpdatePassword(updatePasswordForm.getValues());
  };

  useEffect(() => {
    if (isSuccess) {
      updatePasswordForm.reset();
    }
  }, [isSuccess]);

  return (
    <main className={styles.container}>
      <div className={styles.title}>
        <h1>Configurações</h1>
        <button
          className={styles.logout_button}
          onClick={() => logout()}
        >
          <LogOut />
          <span>Sair</span>
        </button>
      </div>
      <h2>Conta</h2>
      <p>Você pode trocar seu nome de usuário aqui.</p>
      <form onSubmit={updateNameForm.handleSubmit(handleRenameUser)}>
        <Input
          label="Nome"
          placeholder="Insira seu novo nome"
          fieldError={updateNameForm.formState.errors.name?.message}
          {...updateNameForm.register("name")}
        />
        <Button
          type="submit"
          variant="primary"
          value="Salvar novo nome"
          isPending={pendingUpdateName}
        />
      </form>
      <h2>Segurança</h2>
      <form onSubmit={updatePasswordForm.handleSubmit(handleUpdatePassword)}>
        <p>
          Você pode trocar sua senha, para isso, informe sua senha atual e
          depois a sua nova senha.
        </p>
        <Input
          label="Senha Atual"
          defaultValue=""
          placeholder="Digite sua senha atual"
          isSecure={true}
          fieldError={
            updatePasswordForm.formState.errors.currentPassword?.message
          }
          {...updatePasswordForm.register("currentPassword")}
        />
        <Input
          label="Nova Senha"
          defaultValue=""
          placeholder="Digite sua nova senha"
          isSecure={true}
          fieldError={updatePasswordForm.formState.errors.newPassword?.message}
          {...updatePasswordForm.register("newPassword")}
        />
        <Input
          label="Confirmar Senha"
          defaultValue=""
          placeholder="Confirme sua nova senha"
          isSecure={true}
          fieldError={
            updatePasswordForm.formState.errors.confirmPassword?.message
          }
          {...updatePasswordForm.register("confirmPassword")}
        />
        <Button
          type="submit"
          value="Trocar Senha"
          isPending={pendingUpdatePassword}
          variant="primary"
        />
      </form>
      <h2>Excluir Conta</h2>
      <p>
        Ao clicar em “Excluir Minha Conta” você receberá um email para poder
        confirmar a exclusão da sua conta.
      </p>
      <Button
        variant="destrutive"
        value="Excluir Minha Conta"
        className={styles.button}
        onClick={() => setIsVisible(true)}
      />
      <DeleteAccount
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
    </main>
  );
};
