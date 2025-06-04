import type { ReviewFlashcardSchema } from "@/schemas/ReviewFlashcardSchema";
import { ReviewFlashcard } from "@/services/reviewService";
import { queryClient } from "@/context/QueryContext";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const reviewFlashcard = () => {
  return useMutation({
    mutationFn: (data: ReviewFlashcardSchema) => ReviewFlashcard(data),
    onError(error: Error) {
      toast.error(error.message);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
    },
  });
};
