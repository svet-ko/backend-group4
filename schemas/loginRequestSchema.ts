import { z } from "zod";

export const loginDataSchema = z.object({
    email: z.string({
        required_error: "Email is required",
    }),
    password: z.string({
        required_error: "Password is required",
    }),
});

export const loginRequestSchema = z.object({
    body: loginDataSchema,
})