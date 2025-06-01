import { z } from "zod";

export const updateNameSchema = z.object({
  name: z
    .string()
    .nonempty("Informe seu nome")
    .min(3, "O nome deve ter mais de 3 caracteres")
    .max(100, "O nome deve ter menos de 100 caracteres"),
});

export type UpdateNameSchemaType = z.infer<typeof updateNameSchema>;
