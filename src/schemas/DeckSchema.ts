import z, { string } from "zod";

export const deckSchema = z.object({
  title: z
    .string()
    .nonempty("Informe o título da coleção")
    .max(50, "O título deve ter menos de 50 caracteres"),
  description: z
    .string()
    .nonempty("Informe a descrição da coleção")
    .max(200, "A descrição deve ter menos de 200 caracteres"),
  isPublic: z.boolean({
    message: "Informe se sua coleção de flashcards é publica",
  }),
  flashcards: z
    .array(
      z.object({
        id: string().optional(),
        question: z
          .string()
          .min(1, "Informe a pergunta")
          .max(300, "A pergunta deve ter menos de 300 caracteres"),
        answer: z
          .string()
          .min(1, "Informe a resposta")
          .max(300, "A resposta deve ter menos de 300 caracteres"),
      })
    )
    .min(1, "Adicione pelo menos um flashcard"),
});

export type DeckSchemaType = z.infer<typeof deckSchema>;
