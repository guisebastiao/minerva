import type { DeckSchemaType } from "@/schemas/deckSchema";
import type { DefaultDTO } from "./types/DefaultDTO";
import { AxiosError } from "axios";
import { axios } from "@/services";

export const CreateDeck = async (
  data: DeckSchemaType
): Promise<DefaultDTO<string>> => {
  try {
    const { data: response } = await axios.post<DefaultDTO<string>>(
      "/decks",
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

export const DeleteDeck = async (deckId: string): Promise<DefaultDTO> => {
  try {
    const { data: response } = await axios.delete<DefaultDTO>(
      `/decks/${deckId}`
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
