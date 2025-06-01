import styles from "@/pages/Setting/style.module.css";
import { Input } from "@/components/Input";
import { LogOut } from "lucide-react";
import { Button } from "@/components/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateNameSchema } from "@/schemas/UpdateNameSchema";
import { updateName } from "@/hooks/useUpdateName";
import { useContextAuth } from "@/context/AuthContext";

export const Setting = () => {
  const {user, renameUser, logout} = useContextAuth()

  const {isPending, mutate} = updateName()

  const updateNameForm = useForm({
    resolver: zodResolver(updateNameSchema), 
    mode: "all",
    defaultValues:{ 
      name: user?.name!
    }
  });

  const handleRenameUser = () => {
    renameUser(updateNameForm.getValues("name"))
    mutate(updateNameForm.getValues())
  }


  return (
    <main className={styles.container}>

      <div className={styles.title}>
        <h1>Configurações</h1>
        <button className={styles.logout_button} onClick={() => logout() }>
          <LogOut />
          <span>Sair</span>
        </button>
      </div>

      <h2>Conta</h2>
      <p>Você pode trocar seu nome de usuário aqui.</p>

      <form
      onSubmit={updateNameForm.handleSubmit(handleRenameUser)}
      >
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
        isPending={isPending}
        />
      </form>

      <h2>Segurança</h2>
      <form action="">
        <p>Você pode trocar sua senha, para isso, informe sua senha atual e depois a sua nova senha.</p>   

        <Input
        label="Senha Atual"
        defaultValue=""
        placeholder="Digite sua senha atual"
        isSecure={true}
        />

        <Input 
        label="Nova Senha"
        defaultValue=""
        placeholder="Digite sua nova atual"
        isSecure={true}

        />

        <Input 
        label="Confirmar Senha"
        defaultValue=""
        placeholder="Confirme sua nova senha"
        isSecure={true}
        />

        <Button
        type="submit"
        value="Trocar Senha"
        variant="primary" 
        />
  
      </form>

      <h2>Excluir Conta</h2>
      <p>Ao clicar em “Excluir Minha Conta” você receberá um email para poder confirmar a exclusão da sua conta.</p>
      <Button 
      variant="destrutive"
      value="Excluir Minha Conta"
      className={styles.button}/>

    </main>
  );
};
