import { DeleteFlashcard } from "@/services/flashcardService";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const deleteFlashcard = () => {
  return useMutation({
    mutationFn: (flashcardId: string) => DeleteFlashcard(flashcardId),
    onError(error: Error) {
      toast.error(error.message);
    },
    onSuccess(data) {
      toast.success(data.message);
    },
  });
};
