import type { ForgotPasswordSchemaType } from "@/schemas/ForgotPasswordSchema";
import type { ResetPasswordSchemaType } from "@/schemas/ResetPasswordSchema";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  CreateResetPassword,
  ResetPassword,
} from "@/services/resetPasswordService";

export const createResetPassword = () => {
  return useMutation({
    mutationFn: (data: ForgotPasswordSchemaType) => CreateResetPassword(data),
    onError(error: Error) {
      toast.error(error.message);
    },
    onSuccess(data) {
      toast.success(data.message);
    },
  });
};

export const resetPassword = () => {
  const { token } = useParams();

  return useMutation({
    mutationFn: (data: ResetPasswordSchemaType) => ResetPassword(data, token!),
    onError(error: Error) {
      toast.error(error.message);
    },
    onSuccess(data) {
      toast.success(data.message);
    },
  });
};
