import type { DeckSchemaType } from "@/schemas/DeckSchema";
import type { DefaultDTO } from "./types/DefaultDTO";
import { AxiosError } from "axios";
import { axios } from "@/services";

export const CreateDeck = async (data: DeckSchemaType): Promise<DefaultDTO> => {
  try {
    const { data: response } = await axios.post<DefaultDTO>("/decks", data);
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

export const UpdateDeck = async (
  data: DeckSchemaType,
  deckId: string
): Promise<DefaultDTO> => {
  try {
    const { data: response } = await axios.put<DefaultDTO>(
      `/decks/${deckId}`,
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
