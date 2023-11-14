import mongoose from "mongoose"
import ItemsRepo from "../models/Item.js"


async function deleteItemsByOrderId(orderId: string) {
    const id = new mongoose.Types.ObjectId(orderId);
    return await ItemsRepo.deleteMany({ "orderId": id })
}

async function deleteItemsFromMultipleOrders(orderIds: string[]){
    const ids = orderIds.map(id => new mongoose.Types.ObjectId(id));
    return await ItemsRepo.deleteMany({ "orderId": { $in: ids } });
}

async function deleteAllItems() {
    return await ItemsRepo.deleteMany({});
}

export default {
    deleteItemsByOrderId,
    deleteAllItems,
    deleteItemsFromMultipleOrders
}