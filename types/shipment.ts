import { z } from "zod";

import { shipmentSchema } from "../schemas/shipmentSchema";
import mongoose from "mongoose";

export type Shipment = z.infer<typeof shipmentSchema> & {
  _id: mongoose.Types.ObjectId;

};
export type CreateShipmetInput = Omit<Shipment, "_id"> & {
  address: string,
  userId: mongoose.Types.ObjectId;
};


export type shipmentUpdate = Partial<Shipment>;