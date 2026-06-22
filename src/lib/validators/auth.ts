import { z } from "zod";

export const loginSchema = z.object({
  phone: z
    .string()
    .min(11)
    .max(11),

  password: z
    .string()
    .min(6),
});