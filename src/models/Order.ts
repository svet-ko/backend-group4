import mongoose from "mongoose"

const Schema = mongoose.Schema

const OrderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  }
})

export default mongoose.model("Order", OrderSchema, "orders")