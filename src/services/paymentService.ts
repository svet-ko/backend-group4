import mongoose from "mongoose";
import PaymentRepo from "../models/Payment";
import { createPaymentInput } from "../../types/payment";
import shipmentService from "./shipmentService";
import usersService from "./usersService";
import ordersService from "./ordersService";

async function createOne(newPayment: createPaymentInput) {
  const {
    userId,
    orderId,
    method,
    bankName,
    accountNumber,
    shipmentInfo
  } = newPayment;
  const user = await usersService.getUserById(userId);
  if (!user || (user && !user.address)) {
    return null;
  }

  const userOrders = await ordersService.getOrdersByUserId(userId);
  const existingOrders = userOrders.filter((order) =>
    orderId.includes(order._id.toString())
  );

  const createdPayments = await Promise.all(
    existingOrders.map(async (order) => {
      const paymentDate = new Date();

      const existingPayment = await PaymentRepo.findOne({
        userId,
        orderId: order._id,
      });

      if (!existingPayment) {
        const createdPayment = new PaymentRepo({
          userId,
          method,
          orderId: order._id,
          bankName,
          accountNumber,
          paymentDate,
        });

        const createdShipment = await shipmentService.createShipment({
          ...shipmentInfo,
          userId: new mongoose.Types.ObjectId(userId),
        });

        await createdPayment.save();

        return {
          ...createdPayment.toObject(),
          shipment: createdShipment,
        };
      }
    })
  );
  return createdPayments.filter(Boolean);
};

async function removeOne(paymentId: string) {
  return await PaymentRepo.findByIdAndDelete(paymentId);
};

async function findOne(paymentId: string) {
  return await PaymentRepo.findById(paymentId);
};

async function findAll() {
  return await PaymentRepo.find().exec();
};

export default {
  createOne,
  removeOne,
  findOne,
  findAll
};
