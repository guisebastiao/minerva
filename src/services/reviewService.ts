import type { ReviewFlashcardSchema } from "@/schemas/ReviewFlashcardSchema";
import type { DefaultDTO } from "./types/DefaultDTO";
import { AxiosError } from "axios";
import { axios } from "@/services";

export const ReviewFlashcard = async (
  data: ReviewFlashcardSchema
): Promise<DefaultDTO> => {
  try {
    const { data: response } = await axios.post<DefaultDTO>(
      `/review/${data.flashcardId}`,
      data
    );
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (!error.response) {
        throw new Error("Algo deu errado, tente novamente mais tarde");
      }

      const { message } = error.response.data as DefaultDTO;

      throw new Error(message);
    }

    throw new Error("Algo deu errado, tente novamente mais tarde");
  }
};
