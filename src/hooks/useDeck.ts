import { CreateDeck, DeleteDeck, UpdateDeck } from "@/services/deckService";
import type { DeckSchemaType } from "@/schemas/DeckSchema";
import { queryClient } from "@/context/QueryContext";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

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

export const updateDeck = () => {
  const { deckId } = useParams();

  return useMutation({
    mutationFn: (data: DeckSchemaType) => UpdateDeck(data, deckId!),
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
