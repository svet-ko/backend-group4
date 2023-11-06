import { z } from "zod";

export const userDataSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters long" }),
  password: z.string().min(5, { message: "Password must be at least 5 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  role: z.enum(['admin', 'customer']).refine((value) => value !== undefined, {
    message: "Role must be 'customer' or 'admin'",
  }),
  avatar: z.string().url({
    message: "Avatar must be a valid URL if provided",
  })
});

export const userRequestSchema = z.object({
    body: userDataSchema,
})