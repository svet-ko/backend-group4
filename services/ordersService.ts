import mongoose from "mongoose"
import OrdersRepo from "../models/Order"
import itemsService from "./itemsService";
import { Item } from "item";
import { OrderWithItems } from "order";
import productsService from "./productsService";

async function getAllOrders() {
  const orders = await OrdersRepo.find().exec();
  return orders;
}

async function getOrdersByUserId(userId: string) {
  const id = new mongoose.Types.ObjectId(userId);
  const orders = await OrdersRepo.find({ userId: id});
  const ordersWithitems = await Promise.all(
    orders.map(async (order) => {
      const orderItems = await itemsService.getItemsByOrderId(String(order._id));
      return {
        _id: order._id,
        userId: order.userId,
        totalPrice: order.totalPrice,
        items: orderItems
      };
    })
  );
  return ordersWithitems;
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
  return await OrdersRepo.deleteMany({ "userId": id })
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