import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PaymentSchema = new Schema(
  {
    method: {
      type: String,
      enum: ["credit_card", "bank_transfer", "paypal"],
      required: true,
    },
    orderId: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bankName: {
      type: String,
      required: true,
    },
    accountNumber: {
      type: String,
      required: true,
    },
    paymentDate: {
      type: Date,
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model("Payment", PaymentSchema);