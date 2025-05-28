import type { CollectionDTO } from "./types/CollectionDTO";
import type { DefaultDTO } from "./types/DefaultDTO";
import { AxiosError } from "axios";
import { axios } from "@/services";

interface FindAllCollectionsProps {
  search: string | null;
  offset: number;
  limit: number;
}

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

      const { message } = error.response?.data as DefaultDTO;

      throw new Error(message);
    }

    throw new Error("Algo deu errado, tente novamente mais tarde");
  }
};
