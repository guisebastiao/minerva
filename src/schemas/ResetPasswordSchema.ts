import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .nonempty("Informe sua senha")
      .min(6, "A senha deve ter mais de 6 caracteres")
      .max(20, "A senha deve ter menos de 20 caracteres")
      .refine((val) => /[A-Z]/.test(val), {
        message: "A senha deve ter uma letra maiúscula",
      })
      .refine((val) => (val.match(/\d/g) || []).length >= 2, {
        message: "A senha deve ter dois números",
      })
      .refine((val) => /[@$!%*?&.#]/.test(val), {
        message: "A senha deve ter um caractere especial",
      }),
    confirmPassword: z
      .string()
      .nonempty("Confirme sua senha")
      .min(6, "A senha deve ter mais de 6 caracteres")
      .max(20, "A senha deve ter menos de 20 caracteres")
      .refine((val) => /[A-Z]/.test(val), {
        message: "A senha deve ter uma letra maiúscula",
      })
      .refine((val) => (val.match(/\d/g) || []).length >= 2, {
        message: "A senha deve ter dois números",
      })
      .refine((val) => /[@$!%*?&.#]/.test(val), {
        message: "A senha deve ter um caractere especial",
      }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;
