import mongoose from "mongoose";
import { z } from "zod";
import { shipmentSchema } from "./shipmentSchema";

export const paymentSchema = z
  .object({
    userId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val)),
    method: z.enum(["credit_card", "venmo", "paypal", "mobile_wallet"]),
    orderId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val)),
    bankName: z.string({
      required_error: "BankName  is required",
    }),
    accountNumber: z.string({
      required_error: "AccountNumber  is required",
    }),
    shipmentInfo: shipmentSchema,
  })
  .strict();