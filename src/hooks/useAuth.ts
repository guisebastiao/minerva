import type { RegisterSchemaType } from "@/schemas/RegisterSchema";
import { useMutation } from "@tanstack/react-query";
import { Register } from "@/services/authService";
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
