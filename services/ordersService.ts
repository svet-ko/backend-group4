import mongoose from "mongoose"
import OrdersRepo from "../models/Order.js"

// only for admin role
async function getAllOrders() {
  const orders = await OrdersRepo.find().exec();
  return orders;
}

async function getOrderByUserId(userId: string) {
    const id = new mongoose.Types.ObjectId(userId);
    const order = await OrdersRepo.findOne({ userId: id}); 
    return order;
}

async function createOrder(userId: string) {
    const newOrder = new OrdersRepo(userId);
    return await newOrder.save();
}

export default {
    getAllOrders,
    getOrderByUserId,
    createOrder
}