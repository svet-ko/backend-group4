import mongoose, { Types } from "mongoose"
import ItemsRepo from "../models/Item.js"


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
    deleteItemsByOrderId,
    deleteAllItems,
    deleteItemsFromMultipleOrders
}