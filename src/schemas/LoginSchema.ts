import { z } from "zod";

export const loginSchema = z.object({
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
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
