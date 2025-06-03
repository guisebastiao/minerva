import type { UpdatePasswordSchemaType } from "@/schemas/UpdatePasswordSchema";
import type { UpdateNameSchemaType } from "@/schemas/UpdateNameSchema";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  DeleteAccount,
  UpdateName,
  UpdatePassword,
} from "@/services/userService";

export const updateName = () => {
  return useMutation({
    mutationFn: (data: UpdateNameSchemaType) => UpdateName(data),
    onError(error: Error) {
      toast.error(error.message);
    },
    onSuccess(data) {
      toast.success(data.message);
    },
  });
};

export const updatePassword = () => {
  return useMutation({
    mutationFn: (data: UpdatePasswordSchemaType) => UpdatePassword(data),
    onError(error: Error) {
      toast.error(error.message);
    },
    onSuccess(data) {
      toast.success(data.message);
    },
  });
};

export const deleteAccount = () => {
  return useMutation({
    mutationFn: DeleteAccount,
    onError(error: Error) {
      toast.error(error.message);
    },
    onSuccess(data) {
      toast.success(data.message);
    },
  });
};
