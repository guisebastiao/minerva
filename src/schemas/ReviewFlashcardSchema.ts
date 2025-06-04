import { z } from "zod";

export const reviewFlashcardSchema = z.object({
  flashcardId: z.string(),
  rating: z.number(),
});

export type ReviewFlashcardSchema = z.infer<typeof reviewFlashcardSchema>;
