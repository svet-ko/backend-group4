import { z } from "zod";
export const productSchema = z.object({
    name: z.string({
        required_error: "Name is required",
    }),
});
export const requestSchema = z.object({
    body: productSchema,
});
