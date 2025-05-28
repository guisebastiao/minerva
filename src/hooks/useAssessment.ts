import type { AssessmentSchema } from "@/schemas/AssessmentSchema";
import { queryClient } from "@/context/QueryContext";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  CreateAssessment,
  DeleteAssessment,
} from "@/services/assessmentService";

export const createAssessment = () => {
  return useMutation({
    mutationFn: (data: AssessmentSchema) => CreateAssessment(data),
    onError(error: Error) {
      toast.error(error.message);
    },
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      toast.success(data.message);
    },
  });
};

export const deleteAssessment = () => {
  return useMutation({
    mutationFn: (assessmentId: string) => DeleteAssessment(assessmentId),
    onError(error: Error) {
      toast.error(error.message);
    },
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      toast.success(data.message);
    },
  });
};
