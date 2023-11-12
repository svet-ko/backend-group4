import mongoose from "mongoose"

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

export const ItemSchema = new Schema({
  id: ObjectId,
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product"
  },
  orderId: {
    type: Schema.Types.ObjectId,
    ref: "Order"
  },
  quantity: Number,
})

export default mongoose.model("Item", ItemSchema, "items")