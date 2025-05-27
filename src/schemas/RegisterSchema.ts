import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .nonempty("Informe seu nome")
      .min(3, "O nome deve ter mais de 3 caracteres")
      .max(100, "O nome deve ter menos de 100 caracteres"),
    email: z
      .string()
      .nonempty("Informe seu email")
      .email("Informe um email válido")
      .max(100, "O email deve ter menos de 250 caracteres"),
    password: z
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
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type RegisterSchemaType = z.infer<typeof registerSchema>;
