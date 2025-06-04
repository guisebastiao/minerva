import type { AddNewCollectionSchema } from "@/schemas/AddNewCollectionSchema";
import type { FavoriteSchema } from "@/schemas/FavoriteSchema";
import type { CollectionDTO } from "./types/CollectionDTO";
import type { FlashcardDTO } from "./types/FlashcardDTO";
import type { DefaultDTO } from "./types/DefaultDTO";
import { AxiosError } from "axios";
import { axios } from "@/services";

interface FindAllCollectionsProps {
  search: string | null;
  offset: number;
  limit: number;
}

interface FindAllCollectionsToStudyProps {
  deckId: string;
  offset: number;
  limit: number;
}

export const AddNewCollection = async (
  data: AddNewCollectionSchema
): Promise<DefaultDTO> => {
  try {
    const { data: response } = await axios.post<DefaultDTO>(
      "/collections",
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

export const FindAllCollections = async ({
  search,
  offset,
  limit,
}: FindAllCollectionsProps): Promise<DefaultDTO<CollectionDTO[]>> => {
  try {
    const { data: response } = await axios.get<DefaultDTO<CollectionDTO[]>>(
      "/collections",
      {
        params: {
          search,
          offset,
          limit,
        },
      }
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

export const FindAllCollectionsToStudy = async ({
  offset,
  limit,
  deckId,
}: FindAllCollectionsToStudyProps): Promise<DefaultDTO<FlashcardDTO[]>> => {
  try {
    const { data: response } = await axios.get<DefaultDTO<FlashcardDTO[]>>(
      `/collections/to-study/${deckId}`,
      {
        params: {
          offset,
          limit,
        },
      }
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

export const AddFavorite = async (
  data: FavoriteSchema
): Promise<DefaultDTO> => {
  try {
    const { data: response } = await axios.put<DefaultDTO>(
      `/collections/favorite/${data.deckId}`,
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

export const RemoveCollection = async (deckId: string): Promise<DefaultDTO> => {
  try {
    const { data: response } = await axios.delete<DefaultDTO>(
      `/collections/${deckId}`
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
