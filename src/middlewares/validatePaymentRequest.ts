import { NextFunction, Request, Response } from "express";
import { paymentSchema } from "../../schemas/paymentSchema";

export async function validatePaymentRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await paymentSchema.parseAsync(req.body);
    return next();
  } catch (error) {
    return res.status(400).json(error);
  }
}