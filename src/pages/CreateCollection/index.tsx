import { deckSchema, type DeckSchemaType } from "@/schemas/DeckSchema";
import styles from "@/pages/CreateCollection/style.module.css";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextArea } from "@/components/TextArea";
import { useNavigate } from "react-router-dom";
import { createDeck } from "@/hooks/useDeck";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useEffect } from "react";
import { X } from "lucide-react";

export const CreateCollection = () => {
  const { mutate, isPending, isSuccess } = createDeck();

  const navigate = useNavigate();

  const createForm = useForm<DeckSchemaType>({
    resolver: zodResolver(deckSchema),
    defaultValues: {
      title: "",
      description: "",
      isPublic: false,
      flashcards: [{ question: "", answer: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: createForm.control,
    name: "flashcards",
  });

  const handleCreateCollection = () => {
    mutate(createForm.getValues());
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      navigate("/collections");
    }
  }, [isSuccess, isPending]);

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Criar Coleção</h1>
      <form
        className={styles.form}
        onSubmit={createForm.handleSubmit(handleCreateCollection)}
      >
        <section className={styles.inputs}>
          <Input
            label="Título"
            placeholder="Informe o nome da coleção"
            fieldError={createForm.formState.errors.title?.message}
            {...createForm.register("title")}
          />
          <Input
            label="Descrição"
            placeholder="Informe a descrição da coleção"
            fieldError={createForm.formState.errors.description?.message}
            {...createForm.register("description")}
          />
          <label
            htmlFor="isPublic"
            className={styles.contentInput}
          >
            <span className={styles.label}>Coleção Publica</span>
            <div className={styles.separator}>
              <input
                type="checkbox"
                id="isPublic"
                className={styles.checkbox}
                {...createForm.register("isPublic")}
              />
              <p className={styles.text}>Essa coleção é publica?</p>
            </div>
          </label>
        </section>
        <h1 className={styles.title}>Perguntas e Respostas</h1>
        <section className={styles.createFlashcards}>
          {fields.map((field, index) => (
            <aside
              key={field.id}
              className={styles.contentFlashcards}
            >
              <div className={styles.question}>
                <h3 className={styles.contentFlashcardsTitle}>Pergunta</h3>
                <TextArea
                  placeholder="Faça a pergunta para sua coleção"
                  maxLength={300}
                  {...createForm.register(`flashcards.${index}.question`)}
                />
                {createForm.formState.errors.flashcards?.[index]?.question && (
                  <p className={styles.errorMessage}>
                    {
                      createForm.formState.errors.flashcards[index]?.question
                        ?.message
                    }
                  </p>
                )}
              </div>
              <div className={styles.answer}>
                <h3 className={styles.contentFlashcardsTitle}>Resposta</h3>
                <TextArea
                  placeholder="Faça a resposta da pergunta"
                  maxLength={300}
                  {...createForm.register(`flashcards.${index}.answer`)}
                />
                {createForm.formState.errors.flashcards?.[index]?.question && (
                  <p className={styles.errorMessage}>
                    {
                      createForm.formState.errors.flashcards[index]?.question
                        ?.message
                    }
                  </p>
                )}
              </div>
              {index !== 0 && (
                <button
                  type="button"
                  className={styles.removeFlashcard}
                  onClick={() => remove(index)}
                >
                  <X />
                </button>
              )}
            </aside>
          ))}
        </section>
        <section className={styles.buttons}>
          <Button
            value="Adicionar nova pergunta"
            type="button"
            variant="secondary"
            className={styles.button}
            disabled={isPending}
            onClick={() => append({ question: "", answer: "" })}
          />
          <Button
            value="Criar Coleção"
            variant="primary"
            className={styles.button}
            isPending={isPending}
            type="submit"
          />
        </section>
      </form>
    </main>
  );
};
