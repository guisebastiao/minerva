import { z } from "zod";

export const updatePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .nonempty("Informe sua senha atual")
      .min(6, "A senha atual deve ter mais de 6 caracteres")
      .max(20, "A senha atual deve ter menos de 20 caracteres")
      .refine((val) => /[A-Z]/.test(val), {
        message: "A senha atual deve ter uma letra maiúscula",
      })
      .refine((val) => (val.match(/\d/g) || []).length >= 2, {
        message: "A senha atual deve ter dois números",
      })
      .refine((val) => /[@$!%*?&.#]/.test(val), {
        message: "A senha atual deve ter um caractere especial",
      }),
    newPassword: z
      .string()
      .nonempty("Informe sua nova senha")
      .min(6, "A nova senha deve ter mais de 6 caracteres")
      .max(20, "A nova senha deve ter menos de 20 caracteres")
      .refine((val) => /[A-Z]/.test(val), {
        message: "A nova senha deve ter uma letra maiúscula",
      })
      .refine((val) => (val.match(/\d/g) || []).length >= 2, {
        message: "A nova senha deve ter dois números",
      })
      .refine((val) => /[@$!%*?&.#]/.test(val), {
        message: "A nova senha deve ter um caractere especial",
      }),
    confirmPassword: z
      .string()
      .nonempty("Confirme sua nova senha")
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

export type UpdatePasswordSchemaType = z.infer<typeof updatePasswordSchema>;
