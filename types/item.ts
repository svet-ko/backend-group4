import mongoose from "mongoose";
import { Product } from "products";

export type Item = {
  quantity: number;
  productId: mongoose.Types.ObjectId;
  orderId: mongoose.Types.ObjectId;
}