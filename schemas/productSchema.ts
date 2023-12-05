import { z } from "zod"
import mongoose from "mongoose"
import { categorySchema } from "./categorySchema"

export const productSchema = z
  .object({
    title: z.string({
      required_error: "Title is required",
    }),
    price: z
      .number({
        required_error: "Price is required",
      })
      .positive(),
    description: z.string({
      required_error: "Description is required",
    }),
    category: categorySchema,
    images: z.array(
      z.string()
    ).optional(),
  })
  .strict();

export const productToCreateSchema = z.object({
  body: productSchema
  .merge(
    z.object({
      categoryId: z
        .string()
        .refine((val) => mongoose.Types.ObjectId.isValid(val)),
      category: z.undefined(),
    })
  )
  .strict()
});

// export const ProductFilterTitlesSchema = z.object({
//   title: z.string().optional().default(''),
// });