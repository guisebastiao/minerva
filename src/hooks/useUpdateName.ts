import type { UpdateNameSchemaType } from "@/schemas/UpdateNameSchema";
import { UpdateName } from "@/services/updateNameService";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

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