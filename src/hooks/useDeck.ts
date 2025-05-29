import { queryClient } from "@/context/QueryContext";
import { DeleteDeck } from "@/services/deckService";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

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
