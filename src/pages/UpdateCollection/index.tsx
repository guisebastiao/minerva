import { deckSchema, type DeckSchemaType } from "@/schemas/DeckSchema";
import styles from "@/pages/UpdateCollection/style.module.css";
import { DeleteFlashcard } from "@/components/DeleteFlashcard";
import { findDeckById, updateDeck } from "@/hooks/useDeck";
import { useNavigate, useParams } from "react-router-dom";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextArea } from "@/components/TextArea";
import { Loading } from "@/components/Loading";
import { Button } from "@/components/Button";
import { useEffect, useState } from "react";
import { Input } from "@/components/Input";
import { Trash, X } from "lucide-react";

export const UpdateCollection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { deckId } = useParams();

  const { data: response, isLoading: loadingDeck } = findDeckById({
    deckId: deckId!,
  });
  const { mutate, isPending, isSuccess } = updateDeck();
  const collection = response?.data!;

  const navigate = useNavigate();

  const updateForm = useForm<DeckSchemaType>({
    resolver: zodResolver(deckSchema),
    defaultValues: {
      title: "",
      description: "",
      isPublic: false,
      flashcards: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: updateForm.control,
    name: "flashcards",
  });

  const handleCreateCollection = () => {
    mutate(updateForm.getValues());
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/collections");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (!isPending && collection) {
      updateForm.reset({
        title: collection.title,
        description: collection.description,
        isPublic: collection.isPublic,
        flashcards: collection.flashcards,
      });
    }
  }, [isPending, collection]);

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Editar Coleção</h1>
      {loadingDeck ? (
        <div className={styles.contentLoading}>
          <Loading />
        </div>
      ) : (
        <form
          className={styles.form}
          onSubmit={updateForm.handleSubmit(handleCreateCollection)}
        >
          <section className={styles.inputs}>
            <Input
              label="Título"
              placeholder="Informe o nome da coleção"
              fieldError={updateForm.formState.errors.title?.message}
              {...updateForm.register("title")}
            />
            <Input
              label="Descrição"
              placeholder="Informe a descrição da coleção"
              fieldError={updateForm.formState.errors.description?.message}
              {...updateForm.register("description")}
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
                  {...updateForm.register("isPublic")}
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
                    {...updateForm.register(`flashcards.${index}.question`)}
                  />
                  {updateForm.formState.errors.flashcards?.[index]
                    ?.question && (
                    <p className={styles.errorMessage}>
                      {
                        updateForm.formState.errors.flashcards[index]?.question
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
                    {...updateForm.register(`flashcards.${index}.answer`)}
                  />
                  {updateForm.formState.errors.flashcards?.[index]
                    ?.question && (
                    <p className={styles.errorMessage}>
                      {
                        updateForm.formState.errors.flashcards[index]?.question
                          ?.message
                      }
                    </p>
                  )}
                </div>
                {updateForm.watch(`flashcards.${index}.id`) ? (
                  <>
                    <button
                      type="button"
                      className={styles.deleteFlashcard}
                      onClick={() => setIsVisible(true)}
                      disabled={isPending}
                    >
                      <Trash className={styles.deleteIcon} />
                    </button>
                    <DeleteFlashcard
                      flashcardId={updateForm.watch(`flashcards.${index}.id`)!}
                      isVisible={isVisible}
                      setIsVisible={setIsVisible}
                      remove={remove}
                      index={index}
                    />
                  </>
                ) : (
                  <button
                    type="button"
                    className={styles.removeFlashcard}
                    onClick={() => remove(index)}
                    disabled={isPending}
                  >
                    <X className={styles.removeIcon} />
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
              value="Salvar"
              variant="primary"
              className={styles.button}
              isPending={isPending}
              type="submit"
            />
          </section>
        </form>
      )}
    </main>
  );
};
