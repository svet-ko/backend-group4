import { z } from "zod"

export const categorySchema = z.object({
  name: z.string({
    required_error: "Name is required",
  }),
  description: z.string({
    required_error: "Description is required",
  }),
})

export const requestSchema = z.object({
  body: categorySchema,
})