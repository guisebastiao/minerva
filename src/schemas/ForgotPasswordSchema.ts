import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .nonempty("Informe seu email")
    .email("Informe um email válido")
    .max(100, "O email deve ter menos de 250 caracteres"),
});

export type ForgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;
