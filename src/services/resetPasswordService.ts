import type { ForgotPasswordSchemaType } from "@/schemas/ForgotPasswordSchema";
import type { ResetPasswordSchemaType } from "@/schemas/ResetPasswordSchema";
import type { DefaultDTO } from "./types/DefaultDTO";
import { AxiosError } from "axios";
import { axios } from "@/services";

export const CreateResetPassword = async (
  data: ForgotPasswordSchemaType
): Promise<DefaultDTO> => {
  try {
    const { data: response } = await axios.post<DefaultDTO>(
      "/reset-password",
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

export const ResetPassword = async (
  data: ResetPasswordSchemaType,
  token: string
): Promise<DefaultDTO> => {
  try {
    const { data: response } = await axios.put<DefaultDTO>(
      "/reset-password",
      data,
      {
        params: {
          token,
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
