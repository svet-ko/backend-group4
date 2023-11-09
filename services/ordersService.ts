import mongoose from "mongoose"
import OrdersRepo from "../models/Order.js"

// only for admin role
async function getAllOrders() {
  const orders = await OrdersRepo.find().exec();
  return orders;
}

async function getOrderByUserId(userId: string) {
    const id = new mongoose.Types.ObjectId(userId);
    const order = await OrdersRepo.findOne({ userId: id}); // ???
    return order;
}

export default {
    getAllOrders,
    getOrderByUserId
}