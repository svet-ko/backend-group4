import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ShipmentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    }
  },
  {
    versionKey: false,
  }
);

export default mongoose.model("Shipment", ShipmentSchema);