import type { RegisterSchemaType } from "../schemas/RegisterSchema";
import type { LoginSchemaType } from "@/schemas/LoginSchema";
import type { DefaultDTO } from "./types/DefaultDTO";
import type { AuthDTO } from "./types/AuthDTO";
import { AxiosError } from "axios";
import { axios } from "@/services";

export const Register = async (
  data: RegisterSchemaType
): Promise<DefaultDTO> => {
  try {
    const { data: response } = await axios.post<DefaultDTO<AuthDTO>>(
      "/auth/register",
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

export const Login = async (
  data: LoginSchemaType
): Promise<DefaultDTO<AuthDTO>> => {
  try {
    const { data: response } = await axios.post<DefaultDTO<AuthDTO>>(
      "/auth/login",
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
