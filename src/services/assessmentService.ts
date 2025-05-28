import type { AssessmentSchema } from "@/schemas/AssessmentSchema";
import type { DefaultDTO } from "./types/DefaultDTO";
import { axios } from "@/services";
import { AxiosError } from "axios";

export const CreateAssessment = async (
  data: AssessmentSchema
): Promise<DefaultDTO> => {
  try {
    const { data: response } = await axios.post<DefaultDTO>(
      `/assessments/${data.deckId}`,
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

export const DeleteAssessment = async (
  assessmentId: string
): Promise<DefaultDTO> => {
  try {
    const { data: response } = await axios.delete<DefaultDTO>(
      `/assessments/${assessmentId}`
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
