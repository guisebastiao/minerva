import type { DeckSchemaType } from "@/schemas/DeckSchema";
import { queryClient } from "@/context/QueryContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  CreateDeck,
  FindDeckById,
  DeleteDeck,
  UpdateDeck,
} from "@/services/deckService";

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

export const findDeckById = ({ deckId }: { deckId: string }) => {
  return useQuery({
    queryFn: () => FindDeckById(deckId),
    queryKey: ["FindDeck", deckId],
    throwOnError(error: Error) {
      toast.error(error.message);
      return false;
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
