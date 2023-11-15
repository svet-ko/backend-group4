import { NextFunction, Request, Response } from "express";
import { userDataSchema } from "../schemas/userSchema.js";

export async function validateNewUserRequest(
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
