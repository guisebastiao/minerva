import type { DefaultDTO } from "./types/DefaultDTO";
import { AxiosError } from "axios";
import { axios } from "@/services";

export const DeleteFlashcard = async (
  flashcardId: string
): Promise<DefaultDTO> => {
  try {
    const { data: response } = await axios.delete<DefaultDTO>(
      `/flashcards/${flashcardId}`
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
