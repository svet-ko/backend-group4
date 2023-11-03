import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export const userDataSchema = z.object({
  //body: z.object({
      name: z.string().min(3, { message: "Name must be at least 3 characters long" }),
      password: z.string().min(5, { message: "Password must be at least 5 characters long" }),
      email: z.string().email({ message: "Invalid email address" }),
      role: z.enum(['admin', 'customer']).refine((value) => value !== undefined, {
        message: "Role must be 'customer' or 'admin'",
      }),
      avatar: z.string().url({
        message: "Avatar must be a valid URL if provided",
      }),
  //})
})

export async function validateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await userDataSchema.parseAsync(req.body);
    return next();
  } catch (error) {
    return res.status(400).json(error);
  }
}
