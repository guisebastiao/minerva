import type { RegisterSchemaType } from "@/schemas/RegisterSchema";
import type { LoginSchemaType } from "@/schemas/LoginSchema";
import { Register, Login } from "@/services/authService";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const register = () => {
  return useMutation({
    mutationFn: (data: RegisterSchemaType) => Register(data),
    onError(error: Error) {
      toast.error(error.message);
    },
    onSuccess(data) {
      toast.success(data.message);
    },
  });
};

export const login = () => {
  return useMutation({
    mutationFn: (data: LoginSchemaType) => Login(data),
    onError(error: Error) {
      toast.error(error.message);
    },
    onSuccess(data) {
      toast.success(data.message);
    },
  });
};
