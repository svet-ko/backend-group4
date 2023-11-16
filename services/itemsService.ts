import mongoose, { Types } from "mongoose"
import ItemsRepo from "../models/Item.js"

async function getAllItems(){
    const items = await ItemsRepo.find().exec();
    return items;
}

async function deleteItemsByOrderId(orderId: string) {
    const id = new mongoose.Types.ObjectId(orderId);
    return await ItemsRepo.deleteMany({ "orderId": id })
}

async function deleteItemsFromMultipleOrders(orderIds: Types.ObjectId[]){
    return await ItemsRepo.deleteMany({ "orderId": { $in: orderIds } });
}

async function deleteAllItems() {
    return await ItemsRepo.deleteMany({});
}

export default {
    getAllItems,
    deleteItemsByOrderId,
    deleteAllItems,
    deleteItemsFromMultipleOrders
}