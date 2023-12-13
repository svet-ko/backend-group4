import { NextFunction, Request, Response } from "express";

import paymentsService from "../services/paymentService";
import { ApiError } from "../errors/ApiError";

async function createPayment(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const newPayment = req.body;
  console.log(newPayment);

  const payment = await paymentsService.createOne(newPayment);

  if (payment === null || payment.length === 0) {
    next(ApiError.badRequest("Payment was not created"));
    return;
  }

  res.status(201).json({
    message: "Payment is created",
    payment,
  });
};

export async function getAllPayments(
  _: Request,
  res: Response,
  next: NextFunction
) {
  const payments = await paymentsService.findAll();
  if (payments.length === 0) {
    next(ApiError.resourceNotFound("Payments data was not found"));
    return;
  }
  res.status(200).json(payments);
};

export async function getOnePayment(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = req.params.paymentId;
  const payment = await paymentsService.findOne(id);
  if (payment === null) {
    next(ApiError.resourceNotFound("Payment not found"));
    return;
  }
  res.status(200).json(payment);
};

export async function deletePayment(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = req.params.paymentId;
  const payment = await paymentsService.removeOne(id);
  if (payment === null) {
    next(ApiError.resourceNotFound("Payment id was not found"));
    return;
  }
  res.status(200).json(payment);
};

export default {
  createPayment,
  getAllPayments,
  getOnePayment,
  deletePayment
}