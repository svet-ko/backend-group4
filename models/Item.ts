import mongoose from "mongoose"

const Schema = mongoose.Schema

export const ItemSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  orderId: {
    type: Schema.Types.ObjectId,
    ref: "Order",
    required: true
  },
  quantity: { type: Number, required: true}
})

export default mongoose.model("Item", ItemSchema, "items")