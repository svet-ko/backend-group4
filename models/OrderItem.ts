import mongoose from "mongoose";

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const OrderItemSchema = new Schema({
  quantity: Number,
  orderId: {
    type: Schema.Types.ObjectId,
    ref: "Order",
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
});

export default mongoose.model("OrderItem", OrderItemSchema);
