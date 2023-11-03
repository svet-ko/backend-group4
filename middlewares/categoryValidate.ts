import { NextFunction, Request, Response } from "express"
import { z } from "zod"

const productSchema = z.object({
  body: z.object({
    id: z.number({
      required_error: "Id is required",
    }),
    name: z.string({
      required_error: "Name is required",
    }),
    description: z.string({
      required_error: "Description is required",
    }),
  }),
});

export async function validateProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await productSchema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    })
    return next()
  } catch (error) {
    return res.status(400).json(error)
  }
}
