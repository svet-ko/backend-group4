import mongoose from "mongoose";

import ShipmentRepo from "../models/Shipment";
import { CreateShipmetInput, shipmentUpdate } from "../../types/shipment";

async function findAll() {
  const shipments = await ShipmentRepo.find().exec();
  return shipments;
}

async function getOne(index: string) {
  const id = new mongoose.Types.ObjectId(index);
  const existedShipment = await ShipmentRepo.findOne({ _id: id }).exec();
  return existedShipment;
}

async function createShipment(shipment: CreateShipmetInput) {
  const createdShipment = new ShipmentRepo(shipment);
  await createdShipment.save();
  return createdShipment;
}

async function updateShipment(index: string, shipment: shipmentUpdate) {
  const updatedShipment = await ShipmentRepo.findByIdAndUpdate(
    { _id: index },
    shipment,
    { new: true }
  );
  return updatedShipment;
}

async function deleteShipment(index: string) {
  const deletedShipment = await ShipmentRepo.findOneAndDelete({ _id: index });
  return deletedShipment;
}

export default {
  findAll,
  getOne,
  createShipment,
  updateShipment,
  deleteShipment,
};