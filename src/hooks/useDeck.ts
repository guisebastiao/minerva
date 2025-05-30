import { CreateDeck, DeleteDeck } from "@/services/deckService";
import { queryClient } from "@/context/QueryContext";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import type { DeckSchemaType } from "@/schemas/deckSchema";

export const createDeck = () => {
  return useMutation({
    mutationFn: (data: DeckSchemaType) => CreateDeck(data),
    onError(error: Error) {
      toast.error(error.message);
    },
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ["community"] });
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      toast.success(data.message);
    },
  });
};

export const deleteDeck = () => {
  return useMutation({
    mutationFn: (deckId: string) => DeleteDeck(deckId),
    onError(error: Error) {
      toast.error(error.message);
    },
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ["community"] });
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      toast.success(data.message);
    },
  });
};
