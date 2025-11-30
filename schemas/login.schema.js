import { z } from "zod";

export const schemaLogin = z.object({
  usuario: z.string().min(3, {error: "Nombre de Usuario demasiado corto"}),
  password:z.string().min(3, {error:"Contraseña demasiada Corta"})
})
