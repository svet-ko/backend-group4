import mongoose from "mongoose";
import { z } from "zod";

export const shipmentSchema = z
  .object({
    shippingPrice: z.number()
  })
  .strict();