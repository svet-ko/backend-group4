import { z } from "zod";
import { paymentSchema } from "../schemas/paymentSchema";
import mongoose from "mongoose";

export type Payment = z.infer<typeof paymentSchema> 
   & {
    _id: mongoose.Types.ObjectId;
    status: "pending" | "completed" | "failed";
  };
export type createPaymentInput = z.infer<typeof paymentSchema>; 