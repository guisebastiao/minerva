import type { DefaultDTO } from "./types/DefaultDTO";
import type { DeckDTO } from "./types/DeckDTO";
import { AxiosError } from "axios";
import { axios } from "@/services";

interface FindAllPublicCollectionsProps {
  search: string | null;
  order: string | null;
  offset: number;
  limit: number;
}

export const FindAllPublicCollections = async ({
  search,
  order,
  offset,
  limit,
}: FindAllPublicCollectionsProps): Promise<DefaultDTO<DeckDTO[]>> => {
  try {
    const { data: response } = await axios.get<DefaultDTO<DeckDTO[]>>(
      "/community",
      {
        params: {
          search,
          order,
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
