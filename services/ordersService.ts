import mongoose from "mongoose"
import OrdersRepo from "../models/Order.js"

// admin protected
async function getAllOrders() {
  const orders = await OrdersRepo.find().exec();
  return orders;
}

async function getOrdersByUserId(userId: string) {
    const id = new mongoose.Types.ObjectId(userId);
    const order = await OrdersRepo.find({ userId: id}); 
    return order;
}

async function getOrderById(orderId: string) {
    const id = new mongoose.Types.ObjectId(orderId);
    const order = await OrdersRepo.findOne({ _id: id}); 
    return order;
}

async function createOrder(userId: string, totalPrice: number) {
    const id = new mongoose.Types.ObjectId(userId);
    const newOrder = new OrdersRepo({ userId: id, totalPrice });
    return await newOrder.save();
}

async function deleteOrder(orderId: string) {
    const id = new mongoose.Types.ObjectId(orderId);
    return await OrdersRepo.findByIdAndDelete(id);
}

async function deleteAllOrders() {
    return await OrdersRepo.deleteMany({});
}

async function deleteAllOrdersByUserId(userId: string) {
    const id = new mongoose.Types.ObjectId(userId);
    return await OrdersRepo.deleteMany({ "userId": userId })
}

export default {
    getAllOrders,
    getOrdersByUserId,
    getOrderById,
    createOrder,
    deleteOrder,
    deleteAllOrders,
    deleteAllOrdersByUserId
}