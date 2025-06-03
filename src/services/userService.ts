import type { UpdatePasswordSchemaType } from "@/schemas/UpdatePasswordSchema";
import type { UpdateNameSchemaType } from "@/schemas/UpdateNameSchema";
import type { DefaultDTO } from "./types/DefaultDTO";
import { AxiosError } from "axios";
import { axios } from "@/services";

export const UpdateName = async (
  data: UpdateNameSchemaType
): Promise<DefaultDTO> => {
  try {
    const { data: response } = await axios.put<DefaultDTO>("/users", data);
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

export const UpdatePassword = async (
  data: UpdatePasswordSchemaType
): Promise<DefaultDTO> => {
  try {
    const { data: response } = await axios.put<DefaultDTO>(
      "/users/reset-password",
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

export const DeleteAccount = async (): Promise<DefaultDTO> => {
  try {
    const { data: response } = await axios.delete<DefaultDTO>("/users");
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
