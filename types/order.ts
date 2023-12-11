import { Item } from "item";
import mongoose from "mongoose";

export type OrderWithItems = {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  totalPrice: number,
  items: Item[]
}